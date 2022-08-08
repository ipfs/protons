/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, string, bytes, bool } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from 'uint8-varint'
import type { Codec } from 'protons-runtime'

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
      _codec = message<Peer>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $addresses = obj.addresses
        if ($addresses != null) {
          for (const value of $addresses) {
            const prefixField1 = Uint8Array.from([10])
            const encodedField1 = Address.codec().encode(value)
            bufs.push(prefixField1, ...encodedField1.bufs)
            length += prefixField1.byteLength + encodedField1.length
          }
        }

        const $protocols = obj.protocols
        if ($protocols != null) {
          for (const value of $protocols) {
            const prefixField2 = Uint8Array.from([18])
            const encodedField2 = string.encode(value)
            bufs.push(prefixField2, ...encodedField2.bufs)
            length += prefixField2.byteLength + encodedField2.length
          }
        }

        const $metadata = obj.metadata
        if ($metadata != null) {
          for (const value of $metadata) {
            const prefixField3 = Uint8Array.from([26])
            const encodedField3 = Metadata.codec().encode(value)
            bufs.push(prefixField3, ...encodedField3.bufs)
            length += prefixField3.byteLength + encodedField3.length
          }
        }

        const $pubKey = obj.pubKey
        if ($pubKey != null) {
          const prefixField4 = Uint8Array.from([34])
          const encodedField4 = bytes.encode($pubKey)
          bufs.push(prefixField4, ...encodedField4.bufs)
          length += prefixField4.byteLength + encodedField4.length
        }

        const $peerRecordEnvelope = obj.peerRecordEnvelope
        if ($peerRecordEnvelope != null) {
          const prefixField5 = Uint8Array.from([42])
          const encodedField5 = bytes.encode($peerRecordEnvelope)
          bufs.push(prefixField5, ...encodedField5.bufs)
          length += prefixField5.byteLength + encodedField5.length
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
        '1': { name: 'addresses', codec: Address.codec(), repeats: true },
        '2': { name: 'protocols', codec: string, repeats: true },
        '3': { name: 'metadata', codec: Metadata.codec(), repeats: true },
        '4': { name: 'pubKey', codec: bytes, optional: true },
        '5': { name: 'peerRecordEnvelope', codec: bytes, optional: true }
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
      _codec = message<Address>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $multiaddr = obj.multiaddr
        if ($multiaddr != null) {
          const prefixField1 = Uint8Array.from([10])
          const encodedField1 = bytes.encode($multiaddr)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        const $isCertified = obj.isCertified
        if ($isCertified != null) {
          const prefixField2 = Uint8Array.from([16])
          const encodedField2 = bool.encode($isCertified)
          bufs.push(prefixField2, ...encodedField2.bufs)
          length += prefixField2.byteLength + encodedField2.length
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
        '1': { name: 'multiaddr', codec: bytes },
        '2': { name: 'isCertified', codec: bool, optional: true }
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
      _codec = message<Metadata>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $key = obj.key
        if ($key != null) {
          const prefixField1 = Uint8Array.from([10])
          const encodedField1 = string.encode($key)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        const $value = obj.value
        if ($value != null) {
          const prefixField2 = Uint8Array.from([18])
          const encodedField2 = bytes.encode($value)
          bufs.push(prefixField2, ...encodedField2.bufs)
          length += prefixField2.byteLength + encodedField2.length
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
        '1': { name: 'key', codec: string },
        '2': { name: 'value', codec: bytes }
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
