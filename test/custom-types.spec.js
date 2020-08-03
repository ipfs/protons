'use strict'

const tape = require('tape')
const protobuf = require('../src')
const CustomType = protobuf(require('./test.proto')).CustomType

tape('custom types encode + decode', function (t) {
  var b1 = CustomType.encode({
    req: {
      num: 5,
      payload: Uint8Array.from([])
    }
  })

  var o1 = CustomType.decode(b1)

  t.same(o1, {
    req: {
      num: 5,
      payload: Uint8Array.from([])
    },
    opt: null
  })
  t.notOk(o1.hasOpt())

  t.end()
})
