import { expect } from 'aegir/chai'
import { decodeMessage, MaxLengthError, MaxSizeError, message, reader, streamMessage, UnsupportedDecodeLimitsError } from 'protons-runtime'
import { Uint8ArrayList } from 'uint8arraylist'
import { concat } from 'uint8arrays/concat'
import { LimitedBatch, LimitedEntry } from './fixtures/total-limits.ts'
import type { DecodeOptions } from 'protons-runtime'

describe('total decode limits', () => {
  const ids = (count: number): Uint8Array[] => Array.from({ length: count }, () => new Uint8Array(0))
  const opts = { limits: { entries$: { ids: 3 } }, totalLimits: { entries$: { ids: 5 } } }

  for (const streaming of [false, true]) {
    const decode = (bytes: Uint8Array | Uint8ArrayList, options: DecodeOptions<LimitedBatch> = opts): unknown => streaming
      ? Array.from(LimitedBatch.stream(bytes, options))
      : LimitedBatch.decode(bytes, options)

    describe(streaming ? 'stream' : 'decode', () => {
      it('rejects IDs split across individually valid entries', () => {
        const bytes = LimitedBatch.encode({ entries: [{ ids: ids(3) }, { ids: ids(3) }] })
        expect(() => decode(bytes)).to.throw(MaxLengthError)
      })

      it('accepts the total boundary and resets for each operation', () => {
        const bytes = LimitedBatch.encode({ entries: [{ ids: ids(2) }, { ids: ids(3) }] })
        const expected = decode(bytes, {})
        expect(decode(bytes)).to.deep.equal(expected)
        expect(decode(bytes)).to.deep.equal(expected)
      })

      it('resets totals after an operation fails', () => {
        const invalid = LimitedBatch.encode({ entries: [{ ids: ids(3) }, { ids: ids(3) }] })
        const valid = LimitedBatch.encode({ entries: [{ ids: ids(2) }, { ids: ids(3) }] })
        expect(() => decode(invalid)).to.throw(MaxLengthError)
        expect(() => decode(valid)).not.to.throw()
      })

      it('does not mutate caller options', () => {
        const options = Object.freeze({
          limits: Object.freeze({ entries$: Object.freeze({ ids: 3 }) }),
          totalLimits: Object.freeze({ entries$: Object.freeze({ ids: 5 }) })
        })
        const bytes = LimitedBatch.encode({ entries: [{ ids: ids(2) }, { ids: ids(3) }] })
        expect(() => decode(bytes, options)).not.to.throw()
      })

      it('retains the per-entry limit', () => {
        const bytes = LimitedBatch.encode({ entries: [{ ids: ids(4) }] })
        expect(() => decode(bytes)).to.throw(MaxLengthError)
      })

      it('enforces limits on fragmented input', () => {
        const bytes = LimitedBatch.encode({ entries: [{ ids: ids(3) }, { ids: ids(3) }] })
        expect(() => decode(new Uint8ArrayList(bytes.subarray(0, 3), bytes.subarray(3)))).to.throw(MaxLengthError)
      })

      it('does not reset totals when a singular message appears again', () => {
        const part = LimitedBatch.encode({ single: { ids: ids(3) } })
        const options = { totalLimits: { single: { ids: 5 } } }
        expect(() => decode(concat([part, part]), options)).to.throw(MaxLengthError)
      })

      it('shares totals across map values', () => {
        const bytes = LimitedBatch.encode({ byKey: new Map([['a', { ids: ids(3) }], ['b', { ids: ids(3) }]]) })
        const options = { totalLimits: { byKey$value: { ids: 5 } } }
        expect(() => decode(bytes, options)).to.throw(MaxLengthError)
      })

      it('keeps identical limit objects at different field paths independent', () => {
        const childLimits = { ids: 3 }
        const options = { totalLimits: { entries$: childLimits, others$: childLimits } }
        const bytes = LimitedBatch.encode({ entries: [{ ids: ids(3) }], others: [{ ids: ids(3) }] })
        expect(decode(bytes, options)).to.deep.equal(decode(bytes, {}))
      })

      for (const field of ['numbers', 'expanded'] as const) {
        it(`counts each element of ${field}`, () => {
          const bytes = LimitedBatch.encode({ entries: [{ [field]: [1, 2, 3] }, { [field]: [4, 5, 6] }] })
          const options = { totalLimits: { entries$: { [field]: 5 } } }
          expect(() => decode(bytes, options)).to.throw(MaxLengthError)
        })
      }

      it('counts duplicate wire map entries even when the key is overwritten', () => {
        const part = LimitedEntry.encode({ values: new Map([['a', new Uint8Array(0)]]) })
        const bytes = concat([part, part, part])
        const options = { totalLimits: { values: 2 } }
        const run = (): unknown => streaming
          ? Array.from(LimitedEntry.stream(bytes, options))
          : LimitedEntry.decode(bytes, options)
        expect(run).to.throw(MaxSizeError)
      })

      it('checks the total before reading excess bytes', () => {
        const bytes = LimitedBatch.encode({ entries: [{ ids: ids(3) }, { ids: ids(3) }] })
        const r = reader(bytes)
        const readBytes = r.bytes.bind(r)
        let count = 0
        r.bytes = () => { count++; return readBytes() }
        const run = (): unknown => streaming
          ? Array.from(LimitedBatch.codec().stream(r, undefined, '.', opts))
          : LimitedBatch.codec().decode(r, undefined, opts)
        expect(run).to.throw(MaxLengthError)
        expect(count).to.equal(5)
      })
    })
  }

  it('keeps interleaved streams with the same options independent', () => {
    const bytes = LimitedBatch.encode({ entries: [{ ids: ids(2) }, { ids: ids(3) }] })
    const expected = Array.from(LimitedBatch.stream(bytes, opts))
    const first = LimitedBatch.stream(bytes, opts)
    const second = LimitedBatch.stream(bytes, opts)

    for (const event of expected) {
      expect(first.next(), `first stream: ${event.field}`).to.deep.equal({ value: event, done: false })
      expect(second.next(), `second stream: ${event.field}`).to.deep.equal({ value: event, done: false })
    }

    expect(first.next().done).to.equal(true)
    expect(second.next().done).to.equal(true)
  })

  describe('older generated codecs', () => {
    const legacy = message<{ ids: Uint8Array[] }, { ids: Uint8Array[] }>(
      () => {},
      () => ({ ids: [] }),
      function * () { yield * [] }
    )
    const bytes = new Uint8Array(0)
    const options = { totalLimits: { ids: 1 } }

    it('rejects total limits when decoding', () => {
      expect(() => decodeMessage(bytes, legacy, options)).to.throw(UnsupportedDecodeLimitsError)
      expect(() => legacy.decode(reader(bytes), undefined, options)).to.throw(UnsupportedDecodeLimitsError)
    })

    it('rejects total limits when streaming', () => {
      expect(() => Array.from(streamMessage(bytes, legacy, options))).to.throw(UnsupportedDecodeLimitsError)
      expect(() => Array.from(legacy.stream(reader(bytes), undefined, '.', options))).to.throw(UnsupportedDecodeLimitsError)
    })

    it('preserves calls without total limits', () => {
      expect(decodeMessage(bytes, legacy, { limits: { ids: 1 } })).to.deep.equal({ ids: [] })
      expect(Array.from(streamMessage(bytes, legacy, { limits: { ids: 1 } }))).to.deep.equal([])
    })
  })
})
