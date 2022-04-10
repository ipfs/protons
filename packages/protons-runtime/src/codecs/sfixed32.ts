import { Uint8ArrayList } from 'uint8arraylist'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<number> = function sfixed32EncodingLength () {
  return 4
}

const encode: EncodeFunction<number> = function sfixed32Encode (val) {
  const buf = new Uint8ArrayList(new Uint8Array(encodingLength(val)))
  buf.setInt32(0, val, true)

  return buf
}

const decode: DecodeFunction<number> = function sfixed32Decode (buf, offset) {
  return buf.getInt32(offset, true)
}

export const sfixed32 = createCodec('sfixed32', CODEC_TYPES.BIT32, encode, decode, encodingLength)
