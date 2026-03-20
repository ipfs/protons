import { Enum } from '../types/enum.ts'
import { Field } from './field.ts'
import type { FieldDef } from './field.ts'
import type { Parent } from '../types/index.ts'

export class EnumField extends Field {
  private enum: Enum

  constructor (name: string, def: FieldDef, parent: Parent) {
    super(name, def, parent)

    const type = parent.findType(def.type)

    if (!(type instanceof Enum)) {
      throw new Error(`Type "${def.type}" was not an Enum`)
    }

    this.enum = type
  }

  getDefaultField (parent: Parent): string {
    if (this.optional) {
      return ''
    }

    const type = parent.findType(this.type)

    return `${this.name}: ${type.pbType}.${this.enum.lowestValueName}`
  }
/*
  getValueTest (): string {
    console.info(this.name, 'optional', this.optional, 'proto2required', this.proto2Required)

    if (this.proto2Required) {
      return 'true'
    }

    const valueTest = `obj.${this.name} != null`

    // singular enums default to 0, but enums can be defined without a 0
    // value which is against the proto3 spec but is tolerated
    if (this.optional || this.proto2Required) {
      return valueTest
    }

    if (this.enum.lowestValue === 0) {
      return `${valueTest} && __${this.type}Values[obj.${this.name}] !== 0`
    }

    return valueTest
  }
    */
}
