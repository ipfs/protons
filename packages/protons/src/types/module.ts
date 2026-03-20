import { NoMessagesFoundError } from 'protons-runtime'
import { Enum, isEnumDef } from './enum.ts'
import { Message } from './message.ts'
import { Primitive } from './primitive.ts'
import type { EnumDef } from './enum.ts'
import type { MessageDef } from './message.ts'
import type { Flags } from '../index.ts'
import type { Type } from './index.ts'

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

interface Import {
  symbol: string
  alias?: string
  type: boolean
}

export interface ModuleDef {
  nested?: Record<string, MessageDef | EnumDef>
}

export class Module {
  private imports: Map<string, Import[]>
  private types: Record<string, Type>
  private eslintIgnores: string[]
  public flags: Flags
  public globals: Array<Message | Enum>

  constructor (def: ModuleDef, flags: Flags) {
    this.imports = new Map()
    this.flags = flags
    this.types = {}
    this.globals = []
    this.eslintIgnores = []

    Object.entries(types).forEach(([pbType, jsType]) => {
      this.types[pbType] = new Primitive(pbType, jsType)
    })

    const defs = def.nested

    if (defs == null) {
      throw new NoMessagesFoundError('No top-level messages found in protobuf')
    }

    for (const [name, def] of Object.entries(defs)) {
      let type: Message | Enum

      if (isEnumDef(def)) {
        type = new Enum(name, name, def)
      } else {
        type = new Message(name, name, def, this)
      }

      this.globals.push(type)
      this.types[name] = type
    }

    this.globals.forEach(type => type.init())
  }

  addImport (module: string, symbol: string, alias?: string): void {
    const defs = this._findDefs(module)

    for (const def of defs) {
      // check if we already have a definition for this symbol
      if (def.symbol === symbol) {
        if (alias !== def.alias) {
          throw new Error(`Type symbol ${symbol} imported from ${module} with alias ${def.alias} does not match alias ${alias}`)
        }

        // if it was a type before it's not now
        def.type = false
        return
      }
    }

    defs.push({
      symbol,
      alias,
      type: false
    })
  }

  addTypeImport (module: string, symbol: string, alias?: string): void {
    const defs = this._findDefs(module)

    for (const def of defs) {
      // check if we already have a definition for this symbol
      if (def.symbol === symbol) {
        if (alias !== def.alias) {
          throw new Error(`Type symbol ${symbol} imported from ${module} with alias ${def.alias} does not match alias ${alias}`)
        }

        return
      }
    }

    defs.push({
      symbol,
      alias,
      type: true
    })
  }

  addEslintIgnore (rule: string): void {
    if (this.eslintIgnores.includes(rule)) {
      return
    }

    this.eslintIgnores.push(rule)
  }

  _findDefs (module: string): Import[] {
    let defs = this.imports.get(module)

    if (defs == null) {
      defs = []
      this.imports.set(module, defs)
    }

    return defs
  }

  compile (): string {
    const compiled = this.globals.map(def => def.compile(this)).flat()

    // TODO: make these conditional
    // const ignores: string[] = [
    //   '/* eslint-disable import/export */',
    //   '/* eslint-disable complexity */',
    //   '/* eslint-disable @typescript-eslint/no-namespace */',
    //   '/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */',
    //   '/* eslint-disable @typescript-eslint/no-empty-interface */',
    //   '/* eslint-disable import/consistent-type-specifier-style */',
    //   '/* eslint-disable @typescript-eslint/no-unused-vars */',
    //   '/* eslint-disable require-yield */'
    // ]

    const imports = []
    const importedModules = Array.from([...this.imports.entries()])
      .sort((a, b) => {
        return a[0].localeCompare(b[0])
      })
      .sort((a, b) => {
        const aAllTypes = a[1].reduce((acc, curr) => {
          return acc && curr.type
        }, true)

        const bAllTypes = b[1].reduce((acc, curr) => {
          return acc && curr.type
        }, true)

        if (aAllTypes && !bAllTypes) {
          return 1
        }

        if (!aAllTypes && bAllTypes) {
          return -1
        }

        return 0
      })

    // add imports
    for (const imp of importedModules) {
      const symbols = imp[1]
        .filter(imp => !imp.type)
        .sort((a, b) => {
          return a.symbol.localeCompare(b.symbol)
        }).map(imp => {
          return `${imp.symbol}${imp.alias != null ? ` as ${imp.alias}` : ''}`
        }).join(', ')

      if (symbols.length > 0) {
        imports.push(`import { ${symbols} } from '${imp[0]}'`)
      }
    }

    // add type imports
    for (const imp of importedModules) {
      const symbols = imp[1]
        .filter(imp => imp.type)
        .sort((a, b) => {
          return a.symbol.localeCompare(b.symbol)
        }).map(imp => {
          return `${imp.symbol}${imp.alias != null ? ` as ${imp.alias}` : ''}`
        }).join(', ')

      if (symbols.length > 0) {
        imports.push(`import type { ${symbols} } from '${imp[0]}'`)
      }
    }

    return [
      ...this.eslintIgnores.map(rule => `/* eslint-disable ${rule} */`),
      '',
      ...imports,
      '',
      ...compiled
    ]
      .join('\n')
      .split('\n')
      .map((line) => line.trim() === '' ? '' : line)
      .join('\n')
      .trim()
  }

  findType (jsType: string, override?: 'string' | 'number'): Type {
    const type = this.types[override ?? jsType]

    if (type == null) {
      throw new Error(`Type for "${jsType}"${override == null ? '' : ` (overridden to "${override}")`} not found in ${[...Object.keys(this.types)].join(', ')}`)
    }

    return type
  }
}
