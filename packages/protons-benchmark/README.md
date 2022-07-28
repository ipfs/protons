# protons-benchmark <!-- omit in toc -->

[![ipfs.io](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io)
[![IRC](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Discord](https://img.shields.io/discord/806902334369824788?style=flat-square)](https://discord.gg/ipfs)
[![codecov](https://img.shields.io/codecov/c/github/ipfs/protons.svg?style=flat-square)](https://codecov.io/gh/ipfs/protons)
[![CI](https://img.shields.io/github/workflow/status/ipfs/protons/test%20&%20maybe%20release/master?style=flat-square)](https://github.com/ipfs/protons/actions/workflows/js-test-and-release.yml)

> Protobuf to ts transpiler

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
- [License](#license)
- [Contribute](#contribute)

## Install

```console
$ npm i protons-benchmark
```

```console
$ git clone git@github.com:ipfs/protons.git
$ cd protons
$ npm i
$ cd packages/protons-benchmark
```

## Usage

Run the benchmark suite:

```console
$ npm start

Running "Encode/Decode" suite...
Progress: 100%

  pbjs:
    12 166 ops/s, ±3.92%   | 5.12% slower

  protons:
    9 755 ops/s, ±2.19%    | slowest, 23.93% slower

  protobufjs:
    12 823 ops/s, ±2.02%   | fastest

Finished 3 cases!
  Fastest: protobufjs
  Slowest: protons
```

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs/js-ipfs-unixfs-importer/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)
