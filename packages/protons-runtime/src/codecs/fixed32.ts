import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<number> = function fixed32EncodingLength () {
  return 4
}

const encode: EncodeFunction<number> = function fixed32Encode (val, buf, offset) {
  buf.setInt32(offset, val, true)

  return offset + encodingLength(val)
}

const decode: DecodeFunction<number> = function fixed32Decode (buf, offset) {
  return buf.getInt32(offset, true)
}

export const fixed32 = createCodec('fixed32', CODEC_TYPES.BIT32, encode, decode, encodingLength)
