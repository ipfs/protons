import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from './codec.js'
import pb from 'protobufjs'

const Reader = pb.Reader

// monkey patch the reader to add native bigint support
const methods = [
  'uint64', 'int64', 'sint64', 'fixed64', 'sfixed64'
]
methods.forEach(method => {
  // @ts-expect-error
  const original = Reader.prototype[method]
  // @ts-expect-error
  Reader.prototype[method] = function (): bigint {
    return BigInt(original.call(this).toString())
  }
})

export function decodeMessage <T> (buf: Uint8Array | Uint8ArrayList, codec: Codec<T>): T {
  const reader = Reader.create(buf instanceof Uint8Array ? buf : buf.subarray())

  // @ts-expect-error
  return codec.decode(reader)
}
