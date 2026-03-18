import { decodeMessage, encodeMessage, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface CustomOptionNumber {
  num: number
  i64: number
  ui64: number
  si64: number
  f64: number
  sf64: number
}

export namespace CustomOptionNumber {
  let _codec: Codec<CustomOptionNumber, CustomOptionNumberStreamEvent, CustomOptionNumberStreamCollectionsEvent>

  export const codec = (): Codec<CustomOptionNumber, CustomOptionNumberStreamEvent, CustomOptionNumberStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<CustomOptionNumber, CustomOptionNumberStreamEvent, CustomOptionNumberStreamCollectionsEvent>((obj, w, opts = {}) => {
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
          sf64: 0
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
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (reader, length, opts = {}) {
        let obj: any

        if (opts.emitCollections === true) {
          obj = {
            num: 0,
            i64: 0,
            ui64: 0,
            si64: 0,
            f64: 0,
            sf64: 0
          }
        } else {
          obj = {}
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'num',
                value: reader.int32()
              }
              break
            }
            case 2: {
              yield {
                field: 'i64',
                value: reader.int64Number()
              }
              break
            }
            case 3: {
              yield {
                field: 'ui64',
                value: reader.uint64Number()
              }
              break
            }
            case 4: {
              yield {
                field: 'si64',
                value: reader.sint64Number()
              }
              break
            }
            case 5: {
              yield {
                field: 'f64',
                value: reader.fixed64Number()
              }
              break
            }
            case 6: {
              yield {
                field: 'sf64',
                value: reader.sfixed64Number()
              }
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        if (opts.emitCollections === true) {
          for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value) || value instanceof Map) {
              yield {
                field: key,
                value
              }
            }
          }
        }
      })
    }

    return _codec
  }

  export interface CustomOptionNumberNumFieldEvent {
    field: 'num'
    value: number
  }

  export interface CustomOptionNumberI64FieldEvent {
    field: 'i64'
    value: number
  }

  export interface CustomOptionNumberUi64FieldEvent {
    field: 'ui64'
    value: number
  }

  export interface CustomOptionNumberSi64FieldEvent {
    field: 'si64'
    value: number
  }

  export interface CustomOptionNumberF64FieldEvent {
    field: 'f64'
    value: number
  }

  export interface CustomOptionNumberSf64FieldEvent {
    field: 'sf64'
    value: number
  }

  export type CustomOptionNumberStreamEvent = CustomOptionNumberNumFieldEvent | CustomOptionNumberI64FieldEvent | CustomOptionNumberUi64FieldEvent | CustomOptionNumberSi64FieldEvent | CustomOptionNumberF64FieldEvent | CustomOptionNumberSf64FieldEvent
  export type CustomOptionNumberStreamCollectionsEvent = {}

  export function encode (obj: Partial<CustomOptionNumber>): Uint8Array {
    return encodeMessage(obj, CustomOptionNumber.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionNumber>): CustomOptionNumber {
    return decodeMessage(buf, CustomOptionNumber.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<CustomOptionNumber>): Generator<CustomOptionNumberStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<CustomOptionNumber>): Generator<CustomOptionNumberStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
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
}

export namespace CustomOptionString {
  let _codec: Codec<CustomOptionString, CustomOptionStringStreamEvent, CustomOptionStringStreamCollectionsEvent>

  export const codec = (): Codec<CustomOptionString, CustomOptionStringStreamEvent, CustomOptionStringStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<CustomOptionString, CustomOptionStringStreamEvent, CustomOptionStringStreamCollectionsEvent>((obj, w, opts = {}) => {
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
          sf64: ''
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
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (reader, length, opts = {}) {
        let obj: any

        if (opts.emitCollections === true) {
          obj = {
            num: 0,
            i64: '',
            ui64: '',
            si64: '',
            f64: '',
            sf64: ''
          }
        } else {
          obj = {}
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'num',
                value: reader.int32()
              }
              break
            }
            case 2: {
              yield {
                field: 'i64',
                value: reader.int64String()
              }
              break
            }
            case 3: {
              yield {
                field: 'ui64',
                value: reader.uint64String()
              }
              break
            }
            case 4: {
              yield {
                field: 'si64',
                value: reader.sint64String()
              }
              break
            }
            case 5: {
              yield {
                field: 'f64',
                value: reader.fixed64String()
              }
              break
            }
            case 6: {
              yield {
                field: 'sf64',
                value: reader.sfixed64String()
              }
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        if (opts.emitCollections === true) {
          for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value) || value instanceof Map) {
              yield {
                field: key,
                value
              }
            }
          }
        }
      })
    }

    return _codec
  }

  export interface CustomOptionStringNumFieldEvent {
    field: 'num'
    value: number
  }

  export interface CustomOptionStringI64FieldEvent {
    field: 'i64'
    value: string
  }

  export interface CustomOptionStringUi64FieldEvent {
    field: 'ui64'
    value: string
  }

  export interface CustomOptionStringSi64FieldEvent {
    field: 'si64'
    value: string
  }

  export interface CustomOptionStringF64FieldEvent {
    field: 'f64'
    value: string
  }

  export interface CustomOptionStringSf64FieldEvent {
    field: 'sf64'
    value: string
  }

  export type CustomOptionStringStreamEvent = CustomOptionStringNumFieldEvent | CustomOptionStringI64FieldEvent | CustomOptionStringUi64FieldEvent | CustomOptionStringSi64FieldEvent | CustomOptionStringF64FieldEvent | CustomOptionStringSf64FieldEvent
  export type CustomOptionStringStreamCollectionsEvent = {}

  export function encode (obj: Partial<CustomOptionString>): Uint8Array {
    return encodeMessage(obj, CustomOptionString.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CustomOptionString>): CustomOptionString {
    return decodeMessage(buf, CustomOptionString.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<CustomOptionString>): Generator<CustomOptionStringStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<CustomOptionString>): Generator<CustomOptionStringStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, CustomOptionString.codec(), opts)
  }
}
