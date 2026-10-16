import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { libraries, packageName, supported } from '../packages/benchmark/src/adapters.ts'
import {
  type ComplianceReport,
  complianceCases,
  renderCompliance,
  replaceCompliance,
} from '../packages/benchmark/src/compliance.ts'
import { kitsuLibraries } from '../packages/benchmark/src/libraries.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const argumentsList = process.argv.slice(2)
const option = (name: string) => {
  const index = argumentsList.indexOf(name)
  return index < 0 ? undefined : argumentsList[index + 1]
}
const runtime = option('--runtime') ?? 'both'
if (!['node', 'bun', 'both'].includes(runtime))
  throw new Error('runtime must be node, bun, or both')
if (argumentsList.includes('--readme') && runtime !== 'both')
  throw new Error('both runtimes required for README compliance tables')
const output = resolve(root, option('--output') ?? '.cache/compliance')
await mkdir(output, { recursive: true })
async function hashDirectory(directory: string, hash: ReturnType<typeof createHash>) {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    if (entry.isDirectory()) await hashDirectory(join(directory, entry.name), hash)
    else if (!entry.name.endsWith('.test.ts')) {
      hash.update(entry.name)
      hash.update(await readFile(join(directory, entry.name)))
    }
  }
}
const source = createHash('sha256')
for (const library of kitsuLibraries) {
  source.update(library)
  await hashDirectory(join(root, 'packages', library, 'dist'), source)
}
const sourceHash = source.digest('hex')
const harness = createHash('sha256')
await hashDirectory(join(root, 'packages/benchmark/src'), harness)
harness.update(await readFile(fileURLToPath(import.meta.url)))
const harnessHash = harness.digest('hex')
const versions: Record<string, string> = {}
for (const library of libraries) {
  const filename = kitsuLibraries.includes(library)
    ? join(root, 'packages', library, 'package.json')
    : join(root, 'node_modules', packageName(library), 'package.json')
  versions[library] = JSON.parse(await readFile(filename, 'utf8')).version
}
const reports: ComplianceReport[] = []
for (const name of (runtime === 'both' ? ['node', 'bun'] : [runtime]) as ('node' | 'bun')[]) {
  const executable = name === 'bun' ? process.execPath : 'node'
  const runtimeVersion = Bun.spawnSync([executable, '--version'], { stdout: 'pipe' })
    .stdout.toString()
    .trim()
  const report: ComplianceReport = {
    schemaVersion: 1,
    runtime: name,
    runtimeVersion,
    measuredAt: new Date().toISOString(),
    sourceHash,
    harnessHash,
    versions,
    cells: [],
  }
  for (const library of libraries)
    for (const suite of ['client', 'codec'] as const) {
      if (!supported(library, suite)) continue
      const result = Bun.spawnSync(
        [
          executable,
          ...(name === 'bun'
            ? ['--tsconfig-override', join(root, 'packages/benchmark/tsconfig.runtime.json')]
            : ['--experimental-strip-types']),
          join(root, 'packages/benchmark/src/compliance-worker.ts'),
          JSON.stringify({ library, suite, root }),
        ],
        { cwd: root, stdout: 'pipe', stderr: 'pipe', timeout: 30000 },
      )
      const line = result.stdout
        .toString()
        .split('\n')
        .find((line) => line.startsWith('COMPLIANCE_RESULT '))
      if (result.exitCode !== 0 || !line) {
        const reason =
          result.signalCode !== null ? 'worker exceeds 30-second limit' : 'compliance worker failed'
        for (const version of ['1.0', '1.1'] as const)
          for (const test of complianceCases) {
            if (
              (test.version && test.version !== version) ||
              (test.clientOnly && suite !== 'client')
            )
              continue
            report.cells.push({ library, suite, version, test: test.id, status: 'error', reason })
          }
        console.error(`${name}/${library}/${suite}: ${reason}`)
      } else report.cells.push(...JSON.parse(line.slice('COMPLIANCE_RESULT '.length)))
    }
  reports.push(report)
  await writeFile(join(output, `results-${name}.json`), `${JSON.stringify(report, null, 2)}\n`)
  console.log(
    `${name}: ${report.cells.filter((cell) => cell.status === 'pass').length}/${report.cells.length} capability checks pass`,
  )
}
const markdown = renderCompliance(reports)
await writeFile(join(output, 'report.md'), markdown)
if (argumentsList.includes('--readme')) {
  const filename = join(root, 'README.md')
  await writeFile(filename, replaceCompliance(await readFile(filename, 'utf8'), markdown))
}
const failures = reports.flatMap((report) =>
  report.cells.filter(
    (cell) => kitsuLibraries.includes(cell.library) && ['incorrect', 'error'].includes(cell.status),
  ),
)
for (const cell of failures)
  console.error(`${cell.library}/${cell.suite}/${cell.version}/${cell.test}: ${cell.reason}`)
if (failures.length) process.exitCode = 1
