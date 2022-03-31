import { Uint8ArrayList } from 'uint8arraylist'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<number> = function floatEncodingLength () {
  return 4
}

const encode: EncodeFunction<number> = function floatEncode (val) {
  const buf = new Uint8ArrayList(new Uint8Array(encodingLength(1)))
  buf.setFloat32(0, val, true)

  return buf
}

const decode: DecodeFunction<number> = function floatDecode (buf, offset) {
  return buf.getFloat32(offset, true)
}

export const float = createCodec('float', CODEC_TYPES.BIT32, encode, decode, encodingLength)
