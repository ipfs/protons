import { signed } from 'uint8-varint'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<number> = function int32EncodingLength (val) {
  if (val < 0) {
    return 10 // 10 bytes per spec - https://developers.google.com/protocol-buffers/docs/encoding#signed-ints
  }

  return signed.encodingLength(val)
}

const encode: EncodeFunction<number> = function int32Encode (val) {
  const buf = new Uint8Array(encodingLength(val))

  return signed.encode(val, buf)
}

const decode: DecodeFunction<number> = function int32Decode (buf, offset) {
  return signed.decode(buf, offset) | 0
}

export const int32 = createCodec('int32', CODEC_TYPES.VARINT, encode, decode, encodingLength)
