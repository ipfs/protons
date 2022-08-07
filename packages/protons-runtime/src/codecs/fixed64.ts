import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

const ENCODING_LENGTH = 8

const encode: EncodeFunction<bigint> = function int64Encode (val) {
  const buf = alloc(ENCODING_LENGTH)
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength)
  view.setBigInt64(0, val, true)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<bigint> = function int64Decode (buf, offset) {
  return {
    value: buf.getBigInt64(offset, true),
    length: ENCODING_LENGTH
  }
}

export const fixed64 = createCodec('fixed64', CODEC_TYPES.BIT64, encode, decode)
