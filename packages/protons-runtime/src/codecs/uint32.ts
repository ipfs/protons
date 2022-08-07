import { unsigned } from 'uint8-varint'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'

const encode: EncodeFunction<number> = function uint32Encode (val) {
  const buf = unsigned.encode(val)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<number> = function uint32Decode (buf, offset) {
  const value = unsigned.decode(buf, offset)

  return {
    value,
    length: unsigned.encodingLength(value)
  }
}

export const uint32 = createCodec('uint32', CODEC_TYPES.VARINT, encode, decode)
