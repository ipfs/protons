import { createCodec, CODEC_TYPES, type EncodeOptions, type Codec } from '../codec.js'
import type { Reader, Writer } from '../index.js'

export interface Factory<A, T> {
  new (obj: A): T
}

export function message <T> (encode: (obj: Partial<T>, writer: Writer, opts?: EncodeOptions) => void, decode: (reader: Reader, length?: number) => T): Codec<T> {
  return createCodec('message', CODEC_TYPES.LENGTH_DELIMITED, encode, decode)
}
