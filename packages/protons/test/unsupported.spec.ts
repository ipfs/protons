/* eslint-env mocha */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { expect } from 'aegir/chai'
import { execa } from 'execa'

describe('unsupported', () => {
  it('should refuse to generate source from proto2 definition', async () => {
    await expect(execa('dist/bin/protons.js', ['./test/fixtures/proto2.proto'])).to.eventually.be.rejected()
      .with.property('stderr').that.contain('"required" fields are not allowed in proto3')
  })
})
