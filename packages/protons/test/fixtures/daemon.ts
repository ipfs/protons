/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { enumeration, encodeMessage, decodeMessage, message, bytes, int64, string, int32 } from 'protons-runtime'
import type { Codec } from 'protons-runtime'

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

  export const codec = (): Codec<Request> => {
    return message<Request>({
      1: { name: 'type', codec: Request.Type.codec() },
      2: { name: 'connect', codec: ConnectRequest.codec(), optional: true },
      3: { name: 'streamOpen', codec: StreamOpenRequest.codec(), optional: true },
      4: { name: 'streamHandler', codec: StreamHandlerRequest.codec(), optional: true },
      5: { name: 'dht', codec: DHTRequest.codec(), optional: true },
      6: { name: 'connManager', codec: ConnManagerRequest.codec(), optional: true },
      7: { name: 'disconnect', codec: DisconnectRequest.codec(), optional: true },
      8: { name: 'pubsub', codec: PSRequest.codec(), optional: true },
      9: { name: 'peerStore', codec: PeerstoreRequest.codec(), optional: true }
    })
  }

  export const encode = (obj: Request): Uint8Array => {
    return encodeMessage(obj, Request.codec())
  }

  export const decode = (buf: Uint8Array): Request => {
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

  export const codec = (): Codec<Response> => {
    return message<Response>({
      1: { name: 'type', codec: Response.Type.codec() },
      2: { name: 'error', codec: ErrorResponse.codec(), optional: true },
      3: { name: 'streamInfo', codec: StreamInfo.codec(), optional: true },
      4: { name: 'identify', codec: IdentifyResponse.codec(), optional: true },
      5: { name: 'dht', codec: DHTResponse.codec(), optional: true },
      6: { name: 'peers', codec: PeerInfo.codec(), repeats: true },
      7: { name: 'pubsub', codec: PSResponse.codec(), optional: true },
      8: { name: 'peerStore', codec: PeerstoreResponse.codec(), optional: true }
    })
  }

  export const encode = (obj: Response): Uint8Array => {
    return encodeMessage(obj, Response.codec())
  }

  export const decode = (buf: Uint8Array): Response => {
    return decodeMessage(buf, Response.codec())
  }
}

export interface IdentifyResponse {
  id: Uint8Array
  addrs: Uint8Array[]
}

export namespace IdentifyResponse {
  export const codec = (): Codec<IdentifyResponse> => {
    return message<IdentifyResponse>({
      1: { name: 'id', codec: bytes },
      2: { name: 'addrs', codec: bytes, repeats: true }
    })
  }

  export const encode = (obj: IdentifyResponse): Uint8Array => {
    return encodeMessage(obj, IdentifyResponse.codec())
  }

  export const decode = (buf: Uint8Array): IdentifyResponse => {
    return decodeMessage(buf, IdentifyResponse.codec())
  }
}

export interface ConnectRequest {
  peer: Uint8Array
  addrs: Uint8Array[]
  timeout?: bigint
}

export namespace ConnectRequest {
  export const codec = (): Codec<ConnectRequest> => {
    return message<ConnectRequest>({
      1: { name: 'peer', codec: bytes },
      2: { name: 'addrs', codec: bytes, repeats: true },
      3: { name: 'timeout', codec: int64, optional: true }
    })
  }

  export const encode = (obj: ConnectRequest): Uint8Array => {
    return encodeMessage(obj, ConnectRequest.codec())
  }

  export const decode = (buf: Uint8Array): ConnectRequest => {
    return decodeMessage(buf, ConnectRequest.codec())
  }
}

export interface StreamOpenRequest {
  peer: Uint8Array
  proto: string[]
  timeout?: bigint
}

export namespace StreamOpenRequest {
  export const codec = (): Codec<StreamOpenRequest> => {
    return message<StreamOpenRequest>({
      1: { name: 'peer', codec: bytes },
      2: { name: 'proto', codec: string, repeats: true },
      3: { name: 'timeout', codec: int64, optional: true }
    })
  }

  export const encode = (obj: StreamOpenRequest): Uint8Array => {
    return encodeMessage(obj, StreamOpenRequest.codec())
  }

  export const decode = (buf: Uint8Array): StreamOpenRequest => {
    return decodeMessage(buf, StreamOpenRequest.codec())
  }
}

export interface StreamHandlerRequest {
  addr: Uint8Array
  proto: string[]
}

export namespace StreamHandlerRequest {
  export const codec = (): Codec<StreamHandlerRequest> => {
    return message<StreamHandlerRequest>({
      1: { name: 'addr', codec: bytes },
      2: { name: 'proto', codec: string, repeats: true }
    })
  }

  export const encode = (obj: StreamHandlerRequest): Uint8Array => {
    return encodeMessage(obj, StreamHandlerRequest.codec())
  }

  export const decode = (buf: Uint8Array): StreamHandlerRequest => {
    return decodeMessage(buf, StreamHandlerRequest.codec())
  }
}

export interface ErrorResponse {
  msg: string
}

export namespace ErrorResponse {
  export const codec = (): Codec<ErrorResponse> => {
    return message<ErrorResponse>({
      1: { name: 'msg', codec: string }
    })
  }

  export const encode = (obj: ErrorResponse): Uint8Array => {
    return encodeMessage(obj, ErrorResponse.codec())
  }

  export const decode = (buf: Uint8Array): ErrorResponse => {
    return decodeMessage(buf, ErrorResponse.codec())
  }
}

export interface StreamInfo {
  peer: Uint8Array
  addr: Uint8Array
  proto: string
}

export namespace StreamInfo {
  export const codec = (): Codec<StreamInfo> => {
    return message<StreamInfo>({
      1: { name: 'peer', codec: bytes },
      2: { name: 'addr', codec: bytes },
      3: { name: 'proto', codec: string }
    })
  }

  export const encode = (obj: StreamInfo): Uint8Array => {
    return encodeMessage(obj, StreamInfo.codec())
  }

  export const decode = (buf: Uint8Array): StreamInfo => {
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

  export const codec = (): Codec<DHTRequest> => {
    return message<DHTRequest>({
      1: { name: 'type', codec: DHTRequest.Type.codec() },
      2: { name: 'peer', codec: bytes, optional: true },
      3: { name: 'cid', codec: bytes, optional: true },
      4: { name: 'key', codec: bytes, optional: true },
      5: { name: 'value', codec: bytes, optional: true },
      6: { name: 'count', codec: int32, optional: true },
      7: { name: 'timeout', codec: int64, optional: true }
    })
  }

  export const encode = (obj: DHTRequest): Uint8Array => {
    return encodeMessage(obj, DHTRequest.codec())
  }

  export const decode = (buf: Uint8Array): DHTRequest => {
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

  export const codec = (): Codec<DHTResponse> => {
    return message<DHTResponse>({
      1: { name: 'type', codec: DHTResponse.Type.codec() },
      2: { name: 'peer', codec: PeerInfo.codec(), optional: true },
      3: { name: 'value', codec: bytes, optional: true }
    })
  }

  export const encode = (obj: DHTResponse): Uint8Array => {
    return encodeMessage(obj, DHTResponse.codec())
  }

  export const decode = (buf: Uint8Array): DHTResponse => {
    return decodeMessage(buf, DHTResponse.codec())
  }
}

export interface PeerInfo {
  id: Uint8Array
  addrs: Uint8Array[]
}

export namespace PeerInfo {
  export const codec = (): Codec<PeerInfo> => {
    return message<PeerInfo>({
      1: { name: 'id', codec: bytes },
      2: { name: 'addrs', codec: bytes, repeats: true }
    })
  }

  export const encode = (obj: PeerInfo): Uint8Array => {
    return encodeMessage(obj, PeerInfo.codec())
  }

  export const decode = (buf: Uint8Array): PeerInfo => {
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

  export const codec = (): Codec<ConnManagerRequest> => {
    return message<ConnManagerRequest>({
      1: { name: 'type', codec: ConnManagerRequest.Type.codec() },
      2: { name: 'peer', codec: bytes, optional: true },
      3: { name: 'tag', codec: string, optional: true },
      4: { name: 'weight', codec: int64, optional: true }
    })
  }

  export const encode = (obj: ConnManagerRequest): Uint8Array => {
    return encodeMessage(obj, ConnManagerRequest.codec())
  }

  export const decode = (buf: Uint8Array): ConnManagerRequest => {
    return decodeMessage(buf, ConnManagerRequest.codec())
  }
}

export interface DisconnectRequest {
  peer: Uint8Array
}

export namespace DisconnectRequest {
  export const codec = (): Codec<DisconnectRequest> => {
    return message<DisconnectRequest>({
      1: { name: 'peer', codec: bytes }
    })
  }

  export const encode = (obj: DisconnectRequest): Uint8Array => {
    return encodeMessage(obj, DisconnectRequest.codec())
  }

  export const decode = (buf: Uint8Array): DisconnectRequest => {
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

  export const codec = (): Codec<PSRequest> => {
    return message<PSRequest>({
      1: { name: 'type', codec: PSRequest.Type.codec() },
      2: { name: 'topic', codec: string, optional: true },
      3: { name: 'data', codec: bytes, optional: true }
    })
  }

  export const encode = (obj: PSRequest): Uint8Array => {
    return encodeMessage(obj, PSRequest.codec())
  }

  export const decode = (buf: Uint8Array): PSRequest => {
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
  export const codec = (): Codec<PSMessage> => {
    return message<PSMessage>({
      1: { name: 'from', codec: bytes, optional: true },
      2: { name: 'data', codec: bytes, optional: true },
      3: { name: 'seqno', codec: bytes, optional: true },
      4: { name: 'topicIDs', codec: string, repeats: true },
      5: { name: 'signature', codec: bytes, optional: true },
      6: { name: 'key', codec: bytes, optional: true }
    })
  }

  export const encode = (obj: PSMessage): Uint8Array => {
    return encodeMessage(obj, PSMessage.codec())
  }

  export const decode = (buf: Uint8Array): PSMessage => {
    return decodeMessage(buf, PSMessage.codec())
  }
}

export interface PSResponse {
  topics: string[]
  peerIDs: Uint8Array[]
}

export namespace PSResponse {
  export const codec = (): Codec<PSResponse> => {
    return message<PSResponse>({
      1: { name: 'topics', codec: string, repeats: true },
      2: { name: 'peerIDs', codec: bytes, repeats: true }
    })
  }

  export const encode = (obj: PSResponse): Uint8Array => {
    return encodeMessage(obj, PSResponse.codec())
  }

  export const decode = (buf: Uint8Array): PSResponse => {
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

  export const codec = (): Codec<PeerstoreRequest> => {
    return message<PeerstoreRequest>({
      1: { name: 'type', codec: PeerstoreRequest.Type.codec() },
      2: { name: 'id', codec: bytes, optional: true },
      3: { name: 'protos', codec: string, repeats: true }
    })
  }

  export const encode = (obj: PeerstoreRequest): Uint8Array => {
    return encodeMessage(obj, PeerstoreRequest.codec())
  }

  export const decode = (buf: Uint8Array): PeerstoreRequest => {
    return decodeMessage(buf, PeerstoreRequest.codec())
  }
}

export interface PeerstoreResponse {
  peer?: PeerInfo
  protos: string[]
}

export namespace PeerstoreResponse {
  export const codec = (): Codec<PeerstoreResponse> => {
    return message<PeerstoreResponse>({
      1: { name: 'peer', codec: PeerInfo.codec(), optional: true },
      2: { name: 'protos', codec: string, repeats: true }
    })
  }

  export const encode = (obj: PeerstoreResponse): Uint8Array => {
    return encodeMessage(obj, PeerstoreResponse.codec())
  }

  export const decode = (buf: Uint8Array): PeerstoreResponse => {
    return decodeMessage(buf, PeerstoreResponse.codec())
  }
}
