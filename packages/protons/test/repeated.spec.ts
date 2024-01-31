/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { RepeatedTypes } from './fixtures/repeated.js'

describe('repeated', () => {
  it('should encode repeated fields', () => {
    const obj: RepeatedTypes = {
      number: [],
      limitedNumber: [],
      message: []
    }

    const buf = RepeatedTypes.encode(obj)
    expect(RepeatedTypes.decode(buf)).to.deep.equal(obj)
  })

  it('should limit repeated fields', () => {
    const obj: RepeatedTypes = {
      number: [],
      limitedNumber: [1, 2],
      message: []
    }

    const buf = RepeatedTypes.encode(obj)
    expect(() => RepeatedTypes.decode(buf)).to.throw(/too many elements/)
  })

  it('should limit repeated fields using runtime options', () => {
    const obj: RepeatedTypes = {
      number: [1, 2],
      limitedNumber: [],
      message: []
    }

    const buf = RepeatedTypes.encode(obj)
    expect(() => RepeatedTypes.decode(buf, {
      limits: {
        number: 1
      }
    })).to.throw(/too many elements/)
  })
})
