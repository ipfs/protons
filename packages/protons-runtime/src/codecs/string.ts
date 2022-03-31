import { unsigned } from '../utils/varint.js'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, CODEC_TYPES } from './codec.js'

const encodingLength: EncodingLengthFunction<string> = function stringEncodingLength (val) {
  const len = uint8ArrayFromString(val).byteLength
  return unsigned.encodingLength(len) + val.length
}

const encode: EncodeFunction<string> = function stringEncode (val, buf, offset) {
  const asBuf = uint8ArrayFromString(val)
  offset = unsigned.encode(asBuf.length, buf, offset)
  buf.write(asBuf, offset)

  return offset + asBuf.byteLength
}

const decode: DecodeFunction<string> = function stringDecode (buf, offset) {
  const strLen = unsigned.decode(buf, offset)
  offset += unsigned.encodingLength(strLen)

  return uint8ArrayToString(buf.slice(offset, offset + strLen))
}

export const string = createCodec('string', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, encodingLength)
