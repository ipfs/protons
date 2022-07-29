import type { Uint8ArrayList } from 'uint8arraylist'

// https://developers.google.com/protocol-buffers/docs/encoding#structure
export enum CODEC_TYPES {
  VARINT = 0,
  BIT64,
  LENGTH_DELIMITED,
  START_GROUP,
  END_GROUP,
  BIT32
}

export interface EncodeFunction<T> {
  (value: T): Uint8Array | Uint8ArrayList
}

export interface DecodeFunction<T> {
  (buf: Uint8ArrayList, offset: number): T
}

export interface EncodingLengthFunction<T> {
  (value: T): number
}

export interface DefaultValueFunction<T> {
  (): T
}

export interface IsDefaultValueFunction<T> {
  (value: T): boolean
}

export interface Codec<T> {
  name: string
  type: CODEC_TYPES
  encode: EncodeFunction<T>
  decode: DecodeFunction<T>
  encodingLength: EncodingLengthFunction<T>
  defaultValue: DefaultValueFunction<T>
  isDefaultValue: IsDefaultValueFunction<T>
}

export function createCodec<T> (name: string, type: CODEC_TYPES, encode: EncodeFunction<T>, decode: DecodeFunction<T>, encodingLength: EncodingLengthFunction<T>, defaultValue: DefaultValueFunction<T>, isDefaultValue: IsDefaultValueFunction<T>): Codec<T> {
  return {
    name,
    type,
    encode,
    decode,
    encodingLength,
    defaultValue,
    isDefaultValue
  }
}
