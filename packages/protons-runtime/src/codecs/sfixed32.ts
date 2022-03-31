import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<number> = function sfixed32EncodingLength () {
  return 4
}

const encode: EncodeFunction<number> = function sfixed32Encode (val, buf, offset) {
  buf.setInt32(offset, val, true)

  return offset + encodingLength(val)
}

const decode: DecodeFunction<number> = function sfixed32Decode (buf, offset) {
  return buf.getInt32(offset, true)
}

export const sfixed32 = createCodec('sfixed32', CODEC_TYPES.BIT32, encode, decode, encodingLength)
