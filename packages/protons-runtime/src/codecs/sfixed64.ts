import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

const encodingLength: EncodingLengthFunction<bigint> = function sfixed64EncodingLength () {
  return 8
}

const encode: EncodeFunction<bigint> = function sfixed64Encode (val) {
  const buf = alloc(encodingLength(val))
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength)
  view.setBigInt64(0, val, true)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<bigint> = function sfixed64Decode (buf, offset) {
  return buf.getBigInt64(offset, true)
}

export const sfixed64 = createCodec('sfixed64', CODEC_TYPES.BIT64, encode, decode, encodingLength)
