import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { readReport } from '../packages/benchmark/src/report.ts'
import { renderVerification, verifyRuns } from '../packages/benchmark/src/verify.ts'

const directories = process.argv.slice(2).map((directory) => resolve(directory))
if (directories.length !== 2 || directories[0] === directories[1])
  throw new Error('Usage: bun run benchmark:verify RUN_ONE RUN_TWO')
const runs = await Promise.all(
  directories.map((directory) =>
    Promise.all(
      ['node', 'bun'].map((runtime) => readReport(resolve(directory, `results-${runtime}.json`))),
    ),
  ),
)
const result = verifyRuns(runs)
await writeFile(resolve(directories[1], 'verification.md'), renderVerification(result))
console.log(
  `${result.passed} comparisons pass; ${result.misses.length} miss 5% target; ${result.unavailable.length} competitors unmeasured. Full report: ${resolve(directories[1], 'verification.md')}`,
)
if (result.misses.length) process.exitCode = 1
