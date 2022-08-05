import { unsigned } from 'uint8-varint'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<number> = function uint32EncodingLength (val) {
  return unsigned.encodingLength(val)
}

const encode: EncodeFunction<number> = function uint32Encode (val) {
  const buf = unsigned.encode(val)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<number> = function uint32Decode (buf, offset) {
  return unsigned.decode(buf, offset)
}

export const uint32 = createCodec('uint32', CODEC_TYPES.VARINT, encode, decode, encodingLength)
