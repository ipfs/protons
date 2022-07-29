import { unsigned } from 'uint8-varint/big'
import { createCodec, CODEC_TYPES, DefaultValueFunction, IsDefaultValueFunction } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<bigint> = function uint64EncodingLength (val) {
  return unsigned.encodingLength(val)
}

const encode: EncodeFunction<bigint> = function uint64Encode (val) {
  return unsigned.encode(val)
}

const decode: DecodeFunction<bigint> = function uint64Decode (buf, offset) {
  return unsigned.decode(buf, offset)
}

const defaultValue: DefaultValueFunction<bigint> = () => 0n

const isDefaultValue: IsDefaultValueFunction<bigint> = (val) => val === defaultValue()

export const uint64 = createCodec('uint64', CODEC_TYPES.VARINT, encode, decode, encodingLength, defaultValue, isDefaultValue)
