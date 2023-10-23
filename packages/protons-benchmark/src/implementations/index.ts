/* eslint-disable no-console */

/*
$ node dist/src/index.js
$ npx playwright-test dist/src/index.js --runner benchmark
*/

import { expect } from 'aegir/chai'
import Benchmark from 'benchmark'
import { encodeTest as pbjsEncodeTest, decodeTest as pbjsDecodeTest } from './pbjs/bench.js'
import { Test as ProtobufEsTest } from './protobuf-es/bench_pb.js'
import { Test as ProtobufTsTest } from './protobuf-ts/bench.js'
import { Test as ProtobufjsTest } from './protobufjs/bench.js'
import { Test as ProtonsTest } from './protons/bench.js'

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

function expectDecodedCorrectly (result: any): void {
  expect(result).to.have.nested.property('meh.lol', message.meh.lol)
  expect(result).to.have.nested.property('meh.b.tmp.baz', message.meh.b.tmp.baz)
  expect(result).to.have.property('hello', message.hello)
  expect(result).to.have.property('foo', message.foo)
  expect(result).to.have.property('payload').that.equalBytes(message.payload)
}

new Benchmark.Suite()
  .add('pbjs', () => {
    const buf = pbjsEncodeTest(message)
    const result = pbjsDecodeTest(buf)

    expectDecodedCorrectly(result)
  })
  .add('protons', () => {
    const buf = ProtonsTest.encode(message)
    const result = ProtonsTest.decode(buf)

    expectDecodedCorrectly(result)
  })
  .add('protobuf.js', () => {
    const buf = ProtobufjsTest.encode(message).finish()
    const result = ProtobufjsTest.decode(buf)

    expectDecodedCorrectly(result)
  })
  .add('@protobuf-ts', () => {
    const buf = ProtobufTsTest.toBinary(message)
    const result = ProtobufTsTest.fromBinary(buf)

    expectDecodedCorrectly(result)
  })
  .add('protobuf-es', () => {
    const buf = new ProtobufEsTest(message).toBinary()
    const result = ProtobufEsTest.fromBinary(buf)

    expectDecodedCorrectly(result)
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
