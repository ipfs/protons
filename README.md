# protons <!-- omit in toc -->

[![ipfs.tech](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](https://ipfs.tech)
[![Discuss](https://img.shields.io/discourse/https/discuss.ipfs.tech/posts.svg?style=flat-square)](https://discuss.ipfs.tech)
[![codecov](https://img.shields.io/codecov/c/github/ipfs/protons.svg?style=flat-square)](https://codecov.io/gh/ipfs/protons)
[![CI](https://img.shields.io/github/actions/workflow/status/ipfs/protons/js-test-and-release.yml?branch=master\&style=flat-square)](https://github.com/ipfs/protons/actions/workflows/js-test-and-release.yml?query=branch%3Amaster)

> Protobuf to ts transpiler

## Table of contents <!-- omit in toc -->

- [Structure](#structure)
- [Packages](#packages)
- [License](#license)
- [Contribute](#contribute)

## Structure

- [`/packages/protons`](./packages/protons) Protobuf to ts transpiler
- [`/packages/protons-benchmark`](./packages/protons-benchmark) Protobuf to ts transpiler
- [`/packages/protons-runtime`](./packages/protons-runtime) Shared code to make your bundle smaller when running protons in your app

Transpiles `.proto` files to `.ts` - uses `Uint8Array` for `byte` fields and `BigInt` for `int64`/`uint64` and `sint64`.

## Packages

- [`/packages/protons`](./packages/protons) The transpiler
- [`/packages/protons-benchmark`](./packages/protons-benchmark) A benchmark suite
- [`/packages/protons-runtime`](./packages/protons-runtime) Shared components that turn values to bytes and back again

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
