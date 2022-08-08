import { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from './codec.js'

export function encodeMessage <T> (message: T, codec: Codec<T>): Uint8ArrayList {
  const encoded = codec.encode(message, {
    lengthDelimited: false
  })

  return Uint8ArrayList.fromUint8Arrays(encoded.bufs, encoded.length)
}
