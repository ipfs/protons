/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { MessageWithSizeLimitedMap, MessageWithSizeLimitedRepeatedField } from './fixtures/protons-options.js'

describe('protons options', () => {
  it('should not decode message with map that is too big', () => {
    const obj: MessageWithSizeLimitedMap = {
      mapField: new Map<string, string>([['one', 'two'], ['three', 'four']])
    }

    const buf = MessageWithSizeLimitedMap.encode(obj)

    expect(() => MessageWithSizeLimitedMap.decode(buf))
      .to.throw().with.property('code', 'ERR_MAX_SIZE')
  })

  it('should not decode message with list that is too big', () => {
    const obj: MessageWithSizeLimitedRepeatedField = {
      repeatedField: ['0', '1']
    }

    const buf = MessageWithSizeLimitedRepeatedField.encode(obj)

    expect(() => MessageWithSizeLimitedRepeatedField.decode(buf))
      .to.throw().with.property('code', 'ERR_MAX_LENGTH')
  })
})
