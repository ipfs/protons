import pb from 'protobufjs/minimal.js'
import type { Reader } from './index.js'

const PBReader = pb.Reader

// monkey patch the reader to add native bigint support
const methods = [
  'uint64', 'int64', 'sint64', 'fixed64', 'sfixed64'
]
methods.forEach(method => {
  // @ts-expect-error
  const original = PBReader.prototype[method]
  // @ts-expect-error
  PBReader.prototype[method] = function (): bigint {
    return BigInt(original.call(this).toString())
  }
})

export function reader (buf: Uint8Array): Reader {
  // @ts-expect-error class is monkey patched
  return PBReader.create(buf)
}
