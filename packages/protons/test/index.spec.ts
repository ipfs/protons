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
import { Optional, OptionalEnum } from './fixtures/optional.js'
import { Singular, SingularEnum } from './fixtures/singular.js'

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

    const protobufJsSchema = protobufjs.loadSync('./test/fixtures/basic.proto').lookupType('Basic')
    const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(basic)).finish()

    const encoded = Basic.encode(basic).subarray()
    expect(encoded).to.equalBytes(pbjsBuf)
    expect(encoded).to.equalBytes(protobufJsBuf)

    const decoded = Basic.decode(encoded)
    expect(decoded).to.deep.equal(basic)

    expect(Basic.decode(encoded)).to.deep.equal(basic)
    expect(Basic.decode(pbjsBuf)).to.deep.equal(basic)
    expect(Basic.decode(protobufJsBuf)).to.deep.equal(basic)
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
      field11: Uint8Array.from([0, 1, 2, 3]),
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

    const protobufJsSchema = protobufjs.loadSync('./test/fixtures/test.proto').lookupType('AllTheTypes')
    const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(longifyBigInts(allTheTypes))).finish()

    const encoded = AllTheTypes.encode(allTheTypes)
    expect(encoded).to.equalBytes(pbjsBuf)
    expect(encoded).to.equalBytes(protobufJsBuf)

    expect(AllTheTypes.decode(encoded)).to.deep.equal(allTheTypes)
    expect(AllTheTypes.decode(pbjsBuf)).to.deep.equal(allTheTypes)
    expect(AllTheTypes.decode(protobufJsBuf)).to.deep.equal(allTheTypes)
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

    const protobufJsSchema = protobufjs.loadSync('./test/fixtures/test.proto').lookupType('AllTheTypes')
    const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(longifyBigInts(allTheTypes))).finish()

    const encoded = AllTheTypes.encode(allTheTypes).subarray()
    expect(encoded).to.equalBytes(pbjsBuf)
    expect(encoded).to.equalBytes(protobufJsBuf)

    expect(AllTheTypes.decode(encoded)).to.deep.equal(allTheTypes)
    expect(AllTheTypes.decode(pbjsBuf)).to.deep.equal(allTheTypes)
    expect(AllTheTypes.decode(protobufJsBuf)).to.deep.equal(allTheTypes)
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

    const protobufJsSchema = protobufjs.loadSync('./test/fixtures/test.proto').lookupType('AllTheTypes')
    const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(longifyBigInts(allTheTypes))).finish()

    const encoded = AllTheTypes.encode(allTheTypes).subarray()
    expect(encoded).to.equalBytes(pbjsBuf)
    expect(encoded).to.equalBytes(protobufJsBuf)

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

    const protobufJsSchema = protobufjs.loadSync('./test/fixtures/peer.proto').lookupType('Peer')
    const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(longifyBigInts(peer))).finish()

    const encoded = Peer.encode(peer).subarray()
    expect(encoded).to.equalBytes(pbjsBuf)
    expect(encoded).to.equalBytes(protobufJsBuf)

    expect(Peer.decode(encoded)).to.deep.equal(peer)
    expect(Peer.decode(pbjsBuf)).to.deep.equal(peer)
  })

  it('decodes multiple sub messages with singular fields set to default values', () => {
    const peer: Peer = {
      protocols: [],
      metadata: [],
      addresses: [{
        multiaddr: new Uint8Array(),
        isCertified: false
      }, {
        multiaddr: new Uint8Array(),
        isCertified: false
      }]
    }

    const pbjsSchema = pbjs.parseSchema(fs.readFileSync('./test/fixtures/peer.proto', 'utf-8')).compile()
    const pbjsBuf = pbjsSchema.encodePeer(peer)

    const protobufJsSchema = protobufjs.loadSync('./test/fixtures/peer.proto').lookupType('Peer')
    const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(peer)).finish()

    const encoded = Peer.encode(peer).subarray()
    expect(encoded).to.equalBytes(pbjsBuf)
    expect(encoded).to.equalBytes(protobufJsBuf)

    expect(Peer.decode(encoded)).to.deep.equal(peer)
    expect(Peer.decode(pbjsBuf)).to.deep.equal(peer)
    expect(Peer.decode(protobufJsBuf)).to.deep.equal(peer)
  })

  it('decodes enums with values that are not 0-n', () => {
    const message: CircuitRelay = {
      type: CircuitRelay.Type.STOP,
      code: CircuitRelay.Status.HOP_NO_CONN_TO_DST
    }

    const root = protobufjs.loadSync('./test/fixtures/circuit.proto')
    // @ts-expect-error
    const PbCircuitRelay = root.nested.CircuitRelay as PBType

    const protobufJsBuf = PbCircuitRelay.encode(PbCircuitRelay.fromObject(message)).finish()

    const encoded = CircuitRelay.encode(message).subarray()
    expect(encoded).to.equalBytes(protobufJsBuf)

    expect(CircuitRelay.decode(encoded)).to.deep.equal(message)
    expect(CircuitRelay.decode(protobufJsBuf)).to.deep.equal(message)
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

  it('supports default fields', () => {
    const decoded = Basic.decode(Uint8Array.from([]))

    // num is singular
    expect(decoded).to.have.property('num', 0)
  })

  it('does not write unset optional fields', () => {
    const obj: Optional = {

    }

    const encoded = Optional.encode(obj)
    expect(encoded).to.have.lengthOf(0)

    const decoded = Optional.decode(encoded)
    expect(Object.keys(decoded)).to.be.empty()

    const protobufJsSchema = protobufjs.loadSync('./test/fixtures/optional.proto').lookupType('Optional')
    const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(obj)).finish()
    expect(encoded).to.equalBytes(protobufJsBuf)
  })

  it('writes set optional fields', () => {
    const obj: Optional = {
      double: 1.0,
      float: 1.0,
      int32: 1,
      int64: 1n,
      uint32: 1,
      uint64: 1n,
      sint32: 1,
      sint64: 1n,
      fixed32: 1,
      fixed64: 1n,
      sfixed32: 1,
      sfixed64: 1n,
      bool: true,
      string: 'hello',
      bytes: Uint8Array.from([0, 1, 2]),
      enum: OptionalEnum.VALUE_1,
      subMessage: {
        foo: 'hello',
        bar: 2
      }
    }

    const encoded = Optional.encode(obj)
    const decoded = Optional.decode(encoded)
    expect(decoded).to.deep.equal(obj)

    const protobufJsSchema = protobufjs.loadSync('./test/fixtures/optional.proto').lookupType('Optional')
    const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(longifyBigInts(obj))).finish()
    expect(encoded).to.equalBytes(protobufJsBuf)
  })

  it('writes set optional fields set to default values', () => {
    const obj: Optional = {
      double: 0,
      float: 0,
      int32: 0,
      int64: 0n,
      uint32: 0,
      uint64: 0n,
      sint32: 0,
      sint64: 0n,
      fixed32: 0,
      fixed64: 0n,
      sfixed32: 0,
      sfixed64: 0n,
      bool: false,
      string: '',
      bytes: new Uint8Array(),
      enum: OptionalEnum.NO_VALUE,
      subMessage: {
        foo: '',
        bar: 0
      }
    }

    const encoded = Optional.encode(obj)
    const decoded = Optional.decode(encoded)
    expect(decoded).to.deep.equal(obj)

    const protobufJsSchema = protobufjs.loadSync('./test/fixtures/optional.proto').lookupType('Optional')
    const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(longifyBigInts(obj))).finish()
    expect(encoded).to.equalBytes(protobufJsBuf)
  })

  it('does not write singular field values when set to defaults', () => {
    const obj: Singular = {
      double: 0,
      float: 0,
      int32: 0,
      int64: 0n,
      uint32: 0,
      uint64: 0n,
      sint32: 0,
      sint64: 0n,
      fixed32: 0,
      fixed64: 0n,
      sfixed32: 0,
      sfixed64: 0n,
      bool: false,
      string: '',
      bytes: new Uint8Array(),
      enum: SingularEnum.NO_VALUE,
      subMessage: {
        foo: '',
        bar: 0
      }
    }

    const encoded = Singular.encode(obj)
    expect(encoded).to.have.lengthOf(0)

    // Cannot compare bytes - protobuf.js does not implement singular properly - https://github.com/protobufjs/protobuf.js/issues/1468#issuecomment-745177012
    // const protobufJsSchema = protobufjs.loadSync('./test/fixtures/singular.proto').lookupType('Singular')
    // const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(longifyBigInts(obj))).finish()
    // expect(encoded).to.equalBytes(protobufJsBuf)
  })

  it('writes singular field values when not set to defaults', () => {
    const obj: Singular = {
      double: 1.0,
      float: 1.0,
      int32: 1,
      int64: 1n,
      uint32: 1,
      uint64: 1n,
      sint32: 1,
      sint64: 1n,
      fixed32: 1,
      fixed64: 1n,
      sfixed32: 1,
      sfixed64: 1n,
      bool: true,
      string: 'hello',
      bytes: Uint8Array.from([0, 1, 2]),
      enum: SingularEnum.VALUE_1,
      subMessage: {
        foo: 'hello',
        bar: 2
      }
    }

    const encoded = Singular.encode(obj)
    const decoded = Singular.decode(encoded)
    expect(decoded).to.deep.equal(obj)

    // Cannot compare bytes - protobuf.js does not implement singular properly - https://github.com/protobufjs/protobuf.js/issues/1468#issuecomment-745177012
    // const protobufJsSchema = protobufjs.loadSync('./test/fixtures/singular.proto').lookupType('Singular')
    // const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(longifyBigInts(obj))).finish()
    // expect(encoded).to.equalBytes(protobufJsBuf)
  })
})
