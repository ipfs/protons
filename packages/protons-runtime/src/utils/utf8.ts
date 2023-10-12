/**
 * Calculates the UTF8 byte length of a string
 */
export function length (string: string): number {
  let len = 0
  let c = 0
  for (let i = 0; i < string.length; ++i) {
    c = string.charCodeAt(i)

    if (c < 128) {
      len += 1
    } else if (c < 2048) {
      len += 2
    } else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
      ++i
      len += 4
    } else {
      len += 3
    }
  }

  return len
}

/**
 * Reads UTF8 bytes as a string
 */
export function read (buffer: Uint8Array, start: number, end: number): string {
  const len = end - start

  if (len < 1) {
    return ''
  }

  let parts: string[] | undefined
  const chunk: number[] = []
  let i = 0 // char offset
  let t: number // temporary

  while (start < end) {
    t = buffer[start++]

    if (t < 128) {
      chunk[i++] = t
    } else if (t > 191 && t < 224) {
      chunk[i++] = (t & 31) << 6 | buffer[start++] & 63
    } else if (t > 239 && t < 365) {
      t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000
      chunk[i++] = 0xD800 + (t >> 10)
      chunk[i++] = 0xDC00 + (t & 1023)
    } else {
      chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63
    }

    if (i > 8191) {
      (parts ?? (parts = [])).push(String.fromCharCode.apply(String, chunk))
      i = 0
    }
  }

  if (parts != null) {
    if (i > 0) {
      parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)))
    }

    return parts.join('')
  }

  return String.fromCharCode.apply(String, chunk.slice(0, i))
}

/**
 * Writes a string as UTF8 bytes
 */
export function write (string: string, buffer: Uint8Array, offset: number): number {
  const start = offset
  let c1 // character 1
  let c2 // character 2

  for (let i = 0; i < string.length; ++i) {
    c1 = string.charCodeAt(i)

    if (c1 < 128) {
      buffer[offset++] = c1
    } else if (c1 < 2048) {
      buffer[offset++] = c1 >> 6 | 192
      buffer[offset++] = c1 & 63 | 128
    } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
      c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF)
      ++i
      buffer[offset++] = c1 >> 18 | 240
      buffer[offset++] = c1 >> 12 & 63 | 128
      buffer[offset++] = c1 >> 6 & 63 | 128
      buffer[offset++] = c1 & 63 | 128
    } else {
      buffer[offset++] = c1 >> 12 | 224
      buffer[offset++] = c1 >> 6 & 63 | 128
      buffer[offset++] = c1 & 63 | 128
    }
  }

  return offset - start
}
