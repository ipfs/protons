/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface CustomOptionNumber {
  num: number
  bignum: number
}

export namespace CustomOptionNumber {
  let _codec: Codec<CustomOptionNumber>

  export const codec = (): Codec<CustomOptionNumber> => {
    if (_codec == null) {
      _codec = message<CustomOptionNumber>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.num != null && obj.num !== 0)) {
          w.uint32(8)
          w.int32(obj.num)
        }

        if ((obj.bignum != null && obj.bignum !== 0)) {
          w.uint32(16)
          w.int64(BigInt(obj.bignum))
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          num: 0,
          bignum: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.num = reader.int32()
              break
            case 2:
              obj.bignum = Number(reader.int64())
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

  export const encode = (obj: Partial<CustomOptionNumber>): Uint8Array => {
    return encodeMessage(obj, CustomOptionNumber.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): CustomOptionNumber => {
    return decodeMessage(buf, CustomOptionNumber.codec())
  }
}

export interface CustomOptionString {
  num: number
  bignum: string
}

export namespace CustomOptionString {
  let _codec: Codec<CustomOptionString>

  export const codec = (): Codec<CustomOptionString> => {
    if (_codec == null) {
      _codec = message<CustomOptionString>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.num != null && obj.num !== 0)) {
          w.uint32(8)
          w.int32(obj.num)
        }

        if ((obj.bignum != null && obj.bignum !== '')) {
          w.uint32(16)
          w.int64(BigInt(obj.bignum))
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          num: 0,
          bignum: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.num = reader.int32()
              break
            case 2:
              obj.bignum = String(reader.int64())
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

  export const encode = (obj: Partial<CustomOptionString>): Uint8Array => {
    return encodeMessage(obj, CustomOptionString.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): CustomOptionString => {
    return decodeMessage(buf, CustomOptionString.codec())
  }
}
