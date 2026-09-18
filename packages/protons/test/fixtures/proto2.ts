import { decodeMessage, encodeMessage, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface MessageWithRequired {
  scalarField: number
}

export interface MessageWithRequiredInput {
  scalarField: number
}

export namespace MessageWithRequired {
  let _codec: Codec<MessageWithRequired, MessageWithRequiredInput>

  export const codec = (): Codec<MessageWithRequired, MessageWithRequiredInput> => {
    if (_codec == null) {
      _codec = message<MessageWithRequired, MessageWithRequiredInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        w.uint32(8)
        w.int32(obj.scalarField)

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          scalarField: 0
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.scalarField = r.int32()
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
            message: 'MessageWithRequired'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}scalarField`,
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
            message: 'MessageWithRequired'
          }
        }
      })
    }

    return _codec
  }

  export interface MessageWithRequiredScalarFieldFieldEvent {
    field: '.scalarField'
    value: number
  }

  export function encode (obj: MessageWithRequiredInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, MessageWithRequired.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRequired>): MessageWithRequired {
    return decodeMessage(buf, MessageWithRequired.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithRequired>): Generator<MessageWithRequiredScalarFieldFieldEvent> {
    return streamMessage(buf, MessageWithRequired.codec(), opts)
  }
}
