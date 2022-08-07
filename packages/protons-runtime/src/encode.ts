import { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from './codec.js'
import { unsigned } from 'uint8-varint'

export function encodeMessage <T> (message: T, codec: Codec<T>): Uint8ArrayList {
  const encoded = codec.encode(message)
  const list = Uint8ArrayList.fromUint8Arrays(encoded.bufs, encoded.length)

  // unwrap root message - it is prefixed by a varint so skip those bytes
  const length = unsigned.decode(list)
  const lengthLength = unsigned.encodingLength(length)
  return list.sublist(lengthLength)
}
