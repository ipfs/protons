import { decodeMessage, encodeMessage, enumeration, MaxLengthError, message, streamMessage } from 'protons-runtime'
import { alloc as uint8ArrayAlloc } from 'uint8arrays/alloc'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Message {
  wantlist?: Message.Wantlist
  blocks: Uint8Array<ArrayBuffer>[]
  payload: Message.Block[]
  blockPresences: Message.BlockPresence[]
  pendingBytes: number
}

export interface MessageInput {
  wantlist?: Message.WantlistInput
  blocks?: Uint8Array[]
  payload?: Message.BlockInput[]
  blockPresences?: Message.BlockPresenceInput[]
  pendingBytes?: number
}

export namespace Message {
  export interface Wantlist {
    entries: Message.Wantlist.Entry[]
    full: boolean
  }

  export interface WantlistInput {
    entries?: Message.Wantlist.EntryInput[]
    full?: boolean
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
      export const codec = (): Codec<WantType, WantType> => {
        return enumeration<WantType>(__WantTypeValues)
      }
    }

    export interface Entry {
      block: Uint8Array<ArrayBuffer>
      priority: number
      cancel?: boolean
      wantType: Message.Wantlist.WantType
      sendDontHave: boolean
    }

    export interface EntryInput {
      block?: Uint8Array
      priority?: number
      cancel?: boolean
      wantType?: Message.Wantlist.WantType
      sendDontHave?: boolean
    }

    export namespace Entry {
      let _codec: Codec<Entry, EntryInput>

      export const codec = (): Codec<Entry, EntryInput> => {
        if (_codec == null) {
          _codec = message<Entry, EntryInput>((obj, w, opts = {}) => {
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
          }, (r, length, opts = {}) => {
            const obj: any = {
              block: uint8ArrayAlloc(0),
              priority: 0,
              wantType: WantType.Block,
              sendDontHave: false
            }

            const end = length == null ? r.len : r.pos + length

            while (r.pos < end) {
              const tag = r.uint32()

              switch (tag >>> 3) {
                case 1: {
                  obj.block = r.bytes()
                  break
                }
                case 2: {
                  obj.priority = r.int32()
                  break
                }
                case 3: {
                  obj.cancel = r.bool()
                  break
                }
                case 4: {
                  obj.wantType = Message.Wantlist.WantType.codec().decode(r)
                  break
                }
                case 5: {
                  obj.sendDontHave = r.bool()
                  break
                }
                default: {
                  r.skipType(tag & 7)
                  break
                }
              }
            }

            return obj
          }, function * (r, length, prefix, opts = {}) {
            const end = length == null ? r.len : r.pos + length

            if (prefix !== '.') {
              yield {
                field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
                type: 'start',
                message: 'Message.Wantlist.Entry'
              }
            }

            while (r.pos < end) {
              const tag = r.uint32()

              switch (tag >>> 3) {
                case 1: {
                  yield {
                    field: `${prefix}block`,
                    value: r.bytes()
                  }
                  break
                }
                case 2: {
                  yield {
                    field: `${prefix}priority`,
                    value: r.int32()
                  }
                  break
                }
                case 3: {
                  yield {
                    field: `${prefix}cancel`,
                    value: r.bool()
                  }
                  break
                }
                case 4: {
                  yield {
                    field: `${prefix}wantType`,
                    value: Message.Wantlist.WantType.codec().decode(r)
                  }
                  break
                }
                case 5: {
                  yield {
                    field: `${prefix}sendDontHave`,
                    value: r.bool()
                  }
                  break
                }
                default: {
                  r.skipType(tag & 7)
                  break
                }
              }
            }

            if (prefix !== '.') {
              yield {
                field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
                type: 'end',
                message: 'Message.Wantlist.Entry'
              }
            }
          })
        }

        return _codec
      }

      export interface EntryBlockFieldEvent {
        field: '.block'
        value: Uint8Array<ArrayBuffer>
      }

      export interface EntryPriorityFieldEvent {
        field: '.priority'
        value: number
      }

      export interface EntryCancelFieldEvent {
        field: '.cancel'
        value: boolean
      }

      export interface EntryWantTypeFieldEvent {
        field: '.wantType'
        value: Message.Wantlist.WantType
      }

      export interface EntrySendDontHaveFieldEvent {
        field: '.sendDontHave'
        value: boolean
      }

      export function encode (obj: EntryInput): Uint8Array<ArrayBuffer> {
        return encodeMessage(obj, Entry.codec())
      }

      export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Entry>): Entry {
        return decodeMessage(buf, Entry.codec(), opts)
      }

      export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Entry>): Generator<EntryBlockFieldEvent | EntryPriorityFieldEvent | EntryCancelFieldEvent | EntryWantTypeFieldEvent | EntrySendDontHaveFieldEvent> {
        return streamMessage(buf, Entry.codec(), opts)
      }
    }

    let _codec: Codec<Wantlist, WantlistInput>

    export const codec = (): Codec<Wantlist, WantlistInput> => {
      if (_codec == null) {
        _codec = message<Wantlist, WantlistInput>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.entries != null && obj.entries.length > 0) {
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
        }, (r, length, opts = {}) => {
          const obj: any = {
            entries: [],
            full: false
          }

          const end = length == null ? r.len : r.pos + length

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                if (opts.limits?.entries != null && obj.entries.length === opts.limits.entries) {
                  throw new MaxLengthError('Decode error - repeated field "entries" had too many elements')
                }

                obj.entries.push(Message.Wantlist.Entry.codec().decode(r, r.uint32(), {
                  limits: opts.limits?.entries$
                }))
                break
              }
              case 2: {
                obj.full = r.bool()
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (r, length, prefix, opts = {}) {
          const obj = {
            entries: 0
          }

          const end = length == null ? r.len : r.pos + length

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'Message.Wantlist'
            }
          }

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                if (opts.limits?.entries != null && obj.entries === opts.limits.entries) {
                  throw new MaxLengthError('Streaming decode error - repeated field "entries" had too many elements')
                }

                for (const evt of Message.Wantlist.Entry.codec().stream(r, r.uint32(), `${prefix}entries[].`, {
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
                  field: `${prefix}full`,
                  value: r.bool()
                }
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'end',
              message: 'Message.Wantlist'
            }
          }
        })
      }

      return _codec
    }

    export interface WantlistEntriesBlockFieldEvent {
      field: '.entries[].block'
      value: Uint8Array<ArrayBuffer>
      index: number
    }

    export interface WantlistEntriesPriorityFieldEvent {
      field: '.entries[].priority'
      value: number
      index: number
    }

    export interface WantlistEntriesCancelFieldEvent {
      field: '.entries[].cancel'
      value: boolean
      index: number
    }

    export interface WantlistEntriesWantTypeFieldEvent {
      field: '.entries[].wantType'
      value: Message.Wantlist.WantType
      index: number
    }

    export interface WantlistEntriesSendDontHaveFieldEvent {
      field: '.entries[].sendDontHave'
      value: boolean
      index: number
    }

    export interface WantlistEntriesMessageStartEvent {
      field: '.entries[]'
      index: number
      type: 'start'
      message: string
    }

    export interface WantlistEntriesMessageEndEvent {
      field: '.entries[]'
      index: number
      type: 'end'
      message: string
    }

    export interface WantlistFullFieldEvent {
      field: '.full'
      value: boolean
    }

    export function encode (obj: WantlistInput): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, Wantlist.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Wantlist>): Wantlist {
      return decodeMessage(buf, Wantlist.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Wantlist>): Generator<WantlistEntriesBlockFieldEvent | WantlistEntriesPriorityFieldEvent | WantlistEntriesCancelFieldEvent | WantlistEntriesWantTypeFieldEvent | WantlistEntriesSendDontHaveFieldEvent | WantlistEntriesMessageStartEvent | WantlistEntriesMessageEndEvent | WantlistFullFieldEvent> {
      return streamMessage(buf, Wantlist.codec(), opts)
    }
  }

  export interface Block {
    prefix: Uint8Array<ArrayBuffer>
    data: Uint8Array<ArrayBuffer>
  }

  export interface BlockInput {
    prefix?: Uint8Array
    data?: Uint8Array
  }

  export namespace Block {
    let _codec: Codec<Block, BlockInput>

    export const codec = (): Codec<Block, BlockInput> => {
      if (_codec == null) {
        _codec = message<Block, BlockInput>((obj, w, opts = {}) => {
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
        }, (r, length, opts = {}) => {
          const obj: any = {
            prefix: uint8ArrayAlloc(0),
            data: uint8ArrayAlloc(0)
          }

          const end = length == null ? r.len : r.pos + length

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.prefix = r.bytes()
                break
              }
              case 2: {
                obj.data = r.bytes()
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (r, length, prefix, opts = {}) {
          const end = length == null ? r.len : r.pos + length

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'Message.Block'
            }
          }

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}prefix`,
                  value: r.bytes()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}data`,
                  value: r.bytes()
                }
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'end',
              message: 'Message.Block'
            }
          }
        })
      }

      return _codec
    }

    export interface BlockPrefixFieldEvent {
      field: '.prefix'
      value: Uint8Array<ArrayBuffer>
    }

    export interface BlockDataFieldEvent {
      field: '.data'
      value: Uint8Array<ArrayBuffer>
    }

    export function encode (obj: BlockInput): Uint8Array<ArrayBuffer> {
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
    export const codec = (): Codec<BlockPresenceType, BlockPresenceType> => {
      return enumeration<BlockPresenceType>(__BlockPresenceTypeValues)
    }
  }

  export interface BlockPresence {
    cid: Uint8Array<ArrayBuffer>
    type: Message.BlockPresenceType
  }

  export interface BlockPresenceInput {
    cid?: Uint8Array
    type?: Message.BlockPresenceType
  }

  export namespace BlockPresence {
    let _codec: Codec<BlockPresence, BlockPresenceInput>

    export const codec = (): Codec<BlockPresence, BlockPresenceInput> => {
      if (_codec == null) {
        _codec = message<BlockPresence, BlockPresenceInput>((obj, w, opts = {}) => {
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
        }, (r, length, opts = {}) => {
          const obj: any = {
            cid: uint8ArrayAlloc(0),
            type: BlockPresenceType.Have
          }

          const end = length == null ? r.len : r.pos + length

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                obj.cid = r.bytes()
                break
              }
              case 2: {
                obj.type = Message.BlockPresenceType.codec().decode(r)
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          return obj
        }, function * (r, length, prefix, opts = {}) {
          const end = length == null ? r.len : r.pos + length

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'start',
              message: 'Message.BlockPresence'
            }
          }

          while (r.pos < end) {
            const tag = r.uint32()

            switch (tag >>> 3) {
              case 1: {
                yield {
                  field: `${prefix}cid`,
                  value: r.bytes()
                }
                break
              }
              case 2: {
                yield {
                  field: `${prefix}type`,
                  value: Message.BlockPresenceType.codec().decode(r)
                }
                break
              }
              default: {
                r.skipType(tag & 7)
                break
              }
            }
          }

          if (prefix !== '.') {
            yield {
              field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
              type: 'end',
              message: 'Message.BlockPresence'
            }
          }
        })
      }

      return _codec
    }

    export interface BlockPresenceCidFieldEvent {
      field: '.cid'
      value: Uint8Array<ArrayBuffer>
    }

    export interface BlockPresenceTypeFieldEvent {
      field: '.type'
      value: Message.BlockPresenceType
    }

    export function encode (obj: BlockPresenceInput): Uint8Array<ArrayBuffer> {
      return encodeMessage(obj, BlockPresence.codec())
    }

    export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<BlockPresence>): BlockPresence {
      return decodeMessage(buf, BlockPresence.codec(), opts)
    }

    export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<BlockPresence>): Generator<BlockPresenceCidFieldEvent | BlockPresenceTypeFieldEvent> {
      return streamMessage(buf, BlockPresence.codec(), opts)
    }
  }

  let _codec: Codec<Message, MessageInput>

  export const codec = (): Codec<Message, MessageInput> => {
    if (_codec == null) {
      _codec = message<Message, MessageInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.wantlist != null) {
          w.uint32(10)
          Message.Wantlist.codec().encode(obj.wantlist, w)
        }

        if (obj.blocks != null && obj.blocks.length > 0) {
          for (const value of obj.blocks) {
            w.uint32(18)
            w.bytes(value)
          }
        }

        if (obj.payload != null && obj.payload.length > 0) {
          for (const value of obj.payload) {
            w.uint32(26)
            Message.Block.codec().encode(value, w)
          }
        }

        if (obj.blockPresences != null && obj.blockPresences.length > 0) {
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
      }, (r, length, opts = {}) => {
        const obj: any = {
          blocks: [],
          payload: [],
          blockPresences: [],
          pendingBytes: 0
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.wantlist = Message.Wantlist.codec().decode(r, r.uint32(), {
                limits: opts.limits?.wantlist
              })
              break
            }
            case 2: {
              if (opts.limits?.blocks != null && obj.blocks.length === opts.limits.blocks) {
                throw new MaxLengthError('Decode error - repeated field "blocks" had too many elements')
              }

              obj.blocks.push(r.bytes())
              break
            }
            case 3: {
              if (opts.limits?.payload != null && obj.payload.length === opts.limits.payload) {
                throw new MaxLengthError('Decode error - repeated field "payload" had too many elements')
              }

              obj.payload.push(Message.Block.codec().decode(r, r.uint32(), {
                limits: opts.limits?.payload$
              }))
              break
            }
            case 4: {
              if (opts.limits?.blockPresences != null && obj.blockPresences.length === opts.limits.blockPresences) {
                throw new MaxLengthError('Decode error - repeated field "blockPresences" had too many elements')
              }

              obj.blockPresences.push(Message.BlockPresence.codec().decode(r, r.uint32(), {
                limits: opts.limits?.blockPresences$
              }))
              break
            }
            case 5: {
              obj.pendingBytes = r.int32()
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (r, length, prefix, opts = {}) {
        const obj = {
          blocks: 0,
          payload: 0,
          blockPresences: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'Message'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield * Message.Wantlist.codec().stream(r, r.uint32(), `${prefix}wantlist.`, {
                limits: opts.limits?.wantlist
              })

              break
            }
            case 2: {
              if (opts.limits?.blocks != null && obj.blocks === opts.limits.blocks) {
                throw new MaxLengthError('Streaming decode error - repeated field "blocks" had too many elements')
              }

              yield {
                field: `${prefix}blocks[]`,
                index: obj.blocks,
                value: r.bytes()
              }

              obj.blocks++

              break
            }
            case 3: {
              if (opts.limits?.payload != null && obj.payload === opts.limits.payload) {
                throw new MaxLengthError('Streaming decode error - repeated field "payload" had too many elements')
              }

              for (const evt of Message.Block.codec().stream(r, r.uint32(), `${prefix}payload[].`, {
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

              for (const evt of Message.BlockPresence.codec().stream(r, r.uint32(), `${prefix}blockPresences[].`, {
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
                field: `${prefix}pendingBytes`,
                value: r.int32()
              }
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'Message'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWantlistMessageStart {
    field: '.wantlist'
    type: 'start'
  }

  export interface MessageWantlistMessageEnd {
    field: '.wantlist'
    type: 'end'
  }

  export interface MessageWantlistEntriesBlockFieldEvent {
    field: '.wantlist.entries[].block'
    value: Uint8Array<ArrayBuffer>
    index: number
  }

  export interface MessageWantlistEntriesPriorityFieldEvent {
    field: '.wantlist.entries[].priority'
    value: number
    index: number
  }

  export interface MessageWantlistEntriesCancelFieldEvent {
    field: '.wantlist.entries[].cancel'
    value: boolean
    index: number
  }

  export interface MessageWantlistEntriesWantTypeFieldEvent {
    field: '.wantlist.entries[].wantType'
    value: Message.Wantlist.WantType
    index: number
  }

  export interface MessageWantlistEntriesSendDontHaveFieldEvent {
    field: '.wantlist.entries[].sendDontHave'
    value: boolean
    index: number
  }

  export interface MessageWantlistEntriesMessageStartEvent {
    field: '.wantlist.entries[]'
    index: number
    type: 'start'
    message: string
  }

  export interface MessageWantlistEntriesMessageEndEvent {
    field: '.wantlist.entries[]'
    index: number
    type: 'end'
    message: string
  }

  export interface MessageWantlistFullFieldEvent {
    field: '.wantlist.full'
    value: boolean
  }

  export interface MessageBlocksFieldEvent {
    field: '.blocks[]'
    index: number
    value: Uint8Array<ArrayBuffer>
  }

  export interface MessagePayloadPrefixFieldEvent {
    field: '.payload[].prefix'
    value: Uint8Array<ArrayBuffer>
    index: number
  }

  export interface MessagePayloadDataFieldEvent {
    field: '.payload[].data'
    value: Uint8Array<ArrayBuffer>
    index: number
  }

  export interface MessagePayloadMessageStartEvent {
    field: '.payload[]'
    index: number
    type: 'start'
    message: string
  }

  export interface MessagePayloadMessageEndEvent {
    field: '.payload[]'
    index: number
    type: 'end'
    message: string
  }

  export interface MessageBlockPresencesCidFieldEvent {
    field: '.blockPresences[].cid'
    value: Uint8Array<ArrayBuffer>
    index: number
  }

  export interface MessageBlockPresencesTypeFieldEvent {
    field: '.blockPresences[].type'
    value: Message.BlockPresenceType
    index: number
  }

  export interface MessageBlockPresencesMessageStartEvent {
    field: '.blockPresences[]'
    index: number
    type: 'start'
    message: string
  }

  export interface MessageBlockPresencesMessageEndEvent {
    field: '.blockPresences[]'
    index: number
    type: 'end'
    message: string
  }

  export interface MessagePendingBytesFieldEvent {
    field: '.pendingBytes'
    value: number
  }

  export function encode (obj: MessageInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Message.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Message>): Message {
    return decodeMessage(buf, Message.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Message>): Generator<MessageWantlistMessageStart | MessageWantlistMessageEnd | MessageWantlistEntriesBlockFieldEvent | MessageWantlistEntriesPriorityFieldEvent | MessageWantlistEntriesCancelFieldEvent | MessageWantlistEntriesWantTypeFieldEvent | MessageWantlistEntriesSendDontHaveFieldEvent | MessageWantlistEntriesMessageStartEvent | MessageWantlistEntriesMessageEndEvent | MessageWantlistFullFieldEvent | MessageBlocksFieldEvent | MessagePayloadPrefixFieldEvent | MessagePayloadDataFieldEvent | MessagePayloadMessageStartEvent | MessagePayloadMessageEndEvent | MessageBlockPresencesCidFieldEvent | MessageBlockPresencesTypeFieldEvent | MessageBlockPresencesMessageStartEvent | MessageBlockPresencesMessageEndEvent | MessagePendingBytesFieldEvent> {
    return streamMessage(buf, Message.codec(), opts)
  }
}
