/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { enumeration, encodeMessage, decodeMessage, message, string, bool, int32, int64, uint32, uint64, sint32, sint64, double, float, bytes, fixed32, fixed64, sfixed32, sfixed64 } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from 'uint8-varint'
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
      _codec = message<SubMessage>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $foo = obj.foo
        if ($foo != null) {
          const prefixField1 = Uint8Array.from([10])
          const encodedField1 = string.encode($foo)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        if (opts.lengthDelimited !== false) {
          const prefix = unsigned.encode(length)

          bufs[0] = prefix
          length += prefix.byteLength

          return {
            bufs,
            length
          }
        }

        return {
          bufs,
          length
        }
      }, {
        '1': { name: 'foo', codec: string }
      })
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
      _codec = message<AllTheTypes>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $field1 = obj.field1
        if ($field1 != null) {
          const prefixField1 = Uint8Array.from([8])
          const encodedField1 = bool.encode($field1)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        const $field2 = obj.field2
        if ($field2 != null) {
          const prefixField2 = Uint8Array.from([16])
          const encodedField2 = int32.encode($field2)
          bufs.push(prefixField2, ...encodedField2.bufs)
          length += prefixField2.byteLength + encodedField2.length
        }

        const $field3 = obj.field3
        if ($field3 != null) {
          const prefixField3 = Uint8Array.from([24])
          const encodedField3 = int64.encode($field3)
          bufs.push(prefixField3, ...encodedField3.bufs)
          length += prefixField3.byteLength + encodedField3.length
        }

        const $field4 = obj.field4
        if ($field4 != null) {
          const prefixField4 = Uint8Array.from([32])
          const encodedField4 = uint32.encode($field4)
          bufs.push(prefixField4, ...encodedField4.bufs)
          length += prefixField4.byteLength + encodedField4.length
        }

        const $field5 = obj.field5
        if ($field5 != null) {
          const prefixField5 = Uint8Array.from([40])
          const encodedField5 = uint64.encode($field5)
          bufs.push(prefixField5, ...encodedField5.bufs)
          length += prefixField5.byteLength + encodedField5.length
        }

        const $field6 = obj.field6
        if ($field6 != null) {
          const prefixField6 = Uint8Array.from([48])
          const encodedField6 = sint32.encode($field6)
          bufs.push(prefixField6, ...encodedField6.bufs)
          length += prefixField6.byteLength + encodedField6.length
        }

        const $field7 = obj.field7
        if ($field7 != null) {
          const prefixField7 = Uint8Array.from([56])
          const encodedField7 = sint64.encode($field7)
          bufs.push(prefixField7, ...encodedField7.bufs)
          length += prefixField7.byteLength + encodedField7.length
        }

        const $field8 = obj.field8
        if ($field8 != null) {
          const prefixField8 = Uint8Array.from([65])
          const encodedField8 = double.encode($field8)
          bufs.push(prefixField8, ...encodedField8.bufs)
          length += prefixField8.byteLength + encodedField8.length
        }

        const $field9 = obj.field9
        if ($field9 != null) {
          const prefixField9 = Uint8Array.from([77])
          const encodedField9 = float.encode($field9)
          bufs.push(prefixField9, ...encodedField9.bufs)
          length += prefixField9.byteLength + encodedField9.length
        }

        const $field10 = obj.field10
        if ($field10 != null) {
          const prefixField10 = Uint8Array.from([82])
          const encodedField10 = string.encode($field10)
          bufs.push(prefixField10, ...encodedField10.bufs)
          length += prefixField10.byteLength + encodedField10.length
        }

        const $field11 = obj.field11
        if ($field11 != null) {
          const prefixField11 = Uint8Array.from([90])
          const encodedField11 = bytes.encode($field11)
          bufs.push(prefixField11, ...encodedField11.bufs)
          length += prefixField11.byteLength + encodedField11.length
        }

        const $field12 = obj.field12
        if ($field12 != null) {
          const prefixField12 = Uint8Array.from([96])
          const encodedField12 = AnEnum.codec().encode($field12)
          bufs.push(prefixField12, ...encodedField12.bufs)
          length += prefixField12.byteLength + encodedField12.length
        }

        const $field13 = obj.field13
        if ($field13 != null) {
          const prefixField13 = Uint8Array.from([106])
          const encodedField13 = SubMessage.codec().encode($field13)
          bufs.push(prefixField13, ...encodedField13.bufs)
          length += prefixField13.byteLength + encodedField13.length
        }

        const $field14 = obj.field14
        if ($field14 != null) {
          for (const value of $field14) {
            const prefixField14 = Uint8Array.from([114])
            const encodedField14 = string.encode(value)
            bufs.push(prefixField14, ...encodedField14.bufs)
            length += prefixField14.byteLength + encodedField14.length
          }
        }

        const $field15 = obj.field15
        if ($field15 != null) {
          const prefixField15 = Uint8Array.from([125])
          const encodedField15 = fixed32.encode($field15)
          bufs.push(prefixField15, ...encodedField15.bufs)
          length += prefixField15.byteLength + encodedField15.length
        }

        const $field16 = obj.field16
        if ($field16 != null) {
          const prefixField16 = Uint8Array.from([129, 1])
          const encodedField16 = fixed64.encode($field16)
          bufs.push(prefixField16, ...encodedField16.bufs)
          length += prefixField16.byteLength + encodedField16.length
        }

        const $field17 = obj.field17
        if ($field17 != null) {
          const prefixField17 = Uint8Array.from([141, 1])
          const encodedField17 = sfixed32.encode($field17)
          bufs.push(prefixField17, ...encodedField17.bufs)
          length += prefixField17.byteLength + encodedField17.length
        }

        const $field18 = obj.field18
        if ($field18 != null) {
          const prefixField18 = Uint8Array.from([145, 1])
          const encodedField18 = sfixed64.encode($field18)
          bufs.push(prefixField18, ...encodedField18.bufs)
          length += prefixField18.byteLength + encodedField18.length
        }

        if (opts.lengthDelimited !== false) {
          const prefix = unsigned.encode(length)

          bufs[0] = prefix
          length += prefix.byteLength

          return {
            bufs,
            length
          }
        }

        return {
          bufs,
          length
        }
      }, {
        '1': { name: 'field1', codec: bool, optional: true },
        '2': { name: 'field2', codec: int32, optional: true },
        '3': { name: 'field3', codec: int64, optional: true },
        '4': { name: 'field4', codec: uint32, optional: true },
        '5': { name: 'field5', codec: uint64, optional: true },
        '6': { name: 'field6', codec: sint32, optional: true },
        '7': { name: 'field7', codec: sint64, optional: true },
        '8': { name: 'field8', codec: double, optional: true },
        '9': { name: 'field9', codec: float, optional: true },
        '10': { name: 'field10', codec: string, optional: true },
        '11': { name: 'field11', codec: bytes, optional: true },
        '12': { name: 'field12', codec: AnEnum.codec(), optional: true },
        '13': { name: 'field13', codec: SubMessage.codec(), optional: true },
        '14': { name: 'field14', codec: string, repeats: true },
        '15': { name: 'field15', codec: fixed32, optional: true },
        '16': { name: 'field16', codec: fixed64, optional: true },
        '17': { name: 'field17', codec: sfixed32, optional: true },
        '18': { name: 'field18', codec: sfixed64, optional: true }
      })
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
