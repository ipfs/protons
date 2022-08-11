/* eslint-env mocha */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { expect } from 'aegir/chai'
import pbjs from 'pbjs'
import { Basic } from './fixtures/basic.js'
import { AllTheTypes, AnEnum } from './fixtures/test.js'
import fs from 'fs'
import protobufjs, { Type as PBType } from 'protobufjs'
import { Peer } from './fixtures/peer.js'
import { CircuitRelay } from './fixtures/circuit.js'
import long from 'long'
import { alloc } from 'uint8arrays/alloc'

function longifyBigInts (obj: any) {
  const output = {
    ...obj
  }

  for (const key of Object.keys(output)) {
    if (typeof output[key] === 'bigint') {
      output[key] = long.fromString(`${output[key].toString()}`)
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

    const encoded = Basic.encode(basic).subarray()
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
      field11: alloc(3).map((_, i) => i),
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

    const encoded = AllTheTypes.encode(allTheTypes).subarray()
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

    const encoded = AllTheTypes.encode(allTheTypes).subarray()
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
      field15: 0,
      field16: 0n,
      field17: -2147483647,
      field18: -9223372036854775807n
    }

    const schema = pbjs.parseSchema(fs.readFileSync('./test/fixtures/test.proto', 'utf-8')).compile()
    const pbjsBuf = schema.encodeAllTheTypes(longifyBigInts(allTheTypes))

    const encoded = AllTheTypes.encode(allTheTypes).subarray()
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

    const encoded = Peer.encode(peer).subarray()
    expect(encoded).to.equalBytes(pbjsBuf)

    expect(Peer.decode(encoded)).to.deep.equal(peer)
    expect(Peer.decode(pbjsBuf)).to.deep.equal(peer)
  })

  it('decodes enums with values that are not 0-n', () => {
    const message: CircuitRelay = {
      type: CircuitRelay.Type.STOP,
      code: CircuitRelay.Status.HOP_NO_CONN_TO_DST
    }

    const root = protobufjs.loadSync('./test/fixtures/circuit.proto')
    // @ts-expect-error
    const PbCircuitRelay = root.nested.CircuitRelay as PBType

    const pbufJsBuf = PbCircuitRelay.encode(PbCircuitRelay.fromObject(message)).finish()

    const encoded = CircuitRelay.encode(message).subarray()

    expect(encoded).to.equalBytes(pbufJsBuf)

    expect(CircuitRelay.decode(encoded)).to.deep.equal(message)
    expect(CircuitRelay.decode(pbufJsBuf)).to.deep.equal(message)
  })

  it('supports optional fields', () => {
    const obj: Basic = {
      num: 5
    }

    const encoded = Basic.encode(obj)
    const decoded = Basic.decode(encoded)

    // foo is optional
    expect(decoded).to.not.have.property('foo')
  })
})
