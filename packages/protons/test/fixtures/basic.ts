/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, string, int32 } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from 'uint8-varint'
import type { Codec } from 'protons-runtime'

export interface Basic {
  foo?: string
  num: number
}

export namespace Basic {
  let _codec: Codec<Basic>

  export const codec = (): Codec<Basic> => {
    if (_codec == null) {
      _codec = message<Basic>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $foo = obj.foo
        if ($foo != null) {
          const prefixField1 = Uint8Array.from([10])
          const encodedField1 = string.encode($foo)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        const $num = obj.num
        if ($num != null) {
          const prefixField2 = Uint8Array.from([16])
          const encodedField2 = int32.encode($num)
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
        '1': { name: 'foo', codec: string, optional: true },
        '2': { name: 'num', codec: int32 }
      })
    }

    return _codec
  }

  export const encode = (obj: Basic): Uint8ArrayList => {
    return encodeMessage(obj, Basic.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Basic => {
    return decodeMessage(buf, Basic.codec())
  }
}
