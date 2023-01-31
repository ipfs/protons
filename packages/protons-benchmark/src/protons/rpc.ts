/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */

import { encodeMessage, decodeMessage, message, writer } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from 'protons-runtime'

export interface RPC {
  subscriptions: RPC.SubOpts[]
  messages: RPC.Message[]
  control?: RPC.ControlMessage
}

export namespace RPC {
  export interface SubOpts {
    subscribe?: boolean
    topic?: string
  }

  export namespace SubOpts {
    let _codec: Codec<SubOpts>

    export const codec = (): Codec<SubOpts> => {
      if (_codec == null) {
        _codec = message<SubOpts>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.subscribe != null) {
            w.uint32(8)
            w.bool(obj.subscribe)
          }

          if (obj.topic != null) {
            w.uint32(18)
            w.string(obj.topic)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length) => {
          const obj: any = {}

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.subscribe = reader.bool()
                break
              case 2:
                obj.topic = reader.string()
                break
              default:
                reader.skipType(tag & 7)
                break
            }
          }

          return obj
        })
      }

      return _codec
    }

    export const encode = (obj: SubOpts): Uint8Array => {
      return encodeMessage(obj, SubOpts.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): SubOpts => {
      return decodeMessage(buf, SubOpts.codec())
    }
  }

  export interface Message {
    from?: Uint8Array
    data?: Uint8Array
    seqno?: Uint8Array
    topic: string
    signature?: Uint8Array
    key?: Uint8Array
  }

  export namespace Message {
    let _codec: Codec<Message>

    export const codec = (): Codec<Message> => {
      if (_codec == null) {
        _codec = message<Message>((obj, w, opts = {}) => {
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

          if (opts.writeDefaults === true || obj.topic !== '') {
            w.uint32(34)
            w.string(obj.topic ?? '')
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
        }, (reader, length) => {
          const obj: any = {
            topic: ''
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.from = reader.bytes()
                break
              case 2:
                obj.data = reader.bytes()
                break
              case 3:
                obj.seqno = reader.bytes()
                break
              case 4:
                obj.topic = reader.string()
                break
              case 5:
                obj.signature = reader.bytes()
                break
              case 6:
                obj.key = reader.bytes()
                break
              default:
                reader.skipType(tag & 7)
                break
            }
          }

          return obj
        })
      }

      return _codec
    }

    export const encode = (obj: Message): Uint8Array => {
      return encodeMessage(obj, Message.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): Message => {
      return decodeMessage(buf, Message.codec())
    }
  }

  export interface ControlMessage {
    ihave: RPC.ControlIHave[]
    iwant: RPC.ControlIWant[]
    graft: RPC.ControlGraft[]
    prune: RPC.ControlPrune[]
  }

  export namespace ControlMessage {
    let _codec: Codec<ControlMessage>

    export const codec = (): Codec<ControlMessage> => {
      if (_codec == null) {
        _codec = message<ControlMessage>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.ihave != null) {
            for (const value of obj.ihave) {
              const mw = writer()
              RPC.ControlIHave.codec().encode(value, mw, {
                lengthDelimited: false,
                writeDefaults: true
              })
              const buf = mw.finish()

              w.uint32(10)
              w.bytes(buf)
            }
          }

          if (obj.iwant != null) {
            for (const value of obj.iwant) {
              const mw = writer()
              RPC.ControlIWant.codec().encode(value, mw, {
                lengthDelimited: false,
                writeDefaults: true
              })
              const buf = mw.finish()

              w.uint32(18)
              w.bytes(buf)
            }
          }

          if (obj.graft != null) {
            for (const value of obj.graft) {
              const mw = writer()
              RPC.ControlGraft.codec().encode(value, mw, {
                lengthDelimited: false,
                writeDefaults: true
              })
              const buf = mw.finish()

              w.uint32(26)
              w.bytes(buf)
            }
          }

          if (obj.prune != null) {
            for (const value of obj.prune) {
              const mw = writer()
              RPC.ControlPrune.codec().encode(value, mw, {
                lengthDelimited: false,
                writeDefaults: true
              })
              const buf = mw.finish()

              w.uint32(34)
              w.bytes(buf)
            }
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length) => {
          const obj: any = {
            ihave: [],
            iwant: [],
            graft: [],
            prune: []
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.ihave.push(RPC.ControlIHave.codec().decode(reader, reader.uint32()))
                break
              case 2:
                obj.iwant.push(RPC.ControlIWant.codec().decode(reader, reader.uint32()))
                break
              case 3:
                obj.graft.push(RPC.ControlGraft.codec().decode(reader, reader.uint32()))
                break
              case 4:
                obj.prune.push(RPC.ControlPrune.codec().decode(reader, reader.uint32()))
                break
              default:
                reader.skipType(tag & 7)
                break
            }
          }

          return obj
        })
      }

      return _codec
    }

    export const encode = (obj: ControlMessage): Uint8Array => {
      return encodeMessage(obj, ControlMessage.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): ControlMessage => {
      return decodeMessage(buf, ControlMessage.codec())
    }
  }

  export interface ControlIHave {
    topicID?: string
    messageIDs: Uint8Array[]
  }

  export namespace ControlIHave {
    let _codec: Codec<ControlIHave>

    export const codec = (): Codec<ControlIHave> => {
      if (_codec == null) {
        _codec = message<ControlIHave>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.topicID != null) {
            w.uint32(10)
            w.string(obj.topicID)
          }

          if (obj.messageIDs != null) {
            for (const value of obj.messageIDs) {
              w.uint32(18)
              w.bytes(value)
            }
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length) => {
          const obj: any = {
            messageIDs: []
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.topicID = reader.string()
                break
              case 2:
                obj.messageIDs.push(reader.bytes())
                break
              default:
                reader.skipType(tag & 7)
                break
            }
          }

          return obj
        })
      }

      return _codec
    }

    export const encode = (obj: ControlIHave): Uint8Array => {
      return encodeMessage(obj, ControlIHave.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): ControlIHave => {
      return decodeMessage(buf, ControlIHave.codec())
    }
  }

  export interface ControlIWant {
    messageIDs: Uint8Array[]
  }

  export namespace ControlIWant {
    let _codec: Codec<ControlIWant>

    export const codec = (): Codec<ControlIWant> => {
      if (_codec == null) {
        _codec = message<ControlIWant>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.messageIDs != null) {
            for (const value of obj.messageIDs) {
              w.uint32(10)
              w.bytes(value)
            }
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length) => {
          const obj: any = {
            messageIDs: []
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.messageIDs.push(reader.bytes())
                break
              default:
                reader.skipType(tag & 7)
                break
            }
          }

          return obj
        })
      }

      return _codec
    }

    export const encode = (obj: ControlIWant): Uint8Array => {
      return encodeMessage(obj, ControlIWant.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): ControlIWant => {
      return decodeMessage(buf, ControlIWant.codec())
    }
  }

  export interface ControlGraft {
    topicID?: string
  }

  export namespace ControlGraft {
    let _codec: Codec<ControlGraft>

    export const codec = (): Codec<ControlGraft> => {
      if (_codec == null) {
        _codec = message<ControlGraft>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.topicID != null) {
            w.uint32(10)
            w.string(obj.topicID)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length) => {
          const obj: any = {}

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.topicID = reader.string()
                break
              default:
                reader.skipType(tag & 7)
                break
            }
          }

          return obj
        })
      }

      return _codec
    }

    export const encode = (obj: ControlGraft): Uint8Array => {
      return encodeMessage(obj, ControlGraft.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): ControlGraft => {
      return decodeMessage(buf, ControlGraft.codec())
    }
  }

  export interface ControlPrune {
    topicID?: string
    peers: RPC.PeerInfo[]
    backoff?: bigint
  }

  export namespace ControlPrune {
    let _codec: Codec<ControlPrune>

    export const codec = (): Codec<ControlPrune> => {
      if (_codec == null) {
        _codec = message<ControlPrune>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.topicID != null) {
            w.uint32(10)
            w.string(obj.topicID)
          }

          if (obj.peers != null) {
            for (const value of obj.peers) {
              const mw = writer()
              RPC.PeerInfo.codec().encode(value, mw, {
                lengthDelimited: false,
                writeDefaults: true
              })
              const buf = mw.finish()

              w.uint32(18)
              w.bytes(buf)
            }
          }

          if (obj.backoff != null) {
            w.uint32(24)
            w.uint64(obj.backoff)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length) => {
          const obj: any = {
            peers: []
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.topicID = reader.string()
                break
              case 2:
                obj.peers.push(RPC.PeerInfo.codec().decode(reader, reader.uint32()))
                break
              case 3:
                obj.backoff = reader.uint64()
                break
              default:
                reader.skipType(tag & 7)
                break
            }
          }

          return obj
        })
      }

      return _codec
    }

    export const encode = (obj: ControlPrune): Uint8Array => {
      return encodeMessage(obj, ControlPrune.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): ControlPrune => {
      return decodeMessage(buf, ControlPrune.codec())
    }
  }

  export interface PeerInfo {
    peerID?: Uint8Array
    signedPeerRecord?: Uint8Array
  }

  export namespace PeerInfo {
    let _codec: Codec<PeerInfo>

    export const codec = (): Codec<PeerInfo> => {
      if (_codec == null) {
        _codec = message<PeerInfo>((obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (obj.peerID != null) {
            w.uint32(10)
            w.bytes(obj.peerID)
          }

          if (obj.signedPeerRecord != null) {
            w.uint32(18)
            w.bytes(obj.signedPeerRecord)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        }, (reader, length) => {
          const obj: any = {}

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.peerID = reader.bytes()
                break
              case 2:
                obj.signedPeerRecord = reader.bytes()
                break
              default:
                reader.skipType(tag & 7)
                break
            }
          }

          return obj
        })
      }

      return _codec
    }

    export const encode = (obj: PeerInfo): Uint8Array => {
      return encodeMessage(obj, PeerInfo.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): PeerInfo => {
      return decodeMessage(buf, PeerInfo.codec())
    }
  }

  let _codec: Codec<RPC>

  export const codec = (): Codec<RPC> => {
    if (_codec == null) {
      _codec = message<RPC>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.subscriptions != null) {
          for (const value of obj.subscriptions) {
            const mw = writer()
            RPC.SubOpts.codec().encode(value, mw, {
              lengthDelimited: false,
              writeDefaults: true
            })
            const buf = mw.finish()

            w.uint32(10)
            w.bytes(buf)
          }
        }

        if (obj.messages != null) {
          for (const value of obj.messages) {
            const mw = writer()
            RPC.Message.codec().encode(value, mw, {
              lengthDelimited: false,
              writeDefaults: true
            })
            const buf = mw.finish()

            w.uint32(18)
            w.bytes(buf)
          }
        }

        if (obj.control != null) {
          const mw = writer()
          RPC.ControlMessage.codec().encode(obj.control, mw, {
            lengthDelimited: false,
            writeDefaults: false
          })
          const buf = mw.finish()

          if (buf.byteLength > 0) {
            w.uint32(26)
            w.bytes(buf)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          subscriptions: [],
          messages: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.subscriptions.push(RPC.SubOpts.codec().decode(reader, reader.uint32()))
              break
            case 2:
              obj.messages.push(RPC.Message.codec().decode(reader, reader.uint32()))
              break
            case 3:
              obj.control = RPC.ControlMessage.codec().decode(reader, reader.uint32())
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: RPC): Uint8Array => {
    return encodeMessage(obj, RPC.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): RPC => {
    return decodeMessage(buf, RPC.codec())
  }
}
