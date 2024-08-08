# protons <!-- omit in toc -->

[![ipfs.tech](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](https://ipfs.tech)
[![Discuss](https://img.shields.io/discourse/https/discuss.ipfs.tech/posts.svg?style=flat-square)](https://discuss.ipfs.tech)
[![codecov](https://img.shields.io/codecov/c/github/ipfs/protons.svg?style=flat-square)](https://codecov.io/gh/ipfs/protons)
[![CI](https://img.shields.io/github/actions/workflow/status/ipfs/protons/js-test-and-release.yml?branch=main\&style=flat-square)](https://github.com/ipfs/protons/actions/workflows/js-test-and-release.yml?query=branch%3Amain)

> Protobuf to ts transpiler

# About

<!--

!IMPORTANT!

Everything in this README between "# About" and "# Install" is automatically
generated and will be overwritten the next time the doc generator is run.

To make changes to this section, please update the @packageDocumentation section
of src/index.js or src/index.ts

To experiment with formatting, please run "npm run docs" from the root of this
repo and examine the changes made.

-->

`protons` is a high performance implementation of [Protocol Buffers v3](https://protobuf.dev/programming-guides/proto3/).

It transpiles code to TypeScript and supports BigInts for 64 bit types.

The `protons` module contains the code to compile `.proto` files to `.ts` files and `protons-runtime` contains the code to do serialization/deserialization to `Uint8Array`s during application execution.

Please ensure you declare them as the correct type of dependencies:

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

## Differences from protobuf.js

This module uses the internal reader/writer from `protobuf.js` as it is highly optimised and there's no point reinventing the wheel.

It does have one or two differences:

1. Supports `proto3` semantics only
2. All 64 bit values are represented as `BigInt`s and not `Long`s (e.g. `int64`, `uint64`, `sint64` etc)
3. Unset `optional` fields are set on the deserialized object forms as `undefined` instead of the default values
4. `singular` fields set to default values are not serialized and are set to default values when deserialized if not set - protobuf.js [diverges from the language guide](https://github.com/protobufjs/protobuf.js/issues/1468#issuecomment-745177012) around this feature
5. `map` fields can have keys of any type - protobufs.js [only supports strings](https://github.com/protobufjs/protobuf.js/issues/1203#issuecomment-488637338)
6. `map` fields are deserialized as ES6 `Map`s - protobuf.js uses `Object`s

## Extra features

### Limiting the size of repeated/map elements

To protect decoders from malicious payloads, it's possible to limit the maximum size of repeated/map elements.

You can either do this at compile time by using the [protons.options](https://github.com/protocolbuffers/protobuf/blob/6f1d88107f268b8ebdad6690d116e74c403e366e/docs/options.md?plain=1#L490-L493) extension:

```protobuf
message MyMessage {
  // repeatedField cannot have more than 10 entries
  repeated uint32 repeatedField = 1 [(protons.options).limit = 10];

  // stringMap cannot have more than 10 keys
  map<string, string> stringMap = 2 [(protons.options).limit = 10];
}
```

Or at runtime by passing objects to the `.decode` function of your message:

```TypeScript
const message = MyMessage.decode(buf, {
  limits: {
    repeatedField: 10,
    stringMap: 10
  }
})
```

#### Limiting repeating fields of nested messages at runtime

Sub messages with repeating elements can be limited in a similar way:

```protobuf
message SubMessage {
  repeated uint32 repeatedField = 1;
}

message MyMessage {
  SubMessage message = 1;
}
```

```TypeScript
const message = MyMessage.decode(buf, {
  limits: {
    messages: {
      repeatedField: 5 // the SubMessage can not have more than 5 repeatedField entries
    }
  }
})
```

#### Limiting repeating fields of repeating messages at runtime

Sub messages defined in repeating elements can be limited by appending `$` to the field name in the runtime limit options:

```protobuf
message SubMessage {
 repeated uint32 repeatedField = 1;
}

message MyMessage {
  repeated SubMessage messages = 1;
}
```

```TypeScript
const message = MyMessage.decode(buf, {
  limits: {
    messages: 5 // max 5x SubMessages
    messages$: {
      repeatedField: 5 // no SubMessage can have more than 5 repeatedField entries
    }
  }
})
```

#### Limiting repeating fields of map entries at runtime

Repeating fields in map entries can be limited by appending `$value` to the field name in the runtime limit options:

```protobuf
message SubMessage {
 repeated uint32 repeatedField = 1;
}

message MyMessage {
  map<string, SubMessage> messages = 1;
}
```

```TypeScript
const message = MyMessage.decode(buf, {
  limits: {
    messages: 5 // max 5x SubMessages in the map
    messages$value: {
      repeatedField: 5 // no SubMessage in the map can have more than 5 repeatedField entries
    }
  }
})
```

### Overriding 64 bit types

By default 64 bit types are implemented as [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)s.

Sometimes this is undesirable due to [performance issues](https://betterprogramming.pub/the-downsides-of-bigints-in-javascript-6350fd807d) or code legibility.

It's possible to override the JavaScript type 64 bit fields will deserialize to:

```protobuf
message MyMessage {
  repeated int64 bigintField = 1;
  repeated int64 numberField = 2 [jstype = JS_NUMBER];
  repeated int64 stringField = 3 [jstype = JS_STRING];
}
```

```TypeScript
const message = MyMessage.decode(buf)

console.info(typeof message.bigintField) // bigint
console.info(typeof message.numberField) // number
console.info(typeof message.stringField) // string
```

## Missing features

Some features are missing `OneOf`s, etc due to them not being needed so far in ipfs/libp2p. If these features are important to you, please open PRs implementing them along with tests comparing the generated bytes to `protobuf.js` and `pbjs`.

# Install

```console
$ npm i protons
```

# API Docs

- <https://ipfs.github.io/protons/modules/protons.html>

# License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

# Contribute

Contributions welcome! Please check out [the issues](https://github.com/ipfs/protons/issues).

Also see our [contributing document](https://github.com/ipfs/community/blob/master/CONTRIBUTING_JS.md) for more information on how we work, and about contributing in general.

Please be aware that all interactions related to this repo are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)
