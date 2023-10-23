/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface MessageWithRequired {
  scalarField: number
}

export namespace MessageWithRequired {
  let _codec: Codec<MessageWithRequired>

  export const codec = (): Codec<MessageWithRequired> => {
    if (_codec == null) {
      _codec = message<MessageWithRequired>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.scalarField != null) {
          w.uint32(8)
          w.int32(obj.scalarField)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          scalarField: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.scalarField = reader.int32()
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<MessageWithRequired>): Uint8Array => {
    return encodeMessage(obj, MessageWithRequired.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): MessageWithRequired => {
    return decodeMessage(buf, MessageWithRequired.codec())
  }
}
