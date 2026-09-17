import { Enum } from '../types/enum.ts'
import { Message } from '../types/message.ts'
import { CODEC_TYPES, codecTypes, Field } from './field.ts'
import type { FieldDef } from './field.ts'
import type { Parent, Type } from '../types/index.ts'

export interface ArrayFieldDef extends FieldDef {
  rule: 'repeated'
}

export function isArrayFieldDef (obj?: any): obj is ArrayFieldDef {
  return obj?.rule === 'repeated'
}

const PACKABLE_TYPES = [
  'double',
  'float',
  'int32',
  'int64',
  'uint32',
  'uint64',
  'sint32',
  'sint64',
  'fixed32',
  'fixed64',
  'sfixed32',
  'sfixed64',
  'bool'
]

export class ArrayField extends Field {
  private lengthLimit?: number
  private packed: boolean

  constructor (name: string, def: ArrayFieldDef, parent: Parent) {
    super(name, def, parent)

    this.lengthLimit = def.options?.['(protons.options).limit']

    // console.info(parent)

    const type = parent.findType(this.type).pbType
    const supportsPacked = PACKABLE_TYPES.indexOf(type) !== -1

    // the default from protobuf3 onwards
    this.packed = supportsPacked

    // check user override
    if (def.options?.packed === false || def.options?.features?.repeated_field_encoding === 'EXPANDED') {
      this.packed = false
    }

    if (this.packed && !supportsPacked) {
      throw new Error(`Repeated field "${name}" of type "${type}" cannot be packed as it is not a non-string/byte scalar type`)
    }
  }

  getInterfaceField (parent: Parent, indent = ''): string {
    return `${super.getInterfaceField(parent, indent)}[]`
  }

  getDefaultField (parent: Parent): string {
    return `${this.name}: []`
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

    if (this.packed) {
      return `
        if (obj.${this.name} != null && obj.${this.name}.length > 0) {
          w.uint32(${(this.id << 3) | CODEC_TYPES.LENGTH_DELIMITED})
          w.fork()

          for (const value of obj.${this.name}) {
            ${type.getEncoder(this, 'value')}
          }

          w.ldelim()
        }`
    }

    return `
        if (obj.${this.name} != null && obj.${this.name}.length > 0) {
          for (const value of obj.${this.name}) {
            w.uint32(${id})
            ${type.getEncoder(this, 'value')}
          }
        }`
  }

  getDecoder (parent: Parent): string {
    parent.addImport('protons-runtime', 'MaxLengthError')

    let limit = `
              if (opts.limits?.${this.name} != null && obj.${this.name}.length === opts.limits.${this.name}) {
                throw new MaxLengthError('Decode error - repeated field "${this.name}" had too many elements')
              }
`

    if (this.lengthLimit != null) {
      limit += `
              if (obj.${this.name}.length === ${this.lengthLimit}) {
                throw new MaxLengthError('Decode error - repeated field "${this.name}" had too many elements')
              }
`
    }

    const type: Type = parent.findType(this.type)

    if (this.packed) {
      this.parent.addImport('protons-runtime', 'reader')

      return `case ${this.id}: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {${limit.split('\n').join('\n  ')}
                obj.${this.name}.push(${type.getDecoder(this, undefined, 'r2')})
              }

              break
            }`
    }

    return `case ${this.id}: {${limit}
              obj.${this.name}.push(${type.getDecoder(this)})
              break
            }`
  }

  getStreamingDecoder (parent: Parent): string {
    parent.addImport('protons-runtime', 'MaxLengthError')

    let limit = `
              if (opts.limits?.${this.name} != null && obj.${this.name} === opts.limits.${this.name}) {
                throw new MaxLengthError('Streaming decode error - repeated field "${this.name}" had too many elements')
              }
`

    if (this.lengthLimit != null) {
      limit += `
              if (obj.${this.name} === ${this.lengthLimit}) {
                throw new MaxLengthError('Streaming decode error - repeated field "${this.name}" had too many elements')
              }
`
    }

    const type: Type = parent.findType(this.type)
    let field = `\${prefix}${this.name}[]`

    if (type instanceof Message) {
      field += '.'
    }

    if (this.packed) {
      this.parent.addImport('protons-runtime', 'reader')

      return `case ${this.id}: {
              const b = r.bytes()
              const r2 = reader(b)

              while (r2.pos < r2.len) {${limit.split('\n').join('\n  ')}
                ${type.getStreamingDecoder(this, `\`${field}\``, '    ', 'r2')}

                obj.${this.name}++
              }

              break
            }`
    }

    return `case ${this.id}: {${limit}
              ${type.getStreamingDecoder(this, `\`${field}\``, '  ')}

              obj.${this.name}++

              break
            }`
  }

  getLimitField (): string {
    return `${this.name}: ${this.lengthLimit ?? 0}`
  }
}
