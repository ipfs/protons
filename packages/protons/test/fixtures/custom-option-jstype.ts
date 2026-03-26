import { decodeMessage, encodeMessage, MaxLengthError, MaxSizeError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface CustomOptionNumber {
  num: number
  i64: number
  ui64: number
  si64: number
  f64: number
  sf64: number
  i64Array: number[]
  i64Map: Map<number, number>
}

export namespace CustomOptionNumber {
  export interface CustomOptionNumber$i64MapEntry {
    key: number
    value: number
  }

  export namespace CustomOptionNumber$i64MapEntry {
    let _codec: Codec<CustomOptionNumber$i64MapEntry>

    export const codec = (): Codec<CustomOptionNumber$i64MapEntry> => {
      if (_codec == null) {
        _codec = message<CustomOptionNumber$i64MapEntry>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== 0)) {
            w.uint32(8)
            w.int64Number(obj.key)
          }

          if ((obj.value != null && obj.value !== 0)) {
            w.uint32(16)
            w.int64Number(obj.value)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            key: 0,
            value: 0
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = reader.int64Number()
                break
              }
              case 2: {
                obj.value = reader.int64Number()
                break
              }
              default: {
                reader.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (reader, length, prefix, opts = {}) {
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}.key`,
                  value: reader.int64Number()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}.value`,
                  value: reader.int64Number()
                }
                break
              }
              default: {
                reader.skipType(tag & 7)
                break
              }
            }
          }
        })
      }

      return _codec
    }

    export interface CustomOptionNumber$i64MapEntryKeyFieldEvent {
      field: '$.key'
      value: number
    }

    export interface CustomOptionNumber$i64MapEntryValueFieldEvent {
      field: '$.value'
      value: number
    }

    export function encode (obj: Partial<CustomOptionNumber$i64MapEntry>): Uint8Array {
      return encodeMessage(obj, CustomOptionNumber$i64MapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionNumber$i64MapEntry>): CustomOptionNumber$i64MapEntry {
      return decodeMessage(buf, CustomOptionNumber$i64MapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionNumber$i64MapEntry>): Generator<CustomOptionNumber$i64MapEntryKeyFieldEvent | CustomOptionNumber$i64MapEntryValueFieldEvent> {
      return streamMessage(buf, CustomOptionNumber$i64MapEntry.codec(), opts)
    }
  }

  let _codec: Codec<CustomOptionNumber>

  export const codec = (): Codec<CustomOptionNumber> => {
    if (_codec == null) {
      _codec = message<CustomOptionNumber>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.num != null && obj.num !== 0)) {
          w.uint32(8)
          w.int32(obj.num)
        }

        if ((obj.i64 != null && obj.i64 !== 0)) {
          w.uint32(16)
          w.int64Number(obj.i64)
        }

        if ((obj.ui64 != null && obj.ui64 !== 0)) {
          w.uint32(24)
          w.uint64Number(obj.ui64)
        }

        if ((obj.si64 != null && obj.si64 !== 0)) {
          w.uint32(32)
          w.sint64Number(obj.si64)
        }

        if ((obj.f64 != null && obj.f64 !== 0)) {
          w.uint32(41)
          w.fixed64Number(obj.f64)
        }

        if ((obj.sf64 != null && obj.sf64 !== 0)) {
          w.uint32(49)
          w.sfixed64Number(obj.sf64)
        }

        if (obj.i64Array != null) {
          for (const value of obj.i64Array) {
            w.uint32(56)
            w.int64Number(value)
          }
        }

        if (obj.i64Map != null) {
          for (const [key, value] of obj.i64Map.entries()) {
            w.uint32(66)
            CustomOptionNumber.CustomOptionNumber$i64MapEntry.codec().encode({ key, value }, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          num: 0,
          i64: 0,
          ui64: 0,
          si64: 0,
          f64: 0,
          sf64: 0,
          i64Array: [],
          i64Map: new Map<number, number>()
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.num = reader.int32()
              break
            }
            case 2: {
              obj.i64 = reader.int64Number()
              break
            }
            case 3: {
              obj.ui64 = reader.uint64Number()
              break
            }
            case 4: {
              obj.si64 = reader.sint64Number()
              break
            }
            case 5: {
              obj.f64 = reader.fixed64Number()
              break
            }
            case 6: {
              obj.sf64 = reader.sfixed64Number()
              break
            }
            case 7: {
              if (opts.limits?.i64Array != null && obj.i64Array.length === opts.limits.i64Array) {
                throw new MaxLengthError('Decode error - repeated field "i64Array" had too many elements')
              }

              obj.i64Array.push(reader.int64Number())
              break
            }
            case 8: {
              if (opts.limits?.i64Map != null && obj.i64Map.size === opts.limits.i64Map) {
                throw new MaxSizeError('Decode error - map field "i64Map" had too many elements')
              }

              const entry = CustomOptionNumber.CustomOptionNumber$i64MapEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.i64Map$value
                }
              })
              obj.i64Map.set(entry.key, entry.value)
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (reader, length, prefix, opts = {}) {
        const obj = {
          i64Array: 0,
          i64Map: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.num`,
                value: reader.int32()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}.i64`,
                value: reader.int64Number()
              }
              break
            }
            case 3: {
              yield {
                field: `${prefix}.ui64`,
                value: reader.uint64Number()
              }
              break
            }
            case 4: {
              yield {
                field: `${prefix}.si64`,
                value: reader.sint64Number()
              }
              break
            }
            case 5: {
              yield {
                field: `${prefix}.f64`,
                value: reader.fixed64Number()
              }
              break
            }
            case 6: {
              yield {
                field: `${prefix}.sf64`,
                value: reader.sfixed64Number()
              }
              break
            }
            case 7: {
              if (opts.limits?.i64Array != null && obj.i64Array === opts.limits.i64Array) {
                throw new MaxLengthError('Streaming decode error - repeated field "i64Array" had too many elements')
              }

              yield {
                field: `${prefix}.i64Array[]`,
                index: obj.i64Array,
                value: reader.int64Number()
              }

              obj.i64Array++

              break
            }
            case 8: {
              if (opts.limits?.i64Map != null && obj.i64Map === opts.limits.i64Map) {
                throw new MaxLengthError('Decode error - map field "i64Map" had too many elements')
              }

              yield * CustomOptionNumber.CustomOptionNumber$i64MapEntry.codec().stream(reader, reader.uint32(), `${prefix}.i64Map{}`, {
                limits: {
                  value: opts.limits?.i64Map$value
                }
              })

              obj.i64Map++

              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }
      })
    }

    return _codec
  }

  export interface CustomOptionNumberNumFieldEvent {
    field: '$.num'
    value: number
  }

  export interface CustomOptionNumberI64FieldEvent {
    field: '$.i64'
    value: number
  }

  export interface CustomOptionNumberUi64FieldEvent {
    field: '$.ui64'
    value: number
  }

  export interface CustomOptionNumberSi64FieldEvent {
    field: '$.si64'
    value: number
  }

  export interface CustomOptionNumberF64FieldEvent {
    field: '$.f64'
    value: number
  }

  export interface CustomOptionNumberSf64FieldEvent {
    field: '$.sf64'
    value: number
  }

  export interface CustomOptionNumberI64ArrayFieldEvent {
    field: '$.i64Array[]'
    index: number
    value: number
  }

  export interface CustomOptionNumberI64MapFieldEvent {
    field: '$.i64Map{}'
    key: number
    value: number
  }

  export function encode (obj: Partial<CustomOptionNumber>): Uint8Array {
    return encodeMessage(obj, CustomOptionNumber.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionNumber>): CustomOptionNumber {
    return decodeMessage(buf, CustomOptionNumber.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionNumber>): Generator<CustomOptionNumberNumFieldEvent | CustomOptionNumberI64FieldEvent | CustomOptionNumberUi64FieldEvent | CustomOptionNumberSi64FieldEvent | CustomOptionNumberF64FieldEvent | CustomOptionNumberSf64FieldEvent | CustomOptionNumberI64ArrayFieldEvent | CustomOptionNumberI64MapFieldEvent> {
    return streamMessage(buf, CustomOptionNumber.codec(), opts)
  }
}

export interface CustomOptionString {
  num: number
  i64: string
  ui64: string
  si64: string
  f64: string
  sf64: string
  i64Array: string[]
  i64Map: Map<string, string>
}

export namespace CustomOptionString {
  export interface CustomOptionString$i64MapEntry {
    key: string
    value: string
  }

  export namespace CustomOptionString$i64MapEntry {
    let _codec: Codec<CustomOptionString$i64MapEntry>

    export const codec = (): Codec<CustomOptionString$i64MapEntry> => {
      if (_codec == null) {
        _codec = message<CustomOptionString$i64MapEntry>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== '')) {
            w.uint32(8)
            w.int64String(obj.key)
          }

          if ((obj.value != null && obj.value !== '')) {
            w.uint32(16)
            w.int64String(obj.value)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            key: '',
            value: ''
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = reader.int64String()
                break
              }
              case 2: {
                obj.value = reader.int64String()
                break
              }
              default: {
                reader.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (reader, length, prefix, opts = {}) {
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}.key`,
                  value: reader.int64String()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}.value`,
                  value: reader.int64String()
                }
                break
              }
              default: {
                reader.skipType(tag & 7)
                break
              }
            }
          }
        })
      }

      return _codec
    }

    export interface CustomOptionString$i64MapEntryKeyFieldEvent {
      field: '$.key'
      value: string
    }

    export interface CustomOptionString$i64MapEntryValueFieldEvent {
      field: '$.value'
      value: string
    }

    export function encode (obj: Partial<CustomOptionString$i64MapEntry>): Uint8Array {
      return encodeMessage(obj, CustomOptionString$i64MapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionString$i64MapEntry>): CustomOptionString$i64MapEntry {
      return decodeMessage(buf, CustomOptionString$i64MapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionString$i64MapEntry>): Generator<CustomOptionString$i64MapEntryKeyFieldEvent | CustomOptionString$i64MapEntryValueFieldEvent> {
      return streamMessage(buf, CustomOptionString$i64MapEntry.codec(), opts)
    }
  }

  let _codec: Codec<CustomOptionString>

  export const codec = (): Codec<CustomOptionString> => {
    if (_codec == null) {
      _codec = message<CustomOptionString>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.num != null && obj.num !== 0)) {
          w.uint32(8)
          w.int32(obj.num)
        }

        if ((obj.i64 != null && obj.i64 !== '')) {
          w.uint32(16)
          w.int64String(obj.i64)
        }

        if ((obj.ui64 != null && obj.ui64 !== '')) {
          w.uint32(24)
          w.uint64String(obj.ui64)
        }

        if ((obj.si64 != null && obj.si64 !== '')) {
          w.uint32(32)
          w.sint64String(obj.si64)
        }

        if ((obj.f64 != null && obj.f64 !== '')) {
          w.uint32(41)
          w.fixed64String(obj.f64)
        }

        if ((obj.sf64 != null && obj.sf64 !== '')) {
          w.uint32(49)
          w.sfixed64String(obj.sf64)
        }

        if (obj.i64Array != null) {
          for (const value of obj.i64Array) {
            w.uint32(56)
            w.int64String(value)
          }
        }

        if (obj.i64Map != null) {
          for (const [key, value] of obj.i64Map.entries()) {
            w.uint32(66)
            CustomOptionString.CustomOptionString$i64MapEntry.codec().encode({ key, value }, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          num: 0,
          i64: '',
          ui64: '',
          si64: '',
          f64: '',
          sf64: '',
          i64Array: [],
          i64Map: new Map<string, string>()
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.num = reader.int32()
              break
            }
            case 2: {
              obj.i64 = reader.int64String()
              break
            }
            case 3: {
              obj.ui64 = reader.uint64String()
              break
            }
            case 4: {
              obj.si64 = reader.sint64String()
              break
            }
            case 5: {
              obj.f64 = reader.fixed64String()
              break
            }
            case 6: {
              obj.sf64 = reader.sfixed64String()
              break
            }
            case 7: {
              if (opts.limits?.i64Array != null && obj.i64Array.length === opts.limits.i64Array) {
                throw new MaxLengthError('Decode error - repeated field "i64Array" had too many elements')
              }

              obj.i64Array.push(reader.int64String())
              break
            }
            case 8: {
              if (opts.limits?.i64Map != null && obj.i64Map.size === opts.limits.i64Map) {
                throw new MaxSizeError('Decode error - map field "i64Map" had too many elements')
              }

              const entry = CustomOptionString.CustomOptionString$i64MapEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.i64Map$value
                }
              })
              obj.i64Map.set(entry.key, entry.value)
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (reader, length, prefix, opts = {}) {
        const obj = {
          i64Array: 0,
          i64Map: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.num`,
                value: reader.int32()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}.i64`,
                value: reader.int64String()
              }
              break
            }
            case 3: {
              yield {
                field: `${prefix}.ui64`,
                value: reader.uint64String()
              }
              break
            }
            case 4: {
              yield {
                field: `${prefix}.si64`,
                value: reader.sint64String()
              }
              break
            }
            case 5: {
              yield {
                field: `${prefix}.f64`,
                value: reader.fixed64String()
              }
              break
            }
            case 6: {
              yield {
                field: `${prefix}.sf64`,
                value: reader.sfixed64String()
              }
              break
            }
            case 7: {
              if (opts.limits?.i64Array != null && obj.i64Array === opts.limits.i64Array) {
                throw new MaxLengthError('Streaming decode error - repeated field "i64Array" had too many elements')
              }

              yield {
                field: `${prefix}.i64Array[]`,
                index: obj.i64Array,
                value: reader.int64String()
              }

              obj.i64Array++

              break
            }
            case 8: {
              if (opts.limits?.i64Map != null && obj.i64Map === opts.limits.i64Map) {
                throw new MaxLengthError('Decode error - map field "i64Map" had too many elements')
              }

              yield * CustomOptionString.CustomOptionString$i64MapEntry.codec().stream(reader, reader.uint32(), `${prefix}.i64Map{}`, {
                limits: {
                  value: opts.limits?.i64Map$value
                }
              })

              obj.i64Map++

              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }
      })
    }

    return _codec
  }

  export interface CustomOptionStringNumFieldEvent {
    field: '$.num'
    value: number
  }

  export interface CustomOptionStringI64FieldEvent {
    field: '$.i64'
    value: string
  }

  export interface CustomOptionStringUi64FieldEvent {
    field: '$.ui64'
    value: string
  }

  export interface CustomOptionStringSi64FieldEvent {
    field: '$.si64'
    value: string
  }

  export interface CustomOptionStringF64FieldEvent {
    field: '$.f64'
    value: string
  }

  export interface CustomOptionStringSf64FieldEvent {
    field: '$.sf64'
    value: string
  }

  export interface CustomOptionStringI64ArrayFieldEvent {
    field: '$.i64Array[]'
    index: number
    value: string
  }

  export interface CustomOptionStringI64MapFieldEvent {
    field: '$.i64Map{}'
    key: string
    value: string
  }

  export function encode (obj: Partial<CustomOptionString>): Uint8Array {
    return encodeMessage(obj, CustomOptionString.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionString>): CustomOptionString {
    return decodeMessage(buf, CustomOptionString.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionString>): Generator<CustomOptionStringNumFieldEvent | CustomOptionStringI64FieldEvent | CustomOptionStringUi64FieldEvent | CustomOptionStringSi64FieldEvent | CustomOptionStringF64FieldEvent | CustomOptionStringSf64FieldEvent | CustomOptionStringI64ArrayFieldEvent | CustomOptionStringI64MapFieldEvent> {
    return streamMessage(buf, CustomOptionString.codec(), opts)
  }
}
