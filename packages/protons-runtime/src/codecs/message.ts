import { unsigned } from 'uint8-varint'
import { createCodec, CODEC_TYPES, EncodeResult, EncodeOptions } from '../codec.js'
import type { DecodeFunction, Codec } from '../codec.js'
import type { FieldDef } from '../index.js'

export interface Factory<A, T> {
  new (obj: A): T
}

export function message <T> (encode: (obj: T, opts?: EncodeOptions) => EncodeResult, fieldDefs: Record<string, FieldDef>): Codec<T> {
  const decode: DecodeFunction<T> = function messageDecode (buffer, offset) {
    const length = unsigned.decode(buffer, offset)
    const lengthLength = unsigned.encodingLength(length)
    offset += lengthLength
    const end = offset + length
    const fields: any = {}

    while (offset < end) {
      const key = unsigned.decode(buffer, offset)
      offset += unsigned.encodingLength(key)

      const wireType = key & 0x7
      const fieldNumber = key >> 3
      const fieldDef = fieldDefs[fieldNumber.toString()]
      let fieldLength = 0
      let value

      if (wireType === CODEC_TYPES.VARINT) {
        if (fieldDef != null) {
          // use the codec if it is available as this could be a bigint
          const decoded = fieldDef.codec.decode(buffer, offset)
          fieldLength = decoded.length
          value = decoded.value
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
        if (value == null) {
          const decoded = fieldDef.codec.decode(buffer, offset)
          value = decoded.value
        }

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

    return {
      value: fields,
      length: lengthLength + length
    }
  }

  return createCodec('message', CODEC_TYPES.LENGTH_DELIMITED, encode, decode)
}

/*
export function message <T> (fieldDefs: FieldDef[]): Codec<T> {
  // create a id => FieldDef mapping for quick access
  const fieldDefLookup: Record<number, FieldDef> = {}
  for (const def of fieldDefs) {
    fieldDefLookup[def.id] = def
  }

  const encode: EncodeFunction<Record<string, any>> = function messageEncode (val, opts = {}) {
    const bufs: Uint8Array[] = []

    if (opts.lengthDelimited === true) {
      // will hold length prefix
      bufs.push(new Uint8Array(0))
    }

    let length = 0

    function encodeValue (value: any, fieldNumber: number, fieldDef: FieldDef) {
      if (value == null) {
        if (fieldDef.optional === true) {
          return
        }

        throw new Error(`Non optional field "${fieldDef.name}" was ${value === null ? 'null' : 'undefined'}`)
      }

      const key = (fieldNumber << 3) | fieldDef.codec.type
      const prefix = unsigned.encode(key)
      const encoded = fieldDef.codec.encode(value)

      bufs.push(prefix, ...encoded.bufs)
      length += encoded.length
      length += prefix.byteLength
    }

    for (let i = 0; i < fieldDefs.length; i++) {
      const fieldDef = fieldDefs[i]

      if (fieldDef.repeats === true) {
        if (!Array.isArray(val[fieldDef.name])) {
          throw new Error(`Repeating field "${fieldDef.name}" was not an array`)
        }

        for (const value of val[fieldDef.name]) {
          encodeValue(value, fieldDef.id, fieldDef)
        }
      } else {
        encodeValue(val[fieldDef.name], fieldDef.id, fieldDef)
      }
    }

    if (opts.lengthDelimited === true) {
      const prefix = unsigned.encode(length)

      bufs[0] = prefix
      length += prefix.byteLength

      return {
        bufs,
        length
      }
    }

    return {
      bufs,
      length
    }
  }

  const decode: DecodeFunction<T> = function messageDecode (buffer, offset) {
    const length = unsigned.decode(buffer, offset)
    const lengthLength = unsigned.encodingLength(length)
    offset += lengthLength
    const end = offset + length
    const fields: any = {}

    while (offset < end) {
      const key = unsigned.decode(buffer, offset)
      offset += unsigned.encodingLength(key)

      const wireType = key & 0x7
      const fieldNumber = key >> 3
      const fieldDef = fieldDefLookup[fieldNumber]
      let fieldLength = 0
      let value

      if (wireType === CODEC_TYPES.VARINT) {
        if (fieldDef != null) {
          // use the codec if it is available as this could be a bigint
          const decoded = fieldDef.codec.decode(buffer, offset)
          fieldLength = decoded.length
          value = decoded.value
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
        if (value == null) {
          const decoded = fieldDef.codec.decode(buffer, offset)
          value = decoded.value
        }

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
    for (let i = 0; i < fieldDefs.length; i++) {
      const fieldDef = fieldDefs[i]

      if (fieldDef.repeats === true && fields[fieldDef.name] == null) {
        fields[fieldDef.name] = []
      }
    }

    return {
      value: fields,
      length: lengthLength + length
    }
  }

  return createCodec('message', CODEC_TYPES.LENGTH_DELIMITED, encode, decode)
}
*/
