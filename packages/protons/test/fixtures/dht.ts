/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, bytes, string, enumeration, int32 } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from 'uint8-varint'
import type { Codec } from 'protons-runtime'

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
      _codec = message<Record>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $key = obj.key
        if ($key != null) {
          const prefixField1 = Uint8Array.from([10])
          const encodedField1 = bytes.encode($key)
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

        const $author = obj.author
        if ($author != null) {
          const prefixField3 = Uint8Array.from([26])
          const encodedField3 = bytes.encode($author)
          bufs.push(prefixField3, ...encodedField3.bufs)
          length += prefixField3.byteLength + encodedField3.length
        }

        const $signature = obj.signature
        if ($signature != null) {
          const prefixField4 = Uint8Array.from([34])
          const encodedField4 = bytes.encode($signature)
          bufs.push(prefixField4, ...encodedField4.bufs)
          length += prefixField4.byteLength + encodedField4.length
        }

        const $timeReceived = obj.timeReceived
        if ($timeReceived != null) {
          const prefixField5 = Uint8Array.from([42])
          const encodedField5 = string.encode($timeReceived)
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
        '1': { name: 'key', codec: bytes, optional: true },
        '2': { name: 'value', codec: bytes, optional: true },
        '3': { name: 'author', codec: bytes, optional: true },
        '4': { name: 'signature', codec: bytes, optional: true },
        '5': { name: 'timeReceived', codec: string, optional: true }
      })
    }

    return _codec
  }

  export const encode = (obj: Record): Uint8ArrayList => {
    return encodeMessage(obj, Record.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Record => {
    return decodeMessage(buf, Record.codec())
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
    export const codec = () => {
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
    export const codec = () => {
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

          const $connection = obj.connection
          if ($connection != null) {
            const prefixField3 = Uint8Array.from([24])
            const encodedField3 = Message.ConnectionType.codec().encode($connection)
            bufs.push(prefixField3, ...encodedField3.bufs)
            length += prefixField3.byteLength + encodedField3.length
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
          '1': { name: 'id', codec: bytes, optional: true },
          '2': { name: 'addrs', codec: bytes, repeats: true },
          '3': { name: 'connection', codec: Message.ConnectionType.codec(), optional: true }
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

  let _codec: Codec<Message>

  export const codec = (): Codec<Message> => {
    if (_codec == null) {
      _codec = message<Message>((obj, opts = {}) => {
        const bufs: Uint8Array[] = []

        if (opts.lengthDelimited !== false) {
          // will hold length prefix
          bufs.push(new Uint8Array(0))
        }

        let length = 0
    
        const $type = obj.type
        if ($type != null) {
          const prefixField1 = Uint8Array.from([8])
          const encodedField1 = Message.MessageType.codec().encode($type)
          bufs.push(prefixField1, ...encodedField1.bufs)
          length += prefixField1.byteLength + encodedField1.length
        }

        const $clusterLevelRaw = obj.clusterLevelRaw
        if ($clusterLevelRaw != null) {
          const prefixField10 = Uint8Array.from([80])
          const encodedField10 = int32.encode($clusterLevelRaw)
          bufs.push(prefixField10, ...encodedField10.bufs)
          length += prefixField10.byteLength + encodedField10.length
        }

        const $key = obj.key
        if ($key != null) {
          const prefixField2 = Uint8Array.from([18])
          const encodedField2 = bytes.encode($key)
          bufs.push(prefixField2, ...encodedField2.bufs)
          length += prefixField2.byteLength + encodedField2.length
        }

        const $record = obj.record
        if ($record != null) {
          const prefixField3 = Uint8Array.from([26])
          const encodedField3 = bytes.encode($record)
          bufs.push(prefixField3, ...encodedField3.bufs)
          length += prefixField3.byteLength + encodedField3.length
        }

        const $closerPeers = obj.closerPeers
        if ($closerPeers != null) {
          for (const value of $closerPeers) {
            const prefixField8 = Uint8Array.from([66])
            const encodedField8 = Message.Peer.codec().encode(value)
            bufs.push(prefixField8, ...encodedField8.bufs)
            length += prefixField8.byteLength + encodedField8.length
          }
        }

        const $providerPeers = obj.providerPeers
        if ($providerPeers != null) {
          for (const value of $providerPeers) {
            const prefixField9 = Uint8Array.from([74])
            const encodedField9 = Message.Peer.codec().encode(value)
            bufs.push(prefixField9, ...encodedField9.bufs)
            length += prefixField9.byteLength + encodedField9.length
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
        '1': { name: 'type', codec: Message.MessageType.codec(), optional: true },
        '10': { name: 'clusterLevelRaw', codec: int32, optional: true },
        '2': { name: 'key', codec: bytes, optional: true },
        '3': { name: 'record', codec: bytes, optional: true },
        '8': { name: 'closerPeers', codec: Message.Peer.codec(), repeats: true },
        '9': { name: 'providerPeers', codec: Message.Peer.codec(), repeats: true }
      })
    }

    return _codec
  }

  export const encode = (obj: Message): Uint8ArrayList => {
    return encodeMessage(obj, Message.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Message => {
    return decodeMessage(buf, Message.codec())
  }
}
