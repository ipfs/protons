import { unsigned } from 'uint8-varint/big'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'

const encode: EncodeFunction<bigint> = function uint64Encode (val) {
  const buf = unsigned.encode(val)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<bigint> = function uint64Decode (buf, offset) {
  const value = unsigned.decode(buf, offset)

  return {
    value,
    length: unsigned.encodingLength(value)
  }
}

export const uint64 = createCodec('uint64', CODEC_TYPES.VARINT, encode, decode)
