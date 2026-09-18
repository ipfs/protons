import { ArrayField } from '../fields/array-field.ts'
import type { Type, TypeCodec } from './index.ts'
import type { Field } from '../fields/field.ts'

const decoderGenerators: Record<string, (jsTypeOverride?: 'number' | 'string', reader?: string) => string> = {
  bool: (_, reader = 'r') => `${reader}.bool()`,
  bytes: (_, reader = 'r') => `${reader}.bytes()`,
  double: (_, reader = 'r') => `${reader}.double()`,
  fixed32: (_, reader = 'r') => `${reader}.fixed32()`,
  fixed64: (jsTypeOverride, reader = 'r') => {
    if (jsTypeOverride === 'number') {
      return `${reader}.fixed64Number()`
    }

    if (jsTypeOverride === 'string') {
      return `${reader}.fixed64String()`
    }

    return `${reader}.fixed64()`
  },
  float: (_, reader = 'r') => `${reader}.float()`,
  int32: (_, reader = 'r') => `${reader}.int32()`,
  int64: (jsTypeOverride, reader = 'r') => {
    if (jsTypeOverride === 'number') {
      return `${reader}.int64Number()`
    }

    if (jsTypeOverride === 'string') {
      return `${reader}.int64String()`
    }

    return `${reader}.int64()`
  },
  sfixed32: (_, reader = 'r') => `${reader}.sfixed32()`,
  sfixed64: (jsTypeOverride, reader = 'r') => {
    if (jsTypeOverride === 'number') {
      return `${reader}.sfixed64Number()`
    }

    if (jsTypeOverride === 'string') {
      return `${reader}.sfixed64String()`
    }

    return `${reader}.sfixed64()`
  },
  sint32: (_, reader = 'r') => `${reader}.sint32()`,
  sint64: (jsTypeOverride, reader = 'r') => {
    if (jsTypeOverride === 'number') {
      return `${reader}.sint64Number()`
    }

    if (jsTypeOverride === 'string') {
      return `${reader}.sint64String()`
    }

    return `${reader}.sint64()`
  },
  string: (_, reader = 'r') => `${reader}.string()`,
  uint32: (_, reader = 'r') => `${reader}.uint32()`,
  uint64: (jsTypeOverride, reader = 'r') => {
    if (jsTypeOverride === 'number') {
      return `${reader}.uint64Number()`
    }

    if (jsTypeOverride === 'string') {
      return `${reader}.uint64String()`
    }

    return `${reader}.uint64()`
  }
}

const encoderGenerators: Record<string, (val: string, jsTypeOverride?: 'number' | 'string') => string> = {
  bool: (val) => `w.bool(${val})`,
  bytes: (val) => `w.bytes(${val})`,
  double: (val) => `w.double(${val})`,
  fixed32: (val) => `w.fixed32(${val})`,
  fixed64: (val, jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return `w.fixed64Number(${val})`
    }

    if (jsTypeOverride === 'string') {
      return `w.fixed64String(${val})`
    }

    return `w.fixed64(${val})`
  },
  float: (val) => `w.float(${val})`,
  int32: (val) => `w.int32(${val})`,
  int64: (val, jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return `w.int64Number(${val})`
    }

    if (jsTypeOverride === 'string') {
      return `w.int64String(${val})`
    }

    return `w.int64(${val})`
  },
  sfixed32: (val) => `w.sfixed32(${val})`,
  sfixed64: (val, jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return `w.sfixed64Number(${val})`
    }

    if (jsTypeOverride === 'string') {
      return `w.sfixed64String(${val})`
    }

    return `w.sfixed64(${val})`
  },
  sint32: (val) => `w.sint32(${val})`,
  sint64: (val, jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return `w.sint64Number(${val})`
    }

    if (jsTypeOverride === 'string') {
      return `w.sint64String(${val})`
    }

    return `w.sint64(${val})`
  },
  string: (val) => `w.string(${val})`,
  uint32: (val) => `w.uint32(${val})`,
  uint64: (val, jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return `w.uint64Number(${val})`
    }

    if (jsTypeOverride === 'string') {
      return `w.uint64String(${val})`
    }

    return `w.uint64(${val})`
  }
}

interface DefaultValueTestGenerator {
  (field: string): string
}

const defaultValueTestGenerators: Record<string, DefaultValueTestGenerator> = {
  bool: (field) => `(${field} != null && ${field} !== false)`,
  bytes: (field) => `(${field} != null && ${field}.byteLength > 0)`,
  double: (field) => `(${field} != null && ${field} !== 0)`,
  fixed32: (field) => `(${field} != null && ${field} !== 0)`,
  fixed64: (field) => `(${field} != null && ${field} !== 0n)`,
  float: (field) => `(${field} != null && ${field} !== 0)`,
  int32: (field) => `(${field} != null && ${field} !== 0)`,
  int64: (field) => `(${field} != null && ${field} !== 0n)`,
  sfixed32: (field) => `(${field} != null && ${field} !== 0)`,
  sfixed64: (field) => `(${field} != null && ${field} !== 0n)`,
  sint32: (field) => `(${field} != null && ${field} !== 0)`,
  sint64: (field) => `(${field} != null && ${field} !== 0n)`,
  string: (field) => `(${field} != null && ${field} !== '')`,
  uint32: (field) => `(${field} != null && ${field} !== 0)`,
  uint64: (field) => `(${field} != null && ${field} !== 0n)`
}

const defaultValueTestGeneratorsJsTypeOverrides: Record<string, DefaultValueTestGenerator> = {
  number: (field) => `(${field} != null && ${field} !== 0)`,
  string: (field) => `(${field} != null && ${field} !== '')`
}

export class Primitive implements Type {
  public jsType: TypeCodec
  public pbType: string

  constructor (pbType: string, jsType: TypeCodec) {
    this.jsType = jsType
    this.pbType = pbType
  }

  init (): void {

  }

  getDecoder (field: Field, indent = '', reader = 'r'): string {
    return decoderGenerators[this.pbType](field.jsTypeOverride, reader)
  }

  getStreamingDecoder (field: Field, prefix: string, indent = '', reader = 'r'): string {
    const generator = decoderGenerators[this.pbType](field.jsTypeOverride, reader)

    if (field instanceof ArrayField) {
      return `yield {
${indent}              field: ${prefix},
${indent}              index: obj.${field.name},
${indent}              value: ${generator}
${indent}            }`
    }

    return generator
  }

  getValueTest (field: Field, accessor: string): string {
    // proto3 singular fields should only be written out if they are not the default value
    if (!field.optional && !field.proto2Required) {
      if (field.jsTypeOverride != null) {
        return defaultValueTestGeneratorsJsTypeOverrides[field.jsTypeOverride](accessor)
      }

      return defaultValueTestGenerators[field.type](accessor)
    }

    return `${accessor} != null`
  }

  getEncoder (field: Field, accessor: string): string {
    return encoderGenerators[this.pbType](accessor, field.jsTypeOverride)
  }
}
