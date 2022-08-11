/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from 'protons-runtime'

export interface Basic {
  foo?: string
  num: number
}

export namespace Basic {
  let _codec: Codec<Basic>

  export const codec = (): Codec<Basic> => {
    if (_codec == null) {
      _codec = message<Basic>((obj, writer, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          writer.fork()
        }

        if (obj.foo != null) {
          writer.uint32(10)
          writer.string(obj.foo)
        }

        if (obj.num != null) {
          writer.uint32(16)
          writer.int32(obj.num)
        } else {
          throw new Error('Protocol error: required field "num" was not found in object')
        }

        if (opts.lengthDelimited !== false) {
          writer.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          num: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.foo = reader.string()
              break
            case 2:
              obj.num = reader.int32()
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        if (obj.num == null) {
          throw new Error('Protocol error: value for required field "num" was not found in protobuf')
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Basic): Uint8Array => {
    return encodeMessage(obj, Basic.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Basic => {
    return decodeMessage(buf, Basic.codec())
  }
}
