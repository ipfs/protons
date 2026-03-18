/* eslint-disable complexity */

import { decodeMessage, encodeMessage, MaxLengthError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface SubSubMessage {
  foo: string[]
  nonRepeating?: number
}

export namespace SubSubMessage {
  let _codec: Codec<SubSubMessage, SubSubMessageStreamEvent, SubSubMessageStreamCollectionsEvent>

  export const codec = (): Codec<SubSubMessage, SubSubMessageStreamEvent, SubSubMessageStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<SubSubMessage, SubSubMessageStreamEvent, SubSubMessageStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.foo != null) {
          for (const value of obj.foo) {
            w.uint32(10)
            w.string(value)
          }
        }

        if (obj.nonRepeating != null) {
          w.uint32(16)
          w.uint32(obj.nonRepeating)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          foo: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.foo != null && obj.foo.length === opts.limits.foo) {
                throw new MaxLengthError('Decode error - map field "foo" had too many elements')
              }

              obj.foo.push(reader.string())
              break
            }
            case 2: {
              obj.nonRepeating = reader.uint32()
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
            foo: []
          }
        } else {
          obj = {
            foo: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.foo != null && (opts.emitCollections === true ? obj.foo.length === opts.limits.foo : obj.foo === opts.limits.foo)) {
                throw new MaxLengthError('Decode error - map field "foo" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'foo$value',
                index: opts.emitCollections === true ? obj.foo.length : obj.foo,
                value
              }

              if (opts.emitCollections === true) {
                obj.foo.push(value)
              } else {
                obj.foo++
              }

              break
            }
            case 2: {
              yield {
                field: 'nonRepeating',
                value: reader.uint32()
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

  export interface SubSubMessageFooFieldEvent {
    field: 'foo'
    value: string[]
  }

  export interface SubSubMessageFooValueEvent {
    field: 'foo$value'
    index: number
    value: string
  }

  export interface SubSubMessageNonRepeatingFieldEvent {
    field: 'nonRepeating'
    value: number
  }

  export type SubSubMessageStreamEvent = SubSubMessageFooValueEvent | SubSubMessageNonRepeatingFieldEvent
  export type SubSubMessageStreamCollectionsEvent = SubSubMessageFooFieldEvent

  export function encode (obj: Partial<SubSubMessage>): Uint8Array {
    return encodeMessage(obj, SubSubMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubSubMessage>): SubSubMessage {
    return decodeMessage(buf, SubSubMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<SubSubMessage>): Generator<SubSubMessageStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<SubSubMessage>): Generator<SubSubMessageStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, SubSubMessage.codec(), opts)
  }
}

export interface SubMessage {
  foo: string[]
  nonRepeating?: number
  message?: SubSubMessage
  messages: SubSubMessage[]
}

export namespace SubMessage {
  let _codec: Codec<SubMessage, SubMessageStreamEvent, SubMessageStreamCollectionsEvent>

  export const codec = (): Codec<SubMessage, SubMessageStreamEvent, SubMessageStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<SubMessage, SubMessageStreamEvent, SubMessageStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.foo != null) {
          for (const value of obj.foo) {
            w.uint32(10)
            w.string(value)
          }
        }

        if (obj.nonRepeating != null) {
          w.uint32(16)
          w.uint32(obj.nonRepeating)
        }

        if (obj.message != null) {
          w.uint32(26)
          SubSubMessage.codec().encode(obj.message, w)
        }

        if (obj.messages != null) {
          for (const value of obj.messages) {
            w.uint32(34)
            SubSubMessage.codec().encode(value, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          foo: [],
          messages: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.foo != null && obj.foo.length === opts.limits.foo) {
                throw new MaxLengthError('Decode error - map field "foo" had too many elements')
              }

              obj.foo.push(reader.string())
              break
            }
            case 2: {
              obj.nonRepeating = reader.uint32()
              break
            }
            case 3: {
              obj.message = SubSubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.message
              })
              break
            }
            case 4: {
              if (opts.limits?.messages != null && obj.messages.length === opts.limits.messages) {
                throw new MaxLengthError('Decode error - map field "messages" had too many elements')
              }

              obj.messages.push(SubSubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.messages$
              }))
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
            foo: [],
            messages: []
          }
        } else {
          obj = {
            foo: 0,
            messages: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.foo != null && (opts.emitCollections === true ? obj.foo.length === opts.limits.foo : obj.foo === opts.limits.foo)) {
                throw new MaxLengthError('Decode error - map field "foo" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'foo$value',
                index: opts.emitCollections === true ? obj.foo.length : obj.foo,
                value
              }

              if (opts.emitCollections === true) {
                obj.foo.push(value)
              } else {
                obj.foo++
              }

              break
            }
            case 2: {
              yield {
                field: 'nonRepeating',
                value: reader.uint32()
              }
              break
            }
            case 3: {
              yield {
                field: 'message',
                value: SubSubMessage.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.message
                })
              }
              break
            }
            case 4: {
              if (opts.limits?.messages != null && (opts.emitCollections === true ? obj.messages.length === opts.limits.messages : obj.messages === opts.limits.messages)) {
                throw new MaxLengthError('Decode error - map field "messages" had too many elements')
              }

              const value = SubSubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.messages$
              })

              yield {
                field: 'messages$value',
                index: opts.emitCollections === true ? obj.messages.length : obj.messages,
                value
              }

              if (opts.emitCollections === true) {
                obj.messages.push(value)
              } else {
                obj.messages++
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
    value: string[]
  }

  export interface SubMessageFooValueEvent {
    field: 'foo$value'
    index: number
    value: string
  }

  export interface SubMessageNonRepeatingFieldEvent {
    field: 'nonRepeating'
    value: number
  }

  export interface SubMessageMessageFieldEvent {
    field: 'message'
    value: SubSubMessage
  }

  export interface SubMessageMessagesFieldEvent {
    field: 'messages'
    value: SubSubMessage[]
  }

  export interface SubMessageMessagesValueEvent {
    field: 'messages$value'
    index: number
    value: SubSubMessage
  }

  export type SubMessageStreamEvent = SubMessageFooValueEvent | SubMessageNonRepeatingFieldEvent | SubMessageMessageFieldEvent | SubMessageMessagesValueEvent
  export type SubMessageStreamCollectionsEvent = SubMessageFooFieldEvent | SubMessageMessagesFieldEvent

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

export interface RepeatedTypes {
  number: number[]
  limitedNumber: number[]
  messages: SubMessage[]
  message?: SubMessage
  nonRepeating?: number
}

export namespace RepeatedTypes {
  let _codec: Codec<RepeatedTypes, RepeatedTypesStreamEvent, RepeatedTypesStreamCollectionsEvent>

  export const codec = (): Codec<RepeatedTypes, RepeatedTypesStreamEvent, RepeatedTypesStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<RepeatedTypes, RepeatedTypesStreamEvent, RepeatedTypesStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.number != null) {
          for (const value of obj.number) {
            w.uint32(8)
            w.uint32(value)
          }
        }

        if (obj.limitedNumber != null) {
          for (const value of obj.limitedNumber) {
            w.uint32(16)
            w.uint32(value)
          }
        }

        if (obj.messages != null) {
          for (const value of obj.messages) {
            w.uint32(26)
            SubMessage.codec().encode(value, w)
          }
        }

        if (obj.message != null) {
          w.uint32(34)
          SubMessage.codec().encode(obj.message, w)
        }

        if (obj.nonRepeating != null) {
          w.uint32(40)
          w.uint32(obj.nonRepeating)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          number: [],
          limitedNumber: [],
          messages: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.number != null && obj.number.length === opts.limits.number) {
                throw new MaxLengthError('Decode error - map field "number" had too many elements')
              }

              obj.number.push(reader.uint32())
              break
            }
            case 2: {
              if (opts.limits?.limitedNumber != null && obj.limitedNumber.length === opts.limits.limitedNumber) {
                throw new MaxLengthError('Decode error - map field "limitedNumber" had too many elements')
              }

              if (obj.limitedNumber.length === 1) {
                throw new MaxLengthError('Decode error - repeated field "limitedNumber" had too many elements')
              }

              obj.limitedNumber.push(reader.uint32())
              break
            }
            case 3: {
              if (opts.limits?.messages != null && obj.messages.length === opts.limits.messages) {
                throw new MaxLengthError('Decode error - map field "messages" had too many elements')
              }

              obj.messages.push(SubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.messages$
              }))
              break
            }
            case 4: {
              obj.message = SubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.message
              })
              break
            }
            case 5: {
              obj.nonRepeating = reader.uint32()
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
            number: [],
            limitedNumber: [],
            messages: []
          }
        } else {
          obj = {
            number: 0,
            limitedNumber: 0,
            messages: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.number != null && (opts.emitCollections === true ? obj.number.length === opts.limits.number : obj.number === opts.limits.number)) {
                throw new MaxLengthError('Decode error - map field "number" had too many elements')
              }

              const value = reader.uint32()

              yield {
                field: 'number$value',
                index: opts.emitCollections === true ? obj.number.length : obj.number,
                value
              }

              if (opts.emitCollections === true) {
                obj.number.push(value)
              } else {
                obj.number++
              }

              break
            }
            case 2: {
              if (opts.limits?.limitedNumber != null && (opts.emitCollections === true ? obj.limitedNumber.length === opts.limits.limitedNumber : obj.limitedNumber === opts.limits.limitedNumber)) {
                throw new MaxLengthError('Decode error - map field "limitedNumber" had too many elements')
              }

              if (opts.emitCollections === true ? obj.limitedNumber.length === 1 : obj.limitedNumber === 1) {
                throw new MaxLengthError('Decode error - repeated field "limitedNumber" had too many elements')
              }

              const value = reader.uint32()

              yield {
                field: 'limitedNumber$value',
                index: opts.emitCollections === true ? obj.limitedNumber.length : obj.limitedNumber,
                value
              }

              if (opts.emitCollections === true) {
                obj.limitedNumber.push(value)
              } else {
                obj.limitedNumber++
              }

              break
            }
            case 3: {
              if (opts.limits?.messages != null && (opts.emitCollections === true ? obj.messages.length === opts.limits.messages : obj.messages === opts.limits.messages)) {
                throw new MaxLengthError('Decode error - map field "messages" had too many elements')
              }

              const value = SubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.messages$
              })

              yield {
                field: 'messages$value',
                index: opts.emitCollections === true ? obj.messages.length : obj.messages,
                value
              }

              if (opts.emitCollections === true) {
                obj.messages.push(value)
              } else {
                obj.messages++
              }

              break
            }
            case 4: {
              yield {
                field: 'message',
                value: SubMessage.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.message
                })
              }
              break
            }
            case 5: {
              yield {
                field: 'nonRepeating',
                value: reader.uint32()
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

  export interface RepeatedTypesNumberFieldEvent {
    field: 'number'
    value: number[]
  }

  export interface RepeatedTypesNumberValueEvent {
    field: 'number$value'
    index: number
    value: number
  }

  export interface RepeatedTypesLimitedNumberFieldEvent {
    field: 'limitedNumber'
    value: number[]
  }

  export interface RepeatedTypesLimitedNumberValueEvent {
    field: 'limitedNumber$value'
    index: number
    value: number
  }

  export interface RepeatedTypesMessagesFieldEvent {
    field: 'messages'
    value: SubMessage[]
  }

  export interface RepeatedTypesMessagesValueEvent {
    field: 'messages$value'
    index: number
    value: SubMessage
  }

  export interface RepeatedTypesMessageFieldEvent {
    field: 'message'
    value: SubMessage
  }

  export interface RepeatedTypesNonRepeatingFieldEvent {
    field: 'nonRepeating'
    value: number
  }

  export type RepeatedTypesStreamEvent = RepeatedTypesNumberValueEvent | RepeatedTypesLimitedNumberValueEvent | RepeatedTypesMessagesValueEvent | RepeatedTypesMessageFieldEvent | RepeatedTypesNonRepeatingFieldEvent
  export type RepeatedTypesStreamCollectionsEvent = RepeatedTypesNumberFieldEvent | RepeatedTypesLimitedNumberFieldEvent | RepeatedTypesMessagesFieldEvent

  export function encode (obj: Partial<RepeatedTypes>): Uint8Array {
    return encodeMessage(obj, RepeatedTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<RepeatedTypes>): RepeatedTypes {
    return decodeMessage(buf, RepeatedTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<RepeatedTypes>): Generator<RepeatedTypesStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<RepeatedTypes>): Generator<RepeatedTypesStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, RepeatedTypes.codec(), opts)
  }
}
