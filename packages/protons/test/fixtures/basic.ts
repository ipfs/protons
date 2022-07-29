/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, string, int32 } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Basic {
  foo?: string
  num: number
}

export namespace Basic {
  export const codec = (): Codec<Basic> => {
    return message<Basic>({
      1: { name: 'foo', codec: string, optional: true },
      2: { name: 'num', codec: int32 }
    }, false)
  }

  export const encode = (obj: Basic): Uint8ArrayList => {
    return encodeMessage(obj, Basic.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Basic => {
    return decodeMessage(buf, Basic.codec())
  }
}
