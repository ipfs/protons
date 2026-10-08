import { createReader } from './utils/reader.ts'
import type { Codec, DecodeOptions } from './codec.ts'
import type { Uint8ArrayList } from 'uint8arraylist'

export function * streamMessage <D, E> (buf: Uint8Array | Uint8ArrayList, codec: Pick<Codec<D, E>, 'stream'>, opts?: DecodeOptions<D>): Generator<any> {
  const reader = createReader(buf)

  yield * codec.stream(reader, undefined, '.', opts)
}
