import type { Codec } from './codec.js'
import pb from 'protobufjs'

const Writer = pb.Writer

// monkey patch the writer to add native bigint support
const methods = [
  'uint64', 'int64', 'sint64', 'fixed64', 'sfixed64'
]
methods.forEach(method => {
  // @ts-expect-error
  const original = Writer.prototype[method]
  // @ts-expect-error
  Writer.prototype[method] = function (val: bigint): pb.Writer {
    return original.call(this, val.toString())
  }
})

export function encodeMessage <T> (message: T, codec: Codec<T>): Uint8Array {
  const w = Writer.create()

  // @ts-expect-error
  codec.encode(message, w, {
    lengthDelimited: false
  })

  return w.finish()
}
