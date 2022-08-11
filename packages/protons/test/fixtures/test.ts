/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { enumeration, encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from 'protons-runtime'

export enum AnEnum {
  HERP = 'HERP',
  DERP = 'DERP'
}

enum __AnEnumValues {
  HERP = 0,
  DERP = 1
}

export namespace AnEnum {
  export const codec = () => {
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
      _codec = message<SubMessage>((obj, writer, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          writer.fork()
        }

        if (obj.foo != null) {
          writer.uint32(10)
          writer.string(obj.foo)
        } else {
          throw new Error('Protocol error: required field "foo" was not found in object')
        }

        if (opts.lengthDelimited !== false) {
          writer.ldelim()
        }
      }, (reader, length) => {
        const obj: SubMessage = {
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

        if (obj.foo == null) {
          throw new Error('Protocol error: value for required field "foo" was not found in protobuf')
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: SubMessage): Uint8Array => {
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
      _codec = message<AllTheTypes>((obj, writer, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          writer.fork()
        }

        if (obj.field1 != null) {
          writer.uint32(8)
          writer.bool(obj.field1)
        }

        if (obj.field2 != null) {
          writer.uint32(16)
          writer.int32(obj.field2)
        }

        if (obj.field3 != null) {
          writer.uint32(24)
          writer.int64(obj.field3)
        }

        if (obj.field4 != null) {
          writer.uint32(32)
          writer.uint32(obj.field4)
        }

        if (obj.field5 != null) {
          writer.uint32(40)
          writer.uint64(obj.field5)
        }

        if (obj.field6 != null) {
          writer.uint32(48)
          writer.sint32(obj.field6)
        }

        if (obj.field7 != null) {
          writer.uint32(56)
          writer.sint64(obj.field7)
        }

        if (obj.field8 != null) {
          writer.uint32(65)
          writer.double(obj.field8)
        }

        if (obj.field9 != null) {
          writer.uint32(77)
          writer.float(obj.field9)
        }

        if (obj.field10 != null) {
          writer.uint32(82)
          writer.string(obj.field10)
        }

        if (obj.field11 != null) {
          writer.uint32(90)
          writer.bytes(obj.field11)
        }

        if (obj.field12 != null) {
          writer.uint32(96)
          AnEnum.codec().encode(obj.field12, writer)
        }

        if (obj.field13 != null) {
          writer.uint32(106)
          SubMessage.codec().encode(obj.field13, writer)
        }

        if (obj.field14 != null) {
          for (const value of obj.field14) {
            writer.uint32(114)
            writer.string(value)
          }
        } else {
          throw new Error('Protocol error: required field "field14" was not found in object')
        }

        if (obj.field15 != null) {
          writer.uint32(125)
          writer.fixed32(obj.field15)
        }

        if (obj.field16 != null) {
          writer.uint32(129)
          writer.fixed64(obj.field16)
        }

        if (obj.field17 != null) {
          writer.uint32(141)
          writer.sfixed32(obj.field17)
        }

        if (obj.field18 != null) {
          writer.uint32(145)
          writer.sfixed64(obj.field18)
        }

        if (opts.lengthDelimited !== false) {
          writer.ldelim()
        }
      }, (reader, length) => {
        const obj: AllTheTypes = {
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

  export const encode = (obj: AllTheTypes): Uint8Array => {
    return encodeMessage(obj, AllTheTypes.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): AllTheTypes => {
    return decodeMessage(buf, AllTheTypes.codec())
  }
}
