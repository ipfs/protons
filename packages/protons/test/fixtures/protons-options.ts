/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/consistent-type-specifier-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { decodeMessage, encodeMessage, MaxLengthError, MaxSizeError, message } from 'protons-runtime'
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
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<MessageWithSizeLimitedRepeatedField>): Uint8Array => {
    return encodeMessage(obj, MessageWithSizeLimitedRepeatedField.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedRepeatedField>): MessageWithSizeLimitedRepeatedField => {
    return decodeMessage(buf, MessageWithSizeLimitedRepeatedField.codec(), opts)
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
        })
      }

      return _codec
    }

    export const encode = (obj: Partial<MessageWithSizeLimitedMap$mapFieldEntry>): Uint8Array => {
      return encodeMessage(obj, MessageWithSizeLimitedMap$mapFieldEntry.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap$mapFieldEntry>): MessageWithSizeLimitedMap$mapFieldEntry => {
      return decodeMessage(buf, MessageWithSizeLimitedMap$mapFieldEntry.codec(), opts)
    }
  }

  let _codec: Codec<MessageWithSizeLimitedMap>

  export const codec = (): Codec<MessageWithSizeLimitedMap> => {
    if (_codec == null) {
      _codec = message<MessageWithSizeLimitedMap>((obj, w, opts = {}) => {
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
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<MessageWithSizeLimitedMap>): Uint8Array => {
    return encodeMessage(obj, MessageWithSizeLimitedMap.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithSizeLimitedMap>): MessageWithSizeLimitedMap => {
    return decodeMessage(buf, MessageWithSizeLimitedMap.codec(), opts)
  }
}
