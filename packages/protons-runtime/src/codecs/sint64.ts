import { zigzag } from 'uint8-varint/big'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<bigint> = function int64EncodingLength (val) {
  return zigzag.encodingLength(val)
}

const encode: EncodeFunction<bigint> = function int64Encode (val) {
  return zigzag.encode(val)
}

const decode: DecodeFunction<bigint> = function int64Decode (buf, offset) {
  return zigzag.decode(buf, offset)
}

export const sint64 = createCodec('sint64', CODEC_TYPES.VARINT, encode, decode, encodingLength)
