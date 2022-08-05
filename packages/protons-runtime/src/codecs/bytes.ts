
import { unsigned } from 'uint8-varint'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'
import { allocUnsafe } from 'uint8arrays/alloc'

const encodingLength: EncodingLengthFunction<Uint8Array> = function bytesEncodingLength (val) {
  const len = val.byteLength
  return unsigned.encodingLength(len) + len
}

const encode: EncodeFunction<Uint8Array> = function bytesEncode (val) {
  const lenLen = unsigned.encodingLength(val.byteLength)
  const buf = allocUnsafe(lenLen + val.byteLength)
  unsigned.encode(val.byteLength, buf)

  buf.set(val, lenLen)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<Uint8Array> = function bytesDecode (buf, offset) {
  const byteLength = unsigned.decode(buf, offset)
  offset += unsigned.encodingLength(byteLength)

  return buf.subarray(offset, offset + byteLength)
}

export const bytes = createCodec('bytes', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, encodingLength)
