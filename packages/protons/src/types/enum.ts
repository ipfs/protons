import { ParseError } from 'protons-runtime'
import type { Parent, Type } from './index.ts'
import type { Field } from '../fields/field.ts'

export interface EnumDef {
  values: Record<string, number>
}

export function isEnumDef (obj?: any): obj is EnumDef {
  return obj?.values != null
}

export class Enum implements Type {
  public pbType: string
  public jsType: string
  public values: Map<string, number>
  public lowestValue: number
  public lowestValueName: string

  constructor (pbType: string, jsType: string, def: EnumDef) {
    this.pbType = pbType
    this.jsType = jsType
    this.values = new Map(Object.entries(def.values))

    // select lowest-value enum - should be 0 but it's not guaranteed
    const lowestValue = [...this.values.entries()]
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

    if (lowestValue == null) {
      throw new Error(`Could not find lowest enum value for ${pbType}`)
    }

    this.lowestValue = lowestValue[1]
    this.lowestValueName = lowestValue[0]
  }

  init (): void {

  }

  getDecoder (field: Field): string {
    return `${this.jsType}.codec().decode(reader)`
  }

  getStreamingDecoder (field: Field): string {
    return `${this.jsType}.codec().stream(reader)`
  }

  getEncoder (field: Field, accessor: string): string {
    return `${this.jsType}.codec().encode(${accessor}, w)`
  }

  getValueTest (field: Field, accessor: string): string {
    if (field.proto2Required) {
      return 'true'
    }

    const valueTest = `${accessor} != null`

    // singular enums default to 0, but enums can be defined without a 0
    // value which is against the proto3 spec but is tolerated
    if (field.optional || field.proto2Required) {
      return valueTest
    }

    return `${valueTest} && __${field.type}Values[${accessor}] !== 0`
  }

  public compile (parent: Parent): string {
    // import required modules
    parent.addImport('protons-runtime', 'enumeration')

    // check that the enum def values start from 0
    if ([...this.values.values()][0] !== 0) {
      const message = `enum ${this.pbType} does not contain a value that maps to zero as the first element, this is required in proto3 - see https://protobuf.dev/programming-guides/proto3/#enum`

      if (parent.flags.strict === true) {
        throw new ParseError(message)
      } else {
        // eslint-disable-next-line no-console
        console.info(`[WARN] ${message}`)
      }
    }

    return `
export enum ${this.pbType} {
  ${[...this.values.keys()].map(key => `${key} = '${key}'`).join(',\n  ')}
}

enum __${this.pbType}Values {
  ${[...this.values.entries()].map(([key, value]) => `${key} = ${value}`).join(',\n  ')}
}

export namespace ${this.pbType} {
  export const codec = (): Codec<${this.pbType}> => {
    return enumeration<${this.pbType}>(__${this.pbType}Values)
  }
}
`.trimStart()
  }
}
