
import benny from 'benny'
import { expect } from 'aegir/chai'
import { Test as ProtonsTest } from './protons/bench.js'
import { encodeTest as pbjsEncodeTest, decodeTest as pbjsDecodeTest } from './pbjs/bench.js'
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

function expectDecodedCorrectly (result: any) {
  expect(result).to.have.nested.property('meh.lol', message.meh.lol)
  expect(result).to.have.nested.property('meh.b.tmp.baz', message.meh.b.tmp.baz)
  expect(result).to.have.property('hello', message.hello)
  expect(result).to.have.property('foo', message.foo)
  expect(result).to.have.property('payload').that.equalBytes(message.payload)
}

void benny.suite(
  'Encode/Decode',

  benny.add('pbjs', () => {
    const buf = pbjsEncodeTest(message)
    const result = pbjsDecodeTest(buf)

    expectDecodedCorrectly(result)
  }),

  benny.add('protons', () => {
    const buf = ProtonsTest.encode(message)
    const result = ProtonsTest.decode(buf)

    expectDecodedCorrectly(result)
  }),

  benny.add('protobufjs', () => {
    const buf = ProtobufjsTest.encode(message).finish()
    const result = ProtobufjsTest.decode(buf)

    expectDecodedCorrectly(result)
  }),

  benny.cycle(),
  benny.complete()
)
