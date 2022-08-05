import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

const encodingLength: EncodingLengthFunction<number> = function floatEncodingLength () {
  return 4
}

const encode: EncodeFunction<number> = function floatEncode (val) {
  const buf = alloc(encodingLength(val))
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
  return buf.getFloat32(offset, true)
}

export const float = createCodec('float', CODEC_TYPES.BIT32, encode, decode, encodingLength)
