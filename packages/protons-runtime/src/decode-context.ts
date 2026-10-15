import { MaxLengthError, MaxSizeError } from './index.ts'

const contextKey = Symbol('decodeContext')

interface InternalDecodeOptions {
  totalLimits?: unknown
  [contextKey]?: DecodeContext
}

/** Shared counters for a field path during one decode or stream operation. */
export class DecodeContext {
  private readonly counts = new Map<string, number>()
  private readonly children = new Map<string, DecodeContext>()

  private constructor () {}

  static get (opts: InternalDecodeOptions): DecodeContext | undefined {
    if (opts.totalLimits == null) {
      return
    }

    return opts[contextKey] ?? new DecodeContext()
  }

  static child<T extends InternalDecodeOptions> (context: DecodeContext | undefined, field: string, opts: T): T {
    if (context == null || opts.totalLimits == null) {
      return opts
    }

    let child = context.children.get(field)

    if (child == null) {
      child = new DecodeContext()
      context.children.set(field, child)
    }

    return { ...opts, [contextKey]: child }
  }

  consume (field: string, limit: number | undefined, ErrorType: typeof MaxLengthError | typeof MaxSizeError = MaxLengthError): void {
    if (limit == null) {
      return
    }

    const count = this.counts.get(field) ?? 0

    if (count >= limit) {
      throw new ErrorType(`Decode error - field "${field}" exceeded its total element limit`)
    }

    this.counts.set(field, count + 1)
  }
}
