import { createReader } from './utils/reader.ts'
import type { Codec } from './codec.ts'
import type { Uint8ArrayList } from 'uint8arraylist'

export function * streamMessage <D, E> (buf: Uint8Array | Uint8ArrayList, codec: Pick<Codec<D, E>, 'stream'>, opts?: any): Generator<any> {
  const reader = createReader(buf)

  yield * codec.stream(reader, undefined, '.', opts)
}
