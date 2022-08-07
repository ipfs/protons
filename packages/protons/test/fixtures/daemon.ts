/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { enumeration, encodeMessage, decodeMessage, message, bytes, int64, string, int32 } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Request {
  type: Request.Type
  connect?: ConnectRequest
  streamOpen?: StreamOpenRequest
  streamHandler?: StreamHandlerRequest
  dht?: DHTRequest
  connManager?: ConnManagerRequest
  disconnect?: DisconnectRequest
  pubsub?: PSRequest
  peerStore?: PeerstoreRequest
}

export namespace Request {
  export enum Type {
    IDENTIFY = 'IDENTIFY',
    CONNECT = 'CONNECT',
    STREAM_OPEN = 'STREAM_OPEN',
    STREAM_HANDLER = 'STREAM_HANDLER',
    DHT = 'DHT',
    LIST_PEERS = 'LIST_PEERS',
    CONNMANAGER = 'CONNMANAGER',
    DISCONNECT = 'DISCONNECT',
    PUBSUB = 'PUBSUB',
    PEERSTORE = 'PEERSTORE'
  }

  enum __TypeValues {
    IDENTIFY = 0,
    CONNECT = 1,
    STREAM_OPEN = 2,
    STREAM_HANDLER = 3,
    DHT = 4,
    LIST_PEERS = 5,
    CONNMANAGER = 6,
    DISCONNECT = 7,
    PUBSUB = 8,
    PEERSTORE = 9
  }

  export namespace Type {
    export const codec = () => {
      return enumeration<typeof Type>(__TypeValues)
    }
  }

  let _codec: Codec<Request>

  export const codec = (): Codec<Request> => {
    if (_codec == null) {
      _codec = message<Request>([
        { id: 1, name: 'type', codec: Request.Type.codec() },
        { id: 2, name: 'connect', codec: ConnectRequest.codec(), optional: true },
        { id: 3, name: 'streamOpen', codec: StreamOpenRequest.codec(), optional: true },
        { id: 4, name: 'streamHandler', codec: StreamHandlerRequest.codec(), optional: true },
        { id: 5, name: 'dht', codec: DHTRequest.codec(), optional: true },
        { id: 6, name: 'connManager', codec: ConnManagerRequest.codec(), optional: true },
        { id: 7, name: 'disconnect', codec: DisconnectRequest.codec(), optional: true },
        { id: 8, name: 'pubsub', codec: PSRequest.codec(), optional: true },
        { id: 9, name: 'peerStore', codec: PeerstoreRequest.codec(), optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: Request): Uint8ArrayList => {
    return encodeMessage(obj, Request.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Request => {
    return decodeMessage(buf, Request.codec())
  }
}

export interface Response {
  type: Response.Type
  error?: ErrorResponse
  streamInfo?: StreamInfo
  identify?: IdentifyResponse
  dht?: DHTResponse
  peers: PeerInfo[]
  pubsub?: PSResponse
  peerStore?: PeerstoreResponse
}

export namespace Response {
  export enum Type {
    OK = 'OK',
    ERROR = 'ERROR'
  }

  enum __TypeValues {
    OK = 0,
    ERROR = 1
  }

  export namespace Type {
    export const codec = () => {
      return enumeration<typeof Type>(__TypeValues)
    }
  }

  let _codec: Codec<Response>

  export const codec = (): Codec<Response> => {
    if (_codec == null) {
      _codec = message<Response>([
        { id: 1, name: 'type', codec: Response.Type.codec() },
        { id: 2, name: 'error', codec: ErrorResponse.codec(), optional: true },
        { id: 3, name: 'streamInfo', codec: StreamInfo.codec(), optional: true },
        { id: 4, name: 'identify', codec: IdentifyResponse.codec(), optional: true },
        { id: 5, name: 'dht', codec: DHTResponse.codec(), optional: true },
        { id: 6, name: 'peers', codec: PeerInfo.codec(), repeats: true },
        { id: 7, name: 'pubsub', codec: PSResponse.codec(), optional: true },
        { id: 8, name: 'peerStore', codec: PeerstoreResponse.codec(), optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: Response): Uint8ArrayList => {
    return encodeMessage(obj, Response.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Response => {
    return decodeMessage(buf, Response.codec())
  }
}

export interface IdentifyResponse {
  id: Uint8Array
  addrs: Uint8Array[]
}

export namespace IdentifyResponse {
  let _codec: Codec<IdentifyResponse>

  export const codec = (): Codec<IdentifyResponse> => {
    if (_codec == null) {
      _codec = message<IdentifyResponse>([
        { id: 1, name: 'id', codec: bytes },
        { id: 2, name: 'addrs', codec: bytes, repeats: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: IdentifyResponse): Uint8ArrayList => {
    return encodeMessage(obj, IdentifyResponse.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): IdentifyResponse => {
    return decodeMessage(buf, IdentifyResponse.codec())
  }
}

export interface ConnectRequest {
  peer: Uint8Array
  addrs: Uint8Array[]
  timeout?: bigint
}

export namespace ConnectRequest {
  let _codec: Codec<ConnectRequest>

  export const codec = (): Codec<ConnectRequest> => {
    if (_codec == null) {
      _codec = message<ConnectRequest>([
        { id: 1, name: 'peer', codec: bytes },
        { id: 2, name: 'addrs', codec: bytes, repeats: true },
        { id: 3, name: 'timeout', codec: int64, optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: ConnectRequest): Uint8ArrayList => {
    return encodeMessage(obj, ConnectRequest.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ConnectRequest => {
    return decodeMessage(buf, ConnectRequest.codec())
  }
}

export interface StreamOpenRequest {
  peer: Uint8Array
  proto: string[]
  timeout?: bigint
}

export namespace StreamOpenRequest {
  let _codec: Codec<StreamOpenRequest>

  export const codec = (): Codec<StreamOpenRequest> => {
    if (_codec == null) {
      _codec = message<StreamOpenRequest>([
        { id: 1, name: 'peer', codec: bytes },
        { id: 2, name: 'proto', codec: string, repeats: true },
        { id: 3, name: 'timeout', codec: int64, optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: StreamOpenRequest): Uint8ArrayList => {
    return encodeMessage(obj, StreamOpenRequest.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): StreamOpenRequest => {
    return decodeMessage(buf, StreamOpenRequest.codec())
  }
}

export interface StreamHandlerRequest {
  addr: Uint8Array
  proto: string[]
}

export namespace StreamHandlerRequest {
  let _codec: Codec<StreamHandlerRequest>

  export const codec = (): Codec<StreamHandlerRequest> => {
    if (_codec == null) {
      _codec = message<StreamHandlerRequest>([
        { id: 1, name: 'addr', codec: bytes },
        { id: 2, name: 'proto', codec: string, repeats: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: StreamHandlerRequest): Uint8ArrayList => {
    return encodeMessage(obj, StreamHandlerRequest.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): StreamHandlerRequest => {
    return decodeMessage(buf, StreamHandlerRequest.codec())
  }
}

export interface ErrorResponse {
  msg: string
}

export namespace ErrorResponse {
  let _codec: Codec<ErrorResponse>

  export const codec = (): Codec<ErrorResponse> => {
    if (_codec == null) {
      _codec = message<ErrorResponse>([
        { id: 1, name: 'msg', codec: string }
      ])
    }

    return _codec
  }

  export const encode = (obj: ErrorResponse): Uint8ArrayList => {
    return encodeMessage(obj, ErrorResponse.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ErrorResponse => {
    return decodeMessage(buf, ErrorResponse.codec())
  }
}

export interface StreamInfo {
  peer: Uint8Array
  addr: Uint8Array
  proto: string
}

export namespace StreamInfo {
  let _codec: Codec<StreamInfo>

  export const codec = (): Codec<StreamInfo> => {
    if (_codec == null) {
      _codec = message<StreamInfo>([
        { id: 1, name: 'peer', codec: bytes },
        { id: 2, name: 'addr', codec: bytes },
        { id: 3, name: 'proto', codec: string }
      ])
    }

    return _codec
  }

  export const encode = (obj: StreamInfo): Uint8ArrayList => {
    return encodeMessage(obj, StreamInfo.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): StreamInfo => {
    return decodeMessage(buf, StreamInfo.codec())
  }
}

export interface DHTRequest {
  type: DHTRequest.Type
  peer?: Uint8Array
  cid?: Uint8Array
  key?: Uint8Array
  value?: Uint8Array
  count?: number
  timeout?: bigint
}

export namespace DHTRequest {
  export enum Type {
    FIND_PEER = 'FIND_PEER',
    FIND_PEERS_CONNECTED_TO_PEER = 'FIND_PEERS_CONNECTED_TO_PEER',
    FIND_PROVIDERS = 'FIND_PROVIDERS',
    GET_CLOSEST_PEERS = 'GET_CLOSEST_PEERS',
    GET_PUBLIC_KEY = 'GET_PUBLIC_KEY',
    GET_VALUE = 'GET_VALUE',
    SEARCH_VALUE = 'SEARCH_VALUE',
    PUT_VALUE = 'PUT_VALUE',
    PROVIDE = 'PROVIDE'
  }

  enum __TypeValues {
    FIND_PEER = 0,
    FIND_PEERS_CONNECTED_TO_PEER = 1,
    FIND_PROVIDERS = 2,
    GET_CLOSEST_PEERS = 3,
    GET_PUBLIC_KEY = 4,
    GET_VALUE = 5,
    SEARCH_VALUE = 6,
    PUT_VALUE = 7,
    PROVIDE = 8
  }

  export namespace Type {
    export const codec = () => {
      return enumeration<typeof Type>(__TypeValues)
    }
  }

  let _codec: Codec<DHTRequest>

  export const codec = (): Codec<DHTRequest> => {
    if (_codec == null) {
      _codec = message<DHTRequest>([
        { id: 1, name: 'type', codec: DHTRequest.Type.codec() },
        { id: 2, name: 'peer', codec: bytes, optional: true },
        { id: 3, name: 'cid', codec: bytes, optional: true },
        { id: 4, name: 'key', codec: bytes, optional: true },
        { id: 5, name: 'value', codec: bytes, optional: true },
        { id: 6, name: 'count', codec: int32, optional: true },
        { id: 7, name: 'timeout', codec: int64, optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: DHTRequest): Uint8ArrayList => {
    return encodeMessage(obj, DHTRequest.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): DHTRequest => {
    return decodeMessage(buf, DHTRequest.codec())
  }
}

export interface DHTResponse {
  type: DHTResponse.Type
  peer?: PeerInfo
  value?: Uint8Array
}

export namespace DHTResponse {
  export enum Type {
    BEGIN = 'BEGIN',
    VALUE = 'VALUE',
    END = 'END'
  }

  enum __TypeValues {
    BEGIN = 0,
    VALUE = 1,
    END = 2
  }

  export namespace Type {
    export const codec = () => {
      return enumeration<typeof Type>(__TypeValues)
    }
  }

  let _codec: Codec<DHTResponse>

  export const codec = (): Codec<DHTResponse> => {
    if (_codec == null) {
      _codec = message<DHTResponse>([
        { id: 1, name: 'type', codec: DHTResponse.Type.codec() },
        { id: 2, name: 'peer', codec: PeerInfo.codec(), optional: true },
        { id: 3, name: 'value', codec: bytes, optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: DHTResponse): Uint8ArrayList => {
    return encodeMessage(obj, DHTResponse.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): DHTResponse => {
    return decodeMessage(buf, DHTResponse.codec())
  }
}

export interface PeerInfo {
  id: Uint8Array
  addrs: Uint8Array[]
}

export namespace PeerInfo {
  let _codec: Codec<PeerInfo>

  export const codec = (): Codec<PeerInfo> => {
    if (_codec == null) {
      _codec = message<PeerInfo>([
        { id: 1, name: 'id', codec: bytes },
        { id: 2, name: 'addrs', codec: bytes, repeats: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: PeerInfo): Uint8ArrayList => {
    return encodeMessage(obj, PeerInfo.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): PeerInfo => {
    return decodeMessage(buf, PeerInfo.codec())
  }
}

export interface ConnManagerRequest {
  type: ConnManagerRequest.Type
  peer?: Uint8Array
  tag?: string
  weight?: bigint
}

export namespace ConnManagerRequest {
  export enum Type {
    TAG_PEER = 'TAG_PEER',
    UNTAG_PEER = 'UNTAG_PEER',
    TRIM = 'TRIM'
  }

  enum __TypeValues {
    TAG_PEER = 0,
    UNTAG_PEER = 1,
    TRIM = 2
  }

  export namespace Type {
    export const codec = () => {
      return enumeration<typeof Type>(__TypeValues)
    }
  }

  let _codec: Codec<ConnManagerRequest>

  export const codec = (): Codec<ConnManagerRequest> => {
    if (_codec == null) {
      _codec = message<ConnManagerRequest>([
        { id: 1, name: 'type', codec: ConnManagerRequest.Type.codec() },
        { id: 2, name: 'peer', codec: bytes, optional: true },
        { id: 3, name: 'tag', codec: string, optional: true },
        { id: 4, name: 'weight', codec: int64, optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: ConnManagerRequest): Uint8ArrayList => {
    return encodeMessage(obj, ConnManagerRequest.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ConnManagerRequest => {
    return decodeMessage(buf, ConnManagerRequest.codec())
  }
}

export interface DisconnectRequest {
  peer: Uint8Array
}

export namespace DisconnectRequest {
  let _codec: Codec<DisconnectRequest>

  export const codec = (): Codec<DisconnectRequest> => {
    if (_codec == null) {
      _codec = message<DisconnectRequest>([
        { id: 1, name: 'peer', codec: bytes }
      ])
    }

    return _codec
  }

  export const encode = (obj: DisconnectRequest): Uint8ArrayList => {
    return encodeMessage(obj, DisconnectRequest.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): DisconnectRequest => {
    return decodeMessage(buf, DisconnectRequest.codec())
  }
}

export interface PSRequest {
  type: PSRequest.Type
  topic?: string
  data?: Uint8Array
}

export namespace PSRequest {
  export enum Type {
    GET_TOPICS = 'GET_TOPICS',
    LIST_PEERS = 'LIST_PEERS',
    PUBLISH = 'PUBLISH',
    SUBSCRIBE = 'SUBSCRIBE'
  }

  enum __TypeValues {
    GET_TOPICS = 0,
    LIST_PEERS = 1,
    PUBLISH = 2,
    SUBSCRIBE = 3
  }

  export namespace Type {
    export const codec = () => {
      return enumeration<typeof Type>(__TypeValues)
    }
  }

  let _codec: Codec<PSRequest>

  export const codec = (): Codec<PSRequest> => {
    if (_codec == null) {
      _codec = message<PSRequest>([
        { id: 1, name: 'type', codec: PSRequest.Type.codec() },
        { id: 2, name: 'topic', codec: string, optional: true },
        { id: 3, name: 'data', codec: bytes, optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: PSRequest): Uint8ArrayList => {
    return encodeMessage(obj, PSRequest.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): PSRequest => {
    return decodeMessage(buf, PSRequest.codec())
  }
}

export interface PSMessage {
  from?: Uint8Array
  data?: Uint8Array
  seqno?: Uint8Array
  topicIDs: string[]
  signature?: Uint8Array
  key?: Uint8Array
}

export namespace PSMessage {
  let _codec: Codec<PSMessage>

  export const codec = (): Codec<PSMessage> => {
    if (_codec == null) {
      _codec = message<PSMessage>([
        { id: 1, name: 'from', codec: bytes, optional: true },
        { id: 2, name: 'data', codec: bytes, optional: true },
        { id: 3, name: 'seqno', codec: bytes, optional: true },
        { id: 4, name: 'topicIDs', codec: string, repeats: true },
        { id: 5, name: 'signature', codec: bytes, optional: true },
        { id: 6, name: 'key', codec: bytes, optional: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: PSMessage): Uint8ArrayList => {
    return encodeMessage(obj, PSMessage.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): PSMessage => {
    return decodeMessage(buf, PSMessage.codec())
  }
}

export interface PSResponse {
  topics: string[]
  peerIDs: Uint8Array[]
}

export namespace PSResponse {
  let _codec: Codec<PSResponse>

  export const codec = (): Codec<PSResponse> => {
    if (_codec == null) {
      _codec = message<PSResponse>([
        { id: 1, name: 'topics', codec: string, repeats: true },
        { id: 2, name: 'peerIDs', codec: bytes, repeats: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: PSResponse): Uint8ArrayList => {
    return encodeMessage(obj, PSResponse.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): PSResponse => {
    return decodeMessage(buf, PSResponse.codec())
  }
}

export interface PeerstoreRequest {
  type: PeerstoreRequest.Type
  id?: Uint8Array
  protos: string[]
}

export namespace PeerstoreRequest {
  export enum Type {
    GET_PROTOCOLS = 'GET_PROTOCOLS',
    GET_PEER_INFO = 'GET_PEER_INFO'
  }

  enum __TypeValues {
    GET_PROTOCOLS = 1,
    GET_PEER_INFO = 2
  }

  export namespace Type {
    export const codec = () => {
      return enumeration<typeof Type>(__TypeValues)
    }
  }

  let _codec: Codec<PeerstoreRequest>

  export const codec = (): Codec<PeerstoreRequest> => {
    if (_codec == null) {
      _codec = message<PeerstoreRequest>([
        { id: 1, name: 'type', codec: PeerstoreRequest.Type.codec() },
        { id: 2, name: 'id', codec: bytes, optional: true },
        { id: 3, name: 'protos', codec: string, repeats: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: PeerstoreRequest): Uint8ArrayList => {
    return encodeMessage(obj, PeerstoreRequest.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): PeerstoreRequest => {
    return decodeMessage(buf, PeerstoreRequest.codec())
  }
}

export interface PeerstoreResponse {
  peer?: PeerInfo
  protos: string[]
}

export namespace PeerstoreResponse {
  let _codec: Codec<PeerstoreResponse>

  export const codec = (): Codec<PeerstoreResponse> => {
    if (_codec == null) {
      _codec = message<PeerstoreResponse>([
        { id: 1, name: 'peer', codec: PeerInfo.codec(), optional: true },
        { id: 2, name: 'protos', codec: string, repeats: true }
      ])
    }

    return _codec
  }

  export const encode = (obj: PeerstoreResponse): Uint8ArrayList => {
    return encodeMessage(obj, PeerstoreResponse.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): PeerstoreResponse => {
    return decodeMessage(buf, PeerstoreResponse.codec())
  }
}
