import { decodeMessage, encodeMessage, MaxLengthError, MaxSizeError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface MessageWithSizeLimitedRepeatedField {
  repeatedField: string[]
}

export namespace MessageWithSizeLimitedRepeatedField {
  let _codec: Codec<MessageWithSizeLimitedRepeatedField>

  export const codec = (): Codec<MessageWithSizeLimitedRepeatedField> => {
    if (_codec == null) {
      _codec = message<MessageWithSizeLimitedRepeatedField>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.repeatedField != null && obj.repeatedField.length > 0) {
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
                throw new MaxLengthError('Decode error - repeated field "repeatedField" had too many elements')
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
      }, function * (reader, length, prefix, opts = {}) {
        const obj = {
          repeatedField: 1
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.repeatedField != null && obj.repeatedField === opts.limits.repeatedField) {
                throw new MaxLengthError('Streaming decode error - repeated field "repeatedField" had too many elements')
              }

              if (obj.repeatedField === 1) {
                throw new MaxLengthError('Streaming decode error - repeated field "repeatedField" had too many elements')
              }

              yield {
                field: `${prefix}.repeatedField[]`,
                index: obj.repeatedField,
                value: reader.string()
              }

              obj.repeatedField++

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

  export interface MessageWithSizeLimitedRepeatedFieldRepeatedFieldFieldEvent {
    field: '$.repeatedField[]'
    index: number
    value: string
  }

  export function encode (obj: Partial<MessageWithSizeLimitedRepeatedField>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithSizeLimitedRepeatedField.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedRepeatedField>): MessageWithSizeLimitedRepeatedField {
    return decodeMessage(buf, MessageWithSizeLimitedRepeatedField.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedRepeatedField>): Generator<MessageWithSizeLimitedRepeatedFieldRepeatedFieldFieldEvent> {
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
    let _codec: Codec<MessageWithSizeLimitedMap$mapFieldEntry>

    export const codec = (): Codec<MessageWithSizeLimitedMap$mapFieldEntry> => {
      if (_codec == null) {
        _codec = message<MessageWithSizeLimitedMap$mapFieldEntry>((obj, w, opts = {}) => {
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

    export interface MessageWithSizeLimitedMap$mapFieldEntryKeyFieldEvent {
      field: '$.key'
      value: string
    }

    export interface MessageWithSizeLimitedMap$mapFieldEntryValueFieldEvent {
      field: '$.value'
      value: string
    }

    export function encode (obj: Partial<MessageWithSizeLimitedMap$mapFieldEntry>): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, MessageWithSizeLimitedMap$mapFieldEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap$mapFieldEntry>): MessageWithSizeLimitedMap$mapFieldEntry {
      return decodeMessage(buf, MessageWithSizeLimitedMap$mapFieldEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap$mapFieldEntry>): Generator<MessageWithSizeLimitedMap$mapFieldEntryKeyFieldEvent | MessageWithSizeLimitedMap$mapFieldEntryValueFieldEvent> {
      return streamMessage(buf, MessageWithSizeLimitedMap$mapFieldEntry.codec(), opts)
    }
  }

  let _codec: Codec<MessageWithSizeLimitedMap>

  export const codec = (): Codec<MessageWithSizeLimitedMap> => {
    if (_codec == null) {
      _codec = message<MessageWithSizeLimitedMap>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.mapField != null && obj.mapField.size > 0) {
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

              const entry = MessageWithSizeLimitedMap.MessageWithSizeLimitedMap$mapFieldEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.mapField$value
                }
              })
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
      }, function * (reader, length, prefix, opts = {}) {
        const obj = {
          mapField: 1
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.mapField != null && obj.mapField === opts.limits.mapField) {
                throw new MaxLengthError('Decode error - map field "mapField" had too many elements')
              }

              if (obj.mapField === 1) {
                throw new MaxLengthError('Decode error - repeated field "mapField" had too many elements')
              }

              yield * MessageWithSizeLimitedMap.MessageWithSizeLimitedMap$mapFieldEntry.codec().stream(reader, reader.uint32(), `${prefix}.mapField{}`, {
                limits: {
                  value: opts.limits?.mapField$value
                }
              })

              obj.mapField++

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

  export interface MessageWithSizeLimitedMapMapFieldFieldEvent {
    field: '$.mapField{}'
    key: string
    value: string
  }

  export function encode (obj: Partial<MessageWithSizeLimitedMap>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithSizeLimitedMap.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap>): MessageWithSizeLimitedMap {
    return decodeMessage(buf, MessageWithSizeLimitedMap.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap>): Generator<MessageWithSizeLimitedMapMapFieldFieldEvent> {
    return streamMessage(buf, MessageWithSizeLimitedMap.codec(), opts)
  }
}
