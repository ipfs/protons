import { DecodeContext, decodeMessage, encodeMessage, MaxLengthError, MaxSizeError, message, reader, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface LimitedBatch {
  entries: LimitedEntry[]
  single?: LimitedEntry
  byKey: Map<string, LimitedEntry>
  others: LimitedEntry[]
}

export interface LimitedBatchInput {
  entries?: LimitedEntryInput[]
  single?: LimitedEntryInput
  byKey?: Map<string, LimitedEntryInput>
  others?: LimitedEntryInput[]
}

export namespace LimitedBatch {
  export interface LimitedBatch$byKeyEntry {
    key: string
    value?: LimitedEntry
  }

  export interface LimitedBatch$byKeyEntryInput {
    key?: string
    value?: LimitedEntryInput
  }

  export namespace LimitedBatch$byKeyEntry {
    let _codec: Codec<LimitedBatch$byKeyEntry, LimitedBatch$byKeyEntryInput>

    export const codec = (): Codec<LimitedBatch$byKeyEntry, LimitedBatch$byKeyEntryInput> => {
      if (_codec == null) {
        _codec = message<LimitedBatch$byKeyEntry, LimitedBatch$byKeyEntryInput>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== '')) {
            w.uint32(10)
            w.string(obj.key)
          }

          if (obj.value != null) {
            w.uint32(18)
            LimitedEntry.codec().encode(obj.value, w)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (r, length, opts = {}) => {
          const decodeContext = DecodeContext.get(opts)
          const obj: any = {
            key: ''
          }

          const end = length == null ? r.len : r.pos + length

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = r.string()
                break
              }
              case 2: {
                obj.value = LimitedEntry.codec().decode(r, r.uint32(), DecodeContext.child(decodeContext, 'value', {
                  limits: opts.limits?.value,
                  totalLimits: opts.totalLimits?.value
                }))
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (r, length, prefix, opts = {}) {
          const decodeContext = DecodeContext.get(opts)
          const end = length == null ? r.len : r.pos + length

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'LimitedBatch.LimitedBatch$byKeyEntry'
            }
          }

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}key`,
                  value: r.string()
                }
                break
              }
              case 2: {
                yield * LimitedEntry.codec().stream(r, r.uint32(), `${prefix}value.`, DecodeContext.child(decodeContext, 'value', {
                  limits: opts.limits?.value,
                  totalLimits: opts.totalLimits?.value
                }))

                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'end',
              message: 'LimitedBatch.LimitedBatch$byKeyEntry'
            }
          }
        }, { totalLimits: true })
      }

      return _codec
    }

    export interface LimitedBatch$byKeyEntryKeyFieldEvent {
      field: '.key'
      value: string
    }

    export interface LimitedBatch$byKeyEntryValueMessageStart {
      field: '.value'
      type: 'start'
    }

    export interface LimitedBatch$byKeyEntryValueMessageEnd {
      field: '.value'
      type: 'end'
    }

    export interface LimitedBatch$byKeyEntryValueIdsFieldEvent {
      field: '.value.ids[]'
      index: number
      value: Uint8Array<ArrayBuffer>
    }

    export interface LimitedBatch$byKeyEntryValueNumbersFieldEvent {
      field: '.value.numbers[]'
      index: number
      value: number
    }

    export interface LimitedBatch$byKeyEntryValueValuesFieldEvent {
      field: '.value.values{}'
      key: string
      value: Uint8Array<ArrayBuffer>
    }

    export interface LimitedBatch$byKeyEntryValueExpandedFieldEvent {
      field: '.value.expanded[]'
      index: number
      value: number
    }

    export function encode (obj: LimitedBatch$byKeyEntryInput): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, LimitedBatch$byKeyEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<LimitedBatch$byKeyEntry>): LimitedBatch$byKeyEntry {
      return decodeMessage(buf, LimitedBatch$byKeyEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<LimitedBatch$byKeyEntry>): Generator<LimitedBatch$byKeyEntryKeyFieldEvent | LimitedBatch$byKeyEntryValueMessageStart | LimitedBatch$byKeyEntryValueMessageEnd | LimitedBatch$byKeyEntryValueIdsFieldEvent | LimitedBatch$byKeyEntryValueNumbersFieldEvent | LimitedBatch$byKeyEntryValueValuesFieldEvent | LimitedBatch$byKeyEntryValueExpandedFieldEvent> {
      return streamMessage(buf, LimitedBatch$byKeyEntry.codec(), opts)
    }
  }

  let _codec: Codec<LimitedBatch, LimitedBatchInput>

  export const codec = (): Codec<LimitedBatch, LimitedBatchInput> => {
    if (_codec == null) {
      _codec = message<LimitedBatch, LimitedBatchInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.entries != null && obj.entries.length > 0) {
          for (const value of obj.entries) {
            w.uint32(10)
            LimitedEntry.codec().encode(value, w)
          }
        }

        if (obj.single != null) {
          w.uint32(18)
          LimitedEntry.codec().encode(obj.single, w)
        }

        if (obj.byKey != null && obj.byKey.size > 0) {
          for (const [key, value] of obj.byKey.entries()) {
            w.uint32(26)
            LimitedBatch.LimitedBatch$byKeyEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.others != null && obj.others.length > 0) {
          for (const value of obj.others) {
            w.uint32(34)
            LimitedEntry.codec().encode(value, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const decodeContext = DecodeContext.get(opts)
        const obj: any = {
          entries: [],
          byKey: new Map<string, LimitedEntry>(),
          others: []
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              decodeContext?.consume('entries', opts.totalLimits?.entries)
              if (opts.limits?.entries != null && obj.entries.length === opts.limits.entries) {
                throw new MaxLengthError('Decode error - repeated field "entries" had too many elements')
              }

              obj.entries.push(LimitedEntry.codec().decode(r, r.uint32(), DecodeContext.child(decodeContext, 'entries', {
                limits: opts.limits?.entries$,
                totalLimits: opts.totalLimits?.entries$
              })))
              break
            }
            case 2: {
              obj.single = LimitedEntry.codec().decode(r, r.uint32(), DecodeContext.child(decodeContext, 'single', {
                limits: opts.limits?.single,
                totalLimits: opts.totalLimits?.single
              }))
              break
            }
            case 3: {
              decodeContext?.consume('byKey', opts.totalLimits?.byKey, MaxSizeError)
              if (opts.limits?.byKey != null && obj.byKey.size === opts.limits.byKey) {
                throw new MaxSizeError('Decode error - map field "byKey" had too many elements')
              }

              const entry = LimitedBatch.LimitedBatch$byKeyEntry.codec().decode(r, r.uint32(), DecodeContext.child(decodeContext, 'byKey', {
                limits: {
                  value: opts.limits?.byKey$value
                },
                totalLimits: opts.totalLimits?.byKey$value == null ? undefined : { value: opts.totalLimits.byKey$value }
              }))
              obj.byKey.set(entry.key, entry.value)
              break
            }
            case 4: {
              decodeContext?.consume('others', opts.totalLimits?.others)
              if (opts.limits?.others != null && obj.others.length === opts.limits.others) {
                throw new MaxLengthError('Decode error - repeated field "others" had too many elements')
              }

              obj.others.push(LimitedEntry.codec().decode(r, r.uint32(), DecodeContext.child(decodeContext, 'others', {
                limits: opts.limits?.others$,
                totalLimits: opts.totalLimits?.others$
              })))
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (r, length, prefix, opts = {}) {
        const decodeContext = DecodeContext.get(opts)
        const obj = {
          entries: 0,
          byKey: 0,
          others: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'LimitedBatch'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              decodeContext?.consume('entries', opts.totalLimits?.entries)
              if (opts.limits?.entries != null && obj.entries === opts.limits.entries) {
                throw new MaxLengthError('Streaming decode error - repeated field "entries" had too many elements')
              }

              for (const evt of LimitedEntry.codec().stream(r, r.uint32(), `${prefix}entries[].`, DecodeContext.child(decodeContext, 'entries', {
                limits: opts.limits?.entries$,
                totalLimits: opts.totalLimits?.entries$
              }))) {
                yield {
                  ...evt,
                  index: obj.entries
                }
              }

              obj.entries++

              break
            }
            case 2: {
              yield * LimitedEntry.codec().stream(r, r.uint32(), `${prefix}single.`, DecodeContext.child(decodeContext, 'single', {
                limits: opts.limits?.single,
                totalLimits: opts.totalLimits?.single
              }))

              break
            }
            case 3: {
              decodeContext?.consume('byKey', opts.totalLimits?.byKey, MaxSizeError)
              if (opts.limits?.byKey != null && obj.byKey === opts.limits.byKey) {
                throw new MaxLengthError('Decode error - map field "byKey" had too many elements')
              }

              yield * LimitedBatch.LimitedBatch$byKeyEntry.codec().stream(r, r.uint32(), `${prefix}byKey{}.`, DecodeContext.child(decodeContext, 'byKey', {
                limits: {
                  value: opts.limits?.byKey$value
                },
                totalLimits: opts.totalLimits?.byKey$value == null ? undefined : { value: opts.totalLimits.byKey$value }
              }))

              obj.byKey++

              break
            }
            case 4: {
              decodeContext?.consume('others', opts.totalLimits?.others)
              if (opts.limits?.others != null && obj.others === opts.limits.others) {
                throw new MaxLengthError('Streaming decode error - repeated field "others" had too many elements')
              }

              for (const evt of LimitedEntry.codec().stream(r, r.uint32(), `${prefix}others[].`, DecodeContext.child(decodeContext, 'others', {
                limits: opts.limits?.others$,
                totalLimits: opts.totalLimits?.others$
              }))) {
                yield {
                  ...evt,
                  index: obj.others
                }
              }

              obj.others++

              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'LimitedBatch'
          }
        }
      }, { totalLimits: true })
    }

    return _codec
  }

  export interface LimitedBatchEntriesIdsFieldEvent {
    field: '.entries[].ids[]'
    index: number
    value: Uint8Array<ArrayBuffer>
  }

  export interface LimitedBatchEntriesNumbersFieldEvent {
    field: '.entries[].numbers[]'
    index: number
    value: number
  }

  export interface LimitedBatchEntriesValuesFieldEvent {
    field: '.entries[].values{}'
    key: string
    value: Uint8Array<ArrayBuffer>
    index: number
  }

  export interface LimitedBatchEntriesExpandedFieldEvent {
    field: '.entries[].expanded[]'
    index: number
    value: number
  }

  export interface LimitedBatchEntriesMessageStartEvent {
    field: '.entries[]'
    index: number
    type: 'start'
    message: string
  }

  export interface LimitedBatchEntriesMessageEndEvent {
    field: '.entries[]'
    index: number
    type: 'end'
    message: string
  }

  export interface LimitedBatchSingleMessageStart {
    field: '.single'
    type: 'start'
  }

  export interface LimitedBatchSingleMessageEnd {
    field: '.single'
    type: 'end'
  }

  export interface LimitedBatchSingleIdsFieldEvent {
    field: '.single.ids[]'
    index: number
    value: Uint8Array<ArrayBuffer>
  }

  export interface LimitedBatchSingleNumbersFieldEvent {
    field: '.single.numbers[]'
    index: number
    value: number
  }

  export interface LimitedBatchSingleValuesFieldEvent {
    field: '.single.values{}'
    key: string
    value: Uint8Array<ArrayBuffer>
  }

  export interface LimitedBatchSingleExpandedFieldEvent {
    field: '.single.expanded[]'
    index: number
    value: number
  }

  export interface LimitedBatchByKeyIdsFieldEvent {
    field: '.byKey{}.ids[]'
    index: number
    value: LimitedEntry
    key: string
  }

  export interface LimitedBatchByKeyNumbersFieldEvent {
    field: '.byKey{}.numbers[]'
    index: number
    value: LimitedEntry
    key: string
  }

  export interface LimitedBatchByKeyValuesFieldEvent {
    field: '.byKey{}.values{}'
    key: string
    value: LimitedEntry
  }

  export interface LimitedBatchByKeyExpandedFieldEvent {
    field: '.byKey{}.expanded[]'
    index: number
    value: LimitedEntry
    key: string
  }

  export interface LimitedBatchByKeyMessageStartEvent {
    field: '.byKey{}'
    key: string
    type: 'start'
    message: string
  }

  export interface LimitedBatchByKeyMessageEndEvent {
    field: '.byKey{}'
    key: string
    type: 'end'
    message: string
  }

  export interface LimitedBatchOthersIdsFieldEvent {
    field: '.others[].ids[]'
    index: number
    value: Uint8Array<ArrayBuffer>
  }

  export interface LimitedBatchOthersNumbersFieldEvent {
    field: '.others[].numbers[]'
    index: number
    value: number
  }

  export interface LimitedBatchOthersValuesFieldEvent {
    field: '.others[].values{}'
    key: string
    value: Uint8Array<ArrayBuffer>
    index: number
  }

  export interface LimitedBatchOthersExpandedFieldEvent {
    field: '.others[].expanded[]'
    index: number
    value: number
  }

  export interface LimitedBatchOthersMessageStartEvent {
    field: '.others[]'
    index: number
    type: 'start'
    message: string
  }

  export interface LimitedBatchOthersMessageEndEvent {
    field: '.others[]'
    index: number
    type: 'end'
    message: string
  }

  export function encode (obj: LimitedBatchInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, LimitedBatch.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<LimitedBatch>): LimitedBatch {
    return decodeMessage(buf, LimitedBatch.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<LimitedBatch>): Generator<LimitedBatchEntriesIdsFieldEvent | LimitedBatchEntriesNumbersFieldEvent | LimitedBatchEntriesValuesFieldEvent | LimitedBatchEntriesExpandedFieldEvent | LimitedBatchEntriesMessageStartEvent | LimitedBatchEntriesMessageEndEvent | LimitedBatchSingleMessageStart | LimitedBatchSingleMessageEnd | LimitedBatchSingleIdsFieldEvent | LimitedBatchSingleNumbersFieldEvent | LimitedBatchSingleValuesFieldEvent | LimitedBatchSingleExpandedFieldEvent | LimitedBatchByKeyIdsFieldEvent | LimitedBatchByKeyNumbersFieldEvent | LimitedBatchByKeyValuesFieldEvent | LimitedBatchByKeyExpandedFieldEvent | LimitedBatchByKeyMessageStartEvent | LimitedBatchByKeyMessageEndEvent | LimitedBatchOthersIdsFieldEvent | LimitedBatchOthersNumbersFieldEvent | LimitedBatchOthersValuesFieldEvent | LimitedBatchOthersExpandedFieldEvent | LimitedBatchOthersMessageStartEvent | LimitedBatchOthersMessageEndEvent> {
    return streamMessage(buf, LimitedBatch.codec(), opts)
  }
}

export interface LimitedEntry {
  ids: Uint8Array<ArrayBuffer>[]
  numbers: number[]
  values: Map<string, Uint8Array<ArrayBuffer>>
  expanded: number[]
}

export interface LimitedEntryInput {
  ids?: Uint8Array[]
  numbers?: number[]
  values?: Map<string, Uint8Array>
  expanded?: number[]
}

export namespace LimitedEntry {
  export interface LimitedEntry$valuesEntry {
    key: string
    value: Uint8Array<ArrayBuffer>
  }

  export interface LimitedEntry$valuesEntryInput {
    key?: string
    value?: Uint8Array
  }

  export namespace LimitedEntry$valuesEntry {
    let _codec: Codec<LimitedEntry$valuesEntry, LimitedEntry$valuesEntryInput>

    export const codec = (): Codec<LimitedEntry$valuesEntry, LimitedEntry$valuesEntryInput> => {
      if (_codec == null) {
        _codec = message<LimitedEntry$valuesEntry, LimitedEntry$valuesEntryInput>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== '')) {
            w.uint32(10)
            w.string(obj.key)
          }

          if ((obj.value != null && obj.value.byteLength > 0)) {
            w.uint32(18)
            w.bytes(obj.value)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (r, length) => {
          const obj: any = {
            key: '',
            value: uint8ArrayAlloc(0)
          }

          const end = length == null ? r.len : r.pos + length

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = r.string()
                break
              }
              case 2: {
                obj.value = r.bytes()
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (r, length, prefix) {
          const end = length == null ? r.len : r.pos + length

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'LimitedEntry.LimitedEntry$valuesEntry'
            }
          }

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}key`,
                  value: r.string()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}value`,
                  value: r.bytes()
                }
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'end',
              message: 'LimitedEntry.LimitedEntry$valuesEntry'
            }
          }
        }, { totalLimits: true })
      }

      return _codec
    }

    export interface LimitedEntry$valuesEntryKeyFieldEvent {
      field: '.key'
      value: string
    }

    export interface LimitedEntry$valuesEntryValueFieldEvent {
      field: '.value'
      value: Uint8Array<ArrayBuffer>
    }

    export function encode (obj: LimitedEntry$valuesEntryInput): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, LimitedEntry$valuesEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<LimitedEntry$valuesEntry>): LimitedEntry$valuesEntry {
      return decodeMessage(buf, LimitedEntry$valuesEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<LimitedEntry$valuesEntry>): Generator<LimitedEntry$valuesEntryKeyFieldEvent | LimitedEntry$valuesEntryValueFieldEvent> {
      return streamMessage(buf, LimitedEntry$valuesEntry.codec(), opts)
    }
  }

  let _codec: Codec<LimitedEntry, LimitedEntryInput>

  export const codec = (): Codec<LimitedEntry, LimitedEntryInput> => {
    if (_codec == null) {
      _codec = message<LimitedEntry, LimitedEntryInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.ids != null && obj.ids.length > 0) {
          for (const value of obj.ids) {
            w.uint32(10)
            w.bytes(value)
          }
        }

        if (obj.numbers != null && obj.numbers.length > 0) {
          w.uint32(18)
          w.fork()

          for (const value of obj.numbers) {
            w.uint32(value)
          }

          w.ldelim()
        }

        if (obj.values != null && obj.values.size > 0) {
          for (const [key, value] of obj.values.entries()) {
            w.uint32(26)
            LimitedEntry.LimitedEntry$valuesEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.expanded != null && obj.expanded.length > 0) {
          for (const value of obj.expanded) {
            w.uint32(32)
            w.uint32(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const decodeContext = DecodeContext.get(opts)
        const obj: any = {
          ids: [],
          numbers: [],
          values: new Map<string, Uint8Array<ArrayBuffer>>(),
          expanded: []
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              decodeContext?.consume('ids', opts.totalLimits?.ids)
              if (opts.limits?.ids != null && obj.ids.length === opts.limits.ids) {
                throw new MaxLengthError('Decode error - repeated field "ids" had too many elements')
              }

              obj.ids.push(r.bytes())
              break
            }
            case 2: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                decodeContext?.consume('numbers', opts.totalLimits?.numbers)
                if (opts.limits?.numbers != null && obj.numbers.length === opts.limits.numbers) {
                  throw new MaxLengthError('Decode error - repeated field "numbers" had too many elements')
                }

                obj.numbers.push(r2.uint32())
              }

              break
            }
            case 3: {
              decodeContext?.consume('values', opts.totalLimits?.values, MaxSizeError)
              if (opts.limits?.values != null && obj.values.size === opts.limits.values) {
                throw new MaxSizeError('Decode error - map field "values" had too many elements')
              }

              const entry = LimitedEntry.LimitedEntry$valuesEntry.codec().decode(r, r.uint32(), DecodeContext.child(decodeContext, 'values', {
                limits: {
                  value: opts.limits?.values$value
                },
                totalLimits: opts.totalLimits?.values$value == null ? undefined : { value: opts.totalLimits.values$value }
              }))
              obj.values.set(entry.key, entry.value)
              break
            }
            case 4: {
              decodeContext?.consume('expanded', opts.totalLimits?.expanded)
              if (opts.limits?.expanded != null && obj.expanded.length === opts.limits.expanded) {
                throw new MaxLengthError('Decode error - repeated field "expanded" had too many elements')
              }

              obj.expanded.push(r.uint32())
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (r, length, prefix, opts = {}) {
        const decodeContext = DecodeContext.get(opts)
        const obj = {
          ids: 0,
          numbers: 0,
          values: 0,
          expanded: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'LimitedEntry'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              decodeContext?.consume('ids', opts.totalLimits?.ids)
              if (opts.limits?.ids != null && obj.ids === opts.limits.ids) {
                throw new MaxLengthError('Streaming decode error - repeated field "ids" had too many elements')
              }

              yield {
                field: `${prefix}ids[]`,
                index: obj.ids,
                value: r.bytes()
              }

              obj.ids++

              break
            }
            case 2: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                decodeContext?.consume('numbers', opts.totalLimits?.numbers)
                if (opts.limits?.numbers != null && obj.numbers === opts.limits.numbers) {
                  throw new MaxLengthError('Streaming decode error - repeated field "numbers" had too many elements')
                }

                yield {
                  field: `${prefix}numbers[]`,
                  index: obj.numbers,
                  value: r2.uint32()
                }

                obj.numbers++
              }

              break
            }
            case 3: {
              decodeContext?.consume('values', opts.totalLimits?.values, MaxSizeError)
              if (opts.limits?.values != null && obj.values === opts.limits.values) {
                throw new MaxLengthError('Decode error - map field "values" had too many elements')
              }

              yield * LimitedEntry.LimitedEntry$valuesEntry.codec().stream(r, r.uint32(), `${prefix}values{}.`, DecodeContext.child(decodeContext, 'values', {
                limits: {
                  value: opts.limits?.values$value
                },
                totalLimits: opts.totalLimits?.values$value == null ? undefined : { value: opts.totalLimits.values$value }
              }))

              obj.values++

              break
            }
            case 4: {
              decodeContext?.consume('expanded', opts.totalLimits?.expanded)
              if (opts.limits?.expanded != null && obj.expanded === opts.limits.expanded) {
                throw new MaxLengthError('Streaming decode error - repeated field "expanded" had too many elements')
              }

              yield {
                field: `${prefix}expanded[]`,
                index: obj.expanded,
                value: r.uint32()
              }

              obj.expanded++

              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'LimitedEntry'
          }
        }
      }, { totalLimits: true })
    }

    return _codec
  }

  export interface LimitedEntryIdsFieldEvent {
    field: '.ids[]'
    index: number
    value: Uint8Array<ArrayBuffer>
  }

  export interface LimitedEntryNumbersFieldEvent {
    field: '.numbers[]'
    index: number
    value: number
  }

  export interface LimitedEntryValuesFieldEvent {
    field: '.values{}'
    key: string
    value: Uint8Array<ArrayBuffer>
  }

  export interface LimitedEntryExpandedFieldEvent {
    field: '.expanded[]'
    index: number
    value: number
  }

  export function encode (obj: LimitedEntryInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, LimitedEntry.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<LimitedEntry>): LimitedEntry {
    return decodeMessage(buf, LimitedEntry.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<LimitedEntry>): Generator<LimitedEntryIdsFieldEvent | LimitedEntryNumbersFieldEvent | LimitedEntryValuesFieldEvent | LimitedEntryExpandedFieldEvent> {
    return streamMessage(buf, LimitedEntry.codec(), opts)
  }
}
