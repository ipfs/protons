import { createCodec, CODEC_TYPES } from '../codec.ts'
import { UnsupportedDecodeLimitsError } from '../index.ts'
import type { EncodeFunction, DecodeFunction, Codec, StreamFunction } from '../codec.ts'

export interface Factory<A, T> {
  new (obj: A): T
}

export interface MessageCodecOptions {
  totalLimits?: boolean
}

export function message <D, E> (encode: EncodeFunction<E>, decode: DecodeFunction<D>, stream: StreamFunction<D>, options: MessageCodecOptions = {}): Codec<D, E> {
  const codec = createCodec('message', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, stream)

  if (options.totalLimits !== true) {
    codec.decode = (r, length, opts) => {
      if (opts?.totalLimits != null) {
        throw new UnsupportedDecodeLimitsError('Regenerate this codec to use totalLimits')
      }
      return decode(r, length, opts)
    }
    codec.stream = function * (r, length, prefix, opts) {
      if (opts?.totalLimits != null) {
        throw new UnsupportedDecodeLimitsError('Regenerate this codec to use totalLimits')
      }
      yield * stream(r, length, prefix, opts)
    }
  }

  return codec
}
