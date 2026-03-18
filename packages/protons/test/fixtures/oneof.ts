/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/consistent-type-specifier-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { decodeMessage, encodeMessage, enumeration, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export enum EnumType {
  Val1 = 'Val1',
  Val2 = 'Val2'
}

enum __EnumTypeValues {
  Val1 = 0,
  Val2 = 1
}

export namespace EnumType {
  export const codec = (): Codec<EnumType, any, any> => {
    return enumeration<EnumType>(__EnumTypeValues)
  }
}

export interface OneOfMessage {
  fieldOne?: string
  fieldTwo?: string
  fieldThree?: EnumType
  fieldFour?: EnumType
  fieldFive: string
}

export namespace OneOfMessage {
  let _codec: Codec<OneOfMessage, OneOfMessageStreamEvent, OneOfMessageStreamCollectionsEvent>

  export const codec = (): Codec<OneOfMessage, OneOfMessageStreamEvent, OneOfMessageStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<OneOfMessage, OneOfMessageStreamEvent, OneOfMessageStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        obj = { ...obj }

        if (obj.fieldTwo != null) {
          obj.fieldOne = undefined
        }

        if (obj.fieldOne != null) {
          obj.fieldTwo = undefined
        }

        if (obj.fieldFour != null) {
          obj.fieldThree = undefined
        }

        if (obj.fieldThree != null) {
          obj.fieldFour = undefined
        }

        if (obj.fieldOne != null) {
          w.uint32(10)
          w.string(obj.fieldOne)
        }

        if (obj.fieldTwo != null) {
          w.uint32(18)
          w.string(obj.fieldTwo)
        }

        if (obj.fieldThree != null) {
          w.uint32(24)
          EnumType.codec().encode(obj.fieldThree, w)
        }

        if (obj.fieldFour != null) {
          w.uint32(32)
          EnumType.codec().encode(obj.fieldFour, w)
        }

        if ((obj.fieldFive != null && obj.fieldFive !== '')) {
          w.uint32(42)
          w.string(obj.fieldFive)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          fieldFive: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.fieldOne = reader.string()
              break
            }
            case 2: {
              obj.fieldTwo = reader.string()
              break
            }
            case 3: {
              obj.fieldThree = EnumType.codec().decode(reader)
              break
            }
            case 4: {
              obj.fieldFour = EnumType.codec().decode(reader)
              break
            }
            case 5: {
              obj.fieldFive = reader.string()
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        if (obj.fieldTwo != null) {
          delete obj.fieldOne
        }

        if (obj.fieldOne != null) {
          delete obj.fieldTwo
        }

        if (obj.fieldFour != null) {
          delete obj.fieldThree
        }

        if (obj.fieldThree != null) {
          delete obj.fieldFour
        }

        return obj
      }, function * (reader, length, opts = {}) {
        let obj: any

        if (opts.emitCollections === true) {
          obj = {
          fieldFive: ''
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
                field: 'fieldOne',
                value: reader.string()
              }
              break
            }
            case 2: {
              yield {
                field: 'fieldTwo',
                value: reader.string()
              }
              break
            }
            case 3: {
              yield {
                field: 'fieldThree',
                value: EnumType.codec().decode(reader)
              }
              break
            }
            case 4: {
              yield {
                field: 'fieldFour',
                value: EnumType.codec().decode(reader)
              }
              break
            }
            case 5: {
              yield {
                field: 'fieldFive',
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

        if (obj.fieldTwo != null) {
          delete obj.fieldOne
        }

        if (obj.fieldOne != null) {
          delete obj.fieldTwo
        }

        if (obj.fieldFour != null) {
          delete obj.fieldThree
        }

        if (obj.fieldThree != null) {
          delete obj.fieldFour
        }

      })
    }

    return _codec
  }

  export interface OneOfMessageFieldOneFieldEvent {
    field: 'fieldOne'
    value: string
  }

  export interface OneOfMessageFieldTwoFieldEvent {
    field: 'fieldTwo'
    value: string
  }

  export interface OneOfMessageFieldThreeFieldEvent {
    field: 'fieldThree'
    value: EnumType
  }

  export interface OneOfMessageFieldFourFieldEvent {
    field: 'fieldFour'
    value: EnumType
  }

  export interface OneOfMessageFieldFiveFieldEvent {
    field: 'fieldFive'
    value: string
  }

  export type OneOfMessageStreamEvent = OneOfMessageFieldOneFieldEvent | OneOfMessageFieldTwoFieldEvent | OneOfMessageFieldThreeFieldEvent | OneOfMessageFieldFourFieldEvent | OneOfMessageFieldFiveFieldEvent
  export type OneOfMessageStreamCollectionsEvent = {}

  export function encode (obj: Partial<OneOfMessage>): Uint8Array {
    return encodeMessage(obj, OneOfMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<OneOfMessage>): OneOfMessage {
    return decodeMessage(buf, OneOfMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<OneOfMessage>): Generator<OneOfMessageStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<OneOfMessage>): Generator<OneOfMessageStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, OneOfMessage.codec(), opts)
  }
}

export interface MessageWithoutOneOfs {
  fieldOne: string
  fieldTwo: string
  fieldThree: EnumType
  fieldFour: EnumType
  fieldFive: string
}

export namespace MessageWithoutOneOfs {
  let _codec: Codec<MessageWithoutOneOfs, MessageWithoutOneOfsStreamEvent, MessageWithoutOneOfsStreamCollectionsEvent>

  export const codec = (): Codec<MessageWithoutOneOfs, MessageWithoutOneOfsStreamEvent, MessageWithoutOneOfsStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<MessageWithoutOneOfs, MessageWithoutOneOfsStreamEvent, MessageWithoutOneOfsStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.fieldOne != null && obj.fieldOne !== '')) {
          w.uint32(10)
          w.string(obj.fieldOne)
        }

        if ((obj.fieldTwo != null && obj.fieldTwo !== '')) {
          w.uint32(18)
          w.string(obj.fieldTwo)
        }

        if (obj.fieldThree != null && __EnumTypeValues[obj.fieldThree] !== 0) {
          w.uint32(24)
          EnumType.codec().encode(obj.fieldThree, w)
        }

        if (obj.fieldFour != null && __EnumTypeValues[obj.fieldFour] !== 0) {
          w.uint32(32)
          EnumType.codec().encode(obj.fieldFour, w)
        }

        if ((obj.fieldFive != null && obj.fieldFive !== '')) {
          w.uint32(42)
          w.string(obj.fieldFive)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          fieldOne: '',
          fieldTwo: '',
          fieldThree: EnumType.Val1,
          fieldFour: EnumType.Val1,
          fieldFive: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.fieldOne = reader.string()
              break
            }
            case 2: {
              obj.fieldTwo = reader.string()
              break
            }
            case 3: {
              obj.fieldThree = EnumType.codec().decode(reader)
              break
            }
            case 4: {
              obj.fieldFour = EnumType.codec().decode(reader)
              break
            }
            case 5: {
              obj.fieldFive = reader.string()
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
          fieldOne: '',
          fieldTwo: '',
          fieldThree: EnumType.Val1,
          fieldFour: EnumType.Val1,
          fieldFive: ''
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
                field: 'fieldOne',
                value: reader.string()
              }
              break
            }
            case 2: {
              yield {
                field: 'fieldTwo',
                value: reader.string()
              }
              break
            }
            case 3: {
              yield {
                field: 'fieldThree',
                value: EnumType.codec().decode(reader)
              }
              break
            }
            case 4: {
              yield {
                field: 'fieldFour',
                value: EnumType.codec().decode(reader)
              }
              break
            }
            case 5: {
              yield {
                field: 'fieldFive',
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

      })
    }

    return _codec
  }

  export interface MessageWithoutOneOfsFieldOneFieldEvent {
    field: 'fieldOne'
    value: string
  }

  export interface MessageWithoutOneOfsFieldTwoFieldEvent {
    field: 'fieldTwo'
    value: string
  }

  export interface MessageWithoutOneOfsFieldThreeFieldEvent {
    field: 'fieldThree'
    value: EnumType
  }

  export interface MessageWithoutOneOfsFieldFourFieldEvent {
    field: 'fieldFour'
    value: EnumType
  }

  export interface MessageWithoutOneOfsFieldFiveFieldEvent {
    field: 'fieldFive'
    value: string
  }

  export type MessageWithoutOneOfsStreamEvent = MessageWithoutOneOfsFieldOneFieldEvent | MessageWithoutOneOfsFieldTwoFieldEvent | MessageWithoutOneOfsFieldThreeFieldEvent | MessageWithoutOneOfsFieldFourFieldEvent | MessageWithoutOneOfsFieldFiveFieldEvent
  export type MessageWithoutOneOfsStreamCollectionsEvent = {}

  export function encode (obj: Partial<MessageWithoutOneOfs>): Uint8Array {
    return encodeMessage(obj, MessageWithoutOneOfs.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithoutOneOfs>): MessageWithoutOneOfs {
    return decodeMessage(buf, MessageWithoutOneOfs.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MessageWithoutOneOfs>): Generator<MessageWithoutOneOfsStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MessageWithoutOneOfs>): Generator<MessageWithoutOneOfsStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, MessageWithoutOneOfs.codec(), opts)
  }
}
