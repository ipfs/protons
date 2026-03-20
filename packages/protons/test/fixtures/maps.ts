import { decodeMessage, encodeMessage, enumeration, MaxLengthError, MaxSizeError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export enum EnumValue {
  NO_VALUE = 'NO_VALUE',
  VALUE_1 = 'VALUE_1',
  VALUE_2 = 'VALUE_2'
}

enum __EnumValueValues {
  NO_VALUE = 0,
  VALUE_1 = 1,
  VALUE_2 = 2
}

export namespace EnumValue {
  export const codec = (): Codec<EnumValue> => {
    return enumeration<EnumValue>(__EnumValueValues)
  }
}

export interface SubMessage {
  foo: string
  bar: number[]
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

        if (obj.bar != null) {
          for (const value of obj.bar) {
            w.uint32(16)
            w.uint32(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          foo: '',
          bar: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.foo = reader.string()
              break
            }
            case 2: {
              if (opts.limits?.bar != null && obj.bar.length === opts.limits.bar) {
                throw new MaxLengthError('Decode error - repeated field "bar" had too many elements')
              }

              obj.bar.push(reader.uint32())
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
          bar: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix != null ? `${prefix}.` : ''}foo`,
                value: reader.string()
              }
              break
            }
            case 2: {
              if (opts.limits?.bar != null && obj.bar === opts.limits.bar) {
                throw new MaxLengthError('Streaming decode error - repeated field "bar" had too many elements')
              }

              yield {
                field: `${prefix != null ? `${prefix}.` : ''}bar`,
                index: obj.bar,
                value: reader.uint32()
              }

              obj.bar++

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
    field: 'foo'
    value: string
  }

  export interface SubMessageBarFieldEvent {
    field: 'bar$entry'
    index: number
    value: number
  }

  export function encode (obj: Partial<SubMessage>): Uint8Array {
    return encodeMessage(obj, SubMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): SubMessage {
    return decodeMessage(buf, SubMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): Generator<SubMessageFooFieldEvent | SubMessageBarFieldEvent> {
    return streamMessage(buf, SubMessage.codec(), opts)
  }
}

export interface MapTypes {
  stringMap: Map<string, string>
  intMap: Map<number, number>
  boolMap: Map<boolean, boolean>
  messageMap: Map<string, SubMessage>
  enumMap: Map<string, EnumValue>
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
        }, function * (reader, length, prefix, opts = {}) {
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix != null ? `${prefix}.` : ''}key`,
                  value: reader.string()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix != null ? `${prefix}.` : ''}value`,
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

    export interface MapTypes$stringMapEntryKeyFieldEvent {
      field: 'key'
      value: string
    }

    export interface MapTypes$stringMapEntryValueFieldEvent {
      field: 'value'
      value: string
    }

    export function encode (obj: Partial<MapTypes$stringMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$stringMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$stringMapEntry>): MapTypes$stringMapEntry {
      return decodeMessage(buf, MapTypes$stringMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$stringMapEntry>): Generator<MapTypes$stringMapEntryKeyFieldEvent | MapTypes$stringMapEntryValueFieldEvent> {
      return streamMessage(buf, MapTypes$stringMapEntry.codec(), opts)
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
        }, function * (reader, length, prefix, opts = {}) {
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix != null ? `${prefix}.` : ''}key`,
                  value: reader.int32()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix != null ? `${prefix}.` : ''}value`,
                  value: reader.int32()
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

    export interface MapTypes$intMapEntryKeyFieldEvent {
      field: 'key'
      value: number
    }

    export interface MapTypes$intMapEntryValueFieldEvent {
      field: 'value'
      value: number
    }

    export function encode (obj: Partial<MapTypes$intMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$intMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$intMapEntry>): MapTypes$intMapEntry {
      return decodeMessage(buf, MapTypes$intMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$intMapEntry>): Generator<MapTypes$intMapEntryKeyFieldEvent | MapTypes$intMapEntryValueFieldEvent> {
      return streamMessage(buf, MapTypes$intMapEntry.codec(), opts)
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
        }, function * (reader, length, prefix, opts = {}) {
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix != null ? `${prefix}.` : ''}key`,
                  value: reader.bool()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix != null ? `${prefix}.` : ''}value`,
                  value: reader.bool()
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

    export interface MapTypes$boolMapEntryKeyFieldEvent {
      field: 'key'
      value: boolean
    }

    export interface MapTypes$boolMapEntryValueFieldEvent {
      field: 'value'
      value: boolean
    }

    export function encode (obj: Partial<MapTypes$boolMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$boolMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$boolMapEntry>): MapTypes$boolMapEntry {
      return decodeMessage(buf, MapTypes$boolMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$boolMapEntry>): Generator<MapTypes$boolMapEntryKeyFieldEvent | MapTypes$boolMapEntryValueFieldEvent> {
      return streamMessage(buf, MapTypes$boolMapEntry.codec(), opts)
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
                obj.value = SubMessage.codec().decode(reader, reader.uint32(), {
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
                  field: `${prefix != null ? `${prefix}.` : ''}key`,
                  value: reader.string()
                }
                break
              }
              case 2: {
                yield * SubMessage.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}.` : ''}value`, {
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

    export interface MapTypes$messageMapEntryKeyFieldEvent {
      field: 'key'
      value: string
    }

    export interface MapTypes$messageMapEntryValueSubMessageFooFieldEvent {
      field: 'foo'
      value: string
    }

    export interface MapTypes$messageMapEntryValueSubMessageBarFieldEvent {
      field: 'bar$entry'
      index: number
      value: number
    }

    export function encode (obj: Partial<MapTypes$messageMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$messageMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$messageMapEntry>): MapTypes$messageMapEntry {
      return decodeMessage(buf, MapTypes$messageMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$messageMapEntry>): Generator<MapTypes$messageMapEntryKeyFieldEvent | MapTypes$messageMapEntryValueSubMessageFooFieldEvent | MapTypes$messageMapEntryValueSubMessageBarFieldEvent> {
      return streamMessage(buf, MapTypes$messageMapEntry.codec(), opts)
    }
  }

  export interface MapTypes$enumMapEntry {
    key: string
    value: EnumValue
  }

  export namespace MapTypes$enumMapEntry {
    let _codec: Codec<MapTypes$enumMapEntry>

    export const codec = (): Codec<MapTypes$enumMapEntry> => {
      if (_codec == null) {
        _codec = message<MapTypes$enumMapEntry>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.key != null && obj.key !== '')) {
            w.uint32(10)
            w.string(obj.key)
          }

          if (obj.value != null && __EnumValueValues[obj.value] !== 0) {
            w.uint32(16)
            EnumValue.codec().encode(obj.value, w)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            key: '',
            value: EnumValue.NO_VALUE
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
                obj.value = EnumValue.codec().decode(reader)
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
                  field: `${prefix != null ? `${prefix}.` : ''}key`,
                  value: reader.string()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix != null ? `${prefix}.` : ''}value`,
                  value: EnumValue.codec().decode(reader)
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

    export interface MapTypes$enumMapEntryKeyFieldEvent {
      field: 'key'
      value: string
    }

    export interface MapTypes$enumMapEntryValueFieldEvent {
      field: 'value'
      value: EnumValue
    }

    export function encode (obj: Partial<MapTypes$enumMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$enumMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$enumMapEntry>): MapTypes$enumMapEntry {
      return decodeMessage(buf, MapTypes$enumMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$enumMapEntry>): Generator<MapTypes$enumMapEntryKeyFieldEvent | MapTypes$enumMapEntryValueFieldEvent> {
      return streamMessage(buf, MapTypes$enumMapEntry.codec(), opts)
    }
  }

  let _codec: Codec<MapTypes>

  export const codec = (): Codec<MapTypes> => {
    if (_codec == null) {
      _codec = message<MapTypes>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.stringMap != null) {
          for (const [key, value] of obj.stringMap.entries()) {
            w.uint32(10)
            MapTypes.MapTypes$stringMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.intMap != null) {
          for (const [key, value] of obj.intMap.entries()) {
            w.uint32(18)
            MapTypes.MapTypes$intMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.boolMap != null) {
          for (const [key, value] of obj.boolMap.entries()) {
            w.uint32(26)
            MapTypes.MapTypes$boolMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.messageMap != null) {
          for (const [key, value] of obj.messageMap.entries()) {
            w.uint32(34)
            MapTypes.MapTypes$messageMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.enumMap != null) {
          for (const [key, value] of obj.enumMap.entries()) {
            w.uint32(42)
            MapTypes.MapTypes$enumMapEntry.codec().encode({ key, value }, w)
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
          messageMap: new Map<string, SubMessage>(),
          enumMap: new Map<string, EnumValue>()
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.stringMap != null && obj.stringMap.size === opts.limits.stringMap) {
                throw new MaxSizeError('Decode error - map field "stringMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$stringMapEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.stringMap$value
                }
              })
              obj.stringMap.set(entry.key, entry.value)
              break
            }
            case 2: {
              if (opts.limits?.intMap != null && obj.intMap.size === opts.limits.intMap) {
                throw new MaxSizeError('Decode error - map field "intMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$intMapEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.intMap$value
                }
              })
              obj.intMap.set(entry.key, entry.value)
              break
            }
            case 3: {
              if (opts.limits?.boolMap != null && obj.boolMap.size === opts.limits.boolMap) {
                throw new MaxSizeError('Decode error - map field "boolMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$boolMapEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.boolMap$value
                }
              })
              obj.boolMap.set(entry.key, entry.value)
              break
            }
            case 4: {
              if (opts.limits?.messageMap != null && obj.messageMap.size === opts.limits.messageMap) {
                throw new MaxSizeError('Decode error - map field "messageMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$messageMapEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.messageMap$value
                }
              })
              obj.messageMap.set(entry.key, entry.value)
              break
            }
            case 5: {
              if (opts.limits?.enumMap != null && obj.enumMap.size === opts.limits.enumMap) {
                throw new MaxSizeError('Decode error - map field "enumMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$enumMapEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.enumMap$value
                }
              })
              obj.enumMap.set(entry.key, entry.value)
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
          stringMap: 0,
          intMap: 0,
          boolMap: 0,
          messageMap: 0,
          enumMap: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.stringMap != null && obj.stringMap === opts.limits.stringMap) {
                throw new MaxLengthError('Decode error - map field "stringMap" had too many elements')
              }

              yield * MapTypes.MapTypes$stringMapEntry.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}.` : ''}stringMap`, {
                limits: {
                  value: opts.limits?.stringMap$value
                }
              })

              obj.stringMap++

              break
            }
            case 2: {
              if (opts.limits?.intMap != null && obj.intMap === opts.limits.intMap) {
                throw new MaxLengthError('Decode error - map field "intMap" had too many elements')
              }

              yield * MapTypes.MapTypes$intMapEntry.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}.` : ''}intMap`, {
                limits: {
                  value: opts.limits?.intMap$value
                }
              })

              obj.intMap++

              break
            }
            case 3: {
              if (opts.limits?.boolMap != null && obj.boolMap === opts.limits.boolMap) {
                throw new MaxLengthError('Decode error - map field "boolMap" had too many elements')
              }

              yield * MapTypes.MapTypes$boolMapEntry.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}.` : ''}boolMap`, {
                limits: {
                  value: opts.limits?.boolMap$value
                }
              })

              obj.boolMap++

              break
            }
            case 4: {
              if (opts.limits?.messageMap != null && obj.messageMap === opts.limits.messageMap) {
                throw new MaxLengthError('Decode error - map field "messageMap" had too many elements')
              }

              yield * MapTypes.MapTypes$messageMapEntry.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}.` : ''}messageMap`, {
                limits: {
                  value: opts.limits?.messageMap$value
                }
              })

              obj.messageMap++

              break
            }
            case 5: {
              if (opts.limits?.enumMap != null && obj.enumMap === opts.limits.enumMap) {
                throw new MaxLengthError('Decode error - map field "enumMap" had too many elements')
              }

              yield * MapTypes.MapTypes$enumMapEntry.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}.` : ''}enumMap`, {
                limits: {
                  value: opts.limits?.enumMap$value
                }
              })

              obj.enumMap++

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

  export interface MapTypesStringMapFieldEvent {
    field: 'stringMap$entry'
    key: string
    value: string
  }

  export interface MapTypesIntMapFieldEvent {
    field: 'intMap$entry'
    key: number
    value: number
  }

  export interface MapTypesBoolMapFieldEvent {
    field: 'boolMap$entry'
    key: boolean
    value: boolean
  }

  export function encode (obj: Partial<MapTypes>): Uint8Array {
    return encodeMessage(obj, MapTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes>): MapTypes {
    return decodeMessage(buf, MapTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes>): Generator<MapTypesStringMapFieldEvent | MapTypesIntMapFieldEvent | MapTypesBoolMapFieldEvent> {
    return streamMessage(buf, MapTypes.codec(), opts)
  }
}
