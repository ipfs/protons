import { decodeMessage, encodeMessage, MaxLengthError, message, reader, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Proto2DefaultPackedTypes {
  doubles: number[]
  floats: number[]
  int32s: number[]
  int64s: bigint[]
  uint32s: number[]
  uint64s: bigint[]
  sint32s: number[]
  sint64s: bigint[]
  fixed32s: number[]
  fixed64s: bigint[]
  sfixed32s: number[]
  sfixed64s: bigint[]
  bools: boolean[]
}

export interface Proto2DefaultPackedTypesInput {
  doubles?: number[]
  floats?: number[]
  int32s?: number[]
  int64s?: bigint[]
  uint32s?: number[]
  uint64s?: bigint[]
  sint32s?: number[]
  sint64s?: bigint[]
  fixed32s?: number[]
  fixed64s?: bigint[]
  sfixed32s?: number[]
  sfixed64s?: bigint[]
  bools?: boolean[]
}

export namespace Proto2DefaultPackedTypes {
  let _codec: Codec<Proto2DefaultPackedTypes, Proto2DefaultPackedTypesInput>

  export const codec = (): Codec<Proto2DefaultPackedTypes, Proto2DefaultPackedTypesInput> => {
    if (_codec == null) {
      _codec = message<Proto2DefaultPackedTypes, Proto2DefaultPackedTypesInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.doubles != null && obj.doubles.length > 0) {
          for (const value of obj.doubles) {
            w.uint32(9)
            w.double(value)
          }
        }

        if (obj.floats != null && obj.floats.length > 0) {
          for (const value of obj.floats) {
            w.uint32(21)
            w.float(value)
          }
        }

        if (obj.int32s != null && obj.int32s.length > 0) {
          for (const value of obj.int32s) {
            w.uint32(24)
            w.int32(value)
          }
        }

        if (obj.int64s != null && obj.int64s.length > 0) {
          for (const value of obj.int64s) {
            w.uint32(32)
            w.int64(value)
          }
        }

        if (obj.uint32s != null && obj.uint32s.length > 0) {
          for (const value of obj.uint32s) {
            w.uint32(40)
            w.uint32(value)
          }
        }

        if (obj.uint64s != null && obj.uint64s.length > 0) {
          for (const value of obj.uint64s) {
            w.uint32(48)
            w.uint64(value)
          }
        }

        if (obj.sint32s != null && obj.sint32s.length > 0) {
          for (const value of obj.sint32s) {
            w.uint32(56)
            w.sint32(value)
          }
        }

        if (obj.sint64s != null && obj.sint64s.length > 0) {
          for (const value of obj.sint64s) {
            w.uint32(64)
            w.sint64(value)
          }
        }

        if (obj.fixed32s != null && obj.fixed32s.length > 0) {
          for (const value of obj.fixed32s) {
            w.uint32(77)
            w.fixed32(value)
          }
        }

        if (obj.fixed64s != null && obj.fixed64s.length > 0) {
          for (const value of obj.fixed64s) {
            w.uint32(81)
            w.fixed64(value)
          }
        }

        if (obj.sfixed32s != null && obj.sfixed32s.length > 0) {
          for (const value of obj.sfixed32s) {
            w.uint32(93)
            w.sfixed32(value)
          }
        }

        if (obj.sfixed64s != null && obj.sfixed64s.length > 0) {
          for (const value of obj.sfixed64s) {
            w.uint32(97)
            w.sfixed64(value)
          }
        }

        if (obj.bools != null && obj.bools.length > 0) {
          for (const value of obj.bools) {
            w.uint32(104)
            w.bool(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          doubles: [],
          floats: [],
          int32s: [],
          int64s: [],
          uint32s: [],
          uint64s: [],
          sint32s: [],
          sint64s: [],
          fixed32s: [],
          fixed64s: [],
          sfixed32s: [],
          sfixed64s: [],
          bools: []
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.doubles != null && obj.doubles.length === opts.limits.doubles) {
                throw new MaxLengthError('Decode error - repeated field "doubles" had too many elements')
              }

              obj.doubles.push(r.double())
              break
            }
            case 2: {
              if (opts.limits?.floats != null && obj.floats.length === opts.limits.floats) {
                throw new MaxLengthError('Decode error - repeated field "floats" had too many elements')
              }

              obj.floats.push(r.float())
              break
            }
            case 3: {
              if (opts.limits?.int32s != null && obj.int32s.length === opts.limits.int32s) {
                throw new MaxLengthError('Decode error - repeated field "int32s" had too many elements')
              }

              obj.int32s.push(r.int32())
              break
            }
            case 4: {
              if (opts.limits?.int64s != null && obj.int64s.length === opts.limits.int64s) {
                throw new MaxLengthError('Decode error - repeated field "int64s" had too many elements')
              }

              obj.int64s.push(r.int64())
              break
            }
            case 5: {
              if (opts.limits?.uint32s != null && obj.uint32s.length === opts.limits.uint32s) {
                throw new MaxLengthError('Decode error - repeated field "uint32s" had too many elements')
              }

              obj.uint32s.push(r.uint32())
              break
            }
            case 6: {
              if (opts.limits?.uint64s != null && obj.uint64s.length === opts.limits.uint64s) {
                throw new MaxLengthError('Decode error - repeated field "uint64s" had too many elements')
              }

              obj.uint64s.push(r.uint64())
              break
            }
            case 7: {
              if (opts.limits?.sint32s != null && obj.sint32s.length === opts.limits.sint32s) {
                throw new MaxLengthError('Decode error - repeated field "sint32s" had too many elements')
              }

              obj.sint32s.push(r.sint32())
              break
            }
            case 8: {
              if (opts.limits?.sint64s != null && obj.sint64s.length === opts.limits.sint64s) {
                throw new MaxLengthError('Decode error - repeated field "sint64s" had too many elements')
              }

              obj.sint64s.push(r.sint64())
              break
            }
            case 9: {
              if (opts.limits?.fixed32s != null && obj.fixed32s.length === opts.limits.fixed32s) {
                throw new MaxLengthError('Decode error - repeated field "fixed32s" had too many elements')
              }

              obj.fixed32s.push(r.fixed32())
              break
            }
            case 10: {
              if (opts.limits?.fixed64s != null && obj.fixed64s.length === opts.limits.fixed64s) {
                throw new MaxLengthError('Decode error - repeated field "fixed64s" had too many elements')
              }

              obj.fixed64s.push(r.fixed64())
              break
            }
            case 11: {
              if (opts.limits?.sfixed32s != null && obj.sfixed32s.length === opts.limits.sfixed32s) {
                throw new MaxLengthError('Decode error - repeated field "sfixed32s" had too many elements')
              }

              obj.sfixed32s.push(r.sfixed32())
              break
            }
            case 12: {
              if (opts.limits?.sfixed64s != null && obj.sfixed64s.length === opts.limits.sfixed64s) {
                throw new MaxLengthError('Decode error - repeated field "sfixed64s" had too many elements')
              }

              obj.sfixed64s.push(r.sfixed64())
              break
            }
            case 13: {
              if (opts.limits?.bools != null && obj.bools.length === opts.limits.bools) {
                throw new MaxLengthError('Decode error - repeated field "bools" had too many elements')
              }

              obj.bools.push(r.bool())
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
          doubles: 0,
          floats: 0,
          int32s: 0,
          int64s: 0,
          uint32s: 0,
          uint64s: 0,
          sint32s: 0,
          sint64s: 0,
          fixed32s: 0,
          fixed64s: 0,
          sfixed32s: 0,
          sfixed64s: 0,
          bools: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'Proto2DefaultPackedTypes'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.doubles != null && obj.doubles === opts.limits.doubles) {
                throw new MaxLengthError('Streaming decode error - repeated field "doubles" had too many elements')
              }

              yield {
                field: `${prefix}doubles[]`,
                index: obj.doubles,
                value: r.double()
              }

              obj.doubles++

              break
            }
            case 2: {
              if (opts.limits?.floats != null && obj.floats === opts.limits.floats) {
                throw new MaxLengthError('Streaming decode error - repeated field "floats" had too many elements')
              }

              yield {
                field: `${prefix}floats[]`,
                index: obj.floats,
                value: r.float()
              }

              obj.floats++

              break
            }
            case 3: {
              if (opts.limits?.int32s != null && obj.int32s === opts.limits.int32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "int32s" had too many elements')
              }

              yield {
                field: `${prefix}int32s[]`,
                index: obj.int32s,
                value: r.int32()
              }

              obj.int32s++

              break
            }
            case 4: {
              if (opts.limits?.int64s != null && obj.int64s === opts.limits.int64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "int64s" had too many elements')
              }

              yield {
                field: `${prefix}int64s[]`,
                index: obj.int64s,
                value: r.int64()
              }

              obj.int64s++

              break
            }
            case 5: {
              if (opts.limits?.uint32s != null && obj.uint32s === opts.limits.uint32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "uint32s" had too many elements')
              }

              yield {
                field: `${prefix}uint32s[]`,
                index: obj.uint32s,
                value: r.uint32()
              }

              obj.uint32s++

              break
            }
            case 6: {
              if (opts.limits?.uint64s != null && obj.uint64s === opts.limits.uint64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "uint64s" had too many elements')
              }

              yield {
                field: `${prefix}uint64s[]`,
                index: obj.uint64s,
                value: r.uint64()
              }

              obj.uint64s++

              break
            }
            case 7: {
              if (opts.limits?.sint32s != null && obj.sint32s === opts.limits.sint32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "sint32s" had too many elements')
              }

              yield {
                field: `${prefix}sint32s[]`,
                index: obj.sint32s,
                value: r.sint32()
              }

              obj.sint32s++

              break
            }
            case 8: {
              if (opts.limits?.sint64s != null && obj.sint64s === opts.limits.sint64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "sint64s" had too many elements')
              }

              yield {
                field: `${prefix}sint64s[]`,
                index: obj.sint64s,
                value: r.sint64()
              }

              obj.sint64s++

              break
            }
            case 9: {
              if (opts.limits?.fixed32s != null && obj.fixed32s === opts.limits.fixed32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "fixed32s" had too many elements')
              }

              yield {
                field: `${prefix}fixed32s[]`,
                index: obj.fixed32s,
                value: r.fixed32()
              }

              obj.fixed32s++

              break
            }
            case 10: {
              if (opts.limits?.fixed64s != null && obj.fixed64s === opts.limits.fixed64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "fixed64s" had too many elements')
              }

              yield {
                field: `${prefix}fixed64s[]`,
                index: obj.fixed64s,
                value: r.fixed64()
              }

              obj.fixed64s++

              break
            }
            case 11: {
              if (opts.limits?.sfixed32s != null && obj.sfixed32s === opts.limits.sfixed32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "sfixed32s" had too many elements')
              }

              yield {
                field: `${prefix}sfixed32s[]`,
                index: obj.sfixed32s,
                value: r.sfixed32()
              }

              obj.sfixed32s++

              break
            }
            case 12: {
              if (opts.limits?.sfixed64s != null && obj.sfixed64s === opts.limits.sfixed64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "sfixed64s" had too many elements')
              }

              yield {
                field: `${prefix}sfixed64s[]`,
                index: obj.sfixed64s,
                value: r.sfixed64()
              }

              obj.sfixed64s++

              break
            }
            case 13: {
              if (opts.limits?.bools != null && obj.bools === opts.limits.bools) {
                throw new MaxLengthError('Streaming decode error - repeated field "bools" had too many elements')
              }

              yield {
                field: `${prefix}bools[]`,
                index: obj.bools,
                value: r.bool()
              }

              obj.bools++

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
            message: 'Proto2DefaultPackedTypes'
          }
        }
      })
    }

    return _codec
  }

  export interface Proto2DefaultPackedTypesDoublesFieldEvent {
    field: '.doubles[]'
    index: number
    value: number
  }

  export interface Proto2DefaultPackedTypesFloatsFieldEvent {
    field: '.floats[]'
    index: number
    value: number
  }

  export interface Proto2DefaultPackedTypesInt32sFieldEvent {
    field: '.int32s[]'
    index: number
    value: number
  }

  export interface Proto2DefaultPackedTypesInt64sFieldEvent {
    field: '.int64s[]'
    index: number
    value: bigint
  }

  export interface Proto2DefaultPackedTypesUint32sFieldEvent {
    field: '.uint32s[]'
    index: number
    value: number
  }

  export interface Proto2DefaultPackedTypesUint64sFieldEvent {
    field: '.uint64s[]'
    index: number
    value: bigint
  }

  export interface Proto2DefaultPackedTypesSint32sFieldEvent {
    field: '.sint32s[]'
    index: number
    value: number
  }

  export interface Proto2DefaultPackedTypesSint64sFieldEvent {
    field: '.sint64s[]'
    index: number
    value: bigint
  }

  export interface Proto2DefaultPackedTypesFixed32sFieldEvent {
    field: '.fixed32s[]'
    index: number
    value: number
  }

  export interface Proto2DefaultPackedTypesFixed64sFieldEvent {
    field: '.fixed64s[]'
    index: number
    value: bigint
  }

  export interface Proto2DefaultPackedTypesSfixed32sFieldEvent {
    field: '.sfixed32s[]'
    index: number
    value: number
  }

  export interface Proto2DefaultPackedTypesSfixed64sFieldEvent {
    field: '.sfixed64s[]'
    index: number
    value: bigint
  }

  export interface Proto2DefaultPackedTypesBoolsFieldEvent {
    field: '.bools[]'
    index: number
    value: boolean
  }

  export function encode (obj: Proto2DefaultPackedTypesInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Proto2DefaultPackedTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Proto2DefaultPackedTypes>): Proto2DefaultPackedTypes {
    return decodeMessage(buf, Proto2DefaultPackedTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Proto2DefaultPackedTypes>): Generator<Proto2DefaultPackedTypesDoublesFieldEvent | Proto2DefaultPackedTypesFloatsFieldEvent | Proto2DefaultPackedTypesInt32sFieldEvent | Proto2DefaultPackedTypesInt64sFieldEvent | Proto2DefaultPackedTypesUint32sFieldEvent | Proto2DefaultPackedTypesUint64sFieldEvent | Proto2DefaultPackedTypesSint32sFieldEvent | Proto2DefaultPackedTypesSint64sFieldEvent | Proto2DefaultPackedTypesFixed32sFieldEvent | Proto2DefaultPackedTypesFixed64sFieldEvent | Proto2DefaultPackedTypesSfixed32sFieldEvent | Proto2DefaultPackedTypesSfixed64sFieldEvent | Proto2DefaultPackedTypesBoolsFieldEvent> {
    return streamMessage(buf, Proto2DefaultPackedTypes.codec(), opts)
  }
}

export interface Proto2PackedTypes {
  doubles: number[]
  floats: number[]
  int32s: number[]
  int64s: bigint[]
  uint32s: number[]
  uint64s: bigint[]
  sint32s: number[]
  sint64s: bigint[]
  fixed32s: number[]
  fixed64s: bigint[]
  sfixed32s: number[]
  sfixed64s: bigint[]
  bools: boolean[]
}

export interface Proto2PackedTypesInput {
  doubles?: number[]
  floats?: number[]
  int32s?: number[]
  int64s?: bigint[]
  uint32s?: number[]
  uint64s?: bigint[]
  sint32s?: number[]
  sint64s?: bigint[]
  fixed32s?: number[]
  fixed64s?: bigint[]
  sfixed32s?: number[]
  sfixed64s?: bigint[]
  bools?: boolean[]
}

export namespace Proto2PackedTypes {
  let _codec: Codec<Proto2PackedTypes, Proto2PackedTypesInput>

  export const codec = (): Codec<Proto2PackedTypes, Proto2PackedTypesInput> => {
    if (_codec == null) {
      _codec = message<Proto2PackedTypes, Proto2PackedTypesInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.doubles != null && obj.doubles.length > 0) {
          w.uint32(10)
          w.fork()

          for (const value of obj.doubles) {
            w.double(value)
          }

          w.ldelim()
        }

        if (obj.floats != null && obj.floats.length > 0) {
          w.uint32(18)
          w.fork()

          for (const value of obj.floats) {
            w.float(value)
          }

          w.ldelim()
        }

        if (obj.int32s != null && obj.int32s.length > 0) {
          w.uint32(26)
          w.fork()

          for (const value of obj.int32s) {
            w.int32(value)
          }

          w.ldelim()
        }

        if (obj.int64s != null && obj.int64s.length > 0) {
          w.uint32(34)
          w.fork()

          for (const value of obj.int64s) {
            w.int64(value)
          }

          w.ldelim()
        }

        if (obj.uint32s != null && obj.uint32s.length > 0) {
          w.uint32(42)
          w.fork()

          for (const value of obj.uint32s) {
            w.uint32(value)
          }

          w.ldelim()
        }

        if (obj.uint64s != null && obj.uint64s.length > 0) {
          w.uint32(50)
          w.fork()

          for (const value of obj.uint64s) {
            w.uint64(value)
          }

          w.ldelim()
        }

        if (obj.sint32s != null && obj.sint32s.length > 0) {
          w.uint32(58)
          w.fork()

          for (const value of obj.sint32s) {
            w.sint32(value)
          }

          w.ldelim()
        }

        if (obj.sint64s != null && obj.sint64s.length > 0) {
          w.uint32(66)
          w.fork()

          for (const value of obj.sint64s) {
            w.sint64(value)
          }

          w.ldelim()
        }

        if (obj.fixed32s != null && obj.fixed32s.length > 0) {
          w.uint32(74)
          w.fork()

          for (const value of obj.fixed32s) {
            w.fixed32(value)
          }

          w.ldelim()
        }

        if (obj.fixed64s != null && obj.fixed64s.length > 0) {
          w.uint32(82)
          w.fork()

          for (const value of obj.fixed64s) {
            w.fixed64(value)
          }

          w.ldelim()
        }

        if (obj.sfixed32s != null && obj.sfixed32s.length > 0) {
          w.uint32(90)
          w.fork()

          for (const value of obj.sfixed32s) {
            w.sfixed32(value)
          }

          w.ldelim()
        }

        if (obj.sfixed64s != null && obj.sfixed64s.length > 0) {
          w.uint32(98)
          w.fork()

          for (const value of obj.sfixed64s) {
            w.sfixed64(value)
          }

          w.ldelim()
        }

        if (obj.bools != null && obj.bools.length > 0) {
          w.uint32(106)
          w.fork()

          for (const value of obj.bools) {
            w.bool(value)
          }

          w.ldelim()
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          doubles: [],
          floats: [],
          int32s: [],
          int64s: [],
          uint32s: [],
          uint64s: [],
          sint32s: [],
          sint64s: [],
          fixed32s: [],
          fixed64s: [],
          sfixed32s: [],
          sfixed64s: [],
          bools: []
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.doubles != null && obj.doubles.length === opts.limits.doubles) {
                  throw new MaxLengthError('Decode error - repeated field "doubles" had too many elements')
                }

                obj.doubles.push(r2.double())
              }

              break
            }
            case 2: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.floats != null && obj.floats.length === opts.limits.floats) {
                  throw new MaxLengthError('Decode error - repeated field "floats" had too many elements')
                }

                obj.floats.push(r2.float())
              }

              break
            }
            case 3: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.int32s != null && obj.int32s.length === opts.limits.int32s) {
                  throw new MaxLengthError('Decode error - repeated field "int32s" had too many elements')
                }

                obj.int32s.push(r2.int32())
              }

              break
            }
            case 4: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.int64s != null && obj.int64s.length === opts.limits.int64s) {
                  throw new MaxLengthError('Decode error - repeated field "int64s" had too many elements')
                }

                obj.int64s.push(r2.int64())
              }

              break
            }
            case 5: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.uint32s != null && obj.uint32s.length === opts.limits.uint32s) {
                  throw new MaxLengthError('Decode error - repeated field "uint32s" had too many elements')
                }

                obj.uint32s.push(r2.uint32())
              }

              break
            }
            case 6: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.uint64s != null && obj.uint64s.length === opts.limits.uint64s) {
                  throw new MaxLengthError('Decode error - repeated field "uint64s" had too many elements')
                }

                obj.uint64s.push(r2.uint64())
              }

              break
            }
            case 7: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.sint32s != null && obj.sint32s.length === opts.limits.sint32s) {
                  throw new MaxLengthError('Decode error - repeated field "sint32s" had too many elements')
                }

                obj.sint32s.push(r2.sint32())
              }

              break
            }
            case 8: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.sint64s != null && obj.sint64s.length === opts.limits.sint64s) {
                  throw new MaxLengthError('Decode error - repeated field "sint64s" had too many elements')
                }

                obj.sint64s.push(r2.sint64())
              }

              break
            }
            case 9: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.fixed32s != null && obj.fixed32s.length === opts.limits.fixed32s) {
                  throw new MaxLengthError('Decode error - repeated field "fixed32s" had too many elements')
                }

                obj.fixed32s.push(r2.fixed32())
              }

              break
            }
            case 10: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.fixed64s != null && obj.fixed64s.length === opts.limits.fixed64s) {
                  throw new MaxLengthError('Decode error - repeated field "fixed64s" had too many elements')
                }

                obj.fixed64s.push(r2.fixed64())
              }

              break
            }
            case 11: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.sfixed32s != null && obj.sfixed32s.length === opts.limits.sfixed32s) {
                  throw new MaxLengthError('Decode error - repeated field "sfixed32s" had too many elements')
                }

                obj.sfixed32s.push(r2.sfixed32())
              }

              break
            }
            case 12: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.sfixed64s != null && obj.sfixed64s.length === opts.limits.sfixed64s) {
                  throw new MaxLengthError('Decode error - repeated field "sfixed64s" had too many elements')
                }

                obj.sfixed64s.push(r2.sfixed64())
              }

              break
            }
            case 13: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.bools != null && obj.bools.length === opts.limits.bools) {
                  throw new MaxLengthError('Decode error - repeated field "bools" had too many elements')
                }

                obj.bools.push(r2.bool())
              }

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
          doubles: 0,
          floats: 0,
          int32s: 0,
          int64s: 0,
          uint32s: 0,
          uint64s: 0,
          sint32s: 0,
          sint64s: 0,
          fixed32s: 0,
          fixed64s: 0,
          sfixed32s: 0,
          sfixed64s: 0,
          bools: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'Proto2PackedTypes'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.doubles != null && obj.doubles === opts.limits.doubles) {
                  throw new MaxLengthError('Streaming decode error - repeated field "doubles" had too many elements')
                }

                yield {
                  field: `${prefix}doubles[]`,
                  index: obj.doubles,
                  value: r2.double()
                }

                obj.doubles++
              }

              break
            }
            case 2: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.floats != null && obj.floats === opts.limits.floats) {
                  throw new MaxLengthError('Streaming decode error - repeated field "floats" had too many elements')
                }

                yield {
                  field: `${prefix}floats[]`,
                  index: obj.floats,
                  value: r2.float()
                }

                obj.floats++
              }

              break
            }
            case 3: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.int32s != null && obj.int32s === opts.limits.int32s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "int32s" had too many elements')
                }

                yield {
                  field: `${prefix}int32s[]`,
                  index: obj.int32s,
                  value: r2.int32()
                }

                obj.int32s++
              }

              break
            }
            case 4: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.int64s != null && obj.int64s === opts.limits.int64s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "int64s" had too many elements')
                }

                yield {
                  field: `${prefix}int64s[]`,
                  index: obj.int64s,
                  value: r2.int64()
                }

                obj.int64s++
              }

              break
            }
            case 5: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.uint32s != null && obj.uint32s === opts.limits.uint32s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "uint32s" had too many elements')
                }

                yield {
                  field: `${prefix}uint32s[]`,
                  index: obj.uint32s,
                  value: r2.uint32()
                }

                obj.uint32s++
              }

              break
            }
            case 6: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.uint64s != null && obj.uint64s === opts.limits.uint64s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "uint64s" had too many elements')
                }

                yield {
                  field: `${prefix}uint64s[]`,
                  index: obj.uint64s,
                  value: r2.uint64()
                }

                obj.uint64s++
              }

              break
            }
            case 7: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.sint32s != null && obj.sint32s === opts.limits.sint32s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "sint32s" had too many elements')
                }

                yield {
                  field: `${prefix}sint32s[]`,
                  index: obj.sint32s,
                  value: r2.sint32()
                }

                obj.sint32s++
              }

              break
            }
            case 8: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.sint64s != null && obj.sint64s === opts.limits.sint64s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "sint64s" had too many elements')
                }

                yield {
                  field: `${prefix}sint64s[]`,
                  index: obj.sint64s,
                  value: r2.sint64()
                }

                obj.sint64s++
              }

              break
            }
            case 9: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.fixed32s != null && obj.fixed32s === opts.limits.fixed32s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "fixed32s" had too many elements')
                }

                yield {
                  field: `${prefix}fixed32s[]`,
                  index: obj.fixed32s,
                  value: r2.fixed32()
                }

                obj.fixed32s++
              }

              break
            }
            case 10: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.fixed64s != null && obj.fixed64s === opts.limits.fixed64s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "fixed64s" had too many elements')
                }

                yield {
                  field: `${prefix}fixed64s[]`,
                  index: obj.fixed64s,
                  value: r2.fixed64()
                }

                obj.fixed64s++
              }

              break
            }
            case 11: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.sfixed32s != null && obj.sfixed32s === opts.limits.sfixed32s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "sfixed32s" had too many elements')
                }

                yield {
                  field: `${prefix}sfixed32s[]`,
                  index: obj.sfixed32s,
                  value: r2.sfixed32()
                }

                obj.sfixed32s++
              }

              break
            }
            case 12: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.sfixed64s != null && obj.sfixed64s === opts.limits.sfixed64s) {
                  throw new MaxLengthError('Streaming decode error - repeated field "sfixed64s" had too many elements')
                }

                yield {
                  field: `${prefix}sfixed64s[]`,
                  index: obj.sfixed64s,
                  value: r2.sfixed64()
                }

                obj.sfixed64s++
              }

              break
            }
            case 13: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {
                if (opts.limits?.bools != null && obj.bools === opts.limits.bools) {
                  throw new MaxLengthError('Streaming decode error - repeated field "bools" had too many elements')
                }

                yield {
                  field: `${prefix}bools[]`,
                  index: obj.bools,
                  value: r2.bool()
                }

                obj.bools++
              }

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
            message: 'Proto2PackedTypes'
          }
        }
      })
    }

    return _codec
  }

  export interface Proto2PackedTypesDoublesFieldEvent {
    field: '.doubles[]'
    index: number
    value: number
  }

  export interface Proto2PackedTypesFloatsFieldEvent {
    field: '.floats[]'
    index: number
    value: number
  }

  export interface Proto2PackedTypesInt32sFieldEvent {
    field: '.int32s[]'
    index: number
    value: number
  }

  export interface Proto2PackedTypesInt64sFieldEvent {
    field: '.int64s[]'
    index: number
    value: bigint
  }

  export interface Proto2PackedTypesUint32sFieldEvent {
    field: '.uint32s[]'
    index: number
    value: number
  }

  export interface Proto2PackedTypesUint64sFieldEvent {
    field: '.uint64s[]'
    index: number
    value: bigint
  }

  export interface Proto2PackedTypesSint32sFieldEvent {
    field: '.sint32s[]'
    index: number
    value: number
  }

  export interface Proto2PackedTypesSint64sFieldEvent {
    field: '.sint64s[]'
    index: number
    value: bigint
  }

  export interface Proto2PackedTypesFixed32sFieldEvent {
    field: '.fixed32s[]'
    index: number
    value: number
  }

  export interface Proto2PackedTypesFixed64sFieldEvent {
    field: '.fixed64s[]'
    index: number
    value: bigint
  }

  export interface Proto2PackedTypesSfixed32sFieldEvent {
    field: '.sfixed32s[]'
    index: number
    value: number
  }

  export interface Proto2PackedTypesSfixed64sFieldEvent {
    field: '.sfixed64s[]'
    index: number
    value: bigint
  }

  export interface Proto2PackedTypesBoolsFieldEvent {
    field: '.bools[]'
    index: number
    value: boolean
  }

  export function encode (obj: Proto2PackedTypesInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Proto2PackedTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Proto2PackedTypes>): Proto2PackedTypes {
    return decodeMessage(buf, Proto2PackedTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Proto2PackedTypes>): Generator<Proto2PackedTypesDoublesFieldEvent | Proto2PackedTypesFloatsFieldEvent | Proto2PackedTypesInt32sFieldEvent | Proto2PackedTypesInt64sFieldEvent | Proto2PackedTypesUint32sFieldEvent | Proto2PackedTypesUint64sFieldEvent | Proto2PackedTypesSint32sFieldEvent | Proto2PackedTypesSint64sFieldEvent | Proto2PackedTypesFixed32sFieldEvent | Proto2PackedTypesFixed64sFieldEvent | Proto2PackedTypesSfixed32sFieldEvent | Proto2PackedTypesSfixed64sFieldEvent | Proto2PackedTypesBoolsFieldEvent> {
    return streamMessage(buf, Proto2PackedTypes.codec(), opts)
  }
}

export interface Proto2ExpandedTypes {
  doubles: number[]
  floats: number[]
  int32s: number[]
  int64s: bigint[]
  uint32s: number[]
  uint64s: bigint[]
  sint32s: number[]
  sint64s: bigint[]
  fixed32s: number[]
  fixed64s: bigint[]
  sfixed32s: number[]
  sfixed64s: bigint[]
  bools: boolean[]
}

export interface Proto2ExpandedTypesInput {
  doubles?: number[]
  floats?: number[]
  int32s?: number[]
  int64s?: bigint[]
  uint32s?: number[]
  uint64s?: bigint[]
  sint32s?: number[]
  sint64s?: bigint[]
  fixed32s?: number[]
  fixed64s?: bigint[]
  sfixed32s?: number[]
  sfixed64s?: bigint[]
  bools?: boolean[]
}

export namespace Proto2ExpandedTypes {
  let _codec: Codec<Proto2ExpandedTypes, Proto2ExpandedTypesInput>

  export const codec = (): Codec<Proto2ExpandedTypes, Proto2ExpandedTypesInput> => {
    if (_codec == null) {
      _codec = message<Proto2ExpandedTypes, Proto2ExpandedTypesInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.doubles != null && obj.doubles.length > 0) {
          for (const value of obj.doubles) {
            w.uint32(9)
            w.double(value)
          }
        }

        if (obj.floats != null && obj.floats.length > 0) {
          for (const value of obj.floats) {
            w.uint32(21)
            w.float(value)
          }
        }

        if (obj.int32s != null && obj.int32s.length > 0) {
          for (const value of obj.int32s) {
            w.uint32(24)
            w.int32(value)
          }
        }

        if (obj.int64s != null && obj.int64s.length > 0) {
          for (const value of obj.int64s) {
            w.uint32(32)
            w.int64(value)
          }
        }

        if (obj.uint32s != null && obj.uint32s.length > 0) {
          for (const value of obj.uint32s) {
            w.uint32(40)
            w.uint32(value)
          }
        }

        if (obj.uint64s != null && obj.uint64s.length > 0) {
          for (const value of obj.uint64s) {
            w.uint32(48)
            w.uint64(value)
          }
        }

        if (obj.sint32s != null && obj.sint32s.length > 0) {
          for (const value of obj.sint32s) {
            w.uint32(56)
            w.sint32(value)
          }
        }

        if (obj.sint64s != null && obj.sint64s.length > 0) {
          for (const value of obj.sint64s) {
            w.uint32(64)
            w.sint64(value)
          }
        }

        if (obj.fixed32s != null && obj.fixed32s.length > 0) {
          for (const value of obj.fixed32s) {
            w.uint32(77)
            w.fixed32(value)
          }
        }

        if (obj.fixed64s != null && obj.fixed64s.length > 0) {
          for (const value of obj.fixed64s) {
            w.uint32(81)
            w.fixed64(value)
          }
        }

        if (obj.sfixed32s != null && obj.sfixed32s.length > 0) {
          for (const value of obj.sfixed32s) {
            w.uint32(93)
            w.sfixed32(value)
          }
        }

        if (obj.sfixed64s != null && obj.sfixed64s.length > 0) {
          for (const value of obj.sfixed64s) {
            w.uint32(97)
            w.sfixed64(value)
          }
        }

        if (obj.bools != null && obj.bools.length > 0) {
          for (const value of obj.bools) {
            w.uint32(104)
            w.bool(value)
          }
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length, opts = {}) => {
        const obj: any = {
          doubles: [],
          floats: [],
          int32s: [],
          int64s: [],
          uint32s: [],
          uint64s: [],
          sint32s: [],
          sint64s: [],
          fixed32s: [],
          fixed64s: [],
          sfixed32s: [],
          sfixed64s: [],
          bools: []
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.doubles != null && obj.doubles.length === opts.limits.doubles) {
                throw new MaxLengthError('Decode error - repeated field "doubles" had too many elements')
              }

              obj.doubles.push(r.double())
              break
            }
            case 2: {
              if (opts.limits?.floats != null && obj.floats.length === opts.limits.floats) {
                throw new MaxLengthError('Decode error - repeated field "floats" had too many elements')
              }

              obj.floats.push(r.float())
              break
            }
            case 3: {
              if (opts.limits?.int32s != null && obj.int32s.length === opts.limits.int32s) {
                throw new MaxLengthError('Decode error - repeated field "int32s" had too many elements')
              }

              obj.int32s.push(r.int32())
              break
            }
            case 4: {
              if (opts.limits?.int64s != null && obj.int64s.length === opts.limits.int64s) {
                throw new MaxLengthError('Decode error - repeated field "int64s" had too many elements')
              }

              obj.int64s.push(r.int64())
              break
            }
            case 5: {
              if (opts.limits?.uint32s != null && obj.uint32s.length === opts.limits.uint32s) {
                throw new MaxLengthError('Decode error - repeated field "uint32s" had too many elements')
              }

              obj.uint32s.push(r.uint32())
              break
            }
            case 6: {
              if (opts.limits?.uint64s != null && obj.uint64s.length === opts.limits.uint64s) {
                throw new MaxLengthError('Decode error - repeated field "uint64s" had too many elements')
              }

              obj.uint64s.push(r.uint64())
              break
            }
            case 7: {
              if (opts.limits?.sint32s != null && obj.sint32s.length === opts.limits.sint32s) {
                throw new MaxLengthError('Decode error - repeated field "sint32s" had too many elements')
              }

              obj.sint32s.push(r.sint32())
              break
            }
            case 8: {
              if (opts.limits?.sint64s != null && obj.sint64s.length === opts.limits.sint64s) {
                throw new MaxLengthError('Decode error - repeated field "sint64s" had too many elements')
              }

              obj.sint64s.push(r.sint64())
              break
            }
            case 9: {
              if (opts.limits?.fixed32s != null && obj.fixed32s.length === opts.limits.fixed32s) {
                throw new MaxLengthError('Decode error - repeated field "fixed32s" had too many elements')
              }

              obj.fixed32s.push(r.fixed32())
              break
            }
            case 10: {
              if (opts.limits?.fixed64s != null && obj.fixed64s.length === opts.limits.fixed64s) {
                throw new MaxLengthError('Decode error - repeated field "fixed64s" had too many elements')
              }

              obj.fixed64s.push(r.fixed64())
              break
            }
            case 11: {
              if (opts.limits?.sfixed32s != null && obj.sfixed32s.length === opts.limits.sfixed32s) {
                throw new MaxLengthError('Decode error - repeated field "sfixed32s" had too many elements')
              }

              obj.sfixed32s.push(r.sfixed32())
              break
            }
            case 12: {
              if (opts.limits?.sfixed64s != null && obj.sfixed64s.length === opts.limits.sfixed64s) {
                throw new MaxLengthError('Decode error - repeated field "sfixed64s" had too many elements')
              }

              obj.sfixed64s.push(r.sfixed64())
              break
            }
            case 13: {
              if (opts.limits?.bools != null && obj.bools.length === opts.limits.bools) {
                throw new MaxLengthError('Decode error - repeated field "bools" had too many elements')
              }

              obj.bools.push(r.bool())
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
          doubles: 0,
          floats: 0,
          int32s: 0,
          int64s: 0,
          uint32s: 0,
          uint64s: 0,
          sint32s: 0,
          sint64s: 0,
          fixed32s: 0,
          fixed64s: 0,
          sfixed32s: 0,
          sfixed64s: 0,
          bools: 0
        }

        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'Proto2ExpandedTypes'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              if (opts.limits?.doubles != null && obj.doubles === opts.limits.doubles) {
                throw new MaxLengthError('Streaming decode error - repeated field "doubles" had too many elements')
              }

              yield {
                field: `${prefix}doubles[]`,
                index: obj.doubles,
                value: r.double()
              }

              obj.doubles++

              break
            }
            case 2: {
              if (opts.limits?.floats != null && obj.floats === opts.limits.floats) {
                throw new MaxLengthError('Streaming decode error - repeated field "floats" had too many elements')
              }

              yield {
                field: `${prefix}floats[]`,
                index: obj.floats,
                value: r.float()
              }

              obj.floats++

              break
            }
            case 3: {
              if (opts.limits?.int32s != null && obj.int32s === opts.limits.int32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "int32s" had too many elements')
              }

              yield {
                field: `${prefix}int32s[]`,
                index: obj.int32s,
                value: r.int32()
              }

              obj.int32s++

              break
            }
            case 4: {
              if (opts.limits?.int64s != null && obj.int64s === opts.limits.int64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "int64s" had too many elements')
              }

              yield {
                field: `${prefix}int64s[]`,
                index: obj.int64s,
                value: r.int64()
              }

              obj.int64s++

              break
            }
            case 5: {
              if (opts.limits?.uint32s != null && obj.uint32s === opts.limits.uint32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "uint32s" had too many elements')
              }

              yield {
                field: `${prefix}uint32s[]`,
                index: obj.uint32s,
                value: r.uint32()
              }

              obj.uint32s++

              break
            }
            case 6: {
              if (opts.limits?.uint64s != null && obj.uint64s === opts.limits.uint64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "uint64s" had too many elements')
              }

              yield {
                field: `${prefix}uint64s[]`,
                index: obj.uint64s,
                value: r.uint64()
              }

              obj.uint64s++

              break
            }
            case 7: {
              if (opts.limits?.sint32s != null && obj.sint32s === opts.limits.sint32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "sint32s" had too many elements')
              }

              yield {
                field: `${prefix}sint32s[]`,
                index: obj.sint32s,
                value: r.sint32()
              }

              obj.sint32s++

              break
            }
            case 8: {
              if (opts.limits?.sint64s != null && obj.sint64s === opts.limits.sint64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "sint64s" had too many elements')
              }

              yield {
                field: `${prefix}sint64s[]`,
                index: obj.sint64s,
                value: r.sint64()
              }

              obj.sint64s++

              break
            }
            case 9: {
              if (opts.limits?.fixed32s != null && obj.fixed32s === opts.limits.fixed32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "fixed32s" had too many elements')
              }

              yield {
                field: `${prefix}fixed32s[]`,
                index: obj.fixed32s,
                value: r.fixed32()
              }

              obj.fixed32s++

              break
            }
            case 10: {
              if (opts.limits?.fixed64s != null && obj.fixed64s === opts.limits.fixed64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "fixed64s" had too many elements')
              }

              yield {
                field: `${prefix}fixed64s[]`,
                index: obj.fixed64s,
                value: r.fixed64()
              }

              obj.fixed64s++

              break
            }
            case 11: {
              if (opts.limits?.sfixed32s != null && obj.sfixed32s === opts.limits.sfixed32s) {
                throw new MaxLengthError('Streaming decode error - repeated field "sfixed32s" had too many elements')
              }

              yield {
                field: `${prefix}sfixed32s[]`,
                index: obj.sfixed32s,
                value: r.sfixed32()
              }

              obj.sfixed32s++

              break
            }
            case 12: {
              if (opts.limits?.sfixed64s != null && obj.sfixed64s === opts.limits.sfixed64s) {
                throw new MaxLengthError('Streaming decode error - repeated field "sfixed64s" had too many elements')
              }

              yield {
                field: `${prefix}sfixed64s[]`,
                index: obj.sfixed64s,
                value: r.sfixed64()
              }

              obj.sfixed64s++

              break
            }
            case 13: {
              if (opts.limits?.bools != null && obj.bools === opts.limits.bools) {
                throw new MaxLengthError('Streaming decode error - repeated field "bools" had too many elements')
              }

              yield {
                field: `${prefix}bools[]`,
                index: obj.bools,
                value: r.bool()
              }

              obj.bools++

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
            message: 'Proto2ExpandedTypes'
          }
        }
      })
    }

    return _codec
  }

  export interface Proto2ExpandedTypesDoublesFieldEvent {
    field: '.doubles[]'
    index: number
    value: number
  }

  export interface Proto2ExpandedTypesFloatsFieldEvent {
    field: '.floats[]'
    index: number
    value: number
  }

  export interface Proto2ExpandedTypesInt32sFieldEvent {
    field: '.int32s[]'
    index: number
    value: number
  }

  export interface Proto2ExpandedTypesInt64sFieldEvent {
    field: '.int64s[]'
    index: number
    value: bigint
  }

  export interface Proto2ExpandedTypesUint32sFieldEvent {
    field: '.uint32s[]'
    index: number
    value: number
  }

  export interface Proto2ExpandedTypesUint64sFieldEvent {
    field: '.uint64s[]'
    index: number
    value: bigint
  }

  export interface Proto2ExpandedTypesSint32sFieldEvent {
    field: '.sint32s[]'
    index: number
    value: number
  }

  export interface Proto2ExpandedTypesSint64sFieldEvent {
    field: '.sint64s[]'
    index: number
    value: bigint
  }

  export interface Proto2ExpandedTypesFixed32sFieldEvent {
    field: '.fixed32s[]'
    index: number
    value: number
  }

  export interface Proto2ExpandedTypesFixed64sFieldEvent {
    field: '.fixed64s[]'
    index: number
    value: bigint
  }

  export interface Proto2ExpandedTypesSfixed32sFieldEvent {
    field: '.sfixed32s[]'
    index: number
    value: number
  }

  export interface Proto2ExpandedTypesSfixed64sFieldEvent {
    field: '.sfixed64s[]'
    index: number
    value: bigint
  }

  export interface Proto2ExpandedTypesBoolsFieldEvent {
    field: '.bools[]'
    index: number
    value: boolean
  }

  export function encode (obj: Proto2ExpandedTypesInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Proto2ExpandedTypes.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Proto2ExpandedTypes>): Proto2ExpandedTypes {
    return decodeMessage(buf, Proto2ExpandedTypes.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Proto2ExpandedTypes>): Generator<Proto2ExpandedTypesDoublesFieldEvent | Proto2ExpandedTypesFloatsFieldEvent | Proto2ExpandedTypesInt32sFieldEvent | Proto2ExpandedTypesInt64sFieldEvent | Proto2ExpandedTypesUint32sFieldEvent | Proto2ExpandedTypesUint64sFieldEvent | Proto2ExpandedTypesSint32sFieldEvent | Proto2ExpandedTypesSint64sFieldEvent | Proto2ExpandedTypesFixed32sFieldEvent | Proto2ExpandedTypesFixed64sFieldEvent | Proto2ExpandedTypesSfixed32sFieldEvent | Proto2ExpandedTypesSfixed64sFieldEvent | Proto2ExpandedTypesBoolsFieldEvent> {
    return streamMessage(buf, Proto2ExpandedTypes.codec(), opts)
  }
}
