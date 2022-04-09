import { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from './codecs/codec.js'
import { unsigned } from './utils/varint.js'

export function encodeMessage <T> (message: T, codec: Codec<T>) {
  const len = codec.encodingLength(message)
  const buf = new Uint8ArrayList(Buffer.allocUnsafe(len))

  // unwrap root message
  codec.encode(message, buf, 0)
  const skip = unsigned.encodingLength(unsigned.decode(buf, 0))
  return buf.slice(skip)
}
