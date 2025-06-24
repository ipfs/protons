import { decodeMessage, encodeMessage, enumeration, message } from 'protons-runtime'
import type { Codec, DecodeOptions } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export enum EnumType {
  Val1 = 'Val1',
  Val2 = 'Val2'
}

enum __EnumTypeValues {
  Val1 = 0,
  Val2 = 1
}

export namespace EnumType {
  export const codec = (): Codec<EnumType> => {
    return enumeration<EnumType>(__EnumTypeValues)
  }
}

export interface OneOfMessage {
  fieldOne?: string
  fieldTwo?: string
  fieldThree?: EnumType
  fieldFour?: EnumType
  fieldFive: string
}

export namespace OneOfMessage {
  let _codec: Codec<OneOfMessage>

  export const codec = (): Codec<OneOfMessage> => {
    if (_codec == null) {
      _codec = message<OneOfMessage>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        obj = { ...obj }

        if (obj.fieldTwo != null) {
          obj.fieldOne = undefined
        }

        if (obj.fieldOne != null) {
          obj.fieldTwo = undefined
        }

        if (obj.fieldFour != null) {
          obj.fieldThree = undefined
        }

        if (obj.fieldThree != null) {
          obj.fieldFour = undefined
        }

        if (obj.fieldOne != null) {
          w.uint32(10)
          w.string(obj.fieldOne)
        }

        if (obj.fieldTwo != null) {
          w.uint32(18)
          w.string(obj.fieldTwo)
        }

        if (obj.fieldThree != null) {
          w.uint32(24)
          EnumType.codec().encode(obj.fieldThree, w)
        }

        if (obj.fieldFour != null) {
          w.uint32(32)
          EnumType.codec().encode(obj.fieldFour, w)
        }

        if ((obj.fieldFive != null && obj.fieldFive !== '')) {
          w.uint32(42)
          w.string(obj.fieldFive)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          fieldFive: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.fieldOne = reader.string()
              break
            }
            case 2: {
              obj.fieldTwo = reader.string()
              break
            }
            case 3: {
              obj.fieldThree = EnumType.codec().decode(reader)
              break
            }
            case 4: {
              obj.fieldFour = EnumType.codec().decode(reader)
              break
            }
            case 5: {
              obj.fieldFive = reader.string()
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        if (obj.fieldTwo != null) {
          delete obj.fieldOne
        }

        if (obj.fieldOne != null) {
          delete obj.fieldTwo
        }

        if (obj.fieldFour != null) {
          delete obj.fieldThree
        }

        if (obj.fieldThree != null) {
          delete obj.fieldFour
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<OneOfMessage>): Uint8Array => {
    return encodeMessage(obj, OneOfMessage.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<OneOfMessage>): OneOfMessage => {
    return decodeMessage(buf, OneOfMessage.codec(), opts)
  }
}

export interface MessageWithoutOneOfs {
  fieldOne: string
  fieldTwo: string
  fieldThree: EnumType
  fieldFour: EnumType
  fieldFive: string
}

export namespace MessageWithoutOneOfs {
  let _codec: Codec<MessageWithoutOneOfs>

  export const codec = (): Codec<MessageWithoutOneOfs> => {
    if (_codec == null) {
      _codec = message<MessageWithoutOneOfs>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.fieldOne != null && obj.fieldOne !== '')) {
          w.uint32(10)
          w.string(obj.fieldOne)
        }

        if ((obj.fieldTwo != null && obj.fieldTwo !== '')) {
          w.uint32(18)
          w.string(obj.fieldTwo)
        }

        if (obj.fieldThree != null && __EnumTypeValues[obj.fieldThree] !== 0) {
          w.uint32(24)
          EnumType.codec().encode(obj.fieldThree, w)
        }

        if (obj.fieldFour != null && __EnumTypeValues[obj.fieldFour] !== 0) {
          w.uint32(32)
          EnumType.codec().encode(obj.fieldFour, w)
        }

        if ((obj.fieldFive != null && obj.fieldFive !== '')) {
          w.uint32(42)
          w.string(obj.fieldFive)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {
          fieldOne: '',
          fieldTwo: '',
          fieldThree: EnumType.Val1,
          fieldFour: EnumType.Val1,
          fieldFive: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.fieldOne = reader.string()
              break
            }
            case 2: {
              obj.fieldTwo = reader.string()
              break
            }
            case 3: {
              obj.fieldThree = EnumType.codec().decode(reader)
              break
            }
            case 4: {
              obj.fieldFour = EnumType.codec().decode(reader)
              break
            }
            case 5: {
              obj.fieldFive = reader.string()
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

  export const encode = (obj: Partial<MessageWithoutOneOfs>): Uint8Array => {
    return encodeMessage(obj, MessageWithoutOneOfs.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<MessageWithoutOneOfs>): MessageWithoutOneOfs => {
    return decodeMessage(buf, MessageWithoutOneOfs.codec(), opts)
  }
}
