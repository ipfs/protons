import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<number> = function doubleEncodingLength () {
  return 8
}

const encode: EncodeFunction<number> = function doubleEncode (val, buf, offset) {
  buf.setFloat64(offset, val, true)

  return offset + encodingLength(val)
}

const decode: DecodeFunction<number> = function doubleDecode (buf, offset) {
  return buf.getFloat64(offset, true)
}

export const double = createCodec('double', CODEC_TYPES.BIT64, encode, decode, encodingLength)
