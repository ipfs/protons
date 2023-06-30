import { reader } from './utils.js'
import type { Codec } from './codec.js'
import type { Uint8ArrayList } from 'uint8arraylist'

export function decodeMessage <T> (buf: Uint8Array | Uint8ArrayList, codec: Codec<T>): T {
  const r = reader(buf instanceof Uint8Array ? buf : buf.subarray())

  return codec.decode(r)
}
