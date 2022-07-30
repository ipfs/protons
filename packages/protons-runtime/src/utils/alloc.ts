
export function alloc (len: number) {
  return new Uint8Array(len)
}

export function allocUnsafe (len: number) {
  if (globalThis?.Buffer?.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(len)
  }

  return new Uint8Array(len)
}
