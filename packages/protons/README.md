# protons <!-- omit in toc -->

> Generate typescript from .proto files

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

To use this project, add `protons` as a development dependency and `protons-runtime` as a runtime dependency.

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

[Apache-2.0](LICENSE-APACHE) or [MIT](LICENSE-MIT) © Protocol Labs
