import { zigzag } from 'uint8-varint'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'

function sint32EncodingLength (val: number) {
  return zigzag.encodingLength(val)
}

const encode: EncodeFunction<number> = function svarintEncode (val) {
  const buf = zigzag.encode(val)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<number> = function svarintDecode (buf, offset) {
  const value = zigzag.decode(buf, offset)

  return {
    value,
    length: sint32EncodingLength(value)
  }
}

export const sint32 = createCodec('sint32', CODEC_TYPES.VARINT, encode, decode)
