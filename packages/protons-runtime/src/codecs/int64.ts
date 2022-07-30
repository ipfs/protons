import { signed } from 'uint8-varint/big'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<bigint> = function int64EncodingLength (val) {
  if (val < 0n) {
    return 10 // 10 bytes per spec - https://developers.google.com/protocol-buffers/docs/encoding#signed-ints
  }

  return signed.encodingLength(val)
}

const encode: EncodeFunction<bigint> = function int64Encode (val) {
  const buf = new Uint8Array(encodingLength(val))

  return signed.encode(val, buf)
}

const decode: DecodeFunction<bigint> = function int64Decode (buf, offset) {
  return signed.decode(buf, offset) | 0n
}

export const int64 = createCodec('int64', CODEC_TYPES.VARINT, encode, decode, encodingLength)
