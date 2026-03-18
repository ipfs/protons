/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/consistent-type-specifier-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
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
  export const codec = (): Codec<AnEnum, any, any> => {
    return enumeration<AnEnum>(__AnEnumValues)
  }
}

export interface SubMessage {
  foo: string
}

export namespace SubMessage {
  let _codec: Codec<SubMessage, SubMessageStreamEvent, SubMessageStreamCollectionsEvent>

  export const codec = (): Codec<SubMessage, SubMessageStreamEvent, SubMessageStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<SubMessage, SubMessageStreamEvent, SubMessageStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.foo != null && obj.foo !== '')) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          foo: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.foo = reader.string()
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
           foo: ''
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
                field: 'foo',
                value: reader.string()
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

  export interface SubMessageFooFieldEvent {
    field: 'foo'
    value: string
  }

  export type SubMessageStreamEvent = SubMessageFooFieldEvent
  export type SubMessageStreamCollectionsEvent = {}

  export function encode (obj: Partial<SubMessage>): Uint8Array {
    return encodeMessage(obj, SubMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): SubMessage {
    return decodeMessage(buf, SubMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<SubMessage>): Generator<SubMessageStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<SubMessage>): Generator<SubMessageStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, SubMessage.codec(), opts)
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
  let _codec: Codec<AllTheTypes, AllTheTypesStreamEvent, AllTheTypesStreamCollectionsEvent>

  export const codec = (): Codec<AllTheTypes, AllTheTypesStreamEvent, AllTheTypesStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<AllTheTypes, AllTheTypesStreamEvent, AllTheTypesStreamCollectionsEvent>((obj, w, opts = {}) => {
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
      }, (reader, length, opts = {}) => {
        const obj: any = {
          field14: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.field1 = reader.bool()
              break
            }
            case 2: {
              obj.field2 = reader.int32()
              break
            }
            case 3: {
              obj.field3 = reader.int64()
              break
            }
            case 4: {
              obj.field4 = reader.uint32()
              break
            }
            case 5: {
              obj.field5 = reader.uint64()
              break
            }
            case 6: {
              obj.field6 = reader.sint32()
              break
            }
            case 7: {
              obj.field7 = reader.sint64()
              break
            }
            case 8: {
              obj.field8 = reader.double()
              break
            }
            case 9: {
              obj.field9 = reader.float()
              break
            }
            case 10: {
              obj.field10 = reader.string()
              break
            }
            case 11: {
              obj.field11 = reader.bytes()
              break
            }
            case 12: {
              obj.field12 = AnEnum.codec().decode(reader)
              break
            }
            case 13: {
              obj.field13 = SubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.field13
              })
              break
            }
            case 14: {
              if (opts.limits?.field14 != null && obj.field14.length === opts.limits.field14) {
                throw new MaxLengthError('Decode error - map field "field14" had too many elements')
              }

              obj.field14.push(reader.string())
              break
            }
            case 15: {
              obj.field15 = reader.fixed32()
              break
            }
            case 16: {
              obj.field16 = reader.fixed64()
              break
            }
            case 17: {
              obj.field17 = reader.sfixed32()
              break
            }
            case 18: {
              obj.field18 = reader.sfixed64()
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
           field14: []
         }
        } else {
          obj = {
            field14: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'field1',
                value: reader.bool()
              }
              break
            }
            case 2: {
              yield {
                field: 'field2',
                value: reader.int32()
              }
              break
            }
            case 3: {
              yield {
                field: 'field3',
                value: reader.int64()
              }
              break
            }
            case 4: {
              yield {
                field: 'field4',
                value: reader.uint32()
              }
              break
            }
            case 5: {
              yield {
                field: 'field5',
                value: reader.uint64()
              }
              break
            }
            case 6: {
              yield {
                field: 'field6',
                value: reader.sint32()
              }
              break
            }
            case 7: {
              yield {
                field: 'field7',
                value: reader.sint64()
              }
              break
            }
            case 8: {
              yield {
                field: 'field8',
                value: reader.double()
              }
              break
            }
            case 9: {
              yield {
                field: 'field9',
                value: reader.float()
              }
              break
            }
            case 10: {
              yield {
                field: 'field10',
                value: reader.string()
              }
              break
            }
            case 11: {
              yield {
                field: 'field11',
                value: reader.bytes()
              }
              break
            }
            case 12: {
              yield {
                field: 'field12',
                value: AnEnum.codec().decode(reader)
              }
              break
            }
            case 13: {
              yield {
                field: 'field13',
                value: SubMessage.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.field13
                })
              }
              break
            }
            case 14: {
              if (opts.limits?.field14 != null && (opts.emitCollections === true ? obj.field14.length === opts.limits.field14 : obj.field14 === opts.limits.field14)) {
                throw new MaxLengthError('Decode error - map field "field14" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'field14$value',
                index: opts.emitCollections === true ? obj.field14.length : obj.field14,
                value
              }

              if (opts.emitCollections === true) {
                obj.field14.push(value)
              } else {
                obj.field14++
              }

              break
            }
            case 15: {
              yield {
                field: 'field15',
                value: reader.fixed32()
              }
              break
            }
            case 16: {
              yield {
                field: 'field16',
                value: reader.fixed64()
              }
              break
            }
            case 17: {
              yield {
                field: 'field17',
                value: reader.sfixed32()
              }
              break
            }
            case 18: {
              yield {
                field: 'field18',
                value: reader.sfixed64()
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

  export interface AllTheTypesField1FieldEvent {
    field: 'field1'
    value: boolean
  }

  export interface AllTheTypesField2FieldEvent {
    field: 'field2'
    value: number
  }

  export interface AllTheTypesField3FieldEvent {
    field: 'field3'
    value: bigint
  }

  export interface AllTheTypesField4FieldEvent {
    field: 'field4'
    value: number
  }

  export interface AllTheTypesField5FieldEvent {
    field: 'field5'
    value: bigint
  }

  export interface AllTheTypesField6FieldEvent {
    field: 'field6'
    value: number
  }

  export interface AllTheTypesField7FieldEvent {
    field: 'field7'
    value: bigint
  }

  export interface AllTheTypesField8FieldEvent {
    field: 'field8'
    value: number
  }

  export interface AllTheTypesField9FieldEvent {
    field: 'field9'
    value: number
  }

  export interface AllTheTypesField10FieldEvent {
    field: 'field10'
    value: string
  }

  export interface AllTheTypesField11FieldEvent {
    field: 'field11'
    value: Uint8Array
  }

  export interface AllTheTypesField12FieldEvent {
    field: 'field12'
    value: AnEnum
  }

  export interface AllTheTypesField13FieldEvent {
    field: 'field13'
    value: SubMessage
  }

  export interface AllTheTypesField14FieldEvent {
    field: 'field14'
    value: string[]
  }

  export interface AllTheTypesField14ValueEvent {
    field: 'field14$value'
    index: number
    value: string
  }

  export interface AllTheTypesField15FieldEvent {
    field: 'field15'
    value: number
  }

  export interface AllTheTypesField16FieldEvent {
    field: 'field16'
    value: bigint
  }

  export interface AllTheTypesField17FieldEvent {
    field: 'field17'
    value: number
  }

  export interface AllTheTypesField18FieldEvent {
    field: 'field18'
    value: bigint
  }

  export type AllTheTypesStreamEvent = AllTheTypesField1FieldEvent | AllTheTypesField2FieldEvent | AllTheTypesField3FieldEvent | AllTheTypesField4FieldEvent | AllTheTypesField5FieldEvent | AllTheTypesField6FieldEvent | AllTheTypesField7FieldEvent | AllTheTypesField8FieldEvent | AllTheTypesField9FieldEvent | AllTheTypesField10FieldEvent | AllTheTypesField11FieldEvent | AllTheTypesField12FieldEvent | AllTheTypesField13FieldEvent | AllTheTypesField14ValueEvent | AllTheTypesField15FieldEvent | AllTheTypesField16FieldEvent | AllTheTypesField17FieldEvent | AllTheTypesField18FieldEvent
  export type AllTheTypesStreamCollectionsEvent = AllTheTypesField14FieldEvent

  export function encode (obj: Partial<AllTheTypes>): Uint8Array {
    return encodeMessage(obj, AllTheTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<AllTheTypes>): AllTheTypes {
    return decodeMessage(buf, AllTheTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<AllTheTypes>): Generator<AllTheTypesStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<AllTheTypes>): Generator<AllTheTypesStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, AllTheTypes.codec(), opts)
  }
}
