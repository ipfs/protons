import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

const ENCODING_LENGTH = 8

const encode: EncodeFunction<number> = function doubleEncode (val) {
  const buf = alloc(ENCODING_LENGTH)
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength)
  view.setFloat64(0, val, true)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<number> = function doubleDecode (buf, offset) {
  return {
    value: buf.getFloat64(offset, true),
    length: ENCODING_LENGTH
  }
}

export const double = createCodec('double', CODEC_TYPES.BIT64, encode, decode)
