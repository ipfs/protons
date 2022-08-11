/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, enumeration } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from 'protons-runtime'

export interface Foo {
  baz?: number
}

export namespace Foo {
  let _codec: Codec<Foo>

  export const codec = (): Codec<Foo> => {
    if (_codec == null) {
      _codec = message<Foo>((obj, writer, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          writer.fork()
        }

        if (obj.baz != null) {
          writer.uint32(8)
          writer.uint32(obj.baz)
        }

        if (opts.lengthDelimited !== false) {
          writer.ldelim()
        }
      }, (reader, length) => {
        const obj: Foo = {}

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
      _codec = message<Bar>((obj, writer, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          writer.fork()
        }

        if (obj.tmp != null) {
          writer.uint32(10)
          Foo.codec().encode(obj.tmp, writer)
        }

        if (opts.lengthDelimited !== false) {
          writer.ldelim()
        }
      }, (reader, length) => {
        const obj: Bar = {}

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
  LOL = 'LOL',
  ABE = 'ABE'
}

enum __FOOValues {
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
      _codec = message<Yo>((obj, writer, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          writer.fork()
        }

        if (obj.lol != null) {
          for (const value of obj.lol) {
            writer.uint32(8)
            FOO.codec().encode(value, writer)
          }
        } else {
          throw new Error('Protocol error: required field "lol" was not found in object')
        }

        if (opts.lengthDelimited !== false) {
          writer.ldelim()
        }
      }, (reader, length) => {
        const obj: Yo = {
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
  b: Bar
}

export namespace Lol {
  let _codec: Codec<Lol>

  export const codec = (): Codec<Lol> => {
    if (_codec == null) {
      _codec = message<Lol>((obj, writer, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          writer.fork()
        }

        if (obj.lol != null) {
          writer.uint32(10)
          writer.string(obj.lol)
        }

        if (obj.b != null) {
          writer.uint32(18)
          Bar.codec().encode(obj.b, writer)
        } else {
          throw new Error('Protocol error: required field "b" was not found in object')
        }

        if (opts.lengthDelimited !== false) {
          writer.ldelim()
        }
      }, (reader, length) => {
        const obj: Lol = {
          b: null
        }

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

        if (obj.b == null) {
          throw new Error('Protocol error: value for required field "b" was not found in protobuf')
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
      _codec = message<Test>((obj, writer, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          writer.fork()
        }

        if (obj.meh != null) {
          writer.uint32(50)
          Lol.codec().encode(obj.meh, writer)
        }

        if (obj.hello != null) {
          writer.uint32(24)
          writer.uint32(obj.hello)
        }

        if (obj.foo != null) {
          writer.uint32(10)
          writer.string(obj.foo)
        }

        if (obj.payload != null) {
          writer.uint32(58)
          writer.bytes(obj.payload)
        }

        if (opts.lengthDelimited !== false) {
          writer.ldelim()
        }
      }, (reader, length) => {
        const obj: Test = {}

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
