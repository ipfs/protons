import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<bigint> = function int64EncodingLength (val) {
  return 8
}

const encode: EncodeFunction<bigint> = function int64Encode (val, buf, offset) {
  buf.setBigInt64(offset, val, true)

  return offset + encodingLength(val)
}

const decode: DecodeFunction<bigint> = function int64Decode (buf, offset) {
  return buf.getBigInt64(offset, true)
}

export const fixed64 = createCodec('fixed64', CODEC_TYPES.BIT64, encode, decode, encodingLength)
