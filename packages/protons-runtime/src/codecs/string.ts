import { unsigned } from 'uint8-varint'
import { createCodec, CODEC_TYPES } from '../codec.js'
import { allocUnsafe } from 'uint8arrays/alloc'
import * as utf8 from '../utils/utf8.js'
import type { DecodeFunction, EncodeFunction } from '../codec.js'

const encode: EncodeFunction<string> = function stringEncode (val) {
  const strLen = utf8.length(val)
  const lenLen = unsigned.encodingLength(strLen)
  const buf = allocUnsafe(lenLen + strLen)
  unsigned.encode(strLen, buf)

  utf8.write(val, buf, lenLen)

  return {
    bufs: [
      buf
    ],
    length: buf.byteLength
  }
}

const decode: DecodeFunction<string> = function stringDecode (buf, offset) {
  const strLen = unsigned.decode(buf, offset)
  offset += unsigned.encodingLength(strLen)
  const b = buf.subarray(offset, offset + strLen)
  const value = utf8.read(b, 0, b.byteLength)

  return {
    value,
    length: unsigned.encodingLength(strLen) + strLen
  }
}

export const string = createCodec('string', CODEC_TYPES.LENGTH_DELIMITED, encode, decode)
