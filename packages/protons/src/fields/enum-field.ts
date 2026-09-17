import { Enum } from '../types/enum.ts'
import { Field } from './field.ts'
import type { FieldDef } from './field.ts'
import type { Parent } from '../types/index.ts'
import type { Message } from '../types/message.ts'

export class EnumField extends Field {
  private enum: Enum

  constructor (name: string, def: FieldDef, parent: Message) {
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
}
