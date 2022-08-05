import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

const encodingLength: EncodingLengthFunction<number> = function fixed32EncodingLength () {
  return 4
}

const encode: EncodeFunction<number> = function fixed32Encode (val) {
  const buf = alloc(encodingLength(val))
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength)
  view.setInt32(0, val, true)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<number> = function fixed32Decode (buf, offset) {
  return buf.getInt32(offset, true)
}

export const fixed32 = createCodec('fixed32', CODEC_TYPES.BIT32, encode, decode, encodingLength)
