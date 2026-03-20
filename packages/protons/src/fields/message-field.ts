import { Message } from '../types/message.ts'
import { Field } from './field.ts'
import type { Parent } from '../types/index.ts'

export class MessageField extends Field {
  getInterfaceField (parent: Parent, indent = ''): string {
    return `${indent}${this.name}?: ${parent.findType(this.type).jsType}`
  }

  getMessage (parent: Parent): Message {
    const type = parent.findType(this.type)

    if (!(type instanceof Message)) {
      throw new Error(`Field ${this.name} was not a message field`)
    }

    return type
  }
}
