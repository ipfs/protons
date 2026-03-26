import { decodeMessage, encodeMessage, MaxLengthError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface SubSubMessage {
  foo: string[]
  nonRepeating?: number
}

export namespace SubSubMessage {
  let _codec: Codec<SubSubMessage>

  export const codec = (): Codec<SubSubMessage> => {
    if (_codec == null) {
      _codec = message<SubSubMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.foo != null && obj.foo.length > 0) {
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
                throw new MaxLengthError('Decode error - repeated field "foo" had too many elements')
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
      }, function * (reader, length, prefix, opts = {}) {
        const obj = {
          foo: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.foo != null && obj.foo === opts.limits.foo) {
                throw new MaxLengthError('Streaming decode error - repeated field "foo" had too many elements')
              }

              yield {
                field: `${prefix}.foo[]`,
                index: obj.foo,
                value: reader.string()
              }

              obj.foo++

              break
            }
            case 2: {
              yield {
                field: `${prefix}.nonRepeating`,
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
      })
    }

    return _codec
  }

  export interface SubSubMessageFooFieldEvent {
    field: '$.foo[]'
    index: number
    value: string
  }

  export interface SubSubMessageNonRepeatingFieldEvent {
    field: '$.nonRepeating'
    value: number
  }

  export function encode (obj: Partial<SubSubMessage>): Uint8Array {
    return encodeMessage(obj, SubSubMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubSubMessage>): SubSubMessage {
    return decodeMessage(buf, SubSubMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubSubMessage>): Generator<SubSubMessageFooFieldEvent | SubSubMessageNonRepeatingFieldEvent> {
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
  let _codec: Codec<SubMessage>

  export const codec = (): Codec<SubMessage> => {
    if (_codec == null) {
      _codec = message<SubMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.foo != null && obj.foo.length > 0) {
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

        if (obj.messages != null && obj.messages.length > 0) {
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
                throw new MaxLengthError('Decode error - repeated field "foo" had too many elements')
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
                throw new MaxLengthError('Decode error - repeated field "messages" had too many elements')
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
      }, function * (reader, length, prefix, opts = {}) {
        const obj = {
          foo: 0,
          messages: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.foo != null && obj.foo === opts.limits.foo) {
                throw new MaxLengthError('Streaming decode error - repeated field "foo" had too many elements')
              }

              yield {
                field: `${prefix}.foo[]`,
                index: obj.foo,
                value: reader.string()
              }

              obj.foo++

              break
            }
            case 2: {
              yield {
                field: `${prefix}.nonRepeating`,
                value: reader.uint32()
              }
              break
            }
            case 3: {
              yield * SubSubMessage.codec().stream(reader, reader.uint32(), `${prefix}.message`, {
                limits: opts.limits?.message
              })

              break
            }
            case 4: {
              if (opts.limits?.messages != null && obj.messages === opts.limits.messages) {
                throw new MaxLengthError('Streaming decode error - repeated field "messages" had too many elements')
              }

              for (const evt of SubSubMessage.codec().stream(reader, reader.uint32(), `${prefix}.messages[]`, {
                limits: opts.limits?.messages$
              })) {
                yield {
                  ...evt,
                  index: obj.messages
                }
              }

              obj.messages++

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

  export interface SubMessageFooFieldEvent {
    field: '$.foo[]'
    index: number
    value: string
  }

  export interface SubMessageNonRepeatingFieldEvent {
    field: '$.nonRepeating'
    value: number
  }

  export interface SubMessageMessageFooFieldEvent {
    field: '$.message.foo[]'
    index: number
    value: string
  }

  export interface SubMessageMessageNonRepeatingFieldEvent {
    field: '$.message.nonRepeating'
    value: number
  }

  export interface SubMessageMessagesFooFieldEvent {
    field: '$.messages[].foo[]'
    index: number
    value: string
  }

  export interface SubMessageMessagesNonRepeatingFieldEvent {
    field: '$.messages[].nonRepeating'
    value: number
    index: number
  }

  export function encode (obj: Partial<SubMessage>): Uint8Array {
    return encodeMessage(obj, SubMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): SubMessage {
    return decodeMessage(buf, SubMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): Generator<SubMessageFooFieldEvent | SubMessageNonRepeatingFieldEvent | SubMessageMessageFooFieldEvent | SubMessageMessageNonRepeatingFieldEvent | SubMessageMessagesFooFieldEvent | SubMessageMessagesNonRepeatingFieldEvent> {
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
  let _codec: Codec<RepeatedTypes>

  export const codec = (): Codec<RepeatedTypes> => {
    if (_codec == null) {
      _codec = message<RepeatedTypes>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.number != null && obj.number.length > 0) {
          for (const value of obj.number) {
            w.uint32(8)
            w.uint32(value)
          }
        }

        if (obj.limitedNumber != null && obj.limitedNumber.length > 0) {
          for (const value of obj.limitedNumber) {
            w.uint32(16)
            w.uint32(value)
          }
        }

        if (obj.messages != null && obj.messages.length > 0) {
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
                throw new MaxLengthError('Decode error - repeated field "number" had too many elements')
              }

              obj.number.push(reader.uint32())
              break
            }
            case 2: {
              if (opts.limits?.limitedNumber != null && obj.limitedNumber.length === opts.limits.limitedNumber) {
                throw new MaxLengthError('Decode error - repeated field "limitedNumber" had too many elements')
              }

              if (obj.limitedNumber.length === 1) {
                throw new MaxLengthError('Decode error - repeated field "limitedNumber" had too many elements')
              }

              obj.limitedNumber.push(reader.uint32())
              break
            }
            case 3: {
              if (opts.limits?.messages != null && obj.messages.length === opts.limits.messages) {
                throw new MaxLengthError('Decode error - repeated field "messages" had too many elements')
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
      }, function * (reader, length, prefix, opts = {}) {
        const obj = {
          number: 0,
          limitedNumber: 1,
          messages: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.number != null && obj.number === opts.limits.number) {
                throw new MaxLengthError('Streaming decode error - repeated field "number" had too many elements')
              }

              yield {
                field: `${prefix}.number[]`,
                index: obj.number,
                value: reader.uint32()
              }

              obj.number++

              break
            }
            case 2: {
              if (opts.limits?.limitedNumber != null && obj.limitedNumber === opts.limits.limitedNumber) {
                throw new MaxLengthError('Streaming decode error - repeated field "limitedNumber" had too many elements')
              }

              if (obj.limitedNumber === 1) {
                throw new MaxLengthError('Streaming decode error - repeated field "limitedNumber" had too many elements')
              }

              yield {
                field: `${prefix}.limitedNumber[]`,
                index: obj.limitedNumber,
                value: reader.uint32()
              }

              obj.limitedNumber++

              break
            }
            case 3: {
              if (opts.limits?.messages != null && obj.messages === opts.limits.messages) {
                throw new MaxLengthError('Streaming decode error - repeated field "messages" had too many elements')
              }

              for (const evt of SubMessage.codec().stream(reader, reader.uint32(), `${prefix}.messages[]`, {
                limits: opts.limits?.messages$
              })) {
                yield {
                  ...evt,
                  index: obj.messages
                }
              }

              obj.messages++

              break
            }
            case 4: {
              yield * SubMessage.codec().stream(reader, reader.uint32(), `${prefix}.message`, {
                limits: opts.limits?.message
              })

              break
            }
            case 5: {
              yield {
                field: `${prefix}.nonRepeating`,
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
      })
    }

    return _codec
  }

  export interface RepeatedTypesNumberFieldEvent {
    field: '$.number[]'
    index: number
    value: number
  }

  export interface RepeatedTypesLimitedNumberFieldEvent {
    field: '$.limitedNumber[]'
    index: number
    value: number
  }

  export interface RepeatedTypesMessagesFooFieldEvent {
    field: '$.messages[].foo[]'
    index: number
    value: string
  }

  export interface RepeatedTypesMessagesNonRepeatingFieldEvent {
    field: '$.messages[].nonRepeating'
    value: number
    index: number
  }

  export interface RepeatedTypesMessagesMessageFooFieldEvent {
    field: '$.messages[].message.foo[]'
    index: number
    value: string
  }

  export interface RepeatedTypesMessagesMessageNonRepeatingFieldEvent {
    field: '$.messages[].message.nonRepeating'
    value: number
    index: number
  }

  export interface RepeatedTypesMessagesMessagesFooFieldEvent {
    field: '$.messages[].messages[].foo[]'
    index: number
    value: string
  }

  export interface RepeatedTypesMessagesMessagesNonRepeatingFieldEvent {
    field: '$.messages[].messages[].nonRepeating'
    value: number
    index: number
  }

  export interface RepeatedTypesMessageFooFieldEvent {
    field: '$.message.foo[]'
    index: number
    value: string
  }

  export interface RepeatedTypesMessageNonRepeatingFieldEvent {
    field: '$.message.nonRepeating'
    value: number
  }

  export interface RepeatedTypesMessageMessageFooFieldEvent {
    field: '$.message.message.foo[]'
    index: number
    value: string
  }

  export interface RepeatedTypesMessageMessageNonRepeatingFieldEvent {
    field: '$.message.message.nonRepeating'
    value: number
  }

  export interface RepeatedTypesMessageMessagesFooFieldEvent {
    field: '$.message.messages[].foo[]'
    index: number
    value: string
  }

  export interface RepeatedTypesMessageMessagesNonRepeatingFieldEvent {
    field: '$.message.messages[].nonRepeating'
    value: number
    index: number
  }

  export interface RepeatedTypesNonRepeatingFieldEvent {
    field: '$.nonRepeating'
    value: number
  }

  export function encode (obj: Partial<RepeatedTypes>): Uint8Array {
    return encodeMessage(obj, RepeatedTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<RepeatedTypes>): RepeatedTypes {
    return decodeMessage(buf, RepeatedTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<RepeatedTypes>): Generator<RepeatedTypesNumberFieldEvent | RepeatedTypesLimitedNumberFieldEvent | RepeatedTypesMessagesFooFieldEvent | RepeatedTypesMessagesNonRepeatingFieldEvent | RepeatedTypesMessagesMessageFooFieldEvent | RepeatedTypesMessagesMessageNonRepeatingFieldEvent | RepeatedTypesMessagesMessagesFooFieldEvent | RepeatedTypesMessagesMessagesNonRepeatingFieldEvent | RepeatedTypesMessageFooFieldEvent | RepeatedTypesMessageNonRepeatingFieldEvent | RepeatedTypesMessageMessageFooFieldEvent | RepeatedTypesMessageMessageNonRepeatingFieldEvent | RepeatedTypesMessageMessagesFooFieldEvent | RepeatedTypesMessageMessagesNonRepeatingFieldEvent | RepeatedTypesNonRepeatingFieldEvent> {
    return streamMessage(buf, RepeatedTypes.codec(), opts)
  }
}
