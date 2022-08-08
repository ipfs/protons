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

export interface EncodeOptions {
  lengthDelimited?: boolean
}

export interface EncodeResult {
  bufs: Uint8Array[]
  length: number
}

export interface EncodeFunction<T> {
  (value: T, opts?: EncodeOptions): EncodeResult
}

export interface DecodeResult<T> {
  value: T
  length: number
}

export interface DecodeFunction<T> {
  (buf: Uint8ArrayList, offset: number): DecodeResult<T>
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
