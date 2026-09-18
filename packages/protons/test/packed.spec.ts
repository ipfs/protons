import { expect } from 'aegir/chai'
import all from 'it-all'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import { GlobalPacked } from './fixtures/packed-global.ts'
import { Proto2DefaultPackedTypes, Proto2ExpandedTypes, Proto2PackedTypes } from './fixtures/packed-proto2.ts'
import { DefaultPackedTypes, OptionExpandedTypes, OptionPackedTypes, SpecPacked } from './fixtures/packed.ts'
import { testEncodings } from './utils/compat.ts'

describe('packed', () => {
  it('should encode packed by default', () => {
      const buf = DefaultPackedTypes.encode({
        int32s: [1, 2, 3]
      })
      expect(uint8ArrayToString(buf, 'base16')).to.equal('1a03010203')
    })

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

  it('should encode new option packed types to same bytes as other implementations', () => {
    const obj: OptionPackedTypes = {
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

    testEncodings(obj, OptionPackedTypes, './test/fixtures/packed.proto', 'OptionPackedTypes')
  })

  it('should encode new option expanded types to same bytes as other implementations', () => {
    const obj: OptionExpandedTypes = {
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

    testEncodings(obj, OptionExpandedTypes, './test/fixtures/packed.proto', 'OptionExpandedTypes')
  })

  describe('global options', () => {
    it('should respect global options', () => {
      expect(uint8ArrayToString(GlobalPacked.encode({
        expanded: [1, 1]
      }), 'base16')).to.equal('08010801', 'file-level repeated-field-encoding set to expanded ignored')

      expect(uint8ArrayToString(GlobalPacked.encode({
        packedOldOption: [1, 1]
      }), 'base16')).to.equal('10011001', 'old field-level repeated-field-encoding set to packed ignored')

      expect(uint8ArrayToString(GlobalPacked.encode({
        expandedOldOption: [1, 1]
      }), 'base16')).to.equal('18011801', 'old field-level repeated-field-encoding set to expanded ignored')

      expect(uint8ArrayToString(GlobalPacked.encode({
        packedNewOption: [1, 1]
      }), 'base16')).to.equal('22020101', 'new field-level repeated-field-encoding set to packed ignored')

      expect(uint8ArrayToString(GlobalPacked.encode({
        expandedNewOption: [1, 1]
      }), 'base16')).to.equal('28012801', 'new field-level repeated-field-encoding set to expanded ignored')

      testEncodings({
        expanded: [1, 1],
        // protobufjs ignores proto2-style [packed=false] field override
        packedOldOption: [],
        expandedOldOption: [1, 1],
        packedNewOption: [1, 1],
        expandedNewOption: [1, 1]
      }, GlobalPacked, './test/fixtures/packed-global.proto', 'GlobalPacked')
    })
  })

  describe('proto2', () => {
    it('should encode expanded by default', () => {
      const buf = Proto2DefaultPackedTypes.encode({
        int32s: [1, 2, 3]
      })
      expect(uint8ArrayToString(buf, 'base16')).to.equal('180118021803')
    })

    it('should encode default packed types to same bytes as other implementations', () => {
      const obj: Proto2DefaultPackedTypes = {
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

      testEncodings(obj, Proto2DefaultPackedTypes, './test/fixtures/packed-proto2.proto', 'Proto2DefaultPackedTypes')
    })

    it('should encode packed types to same bytes as other implementations', () => {
      const obj: Proto2PackedTypes = {
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

      testEncodings(obj, Proto2PackedTypes, './test/fixtures/packed-proto2.proto', 'Proto2PackedTypes')
    })

    it('should encode expanded types to same bytes as other implementations', () => {
      const obj: Proto2ExpandedTypes = {
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

      testEncodings(obj, Proto2ExpandedTypes, './test/fixtures/packed-proto2.proto', 'Proto2ExpandedTypes')
    })
  })
})
