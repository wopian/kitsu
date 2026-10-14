import { execFileSync, spawnSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { setTimeout } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { integrity } from './stage.ts'
import { packageNames, type ReleasePlan } from './types.ts'

// npm scans accepted publications before making versions visible in the registry.
const registryVisibilityWait = 20 * 60 * 1000

export function validatePlan(value: unknown): asserts value is ReleasePlan {
  const plan = value as ReleasePlan
  if (
    ![1, 2].includes(plan?.schemaVersion) ||
    !/^[a-f0-9]{40}$/.test(plan.sha) ||
    !/^(?:1[2-9]|[2-9]\d|\d{3,})\.\d+\.\d+$/.test(plan.version) ||
    plan.tag !== `v${plan.version}` ||
    typeof plan.notes !== 'string' ||
    !Array.isArray(plan.packages) ||
    plan.packages.length !== (plan.schemaVersion === 1 ? 2 : packageNames.length)
  )
    throw new Error('Invalid release plan')
  for (const [index, name] of (plan.schemaVersion === 1
    ? packageNames.slice(0, 2)
    : packageNames
  ).entries()) {
    const entry = plan.packages[index]
    if (
      !entry ||
      entry.name !== name ||
      entry.filename !== `${name}-${plan.version}.tgz` ||
      !/^sha512-[A-Za-z0-9+/]{86}==$/.test(entry.integrity)
    )
      throw new Error(`Invalid planned package: ${name}`)
  }
}
export interface Publisher {
  sha(): string
  tagSha(tag: string): string | null
  registryIntegrity(name: string, version: string): Promise<string | null>
  publish(filename: string): Promise<void>
  publishTag(tag: string, sha: string): void
  publishRelease(plan: ReleasePlan): void
}
export async function publishPlan(
  value: unknown,
  directory: string,
  publisher: Publisher,
  wait: (milliseconds: number) => Promise<void> = setTimeout,
): Promise<void> {
  validatePlan(value)
  const plan = value
  if (publisher.sha() !== plan.sha) throw new Error('Release plan SHA differs from checkout')
  const tagSha = publisher.tagSha(plan.tag)
  if (tagSha && tagSha !== plan.sha) throw new Error(`Tag ${plan.tag} points elsewhere`)
  const published = new Set<string>()
  // Validate every tarball and registry version before performing any write.
  for (const entry of plan.packages) {
    if (integrity(await readFile(resolve(directory, entry.filename))) !== entry.integrity) {
      throw new Error(`Tarball integrity mismatch: ${entry.name}`)
    }
    const existing = await publisher.registryIntegrity(entry.name, plan.version)
    if (existing && existing !== entry.integrity)
      throw new Error(`Published integrity mismatch: ${entry.name}`)
    if (existing) published.add(entry.name)
  }
  for (const entry of plan.packages) {
    if (!published.has(entry.name)) await publisher.publish(resolve(directory, entry.filename))
    let remainingWait = registryVisibilityWait
    for (let attempt = 0; ; attempt++) {
      const found = await publisher.registryIntegrity(entry.name, plan.version)
      if (found === entry.integrity) break
      if (found !== null) throw new Error(`Published integrity mismatch: ${entry.name}`)
      if (remainingWait === 0) throw new Error(`Publication verification failed: ${entry.name}`)
      const delay = Math.min(2000 * 2 ** attempt, 10000, remainingWait)
      await wait(delay)
      remainingWait -= delay
    }
  }
  publisher.publishTag(plan.tag, plan.sha)
  publisher.publishRelease(plan)
}
function livePublisher(root: string): Publisher {
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
  const npm = (args: string[]) =>
    spawnSync('npm', args, { cwd: root, encoding: 'utf8', shell: process.platform === 'win32' })
  return {
    sha: () => git('rev-parse', 'HEAD'),
    tagSha: (tag) => (git('tag', '--list', tag) ? git('rev-list', '-n', '1', tag) : null),
    async registryIntegrity(name, version) {
      const result = npm([
        'view',
        `${name}@${version}`,
        'dist.integrity',
        '--json',
        '--prefer-online',
        '--registry=https://registry.npmjs.org',
      ])
      if (result.status !== 0) {
        if (/E404/.test(result.stderr)) return null
        throw new Error(`npm view failed: ${result.stderr.trim()}`)
      }
      const found: unknown = JSON.parse(result.stdout)
      if (typeof found !== 'string')
        throw new Error(`Registry returned no integrity: ${name}@${version}`)
      return found
    },
    async publish(filename) {
      const result = npm([
        'publish',
        filename,
        '--access=public',
        '--tag=latest',
        '--ignore-scripts',
        '--registry=https://registry.npmjs.org',
      ])
      if (result.status !== 0) throw new Error(`npm publish failed: ${result.stderr.trim()}`)
    },
    publishTag(tag, sha) {
      if (!git('tag', '--list', tag)) git('tag', tag, sha)
      git('push', 'origin', `refs/tags/${tag}`)
    },
    publishRelease(plan) {
      const found = spawnSync('gh', ['release', 'view', plan.tag], { cwd: root, encoding: 'utf8' })
      if (found.status !== 0) {
        const result = spawnSync(
          'gh',
          [
            'release',
            'create',
            plan.tag,
            '--target',
            plan.sha,
            '--title',
            plan.tag,
            '--notes-file',
            '-',
          ],
          {
            cwd: root,
            input: plan.notes,
            encoding: 'utf8',
            stdio: ['pipe', 'inherit', 'inherit'],
          },
        )
        if (result.status !== 0) throw new Error(`GitHub release creation failed: ${plan.tag}`)
      }
    },
  }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  if (
    process.env.GITHUB_ACTIONS !== 'true' ||
    process.env.NPM_TOKEN ||
    process.env.NODE_AUTH_TOKEN
  ) {
    throw new Error('Publishing requires GitHub Actions OIDC with no npm token')
  }
  const path = resolve(process.argv[2] ?? 'release-artifacts/release-plan.json')
  const plan: unknown = JSON.parse(await readFile(path, 'utf8'))
  await publishPlan(plan, resolve(path, '..'), livePublisher(process.cwd()))
}
