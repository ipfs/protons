#! /usr/bin/env node

import meow from 'meow'
import { generate } from '../src/index.js'

async function main (): Promise<void> {
  const cli = meow(`
  Usage
    $ protons source...

  Options
    --output, -o Path to a directory to write transpiled typescript files into
    --strict, -s Causes parsing warnings to become errors
    --path, -p Adds a directory to the include path

  Examples
    $ protons ./path/to/file.proto ./path/to/other/file.proto
`, {
    importMeta: import.meta,
    flags: {
      output: {
        type: 'string',
        shortFlag: 'o'
      },
      strict: {
        type: 'boolean',
        shortFlag: 's'
      },
      path: {
        type: 'string',
        shortFlag: 'p',
        isMultiple: true
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
