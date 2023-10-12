/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { enumeration, encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
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
      }, (reader, length) => {
        const obj: any = {
          foo: '',
          bar: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.foo = reader.string()
              break
            case 2:
              obj.bar = reader.int32()
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<SingularSubMessage>): Uint8Array => {
    return encodeMessage(obj, SingularSubMessage.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): SingularSubMessage => {
    return decodeMessage(buf, SingularSubMessage.codec())
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
  bytes: Uint8Array
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
      }, (reader, length) => {
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
          bytes: new Uint8Array(0),
          enum: SingularEnum.NO_VALUE
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.double = reader.double()
              break
            case 2:
              obj.float = reader.float()
              break
            case 3:
              obj.int32 = reader.int32()
              break
            case 4:
              obj.int64 = reader.int64()
              break
            case 5:
              obj.uint32 = reader.uint32()
              break
            case 6:
              obj.uint64 = reader.uint64()
              break
            case 7:
              obj.sint32 = reader.sint32()
              break
            case 8:
              obj.sint64 = reader.sint64()
              break
            case 9:
              obj.fixed32 = reader.fixed32()
              break
            case 10:
              obj.fixed64 = reader.fixed64()
              break
            case 11:
              obj.sfixed32 = reader.sfixed32()
              break
            case 12:
              obj.sfixed64 = reader.sfixed64()
              break
            case 13:
              obj.bool = reader.bool()
              break
            case 14:
              obj.string = reader.string()
              break
            case 15:
              obj.bytes = reader.bytes()
              break
            case 16:
              obj.enum = SingularEnum.codec().decode(reader)
              break
            case 17:
              obj.subMessage = SingularSubMessage.codec().decode(reader, reader.uint32())
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<Singular>): Uint8Array => {
    return encodeMessage(obj, Singular.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Singular => {
    return decodeMessage(buf, Singular.codec())
  }
}
