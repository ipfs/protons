import type { Codec } from './codec.js'

export interface FieldDef {
  name: string
  codec: Codec<any>
  optional?: true
  repeats?: true
  packed?: true
}

export type FieldDefs = Record<number, FieldDef>

export {
  decodeMessage
} from './decode.js'

export {
  encodeMessage
} from './encode.js'

export { bool } from './codecs/bool.js'
export { bytes } from './codecs/bytes.js'
export { double } from './codecs/double.js'
export { enumeration } from './codecs/enum.js'
export { fixed32 } from './codecs/fixed32.js'
export { fixed64 } from './codecs/fixed64.js'
export { float } from './codecs/float.js'
export { int32 } from './codecs/int32.js'
export { int64 } from './codecs/int64.js'
export { message } from './codecs/message.js'
export { sfixed32 } from './codecs/sfixed32.js'
export { sfixed64 } from './codecs/sfixed64.js'
export { sint32 } from './codecs/sint32.js'
export { sint64 } from './codecs/sint64.js'
export { string } from './codecs/string.js'
export { uint32 } from './codecs/uint32.js'
export { uint64 } from './codecs/uint64.js'
export type { Codec } from './codec.js'
