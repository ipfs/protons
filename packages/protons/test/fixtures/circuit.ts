/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/consistent-type-specifier-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface CircuitRelay {
  type?: CircuitRelay.Type
  srcPeer?: CircuitRelay.Peer
  dstPeer?: CircuitRelay.Peer
  code?: CircuitRelay.Status
}

export namespace CircuitRelay {
  export enum Status {
    SUCCESS = 'SUCCESS',
    HOP_SRC_ADDR_TOO_LONG = 'HOP_SRC_ADDR_TOO_LONG',
    HOP_DST_ADDR_TOO_LONG = 'HOP_DST_ADDR_TOO_LONG',
    HOP_SRC_MULTIADDR_INVALID = 'HOP_SRC_MULTIADDR_INVALID',
    HOP_DST_MULTIADDR_INVALID = 'HOP_DST_MULTIADDR_INVALID',
    HOP_NO_CONN_TO_DST = 'HOP_NO_CONN_TO_DST',
    HOP_CANT_DIAL_DST = 'HOP_CANT_DIAL_DST',
    HOP_CANT_OPEN_DST_STREAM = 'HOP_CANT_OPEN_DST_STREAM',
    HOP_CANT_SPEAK_RELAY = 'HOP_CANT_SPEAK_RELAY',
    HOP_CANT_RELAY_TO_SELF = 'HOP_CANT_RELAY_TO_SELF',
    STOP_SRC_ADDR_TOO_LONG = 'STOP_SRC_ADDR_TOO_LONG',
    STOP_DST_ADDR_TOO_LONG = 'STOP_DST_ADDR_TOO_LONG',
    STOP_SRC_MULTIADDR_INVALID = 'STOP_SRC_MULTIADDR_INVALID',
    STOP_DST_MULTIADDR_INVALID = 'STOP_DST_MULTIADDR_INVALID',
    STOP_RELAY_REFUSED = 'STOP_RELAY_REFUSED',
    MALFORMED_MESSAGE = 'MALFORMED_MESSAGE'
  }

  enum __StatusValues {
    SUCCESS = 100,
    HOP_SRC_ADDR_TOO_LONG = 220,
    HOP_DST_ADDR_TOO_LONG = 221,
    HOP_SRC_MULTIADDR_INVALID = 250,
    HOP_DST_MULTIADDR_INVALID = 251,
    HOP_NO_CONN_TO_DST = 260,
    HOP_CANT_DIAL_DST = 261,
    HOP_CANT_OPEN_DST_STREAM = 262,
    HOP_CANT_SPEAK_RELAY = 270,
    HOP_CANT_RELAY_TO_SELF = 280,
    STOP_SRC_ADDR_TOO_LONG = 320,
    STOP_DST_ADDR_TOO_LONG = 321,
    STOP_SRC_MULTIADDR_INVALID = 350,
    STOP_DST_MULTIADDR_INVALID = 351,
    STOP_RELAY_REFUSED = 390,
    MALFORMED_MESSAGE = 400
  }

  export namespace Status {
    export const codec = (): Codec<Status, any, any> => {
      return enumeration<Status>(__StatusValues)
    }
  }

  export enum Type {
    HOP = 'HOP',
    STOP = 'STOP',
    STATUS = 'STATUS',
    CAN_HOP = 'CAN_HOP'
  }

  enum __TypeValues {
    HOP = 1,
    STOP = 2,
    STATUS = 3,
    CAN_HOP = 4
  }

  export namespace Type {
    export const codec = (): Codec<Type, any, any> => {
      return enumeration<Type>(__TypeValues)
    }
  }

  export interface Peer {
    id: Uint8Array
    addrs: Uint8Array[]
  }

  export namespace Peer {
    let _codec: Codec<Peer, PeerStreamEvent, PeerStreamCollectionsEvent>

    export const codec = (): Codec<Peer, PeerStreamEvent, PeerStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<Peer, PeerStreamEvent, PeerStreamCollectionsEvent>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.id != null && obj.id.byteLength > 0)) {
            w.uint32(10)
            w.bytes(obj.id)
          }

          if (obj.addrs != null) {
            for (const value of obj.addrs) {
              w.uint32(18)
              w.bytes(value)
            }
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            id: uint8ArrayAlloc(0),
            addrs: []
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.id = reader.bytes()
                break
              }
              case 2: {
                if (opts.limits?.addrs != null && obj.addrs.length === opts.limits.addrs) {
                  throw new MaxLengthError('Decode error - map field "addrs" had too many elements')
                }

                obj.addrs.push(reader.bytes())
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
            id: uint8ArrayAlloc(0),
            addrs: []
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
                  field: 'id',
                  value: reader.bytes()
                }
                break
              }
              case 2: {
                if (opts.limits?.addrs != null && obj.addrs.length === opts.limits.addrs) {
                  throw new MaxLengthError('Decode error - map field "addrs" had too many elements')
                }

                yield {
                  field: 'addrs$value',
                  index: 0,
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

    export interface PeerIdFieldEvent {
      field: 'id'
      value: Uint8Array
    }

    export interface PeerAddrsFieldEvent {
      field: 'addrs'
      value: Uint8Array[]
    }

    export interface PeerAddrsValueEvent {
      field: 'addrs$value'
      index: number
      value: Uint8Array
    }

    export type PeerStreamEvent = PeerIdFieldEvent | PeerAddrsValueEvent
    export type PeerStreamCollectionsEvent = PeerAddrsFieldEvent

    export function encode (obj: Partial<Peer>): Uint8Array {
      return encodeMessage(obj, Peer.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Peer>): Peer {
      return decodeMessage(buf, Peer.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Peer>): Generator<PeerStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Peer>): Generator<PeerStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, Peer.codec(), opts)
    }
  }

  let _codec: Codec<CircuitRelay, CircuitRelayStreamEvent, CircuitRelayStreamCollectionsEvent>

  export const codec = (): Codec<CircuitRelay, CircuitRelayStreamEvent, CircuitRelayStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<CircuitRelay, CircuitRelayStreamEvent, CircuitRelayStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.type != null) {
          w.uint32(8)
          CircuitRelay.Type.codec().encode(obj.type, w)
        }

        if (obj.srcPeer != null) {
          w.uint32(18)
          CircuitRelay.Peer.codec().encode(obj.srcPeer, w)
        }

        if (obj.dstPeer != null) {
          w.uint32(26)
          CircuitRelay.Peer.codec().encode(obj.dstPeer, w)
        }

        if (obj.code != null) {
          w.uint32(32)
          CircuitRelay.Status.codec().encode(obj.code, w)
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
            case 1: {
              obj.type = CircuitRelay.Type.codec().decode(reader)
              break
            }
            case 2: {
              obj.srcPeer = CircuitRelay.Peer.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.srcPeer
              })
              break
            }
            case 3: {
              obj.dstPeer = CircuitRelay.Peer.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.dstPeer
              })
              break
            }
            case 4: {
              obj.code = CircuitRelay.Status.codec().decode(reader)
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
          obj = {}
        } else {
          obj = {}
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'type',
                value: CircuitRelay.Type.codec().decode(reader)
              }
              break
            }
            case 2: {
              yield {
                field: 'srcPeer',
                value: CircuitRelay.Peer.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.srcPeer
                })
              }
              break
            }
            case 3: {
              yield {
                field: 'dstPeer',
                value: CircuitRelay.Peer.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.dstPeer
                })
              }
              break
            }
            case 4: {
              yield {
                field: 'code',
                value: CircuitRelay.Status.codec().decode(reader)
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

  export interface CircuitRelayTypeFieldEvent {
    field: 'type'
    value: CircuitRelay.Type
  }

  export interface CircuitRelaySrcPeerFieldEvent {
    field: 'srcPeer'
    value: CircuitRelay.Peer
  }

  export interface CircuitRelayDstPeerFieldEvent {
    field: 'dstPeer'
    value: CircuitRelay.Peer
  }

  export interface CircuitRelayCodeFieldEvent {
    field: 'code'
    value: CircuitRelay.Status
  }

  export type CircuitRelayStreamEvent = CircuitRelayTypeFieldEvent | CircuitRelaySrcPeerFieldEvent | CircuitRelayDstPeerFieldEvent | CircuitRelayCodeFieldEvent
  export type CircuitRelayStreamCollectionsEvent = {}

  export function encode (obj: Partial<CircuitRelay>): Uint8Array {
    return encodeMessage(obj, CircuitRelay.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CircuitRelay>): CircuitRelay {
    return decodeMessage(buf, CircuitRelay.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<CircuitRelay>): Generator<CircuitRelayStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<CircuitRelay>): Generator<CircuitRelayStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, CircuitRelay.codec(), opts)
  }
}
