/* eslint-disable complexity */

import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
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
    export const codec = (): Codec<Type, any, any> => {
      return enumeration<Type>(__TypeValues)
    }
  }

  let _codec: Codec<Request, RequestStreamEvent, RequestStreamCollectionsEvent>

  export const codec = (): Codec<Request, RequestStreamEvent, RequestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Request, RequestStreamEvent, RequestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.type != null && __TypeValues[obj.type] !== 0) {
          w.uint32(8)
          Request.Type.codec().encode(obj.type, w)
        }

        if (obj.connect != null) {
          w.uint32(18)
          ConnectRequest.codec().encode(obj.connect, w)
        }

        if (obj.streamOpen != null) {
          w.uint32(26)
          StreamOpenRequest.codec().encode(obj.streamOpen, w)
        }

        if (obj.streamHandler != null) {
          w.uint32(34)
          StreamHandlerRequest.codec().encode(obj.streamHandler, w)
        }

        if (obj.dht != null) {
          w.uint32(42)
          DHTRequest.codec().encode(obj.dht, w)
        }

        if (obj.connManager != null) {
          w.uint32(50)
          ConnManagerRequest.codec().encode(obj.connManager, w)
        }

        if (obj.disconnect != null) {
          w.uint32(58)
          DisconnectRequest.codec().encode(obj.disconnect, w)
        }

        if (obj.pubsub != null) {
          w.uint32(66)
          PSRequest.codec().encode(obj.pubsub, w)
        }

        if (obj.peerStore != null) {
          w.uint32(74)
          PeerstoreRequest.codec().encode(obj.peerStore, w)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          type: Type.IDENTIFY
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.type = Request.Type.codec().decode(reader)
              break
            }
            case 2: {
              obj.connect = ConnectRequest.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.connect
              })
              break
            }
            case 3: {
              obj.streamOpen = StreamOpenRequest.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.streamOpen
              })
              break
            }
            case 4: {
              obj.streamHandler = StreamHandlerRequest.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.streamHandler
              })
              break
            }
            case 5: {
              obj.dht = DHTRequest.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.dht
              })
              break
            }
            case 6: {
              obj.connManager = ConnManagerRequest.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.connManager
              })
              break
            }
            case 7: {
              obj.disconnect = DisconnectRequest.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.disconnect
              })
              break
            }
            case 8: {
              obj.pubsub = PSRequest.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.pubsub
              })
              break
            }
            case 9: {
              obj.peerStore = PeerstoreRequest.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.peerStore
              })
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
            type: Type.IDENTIFY
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
                field: 'type',
                value: Request.Type.codec().decode(reader)
              }
              break
            }
            case 2: {
              yield {
                field: 'connect',
                value: ConnectRequest.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.connect
                })
              }
              break
            }
            case 3: {
              yield {
                field: 'streamOpen',
                value: StreamOpenRequest.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.streamOpen
                })
              }
              break
            }
            case 4: {
              yield {
                field: 'streamHandler',
                value: StreamHandlerRequest.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.streamHandler
                })
              }
              break
            }
            case 5: {
              yield {
                field: 'dht',
                value: DHTRequest.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.dht
                })
              }
              break
            }
            case 6: {
              yield {
                field: 'connManager',
                value: ConnManagerRequest.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.connManager
                })
              }
              break
            }
            case 7: {
              yield {
                field: 'disconnect',
                value: DisconnectRequest.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.disconnect
                })
              }
              break
            }
            case 8: {
              yield {
                field: 'pubsub',
                value: PSRequest.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.pubsub
                })
              }
              break
            }
            case 9: {
              yield {
                field: 'peerStore',
                value: PeerstoreRequest.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.peerStore
                })
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

  export interface RequestTypeFieldEvent {
    field: 'type'
    value: Request.Type
  }

  export interface RequestConnectFieldEvent {
    field: 'connect'
    value: ConnectRequest
  }

  export interface RequestStreamOpenFieldEvent {
    field: 'streamOpen'
    value: StreamOpenRequest
  }

  export interface RequestStreamHandlerFieldEvent {
    field: 'streamHandler'
    value: StreamHandlerRequest
  }

  export interface RequestDhtFieldEvent {
    field: 'dht'
    value: DHTRequest
  }

  export interface RequestConnManagerFieldEvent {
    field: 'connManager'
    value: ConnManagerRequest
  }

  export interface RequestDisconnectFieldEvent {
    field: 'disconnect'
    value: DisconnectRequest
  }

  export interface RequestPubsubFieldEvent {
    field: 'pubsub'
    value: PSRequest
  }

  export interface RequestPeerStoreFieldEvent {
    field: 'peerStore'
    value: PeerstoreRequest
  }

  export type RequestStreamEvent = RequestTypeFieldEvent | RequestConnectFieldEvent | RequestStreamOpenFieldEvent | RequestStreamHandlerFieldEvent | RequestDhtFieldEvent | RequestConnManagerFieldEvent | RequestDisconnectFieldEvent | RequestPubsubFieldEvent | RequestPeerStoreFieldEvent
  export type RequestStreamCollectionsEvent = {}

  export function encode (obj: Partial<Request>): Uint8Array {
    return encodeMessage(obj, Request.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Request>): Request {
    return decodeMessage(buf, Request.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Request>): Generator<RequestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Request>): Generator<RequestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Request.codec(), opts)
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
    export const codec = (): Codec<Type, any, any> => {
      return enumeration<Type>(__TypeValues)
    }
  }

  let _codec: Codec<Response, ResponseStreamEvent, ResponseStreamCollectionsEvent>

  export const codec = (): Codec<Response, ResponseStreamEvent, ResponseStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Response, ResponseStreamEvent, ResponseStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.type != null && __TypeValues[obj.type] !== 0) {
          w.uint32(8)
          Response.Type.codec().encode(obj.type, w)
        }

        if (obj.error != null) {
          w.uint32(18)
          ErrorResponse.codec().encode(obj.error, w)
        }

        if (obj.streamInfo != null) {
          w.uint32(26)
          StreamInfo.codec().encode(obj.streamInfo, w)
        }

        if (obj.identify != null) {
          w.uint32(34)
          IdentifyResponse.codec().encode(obj.identify, w)
        }

        if (obj.dht != null) {
          w.uint32(42)
          DHTResponse.codec().encode(obj.dht, w)
        }

        if (obj.peers != null) {
          for (const value of obj.peers) {
            w.uint32(50)
            PeerInfo.codec().encode(value, w)
          }
        }

        if (obj.pubsub != null) {
          w.uint32(58)
          PSResponse.codec().encode(obj.pubsub, w)
        }

        if (obj.peerStore != null) {
          w.uint32(66)
          PeerstoreResponse.codec().encode(obj.peerStore, w)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          type: Type.OK,
          peers: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.type = Response.Type.codec().decode(reader)
              break
            }
            case 2: {
              obj.error = ErrorResponse.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.error
              })
              break
            }
            case 3: {
              obj.streamInfo = StreamInfo.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.streamInfo
              })
              break
            }
            case 4: {
              obj.identify = IdentifyResponse.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.identify
              })
              break
            }
            case 5: {
              obj.dht = DHTResponse.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.dht
              })
              break
            }
            case 6: {
              if (opts.limits?.peers != null && obj.peers.length === opts.limits.peers) {
                throw new MaxLengthError('Decode error - map field "peers" had too many elements')
              }

              obj.peers.push(PeerInfo.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.peers$
              }))
              break
            }
            case 7: {
              obj.pubsub = PSResponse.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.pubsub
              })
              break
            }
            case 8: {
              obj.peerStore = PeerstoreResponse.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.peerStore
              })
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
            type: Type.OK,
            peers: []
          }
        } else {
          obj = {
            peers: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'type',
                value: Response.Type.codec().decode(reader)
              }
              break
            }
            case 2: {
              yield {
                field: 'error',
                value: ErrorResponse.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.error
                })
              }
              break
            }
            case 3: {
              yield {
                field: 'streamInfo',
                value: StreamInfo.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.streamInfo
                })
              }
              break
            }
            case 4: {
              yield {
                field: 'identify',
                value: IdentifyResponse.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.identify
                })
              }
              break
            }
            case 5: {
              yield {
                field: 'dht',
                value: DHTResponse.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.dht
                })
              }
              break
            }
            case 6: {
              if (opts.limits?.peers != null && (opts.emitCollections === true ? obj.peers.length === opts.limits.peers : obj.peers === opts.limits.peers)) {
                throw new MaxLengthError('Decode error - map field "peers" had too many elements')
              }

              const value = PeerInfo.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.peers$
              })

              yield {
                field: 'peers$value',
                index: opts.emitCollections === true ? obj.peers.length : obj.peers,
                value
              }

              if (opts.emitCollections === true) {
                obj.peers.push(value)
              } else {
                obj.peers++
              }

              break
            }
            case 7: {
              yield {
                field: 'pubsub',
                value: PSResponse.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.pubsub
                })
              }
              break
            }
            case 8: {
              yield {
                field: 'peerStore',
                value: PeerstoreResponse.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.peerStore
                })
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

  export interface ResponseTypeFieldEvent {
    field: 'type'
    value: Response.Type
  }

  export interface ResponseErrorFieldEvent {
    field: 'error'
    value: ErrorResponse
  }

  export interface ResponseStreamInfoFieldEvent {
    field: 'streamInfo'
    value: StreamInfo
  }

  export interface ResponseIdentifyFieldEvent {
    field: 'identify'
    value: IdentifyResponse
  }

  export interface ResponseDhtFieldEvent {
    field: 'dht'
    value: DHTResponse
  }

  export interface ResponsePeersFieldEvent {
    field: 'peers'
    value: PeerInfo[]
  }

  export interface ResponsePeersValueEvent {
    field: 'peers$value'
    index: number
    value: PeerInfo
  }

  export interface ResponsePubsubFieldEvent {
    field: 'pubsub'
    value: PSResponse
  }

  export interface ResponsePeerStoreFieldEvent {
    field: 'peerStore'
    value: PeerstoreResponse
  }

  export type ResponseStreamEvent = ResponseTypeFieldEvent | ResponseErrorFieldEvent | ResponseStreamInfoFieldEvent | ResponseIdentifyFieldEvent | ResponseDhtFieldEvent | ResponsePeersValueEvent | ResponsePubsubFieldEvent | ResponsePeerStoreFieldEvent
  export type ResponseStreamCollectionsEvent = ResponsePeersFieldEvent

  export function encode (obj: Partial<Response>): Uint8Array {
    return encodeMessage(obj, Response.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Response>): Response {
    return decodeMessage(buf, Response.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Response>): Generator<ResponseStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Response>): Generator<ResponseStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Response.codec(), opts)
  }
}

export interface IdentifyResponse {
  id: Uint8Array
  addrs: Uint8Array[]
}

export namespace IdentifyResponse {
  let _codec: Codec<IdentifyResponse, IdentifyResponseStreamEvent, IdentifyResponseStreamCollectionsEvent>

  export const codec = (): Codec<IdentifyResponse, IdentifyResponseStreamEvent, IdentifyResponseStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<IdentifyResponse, IdentifyResponseStreamEvent, IdentifyResponseStreamCollectionsEvent>((obj, w, opts = {}) => {
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
          obj = {
            addrs: 0
          }
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
              if (opts.limits?.addrs != null && (opts.emitCollections === true ? obj.addrs.length === opts.limits.addrs : obj.addrs === opts.limits.addrs)) {
                throw new MaxLengthError('Decode error - map field "addrs" had too many elements')
              }

              const value = reader.bytes()

              yield {
                field: 'addrs$value',
                index: opts.emitCollections === true ? obj.addrs.length : obj.addrs,
                value
              }

              if (opts.emitCollections === true) {
                obj.addrs.push(value)
              } else {
                obj.addrs++
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

  export interface IdentifyResponseIdFieldEvent {
    field: 'id'
    value: Uint8Array
  }

  export interface IdentifyResponseAddrsFieldEvent {
    field: 'addrs'
    value: Uint8Array[]
  }

  export interface IdentifyResponseAddrsValueEvent {
    field: 'addrs$value'
    index: number
    value: Uint8Array
  }

  export type IdentifyResponseStreamEvent = IdentifyResponseIdFieldEvent | IdentifyResponseAddrsValueEvent
  export type IdentifyResponseStreamCollectionsEvent = IdentifyResponseAddrsFieldEvent

  export function encode (obj: Partial<IdentifyResponse>): Uint8Array {
    return encodeMessage(obj, IdentifyResponse.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<IdentifyResponse>): IdentifyResponse {
    return decodeMessage(buf, IdentifyResponse.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<IdentifyResponse>): Generator<IdentifyResponseStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<IdentifyResponse>): Generator<IdentifyResponseStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, IdentifyResponse.codec(), opts)
  }
}

export interface ConnectRequest {
  peer: Uint8Array
  addrs: Uint8Array[]
  timeout?: bigint
}

export namespace ConnectRequest {
  let _codec: Codec<ConnectRequest, ConnectRequestStreamEvent, ConnectRequestStreamCollectionsEvent>

  export const codec = (): Codec<ConnectRequest, ConnectRequestStreamEvent, ConnectRequestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<ConnectRequest, ConnectRequestStreamEvent, ConnectRequestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.peer != null && obj.peer.byteLength > 0)) {
          w.uint32(10)
          w.bytes(obj.peer)
        }

        if (obj.addrs != null) {
          for (const value of obj.addrs) {
            w.uint32(18)
            w.bytes(value)
          }
        }

        if (obj.timeout != null) {
          w.uint32(24)
          w.int64(obj.timeout)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          peer: uint8ArrayAlloc(0),
          addrs: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.peer = reader.bytes()
              break
            }
            case 2: {
              if (opts.limits?.addrs != null && obj.addrs.length === opts.limits.addrs) {
                throw new MaxLengthError('Decode error - map field "addrs" had too many elements')
              }

              obj.addrs.push(reader.bytes())
              break
            }
            case 3: {
              obj.timeout = reader.int64()
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
            peer: uint8ArrayAlloc(0),
            addrs: []
          }
        } else {
          obj = {
            addrs: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'peer',
                value: reader.bytes()
              }
              break
            }
            case 2: {
              if (opts.limits?.addrs != null && (opts.emitCollections === true ? obj.addrs.length === opts.limits.addrs : obj.addrs === opts.limits.addrs)) {
                throw new MaxLengthError('Decode error - map field "addrs" had too many elements')
              }

              const value = reader.bytes()

              yield {
                field: 'addrs$value',
                index: opts.emitCollections === true ? obj.addrs.length : obj.addrs,
                value
              }

              if (opts.emitCollections === true) {
                obj.addrs.push(value)
              } else {
                obj.addrs++
              }

              break
            }
            case 3: {
              yield {
                field: 'timeout',
                value: reader.int64()
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

  export interface ConnectRequestPeerFieldEvent {
    field: 'peer'
    value: Uint8Array
  }

  export interface ConnectRequestAddrsFieldEvent {
    field: 'addrs'
    value: Uint8Array[]
  }

  export interface ConnectRequestAddrsValueEvent {
    field: 'addrs$value'
    index: number
    value: Uint8Array
  }

  export interface ConnectRequestTimeoutFieldEvent {
    field: 'timeout'
    value: bigint
  }

  export type ConnectRequestStreamEvent = ConnectRequestPeerFieldEvent | ConnectRequestAddrsValueEvent | ConnectRequestTimeoutFieldEvent
  export type ConnectRequestStreamCollectionsEvent = ConnectRequestAddrsFieldEvent

  export function encode (obj: Partial<ConnectRequest>): Uint8Array {
    return encodeMessage(obj, ConnectRequest.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<ConnectRequest>): ConnectRequest {
    return decodeMessage(buf, ConnectRequest.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<ConnectRequest>): Generator<ConnectRequestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<ConnectRequest>): Generator<ConnectRequestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, ConnectRequest.codec(), opts)
  }
}

export interface StreamOpenRequest {
  peer: Uint8Array
  proto: string[]
  timeout?: bigint
}

export namespace StreamOpenRequest {
  let _codec: Codec<StreamOpenRequest, StreamOpenRequestStreamEvent, StreamOpenRequestStreamCollectionsEvent>

  export const codec = (): Codec<StreamOpenRequest, StreamOpenRequestStreamEvent, StreamOpenRequestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<StreamOpenRequest, StreamOpenRequestStreamEvent, StreamOpenRequestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.peer != null && obj.peer.byteLength > 0)) {
          w.uint32(10)
          w.bytes(obj.peer)
        }

        if (obj.proto != null) {
          for (const value of obj.proto) {
            w.uint32(18)
            w.string(value)
          }
        }

        if (obj.timeout != null) {
          w.uint32(24)
          w.int64(obj.timeout)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          peer: uint8ArrayAlloc(0),
          proto: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.peer = reader.bytes()
              break
            }
            case 2: {
              if (opts.limits?.proto != null && obj.proto.length === opts.limits.proto) {
                throw new MaxLengthError('Decode error - map field "proto" had too many elements')
              }

              obj.proto.push(reader.string())
              break
            }
            case 3: {
              obj.timeout = reader.int64()
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
            peer: uint8ArrayAlloc(0),
            proto: []
          }
        } else {
          obj = {
            proto: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'peer',
                value: reader.bytes()
              }
              break
            }
            case 2: {
              if (opts.limits?.proto != null && (opts.emitCollections === true ? obj.proto.length === opts.limits.proto : obj.proto === opts.limits.proto)) {
                throw new MaxLengthError('Decode error - map field "proto" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'proto$value',
                index: opts.emitCollections === true ? obj.proto.length : obj.proto,
                value
              }

              if (opts.emitCollections === true) {
                obj.proto.push(value)
              } else {
                obj.proto++
              }

              break
            }
            case 3: {
              yield {
                field: 'timeout',
                value: reader.int64()
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

  export interface StreamOpenRequestPeerFieldEvent {
    field: 'peer'
    value: Uint8Array
  }

  export interface StreamOpenRequestProtoFieldEvent {
    field: 'proto'
    value: string[]
  }

  export interface StreamOpenRequestProtoValueEvent {
    field: 'proto$value'
    index: number
    value: string
  }

  export interface StreamOpenRequestTimeoutFieldEvent {
    field: 'timeout'
    value: bigint
  }

  export type StreamOpenRequestStreamEvent = StreamOpenRequestPeerFieldEvent | StreamOpenRequestProtoValueEvent | StreamOpenRequestTimeoutFieldEvent
  export type StreamOpenRequestStreamCollectionsEvent = StreamOpenRequestProtoFieldEvent

  export function encode (obj: Partial<StreamOpenRequest>): Uint8Array {
    return encodeMessage(obj, StreamOpenRequest.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<StreamOpenRequest>): StreamOpenRequest {
    return decodeMessage(buf, StreamOpenRequest.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<StreamOpenRequest>): Generator<StreamOpenRequestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<StreamOpenRequest>): Generator<StreamOpenRequestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, StreamOpenRequest.codec(), opts)
  }
}

export interface StreamHandlerRequest {
  addr: Uint8Array
  proto: string[]
}

export namespace StreamHandlerRequest {
  let _codec: Codec<StreamHandlerRequest, StreamHandlerRequestStreamEvent, StreamHandlerRequestStreamCollectionsEvent>

  export const codec = (): Codec<StreamHandlerRequest, StreamHandlerRequestStreamEvent, StreamHandlerRequestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<StreamHandlerRequest, StreamHandlerRequestStreamEvent, StreamHandlerRequestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.addr != null && obj.addr.byteLength > 0)) {
          w.uint32(10)
          w.bytes(obj.addr)
        }

        if (obj.proto != null) {
          for (const value of obj.proto) {
            w.uint32(18)
            w.string(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          addr: uint8ArrayAlloc(0),
          proto: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.addr = reader.bytes()
              break
            }
            case 2: {
              if (opts.limits?.proto != null && obj.proto.length === opts.limits.proto) {
                throw new MaxLengthError('Decode error - map field "proto" had too many elements')
              }

              obj.proto.push(reader.string())
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
            addr: uint8ArrayAlloc(0),
            proto: []
          }
        } else {
          obj = {
            proto: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'addr',
                value: reader.bytes()
              }
              break
            }
            case 2: {
              if (opts.limits?.proto != null && (opts.emitCollections === true ? obj.proto.length === opts.limits.proto : obj.proto === opts.limits.proto)) {
                throw new MaxLengthError('Decode error - map field "proto" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'proto$value',
                index: opts.emitCollections === true ? obj.proto.length : obj.proto,
                value
              }

              if (opts.emitCollections === true) {
                obj.proto.push(value)
              } else {
                obj.proto++
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

  export interface StreamHandlerRequestAddrFieldEvent {
    field: 'addr'
    value: Uint8Array
  }

  export interface StreamHandlerRequestProtoFieldEvent {
    field: 'proto'
    value: string[]
  }

  export interface StreamHandlerRequestProtoValueEvent {
    field: 'proto$value'
    index: number
    value: string
  }

  export type StreamHandlerRequestStreamEvent = StreamHandlerRequestAddrFieldEvent | StreamHandlerRequestProtoValueEvent
  export type StreamHandlerRequestStreamCollectionsEvent = StreamHandlerRequestProtoFieldEvent

  export function encode (obj: Partial<StreamHandlerRequest>): Uint8Array {
    return encodeMessage(obj, StreamHandlerRequest.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<StreamHandlerRequest>): StreamHandlerRequest {
    return decodeMessage(buf, StreamHandlerRequest.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<StreamHandlerRequest>): Generator<StreamHandlerRequestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<StreamHandlerRequest>): Generator<StreamHandlerRequestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, StreamHandlerRequest.codec(), opts)
  }
}

export interface ErrorResponse {
  msg: string
}

export namespace ErrorResponse {
  let _codec: Codec<ErrorResponse, ErrorResponseStreamEvent, ErrorResponseStreamCollectionsEvent>

  export const codec = (): Codec<ErrorResponse, ErrorResponseStreamEvent, ErrorResponseStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<ErrorResponse, ErrorResponseStreamEvent, ErrorResponseStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.msg != null && obj.msg !== '')) {
          w.uint32(10)
          w.string(obj.msg)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          msg: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.msg = reader.string()
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
            msg: ''
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
                field: 'msg',
                value: reader.string()
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

  export interface ErrorResponseMsgFieldEvent {
    field: 'msg'
    value: string
  }

  export type ErrorResponseStreamEvent = ErrorResponseMsgFieldEvent
  export type ErrorResponseStreamCollectionsEvent = {}

  export function encode (obj: Partial<ErrorResponse>): Uint8Array {
    return encodeMessage(obj, ErrorResponse.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<ErrorResponse>): ErrorResponse {
    return decodeMessage(buf, ErrorResponse.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<ErrorResponse>): Generator<ErrorResponseStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<ErrorResponse>): Generator<ErrorResponseStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, ErrorResponse.codec(), opts)
  }
}

export interface StreamInfo {
  peer: Uint8Array
  addr: Uint8Array
  proto: string
}

export namespace StreamInfo {
  let _codec: Codec<StreamInfo, StreamInfoStreamEvent, StreamInfoStreamCollectionsEvent>

  export const codec = (): Codec<StreamInfo, StreamInfoStreamEvent, StreamInfoStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<StreamInfo, StreamInfoStreamEvent, StreamInfoStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.peer != null && obj.peer.byteLength > 0)) {
          w.uint32(10)
          w.bytes(obj.peer)
        }

        if ((obj.addr != null && obj.addr.byteLength > 0)) {
          w.uint32(18)
          w.bytes(obj.addr)
        }

        if ((obj.proto != null && obj.proto !== '')) {
          w.uint32(26)
          w.string(obj.proto)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          peer: uint8ArrayAlloc(0),
          addr: uint8ArrayAlloc(0),
          proto: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.peer = reader.bytes()
              break
            }
            case 2: {
              obj.addr = reader.bytes()
              break
            }
            case 3: {
              obj.proto = reader.string()
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
            peer: uint8ArrayAlloc(0),
            addr: uint8ArrayAlloc(0),
            proto: ''
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
                field: 'peer',
                value: reader.bytes()
              }
              break
            }
            case 2: {
              yield {
                field: 'addr',
                value: reader.bytes()
              }
              break
            }
            case 3: {
              yield {
                field: 'proto',
                value: reader.string()
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

  export interface StreamInfoPeerFieldEvent {
    field: 'peer'
    value: Uint8Array
  }

  export interface StreamInfoAddrFieldEvent {
    field: 'addr'
    value: Uint8Array
  }

  export interface StreamInfoProtoFieldEvent {
    field: 'proto'
    value: string
  }

  export type StreamInfoStreamEvent = StreamInfoPeerFieldEvent | StreamInfoAddrFieldEvent | StreamInfoProtoFieldEvent
  export type StreamInfoStreamCollectionsEvent = {}

  export function encode (obj: Partial<StreamInfo>): Uint8Array {
    return encodeMessage(obj, StreamInfo.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<StreamInfo>): StreamInfo {
    return decodeMessage(buf, StreamInfo.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<StreamInfo>): Generator<StreamInfoStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<StreamInfo>): Generator<StreamInfoStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, StreamInfo.codec(), opts)
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
    export const codec = (): Codec<Type, any, any> => {
      return enumeration<Type>(__TypeValues)
    }
  }

  let _codec: Codec<DHTRequest, DHTRequestStreamEvent, DHTRequestStreamCollectionsEvent>

  export const codec = (): Codec<DHTRequest, DHTRequestStreamEvent, DHTRequestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<DHTRequest, DHTRequestStreamEvent, DHTRequestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.type != null && __TypeValues[obj.type] !== 0) {
          w.uint32(8)
          DHTRequest.Type.codec().encode(obj.type, w)
        }

        if (obj.peer != null) {
          w.uint32(18)
          w.bytes(obj.peer)
        }

        if (obj.cid != null) {
          w.uint32(26)
          w.bytes(obj.cid)
        }

        if (obj.key != null) {
          w.uint32(34)
          w.bytes(obj.key)
        }

        if (obj.value != null) {
          w.uint32(42)
          w.bytes(obj.value)
        }

        if (obj.count != null) {
          w.uint32(48)
          w.int32(obj.count)
        }

        if (obj.timeout != null) {
          w.uint32(56)
          w.int64(obj.timeout)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          type: Type.FIND_PEER
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.type = DHTRequest.Type.codec().decode(reader)
              break
            }
            case 2: {
              obj.peer = reader.bytes()
              break
            }
            case 3: {
              obj.cid = reader.bytes()
              break
            }
            case 4: {
              obj.key = reader.bytes()
              break
            }
            case 5: {
              obj.value = reader.bytes()
              break
            }
            case 6: {
              obj.count = reader.int32()
              break
            }
            case 7: {
              obj.timeout = reader.int64()
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
            type: Type.FIND_PEER
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
                field: 'type',
                value: DHTRequest.Type.codec().decode(reader)
              }
              break
            }
            case 2: {
              yield {
                field: 'peer',
                value: reader.bytes()
              }
              break
            }
            case 3: {
              yield {
                field: 'cid',
                value: reader.bytes()
              }
              break
            }
            case 4: {
              yield {
                field: 'key',
                value: reader.bytes()
              }
              break
            }
            case 5: {
              yield {
                field: 'value',
                value: reader.bytes()
              }
              break
            }
            case 6: {
              yield {
                field: 'count',
                value: reader.int32()
              }
              break
            }
            case 7: {
              yield {
                field: 'timeout',
                value: reader.int64()
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

  export interface DHTRequestTypeFieldEvent {
    field: 'type'
    value: DHTRequest.Type
  }

  export interface DHTRequestPeerFieldEvent {
    field: 'peer'
    value: Uint8Array
  }

  export interface DHTRequestCidFieldEvent {
    field: 'cid'
    value: Uint8Array
  }

  export interface DHTRequestKeyFieldEvent {
    field: 'key'
    value: Uint8Array
  }

  export interface DHTRequestValueFieldEvent {
    field: 'value'
    value: Uint8Array
  }

  export interface DHTRequestCountFieldEvent {
    field: 'count'
    value: number
  }

  export interface DHTRequestTimeoutFieldEvent {
    field: 'timeout'
    value: bigint
  }

  export type DHTRequestStreamEvent = DHTRequestTypeFieldEvent | DHTRequestPeerFieldEvent | DHTRequestCidFieldEvent | DHTRequestKeyFieldEvent | DHTRequestValueFieldEvent | DHTRequestCountFieldEvent | DHTRequestTimeoutFieldEvent
  export type DHTRequestStreamCollectionsEvent = {}

  export function encode (obj: Partial<DHTRequest>): Uint8Array {
    return encodeMessage(obj, DHTRequest.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<DHTRequest>): DHTRequest {
    return decodeMessage(buf, DHTRequest.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<DHTRequest>): Generator<DHTRequestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<DHTRequest>): Generator<DHTRequestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, DHTRequest.codec(), opts)
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
    export const codec = (): Codec<Type, any, any> => {
      return enumeration<Type>(__TypeValues)
    }
  }

  let _codec: Codec<DHTResponse, DHTResponseStreamEvent, DHTResponseStreamCollectionsEvent>

  export const codec = (): Codec<DHTResponse, DHTResponseStreamEvent, DHTResponseStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<DHTResponse, DHTResponseStreamEvent, DHTResponseStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.type != null && __TypeValues[obj.type] !== 0) {
          w.uint32(8)
          DHTResponse.Type.codec().encode(obj.type, w)
        }

        if (obj.peer != null) {
          w.uint32(18)
          PeerInfo.codec().encode(obj.peer, w)
        }

        if (obj.value != null) {
          w.uint32(26)
          w.bytes(obj.value)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          type: Type.BEGIN
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.type = DHTResponse.Type.codec().decode(reader)
              break
            }
            case 2: {
              obj.peer = PeerInfo.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.peer
              })
              break
            }
            case 3: {
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
            type: Type.BEGIN
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
                field: 'type',
                value: DHTResponse.Type.codec().decode(reader)
              }
              break
            }
            case 2: {
              yield {
                field: 'peer',
                value: PeerInfo.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.peer
                })
              }
              break
            }
            case 3: {
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

  export interface DHTResponseTypeFieldEvent {
    field: 'type'
    value: DHTResponse.Type
  }

  export interface DHTResponsePeerFieldEvent {
    field: 'peer'
    value: PeerInfo
  }

  export interface DHTResponseValueFieldEvent {
    field: 'value'
    value: Uint8Array
  }

  export type DHTResponseStreamEvent = DHTResponseTypeFieldEvent | DHTResponsePeerFieldEvent | DHTResponseValueFieldEvent
  export type DHTResponseStreamCollectionsEvent = {}

  export function encode (obj: Partial<DHTResponse>): Uint8Array {
    return encodeMessage(obj, DHTResponse.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<DHTResponse>): DHTResponse {
    return decodeMessage(buf, DHTResponse.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<DHTResponse>): Generator<DHTResponseStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<DHTResponse>): Generator<DHTResponseStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, DHTResponse.codec(), opts)
  }
}

export interface PeerInfo {
  id: Uint8Array
  addrs: Uint8Array[]
}

export namespace PeerInfo {
  let _codec: Codec<PeerInfo, PeerInfoStreamEvent, PeerInfoStreamCollectionsEvent>

  export const codec = (): Codec<PeerInfo, PeerInfoStreamEvent, PeerInfoStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<PeerInfo, PeerInfoStreamEvent, PeerInfoStreamCollectionsEvent>((obj, w, opts = {}) => {
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
          obj = {
            addrs: 0
          }
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
              if (opts.limits?.addrs != null && (opts.emitCollections === true ? obj.addrs.length === opts.limits.addrs : obj.addrs === opts.limits.addrs)) {
                throw new MaxLengthError('Decode error - map field "addrs" had too many elements')
              }

              const value = reader.bytes()

              yield {
                field: 'addrs$value',
                index: opts.emitCollections === true ? obj.addrs.length : obj.addrs,
                value
              }

              if (opts.emitCollections === true) {
                obj.addrs.push(value)
              } else {
                obj.addrs++
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

  export interface PeerInfoIdFieldEvent {
    field: 'id'
    value: Uint8Array
  }

  export interface PeerInfoAddrsFieldEvent {
    field: 'addrs'
    value: Uint8Array[]
  }

  export interface PeerInfoAddrsValueEvent {
    field: 'addrs$value'
    index: number
    value: Uint8Array
  }

  export type PeerInfoStreamEvent = PeerInfoIdFieldEvent | PeerInfoAddrsValueEvent
  export type PeerInfoStreamCollectionsEvent = PeerInfoAddrsFieldEvent

  export function encode (obj: Partial<PeerInfo>): Uint8Array {
    return encodeMessage(obj, PeerInfo.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<PeerInfo>): PeerInfo {
    return decodeMessage(buf, PeerInfo.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<PeerInfo>): Generator<PeerInfoStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<PeerInfo>): Generator<PeerInfoStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, PeerInfo.codec(), opts)
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
    export const codec = (): Codec<Type, any, any> => {
      return enumeration<Type>(__TypeValues)
    }
  }

  let _codec: Codec<ConnManagerRequest, ConnManagerRequestStreamEvent, ConnManagerRequestStreamCollectionsEvent>

  export const codec = (): Codec<ConnManagerRequest, ConnManagerRequestStreamEvent, ConnManagerRequestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<ConnManagerRequest, ConnManagerRequestStreamEvent, ConnManagerRequestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.type != null && __TypeValues[obj.type] !== 0) {
          w.uint32(8)
          ConnManagerRequest.Type.codec().encode(obj.type, w)
        }

        if (obj.peer != null) {
          w.uint32(18)
          w.bytes(obj.peer)
        }

        if (obj.tag != null) {
          w.uint32(26)
          w.string(obj.tag)
        }

        if (obj.weight != null) {
          w.uint32(32)
          w.int64(obj.weight)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          type: Type.TAG_PEER
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.type = ConnManagerRequest.Type.codec().decode(reader)
              break
            }
            case 2: {
              obj.peer = reader.bytes()
              break
            }
            case 3: {
              obj.tag = reader.string()
              break
            }
            case 4: {
              obj.weight = reader.int64()
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
            type: Type.TAG_PEER
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
                field: 'type',
                value: ConnManagerRequest.Type.codec().decode(reader)
              }
              break
            }
            case 2: {
              yield {
                field: 'peer',
                value: reader.bytes()
              }
              break
            }
            case 3: {
              yield {
                field: 'tag',
                value: reader.string()
              }
              break
            }
            case 4: {
              yield {
                field: 'weight',
                value: reader.int64()
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

  export interface ConnManagerRequestTypeFieldEvent {
    field: 'type'
    value: ConnManagerRequest.Type
  }

  export interface ConnManagerRequestPeerFieldEvent {
    field: 'peer'
    value: Uint8Array
  }

  export interface ConnManagerRequestTagFieldEvent {
    field: 'tag'
    value: string
  }

  export interface ConnManagerRequestWeightFieldEvent {
    field: 'weight'
    value: bigint
  }

  export type ConnManagerRequestStreamEvent = ConnManagerRequestTypeFieldEvent | ConnManagerRequestPeerFieldEvent | ConnManagerRequestTagFieldEvent | ConnManagerRequestWeightFieldEvent
  export type ConnManagerRequestStreamCollectionsEvent = {}

  export function encode (obj: Partial<ConnManagerRequest>): Uint8Array {
    return encodeMessage(obj, ConnManagerRequest.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<ConnManagerRequest>): ConnManagerRequest {
    return decodeMessage(buf, ConnManagerRequest.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<ConnManagerRequest>): Generator<ConnManagerRequestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<ConnManagerRequest>): Generator<ConnManagerRequestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, ConnManagerRequest.codec(), opts)
  }
}

export interface DisconnectRequest {
  peer: Uint8Array
}

export namespace DisconnectRequest {
  let _codec: Codec<DisconnectRequest, DisconnectRequestStreamEvent, DisconnectRequestStreamCollectionsEvent>

  export const codec = (): Codec<DisconnectRequest, DisconnectRequestStreamEvent, DisconnectRequestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<DisconnectRequest, DisconnectRequestStreamEvent, DisconnectRequestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.peer != null && obj.peer.byteLength > 0)) {
          w.uint32(10)
          w.bytes(obj.peer)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          peer: uint8ArrayAlloc(0)
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.peer = reader.bytes()
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
            peer: uint8ArrayAlloc(0)
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
                field: 'peer',
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

  export interface DisconnectRequestPeerFieldEvent {
    field: 'peer'
    value: Uint8Array
  }

  export type DisconnectRequestStreamEvent = DisconnectRequestPeerFieldEvent
  export type DisconnectRequestStreamCollectionsEvent = {}

  export function encode (obj: Partial<DisconnectRequest>): Uint8Array {
    return encodeMessage(obj, DisconnectRequest.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<DisconnectRequest>): DisconnectRequest {
    return decodeMessage(buf, DisconnectRequest.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<DisconnectRequest>): Generator<DisconnectRequestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<DisconnectRequest>): Generator<DisconnectRequestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, DisconnectRequest.codec(), opts)
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
    export const codec = (): Codec<Type, any, any> => {
      return enumeration<Type>(__TypeValues)
    }
  }

  let _codec: Codec<PSRequest, PSRequestStreamEvent, PSRequestStreamCollectionsEvent>

  export const codec = (): Codec<PSRequest, PSRequestStreamEvent, PSRequestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<PSRequest, PSRequestStreamEvent, PSRequestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.type != null && __TypeValues[obj.type] !== 0) {
          w.uint32(8)
          PSRequest.Type.codec().encode(obj.type, w)
        }

        if (obj.topic != null) {
          w.uint32(18)
          w.string(obj.topic)
        }

        if (obj.data != null) {
          w.uint32(26)
          w.bytes(obj.data)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          type: Type.GET_TOPICS
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.type = PSRequest.Type.codec().decode(reader)
              break
            }
            case 2: {
              obj.topic = reader.string()
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
            type: Type.GET_TOPICS
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
                field: 'type',
                value: PSRequest.Type.codec().decode(reader)
              }
              break
            }
            case 2: {
              yield {
                field: 'topic',
                value: reader.string()
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

  export interface PSRequestTypeFieldEvent {
    field: 'type'
    value: PSRequest.Type
  }

  export interface PSRequestTopicFieldEvent {
    field: 'topic'
    value: string
  }

  export interface PSRequestDataFieldEvent {
    field: 'data'
    value: Uint8Array
  }

  export type PSRequestStreamEvent = PSRequestTypeFieldEvent | PSRequestTopicFieldEvent | PSRequestDataFieldEvent
  export type PSRequestStreamCollectionsEvent = {}

  export function encode (obj: Partial<PSRequest>): Uint8Array {
    return encodeMessage(obj, PSRequest.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<PSRequest>): PSRequest {
    return decodeMessage(buf, PSRequest.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<PSRequest>): Generator<PSRequestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<PSRequest>): Generator<PSRequestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, PSRequest.codec(), opts)
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
  let _codec: Codec<PSMessage, PSMessageStreamEvent, PSMessageStreamCollectionsEvent>

  export const codec = (): Codec<PSMessage, PSMessageStreamEvent, PSMessageStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<PSMessage, PSMessageStreamEvent, PSMessageStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.from != null) {
          w.uint32(10)
          w.bytes(obj.from)
        }

        if (obj.data != null) {
          w.uint32(18)
          w.bytes(obj.data)
        }

        if (obj.seqno != null) {
          w.uint32(26)
          w.bytes(obj.seqno)
        }

        if (obj.topicIDs != null) {
          for (const value of obj.topicIDs) {
            w.uint32(34)
            w.string(value)
          }
        }

        if (obj.signature != null) {
          w.uint32(42)
          w.bytes(obj.signature)
        }

        if (obj.key != null) {
          w.uint32(50)
          w.bytes(obj.key)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          topicIDs: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.from = reader.bytes()
              break
            }
            case 2: {
              obj.data = reader.bytes()
              break
            }
            case 3: {
              obj.seqno = reader.bytes()
              break
            }
            case 4: {
              if (opts.limits?.topicIDs != null && obj.topicIDs.length === opts.limits.topicIDs) {
                throw new MaxLengthError('Decode error - map field "topicIDs" had too many elements')
              }

              obj.topicIDs.push(reader.string())
              break
            }
            case 5: {
              obj.signature = reader.bytes()
              break
            }
            case 6: {
              obj.key = reader.bytes()
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
            topicIDs: []
          }
        } else {
          obj = {
            topicIDs: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'from',
                value: reader.bytes()
              }
              break
            }
            case 2: {
              yield {
                field: 'data',
                value: reader.bytes()
              }
              break
            }
            case 3: {
              yield {
                field: 'seqno',
                value: reader.bytes()
              }
              break
            }
            case 4: {
              if (opts.limits?.topicIDs != null && (opts.emitCollections === true ? obj.topicIDs.length === opts.limits.topicIDs : obj.topicIDs === opts.limits.topicIDs)) {
                throw new MaxLengthError('Decode error - map field "topicIDs" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'topicIDs$value',
                index: opts.emitCollections === true ? obj.topicIDs.length : obj.topicIDs,
                value
              }

              if (opts.emitCollections === true) {
                obj.topicIDs.push(value)
              } else {
                obj.topicIDs++
              }

              break
            }
            case 5: {
              yield {
                field: 'signature',
                value: reader.bytes()
              }
              break
            }
            case 6: {
              yield {
                field: 'key',
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

  export interface PSMessageFromFieldEvent {
    field: 'from'
    value: Uint8Array
  }

  export interface PSMessageDataFieldEvent {
    field: 'data'
    value: Uint8Array
  }

  export interface PSMessageSeqnoFieldEvent {
    field: 'seqno'
    value: Uint8Array
  }

  export interface PSMessageTopicIDsFieldEvent {
    field: 'topicIDs'
    value: string[]
  }

  export interface PSMessageTopicIDsValueEvent {
    field: 'topicIDs$value'
    index: number
    value: string
  }

  export interface PSMessageSignatureFieldEvent {
    field: 'signature'
    value: Uint8Array
  }

  export interface PSMessageKeyFieldEvent {
    field: 'key'
    value: Uint8Array
  }

  export type PSMessageStreamEvent = PSMessageFromFieldEvent | PSMessageDataFieldEvent | PSMessageSeqnoFieldEvent | PSMessageTopicIDsValueEvent | PSMessageSignatureFieldEvent | PSMessageKeyFieldEvent
  export type PSMessageStreamCollectionsEvent = PSMessageTopicIDsFieldEvent

  export function encode (obj: Partial<PSMessage>): Uint8Array {
    return encodeMessage(obj, PSMessage.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<PSMessage>): PSMessage {
    return decodeMessage(buf, PSMessage.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<PSMessage>): Generator<PSMessageStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<PSMessage>): Generator<PSMessageStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, PSMessage.codec(), opts)
  }
}

export interface PSResponse {
  topics: string[]
  peerIDs: Uint8Array[]
}

export namespace PSResponse {
  let _codec: Codec<PSResponse, PSResponseStreamEvent, PSResponseStreamCollectionsEvent>

  export const codec = (): Codec<PSResponse, PSResponseStreamEvent, PSResponseStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<PSResponse, PSResponseStreamEvent, PSResponseStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.topics != null) {
          for (const value of obj.topics) {
            w.uint32(10)
            w.string(value)
          }
        }

        if (obj.peerIDs != null) {
          for (const value of obj.peerIDs) {
            w.uint32(18)
            w.bytes(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          topics: [],
          peerIDs: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.topics != null && obj.topics.length === opts.limits.topics) {
                throw new MaxLengthError('Decode error - map field "topics" had too many elements')
              }

              obj.topics.push(reader.string())
              break
            }
            case 2: {
              if (opts.limits?.peerIDs != null && obj.peerIDs.length === opts.limits.peerIDs) {
                throw new MaxLengthError('Decode error - map field "peerIDs" had too many elements')
              }

              obj.peerIDs.push(reader.bytes())
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
            topics: [],
            peerIDs: []
          }
        } else {
          obj = {
            topics: 0,
            peerIDs: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.topics != null && (opts.emitCollections === true ? obj.topics.length === opts.limits.topics : obj.topics === opts.limits.topics)) {
                throw new MaxLengthError('Decode error - map field "topics" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'topics$value',
                index: opts.emitCollections === true ? obj.topics.length : obj.topics,
                value
              }

              if (opts.emitCollections === true) {
                obj.topics.push(value)
              } else {
                obj.topics++
              }

              break
            }
            case 2: {
              if (opts.limits?.peerIDs != null && (opts.emitCollections === true ? obj.peerIDs.length === opts.limits.peerIDs : obj.peerIDs === opts.limits.peerIDs)) {
                throw new MaxLengthError('Decode error - map field "peerIDs" had too many elements')
              }

              const value = reader.bytes()

              yield {
                field: 'peerIDs$value',
                index: opts.emitCollections === true ? obj.peerIDs.length : obj.peerIDs,
                value
              }

              if (opts.emitCollections === true) {
                obj.peerIDs.push(value)
              } else {
                obj.peerIDs++
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

  export interface PSResponseTopicsFieldEvent {
    field: 'topics'
    value: string[]
  }

  export interface PSResponseTopicsValueEvent {
    field: 'topics$value'
    index: number
    value: string
  }

  export interface PSResponsePeerIDsFieldEvent {
    field: 'peerIDs'
    value: Uint8Array[]
  }

  export interface PSResponsePeerIDsValueEvent {
    field: 'peerIDs$value'
    index: number
    value: Uint8Array
  }

  export type PSResponseStreamEvent = PSResponseTopicsValueEvent | PSResponsePeerIDsValueEvent
  export type PSResponseStreamCollectionsEvent = PSResponseTopicsFieldEvent | PSResponsePeerIDsFieldEvent

  export function encode (obj: Partial<PSResponse>): Uint8Array {
    return encodeMessage(obj, PSResponse.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<PSResponse>): PSResponse {
    return decodeMessage(buf, PSResponse.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<PSResponse>): Generator<PSResponseStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<PSResponse>): Generator<PSResponseStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, PSResponse.codec(), opts)
  }
}

export interface PeerstoreRequest {
  type: PeerstoreRequest.Type
  id?: Uint8Array
  protos: string[]
}

export namespace PeerstoreRequest {
  export enum Type {
    INVALID = 'INVALID',
    GET_PROTOCOLS = 'GET_PROTOCOLS',
    GET_PEER_INFO = 'GET_PEER_INFO'
  }

  enum __TypeValues {
    INVALID = 0,
    GET_PROTOCOLS = 1,
    GET_PEER_INFO = 2
  }

  export namespace Type {
    export const codec = (): Codec<Type, any, any> => {
      return enumeration<Type>(__TypeValues)
    }
  }

  let _codec: Codec<PeerstoreRequest, PeerstoreRequestStreamEvent, PeerstoreRequestStreamCollectionsEvent>

  export const codec = (): Codec<PeerstoreRequest, PeerstoreRequestStreamEvent, PeerstoreRequestStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<PeerstoreRequest, PeerstoreRequestStreamEvent, PeerstoreRequestStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.type != null && __TypeValues[obj.type] !== 0) {
          w.uint32(8)
          PeerstoreRequest.Type.codec().encode(obj.type, w)
        }

        if (obj.id != null) {
          w.uint32(18)
          w.bytes(obj.id)
        }

        if (obj.protos != null) {
          for (const value of obj.protos) {
            w.uint32(26)
            w.string(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          type: Type.INVALID,
          protos: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.type = PeerstoreRequest.Type.codec().decode(reader)
              break
            }
            case 2: {
              obj.id = reader.bytes()
              break
            }
            case 3: {
              if (opts.limits?.protos != null && obj.protos.length === opts.limits.protos) {
                throw new MaxLengthError('Decode error - map field "protos" had too many elements')
              }

              obj.protos.push(reader.string())
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
            type: Type.INVALID,
            protos: []
          }
        } else {
          obj = {
            protos: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'type',
                value: PeerstoreRequest.Type.codec().decode(reader)
              }
              break
            }
            case 2: {
              yield {
                field: 'id',
                value: reader.bytes()
              }
              break
            }
            case 3: {
              if (opts.limits?.protos != null && (opts.emitCollections === true ? obj.protos.length === opts.limits.protos : obj.protos === opts.limits.protos)) {
                throw new MaxLengthError('Decode error - map field "protos" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'protos$value',
                index: opts.emitCollections === true ? obj.protos.length : obj.protos,
                value
              }

              if (opts.emitCollections === true) {
                obj.protos.push(value)
              } else {
                obj.protos++
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

  export interface PeerstoreRequestTypeFieldEvent {
    field: 'type'
    value: PeerstoreRequest.Type
  }

  export interface PeerstoreRequestIdFieldEvent {
    field: 'id'
    value: Uint8Array
  }

  export interface PeerstoreRequestProtosFieldEvent {
    field: 'protos'
    value: string[]
  }

  export interface PeerstoreRequestProtosValueEvent {
    field: 'protos$value'
    index: number
    value: string
  }

  export type PeerstoreRequestStreamEvent = PeerstoreRequestTypeFieldEvent | PeerstoreRequestIdFieldEvent | PeerstoreRequestProtosValueEvent
  export type PeerstoreRequestStreamCollectionsEvent = PeerstoreRequestProtosFieldEvent

  export function encode (obj: Partial<PeerstoreRequest>): Uint8Array {
    return encodeMessage(obj, PeerstoreRequest.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<PeerstoreRequest>): PeerstoreRequest {
    return decodeMessage(buf, PeerstoreRequest.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<PeerstoreRequest>): Generator<PeerstoreRequestStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<PeerstoreRequest>): Generator<PeerstoreRequestStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, PeerstoreRequest.codec(), opts)
  }
}

export interface PeerstoreResponse {
  peer?: PeerInfo
  protos: string[]
}

export namespace PeerstoreResponse {
  let _codec: Codec<PeerstoreResponse, PeerstoreResponseStreamEvent, PeerstoreResponseStreamCollectionsEvent>

  export const codec = (): Codec<PeerstoreResponse, PeerstoreResponseStreamEvent, PeerstoreResponseStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<PeerstoreResponse, PeerstoreResponseStreamEvent, PeerstoreResponseStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.peer != null) {
          w.uint32(10)
          PeerInfo.codec().encode(obj.peer, w)
        }

        if (obj.protos != null) {
          for (const value of obj.protos) {
            w.uint32(18)
            w.string(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          protos: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.peer = PeerInfo.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.peer
              })
              break
            }
            case 2: {
              if (opts.limits?.protos != null && obj.protos.length === opts.limits.protos) {
                throw new MaxLengthError('Decode error - map field "protos" had too many elements')
              }

              obj.protos.push(reader.string())
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
            protos: []
          }
        } else {
          obj = {
            protos: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'peer',
                value: PeerInfo.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.peer
                })
              }
              break
            }
            case 2: {
              if (opts.limits?.protos != null && (opts.emitCollections === true ? obj.protos.length === opts.limits.protos : obj.protos === opts.limits.protos)) {
                throw new MaxLengthError('Decode error - map field "protos" had too many elements')
              }

              const value = reader.string()

              yield {
                field: 'protos$value',
                index: opts.emitCollections === true ? obj.protos.length : obj.protos,
                value
              }

              if (opts.emitCollections === true) {
                obj.protos.push(value)
              } else {
                obj.protos++
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

  export interface PeerstoreResponsePeerFieldEvent {
    field: 'peer'
    value: PeerInfo
  }

  export interface PeerstoreResponseProtosFieldEvent {
    field: 'protos'
    value: string[]
  }

  export interface PeerstoreResponseProtosValueEvent {
    field: 'protos$value'
    index: number
    value: string
  }

  export type PeerstoreResponseStreamEvent = PeerstoreResponsePeerFieldEvent | PeerstoreResponseProtosValueEvent
  export type PeerstoreResponseStreamCollectionsEvent = PeerstoreResponseProtosFieldEvent

  export function encode (obj: Partial<PeerstoreResponse>): Uint8Array {
    return encodeMessage(obj, PeerstoreResponse.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<PeerstoreResponse>): PeerstoreResponse {
    return decodeMessage(buf, PeerstoreResponse.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<PeerstoreResponse>): Generator<PeerstoreResponseStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<PeerstoreResponse>): Generator<PeerstoreResponseStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, PeerstoreResponse.codec(), opts)
  }
}
