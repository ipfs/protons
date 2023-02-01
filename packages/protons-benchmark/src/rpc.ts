/* eslint-disable no-console */

/*
$ node dist/src/index.js
$ npx playwright-test dist/src/index.js --runner benchmark
*/

import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'

import Benchmark from 'benchmark'

import { RPC as ProtobufjsRPC } from './protobufjs/rpc.js'
import { RPC as ProtonsRPC } from './protons/rpc.js'

const rpc = {
  subscriptions: [],
  messages: [
    {
      topic: 'topic1',
      // typical Attestation
      data: uint8ArrayFromString(
        'e40000000a000000000000000a00000000000000a45c8daa336e17a150300afd4c717313c84f291754c51a378f20958083c5fa070a00000000000000a45c8daa336e17a150300afd4c717313c84f291754c51a378f20958083c5fa070a00000000000000a45c8daa336e17a150300afd4c717313c84f291754c51a378f20958083c5fa0795d2ef8ae4e2b4d1e5b3d5ce47b518e3db2c8c4d082e4498805ac2a686c69f248761b78437db2927470c1e77ede9c18606110faacbcbe4f13052bde7f7eff6aab09edf7bc4929fda2230f943aba2c47b6f940d350cb20c76fad4a8d40e2f3f1f01',
        'hex'
      ),
      signature: Uint8Array.from(Array.from({ length: 96 }, () => 100))
    }
  ],
  control: undefined
}

const bytes = ProtobufjsRPC.encode(rpc).finish()

new Benchmark.Suite()
  .add('protons', () => {
    ProtonsRPC.decode(bytes)
  })
  .add('protobufjs', () => {
    ProtobufjsRPC.decode(bytes)
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
