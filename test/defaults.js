'use strict'

const tape = require('tape')
const protobuf = require('../')
const Defaults = protobuf(require('./test.proto')).Defaults

tape('defaults decode', function (t) {
  const o1 = Defaults.decode(new Uint8Array()) // everything default

  const b2 = Defaults.encode({
    num: 10,
    foos: [1]
  })

  const b3 = Defaults.encode({
    num: 10,
    foo2: 2
  })

  t.same(Defaults.decode(b3), {
    num: 10,
    foo1: 2,
    foo2: 2,
    foos: []
  }, '1 default')

  t.same(o1, {
    num: 42,
    foo1: 2,
    foo2: 1,
    foos: []
  }, 'all defaults')

  t.same(Defaults.decode(b2), {
    num: 10,
    foo1: 2,
    foo2: 1,
    foos: [1]
  }, '2 defaults')

  t.end()
})
