'use strict'

const tape = require('tape')
const protobuf = require('../')
const proto = require('./test.proto')
const NotPacked = protobuf(proto).NotPacked
const FalsePacked = protobuf(proto).FalsePacked

tape('NotPacked encode + FalsePacked decode', function (t) {
  const b1 = NotPacked.encode({
    id: [9847136125],
    value: 10000
  })

  const o1 = FalsePacked.decode(b1)

  t.same(o1.id.length, 1)
  t.same(o1.id[0], 9847136125)

  t.end()
})

tape('FalsePacked encode + NotPacked decode', function (t) {
  const b1 = FalsePacked.encode({
    id: [9847136125],
    value: 10000
  })

  const o1 = NotPacked.decode(b1)

  t.same(o1.id.length, 1)
  t.same(o1.id[0], 9847136125)

  t.end()
})
