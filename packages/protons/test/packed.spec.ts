import { expect } from 'aegir/chai'
import all from 'it-all'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import { DefaultPackedTypes, ExpandedTypes, NewOptionExpandedTypes, NewOptionPackedTypes, PackedTypes, SpecPacked } from './fixtures/packed.ts'
import { testEncodings } from './utils/compat.ts'

describe('packed', () => {
  it('encodes the spec example', () => {
    const obj: SpecPacked = {
      str: 'hello',
      packed: [1, 2, 3]
    }

    const buf = SpecPacked.encode(obj)

    const str = uint8ArrayToString(buf, 'base16')
    expect(str).to.equal('220568656c6c6f2a03010203')
  })

  it('decodes the spec example', () => {
    const buf = uint8ArrayFromString('220568656c6c6f2a03010203', 'base16')
    const obj = SpecPacked.decode(buf)

    expect(obj).to.deep.equal({
      str: 'hello',
      packed: [1, 2, 3]
    })
  })

  it('streams the spec example', () => {
    const buf = uint8ArrayFromString('220568656c6c6f2a03010203', 'base16')
    const events = all(SpecPacked.stream(buf))

    expect(events).to.deep.equal([{
      field: '.str',
      value: 'hello'
    }, {
      field: '.packed[]',
      index: 0,
      value: 1
    }, {
      field: '.packed[]',
      index: 1,
      value: 2
    }, {
      field: '.packed[]',
      index: 2,
      value: 3
    }])
  })

  // protobufjs doesn't pack by default for proto3 and later but it should?
  it('should encode default packed types to same bytes as other implementations', () => {
    const obj: DefaultPackedTypes = {
      doubles: [1.0, 2.0, 3.0],
      floats: [1.0, 2.0, 3.0],
      int32s: [1, 2, 3],
      int64s: [1n, 2n, 3n],
      uint32s: [1, 2, 3],
      uint64s: [1n, 2n, 3n],
      sint32s: [1, 2, 3],
      sint64s: [1n, 2n, 3n],
      fixed32s: [1, 2, 3],
      fixed64s: [1n, 2n, 3n],
      sfixed32s: [1, 2, 3],
      sfixed64s: [1n, 2n, 3n],
      bools: [true, true, false]
    }

    testEncodings(obj, DefaultPackedTypes, './test/fixtures/packed.proto', 'DefaultPackedTypes')
  })

  // protobufjs doesn't understand [packed=true|false]
  it('should encode packed types to same bytes as other implementations', () => {
    const obj: PackedTypes = {
      doubles: [1.0, 2.0, 3.0],
      floats: [1.0, 2.0, 3.0],
      int32s: [1, 2, 3],
      int64s: [1n, 2n, 3n],
      uint32s: [1, 2, 3],
      uint64s: [1n, 2n, 3n],
      sint32s: [1, 2, 3],
      sint64s: [1n, 2n, 3n],
      fixed32s: [1, 2, 3],
      fixed64s: [1n, 2n, 3n],
      sfixed32s: [1, 2, 3],
      sfixed64s: [1n, 2n, 3n],
      bools: [true, true, false]
    }

    testEncodings(obj, PackedTypes, './test/fixtures/packed.proto', 'PackedTypes')
  })

  it('should encode expanded types to same bytes as other implementations', () => {
    const obj: ExpandedTypes = {
      doubles: [1.0, 2.0, 3.0],
      floats: [1.0, 2.0, 3.0],
      int32s: [1, 2, 3],
      int64s: [1n, 2n, 3n],
      uint32s: [1, 2, 3],
      uint64s: [1n, 2n, 3n],
      sint32s: [1, 2, 3],
      sint64s: [1n, 2n, 3n],
      fixed32s: [1, 2, 3],
      fixed64s: [1n, 2n, 3n],
      sfixed32s: [1, 2, 3],
      sfixed64s: [1n, 2n, 3n],
      bools: [true, true, false]
    }

    testEncodings(obj, ExpandedTypes, './test/fixtures/packed.proto', 'ExpandedTypes')
  })

  it('should encode new option packed types to same bytes as other implementations', () => {
    const obj: NewOptionPackedTypes = {
      doubles: [1.0, 2.0, 3.0],
      floats: [1.0, 2.0, 3.0],
      int32s: [1, 2, 3],
      int64s: [1n, 2n, 3n],
      uint32s: [1, 2, 3],
      uint64s: [1n, 2n, 3n],
      sint32s: [1, 2, 3],
      sint64s: [1n, 2n, 3n],
      fixed32s: [1, 2, 3],
      fixed64s: [1n, 2n, 3n],
      sfixed32s: [1, 2, 3],
      sfixed64s: [1n, 2n, 3n],
      bools: [true, true, false]
    }

    testEncodings(obj, NewOptionPackedTypes, './test/fixtures/packed.proto', 'NewOptionPackedTypes')
  })

  it('should encode new option expanded types to same bytes as other implementations', () => {
    const obj: NewOptionExpandedTypes = {
      doubles: [1.0, 2.0, 3.0],
      floats: [1.0, 2.0, 3.0],
      int32s: [1, 2, 3],
      int64s: [1n, 2n, 3n],
      uint32s: [1, 2, 3],
      uint64s: [1n, 2n, 3n],
      sint32s: [1, 2, 3],
      sint64s: [1n, 2n, 3n],
      fixed32s: [1, 2, 3],
      fixed64s: [1n, 2n, 3n],
      sfixed32s: [1, 2, 3],
      sfixed64s: [1n, 2n, 3n],
      bools: [true, true, false]
    }

    testEncodings(obj, NewOptionExpandedTypes, './test/fixtures/packed.proto', 'NewOptionExpandedTypes')
  })
})
