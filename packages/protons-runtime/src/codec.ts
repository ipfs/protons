import type { Writer, Reader } from './index.js'

// https://developers.google.com/protocol-buffers/docs/encoding#structure
export enum CODEC_TYPES {
  VARINT = 0,
  BIT64,
  LENGTH_DELIMITED,
  START_GROUP,
  END_GROUP,
  BIT32
}

export interface EncodeOptions {
  lengthDelimited?: boolean
  writeDefaults?: boolean
}

export interface EncodeFunction<T> {
  (value: T, writer: Writer, opts?: EncodeOptions): void
}

export interface DecodeFunction<T> {
  (reader: Reader, length?: number): T
}

export interface Codec<T> {
  name: string
  type: CODEC_TYPES
  encode: EncodeFunction<T>
  decode: DecodeFunction<T>
}

export function createCodec <T> (name: string, type: CODEC_TYPES, encode: EncodeFunction<T>, decode: DecodeFunction<T>): Codec<T> {
  return {
    name,
    type,
    encode,
    decode
  }
}
