/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { enumeration, encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export enum AnEnum {
  HERP = 'HERP',
  DERP = 'DERP'
}

enum __AnEnumValues {
  HERP = 0,
  DERP = 1
}

export namespace AnEnum {
  export const codec = (): Codec<AnEnum> => {
    return enumeration<AnEnum>(__AnEnumValues)
  }
}
export interface SubMessage {
  foo: string
}

export namespace SubMessage {
  let _codec: Codec<SubMessage>

  export const codec = (): Codec<SubMessage> => {
    if (_codec == null) {
      _codec = message<SubMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (opts.writeDefaults === true || (obj.foo != null && obj.foo !== '')) {
          w.uint32(10)
          w.string(obj.foo ?? '')
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          foo: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.foo = reader.string()
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

  export const encode = (obj: Partial<SubMessage>): Uint8Array => {
    return encodeMessage(obj, SubMessage.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): SubMessage => {
    return decodeMessage(buf, SubMessage.codec())
  }
}

export interface AllTheTypes {
  field1?: boolean
  field2?: number
  field3?: bigint
  field4?: number
  field5?: bigint
  field6?: number
  field7?: bigint
  field8?: number
  field9?: number
  field10?: string
  field11?: Uint8Array
  field12?: AnEnum
  field13?: SubMessage
  field14: string[]
  field15?: number
  field16?: bigint
  field17?: number
  field18?: bigint
}

export namespace AllTheTypes {
  let _codec: Codec<AllTheTypes>

  export const codec = (): Codec<AllTheTypes> => {
    if (_codec == null) {
      _codec = message<AllTheTypes>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.field1 != null) {
          w.uint32(8)
          w.bool(obj.field1)
        }

        if (obj.field2 != null) {
          w.uint32(16)
          w.int32(obj.field2)
        }

        if (obj.field3 != null) {
          w.uint32(24)
          w.int64(obj.field3)
        }

        if (obj.field4 != null) {
          w.uint32(32)
          w.uint32(obj.field4)
        }

        if (obj.field5 != null) {
          w.uint32(40)
          w.uint64(obj.field5)
        }

        if (obj.field6 != null) {
          w.uint32(48)
          w.sint32(obj.field6)
        }

        if (obj.field7 != null) {
          w.uint32(56)
          w.sint64(obj.field7)
        }

        if (obj.field8 != null) {
          w.uint32(65)
          w.double(obj.field8)
        }

        if (obj.field9 != null) {
          w.uint32(77)
          w.float(obj.field9)
        }

        if (obj.field10 != null) {
          w.uint32(82)
          w.string(obj.field10)
        }

        if (obj.field11 != null) {
          w.uint32(90)
          w.bytes(obj.field11)
        }

        if (obj.field12 != null) {
          w.uint32(96)
          AnEnum.codec().encode(obj.field12, w)
        }

        if (obj.field13 != null) {
          w.uint32(106)
          SubMessage.codec().encode(obj.field13, w)
        }

        if (obj.field14 != null) {
          for (const value of obj.field14) {
            w.uint32(114)
            w.string(value)
          }
        }

        if (obj.field15 != null) {
          w.uint32(125)
          w.fixed32(obj.field15)
        }

        if (obj.field16 != null) {
          w.uint32(129)
          w.fixed64(obj.field16)
        }

        if (obj.field17 != null) {
          w.uint32(141)
          w.sfixed32(obj.field17)
        }

        if (obj.field18 != null) {
          w.uint32(145)
          w.sfixed64(obj.field18)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          field14: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.field1 = reader.bool()
              break
            case 2:
              obj.field2 = reader.int32()
              break
            case 3:
              obj.field3 = reader.int64()
              break
            case 4:
              obj.field4 = reader.uint32()
              break
            case 5:
              obj.field5 = reader.uint64()
              break
            case 6:
              obj.field6 = reader.sint32()
              break
            case 7:
              obj.field7 = reader.sint64()
              break
            case 8:
              obj.field8 = reader.double()
              break
            case 9:
              obj.field9 = reader.float()
              break
            case 10:
              obj.field10 = reader.string()
              break
            case 11:
              obj.field11 = reader.bytes()
              break
            case 12:
              obj.field12 = AnEnum.codec().decode(reader)
              break
            case 13:
              obj.field13 = SubMessage.codec().decode(reader, reader.uint32())
              break
            case 14:
              obj.field14.push(reader.string())
              break
            case 15:
              obj.field15 = reader.fixed32()
              break
            case 16:
              obj.field16 = reader.fixed64()
              break
            case 17:
              obj.field17 = reader.sfixed32()
              break
            case 18:
              obj.field18 = reader.sfixed64()
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

  export const encode = (obj: Partial<AllTheTypes>): Uint8Array => {
    return encodeMessage(obj, AllTheTypes.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): AllTheTypes => {
    return decodeMessage(buf, AllTheTypes.codec())
  }
}
