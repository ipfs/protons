import type { Codec } from './codec.js'
import { createWriter } from './utils/writer.js'

export function encodeMessage <T> (message: T, codec: Codec<T>): Uint8Array {
  const w = createWriter()

  codec.encode(message, w, {
    lengthDelimited: false
  })

  return w.finish()
}
