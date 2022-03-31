import { zigzag } from '../utils/big-varint.js'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<bigint> = function int64EncodingLength (val) {
  return zigzag.encodingLength(val)
}

const encode: EncodeFunction<bigint> = function int64Encode (val, buf, offset) {
  return zigzag.encode(val, buf, offset)
}

const decode: DecodeFunction<bigint> = function int64Decode (buf, offset) {
  return zigzag.decode(buf, offset)
}

export const sint64 = createCodec('sint64', CODEC_TYPES.VARINT, encode, decode, encodingLength)
