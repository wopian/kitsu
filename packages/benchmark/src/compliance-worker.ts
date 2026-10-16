import { complianceCells } from './compliance.ts'
import type { Suite } from './types.ts'

const options = JSON.parse(process.argv[2]) as { library: string; suite: Suite; root: string }
const cells = await complianceCells(options.library, options.suite, options.root)
process.stdout.write(`COMPLIANCE_RESULT ${JSON.stringify(cells)}\n`, () => process.exit(0))
