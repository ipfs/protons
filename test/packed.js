'use strict'

const tape = require('tape')
const protobuf = require('../')
const Packed = protobuf(require('./test.proto')).Packed

tape('Packed encode', function (t) {
  const b1 = Packed.encode({
    packed: [
      12,
      13,
      14
    ]
  })

  const b2 = Packed.encode({
    packed: [
      12,
      13,
      14
    ],
    meeh: 42
  })

  t.same(b2, b1)
  t.end()
})

tape('Packed encode + decode', function (t) {
  const b1 = Packed.encode({
    packed: [
      12,
      13,
      14
    ]
  })

  const o1 = Packed.decode(b1)

  t.same(o1.packed.length, 3)
  t.same(o1.packed[0], 12)
  t.same(o1.packed[1], 13)
  t.same(o1.packed[2], 14)

  const b2 = Packed.encode({
    packed: [
      12,
      13,
      14
    ],
    meeh: 42
  })

  const o2 = Packed.decode(b2)

  t.same(o2, o1)
  t.end()
})
