import { decodeMessage, encodeMessage, MaxLengthError, MaxSizeError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface MessageWithSizeLimitedRepeatedField {
  repeatedField: string[]
}

export namespace MessageWithSizeLimitedRepeatedField {
  let _codec: Codec<MessageWithSizeLimitedRepeatedField, MessageWithSizeLimitedRepeatedFieldStreamEvent, MessageWithSizeLimitedRepeatedFieldStreamCollectionsEvent>

  export const codec = (): Codec<MessageWithSizeLimitedRepeatedField, MessageWithSizeLimitedRepeatedFieldStreamEvent, MessageWithSizeLimitedRepeatedFieldStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<MessageWithSizeLimitedRepeatedField, MessageWithSizeLimitedRepeatedFieldStreamEvent, MessageWithSizeLimitedRepeatedFieldStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.repeatedField != null) {
          for (const value of obj.repeatedField) {
            w.uint32(10)
            w.string(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          repeatedField: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.repeatedField != null && obj.repeatedField.length === opts.limits.repeatedField) {
                throw new MaxLengthError('Decode error - map field "repeatedField" had too many elements')
              }

              if (obj.repeatedField.length === 1) {
                throw new MaxLengthError('Decode error - repeated field "repeatedField" had too many elements')
              }

              obj.repeatedField.push(reader.string())
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
            repeatedField: []
          }
        } else {
          obj = {
            repeatedField: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.repeatedField != null && (opts.emitCollections === true ? obj.repeatedField.length === opts.limits.repeatedField : obj.repeatedField === opts.limits.repeatedField)) {
                throw new MaxLengthError('Decode error - map field "repeatedField" had too many elements')
              }

              if (opts.emitCollections === true ? obj.repeatedField.length === 1 : obj.repeatedField === 1) {
                throw new MaxLengthError('Decode error - repeated field "repeatedField" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'repeatedField$value',
                index: opts.emitCollections === true ? obj.repeatedField.length : obj.repeatedField,
                value
              }

              if (opts.emitCollections === true) {
                obj.repeatedField.push(value)
              } else {
                obj.repeatedField++
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

  export interface MessageWithSizeLimitedRepeatedFieldRepeatedFieldFieldEvent {
    field: 'repeatedField'
    value: string[]
  }

  export interface MessageWithSizeLimitedRepeatedFieldRepeatedFieldValueEvent {
    field: 'repeatedField$value'
    index: number
    value: string
  }

  export type MessageWithSizeLimitedRepeatedFieldStreamEvent = MessageWithSizeLimitedRepeatedFieldRepeatedFieldValueEvent
  export type MessageWithSizeLimitedRepeatedFieldStreamCollectionsEvent = MessageWithSizeLimitedRepeatedFieldRepeatedFieldFieldEvent

  export function encode (obj: Partial<MessageWithSizeLimitedRepeatedField>): Uint8Array {
    return encodeMessage(obj, MessageWithSizeLimitedRepeatedField.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedRepeatedField>): MessageWithSizeLimitedRepeatedField {
    return decodeMessage(buf, MessageWithSizeLimitedRepeatedField.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MessageWithSizeLimitedRepeatedField>): Generator<MessageWithSizeLimitedRepeatedFieldStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MessageWithSizeLimitedRepeatedField>): Generator<MessageWithSizeLimitedRepeatedFieldStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, MessageWithSizeLimitedRepeatedField.codec(), opts)
  }
}

export interface MessageWithSizeLimitedMap {
  mapField: Map<string, string>
}

export namespace MessageWithSizeLimitedMap {
  export interface MessageWithSizeLimitedMap$mapFieldEntry {
    key: string
    value: string
  }

  export namespace MessageWithSizeLimitedMap$mapFieldEntry {
    let _codec: Codec<MessageWithSizeLimitedMap$mapFieldEntry, MessageWithSizeLimitedMap$mapFieldEntryStreamEvent, MessageWithSizeLimitedMap$mapFieldEntryStreamCollectionsEvent>

    export const codec = (): Codec<MessageWithSizeLimitedMap$mapFieldEntry, MessageWithSizeLimitedMap$mapFieldEntryStreamEvent, MessageWithSizeLimitedMap$mapFieldEntryStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<MessageWithSizeLimitedMap$mapFieldEntry, MessageWithSizeLimitedMap$mapFieldEntryStreamEvent, MessageWithSizeLimitedMap$mapFieldEntryStreamCollectionsEvent>((obj, w, opts = {}) => {
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
        }, function * (reader, length, opts = {}) {
          let obj: any

          if (opts.emitCollections === true) {
            obj = {
              key: '',
              value: ''
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
                  field: 'key',
                  value: reader.string()
                }
                break
              }
              case 2: {
                yield {
                  field: 'value',
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

    export interface MessageWithSizeLimitedMap$mapFieldEntryKeyFieldEvent {
      field: 'key'
      value: string
    }

    export interface MessageWithSizeLimitedMap$mapFieldEntryValueFieldEvent {
      field: 'value'
      value: string
    }

    export type MessageWithSizeLimitedMap$mapFieldEntryStreamEvent = MessageWithSizeLimitedMap$mapFieldEntryKeyFieldEvent | MessageWithSizeLimitedMap$mapFieldEntryValueFieldEvent
    export type MessageWithSizeLimitedMap$mapFieldEntryStreamCollectionsEvent = {}

    export function encode (obj: Partial<MessageWithSizeLimitedMap$mapFieldEntry>): Uint8Array {
      return encodeMessage(obj, MessageWithSizeLimitedMap$mapFieldEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap$mapFieldEntry>): MessageWithSizeLimitedMap$mapFieldEntry {
      return decodeMessage(buf, MessageWithSizeLimitedMap$mapFieldEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MessageWithSizeLimitedMap$mapFieldEntry>): Generator<MessageWithSizeLimitedMap$mapFieldEntryStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MessageWithSizeLimitedMap$mapFieldEntry>): Generator<MessageWithSizeLimitedMap$mapFieldEntryStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, MessageWithSizeLimitedMap$mapFieldEntry.codec(), opts)
    }
  }

  let _codec: Codec<MessageWithSizeLimitedMap, MessageWithSizeLimitedMapStreamEvent, MessageWithSizeLimitedMapStreamCollectionsEvent>

  export const codec = (): Codec<MessageWithSizeLimitedMap, MessageWithSizeLimitedMapStreamEvent, MessageWithSizeLimitedMapStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<MessageWithSizeLimitedMap, MessageWithSizeLimitedMapStreamEvent, MessageWithSizeLimitedMapStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.mapField != null && obj.mapField.size !== 0) {
          for (const [key, value] of obj.mapField.entries()) {
            w.uint32(10)
            MessageWithSizeLimitedMap.MessageWithSizeLimitedMap$mapFieldEntry.codec().encode({ key, value }, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          mapField: new Map<string, string>()
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.mapField != null && obj.mapField.size === opts.limits.mapField) {
                throw new MaxSizeError('Decode error - map field "mapField" had too many elements')
              }

              if (obj.mapField.size === 1) {
                throw new MaxSizeError('Decode error - map field "mapField" had too many elements')
              }

              const entry = MessageWithSizeLimitedMap.MessageWithSizeLimitedMap$mapFieldEntry.codec().decode(reader, reader.uint32())
              obj.mapField.set(entry.key, entry.value)
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
            mapField: new Map<string, string>()
          }
        } else {
          obj = {
            mapField: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.mapField != null && (opts.emitCollections === true ? obj.mapField.size === opts.limits.mapField : obj.mapField === opts.limits.mapField)) {
                throw new MaxSizeError('Decode error - map field "mapField" had too many elements')
              }

              if (opts.emitCollections === true ? obj.mapField.size === 1 : obj.mapField === 1) {
                throw new MaxSizeError('Decode error - map field "mapField" had too many elements')
              }

              const entry = MessageWithSizeLimitedMap.MessageWithSizeLimitedMap$mapFieldEntry.codec().decode(reader, reader.uint32())

              yield {
                field: 'mapField',
                key: entry.key,
                value: entry.value
              }

              if (opts.emitCollections === true) {
                obj.mapField.set(entry.key, entry.value)
              } else {
                obj.mapField++
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

  export interface MessageWithSizeLimitedMapMapFieldFieldEvent {
    field: 'mapField'
    value: Map<string, string>
  }

  export interface MessageWithSizeLimitedMapMapFieldEntryEvent {
    field: 'mapField$entry'
    key: string
    value: string
  }

  export type MessageWithSizeLimitedMapStreamEvent = MessageWithSizeLimitedMapMapFieldEntryEvent
  export type MessageWithSizeLimitedMapStreamCollectionsEvent = MessageWithSizeLimitedMapMapFieldFieldEvent

  export function encode (obj: Partial<MessageWithSizeLimitedMap>): Uint8Array {
    return encodeMessage(obj, MessageWithSizeLimitedMap.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap>): MessageWithSizeLimitedMap {
    return decodeMessage(buf, MessageWithSizeLimitedMap.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MessageWithSizeLimitedMap>): Generator<MessageWithSizeLimitedMapStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MessageWithSizeLimitedMap>): Generator<MessageWithSizeLimitedMapStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, MessageWithSizeLimitedMap.codec(), opts)
  }
}
