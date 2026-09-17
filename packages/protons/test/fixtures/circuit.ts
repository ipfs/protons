import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions } from 'protons-runtime'
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
    export const codec = (): Codec<Status> => {
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
    export const codec = (): Codec<Type> => {
      return enumeration<Type>(__TypeValues)
    }
  }

  export interface Peer {
    id: Uint8Array<ArrayBuffer>
    addrs: Uint8Array<ArrayBuffer>[]
  }

  export namespace Peer {
    let _codec: Codec<Peer>

    export const codec = (): Codec<Peer> => {
      if (_codec == null) {
        _codec = message<Peer>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.id != null && obj.id.byteLength > 0)) {
            w.uint32(10)
            w.bytes(obj.id)
          }

          if (obj.addrs != null && obj.addrs.length > 0) {
            for (const value of obj.addrs) {
              w.uint32(18)
              w.bytes(value)
            }
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (r, length, opts = {}) => {
          const obj: any = {
            id: uint8ArrayAlloc(0),
            addrs: []
          }

          const end = length == null ? r.len : r.pos + length

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.id = r.bytes()
                break
              }
              case 2: {
                if (opts.limits?.addrs != null && obj.addrs.length === opts.limits.addrs) {
                  throw new MaxLengthError('Decode error - repeated field "addrs" had too many elements')
                }

                obj.addrs.push(r.bytes())
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (r, length, prefix, opts = {}) {
          const obj = {
            addrs: 0
          }

          const end = length == null ? r.len : r.pos + length

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'CircuitRelay.Peer'
            }
          }

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}id`,
                  value: r.bytes()
                }
                break
              }
              case 2: {
                if (opts.limits?.addrs != null && obj.addrs === opts.limits.addrs) {
                  throw new MaxLengthError('Streaming decode error - repeated field "addrs" had too many elements')
                }

                yield {
                  field: `${prefix}addrs[]`,
                  index: obj.addrs,
                  value: r.bytes()
                }

                obj.addrs++

                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'end',
              message: 'CircuitRelay.Peer'
            }
          }
        })
      }

      return _codec
    }

    export interface PeerIdFieldEvent {
      field: '.id'
      value: Uint8Array<ArrayBuffer>
    }

    export interface PeerAddrsFieldEvent {
      field: '.addrs[]'
      index: number
      value: Uint8Array<ArrayBuffer>
    }

    export function encode (obj: Partial<Peer>): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, Peer.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Peer>): Peer {
      return decodeMessage(buf, Peer.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Peer>): Generator<PeerIdFieldEvent | PeerAddrsFieldEvent> {
      return streamMessage(buf, Peer.codec(), opts)
    }
  }

  let _codec: Codec<CircuitRelay>

  export const codec = (): Codec<CircuitRelay> => {
    if (_codec == null) {
      _codec = message<CircuitRelay>((obj, w, opts = {}) => {
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
      }, (r, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.type = CircuitRelay.Type.codec().decode(r)
              break
            }
            case 2: {
              obj.srcPeer = CircuitRelay.Peer.codec().decode(r, r.uint32(), {
                limits: opts.limits?.srcPeer
              })
              break
            }
            case 3: {
              obj.dstPeer = CircuitRelay.Peer.codec().decode(r, r.uint32(), {
                limits: opts.limits?.dstPeer
              })
              break
            }
            case 4: {
              obj.code = CircuitRelay.Status.codec().decode(r)
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (r, length, prefix, opts = {}) {
        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'CircuitRelay'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}type`,
                value: CircuitRelay.Type.codec().decode(r)
              }
              break
            }
            case 2: {
              yield * CircuitRelay.Peer.codec().stream(r, r.uint32(), `${prefix}srcPeer.`, {
                limits: opts.limits?.srcPeer
              })

              break
            }
            case 3: {
              yield * CircuitRelay.Peer.codec().stream(r, r.uint32(), `${prefix}dstPeer.`, {
                limits: opts.limits?.dstPeer
              })

              break
            }
            case 4: {
              yield {
                field: `${prefix}code`,
                value: CircuitRelay.Status.codec().decode(r)
              }
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'CircuitRelay'
          }
        }
      })
    }

    return _codec
  }

  export interface CircuitRelayTypeFieldEvent {
    field: '.type'
    value: CircuitRelay.Type
  }

  export interface CircuitRelaySrcPeerMessageStart {
    field: '.srcPeer'
    type: 'start'
  }

  export interface CircuitRelaySrcPeerMessageEnd {
    field: '.srcPeer'
    type: 'end'
  }

  export interface CircuitRelaySrcPeerIdFieldEvent {
    field: '.srcPeer.id'
    value: Uint8Array<ArrayBuffer>
  }

  export interface CircuitRelaySrcPeerAddrsFieldEvent {
    field: '.srcPeer.addrs[]'
    index: number
    value: Uint8Array<ArrayBuffer>
  }

  export interface CircuitRelayDstPeerMessageStart {
    field: '.dstPeer'
    type: 'start'
  }

  export interface CircuitRelayDstPeerMessageEnd {
    field: '.dstPeer'
    type: 'end'
  }

  export interface CircuitRelayDstPeerIdFieldEvent {
    field: '.dstPeer.id'
    value: Uint8Array<ArrayBuffer>
  }

  export interface CircuitRelayDstPeerAddrsFieldEvent {
    field: '.dstPeer.addrs[]'
    index: number
    value: Uint8Array<ArrayBuffer>
  }

  export interface CircuitRelayCodeFieldEvent {
    field: '.code'
    value: CircuitRelay.Status
  }

  export function encode (obj: Partial<CircuitRelay>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, CircuitRelay.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CircuitRelay>): CircuitRelay {
    return decodeMessage(buf, CircuitRelay.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<CircuitRelay>): Generator<CircuitRelayTypeFieldEvent | CircuitRelaySrcPeerMessageStart | CircuitRelaySrcPeerMessageEnd | CircuitRelaySrcPeerIdFieldEvent | CircuitRelaySrcPeerAddrsFieldEvent | CircuitRelayDstPeerMessageStart | CircuitRelayDstPeerMessageEnd | CircuitRelayDstPeerIdFieldEvent | CircuitRelayDstPeerAddrsFieldEvent | CircuitRelayCodeFieldEvent> {
    return streamMessage(buf, CircuitRelay.codec(), opts)
  }
}
