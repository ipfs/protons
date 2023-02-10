/* eslint-disable no-console */

/*
$ node dist/src/index.js
$ npx playwright-test dist/src/index.js --runner benchmark
*/

import Benchmark from 'benchmark'

import { encodeTest as pbjsEncodeTest } from './pbjs/bench.js'
import { Test as ProtobufjsTest } from './protobufjs/bench.js'
import { Test as ProtonsTest } from './protons/bench.js'
import { Test as ProtobufEsTest } from './protobuf-es/bench_pb.js'

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

new Benchmark.Suite()
  .add('pbjs', () => {
    pbjsEncodeTest(message)
  })
  .add('protons', () => {
    ProtonsTest.encode(message)
  })
  .add('protobufjs', () => {
    ProtobufjsTest.encode(message).finish()
  })
  .add('protobufes', () => {
    new ProtobufEsTest(message).toBinary()
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
  })
  // run async
  .run({ async: true })
