import type { Writer, Reader } from './index.ts'

// https://developers.google.com/protocol-buffers/docs/encoding#structure
export const CODEC_TYPES = {
  VARINT: 0,
  BIT64: 1,
  LENGTH_DELIMITED: 2,
  START_GROUP: 3,
  END_GROUP: 4,
  BIT32: 5
}

export interface EncodeOptions {
  lengthDelimited?: boolean
  writeDefaults?: boolean
}

export interface EncodeFunction<T> {
  (value: T, writer: Writer, opts?: EncodeOptions): void
}

/**
 * Protobuf types that contain multiple values
 */
export type CollectionTypes = any[] | Map<any, any>

/**
 * Protobuf types that are not collections or messages
 */
export type PrimitiveTypes = boolean | number | string | bigint | Uint8Array

/**
 * Recursive array/map field length limits
 */
export type CollectionLimits <T> = {
  [K in keyof T]: T[K] extends CollectionTypes ? number :
    T[K] extends PrimitiveTypes ? never : Limits<T[K]>
}

/**
 * Recursive array member array/map field length limits
 */
export type ArrayElementLimits <T> = {
  [K in keyof T as `${string & K}$`]: T[K] extends Array<infer ElementType> ?
      (ElementType extends PrimitiveTypes ? never : Limits<ElementType>) :
      (T[K] extends PrimitiveTypes ? never : Limits<T[K]>)
}

/**
 * Recursive map value array/map field length limits
 */
export type MapValueLimits <T> = {
  [K in keyof T as `${string & K}$value`]: T[K] extends Map<any, infer MapValueType> ?
      (MapValueType extends PrimitiveTypes ? never : Limits<MapValueType>) :
      (T[K] extends PrimitiveTypes ? never : Limits<T[K]>)
}

/**
 * Union of collection and array elements
 */
export type Limits<T> = Partial<CollectionLimits<T> & ArrayElementLimits<T> & MapValueLimits<T>>

export interface DecodeOptions<T> {
  /**
   * Runtime-specified limits for lengths of repeated/map fields
   */
  limits?: Limits<T>
}

export interface DecodeFunction<T> {
  (reader: Reader, length?: number, opts?: DecodeOptions<T>): T
}

export interface StreamFunction<T> {
  (reader: Reader, length: number | undefined, prefix: string, opts?: DecodeOptions<T>): Generator<any>
}

export interface Codec<D, E> {
  name: string
  type: number
  encode: EncodeFunction<E>
  decode: DecodeFunction<D>
  stream: StreamFunction<D>
}

export function createCodec <D, E> (name: string, type: number, encode: EncodeFunction<E>, decode: DecodeFunction<D>, stream: StreamFunction<D>): Codec<D, E> {
  return {
    name,
    type,
    encode,
    decode,
    stream
  }
}
