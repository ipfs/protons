import { unsigned } from '../utils/varint.js'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<number> = function uint32EncodingLength (val) {
  return unsigned.encodingLength(val)
}

const encode: EncodeFunction<number> = function uint32Encode (val) {
  // val = val < 0 ? val + 4294967296 : val

  const buf = new Uint8Array(encodingLength(val))

  unsigned.encode(val, buf)

  return buf
}

const decode: DecodeFunction<number> = function uint32Decode (buf, offset) {
  return unsigned.decode(buf, offset)

  // return value > 2147483647 ? value - 4294967296 : value
}

export const uint32 = createCodec('uint32', CODEC_TYPES.VARINT, encode, decode, encodingLength)
