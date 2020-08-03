'use strict'

const tape = require('tape')
const protobuf = require('../')
const Repeated = protobuf(require('./test.proto')).Repeated
const uint8ArrayFromString = require('uint8arrays/from-string')

tape('repeated encode', function (t) {
  const b1 = Repeated.encode({
    list: [{
      num: 1,
      payload: uint8ArrayFromString('lol')
    }, {
      num: 2,
      payload: uint8ArrayFromString('lol1')
    }]
  })

  const b2 = Repeated.encode({
    list: [{
      num: 1,
      payload: uint8ArrayFromString('lol')
    }, {
      num: 2,
      payload: uint8ArrayFromString('lol1'),
      meeeeh: 100
    }],
    meeh: 42
  })

  t.same(b2, b1)
  t.end()
})

tape('repeated encode + decode', function (t) {
  const b1 = Repeated.encode({
    list: [{
      num: 1,
      payload: uint8ArrayFromString('lol')
    }, {
      num: 2,
      payload: uint8ArrayFromString('lol1')
    }]
  })

  const o1 = Repeated.decode(b1)

  t.same(o1.list.length, 2)
  t.same(o1.list[0].num, 1)
  t.same(o1.list[0].payload, uint8ArrayFromString('lol'))
  t.same(o1.list[1].num, 2)
  t.same(o1.list[1].payload, uint8ArrayFromString('lol1'))

  const b2 = Repeated.encode({
    list: [{
      num: 1,
      payload: uint8ArrayFromString('lol')
    }, {
      num: 2,
      payload: uint8ArrayFromString('lol1'),
      meeeeh: 100
    }],
    meeh: 42
  })

  const o2 = Repeated.decode(b2)

  t.same(o2, o1)
  t.end()
})
