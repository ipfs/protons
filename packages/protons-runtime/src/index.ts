import type { Codec } from './codec.js'

export interface FieldDef {
  name: string
  codec: Codec<any>
  optional?: true
  repeats?: true
  packed?: true
}

export {
  decodeMessage
} from './decode.js'

export {
  encodeMessage
} from './encode.js'

export { enumeration } from './codecs/enum.js'
export { message } from './codecs/message.js'
export type { Codec, EncodeOptions } from './codec.js'

export interface Writer {
  /**
   * Current length
   */
  len: number

  /**
   * Writes an unsigned 32 bit value as a varint
   */
  uint32: (value: number) => Writer

  /**
   * Writes a signed 32 bit value as a varint`
   */
  int32: (value: number) => Writer

  /**
   * Writes a 32 bit value as a varint, zig-zag encoded
   */
  sint32: (value: number) => Writer

  /**
   * Writes an unsigned 64 bit value as a varint
   */
  uint64: (value: bigint) => Writer

  /**
   * Writes a signed 64 bit value as a varint
   */
  int64: (value: bigint) => Writer

  /**
   * Writes a signed 64 bit value as a varint, zig-zag encoded
   */
  sint64: (value: bigint) => Writer

  /**
   * Writes a boolish value as a varint
   */
  bool: (value: boolean) => Writer

  /**
   * Writes an unsigned 32 bit value as fixed 32 bits
   */
  fixed32: (value: number) => Writer

  /**
   * Writes a signed 32 bit value as fixed 32 bits
   */
  sfixed32: (value: number) => Writer

  /**
   * Writes an unsigned 64 bit value as fixed 64 bits
   */
  fixed64: (value: bigint) => Writer

  /**
   * Writes a signed 64 bit value as fixed 64 bits
   */
  sfixed64: (value: bigint) => Writer

  /**
   * Writes a float (32 bit)
   */
  float: (value: number) => Writer

  /**
   * Writes a double (64 bit float)
   */
  double: (value: number) => Writer

  /**
   * Writes a sequence of bytes
   */
  bytes: (value: Uint8Array) => Writer

  /**
   * Writes a string
   */
  string: (value: string) => Writer

  /**
   * Forks this writer's state by pushing it to a stack.
   * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
   */
  fork: () => Writer

  /**
   * Resets this instance to the last state.
   */
  reset: () => Writer

  /**
   * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
   */
  ldelim: () => Writer

  /**
   * Finishes the write operation
   */
  finish: () => Uint8Array
}

export interface Reader {
  /**
   * Read buffer
   */
  buf: Uint8Array

  /**
   * Read buffer position
   */
  pos: number

  /**
   * Read buffer length
   */
  len: number

  /**
   * Reads a varint as an unsigned 32 bit value
   */
  uint32: () => number

  /**
   * Reads a varint as a signed 32 bit value
   */
  int32: () => number

  /**
   * Reads a zig-zag encoded varint as a signed 32 bit value
   */
  sint32: () => number

  /**
   * Reads a varint as a boolean
   */
  bool: () => boolean

  /**
   * Reads fixed 32 bits as an unsigned 32 bit integer
   */
  fixed32: () => number

  /**
   * Reads fixed 32 bits as a signed 32 bit integer
   */
  sfixed32: () => number

  /**
   * Reads a float (32 bit) as a number
   */
  float: () => number

  /**
   * Reads a double (64 bit float) as a number
   */
  double: () => number

  /**
   * Reads a sequence of bytes preceded by its length as a varint
   */
  bytes: () => Uint8Array

  /**
   * Reads a string preceded by its byte length as a varint
   */
  string: () => string

  /**
   * Skips the specified number of bytes if specified, otherwise skips a varints`
   */
  skip: (length?: number) => void

  /**
   * Skips the next element of the specified wire type
   */
  skipType: (wireType: number) => void

  /**
   * Reads a varint as a signed 64 bit value
   */
  int64: () => bigint

  /**
   * Reads a varint as an unsigned 64 bit value
   */
  uint64: () => bigint

  /**
   * Reads a zig-zag encoded varint as a signed 64 bit value
   */
  sint64: () => bigint

  /**
   * Reads fixed 64 bits
   */
  fixed64: () => bigint

  /**
   * Reads zig-zag encoded fixed 64 bits
   */
  sfixed64: () => bigint
}
