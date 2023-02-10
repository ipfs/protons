# protons-benchmark <!-- omit in toc -->

[![ipfs.tech](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](https://ipfs.tech)
[![Discuss](https://img.shields.io/discourse/https/discuss.ipfs.tech/posts.svg?style=flat-square)](https://discuss.ipfs.tech)
[![codecov](https://img.shields.io/codecov/c/github/ipfs/protons.svg?style=flat-square)](https://codecov.io/gh/ipfs/protons)
[![CI](https://img.shields.io/github/actions/workflow/status/ipfs/protons/js-test-and-release.yml?branch=master\&style=flat-square)](https://github.com/ipfs/protons/actions/workflows/js-test-and-release.yml?query=branch%3Amaster)

> Protobuf to ts transpiler

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
- [License](#license)
- [Contribute](#contribute)

## Install

```console
$ git clone git@github.com:ipfs/protons.git
$ cd protons
$ npm i
$ cd packages/protons-benchmark
```

## Usage

Run the benchmark suite in node:

```console
$ npm start

> protons-benchmark@0.0.0 prestart
> npm run build


> protons-benchmark@0.0.0 build
> aegir build --no-bundle && cp -R src/protobufjs dist/src/protobufjs

[15:02:28] tsc [started]
[15:02:32] tsc [completed]

> protons-benchmark@0.0.0 start
> node dist/src/index.js

pbjs x 19,188 ops/sec ±0.38% (98 runs sampled)
protons x 19,001 ops/sec ±0.33% (95 runs sampled)
protobuf.js x 19,558 ops/sec ±0.30% (91 runs sampled)
@protobuf-ts x 17,216 ops/sec ±0.32% (95 runs sampled)
protobuf-es x 15,673 ops/sec ±0.48% (93 runs sampled)
Fastest is protobuf.js
```

Or in a browser:

```console
$ npm run start:browser

> protons-benchmark@0.0.0 start:browser
> npx playwright-test dist/src/index.js --runner benchmark

✔ chromium set up
pbjs x 19,763 ops/sec ±0.35% (67 runs sampled)
protons x 19,617 ops/sec ±0.37% (68 runs sampled)
protobuf.js x 19,772 ops/sec ±0.34% (67 runs sampled)
@protobuf-ts x 17,204 ops/sec ±0.33% (69 runs sampled)
protobuf-es x 16,032 ops/sec ±0.38% (68 runs sampled)
Fastest is protobuf.js,pbjs
```

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Contributions welcome! Please check out [the issues](https://github.com/ipfs/protons/issues).

Also see our [contributing document](https://github.com/ipfs/community/blob/master/CONTRIBUTING_JS.md) for more information on how we work, and about contributing in general.

Please be aware that all interactions related to this repo are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)
