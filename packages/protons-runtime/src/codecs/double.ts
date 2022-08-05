import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

const encodingLength: EncodingLengthFunction<number> = function doubleEncodingLength () {
  return 8
}

const encode: EncodeFunction<number> = function doubleEncode (val) {
  const buf = alloc(encodingLength(val))
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
  return buf.getFloat64(offset, true)
}

export const double = createCodec('double', CODEC_TYPES.BIT64, encode, decode, encodingLength)
