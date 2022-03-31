import { Uint8ArrayList } from 'uint8arraylist'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<number> = function fixed32EncodingLength () {
  return 4
}

const encode: EncodeFunction<number> = function fixed32Encode (val) {
  const buf = new Uint8ArrayList(new Uint8Array(encodingLength(val)))
  buf.setInt32(0, val, true)

  return buf
}

const decode: DecodeFunction<number> = function fixed32Decode (buf, offset) {
  return buf.getInt32(offset, true)
}

export const fixed32 = createCodec('fixed32', CODEC_TYPES.BIT32, encode, decode, encodingLength)
