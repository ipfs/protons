/* eslint-disable complexity */

import { decodeMessage, encodeMessage, MaxLengthError, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Peer {
  addresses: Address[]
  protocols: string[]
  metadata: Metadata[]
  pubKey?: Uint8Array
  peerRecordEnvelope?: Uint8Array
}

export namespace Peer {
  let _codec: Codec<Peer, PeerStreamEvent, PeerStreamCollectionsEvent>

  export const codec = (): Codec<Peer, PeerStreamEvent, PeerStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Peer, PeerStreamEvent, PeerStreamCollectionsEvent>((obj, w, opts = {}) => {
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
                throw new MaxLengthError('Decode error - map field "addresses" had too many elements')
              }

              obj.addresses.push(Address.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.addresses$
              }))
              break
            }
            case 2: {
              if (opts.limits?.protocols != null && obj.protocols.length === opts.limits.protocols) {
                throw new MaxLengthError('Decode error - map field "protocols" had too many elements')
              }

              obj.protocols.push(reader.string())
              break
            }
            case 3: {
              if (opts.limits?.metadata != null && obj.metadata.length === opts.limits.metadata) {
                throw new MaxLengthError('Decode error - map field "metadata" had too many elements')
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
      }, function * (reader, length, opts = {}) {
        let obj: any

        if (opts.emitCollections === true) {
          obj = {
            addresses: [],
            protocols: [],
            metadata: []
          }
        } else {
          obj = {
            addresses: 0,
            protocols: 0,
            metadata: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.addresses != null && (opts.emitCollections === true ? obj.addresses.length === opts.limits.addresses : obj.addresses === opts.limits.addresses)) {
                throw new MaxLengthError('Decode error - map field "addresses" had too many elements')
              }

              const value = Address.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.addresses$
              })

              yield {
                field: 'addresses$value',
                index: opts.emitCollections === true ? obj.addresses.length : obj.addresses,
                value
              }

              if (opts.emitCollections === true) {
                obj.addresses.push(value)
              } else {
                obj.addresses++
              }

              break
            }
            case 2: {
              if (opts.limits?.protocols != null && (opts.emitCollections === true ? obj.protocols.length === opts.limits.protocols : obj.protocols === opts.limits.protocols)) {
                throw new MaxLengthError('Decode error - map field "protocols" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'protocols$value',
                index: opts.emitCollections === true ? obj.protocols.length : obj.protocols,
                value
              }

              if (opts.emitCollections === true) {
                obj.protocols.push(value)
              } else {
                obj.protocols++
              }

              break
            }
            case 3: {
              if (opts.limits?.metadata != null && (opts.emitCollections === true ? obj.metadata.length === opts.limits.metadata : obj.metadata === opts.limits.metadata)) {
                throw new MaxLengthError('Decode error - map field "metadata" had too many elements')
              }

              const value = Metadata.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.metadata$
              })

              yield {
                field: 'metadata$value',
                index: opts.emitCollections === true ? obj.metadata.length : obj.metadata,
                value
              }

              if (opts.emitCollections === true) {
                obj.metadata.push(value)
              } else {
                obj.metadata++
              }

              break
            }
            case 4: {
              yield {
                field: 'pubKey',
                value: reader.bytes()
              }
              break
            }
            case 5: {
              yield {
                field: 'peerRecordEnvelope',
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

        if (opts.emitCollections === true) {
          for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value) || value instanceof Map) {
              yield {
                field: key,
                value
              }
            }
          }
        }
      })
    }

    return _codec
  }

  export interface PeerAddressesFieldEvent {
    field: 'addresses'
    value: Address[]
  }

  export interface PeerAddressesValueEvent {
    field: 'addresses$value'
    index: number
    value: Address
  }

  export interface PeerProtocolsFieldEvent {
    field: 'protocols'
    value: string[]
  }

  export interface PeerProtocolsValueEvent {
    field: 'protocols$value'
    index: number
    value: string
  }

  export interface PeerMetadataFieldEvent {
    field: 'metadata'
    value: Metadata[]
  }

  export interface PeerMetadataValueEvent {
    field: 'metadata$value'
    index: number
    value: Metadata
  }

  export interface PeerPubKeyFieldEvent {
    field: 'pubKey'
    value: Uint8Array
  }

  export interface PeerPeerRecordEnvelopeFieldEvent {
    field: 'peerRecordEnvelope'
    value: Uint8Array
  }

  export type PeerStreamEvent = PeerAddressesValueEvent | PeerProtocolsValueEvent | PeerMetadataValueEvent | PeerPubKeyFieldEvent | PeerPeerRecordEnvelopeFieldEvent
  export type PeerStreamCollectionsEvent = PeerAddressesFieldEvent | PeerProtocolsFieldEvent | PeerMetadataFieldEvent

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

export interface Address {
  multiaddr: Uint8Array
  isCertified?: boolean
}

export namespace Address {
  let _codec: Codec<Address, AddressStreamEvent, AddressStreamCollectionsEvent>

  export const codec = (): Codec<Address, AddressStreamEvent, AddressStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Address, AddressStreamEvent, AddressStreamCollectionsEvent>((obj, w, opts = {}) => {
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
      }, function * (reader, length, opts = {}) {
        let obj: any

        if (opts.emitCollections === true) {
          obj = {
            multiaddr: uint8ArrayAlloc(0)
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
                field: 'multiaddr',
                value: reader.bytes()
              }
              break
            }
            case 2: {
              yield {
                field: 'isCertified',
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

        if (opts.emitCollections === true) {
          for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value) || value instanceof Map) {
              yield {
                field: key,
                value
              }
            }
          }
        }
      })
    }

    return _codec
  }

  export interface AddressMultiaddrFieldEvent {
    field: 'multiaddr'
    value: Uint8Array
  }

  export interface AddressIsCertifiedFieldEvent {
    field: 'isCertified'
    value: boolean
  }

  export type AddressStreamEvent = AddressMultiaddrFieldEvent | AddressIsCertifiedFieldEvent
  export type AddressStreamCollectionsEvent = {}

  export function encode (obj: Partial<Address>): Uint8Array {
    return encodeMessage(obj, Address.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Address>): Address {
    return decodeMessage(buf, Address.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Address>): Generator<AddressStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Address>): Generator<AddressStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Address.codec(), opts)
  }
}

export interface Metadata {
  key: string
  value: Uint8Array
}

export namespace Metadata {
  let _codec: Codec<Metadata, MetadataStreamEvent, MetadataStreamCollectionsEvent>

  export const codec = (): Codec<Metadata, MetadataStreamEvent, MetadataStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Metadata, MetadataStreamEvent, MetadataStreamCollectionsEvent>((obj, w, opts = {}) => {
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
      }, function * (reader, length, opts = {}) {
        let obj: any

        if (opts.emitCollections === true) {
          obj = {
            key: '',
            value: uint8ArrayAlloc(0)
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
                field: 'key',
                value: reader.string()
              }
              break
            }
            case 2: {
              yield {
                field: 'value',
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

        if (opts.emitCollections === true) {
          for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value) || value instanceof Map) {
              yield {
                field: key,
                value
              }
            }
          }
        }
      })
    }

    return _codec
  }

  export interface MetadataKeyFieldEvent {
    field: 'key'
    value: string
  }

  export interface MetadataValueFieldEvent {
    field: 'value'
    value: Uint8Array
  }

  export type MetadataStreamEvent = MetadataKeyFieldEvent | MetadataValueFieldEvent
  export type MetadataStreamCollectionsEvent = {}

  export function encode (obj: Partial<Metadata>): Uint8Array {
    return encodeMessage(obj, Metadata.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Metadata>): Metadata {
    return decodeMessage(buf, Metadata.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Metadata>): Generator<MetadataStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Metadata>): Generator<MetadataStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Metadata.codec(), opts)
  }
}
