import { createCodec, CODEC_TYPES } from '../codec.ts'
import type { EncodeFunction, DecodeFunction, Codec, StreamFunction } from '../codec.ts'

export interface Factory<A, T> {
  new (obj: A): T
}

export function message <T, StreamEvent, StreamCollectionEvent> (encode: EncodeFunction<T>, decode: DecodeFunction<T>, stream: StreamFunction<T, any, any>): Codec<T, StreamEvent, StreamCollectionEvent> {
  return createCodec('message', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, stream)
}
