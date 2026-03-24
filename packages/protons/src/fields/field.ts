import { ParseError } from 'protons-runtime'
import { Enum } from '../types/enum.ts'
import { Message } from '../types/message.ts'
import type { Parent, Type } from '../types/index.ts'

export const CODEC_TYPES = {
  VARINT: 0,
  BIT64: 1,
  LENGTH_DELIMITED: 2,
  START_GROUP: 3,
  END_GROUP: 4,
  BIT32: 5
}

export const codecTypes: Record<string, number> = {
  bool: CODEC_TYPES.VARINT,
  bytes: CODEC_TYPES.LENGTH_DELIMITED,
  double: CODEC_TYPES.BIT64,
  enum: CODEC_TYPES.VARINT,
  fixed32: CODEC_TYPES.BIT32,
  fixed64: CODEC_TYPES.BIT64,
  float: CODEC_TYPES.BIT32,
  int32: CODEC_TYPES.VARINT,
  int64: CODEC_TYPES.VARINT,
  message: CODEC_TYPES.LENGTH_DELIMITED,
  sfixed32: CODEC_TYPES.BIT32,
  sfixed64: CODEC_TYPES.BIT64,
  sint32: CODEC_TYPES.VARINT,
  sint64: CODEC_TYPES.VARINT,
  string: CODEC_TYPES.LENGTH_DELIMITED,
  uint32: CODEC_TYPES.VARINT,
  uint64: CODEC_TYPES.VARINT
}

const jsTypeOverrides: Record<string, 'number' | 'string'> = {
  JS_NUMBER: 'number',
  JS_STRING: 'string'
}

interface DefaultValueGenerator {
  (): string
}

const defaultValueGenerators: Record<string, DefaultValueGenerator> = {
  bool: () => 'false',
  bytes: () => 'uint8ArrayAlloc(0)',
  double: () => '0',
  fixed32: () => '0',
  fixed64: () => '0n',
  float: () => '0',
  int32: () => '0',
  int64: () => '0n',
  sfixed32: () => '0',
  sfixed64: () => '0n',
  sint32: () => '0',
  sint64: () => '0n',
  string: () => "''",
  uint32: () => '0',
  uint64: () => '0n'
}

const defaultValueGeneratorsJsTypeOverrides: Record<string, DefaultValueGenerator> = {
  number: () => '0',
  string: () => "''"
}

export interface FieldOptions extends Record<string, any> {
  proto3_optional?: boolean
  jstype?: 'string' | 'number'
}

export interface FieldDef {
  id: number
  type: string
  repeated?: boolean
  options?: FieldOptions
  rule?: string
  oneof?: string[]
}

export interface MessageField {
  /**
   * Return a string that can be used in a typescript interface for this field
   */
  getInterfaceField (parent: Parent, indent?: string): string
}

export class Field implements MessageField {
  public id: number
  public name: string
  public optional: boolean
  public type: string
  public proto2Required: boolean
  public jsTypeOverride?: 'string' | 'number'
  public oneof?: string[]

  constructor (name: string, def: FieldDef, parent: Parent) {
    this.id = def.id
    this.name = name

    // the default type for a message is unset so they are always optional
    // https://developers.google.com/protocol-buffers/docs/proto3#default
    this.optional = def.repeated !== true && def.options?.proto3_optional === true
    this.type = def.type ?? 'string'
    this.oneof = def.oneof
    this.proto2Required = false

    if (def.options?.jstype != null) {
      this.jsTypeOverride = jsTypeOverrides[def.options.jstype]
    }

    if (this.jsTypeOverride != null && !['int64', 'uint64', 'sint64', 'fixed64', 'sfixed64'].includes(this.type)) {
      throw new Error(`jstype override option is only allowed on int64, uint64, sint64, fixed64 or sfixed64 fields - got "${this.type}"`)
    }

    if (def.rule === 'required') {
      const message = `field "${name}" is required, this is not allowed in proto3. Please convert your proto2 definitions to proto3 - see https://github.com/ipfs/protons/wiki/Required-fields-and-protobuf-3`

      if (parent.flags?.strict === true) {
        throw new ParseError(message)
      } else {
        this.proto2Required = true

        // eslint-disable-next-line no-console
        console.info(`[WARN] ${message}`)
      }
    }
  }

  getInterfaceField (parent: Parent, indent = ''): string {
    return `${indent}${this.name}${this.optional ? '?' : ''}: ${this.jsTypeOverride ?? parent.findType(this.type).jsType}`
  }

  getDefaultField (parent: Parent): string {
    if (this.optional) {
      return ''
    }

    const type = parent.findType(this.type)

    if (type.pbType === 'bytes') {
      parent.addImport('uint8arrays/alloc', 'alloc', 'uint8ArrayAlloc')
    }

    let defaultValueGenerator = defaultValueGenerators[type.pbType]

    if (this.jsTypeOverride) {
      defaultValueGenerator = defaultValueGeneratorsJsTypeOverrides[this.jsTypeOverride]
    }

    if (defaultValueGenerator == null) {
      return ''
    }

    return `${this.name}: ${defaultValueGenerator()}`
  }

  getDecoder (parent: Parent): string {
    const type: Type = parent.findType(this.type)

    return `case ${this.id}: {
              obj.${this.name} = ${type.getDecoder(this)}
              break
            }`
  }

  getStreamingDecoder (parent: Parent): string {
    const type: Type = parent.findType(this.type)

    return `case ${this.id}: {
              yield {
                field: \`\${prefix}.${this.name}\`,
                value: ${type.getDecoder(this, '  ')}
              }
              break
            }`
  }

  getEncoder (parent: Parent): string {
    const type = parent.findType(this.type)
    let id = (this.id << 3) | codecTypes[this.type]

    if (type instanceof Message) {
      id = (this.id << 3) | codecTypes.message
    }

    if (type instanceof Enum) {
      id = (this.id << 3) | codecTypes.enum
    }

    return `
        if (${type.getValueTest(this, `obj.${this.name}`)}) {
          w.uint32(${id})
          ${type.getEncoder(this, `obj.${this.name}`)}
        }`
  }

  getLimitField (): string {
    return ''
  }
}
