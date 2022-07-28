# protons <!-- omit in toc -->

[![ipfs.io](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io)
[![IRC](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Discord](https://img.shields.io/discord/806902334369824788?style=flat-square)](https://discord.gg/ipfs)
[![codecov](https://img.shields.io/codecov/c/github/ipfs/protons.svg?style=flat-square)](https://codecov.io/gh/ipfs/protons)
[![CI](https://img.shields.io/github/workflow/status/ipfs/protons/test%20&%20maybe%20release/master?style=flat-square)](https://github.com/ipfs/protons/actions/workflows/js-test-and-release.yml)

> Protobuf to ts transpiler

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)
- [Contribute](#contribute-1)

## Install

```console
$ npm i protons
```

`protons` contains the code to compile `.proto` files to `.ts` files and `protons-runtime` contains the code to do serialization/deserialization to `Uint8Array`s during application execution.

```console
$ npm install --save-dev protons
$ npm install --save protons-runtime
```

## Usage

First generate your `.ts` files:

```console
$ protons ./path/to/foo.proto ./path/to/output.ts
```

Then run tsc over them as normal:

```console
$ tsc
```

In your code import the generated classes and use them to transform to/from bytes:

```js
import { Foo } from './foo.js'

const foo = {
  message: 'hello world'
}

const encoded = Foo.encode(foo)
const decoded = Foo.decode(encoded)

console.info(decoded.message)
// 'hello world'
```

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs/protons/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs/js-ipfs-unixfs-importer/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)
