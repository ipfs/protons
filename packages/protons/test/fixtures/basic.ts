import { decodeMessage, encodeMessage, message, streamMessage } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Basic {
  foo?: string
  num: number
}

export interface BasicInput {
  foo?: string
  num?: number
}

export namespace Basic {
  let _codec: Codec<Basic, BasicInput>

  export const codec = (): Codec<Basic, BasicInput> => {
    if (_codec == null) {
      _codec = message<Basic, BasicInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.foo != null) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if ((obj.num != null && obj.num !== 0)) {
          w.uint32(16)
          w.int32(obj.num)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length) => {
        const obj: any = {
          num: 0
        }

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.foo = r.string()
              break
            }
            case 2: {
              obj.num = r.int32()
              break
            }
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (r, length, prefix) {
        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'Basic'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            case 1: {
              yield {
                field: `${prefix}foo`,
                value: r.string()
              }
              break
            }
            case 2: {
              yield {
                field: `${prefix}num`,
                value: r.int32()
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
            message: 'Basic'
          }
        }
      })
    }

    return _codec
  }

  export interface BasicFooFieldEvent {
    field: '.foo'
    value: string
  }

  export interface BasicNumFieldEvent {
    field: '.num'
    value: number
  }

  export function encode (obj: BasicInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Basic.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Basic>): Basic {
    return decodeMessage(buf, Basic.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Basic>): Generator<BasicFooFieldEvent | BasicNumFieldEvent> {
    return streamMessage(buf, Basic.codec(), opts)
  }
}

export interface EmptyInput {}

export interface Empty {}

export namespace Empty {
  let _codec: Codec<Empty, EmptyInput>

  export const codec = (): Codec<Empty, EmptyInput> => {
    if (_codec == null) {
      _codec = message<Empty, EmptyInput>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (r, length) => {
        const obj: any = {}

        const end = length == null ? r.len : r.pos + length

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
            default: {
              r.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      }, function * (r, length, prefix) {
        const end = length == null ? r.len : r.pos + length

        if (prefix !== '.') {
          yield {
            field: prefix.endsWith('.') ? prefix.substring(0, prefix.length - 1) : prefix,
            type: 'start',
            message: 'Empty'
          }
        }

        while (r.pos < end) {
          const tag = r.uint32()

          switch (tag >>> 3) {
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
            message: 'Empty'
          }
        }
      })
    }

    return _codec
  }

  export function encode (obj: EmptyInput): Uint8Array<ArrayBuffer> {
    return encodeMessage(obj, Empty.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Empty>): Empty {
    return decodeMessage(buf, Empty.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Empty>): Generator<{}> {
    return streamMessage(buf, Empty.codec(), opts)
  }
}
