/* eslint-disable no-console */

/*
$ node dist/src/numbers/index.js
$ npx playwright-test dist/src/numbers/index.js --runner benchmark
*/

import { readBenchmark } from './read.ts'
import { writeBenchmark } from './write.ts'

console.info('-- read --')
await readBenchmark()

console.info('-- write --')
await writeBenchmark()
