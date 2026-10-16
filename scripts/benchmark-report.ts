import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { libraries } from '../packages/benchmark/src/libraries.ts'
import { readReport, renderComment, updateReadme } from '../packages/benchmark/src/report.ts'

const argumentsList = process.argv.slice(2)
const directory = resolve(argumentsList[0] ?? '.cache/benchmark')
const reports = await Promise.all(
  (await readdir(directory))
    .filter((name) => /^results-(node|bun)\.json$/.test(name))
    .sort()
    .map((name) => readReport(resolve(directory, name))),
)
if (!reports.length) throw new Error('no benchmark reports')
if (argumentsList.includes('--readme')) {
  if (reports.some((report) => report.smoke)) throw new Error('smoke results cannot update README')
  if (
    reports.length !== 2 ||
    reports.some(
      (report) => report.partial || report.cells.length !== libraries.length * 2 * 3 * 14,
    )
  )
    throw new Error('partial results cannot update README')
  await updateReadme(resolve('README.md'), reports, process.env.BENCHMARK_RUN_URL)
} else
  console.log(
    renderComment(
      reports,
      process.env.BENCHMARK_RUN_URL ?? 'https://github.com/wopian/kitsu/actions',
    ),
  )
