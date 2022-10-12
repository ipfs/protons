/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */

import { encodeMessage, decodeMessage, message, writer, enumeration } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from 'protons-runtime'

export interface Foo {
  baz?: number
}

export namespace Foo {
  let _codec: Codec<Foo>

  export const codec = (): Codec<Foo> => {
    if (_codec == null) {
      _codec = message<Foo>((obj, w, opts = {}) => {
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
      }, (reader, length) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.baz = reader.uint32()
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Foo): Uint8Array => {
    return encodeMessage(obj, Foo.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Foo => {
    return decodeMessage(buf, Foo.codec())
  }
}

export interface Bar {
  tmp?: Foo
}

export namespace Bar {
  let _codec: Codec<Bar>

  export const codec = (): Codec<Bar> => {
    if (_codec == null) {
      _codec = message<Bar>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.tmp != null) {
          const mw = writer()
          Foo.codec().encode(obj.tmp, mw, {
            lengthDelimited: false,
            writeDefaults: false
          })
          const buf = mw.finish()

          if (buf.byteLength > 0) {
            w.uint32(10)
            w.bytes(buf)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.tmp = Foo.codec().decode(reader, reader.uint32())
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Bar): Uint8Array => {
    return encodeMessage(obj, Bar.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Bar => {
    return decodeMessage(buf, Bar.codec())
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
  export const codec = () => {
    return enumeration<FOO>(__FOOValues)
  }
}
export interface Yo {
  lol: FOO[]
}

export namespace Yo {
  let _codec: Codec<Yo>

  export const codec = (): Codec<Yo> => {
    if (_codec == null) {
      _codec = message<Yo>((obj, w, opts = {}) => {
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
      }, (reader, length) => {
        const obj: any = {
          lol: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.lol.push(FOO.codec().decode(reader))
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Yo): Uint8Array => {
    return encodeMessage(obj, Yo.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Yo => {
    return decodeMessage(buf, Yo.codec())
  }
}

export interface Lol {
  lol?: string
  b?: Bar
}

export namespace Lol {
  let _codec: Codec<Lol>

  export const codec = (): Codec<Lol> => {
    if (_codec == null) {
      _codec = message<Lol>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.lol != null) {
          w.uint32(10)
          w.string(obj.lol)
        }

        if (obj.b != null) {
          const mw = writer()
          Bar.codec().encode(obj.b, mw, {
            lengthDelimited: false,
            writeDefaults: false
          })
          const buf = mw.finish()

          if (buf.byteLength > 0) {
            w.uint32(18)
            w.bytes(buf)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.lol = reader.string()
              break
            case 2:
              obj.b = Bar.codec().decode(reader, reader.uint32())
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Lol): Uint8Array => {
    return encodeMessage(obj, Lol.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Lol => {
    return decodeMessage(buf, Lol.codec())
  }
}

export interface Test {
  meh?: Lol
  hello?: number
  foo?: string
  payload?: Uint8Array
}

export namespace Test {
  let _codec: Codec<Test>

  export const codec = (): Codec<Test> => {
    if (_codec == null) {
      _codec = message<Test>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.meh != null) {
          const mw = writer()
          Lol.codec().encode(obj.meh, mw, {
            lengthDelimited: false,
            writeDefaults: false
          })
          const buf = mw.finish()

          if (buf.byteLength > 0) {
            w.uint32(50)
            w.bytes(buf)
          }
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
      }, (reader, length) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 6:
              obj.meh = Lol.codec().decode(reader, reader.uint32())
              break
            case 3:
              obj.hello = reader.uint32()
              break
            case 1:
              obj.foo = reader.string()
              break
            case 7:
              obj.payload = reader.bytes()
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Test): Uint8Array => {
    return encodeMessage(obj, Test.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Test => {
    return decodeMessage(buf, Test.codec())
  }
}
