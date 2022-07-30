import { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from './codec.js'
import { unsigned } from 'uint8-varint'

export function encodeMessage <T> (message: T, codec: Codec<T>): Uint8ArrayList {
  // unwrap root message
  const encoded = codec.encode(message)
  const skip = unsigned.encodingLength(unsigned.decode(encoded))

  if (encoded instanceof Uint8Array) {
    return new Uint8ArrayList(encoded.subarray(skip))
  }

  return encoded.sublist(skip)
}
