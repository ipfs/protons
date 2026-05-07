import { decodeMessage, encodeMessage, MaxLengthError, MaxSizeError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface MessageWithArrayField {
  field1?: boolean
  field2?: number
  arr: string[]
}

export namespace MessageWithArrayField {
  let _codec: Codec<MessageWithArrayField>

  export const codec = (): Codec<MessageWithArrayField> => {
    if (_codec == null) {
      _codec = message<MessageWithArrayField>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.field1 != null) {
          w.uint32(8)
          w.bool(obj.field1)
        }

        if (obj.field2 != null) {
          w.uint32(16)
          w.uint32(obj.field2)
        }

        if (obj.arr != null && obj.arr.length > 0) {
          for (const value of obj.arr) {
            w.uint32(26)
            w.string(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          arr: []
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
              obj.field2 = reader.uint32()
              break
            }
            case 3: {
              if (opts.limits?.arr != null && obj.arr.length === opts.limits.arr) {
                throw new MaxLengthError('Decode error - repeated field "arr" had too many elements')
              }

              obj.arr.push(reader.string())
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
          arr: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}.field2`,
                value: reader.uint32()
              }
              break
            }
            case 3: {
              if (opts.limits?.arr != null && obj.arr === opts.limits.arr) {
                throw new MaxLengthError('Streaming decode error - repeated field "arr" had too many elements')
              }

              yield {
                field: `${prefix}.arr[]`,
                index: obj.arr,
                value: reader.string()
              }

              obj.arr++

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

  export interface MessageWithArrayFieldField1FieldEvent {
    field: '$.field1'
    value: boolean
  }

  export interface MessageWithArrayFieldField2FieldEvent {
    field: '$.field2'
    value: number
  }

  export interface MessageWithArrayFieldArrFieldEvent {
    field: '$.arr[]'
    index: number
    value: string
  }

  export function encode (obj: Partial<MessageWithArrayField>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithArrayField.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithArrayField>): MessageWithArrayField {
    return decodeMessage(buf, MessageWithArrayField.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithArrayField>): Generator<MessageWithArrayFieldField1FieldEvent | MessageWithArrayFieldField2FieldEvent | MessageWithArrayFieldArrFieldEvent> {
    return streamMessage(buf, MessageWithArrayField.codec(), opts)
  }
}

export interface NestedMessage {
  nestedValue: string
}

export namespace NestedMessage {
  let _codec: Codec<NestedMessage>

  export const codec = (): Codec<NestedMessage> => {
    if (_codec == null) {
      _codec = message<NestedMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.nestedValue != null && obj.nestedValue !== '')) {
          w.uint32(10)
          w.string(obj.nestedValue)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          nestedValue: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.nestedValue = reader.string()
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
        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.nestedValue`,
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

  export interface NestedMessageNestedValueFieldEvent {
    field: '$.nestedValue'
    value: string
  }

  export function encode (obj: Partial<NestedMessage>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, NestedMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<NestedMessage>): NestedMessage {
    return decodeMessage(buf, NestedMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<NestedMessage>): Generator<NestedMessageNestedValueFieldEvent> {
    return streamMessage(buf, NestedMessage.codec(), opts)
  }
}

export interface MessageWithNestedMessage {
  field1: boolean
  nestedMessage?: NestedMessage
}

export namespace MessageWithNestedMessage {
  let _codec: Codec<MessageWithNestedMessage>

  export const codec = (): Codec<MessageWithNestedMessage> => {
    if (_codec == null) {
      _codec = message<MessageWithNestedMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.field1 != null && obj.field1 !== false)) {
          w.uint32(8)
          w.bool(obj.field1)
        }

        if (obj.nestedMessage != null) {
          w.uint32(18)
          NestedMessage.codec().encode(obj.nestedMessage, w)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          field1: false
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
              obj.nestedMessage = NestedMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.nestedMessage
              })
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
        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              yield * NestedMessage.codec().stream(reader, reader.uint32(), `${prefix}.nestedMessage`, {
                limits: opts.limits?.nestedMessage
              })

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

  export interface MessageWithNestedMessageField1FieldEvent {
    field: '$.field1'
    value: boolean
  }

  export interface MessageWithNestedMessageNestedMessageNestedValueFieldEvent {
    field: '$.nestedMessage.nestedValue'
    value: string
  }

  export function encode (obj: Partial<MessageWithNestedMessage>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithNestedMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithNestedMessage>): MessageWithNestedMessage {
    return decodeMessage(buf, MessageWithNestedMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithNestedMessage>): Generator<MessageWithNestedMessageField1FieldEvent | MessageWithNestedMessageNestedMessageNestedValueFieldEvent> {
    return streamMessage(buf, MessageWithNestedMessage.codec(), opts)
  }
}

export interface MessageWithDeeplyNestedMessage {
  field1: boolean
  nestedMessage?: MessageWithNestedMessage
}

export namespace MessageWithDeeplyNestedMessage {
  let _codec: Codec<MessageWithDeeplyNestedMessage>

  export const codec = (): Codec<MessageWithDeeplyNestedMessage> => {
    if (_codec == null) {
      _codec = message<MessageWithDeeplyNestedMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.field1 != null && obj.field1 !== false)) {
          w.uint32(8)
          w.bool(obj.field1)
        }

        if (obj.nestedMessage != null) {
          w.uint32(18)
          MessageWithNestedMessage.codec().encode(obj.nestedMessage, w)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          field1: false
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
              obj.nestedMessage = MessageWithNestedMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.nestedMessage
              })
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
        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              yield * MessageWithNestedMessage.codec().stream(reader, reader.uint32(), `${prefix}.nestedMessage`, {
                limits: opts.limits?.nestedMessage
              })

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

  export interface MessageWithDeeplyNestedMessageField1FieldEvent {
    field: '$.field1'
    value: boolean
  }

  export interface MessageWithDeeplyNestedMessageNestedMessageField1FieldEvent {
    field: '$.nestedMessage.field1'
    value: boolean
  }

  export interface MessageWithDeeplyNestedMessageNestedMessageNestedMessageNestedValueFieldEvent {
    field: '$.nestedMessage.nestedMessage.nestedValue'
    value: string
  }

  export function encode (obj: Partial<MessageWithDeeplyNestedMessage>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithDeeplyNestedMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithDeeplyNestedMessage>): MessageWithDeeplyNestedMessage {
    return decodeMessage(buf, MessageWithDeeplyNestedMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithDeeplyNestedMessage>): Generator<MessageWithDeeplyNestedMessageField1FieldEvent | MessageWithDeeplyNestedMessageNestedMessageField1FieldEvent | MessageWithDeeplyNestedMessageNestedMessageNestedMessageNestedValueFieldEvent> {
    return streamMessage(buf, MessageWithDeeplyNestedMessage.codec(), opts)
  }
}

export interface MessageWithRepeatedMessage {
  field1: boolean
  nestedMessages: NestedMessage[]
}

export namespace MessageWithRepeatedMessage {
  let _codec: Codec<MessageWithRepeatedMessage>

  export const codec = (): Codec<MessageWithRepeatedMessage> => {
    if (_codec == null) {
      _codec = message<MessageWithRepeatedMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.field1 != null && obj.field1 !== false)) {
          w.uint32(8)
          w.bool(obj.field1)
        }

        if (obj.nestedMessages != null && obj.nestedMessages.length > 0) {
          for (const value of obj.nestedMessages) {
            w.uint32(18)
            NestedMessage.codec().encode(value, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          field1: false,
          nestedMessages: []
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
              if (opts.limits?.nestedMessages != null && obj.nestedMessages.length === opts.limits.nestedMessages) {
                throw new MaxLengthError('Decode error - repeated field "nestedMessages" had too many elements')
              }

              obj.nestedMessages.push(NestedMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.nestedMessages$
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
          nestedMessages: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              if (opts.limits?.nestedMessages != null && obj.nestedMessages === opts.limits.nestedMessages) {
                throw new MaxLengthError('Streaming decode error - repeated field "nestedMessages" had too many elements')
              }

              for (const evt of NestedMessage.codec().stream(reader, reader.uint32(), `${prefix}.nestedMessages[]`, {
                limits: opts.limits?.nestedMessages$
              })) {
                yield {
                  ...evt,
                  index: obj.nestedMessages
                }
              }

              obj.nestedMessages++

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

  export interface MessageWithRepeatedMessageField1FieldEvent {
    field: '$.field1'
    value: boolean
  }

  export interface MessageWithRepeatedMessageNestedMessagesNestedValueFieldEvent {
    field: '$.nestedMessages[].nestedValue'
    value: string
    index: number
  }

  export function encode (obj: Partial<MessageWithRepeatedMessage>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithRepeatedMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRepeatedMessage>): MessageWithRepeatedMessage {
    return decodeMessage(buf, MessageWithRepeatedMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRepeatedMessage>): Generator<MessageWithRepeatedMessageField1FieldEvent | MessageWithRepeatedMessageNestedMessagesNestedValueFieldEvent> {
    return streamMessage(buf, MessageWithRepeatedMessage.codec(), opts)
  }
}

export interface MessageWithMapMessage {
  field1: boolean
  nestedMessages: Map<string, NestedMessage>
}

export namespace MessageWithMapMessage {
  export interface MessageWithMapMessage$nestedMessagesEntry {
    key: string
    value?: NestedMessage
  }

  export namespace MessageWithMapMessage$nestedMessagesEntry {
    let _codec: Codec<MessageWithMapMessage$nestedMessagesEntry>

    export const codec = (): Codec<MessageWithMapMessage$nestedMessagesEntry> => {
      if (_codec == null) {
        _codec = message<MessageWithMapMessage$nestedMessagesEntry>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== '')) {
            w.uint32(10)
            w.string(obj.key)
          }

          if (obj.value != null) {
            w.uint32(18)
            NestedMessage.codec().encode(obj.value, w)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            key: ''
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = reader.string()
                break
              }
              case 2: {
                obj.value = NestedMessage.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.value
                })
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
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}.key`,
                  value: reader.string()
                }
                break
              }
              case 2: {
                yield * NestedMessage.codec().stream(reader, reader.uint32(), `${prefix}.value`, {
                  limits: opts.limits?.value
                })

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

    export interface MessageWithMapMessage$nestedMessagesEntryKeyFieldEvent {
      field: '$.key'
      value: string
    }

    export interface MessageWithMapMessage$nestedMessagesEntryValueNestedValueFieldEvent {
      field: '$.value.nestedValue'
      value: string
    }

    export function encode (obj: Partial<MessageWithMapMessage$nestedMessagesEntry>): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, MessageWithMapMessage$nestedMessagesEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithMapMessage$nestedMessagesEntry>): MessageWithMapMessage$nestedMessagesEntry {
      return decodeMessage(buf, MessageWithMapMessage$nestedMessagesEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithMapMessage$nestedMessagesEntry>): Generator<MessageWithMapMessage$nestedMessagesEntryKeyFieldEvent | MessageWithMapMessage$nestedMessagesEntryValueNestedValueFieldEvent> {
      return streamMessage(buf, MessageWithMapMessage$nestedMessagesEntry.codec(), opts)
    }
  }

  let _codec: Codec<MessageWithMapMessage>

  export const codec = (): Codec<MessageWithMapMessage> => {
    if (_codec == null) {
      _codec = message<MessageWithMapMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.field1 != null && obj.field1 !== false)) {
          w.uint32(8)
          w.bool(obj.field1)
        }

        if (obj.nestedMessages != null && obj.nestedMessages.size > 0) {
          for (const [key, value] of obj.nestedMessages.entries()) {
            w.uint32(18)
            MessageWithMapMessage.MessageWithMapMessage$nestedMessagesEntry.codec().encode({ key, value }, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          field1: false,
          nestedMessages: new Map<string, NestedMessage>()
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
              if (opts.limits?.nestedMessages != null && obj.nestedMessages.size === opts.limits.nestedMessages) {
                throw new MaxSizeError('Decode error - map field "nestedMessages" had too many elements')
              }

              const entry = MessageWithMapMessage.MessageWithMapMessage$nestedMessagesEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.nestedMessages$value
                }
              })
              obj.nestedMessages.set(entry.key, entry.value)
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
          nestedMessages: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              if (opts.limits?.nestedMessages != null && obj.nestedMessages === opts.limits.nestedMessages) {
                throw new MaxLengthError('Decode error - map field "nestedMessages" had too many elements')
              }

              yield * MessageWithMapMessage.MessageWithMapMessage$nestedMessagesEntry.codec().stream(reader, reader.uint32(), `${prefix}.nestedMessages{}`, {
                limits: {
                  value: opts.limits?.nestedMessages$value
                }
              })

              obj.nestedMessages++

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

  export interface MessageWithMapMessageField1FieldEvent {
    field: '$.field1'
    value: boolean
  }

  export interface MessageWithMapMessageNestedMessagesNestedValueFieldEvent {
    field: '$.nestedMessages{}.nestedValue'
    value: NestedMessage
    key: string
  }

  export function encode (obj: Partial<MessageWithMapMessage>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithMapMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithMapMessage>): MessageWithMapMessage {
    return decodeMessage(buf, MessageWithMapMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithMapMessage>): Generator<MessageWithMapMessageField1FieldEvent | MessageWithMapMessageNestedMessagesNestedValueFieldEvent> {
    return streamMessage(buf, MessageWithMapMessage.codec(), opts)
  }
}

export interface MessageWithPrimitiveMap {
  field1: boolean
  nestedStrings: Map<string, string>
}

export namespace MessageWithPrimitiveMap {
  export interface MessageWithPrimitiveMap$nestedStringsEntry {
    key: string
    value: string
  }

  export namespace MessageWithPrimitiveMap$nestedStringsEntry {
    let _codec: Codec<MessageWithPrimitiveMap$nestedStringsEntry>

    export const codec = (): Codec<MessageWithPrimitiveMap$nestedStringsEntry> => {
      if (_codec == null) {
        _codec = message<MessageWithPrimitiveMap$nestedStringsEntry>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== '')) {
            w.uint32(10)
            w.string(obj.key)
          }

          if ((obj.value != null && obj.value !== '')) {
            w.uint32(18)
            w.string(obj.value)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            key: '',
            value: ''
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = reader.string()
                break
              }
              case 2: {
                obj.value = reader.string()
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
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}.key`,
                  value: reader.string()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}.value`,
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

    export interface MessageWithPrimitiveMap$nestedStringsEntryKeyFieldEvent {
      field: '$.key'
      value: string
    }

    export interface MessageWithPrimitiveMap$nestedStringsEntryValueFieldEvent {
      field: '$.value'
      value: string
    }

    export function encode (obj: Partial<MessageWithPrimitiveMap$nestedStringsEntry>): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, MessageWithPrimitiveMap$nestedStringsEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithPrimitiveMap$nestedStringsEntry>): MessageWithPrimitiveMap$nestedStringsEntry {
      return decodeMessage(buf, MessageWithPrimitiveMap$nestedStringsEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithPrimitiveMap$nestedStringsEntry>): Generator<MessageWithPrimitiveMap$nestedStringsEntryKeyFieldEvent | MessageWithPrimitiveMap$nestedStringsEntryValueFieldEvent> {
      return streamMessage(buf, MessageWithPrimitiveMap$nestedStringsEntry.codec(), opts)
    }
  }

  let _codec: Codec<MessageWithPrimitiveMap>

  export const codec = (): Codec<MessageWithPrimitiveMap> => {
    if (_codec == null) {
      _codec = message<MessageWithPrimitiveMap>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.field1 != null && obj.field1 !== false)) {
          w.uint32(8)
          w.bool(obj.field1)
        }

        if (obj.nestedStrings != null && obj.nestedStrings.size > 0) {
          for (const [key, value] of obj.nestedStrings.entries()) {
            w.uint32(18)
            MessageWithPrimitiveMap.MessageWithPrimitiveMap$nestedStringsEntry.codec().encode({ key, value }, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          field1: false,
          nestedStrings: new Map<string, string>()
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
              if (opts.limits?.nestedStrings != null && obj.nestedStrings.size === opts.limits.nestedStrings) {
                throw new MaxSizeError('Decode error - map field "nestedStrings" had too many elements')
              }

              const entry = MessageWithPrimitiveMap.MessageWithPrimitiveMap$nestedStringsEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.nestedStrings$value
                }
              })
              obj.nestedStrings.set(entry.key, entry.value)
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
          nestedStrings: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              if (opts.limits?.nestedStrings != null && obj.nestedStrings === opts.limits.nestedStrings) {
                throw new MaxLengthError('Decode error - map field "nestedStrings" had too many elements')
              }

              yield * MessageWithPrimitiveMap.MessageWithPrimitiveMap$nestedStringsEntry.codec().stream(reader, reader.uint32(), `${prefix}.nestedStrings{}`, {
                limits: {
                  value: opts.limits?.nestedStrings$value
                }
              })

              obj.nestedStrings++

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

  export interface MessageWithPrimitiveMapField1FieldEvent {
    field: '$.field1'
    value: boolean
  }

  export interface MessageWithPrimitiveMapNestedStringsFieldEvent {
    field: '$.nestedStrings{}'
    key: string
    value: string
  }

  export function encode (obj: Partial<MessageWithPrimitiveMap>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithPrimitiveMap.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithPrimitiveMap>): MessageWithPrimitiveMap {
    return decodeMessage(buf, MessageWithPrimitiveMap.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithPrimitiveMap>): Generator<MessageWithPrimitiveMapField1FieldEvent | MessageWithPrimitiveMapNestedStringsFieldEvent> {
    return streamMessage(buf, MessageWithPrimitiveMap.codec(), opts)
  }
}
