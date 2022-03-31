#! /usr/bin/env node

import meow from 'meow'
import { generate } from '../src/index.js'

async function main () {
  const cli = meow(`
  Usage
    $ protons source

  Options
    --output, -o  Path to a directory to write transpiled typescript files into

  Examples
    $ protons ./path/to/file.proto
`, {
    importMeta: import.meta,
    flags: {
      output: {
        type: 'string',
        alias: 'o'
      }
    }
  })

  if (cli.input.length === 0) {
    throw new Error('source must be specified')
  }

  for (const source of cli.input) {
    await generate(source, cli.flags)
  }
}

main().catch(err => {
  console.error(err) // eslint-disable-line no-console
  process.exit(1)
})
