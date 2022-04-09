
import { unsigned } from '../utils/varint.js'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<Uint8Array> = function bytesEncodingLength (val) {
  const len = val.byteLength
  return unsigned.encodingLength(len) + len
}

const encode: EncodeFunction<Uint8Array> = function bytesEncode (val, buf, offset) {
  offset = unsigned.encode(val.byteLength, buf, offset)
  buf.write(val, offset)

  return offset + val.byteLength
}

const decode: DecodeFunction<Uint8Array> = function bytesDecode (buf, offset) {
  const byteLength = unsigned.decode(buf, offset)
  offset += unsigned.encodingLength(byteLength)

  return buf.slice(offset, offset + byteLength)
}

export const bytes = createCodec('bytes', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, encodingLength)
