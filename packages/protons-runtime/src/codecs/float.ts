import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

const ENCODING_LENGTH = 4

const encode: EncodeFunction<number> = function floatEncode (val) {
  const buf = alloc(ENCODING_LENGTH)
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength)
  view.setFloat32(0, val, true)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<number> = function floatDecode (buf, offset) {
  return {
    value: buf.getFloat32(offset, true),
    length: ENCODING_LENGTH
  }
}

export const float = createCodec('float', CODEC_TYPES.BIT32, encode, decode)
