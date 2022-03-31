# protons-benchmark <!-- omit in toc -->

> Benchmark protons against other protobuf modules

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)

## Install

- Clone the parent repo
- Install the deps
- Switch to the benchmark directory

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
