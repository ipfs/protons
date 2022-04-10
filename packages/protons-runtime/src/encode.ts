import type { Codec } from './codec.js'
import { unsigned } from './utils/varint.js'

export function encodeMessage <T> (message: T, codec: Codec<T>) {
  // unwrap root message
  const encoded = codec.encode(message)
  const skip = unsigned.encodingLength(unsigned.decode(encoded))

  return encoded.slice(skip)
}
