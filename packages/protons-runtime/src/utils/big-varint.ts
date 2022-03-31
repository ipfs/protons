import type { Uint8ArrayList } from 'uint8arraylist'
import accessor from './accessor.js'
import { LongBits } from './long-bits.js'

const LIMIT = 0x7fn

// https://github.com/joeltg/big-varint/blob/main/src/unsigned.ts
export const unsigned = {
  encodingLength (value: bigint): number {
    let i = 0
    for (; value >= 0x80n; i++) {
      value >>= 7n
    }
    return i + 1
  },

  encode (value: bigint, buf: Uint8ArrayList | Uint8Array) {
    const access = accessor(buf)

    let offset = 0
    while (LIMIT < value) {
      access.set(offset++, Number(value & LIMIT) | 0x80)
      value >>= 7n
    }

    access.set(offset, Number(value))
  },

  decode (buf: Uint8ArrayList | Uint8Array, offset = 0) {
    return LongBits.fromBytes(buf, offset).toBigInt(true)
  }
}

export const signed = {
  encodingLength (value: bigint): number {
    if (value < 0n) {
      return 10 // 10 bytes per spec
    }

    return unsigned.encodingLength(value)
  },

  encode (value: bigint, buf: Uint8ArrayList | Uint8Array, offset = 0) {
    if (value < 0n) {
      LongBits.fromBigInt(value).toBytes(buf, offset)

      return
    }

    return unsigned.encode(value, buf)
  },

  decode (buf: Uint8ArrayList | Uint8Array, offset = 0) {
    return LongBits.fromBytes(buf, offset).toBigInt(false)
  }
}

export const zigzag = {
  encodingLength (value: bigint): number {
    return unsigned.encodingLength(value >= 0 ? value * 2n : value * -2n - 1n)
  },

  encode (value: bigint, buf: Uint8ArrayList | Uint8Array, offset = 0) {
    LongBits.fromBigInt(value).zzEncode().toBytes(buf, offset)
  },

  decode (buf: Uint8ArrayList | Uint8Array, offset = 0) {
    return LongBits.fromBytes(buf, offset).zzDecode().toBigInt(false)
  }
}
