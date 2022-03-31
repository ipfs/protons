import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<boolean> = function boolEncodingLength () {
  return 1
}

const encode: EncodeFunction<boolean> = function boolEncode (val, buf, offset) {
  buf.set(offset, val ? 1 : 0)

  return offset + encodingLength(val)
}

const decode: DecodeFunction<boolean> = function boolDecode (buffer, offset) {
  return buffer.get(offset) > 0
}

export const bool = createCodec('bool', CODEC_TYPES.VARINT, encode, decode, encodingLength)
