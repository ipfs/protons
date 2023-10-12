import { createReader } from './utils/reader.js'
import type { Codec } from './codec.js'
import type { Uint8ArrayList } from 'uint8arraylist'

export function decodeMessage <T> (buf: Uint8Array | Uint8ArrayList, codec: Codec<T>): T {
  const reader = createReader(buf)

  return codec.decode(reader)
}
