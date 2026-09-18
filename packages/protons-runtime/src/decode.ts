import { createReader } from './utils/reader.ts'
import type { Codec, DecodeOptions } from './codec.ts'
import type { Uint8ArrayList } from 'uint8arraylist'

export function decodeMessage <D, E> (buf: Uint8Array | Uint8ArrayList, codec: Pick<Codec<D, E>, 'decode'>, opts?: DecodeOptions<D>): D {
  const reader = createReader(buf)

  return codec.decode(reader, undefined, opts)
}
