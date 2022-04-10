/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, string, int32 } from 'protons-runtime'
import type { Codec } from 'protons-runtime'

export interface Basic {
  foo: string
  num: number
}

export namespace Basic {
  export const codec = (): Codec<Basic> => {
    return message<Basic>({
      1: { name: 'foo', codec: string },
      2: { name: 'num', codec: int32 }
    })
  }

  export const encode = (obj: Basic): Uint8Array => {
    return encodeMessage(obj, Basic.codec())
  }

  export const decode = (buf: Uint8Array): Basic => {
    return decodeMessage(buf, Basic.codec())
  }
}
