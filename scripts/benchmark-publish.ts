import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { publishReports } from '../packages/benchmark/src/publish.ts'
import { readReport } from '../packages/benchmark/src/report.ts'
import type { Measurement } from '../packages/benchmark/src/types.ts'

const token = process.env.GITHUB_TOKEN
const repository = process.env.GITHUB_REPOSITORY
const runId = process.env.BENCHMARK_RUN_ID
if (!token || !repository || !/^\d+$/.test(runId ?? ''))
  throw new Error('missing publisher environment')
const api = async (path: string, method = 'GET', body?: unknown): Promise<any> => {
  const response = await fetch(`https://api.github.com/repos/${repository}/${path}`, {
    method,
    signal: AbortSignal.timeout(30000),
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/vnd.github+json',
      'content-type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${method} ${path}`)
  return response.status === 204 ? undefined : response.json()
}
const reports: Measurement[] = []
const directory = resolve('.cache/benchmark-publish')
for (const entry of await readdir(directory, { recursive: true })) {
  if (!/^results-(node|bun)\.json$/.test(entry.split(/[\\/]/).pop() ?? '')) continue
  reports.push(await readReport(resolve(directory, entry)))
}
await publishReports(reports, repository, runId as string, api)
