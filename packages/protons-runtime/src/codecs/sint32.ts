import { zigzag } from '../utils/varint.js'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<number> = function sint32EncodingLength (val) {
  return zigzag.encodingLength(val)
}

const encode: EncodeFunction<number> = function svarintEncode (val, buf, offset) {
  return zigzag.encode(val, buf, offset)
}

const decode: DecodeFunction<number> = function svarintDecode (buf, offset) {
  return zigzag.decode(buf, offset)
}

export const sint32 = createCodec('sint32', CODEC_TYPES.VARINT, encode, decode, encodingLength)
