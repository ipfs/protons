import { decodeMessage, encodeMessage, enumeration, MaxLengthError, MaxSizeError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface MessageWithArrayField {
  field1?: boolean
  field2?: number
  arr: string[]
}

export interface MessageWithArrayFieldEncoder {
  field1?: boolean
  field2?: number
  arr: string[]
}

export namespace MessageWithArrayField {
  let _codec: Codec<MessageWithArrayField, MessageWithArrayFieldEncoder>

  export const codec = (): Codec<MessageWithArrayField, MessageWithArrayFieldEncoder> => {
    if (_codec == null) {
      _codec = message<MessageWithArrayField, MessageWithArrayFieldEncoder>((obj, w, opts = {}) => {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MessageWithArrayField'
          }
        }

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}field2`,
                value: reader.uint32()
              }
              break
            }
            case 3: {
              if (opts.limits?.arr != null && obj.arr === opts.limits.arr) {
                throw new MaxLengthError('Streaming decode error - repeated field "arr" had too many elements')
              }

              yield {
                field: `${prefix}arr[]`,
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'MessageWithArrayField'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithArrayFieldField1FieldEvent {
    field: '.field1'
    value: boolean
  }

  export interface MessageWithArrayFieldField2FieldEvent {
    field: '.field2'
    value: number
  }

  export interface MessageWithArrayFieldArrFieldEvent {
    field: '.arr[]'
    index: number
    value: string
  }

  export function encode (obj: Partial<MessageWithArrayFieldEncoder>): Uint8Array<ArrayBuffer> {
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

export interface NestedMessageEncoder {
  nestedValue: string
}

export namespace NestedMessage {
  let _codec: Codec<NestedMessage, NestedMessageEncoder>

  export const codec = (): Codec<NestedMessage, NestedMessageEncoder> => {
    if (_codec == null) {
      _codec = message<NestedMessage, NestedMessageEncoder>((obj, w, opts = {}) => {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'NestedMessage'
          }
        }

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}nestedValue`,
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'NestedMessage'
          }
        }
      })
    }

    return _codec
  }

  export interface NestedMessageNestedValueFieldEvent {
    field: '.nestedValue'
    value: string
  }

  export function encode (obj: Partial<NestedMessageEncoder>): Uint8Array<ArrayBuffer> {
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

export interface MessageWithNestedMessageEncoder {
  field1: boolean
  nestedMessage?: NestedMessageEncoder
}

export namespace MessageWithNestedMessage {
  let _codec: Codec<MessageWithNestedMessage, MessageWithNestedMessageEncoder>

  export const codec = (): Codec<MessageWithNestedMessage, MessageWithNestedMessageEncoder> => {
    if (_codec == null) {
      _codec = message<MessageWithNestedMessage, MessageWithNestedMessageEncoder>((obj, w, opts = {}) => {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MessageWithNestedMessage'
          }
        }

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              yield * NestedMessage.codec().stream(reader, reader.uint32(), `${prefix}nestedMessage.`, {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'MessageWithNestedMessage'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithNestedMessageField1FieldEvent {
    field: '.field1'
    value: boolean
  }

  export interface MessageWithNestedMessageNestedMessageMessageStart {
    field: '.nestedMessage'
    type: 'start'
  }

  export interface MessageWithNestedMessageNestedMessageMessageEnd {
    field: '.nestedMessage'
    type: 'end'
  }

  export interface MessageWithNestedMessageNestedMessageNestedValueFieldEvent {
    field: '.nestedMessage.nestedValue'
    value: string
  }

  export function encode (obj: Partial<MessageWithNestedMessageEncoder>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithNestedMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithNestedMessage>): MessageWithNestedMessage {
    return decodeMessage(buf, MessageWithNestedMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithNestedMessage>): Generator<MessageWithNestedMessageField1FieldEvent | MessageWithNestedMessageNestedMessageMessageStart | MessageWithNestedMessageNestedMessageMessageEnd | MessageWithNestedMessageNestedMessageNestedValueFieldEvent> {
    return streamMessage(buf, MessageWithNestedMessage.codec(), opts)
  }
}

export interface MessageWithDeeplyNestedMessage {
  field1: boolean
  nestedMessage?: MessageWithNestedMessage
}

export interface MessageWithDeeplyNestedMessageEncoder {
  field1: boolean
  nestedMessage?: MessageWithNestedMessageEncoder
}

export namespace MessageWithDeeplyNestedMessage {
  let _codec: Codec<MessageWithDeeplyNestedMessage, MessageWithDeeplyNestedMessageEncoder>

  export const codec = (): Codec<MessageWithDeeplyNestedMessage, MessageWithDeeplyNestedMessageEncoder> => {
    if (_codec == null) {
      _codec = message<MessageWithDeeplyNestedMessage, MessageWithDeeplyNestedMessageEncoder>((obj, w, opts = {}) => {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MessageWithDeeplyNestedMessage'
          }
        }

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              yield * MessageWithNestedMessage.codec().stream(reader, reader.uint32(), `${prefix}nestedMessage.`, {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'MessageWithDeeplyNestedMessage'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithDeeplyNestedMessageField1FieldEvent {
    field: '.field1'
    value: boolean
  }

  export interface MessageWithDeeplyNestedMessageNestedMessageMessageStart {
    field: '.nestedMessage'
    type: 'start'
  }

  export interface MessageWithDeeplyNestedMessageNestedMessageMessageEnd {
    field: '.nestedMessage'
    type: 'end'
  }

  export interface MessageWithDeeplyNestedMessageNestedMessageField1FieldEvent {
    field: '.nestedMessage.field1'
    value: boolean
  }

  export interface MessageWithDeeplyNestedMessageNestedMessageNestedMessageMessageStart {
    field: '.nestedMessage.nestedMessage'
    type: 'start'
  }

  export interface MessageWithDeeplyNestedMessageNestedMessageNestedMessageMessageEnd {
    field: '.nestedMessage.nestedMessage'
    type: 'end'
  }

  export interface MessageWithDeeplyNestedMessageNestedMessageNestedMessageNestedValueFieldEvent {
    field: '.nestedMessage.nestedMessage.nestedValue'
    value: string
  }

  export function encode (obj: Partial<MessageWithDeeplyNestedMessageEncoder>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithDeeplyNestedMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithDeeplyNestedMessage>): MessageWithDeeplyNestedMessage {
    return decodeMessage(buf, MessageWithDeeplyNestedMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithDeeplyNestedMessage>): Generator<MessageWithDeeplyNestedMessageField1FieldEvent | MessageWithDeeplyNestedMessageNestedMessageMessageStart | MessageWithDeeplyNestedMessageNestedMessageMessageEnd | MessageWithDeeplyNestedMessageNestedMessageField1FieldEvent | MessageWithDeeplyNestedMessageNestedMessageNestedMessageMessageStart | MessageWithDeeplyNestedMessageNestedMessageNestedMessageMessageEnd | MessageWithDeeplyNestedMessageNestedMessageNestedMessageNestedValueFieldEvent> {
    return streamMessage(buf, MessageWithDeeplyNestedMessage.codec(), opts)
  }
}

export interface MessageWithRepeatedMessage {
  field1: boolean
  nestedMessages: NestedMessage[]
}

export interface MessageWithRepeatedMessageEncoder {
  field1: boolean
  nestedMessages: NestedMessageEncoder[]
}

export namespace MessageWithRepeatedMessage {
  let _codec: Codec<MessageWithRepeatedMessage, MessageWithRepeatedMessageEncoder>

  export const codec = (): Codec<MessageWithRepeatedMessage, MessageWithRepeatedMessageEncoder> => {
    if (_codec == null) {
      _codec = message<MessageWithRepeatedMessage, MessageWithRepeatedMessageEncoder>((obj, w, opts = {}) => {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MessageWithRepeatedMessage'
          }
        }

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              if (opts.limits?.nestedMessages != null && obj.nestedMessages === opts.limits.nestedMessages) {
                throw new MaxLengthError('Streaming decode error - repeated field "nestedMessages" had too many elements')
              }

              for (const evt of NestedMessage.codec().stream(reader, reader.uint32(), `${prefix}nestedMessages[].`, {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'MessageWithRepeatedMessage'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithRepeatedMessageField1FieldEvent {
    field: '.field1'
    value: boolean
  }

  export interface MessageWithRepeatedMessageNestedMessagesNestedValueFieldEvent {
    field: '.nestedMessages[].nestedValue'
    value: string
    index: number
  }

  export interface MessageWithRepeatedMessageNestedMessagesMessageStartEvent {
    field: '.nestedMessages[]'
    index: number
    type: 'start'
    message: string
  }

  export interface MessageWithRepeatedMessageNestedMessagesMessageEndEvent {
    field: '.nestedMessages[]'
    index: number
    type: 'end'
    message: string
  }

  export function encode (obj: Partial<MessageWithRepeatedMessageEncoder>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithRepeatedMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRepeatedMessage>): MessageWithRepeatedMessage {
    return decodeMessage(buf, MessageWithRepeatedMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRepeatedMessage>): Generator<MessageWithRepeatedMessageField1FieldEvent | MessageWithRepeatedMessageNestedMessagesNestedValueFieldEvent | MessageWithRepeatedMessageNestedMessagesMessageStartEvent | MessageWithRepeatedMessageNestedMessagesMessageEndEvent> {
    return streamMessage(buf, MessageWithRepeatedMessage.codec(), opts)
  }
}

export interface MessageWithMapMessage {
  field1: boolean
  nestedMessages: Map<string, NestedMessage>
}

export interface MessageWithMapMessageEncoder {
  field1: boolean
  nestedMessages: Map<string, NestedMessageEncoder>
}

export namespace MessageWithMapMessage {
  export interface MessageWithMapMessage$nestedMessagesEntry {
    key: string
    value?: NestedMessage
  }

  export interface MessageWithMapMessage$nestedMessagesEntryEncoder {
    key: string
    value?: NestedMessageEncoder
  }

  export namespace MessageWithMapMessage$nestedMessagesEntry {
    let _codec: Codec<MessageWithMapMessage$nestedMessagesEntry, MessageWithMapMessage$nestedMessagesEntryEncoder>

    export const codec = (): Codec<MessageWithMapMessage$nestedMessagesEntry, MessageWithMapMessage$nestedMessagesEntryEncoder> => {
      if (_codec == null) {
        _codec = message<MessageWithMapMessage$nestedMessagesEntry, MessageWithMapMessage$nestedMessagesEntryEncoder>((obj, w, opts = {}) => {
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

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'MessageWithMapMessage.MessageWithMapMessage$nestedMessagesEntry'
            }
          }

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}key`,
                  value: reader.string()
                }
                break
              }
              case 2: {
                yield * NestedMessage.codec().stream(reader, reader.uint32(), `${prefix}value.`, {
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

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'end',
              message: 'MessageWithMapMessage.MessageWithMapMessage$nestedMessagesEntry'
            }
          }
        })
      }

      return _codec
    }

    export interface MessageWithMapMessage$nestedMessagesEntryKeyFieldEvent {
      field: '.key'
      value: string
    }

    export interface MessageWithMapMessage$nestedMessagesEntryValueMessageStart {
      field: '.value'
      type: 'start'
    }

    export interface MessageWithMapMessage$nestedMessagesEntryValueMessageEnd {
      field: '.value'
      type: 'end'
    }

    export interface MessageWithMapMessage$nestedMessagesEntryValueNestedValueFieldEvent {
      field: '.value.nestedValue'
      value: string
    }

    export function encode (obj: Partial<MessageWithMapMessage$nestedMessagesEntryEncoder>): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, MessageWithMapMessage$nestedMessagesEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithMapMessage$nestedMessagesEntry>): MessageWithMapMessage$nestedMessagesEntry {
      return decodeMessage(buf, MessageWithMapMessage$nestedMessagesEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithMapMessage$nestedMessagesEntry>): Generator<MessageWithMapMessage$nestedMessagesEntryKeyFieldEvent | MessageWithMapMessage$nestedMessagesEntryValueMessageStart | MessageWithMapMessage$nestedMessagesEntryValueMessageEnd | MessageWithMapMessage$nestedMessagesEntryValueNestedValueFieldEvent> {
      return streamMessage(buf, MessageWithMapMessage$nestedMessagesEntry.codec(), opts)
    }
  }

  let _codec: Codec<MessageWithMapMessage, MessageWithMapMessageEncoder>

  export const codec = (): Codec<MessageWithMapMessage, MessageWithMapMessageEncoder> => {
    if (_codec == null) {
      _codec = message<MessageWithMapMessage, MessageWithMapMessageEncoder>((obj, w, opts = {}) => {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MessageWithMapMessage'
          }
        }

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              if (opts.limits?.nestedMessages != null && obj.nestedMessages === opts.limits.nestedMessages) {
                throw new MaxLengthError('Decode error - map field "nestedMessages" had too many elements')
              }

              yield * MessageWithMapMessage.MessageWithMapMessage$nestedMessagesEntry.codec().stream(reader, reader.uint32(), `${prefix}nestedMessages{}.`, {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'MessageWithMapMessage'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithMapMessageField1FieldEvent {
    field: '.field1'
    value: boolean
  }

  export interface MessageWithMapMessageNestedMessagesNestedValueFieldEvent {
    field: '.nestedMessages{}.nestedValue'
    value: NestedMessage
    key: string
  }

  export interface MessageWithMapMessageNestedMessagesMessageStartEvent {
    field: '.nestedMessages{}'
    key: string
    type: 'start'
    message: string
  }

  export interface MessageWithMapMessageNestedMessagesMessageEndEvent {
    field: '.nestedMessages{}'
    key: string
    type: 'end'
    message: string
  }

  export function encode (obj: Partial<MessageWithMapMessageEncoder>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithMapMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithMapMessage>): MessageWithMapMessage {
    return decodeMessage(buf, MessageWithMapMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithMapMessage>): Generator<MessageWithMapMessageField1FieldEvent | MessageWithMapMessageNestedMessagesNestedValueFieldEvent | MessageWithMapMessageNestedMessagesMessageStartEvent | MessageWithMapMessageNestedMessagesMessageEndEvent> {
    return streamMessage(buf, MessageWithMapMessage.codec(), opts)
  }
}

export interface MessageWithPrimitiveMap {
  field1: boolean
  nestedStrings: Map<string, string>
}

export interface MessageWithPrimitiveMapEncoder {
  field1: boolean
  nestedStrings: Map<string, string>
}

export namespace MessageWithPrimitiveMap {
  export interface MessageWithPrimitiveMap$nestedStringsEntry {
    key: string
    value: string
  }

  export interface MessageWithPrimitiveMap$nestedStringsEntryEncoder {
    key: string
    value: string
  }

  export namespace MessageWithPrimitiveMap$nestedStringsEntry {
    let _codec: Codec<MessageWithPrimitiveMap$nestedStringsEntry, MessageWithPrimitiveMap$nestedStringsEntryEncoder>

    export const codec = (): Codec<MessageWithPrimitiveMap$nestedStringsEntry, MessageWithPrimitiveMap$nestedStringsEntryEncoder> => {
      if (_codec == null) {
        _codec = message<MessageWithPrimitiveMap$nestedStringsEntry, MessageWithPrimitiveMap$nestedStringsEntryEncoder>((obj, w, opts = {}) => {
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

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'MessageWithPrimitiveMap.MessageWithPrimitiveMap$nestedStringsEntry'
            }
          }

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}key`,
                  value: reader.string()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}value`,
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

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'end',
              message: 'MessageWithPrimitiveMap.MessageWithPrimitiveMap$nestedStringsEntry'
            }
          }
        })
      }

      return _codec
    }

    export interface MessageWithPrimitiveMap$nestedStringsEntryKeyFieldEvent {
      field: '.key'
      value: string
    }

    export interface MessageWithPrimitiveMap$nestedStringsEntryValueFieldEvent {
      field: '.value'
      value: string
    }

    export function encode (obj: Partial<MessageWithPrimitiveMap$nestedStringsEntryEncoder>): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, MessageWithPrimitiveMap$nestedStringsEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithPrimitiveMap$nestedStringsEntry>): MessageWithPrimitiveMap$nestedStringsEntry {
      return decodeMessage(buf, MessageWithPrimitiveMap$nestedStringsEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithPrimitiveMap$nestedStringsEntry>): Generator<MessageWithPrimitiveMap$nestedStringsEntryKeyFieldEvent | MessageWithPrimitiveMap$nestedStringsEntryValueFieldEvent> {
      return streamMessage(buf, MessageWithPrimitiveMap$nestedStringsEntry.codec(), opts)
    }
  }

  let _codec: Codec<MessageWithPrimitiveMap, MessageWithPrimitiveMapEncoder>

  export const codec = (): Codec<MessageWithPrimitiveMap, MessageWithPrimitiveMapEncoder> => {
    if (_codec == null) {
      _codec = message<MessageWithPrimitiveMap, MessageWithPrimitiveMapEncoder>((obj, w, opts = {}) => {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MessageWithPrimitiveMap'
          }
        }

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              if (opts.limits?.nestedStrings != null && obj.nestedStrings === opts.limits.nestedStrings) {
                throw new MaxLengthError('Decode error - map field "nestedStrings" had too many elements')
              }

              yield * MessageWithPrimitiveMap.MessageWithPrimitiveMap$nestedStringsEntry.codec().stream(reader, reader.uint32(), `${prefix}nestedStrings{}.`, {
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

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'MessageWithPrimitiveMap'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithPrimitiveMapField1FieldEvent {
    field: '.field1'
    value: boolean
  }

  export interface MessageWithPrimitiveMapNestedStringsFieldEvent {
    field: '.nestedStrings{}'
    key: string
    value: string
  }

  export function encode (obj: Partial<MessageWithPrimitiveMapEncoder>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithPrimitiveMap.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithPrimitiveMap>): MessageWithPrimitiveMap {
    return decodeMessage(buf, MessageWithPrimitiveMap.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithPrimitiveMap>): Generator<MessageWithPrimitiveMapField1FieldEvent | MessageWithPrimitiveMapNestedStringsFieldEvent> {
    return streamMessage(buf, MessageWithPrimitiveMap.codec(), opts)
  }
}

export enum ENUM {
  VAL_1 = 'VAL_1',
  VAL_2 = 'VAL_2',
  VAL_3 = 'VAL_3'
}

enum __ENUMValues {
  VAL_1 = 0,
  VAL_2 = 1,
  VAL_3 = 3
}

export namespace ENUM {
  export const codec = (): Codec<ENUM, ENUM> => {
    return enumeration<ENUM>(__ENUMValues)
  }
}

export interface MessageWithRepeatedEnums {
  field1: boolean
  enums: ENUM[]
}

export interface MessageWithRepeatedEnumsEncoder {
  field1: boolean
  enums: ENUM[]
}

export namespace MessageWithRepeatedEnums {
  let _codec: Codec<MessageWithRepeatedEnums, MessageWithRepeatedEnumsEncoder>

  export const codec = (): Codec<MessageWithRepeatedEnums, MessageWithRepeatedEnumsEncoder> => {
    if (_codec == null) {
      _codec = message<MessageWithRepeatedEnums, MessageWithRepeatedEnumsEncoder>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.field1 != null && obj.field1 !== false)) {
          w.uint32(8)
          w.bool(obj.field1)
        }

        if (obj.enums != null && obj.enums.length > 0) {
          for (const value of obj.enums) {
            w.uint32(16)
            ENUM.codec().encode(value, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          field1: false,
          enums: []
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
              if (opts.limits?.enums != null && obj.enums.length === opts.limits.enums) {
                throw new MaxLengthError('Decode error - repeated field "enums" had too many elements')
              }

              obj.enums.push(ENUM.codec().decode(reader))
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
          enums: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MessageWithRepeatedEnums'
          }
        }

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}field1`,
                value: reader.bool()
              }
              break
            }
            case 2: {
              if (opts.limits?.enums != null && obj.enums === opts.limits.enums) {
                throw new MaxLengthError('Streaming decode error - repeated field "enums" had too many elements')
              }

              yield {
                field: `${prefix}enums[]`,
                index: obj.enums,
                value: ENUM.codec().decode(reader)
              }

              obj.enums++

              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'MessageWithRepeatedEnums'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithRepeatedEnumsField1FieldEvent {
    field: '.field1'
    value: boolean
  }

  export interface MessageWithRepeatedEnumsEnumsFieldEvent {
    field: '.enums[]'
    index: number
    value: ENUM
  }

  export function encode (obj: Partial<MessageWithRepeatedEnumsEncoder>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithRepeatedEnums.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRepeatedEnums>): MessageWithRepeatedEnums {
    return decodeMessage(buf, MessageWithRepeatedEnums.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRepeatedEnums>): Generator<MessageWithRepeatedEnumsField1FieldEvent | MessageWithRepeatedEnumsEnumsFieldEvent> {
    return streamMessage(buf, MessageWithRepeatedEnums.codec(), opts)
  }
}
