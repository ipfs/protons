import { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from './utils/varint.js'
import type { Codec } from './codec.js'

export function decodeMessage <T> (buf: Uint8Array | Uint8ArrayList, codec: Codec<T>): T {
  // wrap root message
  const prefix = new Uint8Array(unsigned.encodingLength(buf.byteLength))
  unsigned.encode(buf.byteLength, prefix)

  return codec.decode(new Uint8ArrayList(prefix, buf), 0)
}
