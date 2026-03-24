import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions } from 'protons-runtime'
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
      export const codec = (): Codec<WantType> => {
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
      let _codec: Codec<Entry>

      export const codec = (): Codec<Entry> => {
        if (_codec == null) {
          _codec = message<Entry>((obj, w, opts = {}) => {
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
          }, function * (reader, length, prefix, opts = {}) {
            const end = length == null ? reader.len : reader.pos + length

            while (reader.pos < end) {
              const tag = reader.uint32()

              switch (tag >>> 3) {
                case 1: {
                  yield {
                    field: `${prefix != null ? `${prefix}` : '$'}.block`,
                    value: reader.bytes()
                  }
                  break
                }
                case 2: {
                  yield {
                    field: `${prefix != null ? `${prefix}` : '$'}.priority`,
                    value: reader.int32()
                  }
                  break
                }
                case 3: {
                  yield {
                    field: `${prefix != null ? `${prefix}` : '$'}.cancel`,
                    value: reader.bool()
                  }
                  break
                }
                case 4: {
                  yield {
                    field: `${prefix != null ? `${prefix}` : '$'}.wantType`,
                    value: Message.Wantlist.WantType.codec().decode(reader)
                  }
                  break
                }
                case 5: {
                  yield {
                    field: `${prefix != null ? `${prefix}` : '$'}.sendDontHave`,
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

      export interface EntryBlockFieldEvent {
        field: '$.block'
        value: Uint8Array
      }

      export interface EntryPriorityFieldEvent {
        field: '$.priority'
        value: number
      }

      export interface EntryCancelFieldEvent {
        field: '$.cancel'
        value: boolean
      }

      export interface EntryWantTypeFieldEvent {
        field: '$.wantType'
        value: Message.Wantlist.WantType
      }

      export interface EntrySendDontHaveFieldEvent {
        field: '$.sendDontHave'
        value: boolean
      }

      export function encode (obj: Partial<Entry>): Uint8Array {
        return encodeMessage(obj, Entry.codec())
      }

      export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Entry>): Entry {
        return decodeMessage(buf, Entry.codec(), opts)
      }

      export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Entry>): Generator<EntryBlockFieldEvent | EntryPriorityFieldEvent | EntryCancelFieldEvent | EntryWantTypeFieldEvent | EntrySendDontHaveFieldEvent> {
        return streamMessage(buf, Entry.codec(), opts)
      }
    }

    let _codec: Codec<Wantlist>

    export const codec = (): Codec<Wantlist> => {
      if (_codec == null) {
        _codec = message<Wantlist>((obj, w, opts = {}) => {
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
                  throw new MaxLengthError('Decode error - repeated field "entries" had too many elements')
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
        }, function * (reader, length, prefix, opts = {}) {
          const obj = {
            entries: 0
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                if (opts.limits?.entries != null && obj.entries === opts.limits.entries) {
                  throw new MaxLengthError('Streaming decode error - repeated field "entries" had too many elements')
                }

                for (const evt of Message.Wantlist.Entry.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}` : '$'}.entries[]`, {
                  limits: opts.limits?.entries$
                })) {
                  yield {
                    ...evt,
                    index: obj.entries
                  }
                }

                obj.entries++

                break
              }
              case 2: {
                yield {
                  field: `${prefix != null ? `${prefix}` : '$'}.full`,
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

    export interface WantlistEntriesBlockFieldEvent {
      field: '$.entries[].block'
      value: Uint8Array
      index: number
    }

    export interface WantlistEntriesPriorityFieldEvent {
      field: '$.entries[].priority'
      value: number
      index: number
    }

    export interface WantlistEntriesCancelFieldEvent {
      field: '$.entries[].cancel'
      value: boolean
      index: number
    }

    export interface WantlistEntriesWantTypeFieldEvent {
      field: '$.entries[].wantType'
      value: Message.Wantlist.WantType
      index: number
    }

    export interface WantlistEntriesSendDontHaveFieldEvent {
      field: '$.entries[].sendDontHave'
      value: boolean
      index: number
    }

    export interface WantlistFullFieldEvent {
      field: '$.full'
      value: boolean
    }

    export function encode (obj: Partial<Wantlist>): Uint8Array {
      return encodeMessage(obj, Wantlist.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Wantlist>): Wantlist {
      return decodeMessage(buf, Wantlist.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Wantlist>): Generator<WantlistEntriesBlockFieldEvent | WantlistEntriesPriorityFieldEvent | WantlistEntriesCancelFieldEvent | WantlistEntriesWantTypeFieldEvent | WantlistEntriesSendDontHaveFieldEvent | WantlistFullFieldEvent> {
      return streamMessage(buf, Wantlist.codec(), opts)
    }
  }

  export interface Block {
    prefix: Uint8Array
    data: Uint8Array
  }

  export namespace Block {
    let _codec: Codec<Block>

    export const codec = (): Codec<Block> => {
      if (_codec == null) {
        _codec = message<Block>((obj, w, opts = {}) => {
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
        }, function * (reader, length, prefix, opts = {}) {
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix != null ? `${prefix}` : '$'}.prefix`,
                  value: reader.bytes()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix != null ? `${prefix}` : '$'}.data`,
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

    export interface BlockPrefixFieldEvent {
      field: '$.prefix'
      value: Uint8Array
    }

    export interface BlockDataFieldEvent {
      field: '$.data'
      value: Uint8Array
    }

    export function encode (obj: Partial<Block>): Uint8Array {
      return encodeMessage(obj, Block.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Block>): Block {
      return decodeMessage(buf, Block.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Block>): Generator<BlockPrefixFieldEvent | BlockDataFieldEvent> {
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
    export const codec = (): Codec<BlockPresenceType> => {
      return enumeration<BlockPresenceType>(__BlockPresenceTypeValues)
    }
  }

  export interface BlockPresence {
    cid: Uint8Array
    type: Message.BlockPresenceType
  }

  export namespace BlockPresence {
    let _codec: Codec<BlockPresence>

    export const codec = (): Codec<BlockPresence> => {
      if (_codec == null) {
        _codec = message<BlockPresence>((obj, w, opts = {}) => {
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
        }, function * (reader, length, prefix, opts = {}) {
          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix != null ? `${prefix}` : '$'}.cid`,
                  value: reader.bytes()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix != null ? `${prefix}` : '$'}.type`,
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
        })
      }

      return _codec
    }

    export interface BlockPresenceCidFieldEvent {
      field: '$.cid'
      value: Uint8Array
    }

    export interface BlockPresenceTypeFieldEvent {
      field: '$.type'
      value: Message.BlockPresenceType
    }

    export function encode (obj: Partial<BlockPresence>): Uint8Array {
      return encodeMessage(obj, BlockPresence.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<BlockPresence>): BlockPresence {
      return decodeMessage(buf, BlockPresence.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<BlockPresence>): Generator<BlockPresenceCidFieldEvent | BlockPresenceTypeFieldEvent> {
      return streamMessage(buf, BlockPresence.codec(), opts)
    }
  }

  let _codec: Codec<Message>

  export const codec = (): Codec<Message> => {
    if (_codec == null) {
      _codec = message<Message>((obj, w, opts = {}) => {
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
                throw new MaxLengthError('Decode error - repeated field "blocks" had too many elements')
              }

              obj.blocks.push(reader.bytes())
              break
            }
            case 3: {
              if (opts.limits?.payload != null && obj.payload.length === opts.limits.payload) {
                throw new MaxLengthError('Decode error - repeated field "payload" had too many elements')
              }

              obj.payload.push(Message.Block.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.payload$
              }))
              break
            }
            case 4: {
              if (opts.limits?.blockPresences != null && obj.blockPresences.length === opts.limits.blockPresences) {
                throw new MaxLengthError('Decode error - repeated field "blockPresences" had too many elements')
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
      }, function * (reader, length, prefix, opts = {}) {
        const obj = {
          blocks: 0,
          payload: 0,
          blockPresences: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield * Message.Wantlist.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}` : '$'}.wantlist`, {
                limits: opts.limits?.wantlist
              })

              break
            }
            case 2: {
              if (opts.limits?.blocks != null && obj.blocks === opts.limits.blocks) {
                throw new MaxLengthError('Streaming decode error - repeated field "blocks" had too many elements')
              }

              yield {
                field: `${prefix != null ? `${prefix}` : '$'}.blocks[]`,
                index: obj.blocks,
                value: reader.bytes()
              }

              obj.blocks++

              break
            }
            case 3: {
              if (opts.limits?.payload != null && obj.payload === opts.limits.payload) {
                throw new MaxLengthError('Streaming decode error - repeated field "payload" had too many elements')
              }

              for (const evt of Message.Block.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}` : '$'}.payload[]`, {
                limits: opts.limits?.payload$
              })) {
                yield {
                  ...evt,
                  index: obj.payload
                }
              }

              obj.payload++

              break
            }
            case 4: {
              if (opts.limits?.blockPresences != null && obj.blockPresences === opts.limits.blockPresences) {
                throw new MaxLengthError('Streaming decode error - repeated field "blockPresences" had too many elements')
              }

              for (const evt of Message.BlockPresence.codec().stream(reader, reader.uint32(), `${prefix != null ? `${prefix}` : '$'}.blockPresences[]`, {
                limits: opts.limits?.blockPresences$
              })) {
                yield {
                  ...evt,
                  index: obj.blockPresences
                }
              }

              obj.blockPresences++

              break
            }
            case 5: {
              yield {
                field: `${prefix != null ? `${prefix}` : '$'}.pendingBytes`,
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
      })
    }

    return _codec
  }

  export interface MessageWantlistEntriesBlockFieldEvent {
    field: '$.wantlist.entries[].block'
    value: Uint8Array
    index: number
  }

  export interface MessageWantlistEntriesPriorityFieldEvent {
    field: '$.wantlist.entries[].priority'
    value: number
    index: number
  }

  export interface MessageWantlistEntriesCancelFieldEvent {
    field: '$.wantlist.entries[].cancel'
    value: boolean
    index: number
  }

  export interface MessageWantlistEntriesWantTypeFieldEvent {
    field: '$.wantlist.entries[].wantType'
    value: Message.Wantlist.WantType
    index: number
  }

  export interface MessageWantlistEntriesSendDontHaveFieldEvent {
    field: '$.wantlist.entries[].sendDontHave'
    value: boolean
    index: number
  }

  export interface MessageWantlistFullFieldEvent {
    field: '$.wantlist.full'
    value: boolean
  }

  export interface MessageBlocksFieldEvent {
    field: '$.blocks[]'
    index: number
    value: Uint8Array
  }

  export interface MessagePayloadPrefixFieldEvent {
    field: '$.payload[].prefix'
    value: Uint8Array
    index: number
  }

  export interface MessagePayloadDataFieldEvent {
    field: '$.payload[].data'
    value: Uint8Array
    index: number
  }

  export interface MessageBlockPresencesCidFieldEvent {
    field: '$.blockPresences[].cid'
    value: Uint8Array
    index: number
  }

  export interface MessageBlockPresencesTypeFieldEvent {
    field: '$.blockPresences[].type'
    value: Message.BlockPresenceType
    index: number
  }

  export interface MessagePendingBytesFieldEvent {
    field: '$.pendingBytes'
    value: number
  }

  export function encode (obj: Partial<Message>): Uint8Array {
    return encodeMessage(obj, Message.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Message>): Message {
    return decodeMessage(buf, Message.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Message>): Generator<MessageWantlistEntriesBlockFieldEvent | MessageWantlistEntriesPriorityFieldEvent | MessageWantlistEntriesCancelFieldEvent | MessageWantlistEntriesWantTypeFieldEvent | MessageWantlistEntriesSendDontHaveFieldEvent | MessageWantlistFullFieldEvent | MessageBlocksFieldEvent | MessagePayloadPrefixFieldEvent | MessagePayloadDataFieldEvent | MessageBlockPresencesCidFieldEvent | MessageBlockPresencesTypeFieldEvent | MessagePendingBytesFieldEvent> {
    return streamMessage(buf, Message.codec(), opts)
  }
}
