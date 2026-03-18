import { createCodec, CODEC_TYPES } from '../codec.ts'
import type { DecodeFunction, EncodeFunction, Codec } from '../codec.ts'

export function enumeration <T> (v: any): Codec<T, any, any> {
  function findValue (val: string | number): number {
    // Use the reverse mapping to look up the enum key for the stored value
    // https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
    if (v[val.toString()] == null) {
      throw new Error('Invalid enum value')
    }

    return v[val]
  }

  const encode: EncodeFunction<number | string> = function enumEncode (val, writer) {
    const enumValue = findValue(val)

    writer.int32(enumValue)
  }

  const decode: DecodeFunction<number | string> = function enumDecode (reader) {
    const val = reader.int32()

    return findValue(val)
  }

  // @ts-expect-error yeah yeah
  return createCodec('enum', CODEC_TYPES.VARINT, encode, decode)
}
