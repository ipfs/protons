
import { unsigned } from '../utils/varint.js'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, Codec, CODEC_TYPES } from './codec.js'

export function enumeration <T> (e: T): Codec<T> {
  const encodingLength: EncodingLengthFunction<string> = function enumEncodingLength (val: string) {
    const keys = Object.keys(e)
    const index = keys.indexOf(val)

    return unsigned.encodingLength(index)
  }

  const encode: EncodeFunction<string> = function enumEncode (val, buf, offset) {
    const keys = Object.keys(e)
    const index = keys.indexOf(val)

    return unsigned.encode(index, buf, offset)
  }

  const decode: DecodeFunction<string> = function enumDecode (buf, offset) {
    const index = unsigned.decode(buf, offset)
    const keys = Object.keys(e)

    if (keys[index] == null) {
      throw new Error('Could not find enum key for value')
    }

    return keys[index]
  }

  // @ts-expect-error yeah yeah
  return createCodec('enum', CODEC_TYPES.VARINT, encode, decode, encodingLength)
}
