import pb from 'protobufjs/minimal.js'
import type { Writer } from './index.js'

const PBWriter = pb.Writer

// monkey patch the writer to add native bigint support
const methods = [
  'uint64', 'int64', 'sint64', 'fixed64', 'sfixed64'
]
methods.forEach(method => {
  // @ts-expect-error
  const original = PBWriter.prototype[method]
  // @ts-expect-error
  PBWriter.prototype[method] = function (val: bigint): pb.Writer {
    return original.call(this, val.toString())
  }
})

export function writer (): Writer {
  // @ts-expect-error class is monkey patched
  return PBWriter.create()
}
