/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { generate } from '../src/index.js'

describe('unsupported', () => {
  it('should refuse to generate source from proto2 definition', async () => {
    await expect(generate('test/fixtures/proto2.proto', {})).to.eventually.be.rejected
      .with.property('message').that.contain('"required" fields are not allowed in proto3')
  })
})
