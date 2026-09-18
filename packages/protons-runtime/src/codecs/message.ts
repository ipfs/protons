import { createCodec, CODEC_TYPES } from '../codec.ts'
import type { EncodeFunction, DecodeFunction, Codec, StreamFunction } from '../codec.ts'

export interface Factory<A, T> {
  new (obj: A): T
}

export function message <D, E> (encode: EncodeFunction<E>, decode: DecodeFunction<D>, stream: StreamFunction<D>): Codec<D, E> {
  return createCodec('message', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, stream)
}
