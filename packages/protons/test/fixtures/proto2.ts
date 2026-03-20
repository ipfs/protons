import { decodeMessage, encodeMessage, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface MessageWithRequired {
  scalarField: number
}

export namespace MessageWithRequired {
  let _codec: Codec<MessageWithRequired>

  export const codec = (): Codec<MessageWithRequired> => {
    if (_codec == null) {
      _codec = message<MessageWithRequired>((obj, w, opts = {}) => {
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
      }, function * (reader, length, prefix, opts = {}) {
        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix != null ? `${prefix}.` : ''}scalarField`,
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

  export interface MessageWithRequiredScalarFieldFieldEvent {
    field: 'scalarField'
    value: number
  }

  export function encode (obj: Partial<MessageWithRequired>): Uint8Array {
    return encodeMessage(obj, MessageWithRequired.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRequired>): MessageWithRequired {
    return decodeMessage(buf, MessageWithRequired.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRequired>): Generator<MessageWithRequiredScalarFieldFieldEvent> {
    return streamMessage(buf, MessageWithRequired.codec(), opts)
  }
}
