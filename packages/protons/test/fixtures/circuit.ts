/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { enumeration, encodeMessage, decodeMessage, message, bytes } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from 'uint8-varint'
import type { Codec } from 'protons-runtime'

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
    export const codec = () => {
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
    export const codec = () => {
      return enumeration<Type>(__TypeValues)
    }
  }

  export interface Peer {
    id: Uint8Array
    addrs: Uint8Array[]
  }

  export namespace Peer {
    let _codec: Codec<Peer>

    export const codec = (): Codec<Peer> => {
      if (_codec == null) {
        _codec = message<Peer>((obj, opts = {}) => {
          const bufs: Uint8Array[] = []

          if (opts.lengthDelimited !== false) {
            // will hold length prefix
            bufs.push(new Uint8Array(0))
          }

          let length = 0

          const $id = obj.id
          if ($id != null) {
            const prefixField1 = Uint8Array.from([10])
            const encodedField1 = bytes.encode($id)
            bufs.push(prefixField1, ...encodedField1.bufs)
            length += prefixField1.byteLength + encodedField1.length
          }

          const $addrs = obj.addrs
          if ($addrs != null) {
            for (const value of $addrs) {
              const prefixField2 = Uint8Array.from([18])
              const encodedField2 = bytes.encode(value)
              bufs.push(prefixField2, ...encodedField2.bufs)
              length += prefixField2.byteLength + encodedField2.length
            }
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
          '1': { name: 'id', codec: bytes },
          '2': { name: 'addrs', codec: bytes, repeats: true }
        })
      }

      return _codec
    }

    export const encode = (obj: Peer): Uint8ArrayList => {
      return encodeMessage(obj, Peer.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): Peer => {
      return decodeMessage(buf, Peer.codec())
    }
  }

  let _codec: Codec<CircuitRelay>

  export const codec = (): Codec<CircuitRelay> => {
    if (_codec == null) {
      _codec = message<CircuitRelay>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $type = obj.type
        if ($type != null) {
          const prefixField1 = Uint8Array.from([8])
          const encodedField1 = CircuitRelay.Type.codec().encode($type)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        const $srcPeer = obj.srcPeer
        if ($srcPeer != null) {
          const prefixField2 = Uint8Array.from([18])
          const encodedField2 = CircuitRelay.Peer.codec().encode($srcPeer)
          bufs.push(prefixField2, ...encodedField2.bufs)
          length += prefixField2.byteLength + encodedField2.length
        }

        const $dstPeer = obj.dstPeer
        if ($dstPeer != null) {
          const prefixField3 = Uint8Array.from([26])
          const encodedField3 = CircuitRelay.Peer.codec().encode($dstPeer)
          bufs.push(prefixField3, ...encodedField3.bufs)
          length += prefixField3.byteLength + encodedField3.length
        }

        const $code = obj.code
        if ($code != null) {
          const prefixField4 = Uint8Array.from([32])
          const encodedField4 = CircuitRelay.Status.codec().encode($code)
          bufs.push(prefixField4, ...encodedField4.bufs)
          length += prefixField4.byteLength + encodedField4.length
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
        '1': { name: 'type', codec: CircuitRelay.Type.codec(), optional: true },
        '2': { name: 'srcPeer', codec: CircuitRelay.Peer.codec(), optional: true },
        '3': { name: 'dstPeer', codec: CircuitRelay.Peer.codec(), optional: true },
        '4': { name: 'code', codec: CircuitRelay.Status.codec(), optional: true }
      })
    }

    return _codec
  }

  export const encode = (obj: CircuitRelay): Uint8ArrayList => {
    return encodeMessage(obj, CircuitRelay.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): CircuitRelay => {
    return decodeMessage(buf, CircuitRelay.codec())
  }
}
