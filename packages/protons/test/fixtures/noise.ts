/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, bytes } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from 'uint8-varint'
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
        _codec = message<NoiseHandshakePayload>((obj, opts = {}) => {
          const bufs: Uint8Array[] = []

          if (opts.lengthDelimited !== false) {
            // will hold length prefix
            bufs.push(new Uint8Array(0))
          }

          let length = 0

          const $identityKey = obj.identityKey
          if ($identityKey != null) {
            const prefixField1 = Uint8Array.from([10])
            const encodedField1 = bytes.encode($identityKey)
            bufs.push(prefixField1, ...encodedField1.bufs)
            length += prefixField1.byteLength + encodedField1.length
          }

          const $identitySig = obj.identitySig
          if ($identitySig != null) {
            const prefixField2 = Uint8Array.from([18])
            const encodedField2 = bytes.encode($identitySig)
            bufs.push(prefixField2, ...encodedField2.bufs)
            length += prefixField2.byteLength + encodedField2.length
          }

          const $data = obj.data
          if ($data != null) {
            const prefixField3 = Uint8Array.from([26])
            const encodedField3 = bytes.encode($data)
            bufs.push(prefixField3, ...encodedField3.bufs)
            length += prefixField3.byteLength + encodedField3.length
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
          '1': { name: 'identityKey', codec: bytes },
          '2': { name: 'identitySig', codec: bytes },
          '3': { name: 'data', codec: bytes }
        })
      }

      return _codec
    }

    export const encode = (obj: NoiseHandshakePayload): Uint8ArrayList => {
      return encodeMessage(obj, NoiseHandshakePayload.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): NoiseHandshakePayload => {
      return decodeMessage(buf, NoiseHandshakePayload.codec())
    }
  }
}
