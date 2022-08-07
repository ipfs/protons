import { signed } from 'uint8-varint'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

function int32EncodingLength (val: number): number {
  if (val < 0) {
    return 10 // 10 bytes per spec - https://developers.google.com/protocol-buffers/docs/encoding#signed-ints
  }

  return signed.encodingLength(val)
}

const encode: EncodeFunction<number> = function int32Encode (val) {
  const buf = signed.encode(val, alloc(int32EncodingLength(val)))

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<number> = function int32Decode (buf, offset) {
  const value = signed.decode(buf, offset) | 0

  return {
    value,
    length: int32EncodingLength(value)
  }
}

export const int32 = createCodec('int32', CODEC_TYPES.VARINT, encode, decode)
