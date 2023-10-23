/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { generate } from '../src/index.js'

describe('unsupported', () => {
  it('should refuse to generate source from proto2 definition', async () => {
    await expect(generate('test/bad-fixtures/proto2.proto', {
      strict: true
    })).to.eventually.be.rejected
      .with.property('code', 'ERR_PARSE_ERROR')
  })

  it('should refuse to generate source from enum definition that does not start from 0', async () => {
    await expect(generate('test/bad-fixtures/enum.proto', {
      strict: true
    })).to.eventually.be.rejected
      .with.property('code', 'ERR_PARSE_ERROR')
  })

  it('should refuse to generate source from empty definition', async () => {
    await expect(generate('test/bad-fixtures/empty.proto', {})).to.eventually.be.rejected
      .with.property('code', 'ERR_NO_MESSAGES_FOUND')
  })
})
