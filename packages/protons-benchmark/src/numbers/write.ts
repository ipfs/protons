/* eslint-disable no-console */

import Benchmark from 'benchmark'
import { writer } from 'protons-runtime'

const number = 100
const bigint = 100n
const string = '100'

export async function writeBenchmark (): Promise<void> {
  return new Promise<void>((resolve) => {
    new Benchmark.Suite()
      .add('uint64 (BigInt)', () => {
        const w = writer()
        w.uint64(bigint)
      })
      .add('uint64number', () => {
        const w = writer()
        w.uint64Number(number)
      })
      .add('uint64string', () => {
        const w = writer()
        w.uint64String(string)
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
