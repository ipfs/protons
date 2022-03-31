import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<number> = function floatEncodingLength () {
  return 4
}

const encode: EncodeFunction<number> = function floatEncode (val, buf, offset) {
  buf.setFloat32(offset, val, true)

  return offset + encodingLength(val)
}

const decode: DecodeFunction<number> = function floatDecode (buf, offset) {
  return buf.getFloat32(offset, true)
}

export const float = createCodec('float', CODEC_TYPES.BIT32, encode, decode, encodingLength)
