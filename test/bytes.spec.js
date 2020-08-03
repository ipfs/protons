'use strict'

const tape = require('tape')
const protobuf = require('../src')
const Bytes = protobuf(require('./test.proto')).Bytes

tape('bytes encode + decode', function (t) {
  const b1 = Bytes.encode({
    req: Uint8Array.from([0, 1, 2, 3])
  })

  const o1 = Bytes.decode(b1)

  t.same(o1, {
    req: Uint8Array.from([0, 1, 2, 3]),
    opt: null
  })
  t.notOk(o1.hasOpt())

  t.end()
})
