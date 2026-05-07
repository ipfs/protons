/* eslint-disable require-yield */

import { decodeMessage, encodeMessage, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface pb {}

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

          if ((obj.identityKey != null && obj.identityKey.byteLength > 0)) {
            w.uint32(10)
            w.bytes(obj.identityKey)
          }

          if ((obj.identitySig != null && obj.identitySig.byteLength > 0)) {
            w.uint32(18)
            w.bytes(obj.identitySig)
          }

          if ((obj.data != null && obj.data.byteLength > 0)) {
            w.uint32(26)
            w.bytes(obj.data)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            identityKey: uint8ArrayAlloc(0),
            identitySig: uint8ArrayAlloc(0),
            data: uint8ArrayAlloc(0)
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.identityKey = reader.bytes()
                break
              }
              case 2: {
                obj.identitySig = reader.bytes()
                break
              }
              case 3: {
                obj.data = reader.bytes()
                break
              }
              default: {
                reader.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (reader, length, prefix, opts = {}) {
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}.identityKey`,
                  value: reader.bytes()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}.identitySig`,
                  value: reader.bytes()
                }
                break
              }
              case 3: {
                yield {
                  field: `${prefix}.data`,
                  value: reader.bytes()
                }
                break
              }
              default: {
                reader.skipType(tag & 7)
                break
              }
            }
          }
        })
      }

      return _codec
    }

    export interface NoiseHandshakePayloadIdentityKeyFieldEvent {
      field: '$.identityKey'
      value: Uint8Array
    }

    export interface NoiseHandshakePayloadIdentitySigFieldEvent {
      field: '$.identitySig'
      value: Uint8Array
    }

    export interface NoiseHandshakePayloadDataFieldEvent {
      field: '$.data'
      value: Uint8Array
    }

    export function encode (obj: Partial<NoiseHandshakePayload>): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, NoiseHandshakePayload.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<NoiseHandshakePayload>): NoiseHandshakePayload {
      return decodeMessage(buf, NoiseHandshakePayload.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<NoiseHandshakePayload>): Generator<NoiseHandshakePayloadIdentityKeyFieldEvent | NoiseHandshakePayloadIdentitySigFieldEvent | NoiseHandshakePayloadDataFieldEvent> {
      return streamMessage(buf, NoiseHandshakePayload.codec(), opts)
    }
  }

  let _codec: Codec<pb>

  export const codec = (): Codec<pb> => {
    if (_codec == null) {
      _codec = message<pb>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (reader, length, prefix, opts = {}) {
        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }
      })
    }

    return _codec
  }

  export function encode (obj: Partial<pb>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, pb.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<pb>): pb {
    return decodeMessage(buf, pb.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<pb>): Generator<{}> {
    return streamMessage(buf, pb.codec(), opts)
  }
}
