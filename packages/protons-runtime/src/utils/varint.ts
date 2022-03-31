import type { Uint8ArrayList } from 'uint8arraylist'
import accessor from './accessor.js'
import { LongBits } from './long-bits.js'

const MSB = 0x80
const REST = 0x7F
const MSBALL = ~REST
const INT = Math.pow(2, 31)
const N1 = Math.pow(2, 7)
const N2 = Math.pow(2, 14)
const N3 = Math.pow(2, 21)
const N4 = Math.pow(2, 28)
const N5 = Math.pow(2, 35)
const N6 = Math.pow(2, 42)
const N7 = Math.pow(2, 49)
const N8 = Math.pow(2, 56)
const N9 = Math.pow(2, 63)

export const unsigned = {
  encodingLength  (value: number): number {
    if (value < N1) {
      return 1
    }

    if (value < N2) {
      return 2
    }

    if (value < N3) {
      return 3
    }

    if (value < N4) {
      return 4
    }

    if (value < N5) {
      return 5
    }

    if (value < N6) {
      return 6
    }

    if (value < N7) {
      return 7
    }

    if (value < N8) {
      return 8
    }

    if (value < N9) {
      return 9
    }

    return 10
  },

  encode (value: number, buf: Uint8ArrayList | Uint8Array) {
    let offset = 0
    const access = accessor(buf)

    while (value >= INT) {
      access.set(offset++, (value & 0xFF) | MSB)
      value /= 128
    }

    while ((value & MSBALL) > 0) {
      access.set(offset++, (value & 0xFF) | MSB)
      value >>>= 7
    }

    access.set(offset, value | 0)
  },

  decode (buf: Uint8ArrayList | Uint8Array, offset: number = 0) {
    const access = accessor(buf)
    let value = 4294967295 // optimizer type-hint, tends to deopt otherwise (?!)

    value = (access.get(offset) & 127) >>> 0

    if (access.get(offset++) < 128) {
      return value
    }

    value = (value | (access.get(offset) & 127) << 7) >>> 0

    if (access.get(offset++) < 128) {
      return value
    }

    value = (value | (access.get(offset) & 127) << 14) >>> 0

    if (access.get(offset++) < 128) {
      return value
    }

    value = (value | (access.get(offset) & 127) << 21) >>> 0

    if (access.get(offset++) < 128) {
      return value
    }

    value = (value | (access.get(offset) & 15) << 28) >>> 0

    if (access.get(offset++) < 128) {
      return value
    }

    if ((offset += 5) > buf.length) {
      throw RangeError(`index out of range: ${offset} > ${buf.length}`)
    }

    return value
  }
}

export const signed = {
  encodingLength (value: number): number {
    if (value < 0) {
      return 10 // 10 bytes per spec
    }

    return unsigned.encodingLength(value)
  },

  encode (value: number, buf: Uint8ArrayList | Uint8Array) {
    if (value < 0) {
      let offset = 0
      const access = accessor(buf)
      const bits = LongBits.fromNumber(value)

      while (bits.hi > 0) {
        access.set(offset++, bits.lo & 127 | 128)
        bits.lo = (bits.lo >>> 7 | bits.hi << 25) >>> 0
        bits.hi >>>= 7
      }

      while (bits.lo > 127) {
        access.set(offset++, bits.lo & 127 | 128)
        bits.lo = bits.lo >>> 7
      }

      access.set(offset++, bits.lo)

      return
    }

    unsigned.encode(value, buf)
  },

  decode (data: Uint8ArrayList | Uint8Array, offset = 0) {
    return unsigned.decode(data, offset) | 0
  }
}

export const zigzag = {
  encodingLength (value: number): number {
    value = (value << 1 ^ value >> 31) >>> 0
    return unsigned.encodingLength(value)
  },

  encode (value: number, buf: Uint8ArrayList | Uint8Array, offset = 0) {
    value = (value << 1 ^ value >> 31) >>> 0
    return unsigned.encode(value, buf)
  },

  decode (data: Uint8ArrayList | Uint8Array, offset = 0) {
    const value = unsigned.decode(data, offset)
    return value >>> 1 ^ -(value & 1) | 0
  }
}
