import { main as pbjs } from 'protobufjs/cli/pbjs.js'
import path from 'path'
import { promisify } from 'util'
import fs from 'fs/promises'

function pathWithExtension (input: string, extension: string) {
  return path.join(path.dirname(input), path.basename(input).split('.').slice(0, -1).join('.') + extension)
}

const types: Record<string, string> = {
  double: 'number',
  float: 'number',
  int32: 'number',
  int64: 'bigint',
  uint32: 'number',
  uint64: 'bigint',
  sint32: 'number',
  sint64: 'bigint',
  fixed32: 'number',
  fixed64: 'bigint',
  sfixed32: 'number',
  sfixed64: 'bigint',
  bool: 'boolean',
  string: 'string',
  bytes: 'Uint8Array'
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
  double: 'double',
  bytes: 'bytes',
  fixed32: 'fixed32',
  fixed64: 'fixed64',
  float: 'float',
  int32: 'int32',
  int64: 'int64',
  sint32: 'sint32',
  sint64: 'sint64',
  string: 'string',
  uint32: 'uint32',
  uint64: 'uint64',
  sfixed32: 'sfixed32',
  sfixed64: 'sfixed64'
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
}

function defineFields (fields: Record<string, FieldDef>, messageDef: MessageDef, moduleDef: ModuleDef) {
  return Object.entries(fields).map(([fieldName, fieldDef]) => {
    const isArray = fieldDef.rule === 'repeated'
    const isOptional = !isArray && fieldDef.options?.proto3_optional === true

    return `${fieldName}${isOptional ? '?' : ''}: ${findTypeName(fieldDef.type, messageDef, moduleDef)}${isArray ? '[]' : ''}`
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
    return enumeration<typeof ${messageDef.name}>(__${messageDef.name}Values)
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
    interfaceCodecDef = `
  export const codec = (): Codec<${messageDef.name}> => {
    return message<${messageDef.name}>({
      ${Object.entries(fields)
      .map(([name, fieldDef]) => {
        let codec = encoders[fieldDef.type]

        if (codec == null) {
          const def = findDef(fieldDef.type, messageDef, moduleDef)

          if (isEnumDef(def)) {
            moduleDef.imports.add('enumeration')
          } else {
            moduleDef.imports.add('message')
          }

          const typeName = findTypeName(fieldDef.type, messageDef, moduleDef)
          codec = `${typeName}.codec()`
        } else {
          moduleDef.imports.add(codec)
        }

        return `${fieldDef.id}: { name: '${name}', codec: ${codec}${fieldDef.options?.proto3_optional === true ? ', optional: true' : ''}${fieldDef.rule === 'repeated' ? ', repeats: true' : ''} }`
    }).join(',\n      ')}
    })
  }

  export const encode = (obj: ${messageDef.name}): Uint8Array => {
    return encodeMessage(obj, ${messageDef.name}.codec())
  }

  export const decode = (buf: Uint8Array): ${messageDef.name} => {
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

export async function generate (source: string, flags: any) {
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

  if (moduleDef.importedTypes.size > 0) {
    lines.push(`import type { ${Array.from(moduleDef.importedTypes).join(', ')} } from 'protons-runtime'`)
  }

  lines = [
    ...lines,
    '',
    ...moduleDef.compiled
  ]

  const content = lines.join('\n').trim()

  await fs.writeFile(pathWithExtension(source, '.ts'), content + '\n')
}
