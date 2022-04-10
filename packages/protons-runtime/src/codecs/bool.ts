import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<boolean> = function boolEncodingLength () {
  return 1
}

const encode: EncodeFunction<boolean> = function boolEncode (value) {
  return Uint8Array.from([value ? 1 : 0])
}

const decode: DecodeFunction<boolean> = function boolDecode (buffer, offset) {
  return buffer.get(offset) > 0
}

export const bool = createCodec('bool', CODEC_TYPES.VARINT, encode, decode, encodingLength)
