import { Uint8ArrayList } from 'uint8arraylist'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<bigint> = function sfixed64EncodingLength () {
  return 8
}

const encode: EncodeFunction<bigint> = function sfixed64Encode (val) {
  const buf = new Uint8ArrayList(new Uint8Array(encodingLength(val)))
  buf.setBigInt64(0, val, true)

  return buf
}

const decode: DecodeFunction<bigint> = function sfixed64Decode (buf, offset) {
  return buf.getBigInt64(offset, true)
}

export const sfixed64 = createCodec('sfixed64', CODEC_TYPES.BIT64, encode, decode, encodingLength)
