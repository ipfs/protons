import { decodeMessage, encodeMessage, MaxLengthError, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions } from 'protons-runtime'
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
      _codec = message<Peer>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.addresses != null) {
          for (const value of obj.addresses) {
            w.uint32(10)
            Address.codec().encode(value, w)
          }
        }

        if (obj.protocols != null) {
          for (const value of obj.protocols) {
            w.uint32(18)
            w.string(value)
          }
        }

        if (obj.metadata != null) {
          for (const value of obj.metadata) {
            w.uint32(26)
            Metadata.codec().encode(value, w)
          }
        }

        if (obj.pubKey != null) {
          w.uint32(34)
          w.bytes(obj.pubKey)
        }

        if (obj.peerRecordEnvelope != null) {
          w.uint32(42)
          w.bytes(obj.peerRecordEnvelope)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          addresses: [],
          protocols: [],
          metadata: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.addresses != null && obj.addresses.length === opts.limits.addresses) {
                throw new MaxLengthError('Decode error - repeated field "addresses" had too many elements')
              }

              obj.addresses.push(Address.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.addresses$
              }))
              break
            }
            case 2: {
              if (opts.limits?.protocols != null && obj.protocols.length === opts.limits.protocols) {
                throw new MaxLengthError('Decode error - repeated field "protocols" had too many elements')
              }

              obj.protocols.push(reader.string())
              break
            }
            case 3: {
              if (opts.limits?.metadata != null && obj.metadata.length === opts.limits.metadata) {
                throw new MaxLengthError('Decode error - repeated field "metadata" had too many elements')
              }

              obj.metadata.push(Metadata.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.metadata$
              }))
              break
            }
            case 4: {
              obj.pubKey = reader.bytes()
              break
            }
            case 5: {
              obj.peerRecordEnvelope = reader.bytes()
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
        const obj = {
          addresses: 0,
          protocols: 0,
          metadata: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.addresses != null && obj.addresses === opts.limits.addresses) {
                throw new MaxLengthError('Streaming decode error - repeated field "addresses" had too many elements')
              }

              for (const evt of Address.codec().stream(reader, reader.uint32(), `${prefix}.addresses[]`, {
                limits: opts.limits?.addresses$
              })) {
                yield {
                  ...evt,
                  index: obj.addresses
                }
              }

              obj.addresses++

              break
            }
            case 2: {
              if (opts.limits?.protocols != null && obj.protocols === opts.limits.protocols) {
                throw new MaxLengthError('Streaming decode error - repeated field "protocols" had too many elements')
              }

              yield {
                field: `${prefix}.protocols[]`,
                index: obj.protocols,
                value: reader.string()
              }

              obj.protocols++

              break
            }
            case 3: {
              if (opts.limits?.metadata != null && obj.metadata === opts.limits.metadata) {
                throw new MaxLengthError('Streaming decode error - repeated field "metadata" had too many elements')
              }

              for (const evt of Metadata.codec().stream(reader, reader.uint32(), `${prefix}.metadata[]`, {
                limits: opts.limits?.metadata$
              })) {
                yield {
                  ...evt,
                  index: obj.metadata
                }
              }

              obj.metadata++

              break
            }
            case 4: {
              yield {
                field: `${prefix}.pubKey`,
                value: reader.bytes()
              }
              break
            }
            case 5: {
              yield {
                field: `${prefix}.peerRecordEnvelope`,
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

  export interface PeerAddressesMultiaddrFieldEvent {
    field: '$.addresses[].multiaddr'
    value: Uint8Array
    index: number
  }

  export interface PeerAddressesIsCertifiedFieldEvent {
    field: '$.addresses[].isCertified'
    value: boolean
    index: number
  }

  export interface PeerProtocolsFieldEvent {
    field: '$.protocols[]'
    index: number
    value: string
  }

  export interface PeerMetadataKeyFieldEvent {
    field: '$.metadata[].key'
    value: string
    index: number
  }

  export interface PeerMetadataValueFieldEvent {
    field: '$.metadata[].value'
    value: Uint8Array
    index: number
  }

  export interface PeerPubKeyFieldEvent {
    field: '$.pubKey'
    value: Uint8Array
  }

  export interface PeerPeerRecordEnvelopeFieldEvent {
    field: '$.peerRecordEnvelope'
    value: Uint8Array
  }

  export function encode (obj: Partial<Peer>): Uint8Array {
    return encodeMessage(obj, Peer.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Peer>): Peer {
    return decodeMessage(buf, Peer.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Peer>): Generator<PeerAddressesMultiaddrFieldEvent | PeerAddressesIsCertifiedFieldEvent | PeerProtocolsFieldEvent | PeerMetadataKeyFieldEvent | PeerMetadataValueFieldEvent | PeerPubKeyFieldEvent | PeerPeerRecordEnvelopeFieldEvent> {
    return streamMessage(buf, Peer.codec(), opts)
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
      _codec = message<Address>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.multiaddr != null && obj.multiaddr.byteLength > 0)) {
          w.uint32(10)
          w.bytes(obj.multiaddr)
        }

        if (obj.isCertified != null) {
          w.uint32(16)
          w.bool(obj.isCertified)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          multiaddr: uint8ArrayAlloc(0)
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.multiaddr = reader.bytes()
              break
            }
            case 2: {
              obj.isCertified = reader.bool()
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
                field: `${prefix}.multiaddr`,
                value: reader.bytes()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}.isCertified`,
                value: reader.bool()
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

  export interface AddressMultiaddrFieldEvent {
    field: '$.multiaddr'
    value: Uint8Array
  }

  export interface AddressIsCertifiedFieldEvent {
    field: '$.isCertified'
    value: boolean
  }

  export function encode (obj: Partial<Address>): Uint8Array {
    return encodeMessage(obj, Address.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Address>): Address {
    return decodeMessage(buf, Address.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Address>): Generator<AddressMultiaddrFieldEvent | AddressIsCertifiedFieldEvent> {
    return streamMessage(buf, Address.codec(), opts)
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
      _codec = message<Metadata>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.key != null && obj.key !== '')) {
          w.uint32(10)
          w.string(obj.key)
        }

        if ((obj.value != null && obj.value.byteLength > 0)) {
          w.uint32(18)
          w.bytes(obj.value)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          key: '',
          value: uint8ArrayAlloc(0)
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.key = reader.string()
              break
            }
            case 2: {
              obj.value = reader.bytes()
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
                field: `${prefix}.key`,
                value: reader.string()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}.value`,
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

  export interface MetadataKeyFieldEvent {
    field: '$.key'
    value: string
  }

  export interface MetadataValueFieldEvent {
    field: '$.value'
    value: Uint8Array
  }

  export function encode (obj: Partial<Metadata>): Uint8Array {
    return encodeMessage(obj, Metadata.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Metadata>): Metadata {
    return decodeMessage(buf, Metadata.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Metadata>): Generator<MetadataKeyFieldEvent | MetadataValueFieldEvent> {
    return streamMessage(buf, Metadata.codec(), opts)
  }
}
