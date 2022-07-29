import { zigzag } from 'uint8-varint'
import { createCodec, CODEC_TYPES, DefaultValueFunction, IsDefaultValueFunction } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<number> = function sint32EncodingLength (val) {
  return zigzag.encodingLength(val)
}

const encode: EncodeFunction<number> = function svarintEncode (val) {
  return zigzag.encode(val)
}

const decode: DecodeFunction<number> = function svarintDecode (buf, offset) {
  return zigzag.decode(buf, offset)
}

const defaultValue: DefaultValueFunction<number> = () => 0

const isDefaultValue: IsDefaultValueFunction<number> = (val) => val === defaultValue()

export const sint32 = createCodec('sint32', CODEC_TYPES.VARINT, encode, decode, encodingLength, defaultValue, isDefaultValue)
