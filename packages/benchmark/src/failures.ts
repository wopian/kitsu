import { kitsuLibraries } from './libraries.ts'
import type { Cell, Measurement } from './types.ts'

/** Competitor and base results remain reportable without failing the current revision. */
export function benchmarkFailures(reports: readonly Measurement[]): Cell[] {
  return reports.flatMap((report) =>
    report.cells.flatMap(({ head }) =>
      kitsuLibraries.includes(head.library) &&
      (head.status === 'incorrect' || head.status === 'error' || head.status === 'timeout')
        ? [head]
        : [],
    ),
  )
}
