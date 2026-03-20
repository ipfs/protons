import { Message } from '../types/message.ts'
import { Field } from './field.ts'
import type { Parent, Type } from '../types/index.ts'

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

  getStreamingDecoder (parent: Parent): string {
    const type: Type = parent.findType(this.type)

    return `case ${this.id}: {
              ${type.getStreamingDecoder(this, `\`\${prefix != null ? \`\${prefix}.\` : ''}${this.name}\``, '  ')}

              break
            }`
  }
}
