import { createAdapter } from './adapters.ts'
import { fixtures } from './fixtures.ts'
import { failure, median, sample } from './measure.ts'
import type { Adapter, Cell, WorkerOptions } from './types.ts'

const options = JSON.parse(process.argv[2]) as WorkerOptions
const fixture = fixtures(options.smoke, options.fixture)[0]
if (!fixture) throw new Error('unknown fixture')
const makeCell = (): Cell => ({
  library: options.library,
  suite: options.suite,
  mode: options.mode,
  fixture: fixture.id,
  fixtureHash: fixture.hash,
  primaryCount: fixture.primaryCount,
  includedCount: fixture.includedCount,
  status: 'ok',
  samples: [],
})
const variants: { name: 'base' | 'head'; root: string; cell: Cell; adapter?: Adapter }[] = []
if (options.baseRoot) variants.push({ name: 'base', root: options.baseRoot, cell: makeCell() })
variants.push({ name: 'head', root: options.root, cell: makeCell() })
const duration = options.smoke ? 2 : 250
for (const variant of variants) {
  try {
    variant.adapter = await createAdapter(options.library, options.suite, fixture, variant.root)
    await sample(variant.adapter, fixture, options.mode, options.smoke ? 1 : 250)
  } catch (error) {
    Object.assign(variant.cell, failure(error))
    delete variant.cell.samples
  } finally {
    variant.adapter?.cleanup?.()
  }
}
for (let index = 0; index < 5; index++) {
  const order = index % 2 ? [...variants].reverse() : variants
  for (const variant of order) {
    if (variant.cell.status !== 'ok' || !variant.adapter) continue
    try {
      // Global fetch is scoped to this isolated worker and selected adapter.
      variant.adapter.activate?.()
      variant.cell.samples?.push(await sample(variant.adapter, fixture, options.mode, duration))
    } catch (error) {
      Object.assign(variant.cell, failure(error))
      delete variant.cell.samples
    } finally {
      variant.adapter.cleanup?.()
    }
  }
}
for (const { cell } of variants) {
  if (cell.status !== 'ok') continue
  cell.operationsPerSecond = median(cell.samples as number[])
  if (cell.suite === 'client')
    cell.requestsPerSecond = cell.operationsPerSecond * (cell.mode === 'decode-encode' ? 2 : 1)
}
process.stdout.write(
  `BENCHMARK_RESULT ${JSON.stringify(Object.fromEntries(variants.map((variant) => [variant.name, variant.cell])))}\n`,
  () => process.exit(0),
)
