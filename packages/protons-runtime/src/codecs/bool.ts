import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'

const encode: EncodeFunction<boolean> = function boolEncode (value) {
  return {
    bufs: [
      Uint8Array.from([value ? 1 : 0])
    ],
    length: 1
  }
}

const decode: DecodeFunction<boolean> = function boolDecode (buffer, offset) {
  return {
    value: buffer.get(offset) > 0,
    length: 1
  }
}

export const bool = createCodec('bool', CODEC_TYPES.VARINT, encode, decode)
