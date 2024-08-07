## [3.1.1](https://github.com/ipfs/protons/compare/v3.1.0...v3.1.1) (2024-08-08)

### Bug Fixes

* add publish script ([68e1092](https://github.com/ipfs/protons/commit/68e109298e34c1fdb58252288d5c0ddad00ec1a3))

## [3.1.0](https://github.com/ipfs/protons/compare/v3.0.1...v3.1.0) (2024-08-07)

### Features

* add error names ([#140](https://github.com/ipfs/protons/issues/140)) ([2a3b047](https://github.com/ipfs/protons/commit/2a3b0470d037237da67627cfa9c8f2027af9917d))

## [3.0.1](https://github.com/ipfs/protons/compare/v3.0.0...v3.0.1) (2024-08-07)

### Dependencies

* bump @bufbuild/protobuf from 1.10.0 to 2.0.0 ([#139](https://github.com/ipfs/protons/issues/139)) ([bbe93a2](https://github.com/ipfs/protons/commit/bbe93a21b45d52982e96c78b3da422147185842e))

## [3.0.0](https://github.com/ipfs/protons/compare/v2.0.3...v3.0.0) (2024-08-07)

### ⚠ BREAKING CHANGES

* singular fields should be optional to write (#83)
* ts definitions will need to be generated from `.proto` files - singular message fields have become optional as message fields are always optional in proto3
* the exported types of `protons-runtime` have changed and protobuf encoders/decoders will need to be regenerated
* Uses Uint8ArrayList v2
* This module is now ESM only

### Features

* add custom protons options for limiting list/map sizes ([#120](https://github.com/ipfs/protons/issues/120)) ([a5ba36b](https://github.com/ipfs/protons/commit/a5ba36bbfbfb1d2bded026e0da1251e02defacdd)), closes [#113](https://github.com/ipfs/protons/issues/113)
* add strict option to CLI ([#119](https://github.com/ipfs/protons/issues/119)) ([8c039c5](https://github.com/ipfs/protons/commit/8c039c50c0085bd496d684ffc42b30ae786f4a52))
* add support for maps ([#75](https://github.com/ipfs/protons/issues/75)) ([e8dfc0a](https://github.com/ipfs/protons/commit/e8dfc0a6a7700225e2cf9c6d2e82d17979da1549))
* allow limiting nested repeating fields ([#129](https://github.com/ipfs/protons/issues/129)) ([a81f997](https://github.com/ipfs/protons/commit/a81f997a490cdcc7c59d00fe5e8b666e54230745))
* define default types during decode ([#62](https://github.com/ipfs/protons/issues/62)) ([6453809](https://github.com/ipfs/protons/commit/64538091f7339f285ab6efbb0e18054970e00f33)), closes [#43](https://github.com/ipfs/protons/issues/43)
* runtime size limits for arrays and maps ([#128](https://github.com/ipfs/protons/issues/128)) ([a737d05](https://github.com/ipfs/protons/commit/a737d05d8cd8b22568ff489d07c9e4c824cb4f40))
* support jstype custom options ([#117](https://github.com/ipfs/protons/issues/117)) ([ba35475](https://github.com/ipfs/protons/commit/ba354756bbec60055bbeb4a6ee5bc3ab73267312)), closes [#112](https://github.com/ipfs/protons/issues/112)
* support no-copy serialization ([#54](https://github.com/ipfs/protons/issues/54)) ([caa0d71](https://github.com/ipfs/protons/commit/caa0d71b60367f2f3551688ad09fd695840e0852))
* transpile to ts ([#17](https://github.com/ipfs/protons/issues/17)) ([74d3b7a](https://github.com/ipfs/protons/commit/74d3b7abf1e857f7320c100734e797855ea728c1))

### Bug Fixes

* add uint8arraylist peer dep ([#61](https://github.com/ipfs/protons/issues/61)) ([eb16e86](https://github.com/ipfs/protons/commit/eb16e8690f28435c198d5f0facf5514f2d6574a3)), closes [#59](https://github.com/ipfs/protons/issues/59)
* adhere more closely to the language guide for proto3 default values ([#66](https://github.com/ipfs/protons/issues/66)) ([406d775](https://github.com/ipfs/protons/commit/406d7757d490eb0dbac93343d6622dd689ff0707)), closes [#43](https://github.com/ipfs/protons/issues/43)
* encode enum values ([#30](https://github.com/ipfs/protons/issues/30)) ([676c01d](https://github.com/ipfs/protons/commit/676c01dae7ff5b4d3985113573079ba605d83ef6))
* improve uint64 perf ([#122](https://github.com/ipfs/protons/issues/122)) ([3234bb6](https://github.com/ipfs/protons/commit/3234bb61eac82ebbc40925df084793efbb0f0186))
* increase encoding/decoding performance ([#58](https://github.com/ipfs/protons/issues/58)) ([9987b97](https://github.com/ipfs/protons/commit/9987b97cc6910dd67152c3a9c0941ae0ab0a8b9a))
* only import reader/writer to decrease bundle size ([#69](https://github.com/ipfs/protons/issues/69)) ([8eea129](https://github.com/ipfs/protons/commit/8eea129d1b4fe5914830b29b79c4af6348eddf73))
* port protobuf reader/writer to ts ([#60](https://github.com/ipfs/protons/issues/60)) ([d101804](https://github.com/ipfs/protons/commit/d101804674e6ba42c28505fc8fdf605020ac319e))
* remove redundant defs and declare codec return type ([#28](https://github.com/ipfs/protons/issues/28)) ([c3ea5ec](https://github.com/ipfs/protons/commit/c3ea5ec9101e37d8ac0437eb22ac0b4eeeb14eb7))
* remove writing default values ([#88](https://github.com/ipfs/protons/issues/88)) ([078c62f](https://github.com/ipfs/protons/commit/078c62f569fab2163ccb5772d796b56f5e7adf37))
* single instance codec ([#55](https://github.com/ipfs/protons/issues/55)) ([66d9387](https://github.com/ipfs/protons/commit/66d9387dc32c79651873b8436391ae30125ec201)), closes [#51](https://github.com/ipfs/protons/issues/51)
* singular fields should be optional to write ([#83](https://github.com/ipfs/protons/issues/83)) ([229afbc](https://github.com/ipfs/protons/commit/229afbcb38ba0edc0622d4c2e97847462b439dc8)), closes [#42](https://github.com/ipfs/protons/issues/42)
* sort imports ([#84](https://github.com/ipfs/protons/issues/84)) ([6f796f1](https://github.com/ipfs/protons/commit/6f796f1e7dfd631314f9a1df534eabd96dd1528c))
* support empty messages ([#78](https://github.com/ipfs/protons/issues/78)) ([8a02910](https://github.com/ipfs/protons/commit/8a0291096c6b9aab9050bf8b35958015d99e9470))
* throw when .proto is empty ([#81](https://github.com/ipfs/protons/issues/81)) ([ed392cb](https://github.com/ipfs/protons/commit/ed392cb84847fe0be8b96c582eaca0d99d4a40d1))
* throw when unsupported fields are detected ([#80](https://github.com/ipfs/protons/issues/80)) ([8108875](https://github.com/ipfs/protons/commit/81088755804629e68a0a51d3e4037e58253134fc)), closes [#34](https://github.com/ipfs/protons/issues/34)
* tidy up formatting of generated code ([#57](https://github.com/ipfs/protons/issues/57)) ([387c9e9](https://github.com/ipfs/protons/commit/387c9e94abf477dbb1553295b7ac3054a82bf2ec))
* treat nested enums as enums and not messages ([#87](https://github.com/ipfs/protons/issues/87)) ([3af689b](https://github.com/ipfs/protons/commit/3af689b08975aa686b23beb33622264af18b4697))
* update aegir, make codec creation dynamic ([#26](https://github.com/ipfs/protons/issues/26)) ([ecc46cc](https://github.com/ipfs/protons/commit/ecc46ccad90696c4d5cda6b2cb1db723770577d0))
* update project config ([3199131](https://github.com/ipfs/protons/commit/3199131f1f199bcb57fcf1e7aba4ca0b6d9207db))
* update sibling dep versions ([a77d027](https://github.com/ipfs/protons/commit/a77d027e055e442f4d1b004ebc1203e52292e7ed))
* use CLI flag `--output` ([#46](https://github.com/ipfs/protons/issues/46)) ([58dc0ba](https://github.com/ipfs/protons/commit/58dc0baed9fdf4ea65f0df8fde0875cc5f210c50))
* use uint8-varint, byte-accesor and longbits modules ([#56](https://github.com/ipfs/protons/issues/56)) ([66d72f5](https://github.com/ipfs/protons/commit/66d72f50ca3733b97efa5155d3cdcb33ec531d4a))
* use uint8arrays alloc for new buffers ([#123](https://github.com/ipfs/protons/issues/123)) ([d1bfc94](https://github.com/ipfs/protons/commit/d1bfc948940dbff3e5fe25ab09d7df9d8367d191))
* write string into output buffer as uint8array ([#118](https://github.com/ipfs/protons/issues/118)) ([03ab706](https://github.com/ipfs/protons/commit/03ab706e03cdc16ff897e4ab54d87f343a8d61db))

### Trivial Changes

* add or force update .github/workflows/js-test-and-release.yml ([#111](https://github.com/ipfs/protons/issues/111)) ([9898b47](https://github.com/ipfs/protons/commit/9898b479255dad67ab960a9d8c4e7642f5f86b59))
* add protobuf-ts to benchmarks ([#68](https://github.com/ipfs/protons/issues/68)) ([559191d](https://github.com/ipfs/protons/commit/559191dfb8fcd3302e8e0163a86d12fa8bef7f09))
* benchmark Protobuf-ES ([#89](https://github.com/ipfs/protons/issues/89)) ([47a4dcb](https://github.com/ipfs/protons/commit/47a4dcb5a774e6f10ed0cd52b1f5be411416a441))
* delete templates [skip ci] ([#110](https://github.com/ipfs/protons/issues/110)) ([196ca52](https://github.com/ipfs/protons/commit/196ca52f8673afb1858524063a23fc65b3a82ba1))
* fix generated code ([b6a9c18](https://github.com/ipfs/protons/commit/b6a9c1840e8ef0b7d3a4ddadb669f0b08d5bb55d))
* move bad fixtures to separate directory ([#82](https://github.com/ipfs/protons/issues/82)) ([76aa198](https://github.com/ipfs/protons/commit/76aa19882cd9fb4fa918dda6701b1f7b4ad740a4))
* **release:** 1.0.0 [skip ci] ([5aa82f7](https://github.com/ipfs/protons/commit/5aa82f72a642b32569b686f7a1e36a94332f5e53)), closes [#17](https://github.com/ipfs/protons/issues/17)
* **release:** 1.0.1 [skip ci] ([398f066](https://github.com/ipfs/protons/commit/398f066eea1c1aec6748fbc42f7709554e520f66)), closes [#26](https://github.com/ipfs/protons/issues/26)
* **release:** 1.0.2 [skip ci] ([193dbfe](https://github.com/ipfs/protons/commit/193dbfe6e6f3aa2890f3b7668eb40437957f3cc3)), closes [#27](https://github.com/ipfs/protons/issues/27)
* **release:** 1.0.3 [skip ci] ([6a078c0](https://github.com/ipfs/protons/commit/6a078c04cd207ee9b93e8aef92a7fdadf16ebdb1)), closes [#28](https://github.com/ipfs/protons/issues/28)
* **release:** 1.0.4 [skip ci] ([ab0d4ac](https://github.com/ipfs/protons/commit/ab0d4ac2c47bec109dcc3d8c27edfa3400c23e5b)), closes [#30](https://github.com/ipfs/protons/issues/30)
* **release:** 2.0.0 [skip ci] ([3fec56a](https://github.com/ipfs/protons/commit/3fec56ad2cbc09b2f5f83f8eee4b3a45b01ecd4c)), closes [#54](https://github.com/ipfs/protons/issues/54)
* **release:** 2.0.1 [skip ci] ([b2d78dd](https://github.com/ipfs/protons/commit/b2d78dda6c0d74b69439cf57c1b2571f19f9d31d))
* **release:** 2.0.2 [skip ci] ([8bf01d0](https://github.com/ipfs/protons/commit/8bf01d0dfde8fdb126b6399a37671d5fa133ea86)), closes [#56](https://github.com/ipfs/protons/issues/56)
* **release:** 3.0.0 [skip ci] ([fd1622d](https://github.com/ipfs/protons/commit/fd1622d922b162812e52866f0e92b4c6bfb738b7)), closes [#58](https://github.com/ipfs/protons/issues/58)
* **release:** 3.0.0 [skip ci] ([6fd81c1](https://github.com/ipfs/protons/commit/6fd81c16fc7c4e384607722b8056a4ad96d10c67)), closes [#17](https://github.com/ipfs/protons/issues/17) [#19](https://github.com/ipfs/protons/issues/19)
* **release:** 3.0.1 [skip ci] ([25e46dd](https://github.com/ipfs/protons/commit/25e46ddfd011343d18c0a595b106c896b6ee7685)), closes [#59](https://github.com/ipfs/protons/issues/59)
* **release:** 3.0.1 [skip ci] ([64fe094](https://github.com/ipfs/protons/commit/64fe094ffb754da90eef374b5501bf98bc3d2f62)), closes [#22](https://github.com/ipfs/protons/issues/22) [#21](https://github.com/ipfs/protons/issues/21)
* **release:** 3.0.2 [skip ci] ([f85d3fb](https://github.com/ipfs/protons/commit/f85d3fbb48c8ae0339560aff2b9127e615563ce8)), closes [#26](https://github.com/ipfs/protons/issues/26) [#27](https://github.com/ipfs/protons/issues/27)
* **release:** 3.0.3 [skip ci] ([d85a9f4](https://github.com/ipfs/protons/commit/d85a9f4514b63b36564db744d403c71a86df9ce7)), closes [#28](https://github.com/ipfs/protons/issues/28)
* **release:** 3.0.4 [skip ci] ([9915f7c](https://github.com/ipfs/protons/commit/9915f7c20915804fc7c3d2eaead5e849eb5c44b4)), closes [#30](https://github.com/ipfs/protons/issues/30)
* **release:** 3.0.5 [skip ci] ([9b973ee](https://github.com/ipfs/protons/commit/9b973eea174db90ee930b15582b980fb41e4100b)), closes [#46](https://github.com/ipfs/protons/issues/46)
* **release:** 3.1.0 [skip ci] ([d1b93c8](https://github.com/ipfs/protons/commit/d1b93c872788344b2d4497b93106445baedc006e)), closes [#43](https://github.com/ipfs/protons/issues/43)
* **release:** 4.0.0 [skip ci] ([7a02ec4](https://github.com/ipfs/protons/commit/7a02ec476639b0272db1879b23a303c3945eb6bd)), closes [#43](https://github.com/ipfs/protons/issues/43)
* **release:** 4.0.0 [skip ci] ([6ec6ef9](https://github.com/ipfs/protons/commit/6ec6ef9e2f87656b7c28ce5a9ec67066821d2edc)), closes [#54](https://github.com/ipfs/protons/issues/54)
* **release:** 4.0.1 [skip ci] ([4f92c90](https://github.com/ipfs/protons/commit/4f92c903997f0cfe56057317705e16c356f28417)), closes [#69](https://github.com/ipfs/protons/issues/69)
* **release:** 4.0.1 [skip ci] ([8991c51](https://github.com/ipfs/protons/commit/8991c51033bf06fe0515163ff31c3c29e1216c9f)), closes [#56](https://github.com/ipfs/protons/issues/56)
* **release:** 4.0.2 [skip ci] ([3317a6a](https://github.com/ipfs/protons/commit/3317a6a4832729e0fd39e234ffdc4d83d90a45f1)), closes [#76](https://github.com/ipfs/protons/issues/76)
* **release:** 4.0.2 [skip ci] ([411c017](https://github.com/ipfs/protons/commit/411c0172d5d2ee599667260399e7ad7568eb7e56)), closes [#51](https://github.com/ipfs/protons/issues/51)
* **release:** 4.0.3 [skip ci] ([dab81db](https://github.com/ipfs/protons/commit/dab81db124c44c0fb300e6ada67b9c467a9cc766)), closes [#57](https://github.com/ipfs/protons/issues/57)
* **release:** 5.0.0 [skip ci] ([63827d9](https://github.com/ipfs/protons/commit/63827d9bac43bba9d13dd99102d89bfc67095f5d)), closes [#83](https://github.com/ipfs/protons/issues/83) [#42](https://github.com/ipfs/protons/issues/42) [#84](https://github.com/ipfs/protons/issues/84)
* **release:** 5.0.0 [skip ci] ([98a66fb](https://github.com/ipfs/protons/commit/98a66fb150ca4e08aa52cb234a518dbf5aa5bebe)), closes [#58](https://github.com/ipfs/protons/issues/58)
* **release:** 5.0.1 [skip ci] ([bd29083](https://github.com/ipfs/protons/commit/bd2908333562b39b6fc2456c38cf93eb6a0a19ca)), closes [#104](https://github.com/ipfs/protons/issues/104)
* **release:** 5.0.2 [skip ci] ([877d54e](https://github.com/ipfs/protons/commit/877d54e31d54778fdcbe03156a6bfea55035cd5a)), closes [#108](https://github.com/ipfs/protons/issues/108)
* **release:** 5.0.3 [skip ci] ([f29febd](https://github.com/ipfs/protons/commit/f29febdb6cef412b1faf96a4b65da4c2a31f76f5)), closes [#116](https://github.com/ipfs/protons/issues/116)
* **release:** 5.0.4 [skip ci] ([17b7a90](https://github.com/ipfs/protons/commit/17b7a9051b5f2e13494ce1cfda7c298563cb17fe)), closes [#60](https://github.com/ipfs/protons/issues/60)
* **release:** 5.0.5 [skip ci] ([2f71170](https://github.com/ipfs/protons/commit/2f71170a7229a906182baa2e24dcf503abefa07e)), closes [#118](https://github.com/ipfs/protons/issues/118)
* **release:** 5.1.0 [skip ci] ([17aaad9](https://github.com/ipfs/protons/commit/17aaad92e9907f2529cbc17a491ea354d272929e)), closes [#112](https://github.com/ipfs/protons/issues/112)
* **release:** 5.1.0 [skip ci] ([97dca54](https://github.com/ipfs/protons/commit/97dca5461feec641e6b381a8c088afde88b1f97f)), closes [#43](https://github.com/ipfs/protons/issues/43)
* **release:** 5.2.0 [skip ci] ([dfdee5a](https://github.com/ipfs/protons/commit/dfdee5a7feb302cb8d061fca44c683fa8998ff91)), closes [#113](https://github.com/ipfs/protons/issues/113)
* **release:** 5.2.1 [skip ci] ([ddf1331](https://github.com/ipfs/protons/commit/ddf1331b6bc5b172228c00b8da3f8c3eed74fc90)), closes [#126](https://github.com/ipfs/protons/issues/126)
* **release:** 5.2.2 [skip ci] ([0c4f28e](https://github.com/ipfs/protons/commit/0c4f28e41adcec68c1ac4c52c73a70b78e1aa833)), closes [#127](https://github.com/ipfs/protons/issues/127)
* **release:** 5.3.0 [skip ci] ([665cd1a](https://github.com/ipfs/protons/commit/665cd1a7236aa63d3a47e53bf3ffde70ad98e576)), closes [#128](https://github.com/ipfs/protons/issues/128) [#122](https://github.com/ipfs/protons/issues/122)
* **release:** 5.4.0 [skip ci] ([3501b09](https://github.com/ipfs/protons/commit/3501b097f11de279ef19c33baa0fb7fc62625a31)), closes [#129](https://github.com/ipfs/protons/issues/129)
* **release:** 6.0.0 [skip ci] ([dc0de7d](https://github.com/ipfs/protons/commit/dc0de7dd67eadeb7fe6d8500d83c5e66f303e554)), closes [#43](https://github.com/ipfs/protons/issues/43)
* **release:** 6.0.1 [skip ci] ([d5625d2](https://github.com/ipfs/protons/commit/d5625d2a4fc285afadba336e8e89dab07ce3cda2)), closes [#67](https://github.com/ipfs/protons/issues/67) [#71](https://github.com/ipfs/protons/issues/71)
* **release:** 6.0.2 [skip ci] ([26c569d](https://github.com/ipfs/protons/commit/26c569d045e0b2b8403837f331fa53c978077080)), closes [#76](https://github.com/ipfs/protons/issues/76)
* **release:** 6.1.0 [skip ci] ([51746ec](https://github.com/ipfs/protons/commit/51746ec22fcc4337e3975a2a5eff871b336ab5e9)), closes [#75](https://github.com/ipfs/protons/issues/75)
* **release:** 6.1.1 [skip ci] ([3ac2c56](https://github.com/ipfs/protons/commit/3ac2c56d7878983aa053fefbdc30ff1147391055)), closes [#78](https://github.com/ipfs/protons/issues/78)
* **release:** 6.1.2 [skip ci] ([a34a908](https://github.com/ipfs/protons/commit/a34a908ded3e94c052dce367e3521bbe75a9bc68)), closes [#34](https://github.com/ipfs/protons/issues/34)
* **release:** 6.1.3 [skip ci] ([311b622](https://github.com/ipfs/protons/commit/311b622123a33871ef583934e6ca456fef6b13f5)), closes [#81](https://github.com/ipfs/protons/issues/81)
* **release:** 7.0.0 [skip ci] ([62b2053](https://github.com/ipfs/protons/commit/62b20538399064790e05791a9f282cc97f15c6c5)), closes [#83](https://github.com/ipfs/protons/issues/83) [#42](https://github.com/ipfs/protons/issues/42) [#84](https://github.com/ipfs/protons/issues/84) [#82](https://github.com/ipfs/protons/issues/82)
* **release:** 7.0.1 [skip ci] ([198e9a7](https://github.com/ipfs/protons/commit/198e9a7e692e56cf84afa2894aa9b54134121539)), closes [#87](https://github.com/ipfs/protons/issues/87)
* **release:** 7.0.2 [skip ci] ([c7b136e](https://github.com/ipfs/protons/commit/c7b136e704a6c5463e884c3d46673fe01e888077)), closes [#88](https://github.com/ipfs/protons/issues/88)
* **release:** 7.0.3 [skip ci] ([63eea21](https://github.com/ipfs/protons/commit/63eea21f2026e05cbfb60b6cebea951dd89c34a0)), closes [#104](https://github.com/ipfs/protons/issues/104)
* **release:** 7.0.4 [skip ci] ([655a2f7](https://github.com/ipfs/protons/commit/655a2f748f7d2e530de56917e2b6bb9750048a2b)), closes [#97](https://github.com/ipfs/protons/issues/97)
* **release:** 7.0.5 [skip ci] ([5f77393](https://github.com/ipfs/protons/commit/5f773934d32d7ac4dee5f1767a98fe050cbea966)), closes [#108](https://github.com/ipfs/protons/issues/108)
* **release:** 7.0.6 [skip ci] ([d8c4e6b](https://github.com/ipfs/protons/commit/d8c4e6bc6992238272af03c70f69e834bd2e5a78)), closes [#116](https://github.com/ipfs/protons/issues/116)
* **release:** 7.0.7 [skip ci] ([1d6e843](https://github.com/ipfs/protons/commit/1d6e8436f58b26c821120961b4eb5dadde907048)), closes [#60](https://github.com/ipfs/protons/issues/60)
* **release:** 7.1.0 [skip ci] ([d5bf315](https://github.com/ipfs/protons/commit/d5bf31541cf1ffc8fabc6a89501d319cb436e691)), closes [#119](https://github.com/ipfs/protons/issues/119)
* **release:** 7.2.0 [skip ci] ([47359ee](https://github.com/ipfs/protons/commit/47359eea71f789050eec00e6ebf744637d7b8e1f)), closes [#112](https://github.com/ipfs/protons/issues/112)
* **release:** 7.2.1 [skip ci] ([cbfe768](https://github.com/ipfs/protons/commit/cbfe7682f215a6ca1c04b810a542481fb8cdb30b))
* **release:** 7.3.0 [skip ci] ([23073eb](https://github.com/ipfs/protons/commit/23073ebb3b42c249c9ffc8d2d958ad170e76481c)), closes [#113](https://github.com/ipfs/protons/issues/113)
* **release:** 7.3.1 [skip ci] ([d850acf](https://github.com/ipfs/protons/commit/d850acf0de7614a8275b0ac7cea7e5c57e0ef212)), closes [#123](https://github.com/ipfs/protons/issues/123)
* **release:** 7.3.2 [skip ci] ([a6014c6](https://github.com/ipfs/protons/commit/a6014c6ae6053968fd377835535c7ea7a9d40b84)), closes [#125](https://github.com/ipfs/protons/issues/125)
* **release:** 7.3.3 [skip ci] ([aa3829c](https://github.com/ipfs/protons/commit/aa3829c695df1972d930422969e7c5f32a82ad5c)), closes [#126](https://github.com/ipfs/protons/issues/126)
* **release:** 7.3.4 [skip ci] ([9f03e47](https://github.com/ipfs/protons/commit/9f03e4713dd99b9dd6e73c29f185b2b9bbb73ab8)), closes [#127](https://github.com/ipfs/protons/issues/127)
* **release:** 7.4.0 [skip ci] ([d56d627](https://github.com/ipfs/protons/commit/d56d6276722aa0f50f3a7e89dec61676173e56c5)), closes [#128](https://github.com/ipfs/protons/issues/128)
* **release:** 7.5.0 [skip ci] ([3560e6e](https://github.com/ipfs/protons/commit/3560e6e6034b7e6adabf6e2c596ebcde2c73c8b0)), closes [#129](https://github.com/ipfs/protons/issues/129)
* remove long dep ([#22](https://github.com/ipfs/protons/issues/22)) ([8795507](https://github.com/ipfs/protons/commit/879550710b846f2448db646ba69e5938bbad8aa0))
* remove old example ([#20](https://github.com/ipfs/protons/issues/20)) ([00ccc6a](https://github.com/ipfs/protons/commit/00ccc6aed11637cc7458ad9dde6a2855e87a02ca))
* remove redundant dep ([a53620a](https://github.com/ipfs/protons/commit/a53620adc168b55005cddca556eb890453092de9))
* Update .github/workflows/stale.yml [skip ci] ([01e2b69](https://github.com/ipfs/protons/commit/01e2b6926c47202dc2e60774550d35a886b817c4))
* Update .github/workflows/stale.yml [skip ci] ([e86d817](https://github.com/ipfs/protons/commit/e86d817da9774d39013948ba846daed2fa294661))
* Update .github/workflows/stale.yml [skip ci] ([8102b91](https://github.com/ipfs/protons/commit/8102b9198621aef8152fcf8e3e2a57f6dce53723))
* Update .github/workflows/stale.yml [skip ci] ([d4f2a98](https://github.com/ipfs/protons/commit/d4f2a98ebe5af082e2819470ff9a91e84693443b))
* Update .github/workflows/stale.yml [skip ci] ([aa0601c](https://github.com/ipfs/protons/commit/aa0601c2efc091488c8f47f04f92b2ac93ee4a8b))
* update project config ([c54b7ac](https://github.com/ipfs/protons/commit/c54b7acbc9ac3839d1ef2d2653f1d19b5a0fdbf4))
* update protons-runtime dep ([#19](https://github.com/ipfs/protons/issues/19)) ([e119076](https://github.com/ipfs/protons/commit/e119076f82e735a8e991cc74505e255523f83bea))
* update publish config ([942e050](https://github.com/ipfs/protons/commit/942e050bc0c14d3c8177da218f178d8dab1c0333))
* update sibling dependencies [skip ci] ([a74ff6a](https://github.com/ipfs/protons/commit/a74ff6a31b22cec5388c573944a7a1b7b2350aa0))
* update sibling dependencies [skip ci] ([c9291e0](https://github.com/ipfs/protons/commit/c9291e03b3b6a12140a5aa62a30bd94eac559fad))
* update sibling dependencies [skip ci] ([c476d9d](https://github.com/ipfs/protons/commit/c476d9d3c599729d44d37abbca7d9a838a36e62e))
* update sibling deps ([7568283](https://github.com/ipfs/protons/commit/756828339bc1ad3fae784b28d7d218bbc55c3518))

### Documentation

* update readme ([#27](https://github.com/ipfs/protons/issues/27)) ([0ccb1a3](https://github.com/ipfs/protons/commit/0ccb1a36766e620eed2fb65973ff2d6c7854caf9))
* update readme to remove breaking character ([#21](https://github.com/ipfs/protons/issues/21)) ([023c29b](https://github.com/ipfs/protons/commit/023c29bf1839794e9daaa890b3780e3c70612ea4))

### Dependencies

* bump @bufbuild/protoc-gen-es from 1.10.0 to 2.0.0 ([#138](https://github.com/ipfs/protons/issues/138)) ([66d178f](https://github.com/ipfs/protons/commit/66d178f2f18169af52a1dd363e44fb6b6744613b))
* bump aegir from 38.1.8 to 39.0.13 ([#104](https://github.com/ipfs/protons/issues/104)) ([912e0e6](https://github.com/ipfs/protons/commit/912e0e627fbe8047b56cdcd5d26cb81bf5700bf8))
* bump aegir from 39.0.13 to 40.0.8 ([#108](https://github.com/ipfs/protons/issues/108)) ([8b54c80](https://github.com/ipfs/protons/commit/8b54c8097683b055736a8e431728422cedf82697))
* bump aegir from 40.0.13 to 41.0.4 ([#116](https://github.com/ipfs/protons/issues/116)) ([b95e988](https://github.com/ipfs/protons/commit/b95e9881a5c842b3c70a40d6d93b4aa5219b8aee))
* bump aegir from 41.3.5 to 42.0.1 ([#127](https://github.com/ipfs/protons/issues/127)) ([02eafe9](https://github.com/ipfs/protons/commit/02eafe9abc565d7719ed54b64c6ae17a55ebf235))
* bump aegir from 42.2.11 to 44.1.0 ([#137](https://github.com/ipfs/protons/issues/137)) ([63f5784](https://github.com/ipfs/protons/commit/63f5784fb42af9720f6e38a0ae3b9e79191d8fae))
* bump lerna from 5.6.2 to 6.0.0 ([#70](https://github.com/ipfs/protons/issues/70)) ([17fc762](https://github.com/ipfs/protons/commit/17fc762f5e405f1b11798596ae48994456b647ca))
* bump meow from 10.1.5 to 11.0.0 ([#67](https://github.com/ipfs/protons/issues/67)) ([d489fd3](https://github.com/ipfs/protons/commit/d489fd35b8864fcc675da29f24b6a01f0c56d39d))
* bump meow from 11.0.0 to 12.0.1 ([#97](https://github.com/ipfs/protons/issues/97)) ([33250df](https://github.com/ipfs/protons/commit/33250df60fc3f613126fe3a8b1043547e2d6779e))
* bump meow from 12.1.1 to 13.0.0 ([#125](https://github.com/ipfs/protons/issues/125)) ([2b356b8](https://github.com/ipfs/protons/commit/2b356b87619cdcadbbcde6f4d8c4c35cb252d970))
* bump uint8arrays from 3.1.1 to 4.0.2 ([#71](https://github.com/ipfs/protons/issues/71)) ([b537e92](https://github.com/ipfs/protons/commit/b537e920a6704f005ea2b7bcef49741a9c3deb96))
* bump uint8arrays from 4.0.10 to 5.0.1 ([#126](https://github.com/ipfs/protons/issues/126)) ([1e5a0b0](https://github.com/ipfs/protons/commit/1e5a0b0608b4395283c7571353918bacc3a3bd63))
* **dev:** bump lerna from 4.0.0 to 5.3.0 ([#53](https://github.com/ipfs/protons/issues/53)) ([eebccc3](https://github.com/ipfs/protons/commit/eebccc3af1e679b5e5755c04a9b2b7018bee41c8))
* remove lerna, update aegir ([#76](https://github.com/ipfs/protons/issues/76)) ([83a24f2](https://github.com/ipfs/protons/commit/83a24f2a924704bd4a356b6f8a3195245d8b1062))
* update sibling dependencies ([188704d](https://github.com/ipfs/protons/commit/188704d49866b2aafab5b8b3219038891f0a3575))
* update sibling dependencies ([068e25a](https://github.com/ipfs/protons/commit/068e25a326f84cb65985b3e0bb793437fd81b7da))
* update sibling dependencies ([b1316fa](https://github.com/ipfs/protons/commit/b1316fa23b6fa623bc438c6cf51c53f94759e199))
* update sibling dependencies ([a7d567d](https://github.com/ipfs/protons/commit/a7d567dfe94e9118f68a5f7f8f68e451188e8a69))

### Tests

* regenerate custom options ([768573b](https://github.com/ipfs/protons/commit/768573b5f607fb80b2b1e94205b848b72cbc85e4))
