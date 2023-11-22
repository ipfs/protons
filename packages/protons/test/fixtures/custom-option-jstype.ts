/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { type Codec, decodeMessage, encodeMessage, message } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface CustomOptionNumber {
  num: number
  i64: number
  ui64: number
  si64: number
  f64: number
  sf64: number
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

        if ((obj.i64 != null && obj.i64 !== 0)) {
          w.uint32(16)
          w.int64Number(obj.i64)
        }

        if ((obj.ui64 != null && obj.ui64 !== 0)) {
          w.uint32(24)
          w.uint64Number(obj.ui64)
        }

        if ((obj.si64 != null && obj.si64 !== 0)) {
          w.uint32(32)
          w.sint64Number(obj.si64)
        }

        if ((obj.f64 != null && obj.f64 !== 0)) {
          w.uint32(41)
          w.fixed64Number(obj.f64)
        }

        if ((obj.sf64 != null && obj.sf64 !== 0)) {
          w.uint32(49)
          w.sfixed64Number(obj.sf64)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          num: 0,
          i64: 0,
          ui64: 0,
          si64: 0,
          f64: 0,
          sf64: 0
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.num = reader.int32()
              break
            }
            case 2: {
              obj.i64 = reader.int64Number()
              break
            }
            case 3: {
              obj.ui64 = reader.uint64Number()
              break
            }
            case 4: {
              obj.si64 = reader.sint64Number()
              break
            }
            case 5: {
              obj.f64 = reader.fixed64Number()
              break
            }
            case 6: {
              obj.sf64 = reader.sfixed64Number()
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

  export const encode = (obj: Partial<CustomOptionNumber>): Uint8Array => {
    return encodeMessage(obj, CustomOptionNumber.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): CustomOptionNumber => {
    return decodeMessage(buf, CustomOptionNumber.codec())
  }
}

export interface CustomOptionString {
  num: number
  i64: string
  ui64: string
  si64: string
  f64: string
  sf64: string
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

        if ((obj.i64 != null && obj.i64 !== '')) {
          w.uint32(16)
          w.int64String(obj.i64)
        }

        if ((obj.ui64 != null && obj.ui64 !== '')) {
          w.uint32(24)
          w.uint64String(obj.ui64)
        }

        if ((obj.si64 != null && obj.si64 !== '')) {
          w.uint32(32)
          w.sint64String(obj.si64)
        }

        if ((obj.f64 != null && obj.f64 !== '')) {
          w.uint32(41)
          w.fixed64String(obj.f64)
        }

        if ((obj.sf64 != null && obj.sf64 !== '')) {
          w.uint32(49)
          w.sfixed64String(obj.sf64)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          num: 0,
          i64: '',
          ui64: '',
          si64: '',
          f64: '',
          sf64: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.num = reader.int32()
              break
            }
            case 2: {
              obj.i64 = reader.int64String()
              break
            }
            case 3: {
              obj.ui64 = reader.uint64String()
              break
            }
            case 4: {
              obj.si64 = reader.sint64String()
              break
            }
            case 5: {
              obj.f64 = reader.fixed64String()
              break
            }
            case 6: {
              obj.sf64 = reader.sfixed64String()
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

  export const encode = (obj: Partial<CustomOptionString>): Uint8Array => {
    return encodeMessage(obj, CustomOptionString.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): CustomOptionString => {
    return decodeMessage(buf, CustomOptionString.codec())
  }
}
