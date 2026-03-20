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
                throw new MaxLengthError('Decode error - repeated field "foo" had too many elements')
              }

              const value = reader.string()
              obj.foo++

              yield {
                field: `${prefix != null ? `${prefix}.` : ''}foo`,
                index: obj.foo,
                value
              }

              break
            }
            case 2: {
              yield {
                field: `${prefix != null ? `${prefix}.` : ''}nonRepeating`,
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
    field: 'foo$entry'
    index: number
    value: string
  }

  export interface SubSubMessageNonRepeatingFieldEvent {
    field: 'nonRepeating'
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
                throw new MaxLengthError('Decode error - repeated field "foo" had too many elements')
              }

              const value = reader.string()
              obj.foo++

              yield {
                field: `${prefix != null ? `${prefix}.` : ''}foo`,
                index: obj.foo,
                value
              }

              break
            }
            case 2: {
              yield {
                field: `${prefix != null ? `${prefix}.` : ''}nonRepeating`,
                value: reader.uint32()
              }
              break
            }
            case 3: {
              yield {
                field: `${prefix != null ? `${prefix}.` : ''}message`,
                value: SubSubMessage.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.message
                })
              }
              break
            }
            case 4: {
              if (opts.limits?.messages != null && obj.messages === opts.limits.messages) {
                throw new MaxLengthError('Decode error - repeated field "messages" had too many elements')
              }

              const value = SubSubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.messages$
              })
              obj.messages++

              yield {
                field: `${prefix != null ? `${prefix}.` : ''}messages`,
                index: obj.messages,
                value
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

  export interface SubMessageFooFieldEvent {
    field: 'foo$entry'
    index: number
    value: string
  }

  export interface SubMessageNonRepeatingFieldEvent {
    field: 'nonRepeating'
    value: number
  }

  export interface SubMessageMessageSubSubMessageFooFieldEvent {
    field: 'foo$entry'
    index: number
    value: string
  }

  export interface SubMessageMessageSubSubMessageNonRepeatingFieldEvent {
    field: 'nonRepeating'
    value: number
  }

  export function encode (obj: Partial<SubMessage>): Uint8Array {
    return encodeMessage(obj, SubMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): SubMessage {
    return decodeMessage(buf, SubMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): Generator<SubMessageFooFieldEvent | SubMessageNonRepeatingFieldEvent | SubMessageMessageSubSubMessageFooFieldEvent | SubMessageMessageSubSubMessageNonRepeatingFieldEvent> {
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
                throw new MaxLengthError('Decode error - repeated field "number" had too many elements')
              }

              const value = reader.uint32()
              obj.number++

              yield {
                field: `${prefix != null ? `${prefix}.` : ''}number`,
                index: obj.number,
                value
              }

              break
            }
            case 2: {
              if (opts.limits?.limitedNumber != null && obj.limitedNumber === opts.limits.limitedNumber) {
                throw new MaxLengthError('Decode error - repeated field "limitedNumber" had too many elements')
              }

              if (obj.limitedNumber === 1) {
                throw new MaxLengthError('Decode error - repeated field "limitedNumber" had too many elements')
              }

              const value = reader.uint32()
              obj.limitedNumber++

              yield {
                field: `${prefix != null ? `${prefix}.` : ''}limitedNumber`,
                index: obj.limitedNumber,
                value
              }

              break
            }
            case 3: {
              if (opts.limits?.messages != null && obj.messages === opts.limits.messages) {
                throw new MaxLengthError('Decode error - repeated field "messages" had too many elements')
              }

              const value = SubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.messages$
              })
              obj.messages++

              yield {
                field: `${prefix != null ? `${prefix}.` : ''}messages`,
                index: obj.messages,
                value
              }

              break
            }
            case 4: {
              yield {
                field: `${prefix != null ? `${prefix}.` : ''}message`,
                value: SubMessage.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.message
                })
              }
              break
            }
            case 5: {
              yield {
                field: `${prefix != null ? `${prefix}.` : ''}nonRepeating`,
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
    field: 'number$entry'
    index: number
    value: number
  }

  export interface RepeatedTypesLimitedNumberFieldEvent {
    field: 'limitedNumber$entry'
    index: number
    value: number
  }

  export interface RepeatedTypesMessageSubMessageFooFieldEvent {
    field: 'foo$entry'
    index: number
    value: string
  }

  export interface RepeatedTypesMessageSubMessageNonRepeatingFieldEvent {
    field: 'nonRepeating'
    value: number
  }

  export interface RepeatedTypesMessageSubMessageMessageSubSubMessageFooFieldEvent {
    field: 'foo$entry'
    index: number
    value: string
  }

  export interface RepeatedTypesMessageSubMessageMessageSubSubMessageNonRepeatingFieldEvent {
    field: 'nonRepeating'
    value: number
  }

  export interface RepeatedTypesNonRepeatingFieldEvent {
    field: 'nonRepeating'
    value: number
  }

  export function encode (obj: Partial<RepeatedTypes>): Uint8Array {
    return encodeMessage(obj, RepeatedTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<RepeatedTypes>): RepeatedTypes {
    return decodeMessage(buf, RepeatedTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<RepeatedTypes>): Generator<RepeatedTypesNumberFieldEvent | RepeatedTypesLimitedNumberFieldEvent | RepeatedTypesMessageSubMessageFooFieldEvent | RepeatedTypesMessageSubMessageNonRepeatingFieldEvent | RepeatedTypesMessageSubMessageMessageSubSubMessageFooFieldEvent | RepeatedTypesMessageSubMessageMessageSubSubMessageNonRepeatingFieldEvent | RepeatedTypesNonRepeatingFieldEvent> {
    return streamMessage(buf, RepeatedTypes.codec(), opts)
  }
}
