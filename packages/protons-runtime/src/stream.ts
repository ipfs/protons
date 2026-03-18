import { createReader } from './utils/reader.ts'
import type { Codec, StreamingDecodeOptions } from './codec.ts'
import type { Uint8ArrayList } from 'uint8arraylist'

export function * streamMessage <T, StreamEvent, StreamCollectionsEvent> (buf: Uint8Array | Uint8ArrayList, codec: Pick<Codec<T, StreamEvent, StreamCollectionsEvent>, 'stream'>, opts?: StreamingDecodeOptions<T>): Generator<StreamEvent | StreamCollectionsEvent> {
  const reader = createReader(buf)

  yield * codec.stream(reader, undefined, opts)
}
