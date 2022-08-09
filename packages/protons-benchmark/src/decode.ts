/* eslint-disable no-console */

/*
$ node dist/src/index.js
$ npx playwright-test dist/src/index.js --runner benchmark
*/

import Benchmark from 'benchmark'
import { Test as ProtonsTest } from './protons/bench.js'
import { decodeTest as pbjsDecodeTest } from './pbjs/bench.js'
import { Test as ProtobufjsTest } from './protobufjs/bench.js'

const message = {
  meh: {
    lol: 'sdkljfoee',
    b: {
      tmp: {
        baz: 2309292
      }
    }
  },
  hello: 3493822,
  foo: 'derp derp derp',
  payload: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
}

const buf = ProtonsTest.encode(message).subarray()

new Benchmark.Suite()
  .add('pbjs', () => {
    pbjsDecodeTest(buf)
  })
  .add('protons', () => {
    ProtonsTest.decode(buf)
  })
  .add('protobufjs', () => {
    ProtobufjsTest.decode(buf)
  })
  .on('error', (err: Error) => {
    console.error(err)
  })
  .on('cycle', (event: any) => {
    console.info(String(event.target))
  })
  .on('complete', function () {
    // @ts-expect-error types are wrong
    console.info(`Fastest is ${this.filter('fastest').map('name')}`) // eslint-disable-line @typescript-eslint/restrict-template-expressions
  })
  // run async
  .run({ async: true })
