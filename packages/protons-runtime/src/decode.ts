import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from './codec.js'
import { createReader } from './utils/reader.js'

export function decodeMessage <T> (buf: Uint8Array | Uint8ArrayList, codec: Codec<T>): T {
  const reader = createReader(buf)

  return codec.decode(reader)
}
