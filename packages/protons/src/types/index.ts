import type { Field } from '../fields/field.ts'
import type { Flags } from '../index.ts'
import type { Module } from './module.ts'

export interface Type {
  jsType: string
  pbType: string
  init(module: Module): void
  getDecoder(field: Field, indent?: string): string
  getEncoder(field: Field, accessor: string): string
  getValueTest(field: Field, accessor: string): string
}

export interface Parent {
  flags: Flags
  findType (type: string, jsOverride?: 'string' | 'number'): Type
  addImport (module: string, symbol: string, alias?: string): void
  addTypeImport (module: string, symbol: string, alias?: string): void
  addEslintIgnore (rule: string): void
}
