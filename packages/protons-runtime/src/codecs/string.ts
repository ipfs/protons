import { unsigned } from '../utils/varint.js'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'
import { Uint8ArrayList } from 'uint8arraylist'

const encodingLength: EncodingLengthFunction<string> = function stringEncodingLength (val) {
  const len = uint8ArrayFromString(val).byteLength
  return unsigned.encodingLength(len) + len
}

const encode: EncodeFunction<string> = function stringEncode (val) {
  const asBuf = uint8ArrayFromString(val)
  const prefix = new Uint8Array(unsigned.encodingLength(asBuf.byteLength))

  unsigned.encode(asBuf.length, prefix)

  return new Uint8ArrayList(prefix, asBuf)
}

const decode: DecodeFunction<string> = function stringDecode (buf, offset) {
  const strLen = unsigned.decode(buf, offset)
  offset += unsigned.encodingLength(strLen)

  return uint8ArrayToString(buf.slice(offset, offset + strLen))
}

export const string = createCodec('string', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, encodingLength)
