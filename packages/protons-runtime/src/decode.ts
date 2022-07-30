import { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from 'uint8-varint'
import type { Codec } from './codec.js'
import { allocUnsafe } from './utils/alloc.js'

export function decodeMessage <T> (buf: Uint8Array | Uint8ArrayList, codec: Codec<T>): T {
  // wrap root message
  const prefix = allocUnsafe(unsigned.encodingLength(buf.byteLength))
  unsigned.encode(buf.byteLength, prefix)

  return codec.decode(new Uint8ArrayList(prefix, buf), 0)
}
