import { decodeMessage, encodeMessage, MaxLengthError, MaxSizeError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface MessageWithSizeLimitedRepeatedField {
  repeatedField: string[]
}

export interface MessageWithSizeLimitedRepeatedFieldInput {
  repeatedField?: string[]
}

export namespace MessageWithSizeLimitedRepeatedField {
  let _codec: Codec<MessageWithSizeLimitedRepeatedField, MessageWithSizeLimitedRepeatedFieldInput>

  export const codec = (): Codec<MessageWithSizeLimitedRepeatedField, MessageWithSizeLimitedRepeatedFieldInput> => {
    if (_codec == null) {
      _codec = message<MessageWithSizeLimitedRepeatedField, MessageWithSizeLimitedRepeatedFieldInput>((obj, w, opts = {}) => {
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
      }, (r, length, opts = {}) => {
        const obj: any = {
          repeatedField: []
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.repeatedField != null && obj.repeatedField.length === opts.limits.repeatedField) {
                throw new MaxLengthError('Decode error - repeated field "repeatedField" had too many elements')
              }

              if (obj.repeatedField.length === 1) {
                throw new MaxLengthError('Decode error - repeated field "repeatedField" had too many elements')
              }

              obj.repeatedField.push(r.string())
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (r, length, prefix, opts = {}) {
        const obj = {
          repeatedField: 1
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MessageWithSizeLimitedRepeatedField'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.repeatedField != null && obj.repeatedField === opts.limits.repeatedField) {
                throw new MaxLengthError('Streaming decode error - repeated field "repeatedField" had too many elements')
              }

              if (obj.repeatedField === 1) {
                throw new MaxLengthError('Streaming decode error - repeated field "repeatedField" had too many elements')
              }

              yield {
                field: `${prefix}repeatedField[]`,
                index: obj.repeatedField,
                value: r.string()
              }

              obj.repeatedField++

              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'MessageWithSizeLimitedRepeatedField'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithSizeLimitedRepeatedFieldRepeatedFieldFieldEvent {
    field: '.repeatedField[]'
    index: number
    value: string
  }

  export function encode (obj: MessageWithSizeLimitedRepeatedFieldInput): Uint8Array<ArrayBuffer> {
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

export interface MessageWithSizeLimitedMapInput {
  mapField?: Map<string, string>
}

export namespace MessageWithSizeLimitedMap {
  export interface MessageWithSizeLimitedMap$mapFieldEntry {
    key: string
    value: string
  }

  export interface MessageWithSizeLimitedMap$mapFieldEntryInput {
    key?: string
    value?: string
  }

  export namespace MessageWithSizeLimitedMap$mapFieldEntry {
    let _codec: Codec<MessageWithSizeLimitedMap$mapFieldEntry, MessageWithSizeLimitedMap$mapFieldEntryInput>

    export const codec = (): Codec<MessageWithSizeLimitedMap$mapFieldEntry, MessageWithSizeLimitedMap$mapFieldEntryInput> => {
      if (_codec == null) {
        _codec = message<MessageWithSizeLimitedMap$mapFieldEntry, MessageWithSizeLimitedMap$mapFieldEntryInput>((obj, w, opts = {}) => {
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
        }, (r, length) => {
          const obj: any = {
            key: '',
            value: ''
          }

          const end = length == null ? r.len : r.pos + length

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = r.string()
                break
              }
              case 2: {
                obj.value = r.string()
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (r, length, prefix) {
          const end = length == null ? r.len : r.pos + length

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'MessageWithSizeLimitedMap.MessageWithSizeLimitedMap$mapFieldEntry'
            }
          }

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}key`,
                  value: r.string()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}value`,
                  value: r.string()
                }
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'end',
              message: 'MessageWithSizeLimitedMap.MessageWithSizeLimitedMap$mapFieldEntry'
            }
          }
        })
      }

      return _codec
    }

    export interface MessageWithSizeLimitedMap$mapFieldEntryKeyFieldEvent {
      field: '.key'
      value: string
    }

    export interface MessageWithSizeLimitedMap$mapFieldEntryValueFieldEvent {
      field: '.value'
      value: string
    }

    export function encode (obj: MessageWithSizeLimitedMap$mapFieldEntryInput): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, MessageWithSizeLimitedMap$mapFieldEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap$mapFieldEntry>): MessageWithSizeLimitedMap$mapFieldEntry {
      return decodeMessage(buf, MessageWithSizeLimitedMap$mapFieldEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap$mapFieldEntry>): Generator<MessageWithSizeLimitedMap$mapFieldEntryKeyFieldEvent | MessageWithSizeLimitedMap$mapFieldEntryValueFieldEvent> {
      return streamMessage(buf, MessageWithSizeLimitedMap$mapFieldEntry.codec(), opts)
    }
  }

  let _codec: Codec<MessageWithSizeLimitedMap, MessageWithSizeLimitedMapInput>

  export const codec = (): Codec<MessageWithSizeLimitedMap, MessageWithSizeLimitedMapInput> => {
    if (_codec == null) {
      _codec = message<MessageWithSizeLimitedMap, MessageWithSizeLimitedMapInput>((obj, w, opts = {}) => {
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
      }, (r, length, opts = {}) => {
        const obj: any = {
          mapField: new Map<string, string>()
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.mapField != null && obj.mapField.size === opts.limits.mapField) {
                throw new MaxSizeError('Decode error - map field "mapField" had too many elements')
              }

              if (obj.mapField.size === 1) {
                throw new MaxSizeError('Decode error - map field "mapField" had too many elements')
              }

              const entry = MessageWithSizeLimitedMap.MessageWithSizeLimitedMap$mapFieldEntry.codec().decode(r, r.uint32(), {
                limits: {
                  value: opts.limits?.mapField$value
                }
              })
              obj.mapField.set(entry.key, entry.value)
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (r, length, prefix, opts = {}) {
        const obj = {
          mapField: 1
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MessageWithSizeLimitedMap'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.mapField != null && obj.mapField === opts.limits.mapField) {
                throw new MaxLengthError('Decode error - map field "mapField" had too many elements')
              }

              if (obj.mapField === 1) {
                throw new MaxLengthError('Decode error - repeated field "mapField" had too many elements')
              }

              yield * MessageWithSizeLimitedMap.MessageWithSizeLimitedMap$mapFieldEntry.codec().stream(r, r.uint32(), `${prefix}mapField{}.`, {
                limits: {
                  value: opts.limits?.mapField$value
                }
              })

              obj.mapField++

              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'MessageWithSizeLimitedMap'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithSizeLimitedMapMapFieldFieldEvent {
    field: '.mapField{}'
    key: string
    value: string
  }

  export function encode (obj: MessageWithSizeLimitedMapInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithSizeLimitedMap.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap>): MessageWithSizeLimitedMap {
    return decodeMessage(buf, MessageWithSizeLimitedMap.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap>): Generator<MessageWithSizeLimitedMapMapFieldFieldEvent> {
    return streamMessage(buf, MessageWithSizeLimitedMap.codec(), opts)
  }
}
