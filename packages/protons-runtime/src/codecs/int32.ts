import { signed } from '../utils/varint.js'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<number> = function int32EncodingLength (val) {
  return signed.encodingLength(val)
}

const encode: EncodeFunction<number> = function int32Encode (val, buf, offset) {
  return signed.encode(val, buf, offset)
}

const decode: DecodeFunction<number> = function int32Decode (buf, offset) {
  return signed.decode(buf, offset)
}

export const int32 = createCodec('int32', CODEC_TYPES.VARINT, encode, decode, encodingLength)
