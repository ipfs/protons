/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { RepeatedTypes } from './fixtures/repeated.js'

describe('repeated', () => {
  it('should encode repeated fields', () => {
    const obj: RepeatedTypes = {
      number: [],
      limitedNumber: [],
      messages: []
    }

    const buf = RepeatedTypes.encode(obj)
    expect(RepeatedTypes.decode(buf)).to.deep.equal(obj)
  })

  it('should limit repeated fields', () => {
    const obj: RepeatedTypes = {
      number: [],
      limitedNumber: [1, 2],
      messages: []
    }

    const buf = RepeatedTypes.encode(obj)
    expect(() => RepeatedTypes.decode(buf)).to.throw(/too many elements/)
  })

  it('should limit repeated fields using runtime options', () => {
    const obj: RepeatedTypes = {
      number: [1, 2],
      limitedNumber: [],
      messages: []
    }

    const buf = RepeatedTypes.encode(obj)
    expect(() => RepeatedTypes.decode(buf, {
      limits: {
        number: 1
      }
    })).to.throw(/too many elements/)
  })

  it('should limit repeating repeating fields using runtime options', () => {
    const obj: RepeatedTypes = {
      number: [],
      limitedNumber: [],
      messages: [{
        foo: ['one', 'two'],
        nonRepeating: 0,
        messages: []
      }],
      nonRepeating: 5
    }

    const buf = RepeatedTypes.encode(obj)
    expect(() => RepeatedTypes.decode(buf, {
      limits: {
        messages$: {
          foo: 1
        }
      }
    })).to.throw(/too many elements/)
  })

  it('should limit repeating nested repeating fields using runtime options', () => {
    const obj: RepeatedTypes = {
      number: [],
      limitedNumber: [],
      messages: [{
        foo: [],
        nonRepeating: 0,
        messages: [{
          foo: ['one', 'two'],
          nonRepeating: 0
        }]
      }],
      nonRepeating: 5
    }

    const buf = RepeatedTypes.encode(obj)
    expect(() => RepeatedTypes.decode(buf, {
      limits: {
        messages$: {
          messages$: {
            foo: 1
          }
        }
      }
    })).to.throw(/too many elements/)
  })

  it('should limit nested repeating fields using runtime options', () => {
    const obj: RepeatedTypes = {
      number: [],
      limitedNumber: [],
      messages: [],
      nonRepeating: 5,
      message: {
        foo: ['one', 'two'],
        messages: []
      }
    }

    const buf = RepeatedTypes.encode(obj)
    expect(() => RepeatedTypes.decode(buf, {
      limits: {
        message: {
          foo: 1
        }
      }
    })).to.throw(/too many elements/)
  })

  it('should limit nested repeating nested repeating fields using runtime options', () => {
    const obj: RepeatedTypes = {
      number: [],
      limitedNumber: [],
      messages: [],
      nonRepeating: 5,
      message: {
        foo: [],
        messages: [{
          foo: ['one', 'two']
        }]
      }
    }

    const buf = RepeatedTypes.encode(obj)
    expect(() => RepeatedTypes.decode(buf, {
      limits: {
        message: {
          messages$: {
            foo: 1
          }
        }
      }
    })).to.throw(/too many elements/)
  })
})
