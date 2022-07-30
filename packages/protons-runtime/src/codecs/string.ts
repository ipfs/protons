import { unsigned } from 'uint8-varint'
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

  return new Uint8ArrayList(
    unsigned.encode(asBuf.byteLength),
    asBuf
  )
}

const decode: DecodeFunction<string> = function stringDecode (buf, offset) {
  const strLen = unsigned.decode(buf, offset)
  offset += unsigned.encodingLength(strLen)

  return uint8ArrayToString(buf.subarray(offset, offset + strLen))
}

export const string = createCodec('string', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, encodingLength)
