// @ts-expect-error no types
import ReaderClass from 'protobufjs/src/reader.js'
// @ts-expect-error no types
import ReaderBufferClass from 'protobufjs/src/reader_buffer.js'
// @ts-expect-error no types
import util from 'protobufjs/src/util/minimal.js'
// @ts-expect-error no types
import WriterClass from 'protobufjs/src/writer.js'
// @ts-expect-error no types
import WriterBufferClass from 'protobufjs/src/writer_buffer.js'

import type { Reader, Writer } from './index.js'

function configure (): void {
  util._configure()
  ReaderClass._configure(ReaderBufferClass)
  WriterClass._configure(WriterBufferClass)
}

// Set up buffer utility according to the environment
configure()

// monkey patch the reader to add native bigint support
const methods = [
  'uint64', 'int64', 'sint64', 'fixed64', 'sfixed64'
]

function patchReader (obj: any): any {
  for (const method of methods) {
    if (obj[method] == null) {
      continue
    }

    const original = obj[method]
    obj[method] = function (): bigint {
      return BigInt(original.call(this).toString())
    }
  }

  return obj
}

export function reader (buf: Uint8Array): Reader {
  return patchReader(new ReaderClass(buf))
}

function patchWriter (obj: any): any {
  for (const method of methods) {
    if (obj[method] == null) {
      continue
    }

    const original = obj[method]
    obj[method] = function (val: bigint) {
      return original.call(this, val.toString())
    }
  }

  return obj
}

export function writer (): Writer {
  return patchWriter(WriterClass.create())
}
