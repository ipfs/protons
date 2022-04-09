import { unsigned } from '../utils/varint.js'
import type { FieldDef, FieldDefs } from '../index.js'
import { DecodeFunction, EncodeFunction, createCodec, EncodingLengthFunction, Codec, CODEC_TYPES } from './codec.js'

export interface Factory<A, T> {
  new (obj: A): T
}

export function message <T> (fieldDefs: FieldDefs): Codec<T> {
  const encodingLength: EncodingLengthFunction<T> = function messageEncodingLength (val: Record<string, any>) {
    function valueEncodingLength (value: any, fieldNumber: number, fieldDef: FieldDef): number {
      if (value == null) {
        if (fieldDef.optional === true) {
          return 0
        }

        throw new Error(`Non optional field "${fieldDef.name}" was ${value === null ? 'null' : 'undefined'}`)
      }

      const key = (fieldNumber << 3) | fieldDef.codec.type
      const prefixLength = unsigned.encodingLength(key)

      return fieldDef.codec.encodingLength(value) + prefixLength
    }

    let length = 0

    for (const [fieldNumberStr, fieldDef] of Object.entries(fieldDefs)) {
      const fieldNumber = parseInt(fieldNumberStr)
      const value = val[fieldDef.name]

      if (value == null && !(fieldDef.optional === true)) {
        throw new Error(`Field ${fieldDef.name} cannot be ${value === null ? 'null' : 'undefined'}`)
      }

      if (fieldDef.repeats === true) {
        if (!Array.isArray(value)) {
          throw new Error(`Repeating field ${fieldDef.name} was not an array`)
        }

        for (const entry of value) {
          length += valueEncodingLength(entry, fieldNumber, fieldDef)
        }

        continue
      }

      length += valueEncodingLength(value, fieldNumber, fieldDef)
    }

    return unsigned.encodingLength(length) + length
  }

  const encode: EncodeFunction<T> = function messageEncode (val, buf, offset): number {
    function encodeValue (value: any, fieldNumber: number, fieldDef: FieldDef, offset: number): number {
      if (value == null) {
        if (fieldDef.optional === true) {
          return offset
        }

        throw new Error(`Non optional field "${fieldDef.name}" was ${value === null ? 'null' : 'undefined'}`)
      }

      const key = (fieldNumber << 3) | fieldDef.codec.type
      offset = unsigned.encode(key, buf, offset)
      offset = fieldDef.codec.encode(value, buf, offset)

      return offset
    }

    const length = encodingLength(val)
    offset = unsigned.encode(length - unsigned.encodingLength(length), buf, offset)

    for (const [fieldNumberStr, fieldDef] of Object.entries(fieldDefs)) {
      const fieldNumber = parseInt(fieldNumberStr)

      if (fieldDef.repeats === true) {
        // @ts-expect-error cannot use strings to index T
        if (!Array.isArray(val[fieldDef.name])) {
          throw new Error(`Repeating field "${fieldDef.name}" was not an array`)
        }

        // @ts-expect-error cannot use strings to index T
        for (const value of val[fieldDef.name]) {
          offset = encodeValue(value, fieldNumber, fieldDef, offset)
        }

        continue
      }

      // @ts-expect-error cannot use strings to index T
      offset = encodeValue(val[fieldDef.name], fieldNumber, fieldDef, offset)
    }

    return offset
  }

  const decode: DecodeFunction<T> = function messageDecode (buffer, offset) {
    const length = unsigned.decode(buffer, offset)
    offset += unsigned.encodingLength(length)
    const end = offset + length
    const fields: any = {}

    while (offset < end) {
      const key = unsigned.decode(buffer, offset)
      offset += unsigned.encodingLength(key)

      const wireType = key & 0x7
      const fieldNumber = key >> 3
      const fieldDef = fieldDefs[fieldNumber]
      let fieldLength = 0

      if (wireType === CODEC_TYPES.VARINT) {
        if (fieldDef != null) {
          // use the codec if it is available as this could be a bigint
          const value = fieldDef.codec.decode(buffer, offset)
          fieldLength = fieldDef.codec.encodingLength(value)
        } else {
          const value = unsigned.decode(buffer, offset)
          fieldLength = unsigned.encodingLength(value)
        }
      } else if (wireType === CODEC_TYPES.BIT64) {
        fieldLength = 8
      } else if (wireType === CODEC_TYPES.LENGTH_DELIMITED) {
        const valueLength = unsigned.decode(buffer, offset)
        fieldLength = valueLength + unsigned.encodingLength(valueLength)
      } else if (wireType === CODEC_TYPES.BIT32) {
        fieldLength = 4
      } else if (wireType === CODEC_TYPES.START_GROUP) {
        throw new Error('Unsupported wire type START_GROUP')
      } else if (wireType === CODEC_TYPES.END_GROUP) {
        throw new Error('Unsupported wire type END_GROUP')
      }

      if (fieldDef != null) {
        const value = fieldDef.codec.decode(buffer, offset)

        if (fieldDef.repeats === true) {
          if (fields[fieldDef.name] == null) {
            fields[fieldDef.name] = []
          }

          fields[fieldDef.name].push(value)
        } else {
          fields[fieldDef.name] = value
        }
      }

      offset += fieldLength
    }

    // make sure repeated fields have an array if not set
    for (const fieldDef of Object.values(fieldDefs)) {
      if (fieldDef.repeats === true && fields[fieldDef.name] == null) {
        fields[fieldDef.name] = []
      }
    }

    return fields
  }

  return createCodec('message', CODEC_TYPES.LENGTH_DELIMITED, encode, decode, encodingLength)
}
