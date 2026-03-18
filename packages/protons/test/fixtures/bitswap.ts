/* eslint-disable complexity */

import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Message {
  wantlist?: Message.Wantlist
  blocks: Uint8Array[]
  payload: Message.Block[]
  blockPresences: Message.BlockPresence[]
  pendingBytes: number
}

export namespace Message {
  export interface Wantlist {
    entries: Message.Wantlist.Entry[]
    full: boolean
  }

  export namespace Wantlist {
    export enum WantType {
      Block = 'Block',
      Have = 'Have'
    }

    enum __WantTypeValues {
      Block = 0,
      Have = 1
    }

    export namespace WantType {
      export const codec = (): Codec<WantType, any, any> => {
        return enumeration<WantType>(__WantTypeValues)
      }
    }

    export interface Entry {
      block: Uint8Array
      priority: number
      cancel?: boolean
      wantType: Message.Wantlist.WantType
      sendDontHave: boolean
    }

    export namespace Entry {
      let _codec: Codec<Entry, EntryStreamEvent, EntryStreamCollectionsEvent>

      export const codec = (): Codec<Entry, EntryStreamEvent, EntryStreamCollectionsEvent> => {
        if (_codec == null) {
          _codec = message<Entry, EntryStreamEvent, EntryStreamCollectionsEvent>((obj, w, opts = {}) => {
            if (opts.lengthDelimited !== false) {
              w.fork()
            }

            if ((obj.block != null && obj.block.byteLength > 0)) {
              w.uint32(10)
              w.bytes(obj.block)
            }

            if ((obj.priority != null && obj.priority !== 0)) {
              w.uint32(16)
              w.int32(obj.priority)
            }

            if (obj.cancel != null) {
              w.uint32(24)
              w.bool(obj.cancel)
            }

            if (obj.wantType != null && __WantTypeValues[obj.wantType] !== 0) {
              w.uint32(32)
              Message.Wantlist.WantType.codec().encode(obj.wantType, w)
            }

            if ((obj.sendDontHave != null && obj.sendDontHave !== false)) {
              w.uint32(40)
              w.bool(obj.sendDontHave)
            }

            if (opts.lengthDelimited !== false) {
              w.ldelim()
            }
          }, (reader, length, opts = {}) => {
            const obj: any = {
              block: uint8ArrayAlloc(0),
              priority: 0,
              wantType: WantType.Block,
              sendDontHave: false
            }

            const end = length == null ? reader.len : reader.pos + length

            while (reader.pos < end) {
              const tag = reader.uint32()

              switch (tag >>> 3) {
                case 1: {
                  obj.block = reader.bytes()
                  break
                }
                case 2: {
                  obj.priority = reader.int32()
                  break
                }
                case 3: {
                  obj.cancel = reader.bool()
                  break
                }
                case 4: {
                  obj.wantType = Message.Wantlist.WantType.codec().decode(reader)
                  break
                }
                case 5: {
                  obj.sendDontHave = reader.bool()
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
                block: uint8ArrayAlloc(0),
                priority: 0,
                wantType: WantType.Block,
                sendDontHave: false
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
                    field: 'block',
                    value: reader.bytes()
                  }
                  break
                }
                case 2: {
                  yield {
                    field: 'priority',
                    value: reader.int32()
                  }
                  break
                }
                case 3: {
                  yield {
                    field: 'cancel',
                    value: reader.bool()
                  }
                  break
                }
                case 4: {
                  yield {
                    field: 'wantType',
                    value: Message.Wantlist.WantType.codec().decode(reader)
                  }
                  break
                }
                case 5: {
                  yield {
                    field: 'sendDontHave',
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

      export interface EntryBlockFieldEvent {
        field: 'block'
        value: Uint8Array
      }

      export interface EntryPriorityFieldEvent {
        field: 'priority'
        value: number
      }

      export interface EntryCancelFieldEvent {
        field: 'cancel'
        value: boolean
      }

      export interface EntryWantTypeFieldEvent {
        field: 'wantType'
        value: Message.Wantlist.WantType
      }

      export interface EntrySendDontHaveFieldEvent {
        field: 'sendDontHave'
        value: boolean
      }

      export type EntryStreamEvent = EntryBlockFieldEvent | EntryPriorityFieldEvent | EntryCancelFieldEvent | EntryWantTypeFieldEvent | EntrySendDontHaveFieldEvent
      export type EntryStreamCollectionsEvent = {}

      export function encode (obj: Partial<Entry>): Uint8Array {
        return encodeMessage(obj, Entry.codec())
      }

      export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Entry>): Entry {
        return decodeMessage(buf, Entry.codec(), opts)
      }

      export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Entry>): Generator<EntryStreamEvent>
      export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Entry>): Generator<EntryStreamCollectionsEvent>
      export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
        return streamMessage(buf, Entry.codec(), opts)
      }
    }

    let _codec: Codec<Wantlist, WantlistStreamEvent, WantlistStreamCollectionsEvent>

    export const codec = (): Codec<Wantlist, WantlistStreamEvent, WantlistStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<Wantlist, WantlistStreamEvent, WantlistStreamCollectionsEvent>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.entries != null) {
            for (const value of obj.entries) {
              w.uint32(10)
              Message.Wantlist.Entry.codec().encode(value, w)
            }
          }

          if ((obj.full != null && obj.full !== false)) {
            w.uint32(16)
            w.bool(obj.full)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            entries: [],
            full: false
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                if (opts.limits?.entries != null && obj.entries.length === opts.limits.entries) {
                  throw new MaxLengthError('Decode error - map field "entries" had too many elements')
                }

                obj.entries.push(Message.Wantlist.Entry.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.entries$
                }))
                break
              }
              case 2: {
                obj.full = reader.bool()
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
              entries: [],
              full: false
            }
          } else {
            obj = {
              entries: 0
            }
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                if (opts.limits?.entries != null && (opts.emitCollections === true ? obj.entries.length === opts.limits.entries : obj.entries === opts.limits.entries)) {
                  throw new MaxLengthError('Decode error - map field "entries" had too many elements')
                }

                const value = Message.Wantlist.Entry.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.entries$
                })

                yield {
                  field: 'entries$value',
                  index: opts.emitCollections === true ? obj.entries.length : obj.entries,
                  value
                }

                if (opts.emitCollections === true) {
                  obj.entries.push(value)
                } else {
                  obj.entries++
                }

                break
              }
              case 2: {
                yield {
                  field: 'full',
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

    export interface WantlistEntriesFieldEvent {
      field: 'entries'
      value: Message.Wantlist.Entry[]
    }

    export interface WantlistEntriesValueEvent {
      field: 'entries$value'
      index: number
      value: Message.Wantlist.Entry
    }

    export interface WantlistFullFieldEvent {
      field: 'full'
      value: boolean
    }

    export type WantlistStreamEvent = WantlistEntriesValueEvent | WantlistFullFieldEvent
    export type WantlistStreamCollectionsEvent = WantlistEntriesFieldEvent

    export function encode (obj: Partial<Wantlist>): Uint8Array {
      return encodeMessage(obj, Wantlist.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Wantlist>): Wantlist {
      return decodeMessage(buf, Wantlist.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Wantlist>): Generator<WantlistStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Wantlist>): Generator<WantlistStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, Wantlist.codec(), opts)
    }
  }

  export interface Block {
    prefix: Uint8Array
    data: Uint8Array
  }

  export namespace Block {
    let _codec: Codec<Block, BlockStreamEvent, BlockStreamCollectionsEvent>

    export const codec = (): Codec<Block, BlockStreamEvent, BlockStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<Block, BlockStreamEvent, BlockStreamCollectionsEvent>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.prefix != null && obj.prefix.byteLength > 0)) {
            w.uint32(10)
            w.bytes(obj.prefix)
          }

          if ((obj.data != null && obj.data.byteLength > 0)) {
            w.uint32(18)
            w.bytes(obj.data)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            prefix: uint8ArrayAlloc(0),
            data: uint8ArrayAlloc(0)
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.prefix = reader.bytes()
                break
              }
              case 2: {
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
              prefix: uint8ArrayAlloc(0),
              data: uint8ArrayAlloc(0)
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
                  field: 'prefix',
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

    export interface BlockPrefixFieldEvent {
      field: 'prefix'
      value: Uint8Array
    }

    export interface BlockDataFieldEvent {
      field: 'data'
      value: Uint8Array
    }

    export type BlockStreamEvent = BlockPrefixFieldEvent | BlockDataFieldEvent
    export type BlockStreamCollectionsEvent = {}

    export function encode (obj: Partial<Block>): Uint8Array {
      return encodeMessage(obj, Block.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Block>): Block {
      return decodeMessage(buf, Block.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Block>): Generator<BlockStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Block>): Generator<BlockStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, Block.codec(), opts)
    }
  }

  export enum BlockPresenceType {
    Have = 'Have',
    DontHave = 'DontHave'
  }

  enum __BlockPresenceTypeValues {
    Have = 0,
    DontHave = 1
  }

  export namespace BlockPresenceType {
    export const codec = (): Codec<BlockPresenceType, any, any> => {
      return enumeration<BlockPresenceType>(__BlockPresenceTypeValues)
    }
  }

  export interface BlockPresence {
    cid: Uint8Array
    type: Message.BlockPresenceType
  }

  export namespace BlockPresence {
    let _codec: Codec<BlockPresence, BlockPresenceStreamEvent, BlockPresenceStreamCollectionsEvent>

    export const codec = (): Codec<BlockPresence, BlockPresenceStreamEvent, BlockPresenceStreamCollectionsEvent> => {
      if (_codec == null) {
        _codec = message<BlockPresence, BlockPresenceStreamEvent, BlockPresenceStreamCollectionsEvent>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if ((obj.cid != null && obj.cid.byteLength > 0)) {
            w.uint32(10)
            w.bytes(obj.cid)
          }

          if (obj.type != null && __BlockPresenceTypeValues[obj.type] !== 0) {
            w.uint32(16)
            Message.BlockPresenceType.codec().encode(obj.type, w)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length, opts = {}) => {
          const obj: any = {
            cid: uint8ArrayAlloc(0),
            type: BlockPresenceType.Have
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.cid = reader.bytes()
                break
              }
              case 2: {
                obj.type = Message.BlockPresenceType.codec().decode(reader)
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
              cid: uint8ArrayAlloc(0),
              type: BlockPresenceType.Have
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
                  field: 'cid',
                  value: reader.bytes()
                }
                break
              }
              case 2: {
                yield {
                  field: 'type',
                  value: Message.BlockPresenceType.codec().decode(reader)
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

    export interface BlockPresenceCidFieldEvent {
      field: 'cid'
      value: Uint8Array
    }

    export interface BlockPresenceTypeFieldEvent {
      field: 'type'
      value: Message.BlockPresenceType
    }

    export type BlockPresenceStreamEvent = BlockPresenceCidFieldEvent | BlockPresenceTypeFieldEvent
    export type BlockPresenceStreamCollectionsEvent = {}

    export function encode (obj: Partial<BlockPresence>): Uint8Array {
      return encodeMessage(obj, BlockPresence.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<BlockPresence>): BlockPresence {
      return decodeMessage(buf, BlockPresence.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<BlockPresence>): Generator<BlockPresenceStreamEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<BlockPresence>): Generator<BlockPresenceStreamCollectionsEvent>
    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
      return streamMessage(buf, BlockPresence.codec(), opts)
    }
  }

  let _codec: Codec<Message, MessageStreamEvent, MessageStreamCollectionsEvent>

  export const codec = (): Codec<Message, MessageStreamEvent, MessageStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Message, MessageStreamEvent, MessageStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.wantlist != null) {
          w.uint32(10)
          Message.Wantlist.codec().encode(obj.wantlist, w)
        }

        if (obj.blocks != null) {
          for (const value of obj.blocks) {
            w.uint32(18)
            w.bytes(value)
          }
        }

        if (obj.payload != null) {
          for (const value of obj.payload) {
            w.uint32(26)
            Message.Block.codec().encode(value, w)
          }
        }

        if (obj.blockPresences != null) {
          for (const value of obj.blockPresences) {
            w.uint32(34)
            Message.BlockPresence.codec().encode(value, w)
          }
        }

        if ((obj.pendingBytes != null && obj.pendingBytes !== 0)) {
          w.uint32(40)
          w.int32(obj.pendingBytes)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          blocks: [],
          payload: [],
          blockPresences: [],
          pendingBytes: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.wantlist = Message.Wantlist.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.wantlist
              })
              break
            }
            case 2: {
              if (opts.limits?.blocks != null && obj.blocks.length === opts.limits.blocks) {
                throw new MaxLengthError('Decode error - map field "blocks" had too many elements')
              }

              obj.blocks.push(reader.bytes())
              break
            }
            case 3: {
              if (opts.limits?.payload != null && obj.payload.length === opts.limits.payload) {
                throw new MaxLengthError('Decode error - map field "payload" had too many elements')
              }

              obj.payload.push(Message.Block.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.payload$
              }))
              break
            }
            case 4: {
              if (opts.limits?.blockPresences != null && obj.blockPresences.length === opts.limits.blockPresences) {
                throw new MaxLengthError('Decode error - map field "blockPresences" had too many elements')
              }

              obj.blockPresences.push(Message.BlockPresence.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.blockPresences$
              }))
              break
            }
            case 5: {
              obj.pendingBytes = reader.int32()
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
            blocks: [],
            payload: [],
            blockPresences: [],
            pendingBytes: 0
          }
        } else {
          obj = {
            blocks: 0,
            payload: 0,
            blockPresences: 0
          }
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: 'wantlist',
                value: Message.Wantlist.codec().decode(reader, reader.uint32(), {
                  limits: opts.limits?.wantlist
                })
              }
              break
            }
            case 2: {
              if (opts.limits?.blocks != null && (opts.emitCollections === true ? obj.blocks.length === opts.limits.blocks : obj.blocks === opts.limits.blocks)) {
                throw new MaxLengthError('Decode error - map field "blocks" had too many elements')
              }

              const value = reader.bytes()

              yield {
                field: 'blocks$value',
                index: opts.emitCollections === true ? obj.blocks.length : obj.blocks,
                value
              }

              if (opts.emitCollections === true) {
                obj.blocks.push(value)
              } else {
                obj.blocks++
              }

              break
            }
            case 3: {
              if (opts.limits?.payload != null && (opts.emitCollections === true ? obj.payload.length === opts.limits.payload : obj.payload === opts.limits.payload)) {
                throw new MaxLengthError('Decode error - map field "payload" had too many elements')
              }

              const value = Message.Block.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.payload$
              })

              yield {
                field: 'payload$value',
                index: opts.emitCollections === true ? obj.payload.length : obj.payload,
                value
              }

              if (opts.emitCollections === true) {
                obj.payload.push(value)
              } else {
                obj.payload++
              }

              break
            }
            case 4: {
              if (opts.limits?.blockPresences != null && (opts.emitCollections === true ? obj.blockPresences.length === opts.limits.blockPresences : obj.blockPresences === opts.limits.blockPresences)) {
                throw new MaxLengthError('Decode error - map field "blockPresences" had too many elements')
              }

              const value = Message.BlockPresence.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.blockPresences$
              })

              yield {
                field: 'blockPresences$value',
                index: opts.emitCollections === true ? obj.blockPresences.length : obj.blockPresences,
                value
              }

              if (opts.emitCollections === true) {
                obj.blockPresences.push(value)
              } else {
                obj.blockPresences++
              }

              break
            }
            case 5: {
              yield {
                field: 'pendingBytes',
                value: reader.int32()
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

  export interface MessageWantlistFieldEvent {
    field: 'wantlist'
    value: Message.Wantlist
  }

  export interface MessageBlocksFieldEvent {
    field: 'blocks'
    value: Uint8Array[]
  }

  export interface MessageBlocksValueEvent {
    field: 'blocks$value'
    index: number
    value: Uint8Array
  }

  export interface MessagePayloadFieldEvent {
    field: 'payload'
    value: Message.Block[]
  }

  export interface MessagePayloadValueEvent {
    field: 'payload$value'
    index: number
    value: Message.Block
  }

  export interface MessageBlockPresencesFieldEvent {
    field: 'blockPresences'
    value: Message.BlockPresence[]
  }

  export interface MessageBlockPresencesValueEvent {
    field: 'blockPresences$value'
    index: number
    value: Message.BlockPresence
  }

  export interface MessagePendingBytesFieldEvent {
    field: 'pendingBytes'
    value: number
  }

  export type MessageStreamEvent = MessageWantlistFieldEvent | MessageBlocksValueEvent | MessagePayloadValueEvent | MessageBlockPresencesValueEvent | MessagePendingBytesFieldEvent
  export type MessageStreamCollectionsEvent = MessageBlocksFieldEvent | MessagePayloadFieldEvent | MessageBlockPresencesFieldEvent

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
