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

function pathWithExtension (input: string, extension: string, outputDir?: string) {
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

const encoderGenerators: Record<string, (val: string) => string> = {
  bool: (val) => `writer.bool(${val})`,
  bytes: (val) => `writer.bytes(${val})`,
  double: (val) => `writer.double(${val})`,
  // enumeration: (val) => `writer.double(${val})`,
  fixed32: (val) => `writer.fixed32(${val})`,
  fixed64: (val) => `writer.fixed64(${val})`,
  float: (val) => `writer.float(${val})`,
  int32: (val) => `writer.int32(${val})`,
  int64: (val) => `writer.int64(${val})`,
  sfixed32: (val) => `writer.sfixed32(${val})`,
  sfixed64: (val) => `writer.sfixed64(${val})`,
  sint32: (val) => `writer.sint32(${val})`,
  sint64: (val) => `writer.sint64(${val})`,
  string: (val) => `writer.string(${val})`,
  uint32: (val) => `writer.uint32(${val})`,
  uint64: (val) => `writer.uint64(${val})`
}

const decoderGenerators: Record<string, () => string> = {
  bool: () => 'reader.bool()',
  bytes: () => 'reader.bytes()',
  double: () => 'reader.double()',
  // enumeration: () => `writer.double(${val})`,
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
}

function defineFields (fields: Record<string, FieldDef>, messageDef: MessageDef, moduleDef: ModuleDef) {
  return Object.entries(fields).map(([fieldName, fieldDef]) => {
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
  export const codec = () => {
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

  if (interfaceFields !== '') {
    interfaceDef = `
export interface ${messageDef.name} {
  ${
    defineFields(fields, messageDef, moduleDef)
      .join('\n  ')
      .trim()
  }
}`

    const ensureArrayProps = Object.entries(fields)
      .map(([name, fieldDef]) => {
        // make sure repeated fields have an array if not set
        if (fieldDef.rule === 'repeated') {
          return `        obj.${name} = obj.${name} ?? []`
        }

        return ''
      }).filter(Boolean).join('\n')

    const ensureRequiredFields = Object.entries(fields)
      .map(([name, fieldDef]) => {
        // make sure required fields are set
        if (!fieldDef.optional) {
          return `
        if (obj.${name} == null) {
          throw new Error('Protocol error: value for required field "${name}" was not found in protobuf')
        }`
        }

        return ''
      }).filter(Boolean).join('\n')

    interfaceCodecDef = `
  let _codec: Codec<${messageDef.name}>

  export const codec = (): Codec<${messageDef.name}> => {
    if (_codec == null) {
      _codec = message<${messageDef.name}>((obj, writer, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          writer.fork()
        }
${Object.entries(fields)
      .map(([name, fieldDef]) => {
        let codec: string = encoders[fieldDef.type]
        let type: string = fieldDef.type

        if (codec == null) {
          const def = findDef(fieldDef.type, messageDef, moduleDef)

          if (isEnumDef(def)) {
            moduleDef.imports.add('enumeration')
            type = 'enum'
          } else {
            moduleDef.imports.add('message')
            type = 'message'
          }

          const typeName = findTypeName(fieldDef.type, messageDef, moduleDef)
          codec = `${typeName}.codec()`
        }

        return `
        if (obj.${name} != null) {${
            fieldDef.rule === 'repeated'
? `
          for (const value of obj.${name}) {
            writer.uint32(${(fieldDef.id << 3) | codecTypes[type]})
            ${encoderGenerators[type] == null ? `${codec}.encode(value, writer)` : encoderGenerators[type]('value')}
          }`
: `
          writer.uint32(${(fieldDef.id << 3) | codecTypes[type]})
          ${encoderGenerators[type] == null ? `${codec}.encode(obj.${name}, writer)` : encoderGenerators[type](`obj.${name}`)}`
        }
        }${fieldDef.optional
? ''
: ` else {
          throw new Error('Protocol error: required field "${name}" was not found in object')
        }`}`
}).join('\n')}

        if (opts.lengthDelimited !== false) {
          writer.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {}

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            ${Object.entries(fields)
              .map(([name, fieldDef]) => {
                let codec: string = encoders[fieldDef.type]
                let type: string = fieldDef.type

                if (codec == null) {
                  const def = findDef(fieldDef.type, messageDef, moduleDef)

                  if (isEnumDef(def)) {
                    moduleDef.imports.add('enumeration')
                    type = 'enum'
                  } else {
                    moduleDef.imports.add('message')
                    type = 'message'
                  }

                  const typeName = findTypeName(fieldDef.type, messageDef, moduleDef)
                  codec = `${typeName}.codec()`
                }

                return `case ${fieldDef.id}:${fieldDef.rule === 'repeated'
? `
              obj.${name} = obj.${name} ?? []
              obj.${name}.push(${decoderGenerators[type] == null ? `${codec}.decode(reader${type === 'message' ? ', reader.uint32()' : ''})` : decoderGenerators[type]()})`
: `
              obj.${name} = ${decoderGenerators[type] == null ? `${codec}.decode(reader${type === 'message' ? ', reader.uint32()' : ''})` : decoderGenerators[type]()}`}
              break`
              }).join('\n            ')}
            default:
              reader.skipType(tag & 7)
              break
          }
        }${ensureArrayProps !== '' ? `\n\n${ensureArrayProps}` : ''}${ensureRequiredFields !== '' ? `\n${ensureRequiredFields}` : ''}

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: ${messageDef.name}): Uint8Array => {
    return encodeMessage(obj, ${messageDef.name}.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ${messageDef.name} => {
    return decodeMessage(buf, ${messageDef.name}.codec())
  }`
  }

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

  function defineMessage (defs: Record<string, ClassDef>, parent?: ClassDef) {
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
          classDef.fields[name].repeated = classDef.fields[name].rule === 'repeated'
          classDef.fields[name].optional = !classDef.fields[name].repeated && classDef.fields[name].options?.proto3_optional === true
        }
      }

      if (parent == null) {
        moduleDef.globals[className] = classDef
      }
    }
  }

  defineMessage(defs)

  for (const className of Object.keys(defs)) {
    const classDef = defs[className]

    moduleDef.compiled.push(compileMessage(classDef, moduleDef))
  }

  return moduleDef
}

interface Flags {
  output?: string
}

export async function generate (source: string, flags: Flags) {
  // convert .protobuf to .json
  const json = await promisify(pbjs)(['-t', 'json', source])

  if (json == null) {
    throw new Error(`Could not convert ${source} to intermediate JSON format`)
  }

  const def = JSON.parse(json)
  const moduleDef = defineModule(def)

  let lines = [
    '/* eslint-disable import/export */',
    '/* eslint-disable @typescript-eslint/no-namespace */',
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

  await fs.writeFile(pathWithExtension(source, '.ts', flags.output), content + '\n')
}
