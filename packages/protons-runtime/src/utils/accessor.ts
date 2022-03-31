import type { Uint8ArrayList } from 'uint8arraylist'

export default function accessor (buf: Uint8Array | Uint8ArrayList) {
  if (buf instanceof Uint8Array) {
    return {
      get (index: number) {
        return buf[index]
      },

      set (index: number, value: number) {
        buf[index] = value
      }
    }
  }

  return {
    get (index: number) {
      return buf.get(index)
    },

    set (index: number, value: number) {
      buf.set(index, value)
    }
  }
}
