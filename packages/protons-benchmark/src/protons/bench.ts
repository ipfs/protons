/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, uint32, enumeration, string, bytes } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Foo {
  baz: number
}

export namespace Foo {
  export const codec = (): Codec<Foo> => {
    return message<Foo>({
      1: { name: 'baz', codec: uint32 }
    })
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
  export const codec = (): Codec<Bar> => {
    return message<Bar>({
      1: { name: 'tmp', codec: Foo.codec() }
    })
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
    return enumeration<typeof FOO>(__FOOValues)
  }
}
export interface Yo {
  lol: FOO[]
}

export namespace Yo {
  export const codec = (): Codec<Yo> => {
    return message<Yo>({
      1: { name: 'lol', codec: FOO.codec(), repeats: true }
    })
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
  export const codec = (): Codec<Lol> => {
    return message<Lol>({
      1: { name: 'lol', codec: string },
      2: { name: 'b', codec: Bar.codec() }
    })
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
  export const codec = (): Codec<Test> => {
    return message<Test>({
      6: { name: 'meh', codec: Lol.codec() },
      3: { name: 'hello', codec: uint32 },
      1: { name: 'foo', codec: string },
      7: { name: 'payload', codec: bytes }
    })
  }

  export const encode = (obj: Test): Uint8ArrayList => {
    return encodeMessage(obj, Test.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Test => {
    return decodeMessage(buf, Test.codec())
  }
}
