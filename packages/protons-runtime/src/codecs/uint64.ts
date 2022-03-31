import { unsigned } from '../utils/big-varint.js'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<bigint> = function uint64EncodingLength (val) {
  return unsigned.encodingLength(val)
}

const encode: EncodeFunction<bigint> = function uint64Encode (val) {
  const buf = new Uint8Array(unsigned.encodingLength(val))

  unsigned.encode(val, buf)

  return buf
}

const decode: DecodeFunction<bigint> = function uint64Decode (buf, offset) {
  return unsigned.decode(buf, offset)
}

export const uint64 = createCodec('uint64', CODEC_TYPES.VARINT, encode, decode, encodingLength)
