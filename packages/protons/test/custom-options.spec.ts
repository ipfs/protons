/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { CustomOptionNumber, CustomOptionString } from './fixtures/custom-option-jstype.js'

describe('custom options', () => {
  it('should allow overriding 64 bit numbers with numbers', () => {
    const obj: CustomOptionNumber = {
      num: 5,
      i64: 5,
      ui64: 5,
      si64: 5,
      f64: 5,
      sf64: 5
    }

    expect(CustomOptionNumber.decode(CustomOptionNumber.encode(obj)))
      .to.deep.equal(obj)
  })

  it('should allow overriding 64 bit numbers with strings', () => {
    const obj: CustomOptionString = {
      num: 5,
      i64: '5',
      ui64: '5',
      si64: '5',
      f64: '5',
      sf64: '5',
      bytes: ''
    }

    expect(CustomOptionString.decode(CustomOptionString.encode(obj)))
      .to.deep.equal(obj)
  })
})
