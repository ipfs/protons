## [protons-runtime-v5.2.2](https://github.com/ipfs/protons/compare/protons-runtime-v5.2.1...protons-runtime-v5.2.2) (2024-01-08)


### Dependencies

* bump aegir from 41.3.5 to 42.0.1 ([#127](https://github.com/ipfs/protons/issues/127)) ([02eafe9](https://github.com/ipfs/protons/commit/02eafe9abc565d7719ed54b64c6ae17a55ebf235))

## [protons-runtime-v5.2.1](https://github.com/ipfs/protons/compare/protons-runtime-v5.2.0...protons-runtime-v5.2.1) (2023-12-30)


### Dependencies

* bump uint8arrays from 4.0.10 to 5.0.1 ([#126](https://github.com/ipfs/protons/issues/126)) ([1e5a0b0](https://github.com/ipfs/protons/commit/1e5a0b0608b4395283c7571353918bacc3a3bd63))

## [protons-runtime-v5.2.0](https://github.com/ipfs/protons/compare/protons-runtime-v5.1.0...protons-runtime-v5.2.0) (2023-11-01)


### Features

* add custom protons options for limiting list/map sizes ([#120](https://github.com/ipfs/protons/issues/120)) ([a5ba36b](https://github.com/ipfs/protons/commit/a5ba36bbfbfb1d2bded026e0da1251e02defacdd)), closes [#113](https://github.com/ipfs/protons/issues/113)

## [protons-runtime-v5.1.0](https://github.com/ipfs/protons/compare/protons-runtime-v5.0.5...protons-runtime-v5.1.0) (2023-10-23)


### Features

* support jstype custom options ([#117](https://github.com/ipfs/protons/issues/117)) ([ba35475](https://github.com/ipfs/protons/commit/ba354756bbec60055bbeb4a6ee5bc3ab73267312)), closes [#112](https://github.com/ipfs/protons/issues/112)

## [protons-runtime-v5.0.5](https://github.com/ipfs/protons/compare/protons-runtime-v5.0.4...protons-runtime-v5.0.5) (2023-10-13)


### Bug Fixes

* write string into output buffer as uint8array ([#118](https://github.com/ipfs/protons/issues/118)) ([03ab706](https://github.com/ipfs/protons/commit/03ab706e03cdc16ff897e4ab54d87f343a8d61db))


### Trivial Changes

* update project config ([c54b7ac](https://github.com/ipfs/protons/commit/c54b7acbc9ac3839d1ef2d2653f1d19b5a0fdbf4))

## [protons-runtime-v5.0.4](https://github.com/ipfs/protons/compare/protons-runtime-v5.0.3...protons-runtime-v5.0.4) (2023-10-13)


### Bug Fixes

* port protobuf reader/writer to ts ([#60](https://github.com/ipfs/protons/issues/60)) ([d101804](https://github.com/ipfs/protons/commit/d101804674e6ba42c28505fc8fdf605020ac319e))

## [protons-runtime-v5.0.3](https://github.com/ipfs/protons/compare/protons-runtime-v5.0.2...protons-runtime-v5.0.3) (2023-10-12)


### Dependencies

* bump aegir from 40.0.13 to 41.0.4 ([#116](https://github.com/ipfs/protons/issues/116)) ([b95e988](https://github.com/ipfs/protons/commit/b95e9881a5c842b3c70a40d6d93b4aa5219b8aee))

## [protons-runtime-v5.0.2](https://github.com/ipfs/protons/compare/protons-runtime-v5.0.1...protons-runtime-v5.0.2) (2023-08-05)


### Dependencies

* bump aegir from 39.0.13 to 40.0.8 ([#108](https://github.com/ipfs/protons/issues/108)) ([8b54c80](https://github.com/ipfs/protons/commit/8b54c8097683b055736a8e431728422cedf82697))

## [protons-runtime-v5.0.1](https://github.com/ipfs/protons/compare/protons-runtime-v5.0.0...protons-runtime-v5.0.1) (2023-06-30)


### Dependencies

* bump aegir from 38.1.8 to 39.0.13 ([#104](https://github.com/ipfs/protons/issues/104)) ([912e0e6](https://github.com/ipfs/protons/commit/912e0e627fbe8047b56cdcd5d26cb81bf5700bf8))

## [protons-runtime-v5.0.0](https://github.com/ipfs/protons/compare/protons-runtime-v4.0.2...protons-runtime-v5.0.0) (2023-02-02)


### ⚠ BREAKING CHANGES

* singular fields should be optional to write (#83)

### Bug Fixes

* singular fields should be optional to write ([#83](https://github.com/ipfs/protons/issues/83)) ([229afbc](https://github.com/ipfs/protons/commit/229afbcb38ba0edc0622d4c2e97847462b439dc8)), closes [#42](https://github.com/ipfs/protons/issues/42)
* sort imports ([#84](https://github.com/ipfs/protons/issues/84)) ([6f796f1](https://github.com/ipfs/protons/commit/6f796f1e7dfd631314f9a1df534eabd96dd1528c))

## [protons-runtime-v4.0.2](https://github.com/ipfs/protons/compare/protons-runtime-v4.0.1...protons-runtime-v4.0.2) (2023-01-12)


### Dependencies

* remove lerna, update aegir ([#76](https://github.com/ipfs/protons/issues/76)) ([83a24f2](https://github.com/ipfs/protons/commit/83a24f2a924704bd4a356b6f8a3195245d8b1062))

## [protons-runtime-v4.0.1](https://github.com/ipfs/protons/compare/protons-runtime-v4.0.0...protons-runtime-v4.0.1) (2022-10-12)


### Bug Fixes

* only import reader/writer to decrease bundle size ([#69](https://github.com/ipfs/protons/issues/69)) ([8eea129](https://github.com/ipfs/protons/commit/8eea129d1b4fe5914830b29b79c4af6348eddf73))

## [protons-runtime-v4.0.0](https://github.com/ipfs/protons/compare/protons-runtime-v3.1.0...protons-runtime-v4.0.0) (2022-10-12)


### ⚠ BREAKING CHANGES

* ts definitions will need to be generated from `.proto` files - singular message fields have become optional as message fields are always optional in proto3

### Bug Fixes

* adhere more closely to the language guide for proto3 default values ([#66](https://github.com/ipfs/protons/issues/66)) ([406d775](https://github.com/ipfs/protons/commit/406d7757d490eb0dbac93343d6622dd689ff0707)), closes [#43](https://github.com/ipfs/protons/issues/43)

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
