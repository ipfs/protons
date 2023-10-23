/* eslint-disable max-depth */

import fs from 'fs/promises'
import path from 'path'
import { promisify } from 'util'
import { main as pbjs } from 'protobufjs-cli/pbjs.js'

export enum CODEC_TYPES {
  VARINT = 0,
  BIT64,
  LENGTH_DELIMITED,
  START_GROUP,
  END_GROUP,
  BIT32
}

function pathWithExtension (input: string, extension: string, outputDir?: string): string {
  const output = outputDir ?? path.dirname(input)
  return path.join(output, path.basename(input).split('.').slice(0, -1).join('.') + extension)
}

export class CodeError extends Error {
  public code: string

  constructor (message: string, code: string, options?: ErrorOptions) {
    super(message, options)

    this.code = code
  }
}

const types: Record<string, string> = {
  bool: 'boolean',
  bytes: 'Uint8Array',
  double: 'number',
  fixed32: 'number',
  fixed64: 'bigint',
  float: 'number',
  int32: 'number',
  int64: 'bigint',
  sfixed32: 'number',
  sfixed64: 'bigint',
  sint32: 'number',
  sint64: 'bigint',
  string: 'string',
  uint32: 'number',
  uint64: 'bigint'
}

const jsTypeOverrides: Record<string, 'number' | 'string'> = {
  JS_NUMBER: 'number',
  JS_STRING: 'string'
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

const decoderGenerators: Record<string, (jsTypeOverride?: 'number' | 'string') => string> = {
  bool: () => 'reader.bool()',
  bytes: () => 'reader.bytes()',
  double: () => 'reader.double()',
  fixed32: () => 'reader.fixed32()',
  fixed64: (jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return 'reader.fixed64Number()'
    }

    if (jsTypeOverride === 'string') {
      return 'reader.fixed64String()'
    }

    return 'reader.fixed64()'
  },
  float: () => 'reader.float()',
  int32: () => 'reader.int32()',
  int64: (jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return 'reader.int64Number()'
    }

    if (jsTypeOverride === 'string') {
      return 'reader.int64String()'
    }

    return 'reader.int64()'
  },
  sfixed32: () => 'reader.sfixed32()',
  sfixed64: (jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return 'reader.sfixed64Number()'
    }

    if (jsTypeOverride === 'string') {
      return 'reader.sfixed64String()'
    }

    return 'reader.sfixed64()'
  },
  sint32: () => 'reader.sint32()',
  sint64: (jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return 'reader.sint64Number()'
    }

    if (jsTypeOverride === 'string') {
      return 'reader.sint64String()'
    }

    return 'reader.sint64()'
  },
  string: () => 'reader.string()',
  uint32: () => 'reader.uint32()',
  uint64: (jsTypeOverride) => {
    if (jsTypeOverride === 'number') {
      return 'reader.uint64Number()'
    }

    if (jsTypeOverride === 'string') {
      return 'reader.uint64String()'
    }

    return 'reader.uint64()'
  }
}

const defaultValueGenerators: Record<string, () => string> = {
  bool: () => 'false',
  bytes: () => 'new Uint8Array(0)',
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

const defaultValueGeneratorsJsTypeOverrides: Record<string, () => string> = {
  number: () => '0',
  string: () => "''"
}

const defaultValueTestGenerators: Record<string, (field: string) => string> = {
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

const defaultValueTestGeneratorsJsTypeOverrides: Record<string, (field: string) => string> = {
  number: (field) => `(${field} != null && ${field} !== 0)`,
  string: (field) => `(${field} != null && ${field} !== '')`
}

function findJsTypeOverride (defaultType: string, fieldDef: FieldDef): 'number' | 'string' | undefined {
  if (fieldDef.options?.jstype != null && jsTypeOverrides[fieldDef.options?.jstype] != null) {
    if (!['int64', 'uint64', 'sint64', 'fixed64', 'sfixed64'].includes(defaultType)) {
      throw new Error(`jstype is only allowed on int64, uint64, sint64, fixed64 or sfixed64 fields - got "${defaultType}"`)
    }

    return jsTypeOverrides[fieldDef.options?.jstype]
  }
}

function findJsTypeName (typeName: string, classDef: MessageDef, moduleDef: ModuleDef, fieldDef: FieldDef): string {
  const override = findJsTypeOverride(typeName, fieldDef)

  if (override != null) {
    return override
  }

  if (types[typeName] != null) {
    return types[typeName]
  }

  if (isEnumDef(classDef)) {
    throw new Error('Could not find type in enum')
  }

  if (classDef.nested?.[typeName] != null) {
    return `${classDef.fullName}.${typeName}`
  }

  if (classDef.parent != null) {
    return findJsTypeName(typeName, classDef.parent, moduleDef, fieldDef)
  }

  if (moduleDef.globals[typeName] != null) {
    return typeName
  }

  throw new Error(`Could not resolve type name "${typeName}"`)
}

function findDef (typeName: string, classDef: MessageDef, moduleDef: ModuleDef): MessageDef {
  if (isEnumDef(classDef)) {
    throw new Error('Could not find type in enum')
  }

  if (classDef.nested?.[typeName] != null) {
    return classDef.nested?.[typeName]
  }

  if (classDef.parent != null) {
    return findDef(typeName, classDef.parent, moduleDef)
  }

  if (moduleDef.globals[typeName] != null) {
    return moduleDef.globals[typeName]
  }

  throw new Error(`Could not resolve type name "${typeName}"`)
}

function createDefaultObject (fields: Record<string, FieldDef>, messageDef: MessageDef, moduleDef: ModuleDef): string {
  const output = Object.entries(fields)
    .map(([name, fieldDef]) => {
      if (fieldDef.map) {
        return `${name}: new Map<${types[fieldDef.keyType ?? 'string']}, ${types[fieldDef.valueType]}>()`
      }

      if (fieldDef.repeated) {
        return `${name}: []`
      }

      if (fieldDef.optional) {
        return ''
      }

      const type: string = fieldDef.type
      let defaultValue
      let defaultValueGenerator = defaultValueGenerators[type]

      if (defaultValueGenerator != null) {
        const jsTypeOverride = findJsTypeOverride(type, fieldDef)

        if (jsTypeOverride != null && defaultValueGeneratorsJsTypeOverrides[jsTypeOverride] != null) {
          defaultValueGenerator = defaultValueGeneratorsJsTypeOverrides[jsTypeOverride]
        }

        defaultValue = defaultValueGenerator()
      } else {
        const def = findDef(fieldDef.type, messageDef, moduleDef)

        if (isEnumDef(def)) {
          // select lowest-value enum - should be 0 but it's not guaranteed
          const val = Object.entries(def.values)
            .sort((a, b) => {
              if (a[1] < b[1]) {
                return 1
              }

              if (a[1] > b[1]) {
                return -1
              }

              return 0
            })
            .pop()

          if (val == null) {
            throw new Error(`Could not find default enum value for ${def.fullName}`)
          }

          defaultValue = `${def.name}.${val[0]}`
        } else {
          defaultValue = 'undefined'
        }
      }

      return `${name}: ${defaultValue}`
    })
    .filter(Boolean)
    .join(',\n          ')

  if (output !== '') {
    return `
          ${output}
        `
  }

  return ''
}

const encoders: Record<string, string> = {
  bool: 'bool',
  bytes: 'bytes',
  double: 'double',
  fixed32: 'fixed32',
  fixed64: 'fixed64',
  float: 'float',
  int32: 'int32',
  int64: 'int64',
  sfixed32: 'sfixed32',
  sfixed64: 'sfixed64',
  sint32: 'sint32',
  sint64: 'sint64',
  string: 'string',
  uint32: 'uint32',
  uint64: 'uint64'
}

const codecTypes: Record<string, CODEC_TYPES> = {
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

interface ClassDef {
  name: string
  fullName: string
  parent?: ClassDef
  fields?: Record<string, FieldDef>
  nested?: Record<string, ClassDef>
}

interface EnumDef {
  name: string
  fullName: string
  parent?: ClassDef
  values: Record<string, number>
}

type MessageDef = ClassDef | EnumDef

function isEnumDef (obj: any): obj is EnumDef {
  return obj.values != null
}

interface FieldDef {
  type: string
  id: number
  options?: Record<string, any>
  rule: string
  optional: boolean
  repeated: boolean
  lengthLimit?: number
  message: boolean
  enum: boolean
  map: boolean
  valueType: string
  keyType: string

  /**
   * Support proto2 required field. This field means a value should always be
   * in the serialized buffer, any message without it should be considered
   * invalid. It was removed for proto3.
   */
  proto2Required: boolean
}

function defineFields (fields: Record<string, FieldDef>, messageDef: MessageDef, moduleDef: ModuleDef): string[] {
  return Object.entries(fields).map(([fieldName, fieldDef]) => {
    if (fieldDef.map) {
      return `${fieldName}: Map<${findJsTypeName(fieldDef.keyType ?? 'string', messageDef, moduleDef, fieldDef)}, ${findJsTypeName(fieldDef.valueType, messageDef, moduleDef, fieldDef)}>`
    }

    return `${fieldName}${fieldDef.optional ? '?' : ''}: ${findJsTypeName(fieldDef.type, messageDef, moduleDef, fieldDef)}${fieldDef.repeated ? '[]' : ''}`
  })
}

function compileMessage (messageDef: MessageDef, moduleDef: ModuleDef, flags?: Flags): string {
  if (isEnumDef(messageDef)) {
    moduleDef.imports.add('enumeration')

    // check that the enum def values start from 0
    if (Object.values(messageDef.values)[0] !== 0) {
      const message = `enum ${messageDef.name} does not contain a value that maps to zero as it's first element, this is required in proto3 - see https://protobuf.dev/programming-guides/proto3/#enum`

      if (flags?.strict === true) {
        throw new CodeError(message, 'ERR_PARSE_ERROR')
      } else {
        // eslint-disable-next-line no-console
        console.info(`[WARN] ${message}`)
      }
    }

    return `
export enum ${messageDef.name} {
  ${
    Object.keys(messageDef.values).map(name => {
      return `${name} = '${name}'`
    }).join(',\n  ').trim()
  }
}

enum __${messageDef.name}Values {
  ${
    Object.entries(messageDef.values).map(([name, value]) => {
      return `${name} = ${value}`
    }).join(',\n  ').trim()
  }
}

export namespace ${messageDef.name} {
  export const codec = (): Codec<${messageDef.name}> => {
    return enumeration<${messageDef.name}>(__${messageDef.name}Values)
  }
}`.trim()
  }

  let nested = ''

  if (messageDef.nested != null) {
    nested = '\n'
    nested += Object.values(messageDef.nested)
      .map(def => compileMessage(def, moduleDef, flags).trim())
      .join('\n\n')
      .split('\n')
      .map(line => line.trim() === '' ? '' : `  ${line}`)
      .join('\n')
  }

  const fields = messageDef.fields ?? {}

  // import relevant modules
  moduleDef.imports.add('encodeMessage')
  moduleDef.imports.add('decodeMessage')
  moduleDef.imports.add('message')
  moduleDef.importedTypes.add('Codec')

  const interfaceFields = defineFields(fields, messageDef, moduleDef)
    .join('\n  ')
    .trim()

  let interfaceDef = ''
  let interfaceCodecDef = ''

  if (interfaceFields === '') {
    interfaceDef = `
export interface ${messageDef.name} {}`
  } else {
    interfaceDef = `
export interface ${messageDef.name} {
  ${
    defineFields(fields, messageDef, moduleDef)
      .join('\n  ')
      .trim()
  }
}`
  }

  const encodeFields = Object.entries(fields)
    .map(([name, fieldDef]) => {
      let codec: string = encoders[fieldDef.type]
      let type: string = fieldDef.map ? 'message' : fieldDef.type
      let typeName: string = ''

      if (codec == null) {
        if (fieldDef.enum) {
          moduleDef.imports.add('enumeration')
          type = 'enum'
        } else {
          moduleDef.imports.add('message')
          type = 'message'
        }

        typeName = findJsTypeName(fieldDef.type, messageDef, moduleDef, fieldDef)
        codec = `${typeName}.codec()`
      }

      let valueTest = `obj.${name} != null`

      if (fieldDef.map) {
        valueTest = `obj.${name} != null && obj.${name}.size !== 0`
      } else if (!fieldDef.optional && !fieldDef.repeated && !fieldDef.proto2Required) {
        let defaultValueTestGenerator = defaultValueTestGenerators[type]

        // proto3 singular fields should only be written out if they are not the default value
        if (defaultValueTestGenerator != null) {
          const jsTypeOverride = findJsTypeOverride(type, fieldDef)

          if (jsTypeOverride != null && defaultValueTestGeneratorsJsTypeOverrides[jsTypeOverride] != null) {
            defaultValueTestGenerator = defaultValueTestGeneratorsJsTypeOverrides[jsTypeOverride]
          }

          valueTest = `${defaultValueTestGenerator(`obj.${name}`)}`
        } else if (type === 'enum') {
          // handle enums
          const def = findDef(fieldDef.type, messageDef, moduleDef)

          if (!isEnumDef(def)) {
            throw new Error(`${fieldDef.type} was not enum def`)
          }

          valueTest = `obj.${name} != null`

          // singular enums default to 0, but enums can be defined without a 0
          // value which is against the proto3 spec but is tolerated
          if (Object.values(def.values)[0] === 0) {
            valueTest += ` && __${fieldDef.type}Values[obj.${name}] !== 0`
          }
        }
      }

      function createWriteField (valueVar: string): () => string {
        const id = (fieldDef.id << 3) | codecTypes[type]

        if (fieldDef.enum) {
          const def = findDef(fieldDef.type, messageDef, moduleDef)

          if (!isEnumDef(def)) {
            throw new Error(`${fieldDef.type} was not enum def`)
          }
        }

        let writeField = (): string => {
          const encoderGenerator = encoderGenerators[type]
          const jsTypeOverride = findJsTypeOverride(type, fieldDef)

          return `w.uint32(${id})
          ${encoderGenerator == null ? `${codec}.encode(${valueVar}, w)` : encoderGenerator(valueVar, jsTypeOverride)}`
        }

        if (type === 'message') {
          // message fields are only written if they have values. But if a message
          // is part of a repeated field, and consists of only default values it
          // won't be written, so write a zero-length buffer if that's the case
          writeField = () => `w.uint32(${id})
          ${typeName}.codec().encode(${valueVar}, w)`
        }

        return writeField
      }

      let writeField = createWriteField(`obj.${name}`)

      if (fieldDef.repeated) {
        if (fieldDef.map) {
          writeField = () => `
        for (const [key, value] of obj.${name}.entries()) {
          ${
              createWriteField('{ key, value }')()
                .split('\n')
                .map(s => {
                  const trimmed = s.trim()

                  return trimmed === '' ? trimmed : `  ${s}`
                })
                .join('\n')
            }
          }
          `.trim()
        } else {
          writeField = () => `
          for (const value of obj.${name}) {
          ${
            createWriteField('value')()
              .split('\n')
              .map(s => {
                const trimmed = s.trim()

                return trimmed === '' ? trimmed : `  ${s}`
              })
              .join('\n')
          }
          }
        `.trim()
        }
      }

      return `
        if (${valueTest}) {
          ${writeField()}
        }`
    }).join('\n')

  const decodeFields = Object.entries(fields)
    .map(([fieldName, fieldDef]) => {
      function createReadField (fieldName: string, fieldDef: FieldDef): string {
        let codec: string = encoders[fieldDef.type]
        let type: string = fieldDef.type

        if (codec == null) {
          if (fieldDef.enum) {
            moduleDef.imports.add('enumeration')
            type = 'enum'
          } else {
            moduleDef.imports.add('message')
            type = 'message'
          }

          const typeName = findJsTypeName(fieldDef.type, messageDef, moduleDef, fieldDef)
          codec = `${typeName}.codec()`
        }

        // override setting type on js object
        const jsTypeOverride = findJsTypeOverride(fieldDef.type, fieldDef)

        const parseValue = `${decoderGenerators[type] == null ? `${codec}.decode(reader${type === 'message' ? ', reader.uint32()' : ''})` : decoderGenerators[type](jsTypeOverride)}`

        if (fieldDef.map) {
          let limit = ''

          if (fieldDef.lengthLimit != null) {
            moduleDef.imports.add('CodeError')

            limit = `
              if (obj.${fieldName}.size === ${fieldDef.lengthLimit}) {
                throw new CodeError('decode error - map field "${fieldName}" had too many elements', 'ERR_MAX_SIZE')
              }
`
          }

          return `case ${fieldDef.id}: {${limit}
              const entry = ${parseValue}
              obj.${fieldName}.set(entry.key, entry.value)
              break
            }`
        } else if (fieldDef.repeated) {
          let limit = ''

          if (fieldDef.lengthLimit != null) {
            moduleDef.imports.add('CodeError')

            limit = `
              if (obj.${fieldName}.length === ${fieldDef.lengthLimit}) {
                throw new CodeError('decode error - repeated field "${fieldName}" had too many elements', 'ERR_MAX_LENGTH')
              }
`
          }

          return `case ${fieldDef.id}: {${limit}
              obj.${fieldName}.push(${parseValue})
              break
            }`
        }

        return `case ${fieldDef.id}: {
              obj.${fieldName} = ${parseValue}
              break
            }`
      }

      return createReadField(fieldName, fieldDef)
    })
    .join('\n            ')

  interfaceCodecDef = `
  let _codec: Codec<${messageDef.name}>

  export const codec = (): Codec<${messageDef.name}> => {
    if (_codec == null) {
      _codec = message<${messageDef.name}>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }
${encodeFields === '' ? '' : `${encodeFields}\n`}
        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {${createDefaultObject(fields, messageDef, moduleDef)}}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {${decodeFields === '' ? '' : `\n            ${decodeFields}`}
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<${messageDef.name}>): Uint8Array => {
    return encodeMessage(obj, ${messageDef.name}.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ${messageDef.name} => {
    return decodeMessage(buf, ${messageDef.name}.codec())
  }`

  return `
${interfaceDef}

export namespace ${messageDef.name} {
  ${`${nested}${nested !== '' && interfaceCodecDef !== '' ? '\n' : ''}${interfaceCodecDef}`.trim()}
}
`.trimStart()
}

interface ModuleDef {
  imports: Set<string>
  importedTypes: Set<string>
  types: Set<string>
  compiled: string[]
  globals: Record<string, ClassDef>
}

function defineModule (def: ClassDef, flags: Flags): ModuleDef {
  const moduleDef: ModuleDef = {
    imports: new Set(),
    importedTypes: new Set(),
    types: new Set(),
    compiled: [],
    globals: {}
  }

  const defs = def.nested

  if (defs == null) {
    throw new CodeError('No top-level messages found in protobuf', 'ERR_NO_MESSAGES_FOUND')
  }

  function defineMessage (defs: Record<string, ClassDef>, parent?: ClassDef, flags?: Flags): void {
    for (const className of Object.keys(defs)) {
      const classDef = defs[className]

      classDef.name = className
      classDef.parent = parent
      classDef.fullName = parent == null ? className : `${parent.fullName}.${className}`

      if (classDef.nested != null) {
        defineMessage(classDef.nested, classDef)
      }

      if (classDef.fields != null) {
        for (const name of Object.keys(classDef.fields)) {
          const fieldDef = classDef.fields[name]
          fieldDef.repeated = fieldDef.rule === 'repeated'
          fieldDef.optional = !fieldDef.repeated && fieldDef.options?.proto3_optional === true
          fieldDef.map = fieldDef.keyType != null
          fieldDef.lengthLimit = fieldDef.options?.['(protons.options).limit']
          fieldDef.proto2Required = false

          if (fieldDef.rule === 'required') {
            const message = `field "${name}" is required, this is not allowed in proto3. Please convert your proto2 definitions to proto3 - see https://github.com/ipfs/protons/wiki/Required-fields-and-protobuf-3`

            if (flags?.strict === true) {
              throw new CodeError(message, 'ERR_PARSE_ERROR')
            } else {
              fieldDef.proto2Required = true

              // eslint-disable-next-line no-console
              console.info(`[WARN] ${message}`)
            }
          }
        }
      }

      if (parent == null) {
        moduleDef.globals[className] = classDef
      }
    }
  }

  function updateTypes (defs: Record<string, ClassDef>, parent?: ClassDef): void {
    for (const className of Object.keys(defs)) {
      const classDef = defs[className]

      if (classDef.nested != null) {
        updateTypes(classDef.nested, classDef)
      }

      if (classDef.fields != null) {
        for (const name of Object.keys(classDef.fields)) {
          const fieldDef = classDef.fields[name]
          if (types[fieldDef.type] == null) {
            const def = findDef(fieldDef.type, classDef, moduleDef)

            fieldDef.enum = isEnumDef(def)
            fieldDef.message = !fieldDef.enum

            if (fieldDef.message && !fieldDef.repeated) {
              // the default type for a message is unset so they are always optional
              // https://developers.google.com/protocol-buffers/docs/proto3#default
              fieldDef.optional = true
            }
          }
        }
      }
    }
  }

  defineMessage(defs, undefined, flags)

  // set enum/message fields now all messages have been defined
  updateTypes(defs)

  for (const className of Object.keys(defs)) {
    const classDef = defs[className]

    moduleDef.compiled.push(compileMessage(classDef, moduleDef, flags))
  }

  return moduleDef
}

interface Flags {
  /**
   * Specifies an output directory
   */
  output?: string

  /**
   * If true, warnings will be thrown as errors
   */
  strict?: boolean
}

export async function generate (source: string, flags: Flags): Promise<void> {
  // convert .protobuf to .json
  const json = await promisify(pbjs)(['-t', 'json', source])

  if (json == null) {
    throw new Error(`Could not convert ${source} to intermediate JSON format`)
  }

  const def = JSON.parse(json)

  for (const [className, classDef] of Object.entries<any>(def.nested ?? {})) {
    for (const [fieldName, fieldDef] of Object.entries<any>(classDef.fields ?? {})) {
      if (fieldDef.keyType == null) {
        continue
      }

      // https://developers.google.com/protocol-buffers/docs/proto3#backwards_compatibility
      const mapEntryType = `${className}$${fieldName}Entry`

      classDef.nested = classDef.nested ?? {}
      classDef.nested[mapEntryType] = {
        fields: {
          key: {
            type: fieldDef.keyType,
            id: 1
          },
          value: {
            type: fieldDef.type,
            id: 2
          }
        }
      }

      fieldDef.valueType = fieldDef.type
      fieldDef.type = mapEntryType
      fieldDef.rule = 'repeated'
    }
  }

  const moduleDef = defineModule(def, flags)

  const ignores = [
    '/* eslint-disable import/export */',
    '/* eslint-disable complexity */',
    '/* eslint-disable @typescript-eslint/no-namespace */',
    '/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */',
    '/* eslint-disable @typescript-eslint/no-empty-interface */'
  ]

  const imports = []

  if (moduleDef.imports.size > 0) {
    imports.push(`import { ${Array.from(moduleDef.imports).join(', ')} } from 'protons-runtime'`)
  }

  if (moduleDef.imports.has('encodeMessage')) {
    imports.push("import type { Uint8ArrayList } from 'uint8arraylist'")
  }

  if (moduleDef.importedTypes.size > 0) {
    imports.push(`import type { ${Array.from(moduleDef.importedTypes).join(', ')} } from 'protons-runtime'`)
  }

  const lines = [
    ...ignores,
    '',
    ...imports.sort((a, b) => {
      const aModule = a.split("from '")[1].toString()
      const bModule = b.split("from '")[1].toString()

      return aModule.localeCompare(bModule)
    }),
    '',
    ...moduleDef.compiled
  ]

  const content = lines.join('\n').trim()
  const outputPath = pathWithExtension(source, '.ts', flags.output)

  await fs.writeFile(outputPath, content + '\n')
}
