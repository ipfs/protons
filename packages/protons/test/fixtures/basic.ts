/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */

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
      _codec = message<Basic>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.foo != null) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if (opts.writeDefaults === true || obj.num !== 0) {
          w.uint32(16)
          w.int32(obj.num ?? 0)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
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

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<Basic>): Uint8Array => {
    return encodeMessage(obj, Basic.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Basic => {
    return decodeMessage(buf, Basic.codec())
  }
}

export interface Empty {}

export namespace Empty {
  let _codec: Codec<Empty>

  export const codec = (): Codec<Empty> => {
    if (_codec == null) {
      _codec = message<Empty>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
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

  export const encode = (obj: Partial<Empty>): Uint8Array => {
    return encodeMessage(obj, Empty.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Empty => {
    return decodeMessage(buf, Empty.codec())
  }
}
