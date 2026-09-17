import { decodeMessage, encodeMessage, enumeration, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export enum SingularEnum {
  NO_VALUE = 'NO_VALUE',
  VALUE_1 = 'VALUE_1',
  VALUE_2 = 'VALUE_2'
}

enum __SingularEnumValues {
  NO_VALUE = 0,
  VALUE_1 = 1,
  VALUE_2 = 2
}

export namespace SingularEnum {
  export const codec = (): Codec<SingularEnum> => {
    return enumeration<SingularEnum>(__SingularEnumValues)
  }
}

export interface SingularSubMessage {
  foo: string
  bar: number
}

export namespace SingularSubMessage {
  let _codec: Codec<SingularSubMessage>

  export const codec = (): Codec<SingularSubMessage> => {
    if (_codec == null) {
      _codec = message<SingularSubMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.foo != null && obj.foo !== '')) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if ((obj.bar != null && obj.bar !== 0)) {
          w.uint32(16)
          w.int32(obj.bar)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          foo: '',
          bar: 0
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.foo = r.string()
              break
            }
            case 2: {
              obj.bar = r.int32()
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
        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'SingularSubMessage'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}foo`,
                value: r.string()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}bar`,
                value: r.int32()
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
            message: 'SingularSubMessage'
          }
        }
      })
    }

    return _codec
  }

  export interface SingularSubMessageFooFieldEvent {
    field: '.foo'
    value: string
  }

  export interface SingularSubMessageBarFieldEvent {
    field: '.bar'
    value: number
  }

  export function encode (obj: Partial<SingularSubMessage>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, SingularSubMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SingularSubMessage>): SingularSubMessage {
    return decodeMessage(buf, SingularSubMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SingularSubMessage>): Generator<SingularSubMessageFooFieldEvent | SingularSubMessageBarFieldEvent> {
    return streamMessage(buf, SingularSubMessage.codec(), opts)
  }
}

export interface Singular {
  double: number
  float: number
  int32: number
  int64: bigint
  uint32: number
  uint64: bigint
  sint32: number
  sint64: bigint
  fixed32: number
  fixed64: bigint
  sfixed32: number
  sfixed64: bigint
  bool: boolean
  string: string
  bytes: Uint8Array<ArrayBuffer>
  enum: SingularEnum
  subMessage?: SingularSubMessage
}

export namespace Singular {
  let _codec: Codec<Singular>

  export const codec = (): Codec<Singular> => {
    if (_codec == null) {
      _codec = message<Singular>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.double != null && obj.double !== 0)) {
          w.uint32(9)
          w.double(obj.double)
        }

        if ((obj.float != null && obj.float !== 0)) {
          w.uint32(21)
          w.float(obj.float)
        }

        if ((obj.int32 != null && obj.int32 !== 0)) {
          w.uint32(24)
          w.int32(obj.int32)
        }

        if ((obj.int64 != null && obj.int64 !== 0n)) {
          w.uint32(32)
          w.int64(obj.int64)
        }

        if ((obj.uint32 != null && obj.uint32 !== 0)) {
          w.uint32(40)
          w.uint32(obj.uint32)
        }

        if ((obj.uint64 != null && obj.uint64 !== 0n)) {
          w.uint32(48)
          w.uint64(obj.uint64)
        }

        if ((obj.sint32 != null && obj.sint32 !== 0)) {
          w.uint32(56)
          w.sint32(obj.sint32)
        }

        if ((obj.sint64 != null && obj.sint64 !== 0n)) {
          w.uint32(64)
          w.sint64(obj.sint64)
        }

        if ((obj.fixed32 != null && obj.fixed32 !== 0)) {
          w.uint32(77)
          w.fixed32(obj.fixed32)
        }

        if ((obj.fixed64 != null && obj.fixed64 !== 0n)) {
          w.uint32(81)
          w.fixed64(obj.fixed64)
        }

        if ((obj.sfixed32 != null && obj.sfixed32 !== 0)) {
          w.uint32(93)
          w.sfixed32(obj.sfixed32)
        }

        if ((obj.sfixed64 != null && obj.sfixed64 !== 0n)) {
          w.uint32(97)
          w.sfixed64(obj.sfixed64)
        }

        if ((obj.bool != null && obj.bool !== false)) {
          w.uint32(104)
          w.bool(obj.bool)
        }

        if ((obj.string != null && obj.string !== '')) {
          w.uint32(114)
          w.string(obj.string)
        }

        if ((obj.bytes != null && obj.bytes.byteLength > 0)) {
          w.uint32(122)
          w.bytes(obj.bytes)
        }

        if (obj.enum != null && __SingularEnumValues[obj.enum] !== 0) {
          w.uint32(128)
          SingularEnum.codec().encode(obj.enum, w)
        }

        if (obj.subMessage != null) {
          w.uint32(138)
          SingularSubMessage.codec().encode(obj.subMessage, w)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          double: 0,
          float: 0,
          int32: 0,
          int64: 0n,
          uint32: 0,
          uint64: 0n,
          sint32: 0,
          sint64: 0n,
          fixed32: 0,
          fixed64: 0n,
          sfixed32: 0,
          sfixed64: 0n,
          bool: false,
          string: '',
          bytes: uint8ArrayAlloc(0),
          enum: SingularEnum.NO_VALUE
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.double = r.double()
              break
            }
            case 2: {
              obj.float = r.float()
              break
            }
            case 3: {
              obj.int32 = r.int32()
              break
            }
            case 4: {
              obj.int64 = r.int64()
              break
            }
            case 5: {
              obj.uint32 = r.uint32()
              break
            }
            case 6: {
              obj.uint64 = r.uint64()
              break
            }
            case 7: {
              obj.sint32 = r.sint32()
              break
            }
            case 8: {
              obj.sint64 = r.sint64()
              break
            }
            case 9: {
              obj.fixed32 = r.fixed32()
              break
            }
            case 10: {
              obj.fixed64 = r.fixed64()
              break
            }
            case 11: {
              obj.sfixed32 = r.sfixed32()
              break
            }
            case 12: {
              obj.sfixed64 = r.sfixed64()
              break
            }
            case 13: {
              obj.bool = r.bool()
              break
            }
            case 14: {
              obj.string = r.string()
              break
            }
            case 15: {
              obj.bytes = r.bytes()
              break
            }
            case 16: {
              obj.enum = SingularEnum.codec().decode(r)
              break
            }
            case 17: {
              obj.subMessage = SingularSubMessage.codec().decode(r, r.uint32(), {
                limits: opts.limits?.subMessage
              })
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
        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'Singular'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}double`,
                value: r.double()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}float`,
                value: r.float()
              }
              break
            }
            case 3: {
              yield {
                field: `${prefix}int32`,
                value: r.int32()
              }
              break
            }
            case 4: {
              yield {
                field: `${prefix}int64`,
                value: r.int64()
              }
              break
            }
            case 5: {
              yield {
                field: `${prefix}uint32`,
                value: r.uint32()
              }
              break
            }
            case 6: {
              yield {
                field: `${prefix}uint64`,
                value: r.uint64()
              }
              break
            }
            case 7: {
              yield {
                field: `${prefix}sint32`,
                value: r.sint32()
              }
              break
            }
            case 8: {
              yield {
                field: `${prefix}sint64`,
                value: r.sint64()
              }
              break
            }
            case 9: {
              yield {
                field: `${prefix}fixed32`,
                value: r.fixed32()
              }
              break
            }
            case 10: {
              yield {
                field: `${prefix}fixed64`,
                value: r.fixed64()
              }
              break
            }
            case 11: {
              yield {
                field: `${prefix}sfixed32`,
                value: r.sfixed32()
              }
              break
            }
            case 12: {
              yield {
                field: `${prefix}sfixed64`,
                value: r.sfixed64()
              }
              break
            }
            case 13: {
              yield {
                field: `${prefix}bool`,
                value: r.bool()
              }
              break
            }
            case 14: {
              yield {
                field: `${prefix}string`,
                value: r.string()
              }
              break
            }
            case 15: {
              yield {
                field: `${prefix}bytes`,
                value: r.bytes()
              }
              break
            }
            case 16: {
              yield {
                field: `${prefix}enum`,
                value: SingularEnum.codec().decode(r)
              }
              break
            }
            case 17: {
              yield * SingularSubMessage.codec().stream(r, r.uint32(), `${prefix}subMessage.`, {
                limits: opts.limits?.subMessage
              })

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
            message: 'Singular'
          }
        }
      })
    }

    return _codec
  }

  export interface SingularDoubleFieldEvent {
    field: '.double'
    value: number
  }

  export interface SingularFloatFieldEvent {
    field: '.float'
    value: number
  }

  export interface SingularInt32FieldEvent {
    field: '.int32'
    value: number
  }

  export interface SingularInt64FieldEvent {
    field: '.int64'
    value: bigint
  }

  export interface SingularUint32FieldEvent {
    field: '.uint32'
    value: number
  }

  export interface SingularUint64FieldEvent {
    field: '.uint64'
    value: bigint
  }

  export interface SingularSint32FieldEvent {
    field: '.sint32'
    value: number
  }

  export interface SingularSint64FieldEvent {
    field: '.sint64'
    value: bigint
  }

  export interface SingularFixed32FieldEvent {
    field: '.fixed32'
    value: number
  }

  export interface SingularFixed64FieldEvent {
    field: '.fixed64'
    value: bigint
  }

  export interface SingularSfixed32FieldEvent {
    field: '.sfixed32'
    value: number
  }

  export interface SingularSfixed64FieldEvent {
    field: '.sfixed64'
    value: bigint
  }

  export interface SingularBoolFieldEvent {
    field: '.bool'
    value: boolean
  }

  export interface SingularStringFieldEvent {
    field: '.string'
    value: string
  }

  export interface SingularBytesFieldEvent {
    field: '.bytes'
    value: Uint8Array<ArrayBuffer>
  }

  export interface SingularEnumFieldEvent {
    field: '.enum'
    value: SingularEnum
  }

  export interface SingularSubMessageMessageStart {
    field: '.subMessage'
    type: 'start'
  }

  export interface SingularSubMessageMessageEnd {
    field: '.subMessage'
    type: 'end'
  }

  export interface SingularSubMessageFooFieldEvent {
    field: '.subMessage.foo'
    value: string
  }

  export interface SingularSubMessageBarFieldEvent {
    field: '.subMessage.bar'
    value: number
  }

  export function encode (obj: Partial<Singular>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Singular.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Singular>): Singular {
    return decodeMessage(buf, Singular.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Singular>): Generator<SingularDoubleFieldEvent | SingularFloatFieldEvent | SingularInt32FieldEvent | SingularInt64FieldEvent | SingularUint32FieldEvent | SingularUint64FieldEvent | SingularSint32FieldEvent | SingularSint64FieldEvent | SingularFixed32FieldEvent | SingularFixed64FieldEvent | SingularSfixed32FieldEvent | SingularSfixed64FieldEvent | SingularBoolFieldEvent | SingularStringFieldEvent | SingularBytesFieldEvent | SingularEnumFieldEvent | SingularSubMessageMessageStart | SingularSubMessageMessageEnd | SingularSubMessageFooFieldEvent | SingularSubMessageBarFieldEvent> {
    return streamMessage(buf, Singular.codec(), opts)
  }
}
