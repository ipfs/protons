import { Enum } from '../types/enum.ts'
import { Message } from '../types/message.ts'
import { codecTypes, Field } from './field.ts'
import type { FieldDef } from './field.ts'
import type { Parent, Type } from '../types/index.ts'

export interface ArrayFieldDef extends FieldDef {
  rule: 'repeated'
}

export function isArrayFieldDef (obj?: any): obj is ArrayFieldDef {
  return obj?.rule === 'repeated'
}

export class ArrayField extends Field {
  private lengthLimit?: number

  constructor (name: string, def: ArrayFieldDef, parent: Parent) {
    super(name, def, parent)

    this.lengthLimit = def.options?.['(protons.options).limit']
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

    return `case ${this.id}: {${limit}
              ${type.getStreamingDecoder(this, `\`\${prefix}.${this.name}[]\``, '  ')}

              obj.${this.name}++

              break
            }`
  }

  getLimitField (): string {
    return `${this.name}: ${this.lengthLimit ?? 0}`
  }
}
