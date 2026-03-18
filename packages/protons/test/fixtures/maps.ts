/* eslint-disable complexity */

import { decodeMessage, encodeMessage, enumeration, MaxLengthError, MaxSizeError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
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
  export const codec = (): Codec<EnumValue, any, any> => {
    return enumeration<EnumValue>(__EnumValueValues)
  }
}

export interface SubMessage {
  foo: string
  bar: number[]
}

export namespace SubMessage {
  let _codec: Codec<SubMessage, SubMessageStreamEvent, SubMessageStreamCollectionsEvent>

  export const codec = (): Codec<SubMessage, SubMessageStreamEvent, SubMessageStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<SubMessage, SubMessageStreamEvent, SubMessageStreamCollectionsEvent>((obj, w, opts = {}) => {
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
                throw new MaxLengthError('Decode error - map field "bar" had too many elements')
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
      }, function * (reader, length, opts = {}) {
        let obj: any

        if (opts.emitCollections === true) {
          obj = {
            foo: '',
            bar: []
          }
        } else {
          obj = {
            bar: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'foo',
                value: reader.string()
              }
              break
            }
            case 2: {
              if (opts.limits?.bar != null && (opts.emitCollections === true ? obj.bar.length === opts.limits.bar : obj.bar === opts.limits.bar)) {
                throw new MaxLengthError('Decode error - map field "bar" had too many elements')
              }

              const value = reader.uint32()

              yield {
                field: 'bar$value',
                index: opts.emitCollections === true ? obj.bar.length : obj.bar,
                value
              }

              if (opts.emitCollections === true) {
                obj.bar.push(value)
              } else {
                obj.bar++
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

  export interface SubMessageFooFieldEvent {
    field: 'foo'
    value: string
  }

  export interface SubMessageBarFieldEvent {
    field: 'bar'
    value: number[]
  }

  export interface SubMessageBarValueEvent {
    field: 'bar$value'
    index: number
    value: number
  }

  export type SubMessageStreamEvent = SubMessageFooFieldEvent | SubMessageBarValueEvent
  export type SubMessageStreamCollectionsEvent = SubMessageBarFieldEvent

  export function encode (obj: Partial<SubMessage>): Uint8Array {
    return encodeMessage(obj, SubMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): SubMessage {
    return decodeMessage(buf, SubMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<SubMessage>): Generator<SubMessageStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<SubMessage>): Generator<SubMessageStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
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
    let _codec: Codec<MapTypes$stringMapEntry, MapTypes$stringMapEntryStreamEvent, MapTypes$stringMapEntryStreamCollectionsEvent>

    export const codec = (): Codec<MapTypes$stringMapEntry, MapTypes$stringMapEntryStreamEvent, MapTypes$stringMapEntryStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<MapTypes$stringMapEntry, MapTypes$stringMapEntryStreamEvent, MapTypes$stringMapEntryStreamCollectionsEvent>((obj, w, opts = {}) => {
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

    export interface MapTypes$stringMapEntryKeyFieldEvent {
      field: 'key'
      value: string
    }

    export interface MapTypes$stringMapEntryValueFieldEvent {
      field: 'value'
      value: string
    }

    export type MapTypes$stringMapEntryStreamEvent = MapTypes$stringMapEntryKeyFieldEvent | MapTypes$stringMapEntryValueFieldEvent
    export type MapTypes$stringMapEntryStreamCollectionsEvent = {}

    export function encode (obj: Partial<MapTypes$stringMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$stringMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$stringMapEntry>): MapTypes$stringMapEntry {
      return decodeMessage(buf, MapTypes$stringMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MapTypes$stringMapEntry>): Generator<MapTypes$stringMapEntryStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MapTypes$stringMapEntry>): Generator<MapTypes$stringMapEntryStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, MapTypes$stringMapEntry.codec(), opts)
    }
  }

  export interface MapTypes$intMapEntry {
    key: number
    value: number
  }

  export namespace MapTypes$intMapEntry {
    let _codec: Codec<MapTypes$intMapEntry, MapTypes$intMapEntryStreamEvent, MapTypes$intMapEntryStreamCollectionsEvent>

    export const codec = (): Codec<MapTypes$intMapEntry, MapTypes$intMapEntryStreamEvent, MapTypes$intMapEntryStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<MapTypes$intMapEntry, MapTypes$intMapEntryStreamEvent, MapTypes$intMapEntryStreamCollectionsEvent>((obj, w, opts = {}) => {
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
        }, function * (reader, length, opts = {}) {
          let obj: any

          if (opts.emitCollections === true) {
            obj = {
              key: 0,
              value: 0
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
                  value: reader.int32()
                }
                break
              }
              case 2: {
                yield {
                  field: 'value',
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

    export interface MapTypes$intMapEntryKeyFieldEvent {
      field: 'key'
      value: number
    }

    export interface MapTypes$intMapEntryValueFieldEvent {
      field: 'value'
      value: number
    }

    export type MapTypes$intMapEntryStreamEvent = MapTypes$intMapEntryKeyFieldEvent | MapTypes$intMapEntryValueFieldEvent
    export type MapTypes$intMapEntryStreamCollectionsEvent = {}

    export function encode (obj: Partial<MapTypes$intMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$intMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$intMapEntry>): MapTypes$intMapEntry {
      return decodeMessage(buf, MapTypes$intMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MapTypes$intMapEntry>): Generator<MapTypes$intMapEntryStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MapTypes$intMapEntry>): Generator<MapTypes$intMapEntryStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, MapTypes$intMapEntry.codec(), opts)
    }
  }

  export interface MapTypes$boolMapEntry {
    key: boolean
    value: boolean
  }

  export namespace MapTypes$boolMapEntry {
    let _codec: Codec<MapTypes$boolMapEntry, MapTypes$boolMapEntryStreamEvent, MapTypes$boolMapEntryStreamCollectionsEvent>

    export const codec = (): Codec<MapTypes$boolMapEntry, MapTypes$boolMapEntryStreamEvent, MapTypes$boolMapEntryStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<MapTypes$boolMapEntry, MapTypes$boolMapEntryStreamEvent, MapTypes$boolMapEntryStreamCollectionsEvent>((obj, w, opts = {}) => {
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
        }, function * (reader, length, opts = {}) {
          let obj: any

          if (opts.emitCollections === true) {
            obj = {
              key: false,
              value: false
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
                  value: reader.bool()
                }
                break
              }
              case 2: {
                yield {
                  field: 'value',
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

    export interface MapTypes$boolMapEntryKeyFieldEvent {
      field: 'key'
      value: boolean
    }

    export interface MapTypes$boolMapEntryValueFieldEvent {
      field: 'value'
      value: boolean
    }

    export type MapTypes$boolMapEntryStreamEvent = MapTypes$boolMapEntryKeyFieldEvent | MapTypes$boolMapEntryValueFieldEvent
    export type MapTypes$boolMapEntryStreamCollectionsEvent = {}

    export function encode (obj: Partial<MapTypes$boolMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$boolMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$boolMapEntry>): MapTypes$boolMapEntry {
      return decodeMessage(buf, MapTypes$boolMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MapTypes$boolMapEntry>): Generator<MapTypes$boolMapEntryStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MapTypes$boolMapEntry>): Generator<MapTypes$boolMapEntryStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, MapTypes$boolMapEntry.codec(), opts)
    }
  }

  export interface MapTypes$messageMapEntry {
    key: string
    value?: SubMessage
  }

  export namespace MapTypes$messageMapEntry {
    let _codec: Codec<MapTypes$messageMapEntry, MapTypes$messageMapEntryStreamEvent, MapTypes$messageMapEntryStreamCollectionsEvent>

    export const codec = (): Codec<MapTypes$messageMapEntry, MapTypes$messageMapEntryStreamEvent, MapTypes$messageMapEntryStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<MapTypes$messageMapEntry, MapTypes$messageMapEntryStreamEvent, MapTypes$messageMapEntryStreamCollectionsEvent>((obj, w, opts = {}) => {
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
        }, function * (reader, length, opts = {}) {
          let obj: any

          if (opts.emitCollections === true) {
            obj = {
              key: ''
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
                  value: SubMessage.codec().decode(reader, reader.uint32(), {
                    limits: opts.limits?.value
                  })
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

    export interface MapTypes$messageMapEntryKeyFieldEvent {
      field: 'key'
      value: string
    }

    export interface MapTypes$messageMapEntryValueFieldEvent {
      field: 'value'
      value: SubMessage
    }

    export type MapTypes$messageMapEntryStreamEvent = MapTypes$messageMapEntryKeyFieldEvent | MapTypes$messageMapEntryValueFieldEvent
    export type MapTypes$messageMapEntryStreamCollectionsEvent = {}

    export function encode (obj: Partial<MapTypes$messageMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$messageMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$messageMapEntry>): MapTypes$messageMapEntry {
      return decodeMessage(buf, MapTypes$messageMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MapTypes$messageMapEntry>): Generator<MapTypes$messageMapEntryStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MapTypes$messageMapEntry>): Generator<MapTypes$messageMapEntryStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, MapTypes$messageMapEntry.codec(), opts)
    }
  }

  export interface MapTypes$enumMapEntry {
    key: string
    value: EnumValue
  }

  export namespace MapTypes$enumMapEntry {
    let _codec: Codec<MapTypes$enumMapEntry, MapTypes$enumMapEntryStreamEvent, MapTypes$enumMapEntryStreamCollectionsEvent>

    export const codec = (): Codec<MapTypes$enumMapEntry, MapTypes$enumMapEntryStreamEvent, MapTypes$enumMapEntryStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<MapTypes$enumMapEntry, MapTypes$enumMapEntryStreamEvent, MapTypes$enumMapEntryStreamCollectionsEvent>((obj, w, opts = {}) => {
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
        }, function * (reader, length, opts = {}) {
          let obj: any

          if (opts.emitCollections === true) {
            obj = {
              key: '',
              value: EnumValue.NO_VALUE
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

    export interface MapTypes$enumMapEntryKeyFieldEvent {
      field: 'key'
      value: string
    }

    export interface MapTypes$enumMapEntryValueFieldEvent {
      field: 'value'
      value: EnumValue
    }

    export type MapTypes$enumMapEntryStreamEvent = MapTypes$enumMapEntryKeyFieldEvent | MapTypes$enumMapEntryValueFieldEvent
    export type MapTypes$enumMapEntryStreamCollectionsEvent = {}

    export function encode (obj: Partial<MapTypes$enumMapEntry>): Uint8Array {
      return encodeMessage(obj, MapTypes$enumMapEntry.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes$enumMapEntry>): MapTypes$enumMapEntry {
      return decodeMessage(buf, MapTypes$enumMapEntry.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MapTypes$enumMapEntry>): Generator<MapTypes$enumMapEntryStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MapTypes$enumMapEntry>): Generator<MapTypes$enumMapEntryStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, MapTypes$enumMapEntry.codec(), opts)
    }
  }

  let _codec: Codec<MapTypes, MapTypesStreamEvent, MapTypesStreamCollectionsEvent>

  export const codec = (): Codec<MapTypes, MapTypesStreamEvent, MapTypesStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<MapTypes, MapTypesStreamEvent, MapTypesStreamCollectionsEvent>((obj, w, opts = {}) => {
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

        if (obj.enumMap != null && obj.enumMap.size !== 0) {
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
          messageMap: new Map<string, undefined>(),
          enumMap: new Map<string, undefined>()
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.stringMap != null && obj.stringMap.size === opts.limits.stringMap) {
                throw new MaxSizeError('Decode error - map field "stringMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$stringMapEntry.codec().decode(reader, reader.uint32())
              obj.stringMap.set(entry.key, entry.value)
              break
            }
            case 2: {
              if (opts.limits?.intMap != null && obj.intMap.size === opts.limits.intMap) {
                throw new MaxSizeError('Decode error - map field "intMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$intMapEntry.codec().decode(reader, reader.uint32())
              obj.intMap.set(entry.key, entry.value)
              break
            }
            case 3: {
              if (opts.limits?.boolMap != null && obj.boolMap.size === opts.limits.boolMap) {
                throw new MaxSizeError('Decode error - map field "boolMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$boolMapEntry.codec().decode(reader, reader.uint32())
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

              const entry = MapTypes.MapTypes$enumMapEntry.codec().decode(reader, reader.uint32())
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
      }, function * (reader, length, opts = {}) {
        let obj: any

        if (opts.emitCollections === true) {
          obj = {
            stringMap: new Map<string, string>(),
            intMap: new Map<number, number>(),
            boolMap: new Map<boolean, boolean>(),
            messageMap: new Map<string, undefined>(),
            enumMap: new Map<string, undefined>()
          }
        } else {
          obj = {
            stringMap: 0,
            intMap: 0,
            boolMap: 0,
            messageMap: 0,
            enumMap: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.stringMap != null && (opts.emitCollections === true ? obj.stringMap.size === opts.limits.stringMap : obj.stringMap === opts.limits.stringMap)) {
                throw new MaxSizeError('Decode error - map field "stringMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$stringMapEntry.codec().decode(reader, reader.uint32())

              yield {
                field: 'stringMap',
                key: entry.key,
                value: entry.value
              }

              if (opts.emitCollections === true) {
                obj.stringMap.set(entry.key, entry.value)
              } else {
                obj.stringMap++
              }

              break
            }
            case 2: {
              if (opts.limits?.intMap != null && (opts.emitCollections === true ? obj.intMap.size === opts.limits.intMap : obj.intMap === opts.limits.intMap)) {
                throw new MaxSizeError('Decode error - map field "intMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$intMapEntry.codec().decode(reader, reader.uint32())

              yield {
                field: 'intMap',
                key: entry.key,
                value: entry.value
              }

              if (opts.emitCollections === true) {
                obj.intMap.set(entry.key, entry.value)
              } else {
                obj.intMap++
              }

              break
            }
            case 3: {
              if (opts.limits?.boolMap != null && (opts.emitCollections === true ? obj.boolMap.size === opts.limits.boolMap : obj.boolMap === opts.limits.boolMap)) {
                throw new MaxSizeError('Decode error - map field "boolMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$boolMapEntry.codec().decode(reader, reader.uint32())

              yield {
                field: 'boolMap',
                key: entry.key,
                value: entry.value
              }

              if (opts.emitCollections === true) {
                obj.boolMap.set(entry.key, entry.value)
              } else {
                obj.boolMap++
              }

              break
            }
            case 4: {
              if (opts.limits?.messageMap != null && (opts.emitCollections === true ? obj.messageMap.size === opts.limits.messageMap : obj.messageMap === opts.limits.messageMap)) {
                throw new MaxSizeError('Decode error - map field "messageMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$messageMapEntry.codec().decode(reader, reader.uint32(), {
                limits: {
                  value: opts.limits?.messageMap$value
                }
              })

              yield {
                field: 'messageMap',
                key: entry.key,
                value: entry.value
              }

              if (opts.emitCollections === true) {
                obj.messageMap.set(entry.key, entry.value)
              } else {
                obj.messageMap++
              }

              break
            }
            case 5: {
              if (opts.limits?.enumMap != null && (opts.emitCollections === true ? obj.enumMap.size === opts.limits.enumMap : obj.enumMap === opts.limits.enumMap)) {
                throw new MaxSizeError('Decode error - map field "enumMap" had too many elements')
              }

              const entry = MapTypes.MapTypes$enumMapEntry.codec().decode(reader, reader.uint32())

              yield {
                field: 'enumMap',
                key: entry.key,
                value: entry.value
              }

              if (opts.emitCollections === true) {
                obj.enumMap.set(entry.key, entry.value)
              } else {
                obj.enumMap++
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

  export interface MapTypesStringMapFieldEvent {
    field: 'stringMap'
    value: Map<string, string>
  }

  export interface MapTypesStringMapEntryEvent {
    field: 'stringMap$entry'
    key: string
    value: string
  }

  export interface MapTypesIntMapFieldEvent {
    field: 'intMap'
    value: Map<number, number>
  }

  export interface MapTypesIntMapEntryEvent {
    field: 'intMap$entry'
    key: number
    value: number
  }

  export interface MapTypesBoolMapFieldEvent {
    field: 'boolMap'
    value: Map<boolean, boolean>
  }

  export interface MapTypesBoolMapEntryEvent {
    field: 'boolMap$entry'
    key: boolean
    value: boolean
  }

  export interface MapTypesMessageMapFieldEvent {
    field: 'messageMap'
    value: Map<string, SubMessage>
  }

  export interface MapTypesMessageMapEntryEvent {
    field: 'messageMap$entry'
    key: string
    value: SubMessage
  }

  export interface MapTypesEnumMapFieldEvent {
    field: 'enumMap'
    value: Map<string, EnumValue>
  }

  export interface MapTypesEnumMapEntryEvent {
    field: 'enumMap$entry'
    key: string
    value: EnumValue
  }

  export type MapTypesStreamEvent = MapTypesStringMapEntryEvent | MapTypesIntMapEntryEvent | MapTypesBoolMapEntryEvent | MapTypesMessageMapEntryEvent | MapTypesEnumMapEntryEvent
  export type MapTypesStreamCollectionsEvent = MapTypesStringMapFieldEvent | MapTypesIntMapFieldEvent | MapTypesBoolMapFieldEvent | MapTypesMessageMapFieldEvent | MapTypesEnumMapFieldEvent

  export function encode (obj: Partial<MapTypes>): Uint8Array {
    return encodeMessage(obj, MapTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MapTypes>): MapTypes {
    return decodeMessage(buf, MapTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MapTypes>): Generator<MapTypesStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MapTypes>): Generator<MapTypesStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, MapTypes.codec(), opts)
  }
}
