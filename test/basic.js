'use strict'

const tape = require('tape')
const protobufNpm = require('protocol-buffers')
const protobuf = require('../')
const proto = require('./test.proto')
const Basic = protobuf(proto).Basic
const BasicNpm = protobufNpm(proto).Basic
const uint8ArrayFromString = require('uint8arrays/from-string')
const uint8ArrayToString = require('uint8arrays/to-string')

tape('basic encode', function (t) {
  const first = {
    num: 1,
    payload: uint8ArrayFromString('lol')
  }

  const b1 = Basic.encode(first)

  const bn1 = BasicNpm.encode({
    ...first,
    payload: 'lol' // old version does not support Uint8Arrays
  })

  t.same(uint8ArrayToString(b1, 'base16'), uint8ArrayToString(bn1, 'base16'))

  const b2 = Basic.encode({
    num: 1,
    payload: uint8ArrayFromString('lol'),
    meeeh: 42
  })

  const b3 = Basic.encode({
    num: 1,
    payload: uint8ArrayFromString('lol'),
    meeeh: 42
  })

  t.same(b2, b1)
  t.same(b3, b1)

  t.end()
})

tape('basic encode + decode', function (t) {
  const b1 = Basic.encode({
    num: 1,
    payload: uint8ArrayFromString('lol')
  })

  const o1 = Basic.decode(b1)

  t.same(o1.num, 1)
  t.same(o1.payload, uint8ArrayFromString('lol'))

  const b2 = Basic.encode({
    num: 1,
    payload: uint8ArrayFromString('lol'),
    meeeh: 42
  })

  const o2 = Basic.decode(b2)

  t.same(o2, o1)
  t.end()
})

tape('basic accessors', function (t) {
  const b1 = Basic.encode({
    num: 1,
    payload: uint8ArrayFromString('lol')
  })

  const o1 = Basic.decode(b1)

  t.ok(o1.hasNum)
  t.ok(o1.hasNum())

  t.ok(o1.setNum)
  o1.setNum(5)

  t.ok(o1.getNum)
  t.same(o1.getNum(), 5)

  t.ok(o1.clearNum)

  o1.clearNum()

  t.same(o1.getNum(), undefined)

  const methods = Object.keys(o1)

  t.notOk(methods.includes('getNum'))
  t.notOk(methods.includes('setNum'))
  t.notOk(methods.includes('hasNum'))
  t.notOk(methods.includes('clearNum'))

  t.end()
})

tape('basic encode + decode floats', function (t) {
  const b1 = Basic.encode({
    num: 1.1,
    payload: uint8ArrayFromString('lol')
  })

  const o1 = Basic.decode(b1)

  t.same(o1.num, 1.1)
  t.same(o1.payload, uint8ArrayFromString('lol'))
  t.end()
})
