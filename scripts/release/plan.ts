import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import semanticRelease from 'semantic-release'
import config from '../../release.config.ts'
import { stagePackages } from './stage.ts'
import type { ReleasePlan } from './types.ts'

export async function createPlan(root: string, output: string): Promise<ReleasePlan | null> {
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
  const sha = git('rev-parse', 'HEAD')
  if (git('status', '--porcelain')) throw new Error('Release planning requires a clean checkout')
  const atHead = git('tag', '--points-at', 'HEAD')
    .split('\n')
    .filter((tag) => /^v\d+\.\d+\.\d+$/.test(tag))
  if (atHead.length)
    throw new Error('Tagged commits require original release-plan artifact for recovery')
  git('merge-base', '--is-ancestor', 'v11.1.1', 'HEAD')
  const result = await semanticRelease({ ...config, dryRun: true }, { cwd: root })
  if (!result) return null
  const { version, gitTag: tag, notes = '' } = result.nextRelease
  const previousVersion = result.lastRelease.version
  if ((!previousVersion || previousVersion.startsWith('11.')) && version !== '12.0.0') {
    throw new Error(`First ESM-only release must be 12.0.0, planned ${version}`)
  }
  const packages = await stagePackages(version, output, root)
  const plan: ReleasePlan = { schemaVersion: 1, sha, version, tag, notes, packages }
  await writeFile(resolve(output, 'release-plan.json'), `${JSON.stringify(plan, null, 2)}\n`)
  return plan
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const root = process.cwd()
  const output = resolve(root, process.argv[2] ?? 'release-artifacts')
  await mkdir(output, { recursive: true })
  const plan = await createPlan(root, output)
  if (process.env.GITHUB_OUTPUT) {
    const { appendFile } = await import('node:fs/promises')
    await appendFile(process.env.GITHUB_OUTPUT, `release=${Boolean(plan)}\n`)
  }
  console.log(plan ? `Planned ${plan.tag} at ${plan.sha}` : 'No release')
}
