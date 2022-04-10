import { Uint8ArrayList } from 'uint8arraylist'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<number> = function doubleEncodingLength () {
  return 8
}

const encode: EncodeFunction<number> = function doubleEncode (val) {
  const buf = new Uint8ArrayList(new Uint8Array(encodingLength(val)))
  buf.setFloat64(0, val, true)

  return buf
}

const decode: DecodeFunction<number> = function doubleDecode (buf, offset) {
  return buf.getFloat64(offset, true)
}

export const double = createCodec('double', CODEC_TYPES.BIT64, encode, decode, encodingLength)
