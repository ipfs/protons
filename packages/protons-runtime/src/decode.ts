import { Uint8ArrayList } from 'uint8arraylist'
import { unsigned } from './utils/varint.js'
import type { Codec } from './codec.js'

export function decodeMessage <T> (buf: Uint8Array, codec: Codec<T>) {
  // wrap root message
  const prefix = new Uint8Array(unsigned.encodingLength(buf.length))
  unsigned.encode(buf.length, prefix)

  return codec.decode(new Uint8ArrayList(prefix, buf), 0)
}
