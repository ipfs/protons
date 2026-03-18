/* eslint-disable complexity */

import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Record {
  key?: Uint8Array
  value?: Uint8Array
  author?: Uint8Array
  signature?: Uint8Array
  timeReceived?: string
}

export namespace Record {
  let _codec: Codec<Record, RecordStreamEvent, RecordStreamCollectionsEvent>

  export const codec = (): Codec<Record, RecordStreamEvent, RecordStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Record, RecordStreamEvent, RecordStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.key != null) {
          w.uint32(10)
          w.bytes(obj.key)
        }

        if (obj.value != null) {
          w.uint32(18)
          w.bytes(obj.value)
        }

        if (obj.author != null) {
          w.uint32(26)
          w.bytes(obj.author)
        }

        if (obj.signature != null) {
          w.uint32(34)
          w.bytes(obj.signature)
        }

        if (obj.timeReceived != null) {
          w.uint32(42)
          w.string(obj.timeReceived)
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
              obj.key = reader.bytes()
              break
            }
            case 2: {
              obj.value = reader.bytes()
              break
            }
            case 3: {
              obj.author = reader.bytes()
              break
            }
            case 4: {
              obj.signature = reader.bytes()
              break
            }
            case 5: {
              obj.timeReceived = reader.string()
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
                field: 'key',
                value: reader.bytes()
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
            case 3: {
              yield {
                field: 'author',
                value: reader.bytes()
              }
              break
            }
            case 4: {
              yield {
                field: 'signature',
                value: reader.bytes()
              }
              break
            }
            case 5: {
              yield {
                field: 'timeReceived',
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

  export interface RecordKeyFieldEvent {
    field: 'key'
    value: Uint8Array
  }

  export interface RecordValueFieldEvent {
    field: 'value'
    value: Uint8Array
  }

  export interface RecordAuthorFieldEvent {
    field: 'author'
    value: Uint8Array
  }

  export interface RecordSignatureFieldEvent {
    field: 'signature'
    value: Uint8Array
  }

  export interface RecordTimeReceivedFieldEvent {
    field: 'timeReceived'
    value: string
  }

  export type RecordStreamEvent = RecordKeyFieldEvent | RecordValueFieldEvent | RecordAuthorFieldEvent | RecordSignatureFieldEvent | RecordTimeReceivedFieldEvent
  export type RecordStreamCollectionsEvent = {}

  export function encode (obj: Partial<Record>): Uint8Array {
    return encodeMessage(obj, Record.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Record>): Record {
    return decodeMessage(buf, Record.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Record>): Generator<RecordStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Record>): Generator<RecordStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Record.codec(), opts)
  }
}

export interface Message {
  type?: Message.MessageType
  clusterLevelRaw?: number
  key?: Uint8Array
  record?: Uint8Array
  closerPeers: Message.Peer[]
  providerPeers: Message.Peer[]
}

export namespace Message {
  export enum MessageType {
    PUT_VALUE = 'PUT_VALUE',
    GET_VALUE = 'GET_VALUE',
    ADD_PROVIDER = 'ADD_PROVIDER',
    GET_PROVIDERS = 'GET_PROVIDERS',
    FIND_NODE = 'FIND_NODE',
    PING = 'PING'
  }

  enum __MessageTypeValues {
    PUT_VALUE = 0,
    GET_VALUE = 1,
    ADD_PROVIDER = 2,
    GET_PROVIDERS = 3,
    FIND_NODE = 4,
    PING = 5
  }

  export namespace MessageType {
    export const codec = (): Codec<MessageType, any, any> => {
      return enumeration<MessageType>(__MessageTypeValues)
    }
  }

  export enum ConnectionType {
    NOT_CONNECTED = 'NOT_CONNECTED',
    CONNECTED = 'CONNECTED',
    CAN_CONNECT = 'CAN_CONNECT',
    CANNOT_CONNECT = 'CANNOT_CONNECT'
  }

  enum __ConnectionTypeValues {
    NOT_CONNECTED = 0,
    CONNECTED = 1,
    CAN_CONNECT = 2,
    CANNOT_CONNECT = 3
  }

  export namespace ConnectionType {
    export const codec = (): Codec<ConnectionType, any, any> => {
      return enumeration<ConnectionType>(__ConnectionTypeValues)
    }
  }

  export interface Peer {
    id?: Uint8Array
    addrs: Uint8Array[]
    connection?: Message.ConnectionType
  }

  export namespace Peer {
    let _codec: Codec<Peer, PeerStreamEvent, PeerStreamCollectionsEvent>

    export const codec = (): Codec<Peer, PeerStreamEvent, PeerStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<Peer, PeerStreamEvent, PeerStreamCollectionsEvent>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.id != null) {
            w.uint32(10)
            w.bytes(obj.id)
          }

          if (obj.addrs != null) {
            for (const value of obj.addrs) {
              w.uint32(18)
              w.bytes(value)
            }
          }

          if (obj.connection != null) {
            w.uint32(24)
            Message.ConnectionType.codec().encode(obj.connection, w)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
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
              case 3: {
                obj.connection = Message.ConnectionType.codec().decode(reader)
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
              case 3: {
                yield {
                  field: 'connection',
                  value: Message.ConnectionType.codec().decode(reader)
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

    export interface PeerConnectionFieldEvent {
      field: 'connection'
      value: Message.ConnectionType
    }

    export type PeerStreamEvent = PeerIdFieldEvent | PeerAddrsValueEvent | PeerConnectionFieldEvent
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

  let _codec: Codec<Message, MessageStreamEvent, MessageStreamCollectionsEvent>

  export const codec = (): Codec<Message, MessageStreamEvent, MessageStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Message, MessageStreamEvent, MessageStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.type != null) {
          w.uint32(8)
          Message.MessageType.codec().encode(obj.type, w)
        }

        if (obj.clusterLevelRaw != null) {
          w.uint32(80)
          w.int32(obj.clusterLevelRaw)
        }

        if (obj.key != null) {
          w.uint32(18)
          w.bytes(obj.key)
        }

        if (obj.record != null) {
          w.uint32(26)
          w.bytes(obj.record)
        }

        if (obj.closerPeers != null) {
          for (const value of obj.closerPeers) {
            w.uint32(66)
            Message.Peer.codec().encode(value, w)
          }
        }

        if (obj.providerPeers != null) {
          for (const value of obj.providerPeers) {
            w.uint32(74)
            Message.Peer.codec().encode(value, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          closerPeers: [],
          providerPeers: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.type = Message.MessageType.codec().decode(reader)
              break
            }
            case 10: {
              obj.clusterLevelRaw = reader.int32()
              break
            }
            case 2: {
              obj.key = reader.bytes()
              break
            }
            case 3: {
              obj.record = reader.bytes()
              break
            }
            case 8: {
              if (opts.limits?.closerPeers != null && obj.closerPeers.length === opts.limits.closerPeers) {
                throw new MaxLengthError('Decode error - map field "closerPeers" had too many elements')
              }

              obj.closerPeers.push(Message.Peer.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.closerPeers$
              }))
              break
            }
            case 9: {
              if (opts.limits?.providerPeers != null && obj.providerPeers.length === opts.limits.providerPeers) {
                throw new MaxLengthError('Decode error - map field "providerPeers" had too many elements')
              }

              obj.providerPeers.push(Message.Peer.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.providerPeers$
              }))
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
            closerPeers: [],
            providerPeers: []
          }
        } else {
          obj = {
            closerPeers: 0,
            providerPeers: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'type',
                value: Message.MessageType.codec().decode(reader)
              }
              break
            }
            case 10: {
              yield {
                field: 'clusterLevelRaw',
                value: reader.int32()
              }
              break
            }
            case 2: {
              yield {
                field: 'key',
                value: reader.bytes()
              }
              break
            }
            case 3: {
              yield {
                field: 'record',
                value: reader.bytes()
              }
              break
            }
            case 8: {
              if (opts.limits?.closerPeers != null && (opts.emitCollections === true ? obj.closerPeers.length === opts.limits.closerPeers : obj.closerPeers === opts.limits.closerPeers)) {
                throw new MaxLengthError('Decode error - map field "closerPeers" had too many elements')
              }

              const value = Message.Peer.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.closerPeers$
              })

              yield {
                field: 'closerPeers$value',
                index: opts.emitCollections === true ? obj.closerPeers.length : obj.closerPeers,
                value
              }

              if (opts.emitCollections === true) {
                obj.closerPeers.push(value)
              } else {
                obj.closerPeers++
              }

              break
            }
            case 9: {
              if (opts.limits?.providerPeers != null && (opts.emitCollections === true ? obj.providerPeers.length === opts.limits.providerPeers : obj.providerPeers === opts.limits.providerPeers)) {
                throw new MaxLengthError('Decode error - map field "providerPeers" had too many elements')
              }

              const value = Message.Peer.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.providerPeers$
              })

              yield {
                field: 'providerPeers$value',
                index: opts.emitCollections === true ? obj.providerPeers.length : obj.providerPeers,
                value
              }

              if (opts.emitCollections === true) {
                obj.providerPeers.push(value)
              } else {
                obj.providerPeers++
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

  export interface MessageTypeFieldEvent {
    field: 'type'
    value: Message.MessageType
  }

  export interface MessageClusterLevelRawFieldEvent {
    field: 'clusterLevelRaw'
    value: number
  }

  export interface MessageKeyFieldEvent {
    field: 'key'
    value: Uint8Array
  }

  export interface MessageRecordFieldEvent {
    field: 'record'
    value: Uint8Array
  }

  export interface MessageCloserPeersFieldEvent {
    field: 'closerPeers'
    value: Message.Peer[]
  }

  export interface MessageCloserPeersValueEvent {
    field: 'closerPeers$value'
    index: number
    value: Message.Peer
  }

  export interface MessageProviderPeersFieldEvent {
    field: 'providerPeers'
    value: Message.Peer[]
  }

  export interface MessageProviderPeersValueEvent {
    field: 'providerPeers$value'
    index: number
    value: Message.Peer
  }

  export type MessageStreamEvent = MessageTypeFieldEvent | MessageClusterLevelRawFieldEvent | MessageKeyFieldEvent | MessageRecordFieldEvent | MessageCloserPeersValueEvent | MessageProviderPeersValueEvent
  export type MessageStreamCollectionsEvent = MessageCloserPeersFieldEvent | MessageProviderPeersFieldEvent

  export function encode (obj: Partial<Message>): Uint8Array {
    return encodeMessage(obj, Message.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Message>): Message {
    return decodeMessage(buf, Message.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Message>): Generator<MessageStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Message>): Generator<MessageStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Message.codec(), opts)
  }
}
