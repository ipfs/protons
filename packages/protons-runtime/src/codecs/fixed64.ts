import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'
import { alloc } from 'uint8arrays/alloc'

const encodingLength: EncodingLengthFunction<bigint> = function int64EncodingLength (val) {
  return 8
}

const encode: EncodeFunction<bigint> = function int64Encode (val) {
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

const decode: DecodeFunction<bigint> = function int64Decode (buf, offset) {
  return buf.getBigInt64(offset, true)
}

export const fixed64 = createCodec('fixed64', CODEC_TYPES.BIT64, encode, decode, encodingLength)
