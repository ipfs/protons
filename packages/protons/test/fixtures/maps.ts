/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { type Codec, CodeError, decodeMessage, type DecodeOptions, encodeMessage, message } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface SubMessage {
  foo: string
}

export namespace SubMessage {
  let _codec: Codec<SubMessage>

  export const codec = (): Codec<SubMessage> => {
    if (_codec == null) {
      _codec = message<SubMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.foo != null && obj.foo !== '')) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          foo: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.foo = reader.string()
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

  export const encode = (obj: Partial<SubMessage>): Uint8Array => {
    return encodeMessage(obj, SubMessage.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): SubMessage => {
    return decodeMessage(buf, SubMessage.codec(), opts)
  }
}

export interface MapTypes {
  stringMap: Map<string, string>
  intMap: Map<number, number>
  boolMap: Map<boolean, boolean>
  messageMap: Map<string, SubMessage>
}

export namespace MapTypes {
  export interface MapTypes$stringMapEntry {
    key: string
    value: string
  }

  export namespace MapTypes$stringMapEntry {
    let _codec: Codec<MapTypes$stringMapEntry>

    export const codec = (): Codec<MapTypes$stringMapEntry> => {
      if (_codec == null) {
        _codec = message<MapTypes$stringMapEntry>((obj, w, opts = {}) => {
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

    export const encode = (obj: Partial<MapTypes$stringMapEntry>): Uint8Array => {
      return encodeMessage(obj, MapTypes$stringMapEntry.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$stringMapEntry>): MapTypes$stringMapEntry => {
      return decodeMessage(buf, MapTypes$stringMapEntry.codec(), opts)
    }
  }

  export interface MapTypes$intMapEntry {
    key: number
    value: number
  }

  export namespace MapTypes$intMapEntry {
    let _codec: Codec<MapTypes$intMapEntry>

    export const codec = (): Codec<MapTypes$intMapEntry> => {
      if (_codec == null) {
        _codec = message<MapTypes$intMapEntry>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== 0)) {
            w.uint32(8)
            w.int32(obj.key)
          }

          if ((obj.value != null && obj.value !== 0)) {
            w.uint32(16)
            w.int32(obj.value)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            key: 0,
            value: 0
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = reader.int32()
                break
              }
              case 2: {
                obj.value = reader.int32()
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

    export const encode = (obj: Partial<MapTypes$intMapEntry>): Uint8Array => {
      return encodeMessage(obj, MapTypes$intMapEntry.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$intMapEntry>): MapTypes$intMapEntry => {
      return decodeMessage(buf, MapTypes$intMapEntry.codec(), opts)
    }
  }

  export interface MapTypes$boolMapEntry {
    key: boolean
    value: boolean
  }

  export namespace MapTypes$boolMapEntry {
    let _codec: Codec<MapTypes$boolMapEntry>

    export const codec = (): Codec<MapTypes$boolMapEntry> => {
      if (_codec == null) {
        _codec = message<MapTypes$boolMapEntry>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== false)) {
            w.uint32(8)
            w.bool(obj.key)
          }

          if ((obj.value != null && obj.value !== false)) {
            w.uint32(16)
            w.bool(obj.value)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            key: false,
            value: false
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = reader.bool()
                break
              }
              case 2: {
                obj.value = reader.bool()
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

    export const encode = (obj: Partial<MapTypes$boolMapEntry>): Uint8Array => {
      return encodeMessage(obj, MapTypes$boolMapEntry.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$boolMapEntry>): MapTypes$boolMapEntry => {
      return decodeMessage(buf, MapTypes$boolMapEntry.codec(), opts)
    }
  }

  export interface MapTypes$messageMapEntry {
    key: string
    value?: SubMessage
  }

  export namespace MapTypes$messageMapEntry {
    let _codec: Codec<MapTypes$messageMapEntry>

    export const codec = (): Codec<MapTypes$messageMapEntry> => {
      if (_codec == null) {
        _codec = message<MapTypes$messageMapEntry>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== '')) {
            w.uint32(10)
            w.string(obj.key)
          }

          if (obj.value != null) {
            w.uint32(18)
            SubMessage.codec().encode(obj.value, w)
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
                obj.value = SubMessage.codec().decode(reader, reader.uint32())
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

    export const encode = (obj: Partial<MapTypes$messageMapEntry>): Uint8Array => {
      return encodeMessage(obj, MapTypes$messageMapEntry.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$messageMapEntry>): MapTypes$messageMapEntry => {
      return decodeMessage(buf, MapTypes$messageMapEntry.codec(), opts)
    }
  }

  let _codec: Codec<MapTypes>

  export const codec = (): Codec<MapTypes> => {
    if (_codec == null) {
      _codec = message<MapTypes>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.stringMap != null && obj.stringMap.size !== 0) {
          for (const [key, value] of obj.stringMap.entries()) {
            w.uint32(10)
            MapTypes.MapTypes$stringMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.intMap != null && obj.intMap.size !== 0) {
          for (const [key, value] of obj.intMap.entries()) {
            w.uint32(18)
            MapTypes.MapTypes$intMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.boolMap != null && obj.boolMap.size !== 0) {
          for (const [key, value] of obj.boolMap.entries()) {
            w.uint32(26)
            MapTypes.MapTypes$boolMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.messageMap != null && obj.messageMap.size !== 0) {
          for (const [key, value] of obj.messageMap.entries()) {
            w.uint32(34)
            MapTypes.MapTypes$messageMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          stringMap: new Map<string, string>(),
          intMap: new Map<number, number>(),
          boolMap: new Map<boolean, boolean>(),
          messageMap: new Map<string, undefined>()
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.stringMap != null && obj.stringMap.size === opts.limits.stringMap) {
                throw new CodeError('decode error - map field "stringMap" had too many elements', 'ERR_MAX_SIZE')
              }

              const entry = MapTypes.MapTypes$stringMapEntry.codec().decode(reader, reader.uint32())
              obj.stringMap.set(entry.key, entry.value)
              break
            }
            case 2: {
              if (opts.limits?.intMap != null && obj.intMap.size === opts.limits.intMap) {
                throw new CodeError('decode error - map field "intMap" had too many elements', 'ERR_MAX_SIZE')
              }

              const entry = MapTypes.MapTypes$intMapEntry.codec().decode(reader, reader.uint32())
              obj.intMap.set(entry.key, entry.value)
              break
            }
            case 3: {
              if (opts.limits?.boolMap != null && obj.boolMap.size === opts.limits.boolMap) {
                throw new CodeError('decode error - map field "boolMap" had too many elements', 'ERR_MAX_SIZE')
              }

              const entry = MapTypes.MapTypes$boolMapEntry.codec().decode(reader, reader.uint32())
              obj.boolMap.set(entry.key, entry.value)
              break
            }
            case 4: {
              if (opts.limits?.messageMap != null && obj.messageMap.size === opts.limits.messageMap) {
                throw new CodeError('decode error - map field "messageMap" had too many elements', 'ERR_MAX_SIZE')
              }

              const entry = MapTypes.MapTypes$messageMapEntry.codec().decode(reader, reader.uint32())
              obj.messageMap.set(entry.key, entry.value)
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

  export const encode = (obj: Partial<MapTypes>): Uint8Array => {
    return encodeMessage(obj, MapTypes.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes>): MapTypes => {
    return decodeMessage(buf, MapTypes.codec(), opts)
  }
}
