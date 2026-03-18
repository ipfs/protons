import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Foo {
  baz?: number
}

export namespace Foo {
  let _codec: Codec<Foo, FooStreamEvent, FooStreamCollectionsEvent>

  export const codec = (): Codec<Foo, FooStreamEvent, FooStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Foo, FooStreamEvent, FooStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.baz != null) {
          w.uint32(8)
          w.uint32(obj.baz)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.baz = reader.uint32()
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
          obj = {}
        } else {
          obj = {}
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'baz',
                value: reader.uint32()
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

  export interface FooBazFieldEvent {
    field: 'baz'
    value: number
  }

  export type FooStreamEvent = FooBazFieldEvent
  export type FooStreamCollectionsEvent = {}

  export function encode (obj: Partial<Foo>): Uint8Array {
    return encodeMessage(obj, Foo.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Foo>): Foo {
    return decodeMessage(buf, Foo.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Foo>): Generator<FooStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Foo>): Generator<FooStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Foo.codec(), opts)
  }
}

export interface Bar {
  tmp?: Foo
}

export namespace Bar {
  let _codec: Codec<Bar, BarStreamEvent, BarStreamCollectionsEvent>

  export const codec = (): Codec<Bar, BarStreamEvent, BarStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Bar, BarStreamEvent, BarStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.tmp != null) {
          w.uint32(10)
          Foo.codec().encode(obj.tmp, w)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.tmp = Foo.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.tmp
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
          obj = {}
        } else {
          obj = {}
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'tmp',
                value: Foo.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.tmp
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

  export interface BarTmpFieldEvent {
    field: 'tmp'
    value: Foo
  }

  export type BarStreamEvent = BarTmpFieldEvent
  export type BarStreamCollectionsEvent = {}

  export function encode (obj: Partial<Bar>): Uint8Array {
    return encodeMessage(obj, Bar.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Bar>): Bar {
    return decodeMessage(buf, Bar.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Bar>): Generator<BarStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Bar>): Generator<BarStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Bar.codec(), opts)
  }
}

export enum FOO {
  NONE = 'NONE',
  LOL = 'LOL',
  ABE = 'ABE'
}

enum __FOOValues {
  NONE = 0,
  LOL = 1,
  ABE = 3
}

export namespace FOO {
  export const codec = (): Codec<FOO, any, any> => {
    return enumeration<FOO>(__FOOValues)
  }
}

export interface Yo {
  lol: FOO[]
}

export namespace Yo {
  let _codec: Codec<Yo, YoStreamEvent, YoStreamCollectionsEvent>

  export const codec = (): Codec<Yo, YoStreamEvent, YoStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Yo, YoStreamEvent, YoStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.lol != null) {
          for (const value of obj.lol) {
            w.uint32(8)
            FOO.codec().encode(value, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          lol: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.lol != null && obj.lol.length === opts.limits.lol) {
                throw new MaxLengthError('Decode error - map field "lol" had too many elements')
              }

              obj.lol.push(FOO.codec().decode(reader))
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
            lol: []
          }
        } else {
          obj = {
            lol: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.lol != null && (opts.emitCollections === true ? obj.lol.length === opts.limits.lol : obj.lol === opts.limits.lol)) {
                throw new MaxLengthError('Decode error - map field "lol" had too many elements')
              }

              const value = FOO.codec().decode(reader)

              yield {
                field: 'lol$value',
                index: opts.emitCollections === true ? obj.lol.length : obj.lol,
                value
              }

              if (opts.emitCollections === true) {
                obj.lol.push(value)
              } else {
                obj.lol++
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

  export interface YoLolFieldEvent {
    field: 'lol'
    value: FOO[]
  }

  export interface YoLolValueEvent {
    field: 'lol$value'
    index: number
    value: FOO
  }

  export type YoStreamEvent = YoLolValueEvent
  export type YoStreamCollectionsEvent = YoLolFieldEvent

  export function encode (obj: Partial<Yo>): Uint8Array {
    return encodeMessage(obj, Yo.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Yo>): Yo {
    return decodeMessage(buf, Yo.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Yo>): Generator<YoStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Yo>): Generator<YoStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Yo.codec(), opts)
  }
}

export interface Lol {
  lol?: string
  b?: Bar
}

export namespace Lol {
  let _codec: Codec<Lol, LolStreamEvent, LolStreamCollectionsEvent>

  export const codec = (): Codec<Lol, LolStreamEvent, LolStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Lol, LolStreamEvent, LolStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.lol != null) {
          w.uint32(10)
          w.string(obj.lol)
        }

        if (obj.b != null) {
          w.uint32(18)
          Bar.codec().encode(obj.b, w)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.lol = reader.string()
              break
            }
            case 2: {
              obj.b = Bar.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.b
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
          obj = {}
        } else {
          obj = {}
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'lol',
                value: reader.string()
              }
              break
            }
            case 2: {
              yield {
                field: 'b',
                value: Bar.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.b
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

  export interface LolLolFieldEvent {
    field: 'lol'
    value: string
  }

  export interface LolBFieldEvent {
    field: 'b'
    value: Bar
  }

  export type LolStreamEvent = LolLolFieldEvent | LolBFieldEvent
  export type LolStreamCollectionsEvent = {}

  export function encode (obj: Partial<Lol>): Uint8Array {
    return encodeMessage(obj, Lol.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Lol>): Lol {
    return decodeMessage(buf, Lol.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Lol>): Generator<LolStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Lol>): Generator<LolStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Lol.codec(), opts)
  }
}

export interface Test {
  meh?: Lol
  hello?: number
  foo?: string
  payload?: Uint8Array
}

export namespace Test {
  let _codec: Codec<Test, TestStreamEvent, TestStreamCollectionsEvent>

  export const codec = (): Codec<Test, TestStreamEvent, TestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Test, TestStreamEvent, TestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.meh != null) {
          w.uint32(50)
          Lol.codec().encode(obj.meh, w)
        }

        if (obj.hello != null) {
          w.uint32(24)
          w.uint32(obj.hello)
        }

        if (obj.foo != null) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if (obj.payload != null) {
          w.uint32(58)
          w.bytes(obj.payload)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 6: {
              obj.meh = Lol.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.meh
              })
              break
            }
            case 3: {
              obj.hello = reader.uint32()
              break
            }
            case 1: {
              obj.foo = reader.string()
              break
            }
            case 7: {
              obj.payload = reader.bytes()
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
          obj = {}
        } else {
          obj = {}
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 6: {
              yield {
                field: 'meh',
                value: Lol.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.meh
                })
              }
              break
            }
            case 3: {
              yield {
                field: 'hello',
                value: reader.uint32()
              }
              break
            }
            case 1: {
              yield {
                field: 'foo',
                value: reader.string()
              }
              break
            }
            case 7: {
              yield {
                field: 'payload',
                value: reader.bytes()
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

  export interface TestMehFieldEvent {
    field: 'meh'
    value: Lol
  }

  export interface TestHelloFieldEvent {
    field: 'hello'
    value: number
  }

  export interface TestFooFieldEvent {
    field: 'foo'
    value: string
  }

  export interface TestPayloadFieldEvent {
    field: 'payload'
    value: Uint8Array
  }

  export type TestStreamEvent = TestMehFieldEvent | TestHelloFieldEvent | TestFooFieldEvent | TestPayloadFieldEvent
  export type TestStreamCollectionsEvent = {}

  export function encode (obj: Partial<Test>): Uint8Array {
    return encodeMessage(obj, Test.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Test>): Test {
    return decodeMessage(buf, Test.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Test>): Generator<TestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Test>): Generator<TestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Test.codec(), opts)
  }
}
