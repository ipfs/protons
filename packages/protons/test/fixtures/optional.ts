/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/consistent-type-specifier-style */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { decodeMessage, encodeMessage, enumeration, message } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export enum OptionalEnum {
  NO_VALUE = 'NO_VALUE',
  VALUE_1 = 'VALUE_1',
  VALUE_2 = 'VALUE_2'
}

enum __OptionalEnumValues {
  NO_VALUE = 0,
  VALUE_1 = 1,
  VALUE_2 = 2
}

export namespace OptionalEnum {
  export const codec = (): Codec<OptionalEnum> => {
    return enumeration<OptionalEnum>(__OptionalEnumValues)
  }
}

export interface OptionalSubMessage {
  foo?: string
  bar?: number
}

export namespace OptionalSubMessage {
  let _codec: Codec<OptionalSubMessage>

  export const codec = (): Codec<OptionalSubMessage> => {
    if (_codec == null) {
      _codec = message<OptionalSubMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.foo != null) {
          w.uint32(10)
          w.string(obj.foo)
        }

        if (obj.bar != null) {
          w.uint32(16)
          w.int32(obj.bar)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.foo = reader.string()
              break
            }
            case 2: {
              obj.bar = reader.int32()
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<OptionalSubMessage>): Uint8Array => {
    return encodeMessage(obj, OptionalSubMessage.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<OptionalSubMessage>): OptionalSubMessage => {
    return decodeMessage(buf, OptionalSubMessage.codec(), opts)
  }
}

export interface Optional {
  double?: number
  float?: number
  int32?: number
  int64?: bigint
  uint32?: number
  uint64?: bigint
  sint32?: number
  sint64?: bigint
  fixed32?: number
  fixed64?: bigint
  sfixed32?: number
  sfixed64?: bigint
  bool?: boolean
  string?: string
  bytes?: Uint8Array
  enum?: OptionalEnum
  subMessage?: OptionalSubMessage
}

export namespace Optional {
  let _codec: Codec<Optional>

  export const codec = (): Codec<Optional> => {
    if (_codec == null) {
      _codec = message<Optional>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (obj.double != null) {
          w.uint32(9)
          w.double(obj.double)
        }

        if (obj.float != null) {
          w.uint32(21)
          w.float(obj.float)
        }

        if (obj.int32 != null) {
          w.uint32(24)
          w.int32(obj.int32)
        }

        if (obj.int64 != null) {
          w.uint32(32)
          w.int64(obj.int64)
        }

        if (obj.uint32 != null) {
          w.uint32(40)
          w.uint32(obj.uint32)
        }

        if (obj.uint64 != null) {
          w.uint32(48)
          w.uint64(obj.uint64)
        }

        if (obj.sint32 != null) {
          w.uint32(56)
          w.sint32(obj.sint32)
        }

        if (obj.sint64 != null) {
          w.uint32(64)
          w.sint64(obj.sint64)
        }

        if (obj.fixed32 != null) {
          w.uint32(77)
          w.fixed32(obj.fixed32)
        }

        if (obj.fixed64 != null) {
          w.uint32(81)
          w.fixed64(obj.fixed64)
        }

        if (obj.sfixed32 != null) {
          w.uint32(93)
          w.sfixed32(obj.sfixed32)
        }

        if (obj.sfixed64 != null) {
          w.uint32(97)
          w.sfixed64(obj.sfixed64)
        }

        if (obj.bool != null) {
          w.uint32(104)
          w.bool(obj.bool)
        }

        if (obj.string != null) {
          w.uint32(114)
          w.string(obj.string)
        }

        if (obj.bytes != null) {
          w.uint32(122)
          w.bytes(obj.bytes)
        }

        if (obj.enum != null) {
          w.uint32(128)
          OptionalEnum.codec().encode(obj.enum, w)
        }

        if (obj.subMessage != null) {
          w.uint32(138)
          OptionalSubMessage.codec().encode(obj.subMessage, w)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.double = reader.double()
              break
            }
            case 2: {
              obj.float = reader.float()
              break
            }
            case 3: {
              obj.int32 = reader.int32()
              break
            }
            case 4: {
              obj.int64 = reader.int64()
              break
            }
            case 5: {
              obj.uint32 = reader.uint32()
              break
            }
            case 6: {
              obj.uint64 = reader.uint64()
              break
            }
            case 7: {
              obj.sint32 = reader.sint32()
              break
            }
            case 8: {
              obj.sint64 = reader.sint64()
              break
            }
            case 9: {
              obj.fixed32 = reader.fixed32()
              break
            }
            case 10: {
              obj.fixed64 = reader.fixed64()
              break
            }
            case 11: {
              obj.sfixed32 = reader.sfixed32()
              break
            }
            case 12: {
              obj.sfixed64 = reader.sfixed64()
              break
            }
            case 13: {
              obj.bool = reader.bool()
              break
            }
            case 14: {
              obj.string = reader.string()
              break
            }
            case 15: {
              obj.bytes = reader.bytes()
              break
            }
            case 16: {
              obj.enum = OptionalEnum.codec().decode(reader)
              break
            }
            case 17: {
              obj.subMessage = OptionalSubMessage.codec().decode(reader, reader.uint32(), {
                limits: opts.limits?.subMessage
              })
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<Optional>): Uint8Array => {
    return encodeMessage(obj, Optional.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<Optional>): Optional => {
    return decodeMessage(buf, Optional.codec(), opts)
  }
}
