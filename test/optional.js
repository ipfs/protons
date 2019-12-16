'use strict'

var tape = require('tape')
var fs = require('fs')
var protobuf = require('../')
var path = require('path')
var proto = fs.readFileSync(path.join(__dirname, '/test.proto'))
var Optional = protobuf(proto).Optional

tape('optional encode + decode has zero value', function (t) {
  const o1 = {}
  const b1 = Optional.encode(o1)
  const o2 = Optional.decode(b1)

  t.same(o1.value, undefined)
  t.same(o2.value, 0)
  t.end()
})

tape('optional accessors', function (t) {
  const o1 = Optional.decode(Optional.encode({}))

  t.ok(o1.hasValue)
  t.notOk(o1.hasValue())

  t.ok(o1.setValue)
  o1.setValue(5)
  t.ok(o1.hasValue())

  t.ok(o1.getValue)
  t.same(o1.getValue(), 5)

  t.ok(o1.clearValue)
  o1.clearValue()

  t.notOk(o1.hasValue())
  t.same(o1.getValue(), undefined)

  const methods = Object.keys(o1)

  t.notOk(methods.includes('getValue'))
  t.notOk(methods.includes('setValue'))
  t.notOk(methods.includes('hasValue'))
  t.notOk(methods.includes('clearValue'))

  t.end()
})
