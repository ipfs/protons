import { expect } from 'aegir/chai'
import { EnumType, MessageWithoutOneOfs, OneOfMessage } from './fixtures/oneof.ts'
import { testEncodings } from './utils/compat.ts'

describe('oneof', () => {
  it('should only encode one field', () => {
    const obj: OneOfMessage = {
      fieldOne: 'fieldOne',
      fieldTwo: 'fieldTwo',
      fieldThree: EnumType.Val2,
      fieldFour: EnumType.Val2,
      fieldFive: 'fieldFive'
    }

    const buf = OneOfMessage.encode(obj)
    const decoded = OneOfMessage.decode(buf)

    expect(decoded.fieldOne).to.be.undefined()
    expect(decoded.fieldTwo).to.equal(obj.fieldTwo)
    expect(decoded.fieldThree).to.be.undefined()
    expect(decoded.fieldFour).to.equal(obj.fieldFour)
    expect(decoded.fieldFive).to.equal(obj.fieldFive)
  })

  it('should only decode one field', () => {
    const obj: MessageWithoutOneOfs = {
      fieldOne: 'fieldOne',
      fieldTwo: 'fieldTwo',
      fieldThree: EnumType.Val2,
      fieldFour: EnumType.Val2,
      fieldFive: 'fieldFive'
    }

    const buf = MessageWithoutOneOfs.encode(obj)
    const decoded = OneOfMessage.decode(buf)

    expect(decoded.fieldOne).to.be.undefined()
    expect(decoded.fieldTwo).to.equal(obj.fieldTwo)
    expect(decoded.fieldThree).to.be.undefined()
    expect(decoded.fieldFour).to.equal(obj.fieldFour)
    expect(decoded.fieldFive).to.equal(obj.fieldFive)
  })

  it('should encode to same bytes as other implementations', () => {
    const obj: OneOfMessage = {
      fieldOne: 'fieldOne',
      fieldThree: EnumType.Val2,
      fieldFive: 'fieldFive'
    }

    testEncodings(obj, OneOfMessage, './test/fixtures/oneof.proto', 'OneOfMessage')
  })
})
