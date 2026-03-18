import { decodeMessage, encodeMessage, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Basic {
  foo?: string
  num: number
}

export namespace Basic {
  let _codec: Codec<Basic, BasicStreamEvent, BasicStreamCollectionsEvent>

  export const codec = (): Codec<Basic, BasicStreamEvent, BasicStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Basic, BasicStreamEvent, BasicStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.foo != null) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if ((obj.num != null && obj.num !== 0)) {
          w.uint32(16)
          w.int32(obj.num)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          num: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.foo = reader.string()
              break
            }
            case 2: {
              obj.num = reader.int32()
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
            num: 0
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
                field: 'foo',
                value: reader.string()
              }
              break
            }
            case 2: {
              yield {
                field: 'num',
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

  export interface BasicFooFieldEvent {
    field: 'foo'
    value: string
  }

  export interface BasicNumFieldEvent {
    field: 'num'
    value: number
  }

  export type BasicStreamEvent = BasicFooFieldEvent | BasicNumFieldEvent
  export type BasicStreamCollectionsEvent = {}

  export function encode (obj: Partial<Basic>): Uint8Array {
    return encodeMessage(obj, Basic.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Basic>): Basic {
    return decodeMessage(buf, Basic.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Basic>): Generator<BasicStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Basic>): Generator<BasicStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Basic.codec(), opts)
  }
}

export interface Empty {}

export namespace Empty {
  let _codec: Codec<Empty, EmptyStreamEvent, EmptyStreamCollectionsEvent>

  export const codec = (): Codec<Empty, EmptyStreamEvent, EmptyStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<Empty, EmptyStreamEvent, EmptyStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
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

  export type EmptyStreamEvent = {}
  export type EmptyStreamCollectionsEvent = {}

  export function encode (obj: Partial<Empty>): Uint8Array {
    return encodeMessage(obj, Empty.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Empty>): Empty {
    return decodeMessage(buf, Empty.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<Empty>): Generator<EmptyStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<Empty>): Generator<EmptyStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, Empty.codec(), opts)
  }
}
