import { decodeMessage, encodeMessage, MaxLengthError, message, reader, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface GlobalPacked {
  expanded: number[]
  packedOldOption: number[]
  expandedOldOption: number[]
  packedNewOption: number[]
  expandedNewOption: number[]
}

export namespace GlobalPacked {
  let _codec: Codec<GlobalPacked>

  export const codec = (): Codec<GlobalPacked> => {
    if (_codec == null) {
      _codec = message<GlobalPacked>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.expanded != null && obj.expanded.length > 0) {
          for (const value of obj.expanded) {
            w.uint32(8)
            w.int32(value)
          }
        }

        if (obj.packedOldOption != null && obj.packedOldOption.length > 0) {
          for (const value of obj.packedOldOption) {
            w.uint32(16)
            w.int32(value)
          }
        }

        if (obj.expandedOldOption != null && obj.expandedOldOption.length > 0) {
          for (const value of obj.expandedOldOption) {
            w.uint32(24)
            w.int32(value)
          }
        }

        if (obj.packedNewOption != null && obj.packedNewOption.length > 0) {
          w.uint32(34)
          w.fork()

          for (const value of obj.packedNewOption) {
            w.int32(value)
          }

          w.ldelim()
        }

        if (obj.expandedNewOption != null && obj.expandedNewOption.length > 0) {
          for (const value of obj.expandedNewOption) {
            w.uint32(40)
            w.int32(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          expanded: [],
          packedOldOption: [],
          expandedOldOption: [],
          packedNewOption: [],
          expandedNewOption: []
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.expanded != null && obj.expanded.length === opts.limits.expanded) {
                throw new MaxLengthError('Decode error - repeated field "expanded" had too many elements')
              }

              obj.expanded.push(r.int32())
              break
            }
            case 2: {
              if (opts.limits?.packedOldOption != null && obj.packedOldOption.length === opts.limits.packedOldOption) {
                throw new MaxLengthError('Decode error - repeated field "packedOldOption" had too many elements')
              }

              obj.packedOldOption.push(r.int32())
              break
            }
            case 3: {
              if (opts.limits?.expandedOldOption != null && obj.expandedOldOption.length === opts.limits.expandedOldOption) {
                throw new MaxLengthError('Decode error - repeated field "expandedOldOption" had too many elements')
              }

              obj.expandedOldOption.push(r.int32())
              break
            }
            case 4: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.packedNewOption != null && obj.packedNewOption.length === opts.limits.packedNewOption) {
                  throw new MaxLengthError('Decode error - repeated field "packedNewOption" had too many elements')
                }

                obj.packedNewOption.push(r2.int32())
              }

              break
            }
            case 5: {
              if (opts.limits?.expandedNewOption != null && obj.expandedNewOption.length === opts.limits.expandedNewOption) {
                throw new MaxLengthError('Decode error - repeated field "expandedNewOption" had too many elements')
              }

              obj.expandedNewOption.push(r.int32())
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (r, length, prefix, opts = {}) {
        const obj = {
          expanded: 0,
          packedOldOption: 0,
          expandedOldOption: 0,
          packedNewOption: 0,
          expandedNewOption: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'GlobalPacked'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.expanded != null && obj.expanded === opts.limits.expanded) {
                throw new MaxLengthError('Streaming decode error - repeated field "expanded" had too many elements')
              }

              yield {
                field: `${prefix}expanded[]`,
                index: obj.expanded,
                value: r.int32()
              }

              obj.expanded++

              break
            }
            case 2: {
              if (opts.limits?.packedOldOption != null && obj.packedOldOption === opts.limits.packedOldOption) {
                throw new MaxLengthError('Streaming decode error - repeated field "packedOldOption" had too many elements')
              }

              yield {
                field: `${prefix}packedOldOption[]`,
                index: obj.packedOldOption,
                value: r.int32()
              }

              obj.packedOldOption++

              break
            }
            case 3: {
              if (opts.limits?.expandedOldOption != null && obj.expandedOldOption === opts.limits.expandedOldOption) {
                throw new MaxLengthError('Streaming decode error - repeated field "expandedOldOption" had too many elements')
              }

              yield {
                field: `${prefix}expandedOldOption[]`,
                index: obj.expandedOldOption,
                value: r.int32()
              }

              obj.expandedOldOption++

              break
            }
            case 4: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.packedNewOption != null && obj.packedNewOption === opts.limits.packedNewOption) {
                  throw new MaxLengthError('Streaming decode error - repeated field "packedNewOption" had too many elements')
                }

                yield {
                  field: `${prefix}packedNewOption[]`,
                  index: obj.packedNewOption,
                  value: r2.int32()
                }

                obj.packedNewOption++
              }

              break
            }
            case 5: {
              if (opts.limits?.expandedNewOption != null && obj.expandedNewOption === opts.limits.expandedNewOption) {
                throw new MaxLengthError('Streaming decode error - repeated field "expandedNewOption" had too many elements')
              }

              yield {
                field: `${prefix}expandedNewOption[]`,
                index: obj.expandedNewOption,
                value: r.int32()
              }

              obj.expandedNewOption++

              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'end',
            message: 'GlobalPacked'
          }
        }
      })
    }

    return _codec
  }

  export interface GlobalPackedExpandedFieldEvent {
    field: '.expanded[]'
    index: number
    value: number
  }

  export interface GlobalPackedPackedOldOptionFieldEvent {
    field: '.packedOldOption[]'
    index: number
    value: number
  }

  export interface GlobalPackedExpandedOldOptionFieldEvent {
    field: '.expandedOldOption[]'
    index: number
    value: number
  }

  export interface GlobalPackedPackedNewOptionFieldEvent {
    field: '.packedNewOption[]'
    index: number
    value: number
  }

  export interface GlobalPackedExpandedNewOptionFieldEvent {
    field: '.expandedNewOption[]'
    index: number
    value: number
  }

  export function encode (obj: Partial<GlobalPacked>): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, GlobalPacked.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<GlobalPacked>): GlobalPacked {
    return decodeMessage(buf, GlobalPacked.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<GlobalPacked>): Generator<GlobalPackedExpandedFieldEvent | GlobalPackedPackedOldOptionFieldEvent | GlobalPackedExpandedOldOptionFieldEvent | GlobalPackedPackedNewOptionFieldEvent | GlobalPackedExpandedNewOptionFieldEvent> {
    return streamMessage(buf, GlobalPacked.codec(), opts)
  }
}
