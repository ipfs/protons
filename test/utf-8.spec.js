'use strict'

const tape = require('tape')
const protobuf = require('../')
const UTF8 = protobuf(require('./test.proto')).UTF8

tape('strings can be utf-8', function (t) {
  const ex = {
    foo: 'ビッグデータ「人間の解釈が必要」「量の問題ではない」論と、もう一つのビッグデータ「人間の解釈が必要」「量の問題ではない」論と、もう一つの',
    bar: 42
  }

  const b1 = UTF8.encode(ex)
  const b2 = UTF8.decode(b1)

  t.same(b2, ex)
  t.end()
})
