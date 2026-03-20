import { createCodec, CODEC_TYPES } from '../codec.ts'
import type { EncodeFunction, DecodeFunction, Codec, StreamFunction } from '../codec.ts'

export interface Factory<A, T> {
  new (obj: A): T
}

export function message <T> (encode: EncodeFunction<T>, decode: DecodeFunction<T>, stream: StreamFunction<T>): Codec<T> {
  return createCodec('message', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, stream)
}
