import { decodeMessage, encodeMessage, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions, StreamingDecodeOptions, StreamingDecodeWithCollectionsOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface MessageWithRequired {
  scalarField: number
}

export namespace MessageWithRequired {
  let _codec: Codec<MessageWithRequired, MessageWithRequiredStreamEvent, MessageWithRequiredStreamCollectionsEvent>

  export const codec = (): Codec<MessageWithRequired, MessageWithRequiredStreamEvent, MessageWithRequiredStreamCollectionsEvent> => {
    if (_codec == null) {
      _codec = message<MessageWithRequired, MessageWithRequiredStreamEvent, MessageWithRequiredStreamCollectionsEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.scalarField != null) {
          w.uint32(8)
          w.int32(obj.scalarField)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          scalarField: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.scalarField = reader.int32()
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
            scalarField: 0
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
                field: 'scalarField',
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

  export interface MessageWithRequiredScalarFieldFieldEvent {
    field: 'scalarField'
    value: number
  }

  export type MessageWithRequiredStreamEvent = MessageWithRequiredScalarFieldFieldEvent
  export type MessageWithRequiredStreamCollectionsEvent = {}

  export function encode (obj: Partial<MessageWithRequired>): Uint8Array {
    return encodeMessage(obj, MessageWithRequired.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRequired>): MessageWithRequired {
    return decodeMessage(buf, MessageWithRequired.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeOptions<MessageWithRequired>): Generator<MessageWithRequiredStreamEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: StreamingDecodeWithCollectionsOptions<MessageWithRequired>): Generator<MessageWithRequiredStreamCollectionsEvent>
  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: any): Generator<any> {
    return streamMessage(buf, MessageWithRequired.codec(), opts)
  }
}
