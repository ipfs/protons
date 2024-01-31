import { createCodec, CODEC_TYPES, type EncodeFunction, type DecodeFunction, type Codec } from '../codec.js'

export interface Factory<A, T> {
  new (obj: A): T
}

export function message <T> (encode: EncodeFunction<T>, decode: DecodeFunction<T>): Codec<T> {
  return createCodec('message', CODEC_TYPES.LENGTH_DELIMITED, encode, decode)
}
