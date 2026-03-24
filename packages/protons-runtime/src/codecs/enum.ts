import { createCodec, CODEC_TYPES } from '../codec.ts'
import type { DecodeFunction, EncodeFunction, Codec, StreamFunction } from '../codec.ts'

export function enumeration <T> (v: any): Codec<T> {
  function findValue (val: any): number {
    // Use the reverse mapping to look up the enum key for the stored value
    // https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
    if (v[val.toString()] == null) {
      throw new Error('Invalid enum value')
    }

    return v[val]
  }

  const encode: EncodeFunction<T> = function enumEncode (val, writer) {
    const enumValue = findValue(val)

    writer.int32(enumValue)
  }

  const decode: DecodeFunction<any> = function enumDecode (reader) {
    const val = reader.int32()

    return findValue(val)
  }

  const stream: StreamFunction<T> = function * enumStream (reader) {
    const val = reader.int32()

    yield findValue(val)
  }

  return createCodec<T>('enum', CODEC_TYPES.VARINT, encode, decode, stream)
}
