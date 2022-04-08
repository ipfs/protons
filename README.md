# protons

[![test & maybe release](https://github.com/ipfs/protons/actions/workflows/js-test-and-release.yml/badge.svg)](https://github.com/ipfs/protons/actions/workflows/js-test-and-release.yml)

> `.proto` to `.ts` transpiler

Transpiles `.proto` files to `.ts` - uses `Uint8Array` for `byte` fields and `BigInt` for `int64`/`uint64` and `sint64`.

## Packages

* [`/packages/protons`](./packages/protons) The transpiler
* [`/packages/protons-benchmark`](./packages/protons-benchmark) A benchmark suite
* [`/packages/protons-runtime`](./packages/protons-runtime) Shared components that turn values to bytes and back again

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs/protons/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

## License

[Apache-2.0](LICENSE-APACHE) or [MIT](LICENSE-MIT) © Protocol Labs
