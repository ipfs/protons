/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { type Codec, CodeError, decodeMessage, type DecodeOptions, encodeMessage, message } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface SubMessage {
  foo: string
}

export namespace SubMessage {
  let _codec: Codec<SubMessage>

  export const codec = (): Codec<SubMessage> => {
    if (_codec == null) {
      _codec = message<SubMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.foo != null && obj.foo !== '')) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          foo: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.foo = reader.string()
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<SubMessage>): Uint8Array => {
    return encodeMessage(obj, SubMessage.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<SubMessage>): SubMessage => {
    return decodeMessage(buf, SubMessage.codec(), opts)
  }
}

export interface RepeatedTypes {
  number: number[]
  limitedNumber: number[]
  message: SubMessage[]
}

export namespace RepeatedTypes {
  let _codec: Codec<RepeatedTypes>

  export const codec = (): Codec<RepeatedTypes> => {
    if (_codec == null) {
      _codec = message<RepeatedTypes>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.number != null) {
          for (const value of obj.number) {
            w.uint32(8)
            w.uint32(value)
          }
        }

        if (obj.limitedNumber != null) {
          for (const value of obj.limitedNumber) {
            w.uint32(16)
            w.uint32(value)
          }
        }

        if (obj.message != null) {
          for (const value of obj.message) {
            w.uint32(26)
            SubMessage.codec().encode(value, w)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          number: [],
          limitedNumber: [],
          message: []
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.number != null && obj.number.length === opts.limits.number) {
                throw new CodeError('decode error - map field "number" had too many elements', 'ERR_MAX_LENGTH')
              }

              obj.number.push(reader.uint32())
              break
            }
            case 2: {
              if (opts.limits?.limitedNumber != null && obj.limitedNumber.length === opts.limits.limitedNumber) {
                throw new CodeError('decode error - map field "limitedNumber" had too many elements', 'ERR_MAX_LENGTH')
              }

              if (obj.limitedNumber.length === 1) {
                throw new CodeError('decode error - repeated field "limitedNumber" had too many elements', 'ERR_MAX_LENGTH')
              }

              obj.limitedNumber.push(reader.uint32())
              break
            }
            case 3: {
              if (opts.limits?.message != null && obj.message.length === opts.limits.message) {
                throw new CodeError('decode error - map field "message" had too many elements', 'ERR_MAX_LENGTH')
              }

              obj.message.push(SubMessage.codec().decode(reader, reader.uint32()))
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<RepeatedTypes>): Uint8Array => {
    return encodeMessage(obj, RepeatedTypes.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<RepeatedTypes>): RepeatedTypes => {
    return decodeMessage(buf, RepeatedTypes.codec(), opts)
  }
}
