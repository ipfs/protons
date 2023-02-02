## [protons-v7.0.0](https://github.com/ipfs/protons/compare/protons-v6.1.3...protons-v7.0.0) (2023-02-02)


### ⚠ BREAKING CHANGES

* singular fields should be optional to write (#83)

### Bug Fixes

* singular fields should be optional to write ([#83](https://github.com/ipfs/protons/issues/83)) ([229afbc](https://github.com/ipfs/protons/commit/229afbcb38ba0edc0622d4c2e97847462b439dc8)), closes [#42](https://github.com/ipfs/protons/issues/42)
* sort imports ([#84](https://github.com/ipfs/protons/issues/84)) ([6f796f1](https://github.com/ipfs/protons/commit/6f796f1e7dfd631314f9a1df534eabd96dd1528c))
* update sibling dep versions ([a77d027](https://github.com/ipfs/protons/commit/a77d027e055e442f4d1b004ebc1203e52292e7ed))


### Trivial Changes

* move bad fixtures to separate directory ([#82](https://github.com/ipfs/protons/issues/82)) ([76aa198](https://github.com/ipfs/protons/commit/76aa19882cd9fb4fa918dda6701b1f7b4ad740a4))

## [protons-v6.1.3](https://github.com/ipfs/protons/compare/protons-v6.1.2...protons-v6.1.3) (2023-01-31)


### Bug Fixes

* throw when .proto is empty ([#81](https://github.com/ipfs/protons/issues/81)) ([ed392cb](https://github.com/ipfs/protons/commit/ed392cb84847fe0be8b96c582eaca0d99d4a40d1))

## [protons-v6.1.2](https://github.com/ipfs/protons/compare/protons-v6.1.1...protons-v6.1.2) (2023-01-31)


### Bug Fixes

* throw when unsupported fields are detected ([#80](https://github.com/ipfs/protons/issues/80)) ([8108875](https://github.com/ipfs/protons/commit/81088755804629e68a0a51d3e4037e58253134fc)), closes [#34](https://github.com/ipfs/protons/issues/34)

## [protons-v6.1.1](https://github.com/ipfs/protons/compare/protons-v6.1.0...protons-v6.1.1) (2023-01-17)


### Bug Fixes

* support empty messages ([#78](https://github.com/ipfs/protons/issues/78)) ([8a02910](https://github.com/ipfs/protons/commit/8a0291096c6b9aab9050bf8b35958015d99e9470))

## [protons-v6.1.0](https://github.com/ipfs/protons/compare/protons-v6.0.2...protons-v6.1.0) (2023-01-12)


### Features

* add support for maps ([#75](https://github.com/ipfs/protons/issues/75)) ([e8dfc0a](https://github.com/ipfs/protons/commit/e8dfc0a6a7700225e2cf9c6d2e82d17979da1549))

## [protons-v6.0.2](https://github.com/ipfs/protons/compare/protons-v6.0.1...protons-v6.0.2) (2023-01-12)


### Dependencies

* remove lerna, update aegir ([#76](https://github.com/ipfs/protons/issues/76)) ([83a24f2](https://github.com/ipfs/protons/commit/83a24f2a924704bd4a356b6f8a3195245d8b1062))

## [protons-v6.0.1](https://github.com/ipfs/protons/compare/protons-v6.0.0...protons-v6.0.1) (2022-10-14)


### Dependencies

* bump meow from 10.1.5 to 11.0.0 ([#67](https://github.com/ipfs/protons/issues/67)) ([d489fd3](https://github.com/ipfs/protons/commit/d489fd35b8864fcc675da29f24b6a01f0c56d39d))
* bump uint8arrays from 3.1.1 to 4.0.2 ([#71](https://github.com/ipfs/protons/issues/71)) ([b537e92](https://github.com/ipfs/protons/commit/b537e920a6704f005ea2b7bcef49741a9c3deb96))

## [protons-v6.0.0](https://github.com/ipfs/protons/compare/protons-v5.1.0...protons-v6.0.0) (2022-10-12)


### ⚠ BREAKING CHANGES

* ts definitions will need to be generated from `.proto` files - singular message fields have become optional as message fields are always optional in proto3

### Bug Fixes

* adhere more closely to the language guide for proto3 default values ([#66](https://github.com/ipfs/protons/issues/66)) ([406d775](https://github.com/ipfs/protons/commit/406d7757d490eb0dbac93343d6622dd689ff0707)), closes [#43](https://github.com/ipfs/protons/issues/43)


### Dependencies

* update sibling dependencies ([b1316fa](https://github.com/ipfs/protons/commit/b1316fa23b6fa623bc438c6cf51c53f94759e199))

## [protons-v5.1.0](https://github.com/ipfs/protons/compare/protons-v5.0.0...protons-v5.1.0) (2022-08-11)


### Features

* define default types during decode ([#62](https://github.com/ipfs/protons/issues/62)) ([6453809](https://github.com/ipfs/protons/commit/64538091f7339f285ab6efbb0e18054970e00f33)), closes [#43](https://github.com/ipfs/protons/issues/43)

## [protons-v5.0.0](https://github.com/ipfs/protons/compare/protons-v4.0.3...protons-v5.0.0) (2022-08-10)


### ⚠ BREAKING CHANGES

* the exported types of `protons-runtime` have changed and protobuf encoders/decoders will need to be regenerated

### Bug Fixes

* increase encoding/decoding performance ([#58](https://github.com/ipfs/protons/issues/58)) ([9987b97](https://github.com/ipfs/protons/commit/9987b97cc6910dd67152c3a9c0941ae0ab0a8b9a))


### Trivial Changes

* update sibling deps ([7568283](https://github.com/ipfs/protons/commit/756828339bc1ad3fae784b28d7d218bbc55c3518))

## [protons-v4.0.3](https://github.com/ipfs/protons/compare/protons-v4.0.2...protons-v4.0.3) (2022-08-04)


### Bug Fixes

* tidy up formatting of generated code ([#57](https://github.com/ipfs/protons/issues/57)) ([387c9e9](https://github.com/ipfs/protons/commit/387c9e94abf477dbb1553295b7ac3054a82bf2ec))

## [protons-v4.0.2](https://github.com/ipfs/protons/compare/protons-v4.0.1...protons-v4.0.2) (2022-08-04)


### Bug Fixes

* single instance codec ([#55](https://github.com/ipfs/protons/issues/55)) ([66d9387](https://github.com/ipfs/protons/commit/66d9387dc32c79651873b8436391ae30125ec201)), closes [#51](https://github.com/ipfs/protons/issues/51)

## [protons-v4.0.1](https://github.com/ipfs/protons/compare/protons-v4.0.0...protons-v4.0.1) (2022-07-30)


### Bug Fixes

* use uint8-varint, byte-accesor and longbits modules ([#56](https://github.com/ipfs/protons/issues/56)) ([66d72f5](https://github.com/ipfs/protons/commit/66d72f50ca3733b97efa5155d3cdcb33ec531d4a))

## [protons-v4.0.0](https://github.com/ipfs/protons/compare/protons-v3.0.5...protons-v4.0.0) (2022-07-28)


### ⚠ BREAKING CHANGES

* Uses Uint8ArrayList v2

### Features

* support no-copy serialization ([#54](https://github.com/ipfs/protons/issues/54)) ([caa0d71](https://github.com/ipfs/protons/commit/caa0d71b60367f2f3551688ad09fd695840e0852))


### Bug Fixes

* update project config ([3199131](https://github.com/ipfs/protons/commit/3199131f1f199bcb57fcf1e7aba4ca0b6d9207db))


### Trivial Changes

* update sibling dependencies [skip ci] ([c9291e0](https://github.com/ipfs/protons/commit/c9291e03b3b6a12140a5aa62a30bd94eac559fad))

## [protons-v3.0.5](https://github.com/ipfs/protons/compare/protons-v3.0.4...protons-v3.0.5) (2022-07-28)


### Bug Fixes

* use CLI flag `--output` ([#46](https://github.com/ipfs/protons/issues/46)) ([58dc0ba](https://github.com/ipfs/protons/commit/58dc0baed9fdf4ea65f0df8fde0875cc5f210c50))

## [protons-v3.0.4](https://github.com/ipfs/protons/compare/protons-v3.0.3...protons-v3.0.4) (2022-05-10)


### Bug Fixes

* encode enum values ([#30](https://github.com/ipfs/protons/issues/30)) ([676c01d](https://github.com/ipfs/protons/commit/676c01dae7ff5b4d3985113573079ba605d83ef6))

## [protons-v3.0.3](https://github.com/ipfs/protons/compare/protons-v3.0.2...protons-v3.0.3) (2022-04-10)


### Bug Fixes

* remove redundant defs and declare codec return type ([#28](https://github.com/ipfs/protons/issues/28)) ([c3ea5ec](https://github.com/ipfs/protons/commit/c3ea5ec9101e37d8ac0437eb22ac0b4eeeb14eb7))

## [protons-v3.0.2](https://github.com/ipfs/protons/compare/protons-v3.0.1...protons-v3.0.2) (2022-04-08)


### Bug Fixes

* update aegir, make codec creation dynamic ([#26](https://github.com/ipfs/protons/issues/26)) ([ecc46cc](https://github.com/ipfs/protons/commit/ecc46ccad90696c4d5cda6b2cb1db723770577d0))


### Trivial Changes

* update readme ([#27](https://github.com/ipfs/protons/issues/27)) ([0ccb1a3](https://github.com/ipfs/protons/commit/0ccb1a36766e620eed2fb65973ff2d6c7854caf9))

## [protons-v3.0.1](https://github.com/ipfs/protons/compare/protons-v3.0.0...protons-v3.0.1) (2022-03-31)


### Trivial Changes

* remove long dep ([#22](https://github.com/ipfs/protons/issues/22)) ([8795507](https://github.com/ipfs/protons/commit/879550710b846f2448db646ba69e5938bbad8aa0))
* update readme to remove breaking character ([#21](https://github.com/ipfs/protons/issues/21)) ([023c29b](https://github.com/ipfs/protons/commit/023c29bf1839794e9daaa890b3780e3c70612ea4))

## [protons-v3.0.0](https://github.com/ipfs/protons/compare/protons-v2.0.3...protons-v3.0.0) (2022-03-31)


### ⚠ BREAKING CHANGES

* This module is now ESM only

### Features

* transpile to ts ([#17](https://github.com/ipfs/protons/issues/17)) ([74d3b7a](https://github.com/ipfs/protons/commit/74d3b7abf1e857f7320c100734e797855ea728c1))


### Trivial Changes

* update protons-runtime dep ([#19](https://github.com/ipfs/protons/issues/19)) ([e119076](https://github.com/ipfs/protons/commit/e119076f82e735a8e991cc74505e255523f83bea))
