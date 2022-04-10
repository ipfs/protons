import { signed } from '../utils/varint.js'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<number> = function int32EncodingLength (val) {
  return signed.encodingLength(val)
}

const encode: EncodeFunction<number> = function int32Encode (val) {
  const buf = new Uint8Array(encodingLength(val))
  signed.encode(val, buf)

  return buf
}

const decode: DecodeFunction<number> = function int32Decode (buf, offset) {
  return signed.decode(buf, offset)
}

export const int32 = createCodec('int32', CODEC_TYPES.VARINT, encode, decode, encodingLength)
