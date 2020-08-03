'use strict'

const encoder = require('./encoder')

function sfixed64EncodingLength () {
  return 8
}

function sfixed64Encode (val, buffer, dataView, offset) {
  for (const byte of val) {
    buffer[offset] = byte
    offset++
  }

  sfixed64Encode.bytes = 8
}

function sfixed64Decode (buffer, dataView, offset) {
  const val = buffer.slice(offset, offset + 8)
  sfixed64Decode.bytes = 8

  return val
}

module.exports = encoder(1, sfixed64Encode, sfixed64Decode, sfixed64EncodingLength)
