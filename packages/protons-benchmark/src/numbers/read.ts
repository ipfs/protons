/* eslint-disable no-console */

import Benchmark from 'benchmark'
import { writer, reader } from 'protons-runtime'

const bigint = 100n

const w = writer()
w.uint64(bigint)

const buf = w.finish()

export async function readBenchmark (): Promise<void> {
  return new Promise<void>((resolve) => {
    new Benchmark.Suite()
      .add('uint64 (BigInt)', () => {
        const r = reader(buf)
        r.uint64()
      })
      .add('uint64number', () => {
        const r = reader(buf)
        r.uint64Number()
      })
      .add('uint64string', () => {
        const r = reader(buf)
        r.uint64String()
      })
      .on('error', (err: Error) => {
        console.error(err)
      })
      .on('cycle', (event: any) => {
        console.info(String(event.target))
      })
      .on('complete', function () {
        // @ts-expect-error types are wrong
        console.info(`Fastest is ${this.filter('fastest').map('name')}`)
        resolve()
      })
      // run async
      .run({ async: true })
  })
}
