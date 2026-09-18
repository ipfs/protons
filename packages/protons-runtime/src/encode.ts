import { createWriter } from './utils/writer.ts'
import type { Codec } from './codec.ts'

export function encodeMessage <D, E> (message: E, codec: Pick<Codec<D, E>, 'encode'>): Uint8Array<ArrayBuffer> {
  const w = createWriter()

  codec.encode(message, w, {
    lengthDelimited: false
  })

  return w.finish()
}
