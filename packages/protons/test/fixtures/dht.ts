import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Record {
  key?: Uint8Array
  value?: Uint8Array
  author?: Uint8Array
  signature?: Uint8Array
  timeReceived?: string
}

export namespace Record {
  let _codec: Codec<Record>

  export const codec = (): Codec<Record> => {
    if (_codec == null) {
      _codec = message<Record>((obj, w, opts = {}) => {
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
      }, function * (reader, length, prefix, opts = {}) {
        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.key`,
                value: reader.bytes()
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
            case 3: {
              yield {
                field: `${prefix}.author`,
                value: reader.bytes()
              }
              break
            }
            case 4: {
              yield {
                field: `${prefix}.signature`,
                value: reader.bytes()
              }
              break
            }
            case 5: {
              yield {
                field: `${prefix}.timeReceived`,
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
      })
    }

    return _codec
  }

  export interface RecordKeyFieldEvent {
    field: '$.key'
    value: Uint8Array
  }

  export interface RecordValueFieldEvent {
    field: '$.value'
    value: Uint8Array
  }

  export interface RecordAuthorFieldEvent {
    field: '$.author'
    value: Uint8Array
  }

  export interface RecordSignatureFieldEvent {
    field: '$.signature'
    value: Uint8Array
  }

  export interface RecordTimeReceivedFieldEvent {
    field: '$.timeReceived'
    value: string
  }

  export function encode (obj: Partial<Record>): Uint8Array {
    return encodeMessage(obj, Record.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Record>): Record {
    return decodeMessage(buf, Record.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Record>): Generator<RecordKeyFieldEvent | RecordValueFieldEvent | RecordAuthorFieldEvent | RecordSignatureFieldEvent | RecordTimeReceivedFieldEvent> {
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
    export const codec = (): Codec<MessageType> => {
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
    export const codec = (): Codec<ConnectionType> => {
      return enumeration<ConnectionType>(__ConnectionTypeValues)
    }
  }

  export interface Peer {
    id?: Uint8Array
    addrs: Uint8Array[]
    connection?: Message.ConnectionType
  }

  export namespace Peer {
    let _codec: Codec<Peer>

    export const codec = (): Codec<Peer> => {
      if (_codec == null) {
        _codec = message<Peer>((obj, w, opts = {}) => {
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
                  throw new MaxLengthError('Decode error - repeated field "addrs" had too many elements')
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
        }, function * (reader, length, prefix, opts = {}) {
          const obj = {
            addrs: 0
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}.id`,
                  value: reader.bytes()
                }
                break
              }
              case 2: {
                if (opts.limits?.addrs != null && obj.addrs === opts.limits.addrs) {
                  throw new MaxLengthError('Streaming decode error - repeated field "addrs" had too many elements')
                }

                yield {
                  field: `${prefix}.addrs[]`,
                  index: obj.addrs,
                  value: reader.bytes()
                }

                obj.addrs++

                break
              }
              case 3: {
                yield {
                  field: `${prefix}.connection`,
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
        })
      }

      return _codec
    }

    export interface PeerIdFieldEvent {
      field: '$.id'
      value: Uint8Array
    }

    export interface PeerAddrsFieldEvent {
      field: '$.addrs[]'
      index: number
      value: Uint8Array
    }

    export interface PeerConnectionFieldEvent {
      field: '$.connection'
      value: Message.ConnectionType
    }

    export function encode (obj: Partial<Peer>): Uint8Array {
      return encodeMessage(obj, Peer.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Peer>): Peer {
      return decodeMessage(buf, Peer.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Peer>): Generator<PeerIdFieldEvent | PeerAddrsFieldEvent | PeerConnectionFieldEvent> {
      return streamMessage(buf, Peer.codec(), opts)
    }
  }

  let _codec: Codec<Message>

  export const codec = (): Codec<Message> => {
    if (_codec == null) {
      _codec = message<Message>((obj, w, opts = {}) => {
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
                throw new MaxLengthError('Decode error - repeated field "closerPeers" had too many elements')
              }

              obj.closerPeers.push(Message.Peer.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.closerPeers$
              }))
              break
            }
            case 9: {
              if (opts.limits?.providerPeers != null && obj.providerPeers.length === opts.limits.providerPeers) {
                throw new MaxLengthError('Decode error - repeated field "providerPeers" had too many elements')
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
      }, function * (reader, length, prefix, opts = {}) {
        const obj = {
          closerPeers: 0,
          providerPeers: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}.type`,
                value: Message.MessageType.codec().decode(reader)
              }
              break
            }
            case 10: {
              yield {
                field: `${prefix}.clusterLevelRaw`,
                value: reader.int32()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}.key`,
                value: reader.bytes()
              }
              break
            }
            case 3: {
              yield {
                field: `${prefix}.record`,
                value: reader.bytes()
              }
              break
            }
            case 8: {
              if (opts.limits?.closerPeers != null && obj.closerPeers === opts.limits.closerPeers) {
                throw new MaxLengthError('Streaming decode error - repeated field "closerPeers" had too many elements')
              }

              for (const evt of Message.Peer.codec().stream(reader, reader.uint32(), `${prefix}.closerPeers[]`, {
                limits: opts.limits?.closerPeers$
              })) {
                yield {
                  ...evt,
                  index: obj.closerPeers
                }
              }

              obj.closerPeers++

              break
            }
            case 9: {
              if (opts.limits?.providerPeers != null && obj.providerPeers === opts.limits.providerPeers) {
                throw new MaxLengthError('Streaming decode error - repeated field "providerPeers" had too many elements')
              }

              for (const evt of Message.Peer.codec().stream(reader, reader.uint32(), `${prefix}.providerPeers[]`, {
                limits: opts.limits?.providerPeers$
              })) {
                yield {
                  ...evt,
                  index: obj.providerPeers
                }
              }

              obj.providerPeers++

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

  export interface MessageTypeFieldEvent {
    field: '$.type'
    value: Message.MessageType
  }

  export interface MessageClusterLevelRawFieldEvent {
    field: '$.clusterLevelRaw'
    value: number
  }

  export interface MessageKeyFieldEvent {
    field: '$.key'
    value: Uint8Array
  }

  export interface MessageRecordFieldEvent {
    field: '$.record'
    value: Uint8Array
  }

  export interface MessageCloserPeersIdFieldEvent {
    field: '$.closerPeers[].id'
    value: Uint8Array
    index: number
  }

  export interface MessageCloserPeersAddrsFieldEvent {
    field: '$.closerPeers[].addrs[]'
    index: number
    value: Uint8Array
  }

  export interface MessageCloserPeersConnectionFieldEvent {
    field: '$.closerPeers[].connection'
    value: Message.ConnectionType
    index: number
  }

  export interface MessageProviderPeersIdFieldEvent {
    field: '$.providerPeers[].id'
    value: Uint8Array
    index: number
  }

  export interface MessageProviderPeersAddrsFieldEvent {
    field: '$.providerPeers[].addrs[]'
    index: number
    value: Uint8Array
  }

  export interface MessageProviderPeersConnectionFieldEvent {
    field: '$.providerPeers[].connection'
    value: Message.ConnectionType
    index: number
  }

  export function encode (obj: Partial<Message>): Uint8Array {
    return encodeMessage(obj, Message.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Message>): Message {
    return decodeMessage(buf, Message.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Message>): Generator<MessageTypeFieldEvent | MessageClusterLevelRawFieldEvent | MessageKeyFieldEvent | MessageRecordFieldEvent | MessageCloserPeersIdFieldEvent | MessageCloserPeersAddrsFieldEvent | MessageCloserPeersConnectionFieldEvent | MessageProviderPeersIdFieldEvent | MessageProviderPeersAddrsFieldEvent | MessageProviderPeersConnectionFieldEvent> {
    return streamMessage(buf, Message.codec(), opts)
  }
}
