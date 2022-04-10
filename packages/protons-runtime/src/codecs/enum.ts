
import { unsigned } from '../utils/varint.js'
import { createCodec, CODEC_TYPES } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction, Codec } from '../codec.js'

export function enumeration <T> (e: T): Codec<T> {
  const encodingLength: EncodingLengthFunction<string> = function enumEncodingLength (val: string) {
    const keys = Object.keys(e)
    const index = keys.indexOf(val)

    return unsigned.encodingLength(index)
  }

  const encode: EncodeFunction<string> = function enumEncode (val) {
    const keys = Object.keys(e)
    const index = keys.indexOf(val)
    const buf = new Uint8Array(unsigned.encodingLength(index))

    unsigned.encode(index, buf)

    return buf
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
