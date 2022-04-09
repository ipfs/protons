import { unsigned } from '../utils/varint.js'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<number> = function uint32EncodingLength (val) {
  return unsigned.encodingLength(val)
}

const encode: EncodeFunction<number> = function uint32Encode (val, buf, offset) {
  return unsigned.encode(val, buf, offset)
}

const decode: DecodeFunction<number> = function uint32Decode (buf, offset) {
  return unsigned.decode(buf, offset)
}

export const uint32 = createCodec('uint32', CODEC_TYPES.VARINT, encode, decode, encodingLength)
