import { createReader } from './utils/reader.ts'
import type { Codec, DecodeOptions } from './codec.ts'
import type { Uint8ArrayList } from 'uint8arraylist'

export function decodeMessage <T> (buf: Uint8Array | Uint8ArrayList, codec: Pick<Codec<T, any, any>, 'decode'>, opts?: DecodeOptions<T>): T {
  const reader = createReader(buf)

  return codec.decode(reader, undefined, opts)
}
