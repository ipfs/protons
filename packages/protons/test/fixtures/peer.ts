/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, string, bytes, bool } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Peer {
  addresses: Address[]
  protocols: string[]
  metadata: Metadata[]
  pubKey?: Uint8Array
  peerRecordEnvelope?: Uint8Array
}

export namespace Peer {
  let _codec: Codec<Peer>

  export const codec = (): Codec<Peer> => {
    if (_codec == null) {
      _codec = message<Peer>({
        1: { name: 'addresses', codec: Address.codec(), repeats: true },
        2: { name: 'protocols', codec: string, repeats: true },
        3: { name: 'metadata', codec: Metadata.codec(), repeats: true },
        4: { name: 'pubKey', codec: bytes, optional: true },
        5: { name: 'peerRecordEnvelope', codec: bytes, optional: true }
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

export interface Address {
  multiaddr: Uint8Array
  isCertified?: boolean
}

export namespace Address {
  let _codec: Codec<Address>

  export const codec = (): Codec<Address> => {
    if (_codec == null) {
      _codec = message<Address>({
        1: { name: 'multiaddr', codec: bytes },
        2: { name: 'isCertified', codec: bool, optional: true }
      })
    }

    return _codec
  }

  export const encode = (obj: Address): Uint8ArrayList => {
    return encodeMessage(obj, Address.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Address => {
    return decodeMessage(buf, Address.codec())
  }
}

export interface Metadata {
  key: string
  value: Uint8Array
}

export namespace Metadata {
  let _codec: Codec<Metadata>

  export const codec = (): Codec<Metadata> => {
    if (_codec == null) {
      _codec = message<Metadata>({
        1: { name: 'key', codec: string },
        2: { name: 'value', codec: bytes }
      })
    }

    return _codec
  }

  export const encode = (obj: Metadata): Uint8ArrayList => {
    return encodeMessage(obj, Metadata.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Metadata => {
    return decodeMessage(buf, Metadata.codec())
  }
}
