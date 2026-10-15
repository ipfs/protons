import { expect } from 'aegir/chai'
import { writer } from 'protons-runtime'

// low word in [2^31, 2^32) used to be stored signed and written as one byte
describe('64-bit varints', () => {
  const cases: Array<[bigint, number[]]> = [
    [2147483647n, [0xff, 0xff, 0xff, 0xff, 0x07]],
    [2147483648n, [0x80, 0x80, 0x80, 0x80, 0x08]],
    [3221225472n, [0x80, 0x80, 0x80, 0x80, 0x0c]],
    [4294967295n, [0xff, 0xff, 0xff, 0xff, 0x0f]],
    [4294967296n, [0x80, 0x80, 0x80, 0x80, 0x10]]
  ]

  for (const method of ['uint64', 'int64'] as const) {
    for (const [value, bytes] of cases) {
      it(`should encode ${method} ${value}`, () => {
        const w = writer()
        w[method](value)

        expect(w.finish()).to.equalBytes(bytes)
      })
    }
  }
})
