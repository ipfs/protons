'use strict'

const tape = require('tape')
const protobuf = require('../src')
const proto = require('./test.proto')
const Booleans = protobuf(proto).Booleans

tape('booleans encode + decode', function (t) {
  const b1 = Booleans.encode({
    bool1: true,
    bool2: false
  })

  const o1 = Booleans.decode(b1)

  t.same(o1, {
    bool1: true,
    bool2: false
  })

  t.end()
})

tape('booleans encode + decode + optional', function (t) {
  const b1 = Booleans.encode({
    bool1: true
  })

  const o1 = Booleans.decode(b1)

  t.same(o1, {
    bool1: true,
    bool2: false
  })
  t.notOk(o1.hasBool2())

  t.end()
})
