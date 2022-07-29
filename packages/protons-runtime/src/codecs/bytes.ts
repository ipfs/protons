
import { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from 'uint8-varint'
import { createCodec, CODEC_TYPES, DefaultValueFunction, IsDefaultValueFunction } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction } from '../codec.js'
import { equals } from 'uint8arrays/equals'

const encodingLength: EncodingLengthFunction<Uint8Array> = function bytesEncodingLength (val) {
  const len = val.byteLength
  return unsigned.encodingLength(len) + len
}

const encode: EncodeFunction<Uint8Array> = function bytesEncode (val) {
  return new Uint8ArrayList(
    unsigned.encode(val.byteLength),
    val
  )
}

const decode: DecodeFunction<Uint8Array> = function bytesDecode (buf, offset) {
  const byteLength = unsigned.decode(buf, offset)
  offset += unsigned.encodingLength(byteLength)

  return buf.subarray(offset, offset + byteLength)
}

const defaultValue: DefaultValueFunction<Uint8Array> = () => new Uint8Array()

const isDefaultValue: IsDefaultValueFunction<Uint8Array> = (value: Uint8Array) => equals(value, defaultValue())

export const bytes = createCodec('bytes', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, encodingLength, defaultValue, isDefaultValue)
