import { decodeMessage, encodeMessage, enumeration, MaxLengthError, MaxSizeError, message, reader, streamMessage } from 'protons-runtime'
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
  export const codec = (): Codec<EnumValue, EnumValue> => {
    return enumeration<EnumValue>(__EnumValueValues)
  }
}

export interface SubMessage {
  foo: string
  bar: number[]
}

export interface SubMessageInput {
  foo?: string
  bar?: number[]
}

export namespace SubMessage {
  let _codec: Codec<SubMessage, SubMessageInput>

  export const codec = (): Codec<SubMessage, SubMessageInput> => {
    if (_codec == null) {
      _codec = message<SubMessage, SubMessageInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.foo != null && obj.foo !== '')) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if (obj.bar != null && obj.bar.length > 0) {
          w.uint32(18)
          w.fork()

          for (const value of obj.bar) {
            w.uint32(value)
          }

          w.ldelim()
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          foo: '',
          bar: []
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.foo = r.string()
              break
            }
            case 2: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.bar != null && obj.bar.length === opts.limits.bar) {
                  throw new MaxLengthError('Decode error - repeated field "bar" had too many elements')
                }

                obj.bar.push(r2.uint32())
              }

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
          bar: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'SubMessage'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}foo`,
                value: r.string()
              }
              break
            }
            case 2: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.bar != null && obj.bar === opts.limits.bar) {
                  throw new MaxLengthError('Streaming decode error - repeated field "bar" had too many elements')
                }

                yield {
                  field: `${prefix}bar[]`,
                  index: obj.bar,
                  value: r2.uint32()
                }

                obj.bar++
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
            message: 'SubMessage'
          }
        }
      })
    }

    return _codec
  }

  export interface SubMessageFooFieldEvent {
    field: '.foo'
    value: string
  }

  export interface SubMessageBarFieldEvent {
    field: '.bar[]'
    index: number
    value: number
  }

  export function encode (obj: SubMessageInput): Uint8Array<ArrayBuffer> {
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

export interface MapTypesInput {
  stringMap?: Map<string, string>
  intMap?: Map<number, number>
  boolMap?: Map<boolean, boolean>
  messageMap?: Map<string, SubMessageInput>
  enumMap?: Map<string, EnumValue>
}

export namespace MapTypes {
  export interface MapTypes$stringMapEntry {
    key: string
    value: string
  }

  export interface MapTypes$stringMapEntryInput {
    key?: string
    value?: string
  }

  export namespace MapTypes$stringMapEntry {
    let _codec: Codec<MapTypes$stringMapEntry, MapTypes$stringMapEntryInput>

    export const codec = (): Codec<MapTypes$stringMapEntry, MapTypes$stringMapEntryInput> => {
      if (_codec == null) {
        _codec = message<MapTypes$stringMapEntry, MapTypes$stringMapEntryInput>((obj, w, opts = {}) => {
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
              message: 'MapTypes.MapTypes$stringMapEntry'
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
              message: 'MapTypes.MapTypes$stringMapEntry'
            }
          }
        })
      }

      return _codec
    }

    export interface MapTypes$stringMapEntryKeyFieldEvent {
      field: '.key'
      value: string
    }

    export interface MapTypes$stringMapEntryValueFieldEvent {
      field: '.value'
      value: string
    }

    export function encode (obj: MapTypes$stringMapEntryInput): Uint8Array<ArrayBuffer> {
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

  export interface MapTypes$intMapEntryInput {
    key?: number
    value?: number
  }

  export namespace MapTypes$intMapEntry {
    let _codec: Codec<MapTypes$intMapEntry, MapTypes$intMapEntryInput>

    export const codec = (): Codec<MapTypes$intMapEntry, MapTypes$intMapEntryInput> => {
      if (_codec == null) {
        _codec = message<MapTypes$intMapEntry, MapTypes$intMapEntryInput>((obj, w, opts = {}) => {
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
        }, (r, length) => {
          const obj: any = {
            key: 0,
            value: 0
          }

          const end = length == null ? r.len : r.pos + length

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = r.int32()
                break
              }
              case 2: {
                obj.value = r.int32()
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
              message: 'MapTypes.MapTypes$intMapEntry'
            }
          }

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}key`,
                  value: r.int32()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}value`,
                  value: r.int32()
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
              message: 'MapTypes.MapTypes$intMapEntry'
            }
          }
        })
      }

      return _codec
    }

    export interface MapTypes$intMapEntryKeyFieldEvent {
      field: '.key'
      value: number
    }

    export interface MapTypes$intMapEntryValueFieldEvent {
      field: '.value'
      value: number
    }

    export function encode (obj: MapTypes$intMapEntryInput): Uint8Array<ArrayBuffer> {
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

  export interface MapTypes$boolMapEntryInput {
    key?: boolean
    value?: boolean
  }

  export namespace MapTypes$boolMapEntry {
    let _codec: Codec<MapTypes$boolMapEntry, MapTypes$boolMapEntryInput>

    export const codec = (): Codec<MapTypes$boolMapEntry, MapTypes$boolMapEntryInput> => {
      if (_codec == null) {
        _codec = message<MapTypes$boolMapEntry, MapTypes$boolMapEntryInput>((obj, w, opts = {}) => {
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
        }, (r, length) => {
          const obj: any = {
            key: false,
            value: false
          }

          const end = length == null ? r.len : r.pos + length

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.key = r.bool()
                break
              }
              case 2: {
                obj.value = r.bool()
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
              message: 'MapTypes.MapTypes$boolMapEntry'
            }
          }

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}key`,
                  value: r.bool()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}value`,
                  value: r.bool()
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
              message: 'MapTypes.MapTypes$boolMapEntry'
            }
          }
        })
      }

      return _codec
    }

    export interface MapTypes$boolMapEntryKeyFieldEvent {
      field: '.key'
      value: boolean
    }

    export interface MapTypes$boolMapEntryValueFieldEvent {
      field: '.value'
      value: boolean
    }

    export function encode (obj: MapTypes$boolMapEntryInput): Uint8Array<ArrayBuffer> {
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

  export interface MapTypes$messageMapEntryInput {
    key?: string
    value?: SubMessageInput
  }

  export namespace MapTypes$messageMapEntry {
    let _codec: Codec<MapTypes$messageMapEntry, MapTypes$messageMapEntryInput>

    export const codec = (): Codec<MapTypes$messageMapEntry, MapTypes$messageMapEntryInput> => {
      if (_codec == null) {
        _codec = message<MapTypes$messageMapEntry, MapTypes$messageMapEntryInput>((obj, w, opts = {}) => {
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
        }, (r, length, opts = {}) => {
          const obj: any = {
            key: ''
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
                obj.value = SubMessage.codec().decode(r, r.uint32(), {
                  limits: opts.limits?.value
                })
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
          const end = length == null ? r.len : r.pos + length

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'MapTypes.MapTypes$messageMapEntry'
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
                yield * SubMessage.codec().stream(r, r.uint32(), `${prefix}value.`, {
                  limits: opts.limits?.value
                })

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
              message: 'MapTypes.MapTypes$messageMapEntry'
            }
          }
        })
      }

      return _codec
    }

    export interface MapTypes$messageMapEntryKeyFieldEvent {
      field: '.key'
      value: string
    }

    export interface MapTypes$messageMapEntryValueMessageStart {
      field: '.value'
      type: 'start'
    }

    export interface MapTypes$messageMapEntryValueMessageEnd {
      field: '.value'
      type: 'end'
    }

    export interface MapTypes$messageMapEntryValueFooFieldEvent {
      field: '.value.foo'
      value: string
    }

    export interface MapTypes$messageMapEntryValueBarFieldEvent {
      field: '.value.bar[]'
      index: number
      value: number
    }

    export function encode (obj: MapTypes$messageMapEntryInput): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, MapTypes$messageMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$messageMapEntry>): MapTypes$messageMapEntry {
      return decodeMessage(buf, MapTypes$messageMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$messageMapEntry>): Generator<MapTypes$messageMapEntryKeyFieldEvent | MapTypes$messageMapEntryValueMessageStart | MapTypes$messageMapEntryValueMessageEnd | MapTypes$messageMapEntryValueFooFieldEvent | MapTypes$messageMapEntryValueBarFieldEvent> {
      return streamMessage(buf, MapTypes$messageMapEntry.codec(), opts)
    }
  }

  export interface MapTypes$enumMapEntry {
    key: string
    value: EnumValue
  }

  export interface MapTypes$enumMapEntryInput {
    key?: string
    value?: EnumValue
  }

  export namespace MapTypes$enumMapEntry {
    let _codec: Codec<MapTypes$enumMapEntry, MapTypes$enumMapEntryInput>

    export const codec = (): Codec<MapTypes$enumMapEntry, MapTypes$enumMapEntryInput> => {
      if (_codec == null) {
        _codec = message<MapTypes$enumMapEntry, MapTypes$enumMapEntryInput>((obj, w, opts = {}) => {
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
        }, (r, length) => {
          const obj: any = {
            key: '',
            value: EnumValue.NO_VALUE
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
                obj.value = EnumValue.codec().decode(r)
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
              message: 'MapTypes.MapTypes$enumMapEntry'
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
                  value: EnumValue.codec().decode(r)
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
              message: 'MapTypes.MapTypes$enumMapEntry'
            }
          }
        })
      }

      return _codec
    }

    export interface MapTypes$enumMapEntryKeyFieldEvent {
      field: '.key'
      value: string
    }

    export interface MapTypes$enumMapEntryValueFieldEvent {
      field: '.value'
      value: EnumValue
    }

    export function encode (obj: MapTypes$enumMapEntryInput): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, MapTypes$enumMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$enumMapEntry>): MapTypes$enumMapEntry {
      return decodeMessage(buf, MapTypes$enumMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$enumMapEntry>): Generator<MapTypes$enumMapEntryKeyFieldEvent | MapTypes$enumMapEntryValueFieldEvent> {
      return streamMessage(buf, MapTypes$enumMapEntry.codec(), opts)
    }
  }

  let _codec: Codec<MapTypes, MapTypesInput>

  export const codec = (): Codec<MapTypes, MapTypesInput> => {
    if (_codec == null) {
      _codec = message<MapTypes, MapTypesInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.stringMap != null && obj.stringMap.size > 0) {
          for (const [key, value] of obj.stringMap.entries()) {
            w.uint32(10)
            MapTypes.MapTypes$stringMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.intMap != null && obj.intMap.size > 0) {
          for (const [key, value] of obj.intMap.entries()) {
            w.uint32(18)
            MapTypes.MapTypes$intMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.boolMap != null && obj.boolMap.size > 0) {
          for (const [key, value] of obj.boolMap.entries()) {
            w.uint32(26)
            MapTypes.MapTypes$boolMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.messageMap != null && obj.messageMap.size > 0) {
          for (const [key, value] of obj.messageMap.entries()) {
            w.uint32(34)
            MapTypes.MapTypes$messageMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (obj.enumMap != null && obj.enumMap.size > 0) {
          for (const [key, value] of obj.enumMap.entries()) {
            w.uint32(42)
            MapTypes.MapTypes$enumMapEntry.codec().encode({ key, value }, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          stringMap: new Map<string, string>(),
          intMap: new Map<number, number>(),
          boolMap: new Map<boolean, boolean>(),
          messageMap: new Map<string, SubMessage>(),
          enumMap: new Map<string, EnumValue>()
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.stringMap != null && obj.stringMap.size === opts.limits.stringMap) {
                throw new MaxSizeError('Decode error - map field "stringMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$stringMapEntry.codec().decode(r, r.uint32(), {
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

              const entry = MapTypes.MapTypes$intMapEntry.codec().decode(r, r.uint32(), {
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

              const entry = MapTypes.MapTypes$boolMapEntry.codec().decode(r, r.uint32(), {
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

              const entry = MapTypes.MapTypes$messageMapEntry.codec().decode(r, r.uint32(), {
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

              const entry = MapTypes.MapTypes$enumMapEntry.codec().decode(r, r.uint32(), {
                limits: {
                  value: opts.limits?.enumMap$value
                }
              })
              obj.enumMap.set(entry.key, entry.value)
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
          stringMap: 0,
          intMap: 0,
          boolMap: 0,
          messageMap: 0,
          enumMap: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'MapTypes'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.stringMap != null && obj.stringMap === opts.limits.stringMap) {
                throw new MaxLengthError('Decode error - map field "stringMap" had too many elements')
              }

              yield * MapTypes.MapTypes$stringMapEntry.codec().stream(r, r.uint32(), `${prefix}stringMap{}.`, {
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

              yield * MapTypes.MapTypes$intMapEntry.codec().stream(r, r.uint32(), `${prefix}intMap{}.`, {
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

              yield * MapTypes.MapTypes$boolMapEntry.codec().stream(r, r.uint32(), `${prefix}boolMap{}.`, {
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

              yield * MapTypes.MapTypes$messageMapEntry.codec().stream(r, r.uint32(), `${prefix}messageMap{}.`, {
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

              yield * MapTypes.MapTypes$enumMapEntry.codec().stream(r, r.uint32(), `${prefix}enumMap{}.`, {
                limits: {
                  value: opts.limits?.enumMap$value
                }
              })

              obj.enumMap++

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
            message: 'MapTypes'
          }
        }
      })
    }

    return _codec
  }

  export interface MapTypesStringMapFieldEvent {
    field: '.stringMap{}'
    key: string
    value: string
  }

  export interface MapTypesIntMapFieldEvent {
    field: '.intMap{}'
    key: number
    value: number
  }

  export interface MapTypesBoolMapFieldEvent {
    field: '.boolMap{}'
    key: boolean
    value: boolean
  }

  export interface MapTypesMessageMapFooFieldEvent {
    field: '.messageMap{}.foo'
    value: SubMessage
    key: string
  }

  export interface MapTypesMessageMapBarFieldEvent {
    field: '.messageMap{}.bar[]'
    index: number
    value: SubMessage
    key: string
  }

  export interface MapTypesMessageMapMessageStartEvent {
    field: '.messageMap{}'
    key: string
    type: 'start'
    message: string
  }

  export interface MapTypesMessageMapMessageEndEvent {
    field: '.messageMap{}'
    key: string
    type: 'end'
    message: string
  }

  export interface MapTypesEnumMapFieldEvent {
    field: '.enumMap{}'
    key: string
    value: EnumValue
  }

  export function encode (obj: MapTypesInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MapTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes>): MapTypes {
    return decodeMessage(buf, MapTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes>): Generator<MapTypesStringMapFieldEvent | MapTypesIntMapFieldEvent | MapTypesBoolMapFieldEvent | MapTypesMessageMapFooFieldEvent | MapTypesMessageMapBarFieldEvent | MapTypesMessageMapMessageStartEvent | MapTypesMessageMapMessageEndEvent | MapTypesEnumMapFieldEvent> {
    return streamMessage(buf, MapTypes.codec(), opts)
  }
}
