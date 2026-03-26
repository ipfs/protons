import { ArrayField, isArrayFieldDef } from '../fields/array-field.ts'
import { EnumField } from '../fields/enum-field.ts'
import { Field } from '../fields/field.ts'
import { isMapFieldDef, MapField } from '../fields/map-field.ts'
import { MessageField } from '../fields/message-field.ts'
import { Enum } from './enum.ts'
import { Primitive } from './primitive.ts'
import type { EnumDef } from './enum.ts'
import type { Parent, Type } from './index.ts'
import type { FieldDef } from '../fields/field.ts'
import type { Flags } from '../index.ts'

interface StreamEvent {
  name: string
  fields: string[]
  type: 'field'
    | 'collection-primitive-member'
    | 'collection-message-member-field'
    | 'sub-message-field'
    | 'sub-message-collection-primitive-member'
    | 'sub-message-collection-message-member-field'
}

function camelize (input: string): string {
  return `${input.substring(0, 1).toUpperCase()}${input.substring(1)}`
}

export interface MessageDef {
  fields?: Record<string, FieldDef>
  oneofs?: Record<string, { oneof: string[] }>
  nested?: Record<string, MessageDef | EnumDef>
}

export function isMessageDef (obj?: any): obj is MessageDef {
  return obj?.fields != null
}

export class Message implements Type {
  public pbType: string
  public jsType: string
  public fields: Field[]
  public oneOfs: string[][]
  public nested: Record<string, Message | Enum>
  private def: MessageDef
  private parent: Parent

  constructor (pbType: string, jsType: string, def: MessageDef, parent: Parent) {
    this.pbType = pbType
    this.jsType = jsType
    this.oneOfs = []
    this.nested = {}
    this.fields = []
    this.def = def
    this.parent = parent

    def.fields ??= {}
    def.nested ??= {}
    def.oneofs ??= {}

    // create extra message types for map type backwards compatibility
    // https://developers.google.com/protocol-buffers/docs/proto3#backwards
    for (const [fieldName, fieldDef] of Object.entries<any>(def.fields)) {
      if (fieldDef.keyType == null) {
        continue
      }

      const mapEntryType = `${this.pbType}$${fieldName}Entry`

      def.nested[mapEntryType] = {
        fields: {
          key: {
            type: fieldDef.keyType,
            id: 1,
            options: {
              jstype: fieldDef.options?.jskeytype
            }
          },
          value: {
            type: fieldDef.type,
            id: 2,
            options: {
              jstype: fieldDef.options?.jsvaluetype
            }
          }
        }
      }

      fieldDef.valueType = fieldDef.type
      fieldDef.type = mapEntryType
      fieldDef.rule = 'repeated'
    }

    Object.entries(def.nested ?? {}).forEach(([name, def]) => {
      const fullName = `${this.jsType}.${name}`

      if (isMessageDef(def)) {
        this.nested[name] = new Message(name, fullName, def, this)
      } else {
        this.nested[name] = new Enum(name, fullName, def)
      }
    })

    for (const [, { oneof: fields }] of Object.entries(def.oneofs)) {
      for (const field of fields) {
        if (def.fields[field] == null) {
          continue
        }

        def.fields[field].options ??= {}
        def.fields[field].options.proto3_optional = true
        def.fields[field].oneof = fields
      }
    }

    // reverse order of oneofs as spec says last field overwrites all others
    this.oneOfs = Object.values(def.oneofs).map(({ oneof }) => oneof.reverse())
  }

  init (): void {
    for (const [name, fieldDef] of Object.entries(this.def.fields ?? {})) {
      if (isMapFieldDef(fieldDef)) {
        this.fields.push(new MapField(name, fieldDef, this))
      } else if (isArrayFieldDef(fieldDef)) {
        this.fields.push(new ArrayField(name, fieldDef, this))
      } else {
        const type = this.findType(fieldDef.type)

        if (type instanceof Enum) {
          this.fields.push(new EnumField(name, fieldDef, this))
        } else if (type instanceof Primitive) {
          this.fields.push(new Field(name, fieldDef, this))
        } else {
          this.fields.push(new MessageField(name, fieldDef, this))
        }
      }
    }

    Object.values(this.nested).forEach(type => type.init())
  }

  findType (jsType: string, override?: 'string' | 'number'): Type {
    const type = this.nested[override ?? jsType]

    if (type == null) {
      return this.parent.findType(jsType, override)
    }

    return type
  }

  addImport (module: string, symbol: string, alias?: string): void {
    this.parent.addImport(module, symbol, alias)
  }

  addTypeImport (module: string, symbol: string, alias?: string): void {
    this.parent.addTypeImport(module, symbol, alias)
  }

  addEslintIgnore (rule: string): void {
    this.parent.addEslintIgnore(rule)
  }

  get flags (): Flags {
    return this.parent.flags
  }

  getDecoder (field: Field, indent = ''): string {
    let opts = ''

    if (field instanceof MessageField) {
      opts = `, {
${indent}                limits: opts.limits?.${field.name}
${indent}              }`
    } else if (field instanceof ArrayField) {
      opts = `, {
${indent}                limits: opts.limits?.${field.name}$
${indent}              }`
    } else if (field instanceof MapField) {
      opts = `, {
${indent}                limits: {
${indent}                  value: opts.limits?.${field.name}$value
                }
${indent}              }`
    }

    return `${this.jsType}.codec().decode(reader, reader.uint32()${opts})`
  }

  getStreamingDecoder (field: Field, prefix: string, indent = ''): string {
    let opts = ''

    if (field instanceof MessageField) {
      opts = `, {
${indent}              limits: opts.limits?.${field.name}
${indent}            }`
    } else if (field instanceof ArrayField) {
      opts = `, {
${indent}              limits: opts.limits?.${field.name}$
${indent}            }`

      return `for (const evt of ${this.jsType}.codec().stream(reader, reader.uint32(), ${prefix}${opts})) {
                yield {
                  ...evt,
                  index: obj.${field.name}
                }
              }`
    } else if (field instanceof MapField) {
      opts = `, {
${indent}              limits: {
${indent}                value: opts.limits?.${field.name}$value
                }
${indent}            }`
    }

    return `yield * ${this.jsType}.codec().stream(reader, reader.uint32(), ${prefix}${opts})`
  }

  getEncoder (field: Field, accessor: string): string {
    if (field instanceof ArrayField) {
      // message fields are only written if they have values. But if a message
      // is part of a repeated field, and consists of only default values it
      // won't be written, so write a zero-length buffer if that's the case
      // writeField = (): string => `w.uint32(${id})
      // ${type.jsType}.codec().encode(${valueVar}, w)`
    }

    return `${this.jsType}.codec().encode(${accessor}, w)`
  }

  getValueTest (field: Field): string {
    return `obj.${field.name} != null`
  }

  public compile (parent: Parent, indent: string = ''): string {
    // import required modules
    parent.addImport('protons-runtime', 'encodeMessage')
    parent.addImport('protons-runtime', 'decodeMessage')
    parent.addImport('protons-runtime', 'streamMessage')
    parent.addImport('protons-runtime', 'message')
    parent.addTypeImport('protons-runtime', 'Codec')
    parent.addTypeImport('protons-runtime', 'DecodeOptions')
    parent.addTypeImport('uint8arraylist', 'Uint8ArrayList')

    let nested = ''

    if (this.nested != null && [...Object.values(this.nested)].length > 0) {
      nested += Object.values(this.nested)
        .map(def => def.compile(this, `${indent}  `).trim())
        .join('\n\n')
      nested = nested.split('\n').join('\n  ')
      nested = `
  ${nested}
`
    }

    const interfaceFields = this.fields.map(field => field.getInterfaceField(this))
      .join('\n  ')
      .trim()

    let interfaceDef = ''
    let interfaceCodecDef = ''

    if (interfaceFields === '') {
      interfaceDef = `
export interface ${this.pbType} {}`
    } else {
      interfaceDef = `
export interface ${this.pbType} {
  ${interfaceFields}
}`
    }

    const enforceOneOfEncoding = this.createOneOfEncoding()
    const enforceOneOfDecoding = this.createOneOfDecoding()
    const streamEvents = this.getStreamEvents()

    const encodeFields = this.fields.map(field => field.getEncoder(this))
    const decodeFields = this.fields.map(field => field.getDecoder(this))
    const streamFields = this.fields.map(field => field.getStreamingDecoder(this))

    const streamGeneratorEvents = streamEvents.map(evt => evt.name)

    if (streamGeneratorEvents.length === 0) {
      this.addEslintIgnore('require-yield')
      streamGeneratorEvents.push('{}')
    }

    interfaceCodecDef = `
  let _codec: Codec<${this.pbType}>

  export const codec = (): Codec<${this.pbType}> => {
    if (_codec == null) {
      _codec = message<${this.pbType}>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }${enforceOneOfEncoding}${this.formatFields(encodeFields)}

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length, opts = {}) => {
        const obj: any = {${this.createDefaultObject()}}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {${this.formatFields(decodeFields, '\n            ')}
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }
${enforceOneOfDecoding === '' ? '' : `${enforceOneOfDecoding}\n`}
        return obj
      }, function * (reader, length, prefix, opts = {}) {
        ${this.createLimitObject()}const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {${this.formatFields(streamFields, '\n            ')}
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }
      })
    }

    return _codec
  }${this.formatStreamEvents(streamEvents)}

  export function encode (obj: Partial<${this.pbType}>): Uint8Array {
    return encodeMessage(obj, ${this.pbType}.codec())
  }

  export function decode (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<${this.pbType}>): ${this.pbType} {
    return decodeMessage(buf, ${this.pbType}.codec(), opts)
  }

  export function stream (buf: Uint8Array | Uint8ArrayList, opts?: DecodeOptions<${this.pbType}>): Generator<${streamGeneratorEvents.join(' | ')}> {
    return streamMessage(buf, ${this.pbType}.codec(), opts)
  }`

    return `
${interfaceDef}

export namespace ${this.pbType} {${nested}${interfaceCodecDef.trimEnd()}
}
`.trimStart()
  }

  private createOneOfEncoding (): string {
    let oneOfs = this.oneOfs.map(fields => {
      if (fields.length < 2) {
        return ''
      }

      let oneOf = ''

      for (const name of fields) {
        oneOf += `
        if (obj.${name} != null) {
${fields
  .filter(field => field !== name)
  .map(name => `          obj.${name} = undefined`).join('\n')}
        }
`
      }

      return oneOf.trimEnd()
    }).join('\n').trimEnd()

    if (oneOfs !== '') {
      oneOfs = `

        obj = { ...obj }
${oneOfs}`
    }

    return oneOfs
  }

  private createOneOfDecoding (): string {
    return this.oneOfs.map(fields => {
      if (fields.length < 2) {
        return ''
      }

      let oneOf = ''

      for (const name of fields) {
        oneOf += `
        if (obj.${name} != null) {
${fields
  .filter(field => field !== name)
  .map(name => `          delete obj.${name}`).join('\n')}
        }
`
      }

      return oneOf.trimEnd()
    }).join('\n').trimEnd()
  }

  createDefaultObject (indent = ''): string {
    const output = this.fields
      .map((field) => field.getDefaultField(this))
      .filter(Boolean)
      .join(`,\n          ${indent}`)

    if (output !== '') {
      return `
          ${indent}${output}
        ${indent}`
    }

    return ''
  }

  createLimitObject (): string {
    const output = this.fields.map(field => field.getLimitField())
      .filter(Boolean)
      .join(',\n          ')

    if (output !== '') {
      return `const obj = {
          ${output}
        }

        `
    }

    return ''
  }

  formatStreamEvents (streamEvents: StreamEvent[]): string {
    if (streamEvents.length === 0) {
      return ''
    }

    return `

  ${streamEvents.map(evt => `export interface ${evt.name} {
    ${evt.fields.join('\n    ')}
  }`).join('\n\n  ')}`
  }

  formatFields (fields: string[], delimiter = '\n'): string {
    if (fields.length === 0) {
      return ''
    }

    return `
            ${fields.join(delimiter)}`
  }

  getStreamEvents (fieldPrefix = '$.'): StreamEvent[] {
    const streamEvents: StreamEvent[] = []

    const addMessageFields = (field: Field, message: Message, extraFields: string[]): void => {
      let fieldSuffix = '.'

      if (field instanceof ArrayField) {
        fieldSuffix = '[].'
      } else if (field instanceof MapField) {
        fieldSuffix = '{}.'
      }

      // include sub messages
      streamEvents.push(...message.getStreamEvents(`${fieldPrefix}${field.name}${fieldSuffix}`).map(evt => {
        let type = evt.type

        if (evt.type === 'field') {
          type = (field instanceof MapField || field instanceof ArrayField) ? 'collection-message-member-field' : 'sub-message-field'
        } else if (evt.type === 'collection-primitive-member') {
          type = 'sub-message-collection-primitive-member'
        } else if (evt.type === 'collection-message-member-field') {
          type = 'sub-message-collection-message-member-field'
        }

        const fields = new Map<string, string>()
        evt.fields.forEach(field => {
          const [key, value] = field.split(':')
          fields.set(key.trim(), value.trim())
        })
        extraFields.forEach(field => {
          const [key, value] = field.split(':')
          fields.set(key.trim(), value.trim())
        })

        return {
          ...evt,
          name: `${fieldPrefix === '$.' ? this.pbType : ''}${camelize(field.name)}${evt.name}`,
          type,
          fields: [...fields.entries()].map(([key, value]) => `${key}: ${value}`)
        }
      }))
    }

    this.fields.forEach(field => {
      if (field instanceof MapField) {
        const keyType = this.findType(field.keyType)
        const valueType = this.findType(field.valueType)

        if (valueType instanceof Primitive || valueType instanceof Enum) {
          streamEvents.push({
            name: `${fieldPrefix === '$.' ? this.pbType : ''}${camelize(field.name)}FieldEvent`,
            fields: [
              `field: '${fieldPrefix}${field.name}{}'`,
              `key: ${field.jsKeyTypeOverride ?? keyType.jsType}`,
              `value: ${field.jsValueTypeOverride ?? valueType.jsType}`
            ],
            type: 'collection-primitive-member'
          })
        } else if (valueType instanceof Message) {
          addMessageFields(field, valueType, [
            `key: ${field.jsKeyTypeOverride ?? keyType.jsType}`,
            `value: ${field.jsValueTypeOverride ?? valueType.jsType}`
          ])
        }
      } else if (field instanceof ArrayField) {
        const type = this.findType(field.type)

        if (type instanceof Primitive || type instanceof Enum) {
          streamEvents.push({
            name: `${fieldPrefix === '$.' ? this.pbType : ''}${camelize(field.name)}FieldEvent`,
            fields: [
              `field: '${fieldPrefix}${field.name}[]'`,
              'index: number',
              `value: ${field.jsTypeOverride ?? type.jsType}`
            ],
            type: 'collection-primitive-member'
          })
        } else if (type instanceof Message) {
          addMessageFields(field, type, [
            'index: number'
          ])
        }
      } else {
        const type = this.findType(field.type)

        if (type instanceof Primitive || type instanceof Enum) {
          streamEvents.push({
            name: `${fieldPrefix === '$.' ? this.pbType : ''}${camelize(field.name)}FieldEvent`,
            fields: [
              `field: '${fieldPrefix}${field.name}'`,
              `value: ${field.jsTypeOverride ?? type.jsType}`
            ],
            type: 'field'
          })
        } else if (type instanceof Message) {
          addMessageFields(field, type, [])
        }
      }
    })

    return streamEvents
  }
}
