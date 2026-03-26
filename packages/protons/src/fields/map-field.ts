import { codecTypes, Field, jsTypeOverrides } from './field.ts'
import type { FieldDef } from './field.ts'
import type { Parent } from '../types/index.ts'

export interface MapFieldDef extends FieldDef {
  keyType?: string
  valueType: string
}

export function isMapFieldDef (obj?: any): obj is MapFieldDef {
  return obj?.keyType != null
}

export class MapField extends Field {
  public keyType: string
  public valueType: string
  public entryType: string
  public jsKeyTypeOverride?: 'string' | 'number'
  public jsValueTypeOverride?: 'string' | 'number'
  private lengthLimit?: number

  constructor (name: string, def: MapFieldDef, parent: Parent) {
    super(name, def, parent)

    this.type = 'message'
    this.keyType = def.keyType ?? 'string'
    this.valueType = def.valueType
    this.entryType = def.type
    this.lengthLimit = def.options?.['(protons.options).limit']

    if (def.options?.jskeytype != null) {
      this.jsKeyTypeOverride = jsTypeOverrides[def.options.jskeytype]
    }

    if (def.options?.jsvaluetype != null) {
      this.jsValueTypeOverride = jsTypeOverrides[def.options.jsvaluetype]
    }
  }

  getInterfaceField (parent: Parent): string {
    const keyType = this.jsKeyTypeOverride ?? parent.findType(this.keyType).jsType
    const valueType = this.jsValueTypeOverride ?? parent.findType(this.valueType).jsType

    return `${this.name}: Map<${keyType}, ${valueType}>`
  }

  getDefaultField (parent: Parent): string {
    const keyType = this.jsKeyTypeOverride ?? parent.findType(this.keyType).jsType
    const valueType = this.jsValueTypeOverride ?? parent.findType(this.valueType).jsType

    return `${this.name}: new Map<${keyType}, ${valueType}>()`
  }

  getEncoder (parent: Parent): string {
    const id = (this.id << 3) | codecTypes.message
    const entryType = parent.findType(this.entryType)

    return `
        if (obj.${this.name} != null && obj.${this.name}.size > 0) {
          for (const [key, value] of obj.${this.name}.entries()) {
            w.uint32(${id})
            ${entryType.getEncoder(this, '{ key, value }')}
          }
        }`
  }

  getDecoder (parent: Parent): string {
    parent.addImport('protons-runtime', 'MaxSizeError')
    const entryType = parent.findType(this.entryType)

    let limit = `
              if (opts.limits?.${this.name} != null && obj.${this.name}.size === opts.limits.${this.name}) {
                throw new MaxSizeError('Decode error - map field "${this.name}" had too many elements')
              }
`

    if (this.lengthLimit != null) {
      limit += `
              if (obj.${this.name}.size === ${this.lengthLimit}) {
                throw new MaxSizeError('Decode error - map field "${this.name}" had too many elements')
              }
`
    }

    return `case ${this.id}: {${limit}
              const entry = ${entryType.getDecoder(this)}
              obj.${this.name}.set(entry.key, entry.value)
              break
            }`
  }

  getStreamingDecoder (parent: Parent): string {
    parent.addImport('protons-runtime', 'MaxLengthError')

    let limit = `
              if (opts.limits?.${this.name} != null && obj.${this.name} === opts.limits.${this.name}) {
                throw new MaxLengthError('Decode error - map field "${this.name}" had too many elements')
              }
`

    if (this.lengthLimit != null) {
      limit += `
              if (obj.${this.name} === ${this.lengthLimit}) {
                throw new MaxLengthError('Decode error - repeated field "${this.name}" had too many elements')
              }
`
    }

    const type = parent.findType(this.entryType)

    return `case ${this.id}: {${limit}
              ${type.getStreamingDecoder(this, `\`\${prefix}.${this.name}{}\``, '  ')}

              obj.${this.name}++

              break
            }`
  }

  getLimitField (): string {
    return `${this.name}: ${this.lengthLimit ?? 0}`
  }
}
