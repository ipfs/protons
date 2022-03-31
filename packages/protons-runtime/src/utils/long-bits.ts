import type { Uint8ArrayList } from 'uint8arraylist'
import accessor from './accessor.js'

const TWO_32 = 4294967296

export class LongBits {
  public hi: number
  public lo: number

  constructor (hi: number = 0, lo: number = 0) {
    this.hi = hi
    this.lo = lo
  }

  toBigInt (unsigned: boolean): bigint {
    if (unsigned) {
      return BigInt(this.lo >>> 0) + (BigInt(this.hi >>> 0) << 32n)
    }

    if ((this.hi >>> 31) !== 0) {
      const lo = ~this.lo + 1 >>> 0
      let hi = ~this.hi >>> 0

      if (lo === 0) {
        hi = hi + 1 >>> 0
      }

      return -(BigInt(lo) + (BigInt(hi) << 32n))
    }

    return BigInt(this.lo >>> 0) + (BigInt(this.hi >>> 0) << 32n)
  }

  zzDecode () {
    const mask = -(this.lo & 1)
    const lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0
    const hi = (this.hi >>> 1 ^ mask) >>> 0

    return new LongBits(hi, lo)
  }

  zzEncode () {
    const mask = this.hi >> 31
    const hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0
    const lo = (this.lo << 1 ^ mask) >>> 0

    return new LongBits(hi, lo)
  }

  toBytes (buf: Uint8ArrayList | Uint8Array, offset = 0) {
    const access = accessor(buf)

    while (this.hi > 0) {
      access.set(offset++, this.lo & 127 | 128)
      this.lo = (this.lo >>> 7 | this.hi << 25) >>> 0
      this.hi >>>= 7
    }

    while (this.lo > 127) {
      access.set(offset++, this.lo & 127 | 128)
      this.lo = this.lo >>> 7
    }

    access.set(offset++, this.lo)
  }

  static fromBigInt (value: bigint) {
    if (value === 0n) {
      return new LongBits()
    }

    const negative = value < 0

    if (negative) {
      value = -value
    }

    let hi = Number(value >> 32n) | 0
    let lo = Number(value - (BigInt(hi) << 32n)) | 0

    if (negative) {
      hi = ~hi >>> 0
      lo = ~lo >>> 0

      if (++lo > TWO_32) {
        lo = 0

        if (++hi > TWO_32) {
          hi = 0
        }
      }
    }

    return new LongBits(hi, lo)
  }

  static fromNumber (value: number) {
    if (value === 0) {
      return new LongBits()
    }

    const sign = value < 0

    if (sign) {
      value = -value
    }

    let lo = value >>> 0
    let hi = (value - lo) / 4294967296 >>> 0

    if (sign) {
      hi = ~hi >>> 0
      lo = ~lo >>> 0

      if (++lo > 4294967295) {
        lo = 0

        if (++hi > 4294967295) {
          hi = 0
        }
      }
    }

    return new LongBits(hi, lo)
  }

  static fromBytes (buf: Uint8ArrayList | Uint8Array, offset: number) {
    const access = accessor(buf)

    // tends to deopt with local vars for octet etc.
    const bits = new LongBits()
    let i = 0

    if (buf.length - offset > 4) { // fast route (lo)
      for (; i < 4; ++i) {
        // 1st..4th
        bits.lo = (bits.lo | (access.get(offset) & 127) << i * 7) >>> 0
        if (access.get(offset++) < 128) { return bits }
      }
      // 5th
      bits.lo = (bits.lo | (access.get(offset) & 127) << 28) >>> 0
      bits.hi = (bits.hi | (access.get(offset) & 127) >> 4) >>> 0
      if (access.get(offset++) < 128) { return bits }
      i = 0
    } else {
      for (; i < 3; ++i) {
        /* istanbul ignore if */
        if (offset >= buf.length) {
          throw RangeError(`index out of range: ${offset} > ${buf.length}`)
        }

        // 1st..3th
        bits.lo = (bits.lo | (access.get(offset) & 127) << i * 7) >>> 0
        if (access.get(offset++) < 128) { return bits }
      }
      // 4th
      bits.lo = (bits.lo | (access.get(offset++) & 127) << i * 7) >>> 0
      return bits
    }
    if (buf.length - offset > 4) { // fast route (hi)
      for (; i < 5; ++i) {
        // 6th..10th
        bits.hi = (bits.hi | (access.get(offset) & 127) << i * 7 + 3) >>> 0
        if (access.get(offset++) < 128) { return bits }
      }
    } else {
      for (; i < 5; ++i) {
        /* istanbul ignore if */
        if (offset >= buf.length) {
          throw RangeError(`index out of range: ${offset} > ${buf.length}`)
        }

        // 6th..10th
        bits.hi = (bits.hi | (access.get(offset) & 127) << i * 7 + 3) >>> 0
        if (access.get(offset++) < 128) {
          return bits
        }
      }
    }

    /* istanbul ignore next */
    throw Error('invalid varint encoding')
  }
}
