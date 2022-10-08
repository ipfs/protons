/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */

import { encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from 'protons-runtime'

export namespace pb {
  export interface NoiseHandshakePayload {
    identityKey: Uint8Array
    identitySig: Uint8Array
    data: Uint8Array
  }

  export namespace NoiseHandshakePayload {
    let _codec: Codec<NoiseHandshakePayload>

    export const codec = (): Codec<NoiseHandshakePayload> => {
      if (_codec == null) {
        _codec = message<NoiseHandshakePayload>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (opts.writeDefaults === true || (obj.identityKey != null && obj.identityKey.byteLength > 0)) {
            w.uint32(10)
            w.bytes(obj.identityKey)
          }

          if (opts.writeDefaults === true || (obj.identitySig != null && obj.identitySig.byteLength > 0)) {
            w.uint32(18)
            w.bytes(obj.identitySig)
          }

          if (opts.writeDefaults === true || (obj.data != null && obj.data.byteLength > 0)) {
            w.uint32(26)
            w.bytes(obj.data)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length) => {
          const obj: any = {
            identityKey: new Uint8Array(0),
            identitySig: new Uint8Array(0),
            data: new Uint8Array(0)
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.identityKey = reader.bytes()
                break
              case 2:
                obj.identitySig = reader.bytes()
                break
              case 3:
                obj.data = reader.bytes()
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

    export const encode = (obj: NoiseHandshakePayload): Uint8Array => {
      return encodeMessage(obj, NoiseHandshakePayload.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): NoiseHandshakePayload => {
      return decodeMessage(buf, NoiseHandshakePayload.codec())
    }
  }
}
