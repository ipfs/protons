/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, uint32, enumeration, string, bytes } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from 'uint8-varint'
import type { Codec } from 'protons-runtime'

export interface Foo {
  baz: number
}

export namespace Foo {
  let _codec: Codec<Foo>

  export const codec = (): Codec<Foo> => {
    if (_codec == null) {
      _codec = message<Foo>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $baz = obj.baz
        if ($baz != null) {
          const prefixField1 = Uint8Array.from([8])
          const encodedField1 = uint32.encode($baz)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        if (opts.lengthDelimited !== false) {
          const prefix = unsigned.encode(length)

          bufs[0] = prefix
          length += prefix.byteLength

          return {
            bufs,
            length
          }
        }

        return {
          bufs,
          length
        }
      }, {
        '1': { name: 'baz', codec: uint32 }
      })
    }

    return _codec
  }

  export const encode = (obj: Foo): Uint8ArrayList => {
    return encodeMessage(obj, Foo.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Foo => {
    return decodeMessage(buf, Foo.codec())
  }
}

export interface Bar {
  tmp: Foo
}

export namespace Bar {
  let _codec: Codec<Bar>

  export const codec = (): Codec<Bar> => {
    if (_codec == null) {
      _codec = message<Bar>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $tmp = obj.tmp
        if ($tmp != null) {
          const prefixField1 = Uint8Array.from([10])
          const encodedField1 = Foo.codec().encode($tmp)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        if (opts.lengthDelimited !== false) {
          const prefix = unsigned.encode(length)

          bufs[0] = prefix
          length += prefix.byteLength

          return {
            bufs,
            length
          }
        }

        return {
          bufs,
          length
        }
      }, {
        '1': { name: 'tmp', codec: Foo.codec() }
      })
    }

    return _codec
  }

  export const encode = (obj: Bar): Uint8ArrayList => {
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
      _codec = message<Yo>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $lol = obj.lol
        if ($lol != null) {
          for (const value of $lol) {
            const prefixField1 = Uint8Array.from([8])
            const encodedField1 = FOO.codec().encode(value)
            bufs.push(prefixField1, ...encodedField1.bufs)
            length += prefixField1.byteLength + encodedField1.length
          }
        }

        if (opts.lengthDelimited !== false) {
          const prefix = unsigned.encode(length)

          bufs[0] = prefix
          length += prefix.byteLength

          return {
            bufs,
            length
          }
        }

        return {
          bufs,
          length
        }
      }, {
        '1': { name: 'lol', codec: FOO.codec(), repeats: true }
      })
    }

    return _codec
  }

  export const encode = (obj: Yo): Uint8ArrayList => {
    return encodeMessage(obj, Yo.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Yo => {
    return decodeMessage(buf, Yo.codec())
  }
}

export interface Lol {
  lol: string
  b: Bar
}

export namespace Lol {
  let _codec: Codec<Lol>

  export const codec = (): Codec<Lol> => {
    if (_codec == null) {
      _codec = message<Lol>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $lol = obj.lol
        if ($lol != null) {
          const prefixField1 = Uint8Array.from([10])
          const encodedField1 = string.encode($lol)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        const $b = obj.b
        if ($b != null) {
          const prefixField2 = Uint8Array.from([18])
          const encodedField2 = Bar.codec().encode($b)
          bufs.push(prefixField2, ...encodedField2.bufs)
          length += prefixField2.byteLength + encodedField2.length
        }

        if (opts.lengthDelimited !== false) {
          const prefix = unsigned.encode(length)

          bufs[0] = prefix
          length += prefix.byteLength

          return {
            bufs,
            length
          }
        }

        return {
          bufs,
          length
        }
      }, {
        '1': { name: 'lol', codec: string },
        '2': { name: 'b', codec: Bar.codec() }
      })
    }

    return _codec
  }

  export const encode = (obj: Lol): Uint8ArrayList => {
    return encodeMessage(obj, Lol.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Lol => {
    return decodeMessage(buf, Lol.codec())
  }
}

export interface Test {
  meh: Lol
  hello: number
  foo: string
  payload: Uint8Array
}

export namespace Test {
  let _codec: Codec<Test>

  export const codec = (): Codec<Test> => {
    if (_codec == null) {
      _codec = message<Test>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $meh = obj.meh
        if ($meh != null) {
          const prefixField6 = Uint8Array.from([50])
          const encodedField6 = Lol.codec().encode($meh)
          bufs.push(prefixField6, ...encodedField6.bufs)
          length += prefixField6.byteLength + encodedField6.length
        }

        const $hello = obj.hello
        if ($hello != null) {
          const prefixField3 = Uint8Array.from([24])
          const encodedField3 = uint32.encode($hello)
          bufs.push(prefixField3, ...encodedField3.bufs)
          length += prefixField3.byteLength + encodedField3.length
        }

        const $foo = obj.foo
        if ($foo != null) {
          const prefixField1 = Uint8Array.from([10])
          const encodedField1 = string.encode($foo)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        const $payload = obj.payload
        if ($payload != null) {
          const prefixField7 = Uint8Array.from([58])
          const encodedField7 = bytes.encode($payload)
          bufs.push(prefixField7, ...encodedField7.bufs)
          length += prefixField7.byteLength + encodedField7.length
        }

        if (opts.lengthDelimited !== false) {
          const prefix = unsigned.encode(length)

          bufs[0] = prefix
          length += prefix.byteLength

          return {
            bufs,
            length
          }
        }

        return {
          bufs,
          length
        }
      }, {
        '6': { name: 'meh', codec: Lol.codec() },
        '3': { name: 'hello', codec: uint32 },
        '1': { name: 'foo', codec: string },
        '7': { name: 'payload', codec: bytes }
      })
    }

    return _codec
  }

  export const encode = (obj: Test): Uint8ArrayList => {
    return encodeMessage(obj, Test.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Test => {
    return decodeMessage(buf, Test.codec())
  }
}
