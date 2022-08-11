## [protons-runtime-v3.1.0](https://github.com/ipfs/protons/compare/protons-runtime-v3.0.1...protons-runtime-v3.1.0) (2022-08-11)


### Features

* define default types during decode ([#62](https://github.com/ipfs/protons/issues/62)) ([6453809](https://github.com/ipfs/protons/commit/64538091f7339f285ab6efbb0e18054970e00f33)), closes [#43](https://github.com/ipfs/protons/issues/43)

## [protons-runtime-v3.0.1](https://github.com/ipfs/protons/compare/protons-runtime-v3.0.0...protons-runtime-v3.0.1) (2022-08-10)


### Bug Fixes

* add uint8arraylist peer dep ([#61](https://github.com/ipfs/protons/issues/61)) ([eb16e86](https://github.com/ipfs/protons/commit/eb16e8690f28435c198d5f0facf5514f2d6574a3)), closes [#59](https://github.com/ipfs/protons/issues/59)

## [protons-runtime-v3.0.0](https://github.com/ipfs/protons/compare/protons-runtime-v2.0.2...protons-runtime-v3.0.0) (2022-08-10)


### ⚠ BREAKING CHANGES

* the exported types of `protons-runtime` have changed and protobuf encoders/decoders will need to be regenerated

### Bug Fixes

* increase encoding/decoding performance ([#58](https://github.com/ipfs/protons/issues/58)) ([9987b97](https://github.com/ipfs/protons/commit/9987b97cc6910dd67152c3a9c0941ae0ab0a8b9a))

## [protons-runtime-v2.0.2](https://github.com/ipfs/protons/compare/protons-runtime-v2.0.1...protons-runtime-v2.0.2) (2022-07-30)


### Bug Fixes

* use uint8-varint, byte-accesor and longbits modules ([#56](https://github.com/ipfs/protons/issues/56)) ([66d72f5](https://github.com/ipfs/protons/commit/66d72f50ca3733b97efa5155d3cdcb33ec531d4a))

## [protons-runtime-v2.0.1](https://github.com/ipfs/protons/compare/protons-runtime-v2.0.0...protons-runtime-v2.0.1) (2022-07-28)


### Bug Fixes

* update project config ([3199131](https://github.com/ipfs/protons/commit/3199131f1f199bcb57fcf1e7aba4ca0b6d9207db))

## [protons-runtime-v2.0.0](https://github.com/ipfs/protons/compare/protons-runtime-v1.0.4...protons-runtime-v2.0.0) (2022-07-28)


### ⚠ BREAKING CHANGES

* Uses Uint8ArrayList v2

### Features

* support no-copy serialization ([#54](https://github.com/ipfs/protons/issues/54)) ([caa0d71](https://github.com/ipfs/protons/commit/caa0d71b60367f2f3551688ad09fd695840e0852))

## [protons-runtime-v1.0.4](https://github.com/ipfs/protons/compare/protons-runtime-v1.0.3...protons-runtime-v1.0.4) (2022-05-10)


### Bug Fixes

* encode enum values ([#30](https://github.com/ipfs/protons/issues/30)) ([676c01d](https://github.com/ipfs/protons/commit/676c01dae7ff5b4d3985113573079ba605d83ef6))

## [protons-runtime-v1.0.3](https://github.com/ipfs/protons/compare/protons-runtime-v1.0.2...protons-runtime-v1.0.3) (2022-04-10)


### Bug Fixes

* remove redundant defs and declare codec return type ([#28](https://github.com/ipfs/protons/issues/28)) ([c3ea5ec](https://github.com/ipfs/protons/commit/c3ea5ec9101e37d8ac0437eb22ac0b4eeeb14eb7))

## [protons-runtime-v1.0.2](https://github.com/ipfs/protons/compare/protons-runtime-v1.0.1...protons-runtime-v1.0.2) (2022-04-08)


### Trivial Changes

* update readme ([#27](https://github.com/ipfs/protons/issues/27)) ([0ccb1a3](https://github.com/ipfs/protons/commit/0ccb1a36766e620eed2fb65973ff2d6c7854caf9))

## [protons-runtime-v1.0.1](https://github.com/ipfs/protons/compare/protons-runtime-v1.0.0...protons-runtime-v1.0.1) (2022-04-08)


### Bug Fixes

* update aegir, make codec creation dynamic ([#26](https://github.com/ipfs/protons/issues/26)) ([ecc46cc](https://github.com/ipfs/protons/commit/ecc46ccad90696c4d5cda6b2cb1db723770577d0))

## protons-runtime-v1.0.0 (2022-03-31)


### ⚠ BREAKING CHANGES

* This module is now ESM only

### Features

* transpile to ts ([#17](https://github.com/ipfs/protons/issues/17)) ([74d3b7a](https://github.com/ipfs/protons/commit/74d3b7abf1e857f7320c100734e797855ea728c1))
