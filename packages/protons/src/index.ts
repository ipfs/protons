/* eslint-disable max-depth */

import { main as pbjs } from 'protobufjs-cli/pbjs.js'
import path from 'path'
import { promisify } from 'util'
import fs from 'fs/promises'

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

const encoderGenerators: Record<string, (val: string, includeDefault: boolean) => string> = {
  bool: (val, includeDefault) => `w.bool(${val}${includeDefault ? ' ?? false' : ''})`,
  bytes: (val, includeDefault) => `w.bytes(${val}${includeDefault ? ' ?? new Uint8Array(0)' : ''})`,
  double: (val, includeDefault) => `w.double(${val}${includeDefault ? ' ?? 0' : ''})`,
  fixed32: (val, includeDefault) => `w.fixed32(${val}${includeDefault ? ' ?? 0' : ''})`,
  fixed64: (val, includeDefault) => `w.fixed64(${val}${includeDefault ? ' ?? 0n' : ''})`,
  float: (val, includeDefault) => `w.float(${val}${includeDefault ? ' ?? 0' : ''})`,
  int32: (val, includeDefault) => `w.int32(${val}${includeDefault ? ' ?? 0' : ''})`,
  int64: (val, includeDefault) => `w.int64(${val}${includeDefault ? ' ?? 0n' : ''})`,
  sfixed32: (val, includeDefault) => `w.sfixed32(${val}${includeDefault ? ' ?? 0' : ''})`,
  sfixed64: (val, includeDefault) => `w.sfixed64(${val}${includeDefault ? ' ?? 0n' : ''})`,
  sint32: (val, includeDefault) => `w.sint32(${val}${includeDefault ? ' ?? 0' : ''})`,
  sint64: (val, includeDefault) => `w.sint64(${val}${includeDefault ? ' ?? 0n' : ''})`,
  string: (val, includeDefault) => `w.string(${val}${includeDefault ? ' ?? \'\'' : ''})`,
  uint32: (val, includeDefault) => `w.uint32(${val}${includeDefault ? ' ?? 0' : ''})`,
  uint64: (val, includeDefault) => `w.uint64(${val}${includeDefault ? ' ?? 0n' : ''})`
}

const decoderGenerators: Record<string, () => string> = {
  bool: () => 'reader.bool()',
  bytes: () => 'reader.bytes()',
  double: () => 'reader.double()',
  fixed32: () => 'reader.fixed32()',
  fixed64: () => 'reader.fixed64()',
  float: () => 'reader.float()',
  int32: () => 'reader.int32()',
  int64: () => 'reader.int64()',
  sfixed32: () => 'reader.sfixed32()',
  sfixed64: () => 'reader.sfixed64()',
  sint32: () => 'reader.sint32()',
  sint64: () => 'reader.sint64()',
  string: () => 'reader.string()',
  uint32: () => 'reader.uint32()',
  uint64: () => 'reader.uint64()'
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

const defaultValueTestGenerators: Record<string, (field: string) => string> = {
  bool: (field) => `${field} !== false`,
  bytes: (field) => `(${field} != null && ${field}.byteLength > 0)`,
  double: (field) => `${field} !== 0`,
  fixed32: (field) => `${field} !== 0`,
  fixed64: (field) => `${field} !== 0n`,
  float: (field) => `${field} !== 0`,
  int32: (field) => `${field} !== 0`,
  int64: (field) => `${field} !== 0n`,
  sfixed32: (field) => `${field} !== 0`,
  sfixed64: (field) => `${field} !== 0n`,
  sint32: (field) => `${field} !== 0`,
  sint64: (field) => `${field} !== 0n`,
  string: (field) => `${field} !== ''`,
  uint32: (field) => `${field} !== 0`,
  uint64: (field) => `${field} !== 0n`
}

function findTypeName (typeName: string, classDef: MessageDef, moduleDef: ModuleDef): string {
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
    return findTypeName(typeName, classDef.parent, moduleDef)
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

      if (defaultValueGenerators[type] != null) {
        defaultValue = defaultValueGenerators[type]()
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
  message: boolean
  enum: boolean
  map: boolean
  valueType: string
  keyType: string
}

function defineFields (fields: Record<string, FieldDef>, messageDef: MessageDef, moduleDef: ModuleDef): string[] {
  return Object.entries(fields).map(([fieldName, fieldDef]) => {
    if (fieldDef.map) {
      return `${fieldName}: Map<${findTypeName(fieldDef.keyType ?? 'string', messageDef, moduleDef)}, ${findTypeName(fieldDef.valueType, messageDef, moduleDef)}>`
    }

    return `${fieldName}${fieldDef.optional ? '?' : ''}: ${findTypeName(fieldDef.type, messageDef, moduleDef)}${fieldDef.repeated ? '[]' : ''}`
  })
}

function compileMessage (messageDef: MessageDef, moduleDef: ModuleDef): string {
  if (isEnumDef(messageDef)) {
    moduleDef.imports.add('enumeration')

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
      .map(def => compileMessage(def, moduleDef).trim())
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

        typeName = findTypeName(fieldDef.type, messageDef, moduleDef)
        codec = `${typeName}.codec()`
      }

      let valueTest = `obj.${name} != null`

      if (fieldDef.map) {
        valueTest = `obj.${name} != null && obj.${name}.size !== 0`
      } else if (!fieldDef.optional && !fieldDef.repeated) {
        // proto3 singular fields should only be written out if they are not the default value
        if (defaultValueTestGenerators[type] != null) {
          valueTest = `opts.writeDefaults === true || ${defaultValueTestGenerators[type](`obj.${name}`)}`
        } else if (type === 'enum') {
          // handle enums
          valueTest = `opts.writeDefaults === true || (obj.${name} != null && __${fieldDef.type}Values[obj.${name}] !== 0)`
        }
      }

      function createWriteField (valueVar: string): (includeDefault: boolean) => string {
        const id = (fieldDef.id << 3) | codecTypes[type]
        let defaultValue = ''

        if (fieldDef.enum) {
          const def = findDef(fieldDef.type, messageDef, moduleDef)

          if (!isEnumDef(def)) {
            throw new Error(`${fieldDef.type} was not enum def`)
          }

          defaultValue = Object.keys(def.values)[0]
        }

        let writeField = (includeDefault: boolean): string => `w.uint32(${id})
          ${encoderGenerators[type] == null ? `${codec}.encode(${valueVar}${includeDefault ? ` ?? ${typeName}.${defaultValue}` : ''}, w)` : encoderGenerators[type](valueVar, includeDefault)}`

        if (type === 'message') {
          // message fields are only written if they have values
          writeField = () => `w.uint32(${id})
          ${typeName}.codec().encode(${valueVar}, w, {
            writeDefaults: ${Boolean(fieldDef.repeated).toString()}
          })`
        }

        return writeField
      }

      let writeField = createWriteField(`obj.${name}`)

      if (fieldDef.repeated) {
        if (fieldDef.map) {
          writeField = () => `
        for (const [key, value] of obj.${name}.entries()) {
          ${
              createWriteField('{ key, value }')(false)
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
            createWriteField('value')(false)
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
          ${writeField(valueTest.includes('opts.writeDefaults === true'))}
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

          const typeName = findTypeName(fieldDef.type, messageDef, moduleDef)
          codec = `${typeName}.codec()`
        }

        const parseValue = `${decoderGenerators[type] == null ? `${codec}.decode(reader${type === 'message' ? ', reader.uint32()' : ''})` : decoderGenerators[type]()}`

        if (fieldDef.map) {
          return `case ${fieldDef.id}: {
              const entry = ${parseValue}
              obj.${fieldName}.set(entry.key, entry.value)
              break
            }`
        } else if (fieldDef.repeated) {
          return `case ${fieldDef.id}:
              obj.${fieldName}.push(${parseValue})
              break`
        }

        return `case ${fieldDef.id}:
              obj.${fieldName} = ${parseValue}
              break`
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
            default:
              reader.skipType(tag & 7)
              break
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

function defineModule (def: ClassDef): ModuleDef {
  const moduleDef: ModuleDef = {
    imports: new Set(),
    importedTypes: new Set(),
    types: new Set(),
    compiled: [],
    globals: {}
  }

  const defs = def.nested

  if (defs == null) {
    throw new Error('No top-level messages found in protobuf')
  }

  function defineMessage (defs: Record<string, ClassDef>, parent?: ClassDef): void {
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

          if (fieldDef.rule === 'required') {
            throw new Error('"required" fields are not allowed in proto3 - please convert your proto2 definitions to proto3')
          }
        }
      }

      if (parent == null) {
        moduleDef.globals[className] = classDef
      }
    }
  }

  defineMessage(defs)

  // set enum/message fields now all messages have been defined
  for (const className of Object.keys(defs)) {
    const classDef = defs[className]

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

  for (const className of Object.keys(defs)) {
    const classDef = defs[className]

    moduleDef.compiled.push(compileMessage(classDef, moduleDef))
  }

  return moduleDef
}

interface Flags {
  output?: string
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

  const moduleDef = defineModule(def)

  let lines = [
    '/* eslint-disable import/export */',
    '/* eslint-disable complexity */',
    '/* eslint-disable @typescript-eslint/no-namespace */',
    '/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */',
    '/* eslint-disable @typescript-eslint/no-empty-interface */',
    ''
  ]

  if (moduleDef.imports.size > 0) {
    lines.push(`import { ${Array.from(moduleDef.imports).join(', ')} } from 'protons-runtime'`)
  }

  if (moduleDef.imports.has('encodeMessage')) {
    lines.push("import type { Uint8ArrayList } from 'uint8arraylist'")
  }

  if (moduleDef.importedTypes.size > 0) {
    lines.push(`import type { ${Array.from(moduleDef.importedTypes).join(', ')} } from 'protons-runtime'`)
  }

  lines = [
    ...lines,
    '',
    ...moduleDef.compiled
  ]

  const content = lines.join('\n').trim()
  const outputPath = pathWithExtension(source, '.ts', flags.output)

  await fs.writeFile(outputPath, content + '\n')
}
