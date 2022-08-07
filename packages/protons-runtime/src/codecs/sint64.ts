import { zigzag } from 'uint8-varint/big'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'

const encode: EncodeFunction<bigint> = function int64Encode (val) {
  const buf = zigzag.encode(val)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<bigint> = function int64Decode (buf, offset) {
  const value = zigzag.decode(buf, offset)

  return {
    value,
    length: zigzag.encodingLength(value)
  }
}

export const sint64 = createCodec('sint64', CODEC_TYPES.VARINT, encode, decode)
