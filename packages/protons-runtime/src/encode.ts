import { createWriter } from './utils/writer.ts'
import type { Codec } from './codec.ts'

export function encodeMessage <T> (message: Partial<T>, codec: Pick<Codec<T>, 'encode'>): Uint8Array<ArrayBuffer> {
  const w = createWriter()

  codec.encode(message, w, {
    lengthDelimited: false
  })

  return w.finish()
}
