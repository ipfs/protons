import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Foo {
  baz?: number
}

export interface FooInput {
  baz?: number
}

export namespace Foo {
  let _codec: Codec<Foo, FooInput>

  export const codec = (): Codec<Foo, FooInput> => {
    if (_codec == null) {
      _codec = message<Foo, FooInput>((obj, w, opts = {}) => {
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
      }, (r, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.baz = r.uint32()
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
            message: 'Foo'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}baz`,
                value: r.uint32()
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
            message: 'Foo'
          }
        }
      })
    }

    return _codec
  }

  export interface FooBazFieldEvent {
    field: '.baz'
    value: number
  }

  export function encode (obj: FooInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Foo.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Foo>): Foo {
    return decodeMessage(buf, Foo.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Foo>): Generator<FooBazFieldEvent> {
    return streamMessage(buf, Foo.codec(), opts)
  }
}

export interface Bar {
  tmp?: Foo
}

export interface BarInput {
  tmp?: FooInput
}

export namespace Bar {
  let _codec: Codec<Bar, BarInput>

  export const codec = (): Codec<Bar, BarInput> => {
    if (_codec == null) {
      _codec = message<Bar, BarInput>((obj, w, opts = {}) => {
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
      }, (r, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.tmp = Foo.codec().decode(r, r.uint32(), {
                limits: opts.limits?.tmp
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
            message: 'Bar'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield * Foo.codec().stream(r, r.uint32(), `${prefix}tmp.`, {
                limits: opts.limits?.tmp
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
            message: 'Bar'
          }
        }
      })
    }

    return _codec
  }

  export interface BarTmpMessageStart {
    field: '.tmp'
    type: 'start'
  }

  export interface BarTmpMessageEnd {
    field: '.tmp'
    type: 'end'
  }

  export interface BarTmpBazFieldEvent {
    field: '.tmp.baz'
    value: number
  }

  export function encode (obj: BarInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Bar.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Bar>): Bar {
    return decodeMessage(buf, Bar.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Bar>): Generator<BarTmpMessageStart | BarTmpMessageEnd | BarTmpBazFieldEvent> {
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
  export const codec = (): Codec<FOO, FOO> => {
    return enumeration<FOO>(__FOOValues)
  }
}

export interface Yo {
  lol: FOO[]
}

export interface YoInput {
  lol?: FOO[]
}

export namespace Yo {
  let _codec: Codec<Yo, YoInput>

  export const codec = (): Codec<Yo, YoInput> => {
    if (_codec == null) {
      _codec = message<Yo, YoInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.lol != null && obj.lol.length > 0) {
          for (const value of obj.lol) {
            w.uint32(8)
            FOO.codec().encode(value, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          lol: []
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.lol != null && obj.lol.length === opts.limits.lol) {
                throw new MaxLengthError('Decode error - repeated field "lol" had too many elements')
              }

              obj.lol.push(FOO.codec().decode(r))
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
          lol: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'Yo'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.lol != null && obj.lol === opts.limits.lol) {
                throw new MaxLengthError('Streaming decode error - repeated field "lol" had too many elements')
              }

              yield {
                field: `${prefix}lol[]`,
                index: obj.lol,
                value: FOO.codec().decode(r)
              }

              obj.lol++

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
            message: 'Yo'
          }
        }
      })
    }

    return _codec
  }

  export interface YoLolFieldEvent {
    field: '.lol[]'
    index: number
    value: FOO
  }

  export function encode (obj: YoInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Yo.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Yo>): Yo {
    return decodeMessage(buf, Yo.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Yo>): Generator<YoLolFieldEvent> {
    return streamMessage(buf, Yo.codec(), opts)
  }
}

export interface Lol {
  lol?: string
  b?: Bar
}

export interface LolInput {
  lol?: string
  b?: BarInput
}

export namespace Lol {
  let _codec: Codec<Lol, LolInput>

  export const codec = (): Codec<Lol, LolInput> => {
    if (_codec == null) {
      _codec = message<Lol, LolInput>((obj, w, opts = {}) => {
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
      }, (r, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.lol = r.string()
              break
            }
            case 2: {
              obj.b = Bar.codec().decode(r, r.uint32(), {
                limits: opts.limits?.b
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
            message: 'Lol'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}lol`,
                value: r.string()
              }
              break
            }
            case 2: {
              yield * Bar.codec().stream(r, r.uint32(), `${prefix}b.`, {
                limits: opts.limits?.b
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
            message: 'Lol'
          }
        }
      })
    }

    return _codec
  }

  export interface LolLolFieldEvent {
    field: '.lol'
    value: string
  }

  export interface LolBMessageStart {
    field: '.b'
    type: 'start'
  }

  export interface LolBMessageEnd {
    field: '.b'
    type: 'end'
  }

  export interface LolBTmpMessageStart {
    field: '.b.tmp'
    type: 'start'
  }

  export interface LolBTmpMessageEnd {
    field: '.b.tmp'
    type: 'end'
  }

  export interface LolBTmpBazFieldEvent {
    field: '.b.tmp.baz'
    value: number
  }

  export function encode (obj: LolInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Lol.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Lol>): Lol {
    return decodeMessage(buf, Lol.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Lol>): Generator<LolLolFieldEvent | LolBMessageStart | LolBMessageEnd | LolBTmpMessageStart | LolBTmpMessageEnd | LolBTmpBazFieldEvent> {
    return streamMessage(buf, Lol.codec(), opts)
  }
}

export interface Test {
  meh?: Lol
  hello?: number
  foo?: string
  payload?: Uint8Array<ArrayBuffer>
}

export interface TestInput {
  meh?: LolInput
  hello?: number
  foo?: string
  payload?: Uint8Array
}

export namespace Test {
  let _codec: Codec<Test, TestInput>

  export const codec = (): Codec<Test, TestInput> => {
    if (_codec == null) {
      _codec = message<Test, TestInput>((obj, w, opts = {}) => {
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
      }, (r, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 6: {
              obj.meh = Lol.codec().decode(r, r.uint32(), {
                limits: opts.limits?.meh
              })
              break
            }
            case 3: {
              obj.hello = r.uint32()
              break
            }
            case 1: {
              obj.foo = r.string()
              break
            }
            case 7: {
              obj.payload = r.bytes()
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
            message: 'Test'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 6: {
              yield * Lol.codec().stream(r, r.uint32(), `${prefix}meh.`, {
                limits: opts.limits?.meh
              })

              break
            }
            case 3: {
              yield {
                field: `${prefix}hello`,
                value: r.uint32()
              }
              break
            }
            case 1: {
              yield {
                field: `${prefix}foo`,
                value: r.string()
              }
              break
            }
            case 7: {
              yield {
                field: `${prefix}payload`,
                value: r.bytes()
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
            message: 'Test'
          }
        }
      })
    }

    return _codec
  }

  export interface TestMehMessageStart {
    field: '.meh'
    type: 'start'
  }

  export interface TestMehMessageEnd {
    field: '.meh'
    type: 'end'
  }

  export interface TestMehLolFieldEvent {
    field: '.meh.lol'
    value: string
  }

  export interface TestMehBMessageStart {
    field: '.meh.b'
    type: 'start'
  }

  export interface TestMehBMessageEnd {
    field: '.meh.b'
    type: 'end'
  }

  export interface TestMehBTmpMessageStart {
    field: '.meh.b.tmp'
    type: 'start'
  }

  export interface TestMehBTmpMessageEnd {
    field: '.meh.b.tmp'
    type: 'end'
  }

  export interface TestMehBTmpBazFieldEvent {
    field: '.meh.b.tmp.baz'
    value: number
  }

  export interface TestHelloFieldEvent {
    field: '.hello'
    value: number
  }

  export interface TestFooFieldEvent {
    field: '.foo'
    value: string
  }

  export interface TestPayloadFieldEvent {
    field: '.payload'
    value: Uint8Array<ArrayBuffer>
  }

  export function encode (obj: TestInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Test.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Test>): Test {
    return decodeMessage(buf, Test.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Test>): Generator<TestMehMessageStart | TestMehMessageEnd | TestMehLolFieldEvent | TestMehBMessageStart | TestMehBMessageEnd | TestMehBTmpMessageStart | TestMehBTmpMessageEnd | TestMehBTmpBazFieldEvent | TestHelloFieldEvent | TestFooFieldEvent | TestPayloadFieldEvent> {
    return streamMessage(buf, Test.codec(), opts)
  }
}
