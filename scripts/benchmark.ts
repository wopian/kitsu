import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { arch, cpus, platform } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  libraries,
  packageName,
  suites,
  unsupportedReason,
} from '../packages/benchmark/src/adapters.ts'
import { benchmarkFailures } from '../packages/benchmark/src/failures.ts'
import { fixtures } from '../packages/benchmark/src/fixtures.ts'
import { renderReadme } from '../packages/benchmark/src/report.ts'
import type { Cell, Measurement, Mode, WorkerOptions } from '../packages/benchmark/src/types.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const argumentsList = process.argv.slice(2)
const option = (name: string) => {
  const index = argumentsList.indexOf(name)
  return index < 0 ? undefined : argumentsList[index + 1]
}
const smoke = argumentsList.includes('--smoke')
const selectedFixture = option('--fixture')
const cases = fixtures(smoke, selectedFixture)
if (!cases.length) throw new Error('unknown fixture')
const selectedMode = option('--mode')
if (selectedMode && !['decode', 'encode', 'decode-encode'].includes(selectedMode))
  throw new Error('unknown mode')
const selectedSuite = option('--suite')
if (selectedSuite && !['codec', 'client'].includes(selectedSuite)) throw new Error('unknown suite')
const output = resolve(root, option('--output') ?? '.cache/benchmark')
const baseRoot = option('--base-root') ? resolve(root, option('--base-root') as string) : undefined
const runtime = option('--runtime') ?? 'both'
if (!['node', 'bun', 'both'].includes(runtime))
  throw new Error('runtime must be node, bun, or both')
const selectedLibrary = option('--library')
if (selectedLibrary && !libraries.includes(selectedLibrary)) throw new Error('unknown library')
await mkdir(output, { recursive: true })

async function hashDirectory(
  directory: string,
  hash: ReturnType<typeof createHash>,
): Promise<void> {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    if (entry.isDirectory()) await hashDirectory(join(directory, entry.name), hash)
    else if (!entry.name.endsWith('.test.ts')) {
      hash.update(entry.name)
      hash.update(await readFile(join(directory, entry.name)))
    }
  }
}
const hash = createHash('sha256')
await hashDirectory(join(root, 'packages/benchmark/src'), hash)
hash.update(await readFile(join(root, 'scripts/benchmark.ts')))
const harnessHash = hash.digest('hex')
const productHash = createHash('sha256')
for (const library of ['kitsu-core', 'kitsu', 'kitsu-native']) {
  productHash.update(library)
  await hashDirectory(join(root, 'packages', library, 'dist'), productHash)
}
const sourceHash = productHash.digest('hex')
const dirty = !!execFileSync('git', ['status', '--porcelain'], {
  cwd: root,
  encoding: 'utf8',
}).trim()
const sha = (directory: string) =>
  execFileSync('git', ['rev-parse', 'HEAD'], { cwd: directory, encoding: 'utf8' }).trim()
const versions: Record<string, string> = {}
for (const library of libraries) {
  const filename = ['kitsu', 'kitsu-core', 'kitsu-native'].includes(library)
    ? join(root, 'packages', library, 'package.json')
    : join(root, 'node_modules', packageName(library), 'package.json')
  versions[library] = JSON.parse(await readFile(filename, 'utf8')).version
}

async function worker(
  executable: string,
  options: WorkerOptions,
): Promise<{ head: Cell; base?: Cell }> {
  const processHandle = Bun.spawnSync(
    [
      executable,
      ...(executable === process.execPath
        ? ['--tsconfig-override', join(root, 'packages/benchmark/tsconfig.runtime.json')]
        : []),
      join(root, 'packages/benchmark/src/worker.ts'),
      JSON.stringify(options),
    ],
    {
      cwd: root,
      stdout: 'pipe',
      stderr: 'pipe',
      timeout: 30000,
    },
  )
  const stdout = processHandle.stdout.toString()
  const stderr = processHandle.stderr.toString()
  const timedOut = processHandle.signalCode !== null
  const fail = (reason: string) => {
    const fixture = cases.find((entry) => entry.id === options.fixture) as ReturnType<
      typeof fixtures
    >[number]
    const cell: Cell = {
      library: options.library,
      suite: options.suite,
      mode: options.mode,
      fixture: fixture.id,
      fixtureHash: fixture.hash,
      primaryCount: fixture.primaryCount,
      includedCount: fixture.includedCount,
      status: timedOut ? 'timeout' : 'error',
      reason: reason.slice(0, 240),
    }
    return { head: cell, ...(baseRoot ? { base: { ...cell } } : {}) }
  }
  const line = stdout.split('\n').find((entry) => entry.startsWith('BENCHMARK_RESULT '))
  if (!line)
    return fail(
      timedOut ? 'worker exceeds 30-second limit' : stderr || 'worker exits without results',
    )
  try {
    return JSON.parse(line.slice('BENCHMARK_RESULT '.length))
  } catch {
    return fail('invalid worker output')
  }
}

const reports: Measurement[] = []
for (const name of runtime === 'both' ? ['node', 'bun'] : [runtime]) {
  const executable = name === 'bun' ? process.execPath : 'node'
  const report: Measurement = {
    schemaVersion: 1,
    harnessHash,
    sourceHash,
    dirty,
    runtime: name,
    runtimeVersion: execFileSync(executable, ['--version'], { encoding: 'utf8' }).trim(),
    runner: { os: platform(), arch: arch(), cpu: cpus()[0]?.model ?? 'unknown' },
    versions,
    headSha: sha(root),
    baseSha: baseRoot ? sha(baseRoot) : undefined,
    smoke,
    partial: !!(selectedFixture || selectedMode || selectedSuite || selectedLibrary),
    measuredAt: new Date().toISOString(),
    cells: [],
  }
  for (const fixture of cases) {
    for (const library of selectedLibrary ? [selectedLibrary] : libraries) {
      for (const suite of selectedSuite
        ? suites.filter((suite) => suite === selectedSuite)
        : suites) {
        for (const mode of (selectedMode
          ? [selectedMode]
          : ['decode', 'encode', 'decode-encode']) as Mode[]) {
          const reason = unsupportedReason(library, suite, mode, fixture)
          if (reason) {
            const cell: Cell = {
              library,
              suite,
              mode,
              fixture: fixture.id,
              fixtureHash: fixture.hash,
              primaryCount: fixture.primaryCount,
              includedCount: fixture.includedCount,
              status: 'unsupported',
              reason,
            }
            report.cells.push({ head: cell, ...(baseRoot ? { base: { ...cell } } : {}) })
            continue
          }
          report.cells.push(
            await worker(executable, {
              library,
              suite,
              mode,
              fixture: fixture.id,
              root,
              baseRoot,
              smoke,
            }),
          )
        }
      }
    }
  }
  reports.push(report)
  await writeFile(join(output, `results-${name}.json`), `${JSON.stringify(report, null, 2)}\n`)
  const counts = Object.fromEntries(
    ['ok', 'unsupported', 'incorrect', 'error', 'timeout'].map((status) => [
      status,
      report.cells.filter((cell) => cell.head.status === status).length,
    ]),
  )
  console.log(`${name}: ${JSON.stringify(counts)}`)
}
const runUrl =
  process.env.GITHUB_ACTIONS === 'true'
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : undefined
await writeFile(join(output, 'report.md'), renderReadme(reports, runUrl))
const failures = benchmarkFailures(reports)
for (const cell of failures)
  console.error(
    `${cell.library} ${cell.suite} ${cell.mode} ${cell.fixture}: ${cell.status}${cell.reason ? `: ${cell.reason}` : ''}`,
  )
if (failures.length) process.exitCode = 1
