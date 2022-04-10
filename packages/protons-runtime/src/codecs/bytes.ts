
import { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from '../utils/varint.js'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'

const encodingLength: EncodingLengthFunction<Uint8Array> = function bytesEncodingLength (val) {
  const len = val.byteLength
  return unsigned.encodingLength(len) + len
}

const encode: EncodeFunction<Uint8Array> = function bytesEncode (val) {
  const prefix = new Uint8Array(unsigned.encodingLength(val.byteLength))

  unsigned.encode(val.byteLength, prefix)

  return new Uint8ArrayList(prefix, val)
}

const decode: DecodeFunction<Uint8Array> = function bytesDecode (buf, offset) {
  const byteLength = unsigned.decode(buf, offset)
  offset += unsigned.encodingLength(byteLength)

  return buf.slice(offset, offset + byteLength)
}

export const bytes = createCodec('bytes', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, encodingLength)
