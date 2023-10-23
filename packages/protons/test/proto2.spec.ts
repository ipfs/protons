/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { MessageWithRequired } from './fixtures/proto2.js'

describe('proto2 support', () => {
  it('should write a required field with a default value', () => {
    const obj: MessageWithRequired = {
      scalarField: 0
    }

    const buf = MessageWithRequired.encode(obj)

    expect(buf).to.equalBytes([8, 0])
  })

  it('should write a required field with a non-default value', () => {
    const obj: MessageWithRequired = {
      scalarField: 5
    }

    const buf = MessageWithRequired.encode(obj)

    expect(buf).to.equalBytes([8, 5])
  })
})
