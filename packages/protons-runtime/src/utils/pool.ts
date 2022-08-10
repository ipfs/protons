import { allocUnsafe } from 'uint8arrays/alloc'

/**
 * An allocator as used by {@link util.pool}.
 *
 * @typedef PoolAllocator
 * @type {Function}
 * @param {number} size - Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 *
 * @typedef PoolSlicer
 * @type {Function}
 * @param {number} start - Start offset
 * @param {number} end - End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 *
 * @memberof util
 * @function
 * @param {number} [size=8192] - Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
export default function pool (size?: number) {
  const SIZE = size ?? 8192
  const MAX = SIZE >>> 1
  let slab: Uint8Array
  let offset = SIZE
  return function poolAlloc (size: number) {
    if (size < 1 || size > MAX) {
      return allocUnsafe(size)
    }

    if (offset + size > SIZE) {
      slab = allocUnsafe(SIZE)
      offset = 0
    }

    const buf = slab.subarray(offset, offset += size)

    if ((offset & 7) !== 0) {
      // align to 32 bit
      offset = (offset | 7) + 1
    }

    return buf
  }
}
