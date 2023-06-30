import { writer } from './utils.js'
import type { Codec } from './codec.js'

export function encodeMessage <T> (message: T, codec: Codec<T>): Uint8Array {
  const w = writer()

  codec.encode(message, w, {
    lengthDelimited: false
  })

  return w.finish()
}
