import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<bigint> = function sfixed64EncodingLength () {
  return 8
}

const encode: EncodeFunction<bigint> = function sfixed64Encode (val, buf, offset) {
  buf.setBigInt64(offset, val, true)

  return offset + encodingLength(val)
}

const decode: DecodeFunction<bigint> = function sfixed64Decode (buf, offset) {
  return buf.getBigInt64(offset, true)
}

export const sfixed64 = createCodec('sfixed64', CODEC_TYPES.BIT64, encode, decode, encodingLength)
