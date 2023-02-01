import type { Uint8ArrayList } from 'uint8arraylist'

import type { Codec } from './codec.js'
import { reader } from './utils.js'

export function decodeMessage <T> (buf: Uint8Array | Uint8ArrayList, codec: Codec<T>): T {
  const r = reader(buf instanceof Uint8Array ? buf : buf.subarray())

  return codec.decode(r)
}
