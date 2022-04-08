/* eslint-env mocha */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { expect } from 'aegir/chai'
import pbjs from 'pbjs'
import { Basic } from './fixtures/basic.js'
import { AllTheTypes, AnEnum } from './fixtures/test.js'
import fs from 'fs'
import protobufjs from 'protobufjs'
import { Peer } from './fixtures/peer.js'

const Long = protobufjs.util.Long

function longifyBigInts (obj: any) {
  const output = {
    ...obj
  }

  for (const key of Object.keys(output)) {
    if (typeof output[key] === 'bigint') {
      // @ts-expect-error exported types are incomplete
      output[key] = Long.fromString(`${output[key].toString()}`)
    }
  }

  return output
}

describe('encode', () => {
  it('should encode', () => {
    expect.toString()

    const basic: Basic = {
      foo: 'hello world',
      num: 5
    }

    const schema = pbjs.parseSchema(fs.readFileSync('./test/fixtures/basic.proto', 'utf-8')).compile()
    const pbjsBuf = schema.encodeBasic(basic)

    const encoded = Basic.encode(basic)
    expect(encoded).to.equalBytes(pbjsBuf)

    const decoded = Basic.decode(encoded)
    expect(decoded).to.deep.equal(basic)

    expect(Basic.decode(encoded)).to.deep.equal(basic)
    expect(Basic.decode(pbjsBuf)).to.deep.equal(basic)
  })

  it('should encode all the types', () => {
    const allTheTypes: AllTheTypes = {
      field1: true,
      field2: 1,
      field3: 1n,
      field4: 1,
      field5: 1n,
      field6: 1,
      field7: 1n,
      field8: 1,
      field9: 1,
      field10: 'hello',
      field11: Uint8Array.from([1, 2, 3]),
      field12: AnEnum.DERP,
      field13: {
        foo: 'bar'
      },
      field14: ['qux', 'garply'],
      field15: 1,
      field16: 1n,
      field17: 1,
      field18: 1n
    }

    const schema = pbjs.parseSchema(fs.readFileSync('./test/fixtures/test.proto', 'utf-8')).compile()
    const pbjsBuf = schema.encodeAllTheTypes(longifyBigInts(allTheTypes))

    const encoded = AllTheTypes.encode(allTheTypes)
    expect(encoded).to.equalBytes(pbjsBuf)

    expect(AllTheTypes.decode(encoded)).to.deep.equal(allTheTypes)
    expect(AllTheTypes.decode(pbjsBuf)).to.deep.equal(allTheTypes)
  })

  it('should encode all the types with max numeric values', () => {
    const allTheTypes: AllTheTypes = {
      field1: true,
      field2: 2147483647,
      field3: 9223372036854775807n,
      field4: 4294967295,
      field5: 18446744073709551615n,
      field6: 2147483647,
      field7: 9223372036854775807n,
      field8: 2147483647,
      field9: 2147483648,
      field14: [],
      field15: 2147483647,
      field16: 9223372036854775807n,
      field17: 2147483647,
      field18: 9223372036854775807n
    }

    const schema = pbjs.parseSchema(fs.readFileSync('./test/fixtures/test.proto', 'utf-8')).compile()
    const pbjsBuf = schema.encodeAllTheTypes(longifyBigInts(allTheTypes))

    const encoded = AllTheTypes.encode(allTheTypes)
    expect(encoded).to.equalBytes(pbjsBuf)

    expect(AllTheTypes.decode(encoded)).to.deep.equal(allTheTypes)
    expect(AllTheTypes.decode(pbjsBuf)).to.deep.equal(allTheTypes)
  })

  it('should encode all the types with min numeric values', () => {
    const allTheTypes: AllTheTypes = {
      field1: false,
      field2: -2147483647,
      field3: -9223372036854775807n,
      field4: 0,
      field5: 0n,
      field6: -2147483647,
      field7: -9223372036854775807n,
      field8: -2147483647,
      field9: -2147483648,
      field14: [],
      field15: -2147483647,
      field16: -9223372036854775807n,
      field17: -2147483647,
      field18: -9223372036854775807n
    }

    const schema = pbjs.parseSchema(fs.readFileSync('./test/fixtures/test.proto', 'utf-8')).compile()
    const pbjsBuf = schema.encodeAllTheTypes(longifyBigInts(allTheTypes))

    const encoded = AllTheTypes.encode(allTheTypes)
    expect(encoded).to.equalBytes(pbjsBuf)

    expect(AllTheTypes.decode(encoded)).to.deep.equal(allTheTypes)
    expect(AllTheTypes.decode(pbjsBuf)).to.deep.equal(allTheTypes)
  })

  it('decodes multiple sub messages', () => {
    const peer: Peer = {
      protocols: ['protocol1', 'protocol2'],
      metadata: [],
      addresses: [{
        multiaddr: Uint8Array.from([4, 127, 0, 0, 1, 6, 31, 64]),
        isCertified: false
      }, {
        multiaddr: Uint8Array.from([4, 20, 0, 0, 1, 6, 31, 65]),
        isCertified: false
      }]
    }

    const schema = pbjs.parseSchema(fs.readFileSync('./test/fixtures/peer.proto', 'utf-8')).compile()
    const pbjsBuf = schema.encodePeer(peer)

    const encoded = Peer.encode(peer)
    expect(encoded).to.equalBytes(pbjsBuf)

    expect(Peer.decode(encoded)).to.deep.equal(peer)
    expect(Peer.decode(pbjsBuf)).to.deep.equal(peer)
  })
})
