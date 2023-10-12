/**
 * Constructs new long bits.
 *
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @function Object() { [native code] }
 * @param {number} lo - Low 32 bits, unsigned
 * @param {number} hi - High 32 bits, unsigned
 */
export class LongBits {
  public lo: number
  public hi: number

  constructor (lo: number, hi: number) {
    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits
     */
    this.lo = lo | 0

    /**
     * High bits
     */
    this.hi = hi | 0
  }

  /**
   * Converts this long bits to a possibly unsafe JavaScript number
   */
  toBigInt (unsigned: boolean = false): bigint {
    if (unsigned) {
      const result = BigInt(this.lo >>> 0) + (BigInt(this.hi >>> 0) << 32n)
      return result
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

  /**
   * Zig-zag encodes this long bits
   */
  zzEncode (): this {
    const mask = this.hi >> 31
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0
    this.lo = (this.lo << 1 ^ mask) >>> 0
    return this
  }

  /**
   * Zig-zag decodes this long bits
   */
  zzDecode (): this {
    const mask = -(this.lo & 1)
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0
    this.hi = (this.hi >>> 1 ^ mask) >>> 0
    return this
  }

  /**
   * Calculates the length of this longbits when encoded as a varint.
   */
  length (): number {
    const part0 = this.lo
    const part1 = (this.lo >>> 28 | this.hi << 4) >>> 0
    const part2 = this.hi >>> 24
    return part2 === 0
      ? part1 === 0
        ? part0 < 16384
          ? part0 < 128 ? 1 : 2
          : part0 < 2097152 ? 3 : 4
        : part1 < 16384
          ? part1 < 128 ? 5 : 6
          : part1 < 2097152 ? 7 : 8
      : part2 < 128 ? 9 : 10
  }

  /**
   * Constructs new long bits from the specified number
   */
  static fromBigInt (value: bigint): LongBits {
    if (value === 0n) { return zero }

    const negative = value < 0
    if (negative) {
      value = -value
    }
    let hi = Number(value >> 32n)
    let lo = Number(value - (BigInt(hi) << 32n))

    if (negative) {
      hi = ~hi >>> 0
      lo = ~lo >>> 0
      if (++lo > TWO_32) {
        lo = 0
        if (++hi > TWO_32) { hi = 0 }
      }
    }

    return new LongBits(lo, hi)
  }

  /**
   * Constructs new long bits from the specified number
   */
  static fromNumber (value: number): LongBits {
    if (value === 0) { return zero }
    const sign = value < 0
    if (sign) { value = -value }
    let lo = value >>> 0
    let hi = (value - lo) / 4294967296 >>> 0
    if (sign) {
      hi = ~hi >>> 0
      lo = ~lo >>> 0
      if (++lo > 4294967295) {
        lo = 0
        if (++hi > 4294967295) { hi = 0 }
      }
    }
    return new LongBits(lo, hi)
  }

  /**
   * Constructs new long bits from a number, long or string
   */
  static from (value: bigint | number | string | { low: number, high: number }): LongBits {
    if (typeof value === 'number') {
      return LongBits.fromNumber(value)
    }
    if (typeof value === 'bigint') {
      return LongBits.fromBigInt(value)
    }
    if (typeof value === 'string') {
      return LongBits.fromBigInt(BigInt(value))
    }
    return value.low != null || value.high != null ? new LongBits(value.low >>> 0, value.high >>> 0) : zero
  }
}

const zero = new LongBits(0, 0)
zero.toBigInt = function () { return 0n }
zero.zzEncode = zero.zzDecode = function () { return this }
zero.length = function () { return 1 }

const TWO_32 = 4294967296n
