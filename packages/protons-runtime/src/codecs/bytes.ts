
import { unsigned } from 'uint8-varint'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'
import { allocUnsafe } from 'uint8arrays/alloc'

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
  const byteLengthLength = unsigned.encodingLength(byteLength)
  offset += byteLengthLength

  return {
    value: buf.subarray(offset, offset + byteLength),
    length: byteLengthLength + byteLength
  }
}

export const bytes = createCodec('bytes', CODEC_TYPES.LENGTH_DELIMITED, encode, decode)
