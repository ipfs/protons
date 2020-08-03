'use strict'

const tape = require('tape')
const protobuf = require('../src')
const Strings = protobuf(require('./test.proto')).Strings

tape('strings encode + decode', function (t) {
  const b1 = Strings.encode({
    name: 'hello',
    desc: 'world'
  })

  const o1 = Strings.decode(b1)

  t.same(o1, {
    name: 'hello',
    desc: 'world'
  })

  t.end()
})

tape('strings encode + decode + omitted', function (t) {
  const b1 = Strings.encode({
    name: 'hello'
  })

  const o1 = Strings.decode(b1)

  t.same(o1.name, 'hello')
  t.notOk(o1.hasDesc())

  t.end()
})

tape('strings empty', function (t) {
  const b1 = Strings.encode({
    name: ''
  })

  const o1 = Strings.decode(b1)

  t.same(o1.name, '')
  t.notOk(o1.hasDesc())

  t.end()
})
