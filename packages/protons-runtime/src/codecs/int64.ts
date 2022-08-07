import { signed } from 'uint8-varint/big'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

function int64EncodingLength (val: bigint): number {
  if (val < 0n) {
    return 10 // 10 bytes per spec - https://developers.google.com/protocol-buffers/docs/encoding#signed-ints
  }

  return signed.encodingLength(val)
}

const encode: EncodeFunction<bigint> = function int64Encode (val) {
  const buf = signed.encode(val, alloc(int64EncodingLength(val)))

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<bigint> = function int64Decode (buf, offset) {
  const value = signed.decode(buf, offset) | 0n

  return {
    value,
    length: int64EncodingLength(value)
  }
}

export const int64 = createCodec('int64', CODEC_TYPES.VARINT, encode, decode)
