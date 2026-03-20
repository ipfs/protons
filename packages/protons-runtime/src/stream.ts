import { createReader } from './utils/reader.ts'
import type { Codec } from './codec.ts'
import type { Uint8ArrayList } from 'uint8arraylist'

export function * streamMessage <T> (buf: Uint8Array | Uint8ArrayList, codec: Pick<Codec<T>, 'stream'>, opts?: any): Generator<any> {
  const reader = createReader(buf)

  yield * codec.stream(reader, undefined, opts)
}
