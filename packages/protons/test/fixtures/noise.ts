/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/consistent-type-specifier-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { decodeMessage, encodeMessage, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface pb {}

export namespace pb {
  export interface NoiseHandshakePayload {
    identityKey: Uint8Array
    identitySig: Uint8Array
    data: Uint8Array
  }

  export namespace NoiseHandshakePayload {
    let _codec: Codec<NoiseHandshakePayload, NoiseHandshakePayloadStreamEvent, NoiseHandshakePayloadStreamCollectionsEvent>

    export const codec = (): Codec<NoiseHandshakePayload, NoiseHandshakePayloadStreamEvent, NoiseHandshakePayloadStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<NoiseHandshakePayload, NoiseHandshakePayloadStreamEvent, NoiseHandshakePayloadStreamCollectionsEvent>((obj, w, opts = {}) => {
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
        }, function * (reader, length, opts = {}) {
          let obj: any

          if (opts.emitCollections === true) {
            obj = {
            identityKey: uint8ArrayAlloc(0),
            identitySig: uint8ArrayAlloc(0),
            data: uint8ArrayAlloc(0)
          }
          } else {
            obj = {}
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: 'identityKey',
                  value: reader.bytes()
                }
                break
              }
              case 2: {
                yield {
                  field: 'identitySig',
                  value: reader.bytes()
                }
                break
              }
              case 3: {
                yield {
                  field: 'data',
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
      field: 'identityKey'
      value: Uint8Array
    }

    export interface NoiseHandshakePayloadIdentitySigFieldEvent {
      field: 'identitySig'
      value: Uint8Array
    }

    export interface NoiseHandshakePayloadDataFieldEvent {
      field: 'data'
      value: Uint8Array
    }

    export type NoiseHandshakePayloadStreamEvent = NoiseHandshakePayloadIdentityKeyFieldEvent | NoiseHandshakePayloadIdentitySigFieldEvent | NoiseHandshakePayloadDataFieldEvent
    export type NoiseHandshakePayloadStreamCollectionsEvent = {}

    export function encode (obj: Partial<NoiseHandshakePayload>): Uint8Array {
      return encodeMessage(obj, NoiseHandshakePayload.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<NoiseHandshakePayload>): NoiseHandshakePayload {
      return decodeMessage(buf, NoiseHandshakePayload.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<NoiseHandshakePayload>): Generator<NoiseHandshakePayloadStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<NoiseHandshakePayload>): Generator<NoiseHandshakePayloadStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, NoiseHandshakePayload.codec(), opts)
    }
  }

  let _codec: Codec<pb, pbStreamEvent, pbStreamCollectionsEvent>

  export const codec = (): Codec<pb, pbStreamEvent, pbStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<pb, pbStreamEvent, pbStreamCollectionsEvent>((obj, w, opts = {}) => {
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
      }, function * (reader, length, opts = {}) {
        let obj: any

        if (opts.emitCollections === true) {
          obj = {}
        } else {
          obj = {}
        }

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

  

  export type pbStreamEvent = {}
  export type pbStreamCollectionsEvent = {}

  export function encode (obj: Partial<pb>): Uint8Array {
    return encodeMessage(obj, pb.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<pb>): pb {
    return decodeMessage(buf, pb.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<pb>): Generator<pbStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<pb>): Generator<pbStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, pb.codec(), opts)
  }
}
