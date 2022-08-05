import { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from './codec.js'

export function encodeMessage <T> (message: T, codec: Codec<T>): Uint8ArrayList {
  const encoded = codec.encode(message)
  const list = Uint8ArrayList.fromUint8Arrays(encoded.bufs, encoded.length)

  // unwrap root message - it is prefixed by a varint so skip those bytes
  let skip = 0
  for (let i = 0; i < list.byteLength; i++) {
    skip = i + 1

    // when the MSB is not 1, there are no more bytes in this varint
    if ((list.get(i) & 0x80) !== 0x80) {
      break
    }
  }

  return list.sublist(skip)
}
