/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { enumeration, encodeMessage, decodeMessage, message, string, bool, int32, int64, uint32, uint64, sint32, sint64, double, float, bytes, fixed32, fixed64, sfixed32, sfixed64 } from 'protons-runtime'
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
  export const codec = () => {
    return enumeration<typeof AnEnum>(__AnEnumValues)
  }
}
export interface SubMessage {
  foo: string
}

export namespace SubMessage {
  let _codec: Codec<SubMessage>

  export const codec = (): Codec<SubMessage> => {
    if (_codec == null) {
      _codec = message<SubMessage>([
        { id: 1, name: 'foo', codec: string }
      ])
    }

    return _codec
  }

  export const encode = (obj: SubMessage): Uint8ArrayList => {
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
      _codec = message<AllTheTypes>([
        { id: 1, name: 'field1', codec: bool, optional: true },
        { id: 2, name: 'field2', codec: int32, optional: true },
        { id: 3, name: 'field3', codec: int64, optional: true },
        { id: 4, name: 'field4', codec: uint32, optional: true },
        { id: 5, name: 'field5', codec: uint64, optional: true },
        { id: 6, name: 'field6', codec: sint32, optional: true },
        { id: 7, name: 'field7', codec: sint64, optional: true },
        { id: 8, name: 'field8', codec: double, optional: true },
        { id: 9, name: 'field9', codec: float, optional: true },
        { id: 10, name: 'field10', codec: string, optional: true },
        { id: 11, name: 'field11', codec: bytes, optional: true },
        { id: 12, name: 'field12', codec: AnEnum.codec(), optional: true },
        { id: 13, name: 'field13', codec: SubMessage.codec(), optional: true },
        { id: 14, name: 'field14', codec: string, repeats: true },
        { id: 15, name: 'field15', codec: fixed32, optional: true },
        { id: 16, name: 'field16', codec: fixed64, optional: true },
        { id: 17, name: 'field17', codec: sfixed32, optional: true },
        { id: 18, name: 'field18', codec: sfixed64, optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: AllTheTypes): Uint8ArrayList => {
    return encodeMessage(obj, AllTheTypes.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): AllTheTypes => {
    return decodeMessage(buf, AllTheTypes.codec())
  }
}
