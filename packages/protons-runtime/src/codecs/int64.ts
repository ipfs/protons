import { signed } from '../utils/big-varint.js'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<bigint> = function int64EncodingLength (val) {
  return signed.encodingLength(val)
}

const encode: EncodeFunction<bigint> = function int64Encode (val, buf, offset) {
  return signed.encode(val, buf, offset)
}

const decode: DecodeFunction<bigint> = function int64Decode (buf, offset) {
  return signed.decode(buf, offset) | 0n
}

export const int64 = createCodec('int64', CODEC_TYPES.VARINT, encode, decode, encodingLength)
