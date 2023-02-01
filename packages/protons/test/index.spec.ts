/* eslint-env mocha */

import { expect } from 'aegir/chai'
import pbjs from 'pbjs'
import { Basic, Empty } from './fixtures/basic.js'
import { AllTheTypes, AnEnum } from './fixtures/test.js'
import fs from 'fs'
import protobufjs, { Type as PBType } from 'protobufjs'
import { Peer } from './fixtures/peer.js'
import { CircuitRelay } from './fixtures/circuit.js'
import Long from 'long'
import { Optional, OptionalEnum } from './fixtures/optional.js'
import { Singular, SingularEnum } from './fixtures/singular.js'

function longifyBigInts (obj: any): any {
  const output = {
    ...obj
  }

  for (const key of Object.keys(output)) {
    if (typeof output[key] === 'bigint') {
      output[key] = Long.fromString(`${output[key].toString()}`)
    }
  }

  return output
}

function bigintifyLongs (obj: any): any {
  const output = {
    ...obj
  }

  for (const key of Object.keys(output)) {
    if (output[key]?.low != null && output[key]?.high != null) {
      output[key] = BigInt(new Long(output[key].low, output[key].high, output[key].unsigned).toString())
    }
  }

  return output
}

function uint8ArrayifyBytes (obj: any): any {
  const output = {
    ...obj
  }

  for (const key of Object.keys(output)) {
    if (output[key] instanceof Uint8Array) {
      output[key] = Uint8Array.from(output[key])
    }
  }

  return output
}

/**
 * Paper over differences between protons and pbjs output
 */
function normalizePbjs (obj: any, target: any): any {
  let output = bigintifyLongs(obj)
  output = uint8ArrayifyBytes(output)

  for (const key of Object.keys(target)) {
    // pbjs does not set repeated values by default
    if (Array.isArray(target[key]) && output[key] == null) {
      output[key] = []
    }

    // pbjs does not set maps by default
    if (target[key] instanceof Map) {
      output[key] = new Map()
    }
  }

  return output
}

/**
 * Paper over differences between protons and protobuf.js output
 */
function normalizeProtonbufjs (obj: any, target: any): any {
  let output = bigintifyLongs(obj)
  output = uint8ArrayifyBytes(output)

  for (const key of Object.keys(output)) {
    // protobujs sets unset message fields to `null`, protons does not set the field at all
    if (output[key] === null && target[key] == null) {
      delete output[key] // eslint-disable-line @typescript-eslint/no-dynamic-delete
    }
  }

  for (const key of Object.keys(target)) {
    // protobujs uses plain objects instead of maps
    if (target[key] instanceof Map) {
      output[key] = new Map(Object.entries(output[key]))
    }
  }

  return output
}

interface TestEncodingOptions {
  compareBytes?: boolean
  comparePbjs?: boolean
  outputObject?: any
}

/**
 * Ensure:
 *
 * 1. the generated bytes between protons, pbjs and protobuf.js are the same
 * 2. protons and protobuf.js agree on deserialization
 */
function testEncodings (inputObject: any, protons: any, proto: string, typeName: string, opts: TestEncodingOptions = {}): void {
  const outputObject = opts.outputObject ?? inputObject
  const pbjsSchema = pbjs.parseSchema(fs.readFileSync(proto, 'utf-8')).compile()
  const pbjsBuf = pbjsSchema[`encode${typeName}`](longifyBigInts(inputObject))

  const protobufJsSchema = protobufjs.loadSync(proto).lookupType(typeName)
  const protobufJsBuf = protobufJsSchema.encode(protobufJsSchema.fromObject(longifyBigInts(inputObject))).finish()

  const encoded = protons.encode(inputObject)

  if (opts.compareBytes !== false) {
    expect(encoded).to.equalBytes(pbjsBuf)
    expect(encoded).to.equalBytes(protobufJsBuf)
  }

  expect(protons.decode(encoded)).to.deep.equal(outputObject)
  expect(protons.decode(pbjsBuf)).to.deep.equal(outputObject)
  expect(protons.decode(protobufJsBuf)).to.deep.equal(outputObject)

  if (opts.comparePbjs !== false) {
    expect(normalizePbjs(pbjsSchema[`decode${typeName}`](encoded), inputObject)).to.deep.equal(outputObject)
  }

  expect(normalizeProtonbufjs(protobufJsSchema.toObject(protobufJsSchema.decode(encoded), {
    enums: String,
    defaults: true
  }), inputObject)).to.deep.equal(outputObject)
}

describe('encode', () => {
  it('should encode', () => {
    const obj: Basic = {
      foo: 'hello world',
      num: 5
    }

    testEncodings(obj, Basic, './test/fixtures/basic.proto', 'Basic')
  })

  it('should encode an empty message', () => {
    const obj: Empty = {}

    testEncodings(obj, Empty, './test/fixtures/basic.proto', 'Empty')
  })

  it('should encode all the types', () => {
    const obj: AllTheTypes = {
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

    testEncodings(obj, AllTheTypes, './test/fixtures/test.proto', 'AllTheTypes')
  })

  it('should encode all the types with max numeric values', () => {
    const obj: AllTheTypes = {
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

    testEncodings(obj, AllTheTypes, './test/fixtures/test.proto', 'AllTheTypes')
  })

  it('should encode all the types with min numeric values', () => {
    const obj: AllTheTypes = {
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

    testEncodings(obj, AllTheTypes, './test/fixtures/test.proto', 'AllTheTypes')
  })

  it('decodes multiple sub messages', () => {
    const obj: Peer = {
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

    testEncodings(obj, Peer, './test/fixtures/peer.proto', 'Peer')
  })

  it('decodes multiple sub messages with singular fields set to default values', () => {
    const obj: Peer = {
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

    testEncodings(obj, Peer, './test/fixtures/peer.proto', 'Peer')
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

    testEncodings(obj, Optional, './test/fixtures/optional.proto', 'Optional')
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

    testEncodings(obj, Optional, './test/fixtures/optional.proto', 'Optional')
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

    testEncodings(obj, Optional, './test/fixtures/optional.proto', 'Optional')
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
      bytes: new Uint8Array(0),
      enum: SingularEnum.NO_VALUE
    }

    testEncodings(obj, Singular, './test/fixtures/singular.proto', 'Singular', {
      // protobuf.js writes default values for singular fields - https://github.com/protobufjs/protobuf.js/issues/1822
      compareBytes: false,
      // pbjs does not set default values when values are not present on the wire
      comparePbjs: false
    })
  })

  it('does not require singular field values when set to defaults', () => {
    const inputObject = {}
    const outputObject: Singular = {
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
      bytes: new Uint8Array(0),
      enum: SingularEnum.NO_VALUE
    }

    testEncodings(inputObject, Singular, './test/fixtures/singular.proto', 'Singular', {
      // protobuf.js writes default values for singular fields - https://github.com/protobufjs/protobuf.js/issues/1822
      compareBytes: false,
      // pbjs does not set default values when values are not present on the wire
      comparePbjs: false,
      // output object should have default values set
      outputObject
    })
  })

  it('does not write singular field values when defaults are omitted', () => {
    const buf = Singular.encode({})

    expect(buf.byteLength).to.equal(0, 'wrote default values for singular fields')

    const outputObject: Singular = {
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
      bytes: new Uint8Array(0),
      enum: SingularEnum.NO_VALUE
    }

    expect(Singular.decode(buf)).to.deep.equal(outputObject)
  })

  it('does not write singular field values when set to defaults', () => {
    const objectWithDefaults: Singular = {
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
      bytes: new Uint8Array(0),
      enum: SingularEnum.NO_VALUE
    }

    const buf = Singular.encode(objectWithDefaults)
    expect(buf.byteLength).to.equal(0, 'wrote default values for singular fields')
    expect(Singular.decode(buf)).to.deep.equal(objectWithDefaults)
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

    testEncodings(obj, Singular, './test/fixtures/singular.proto', 'Singular', {
      // protobuf.js writes default values for singular fields - https://github.com/protobufjs/protobuf.js/issues/1822
      compareBytes: false
    })
  })

  it('writes singular message field values when set to defaults', () => {
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
      bytes: new Uint8Array(0),
      enum: SingularEnum.NO_VALUE,
      subMessage: {
        foo: '',
        bar: 0
      }
    }

    testEncodings(obj, Singular, './test/fixtures/singular.proto', 'Singular', {
      // protobuf.js writes default values for singular fields - https://github.com/protobufjs/protobuf.js/issues/1822
      compareBytes: false,
      // pbjs does not set default values when values are not present on the wire
      comparePbjs: false
    })
  })
})
