import { execFileSync } from 'node:child_process'
import { benchmarkOnlyChange } from './benchmark-impact.ts'
import type { ImpactContext } from './types.ts'

export function affects(path: string): boolean {
  return (
    /^(packages\/(kitsu|kitsu-core|kitsu-native)\/|package\.json$|bun\.lock$|scripts\/(build|docs)\.ts$|scripts\/release\/|release\.config\.ts$|\.github\/workflows\/release\.yml$)/.test(
      path,
    ) && !/(\.(spec|test)\.ts$|\/example\/|\.md$)/.test(path)
  )
}
export function changedPaths(hash: string, cwd: string): string[] {
  return execFileSync(
    'git',
    ['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', '-m', hash],
    { cwd, encoding: 'utf8' },
  )
    .trim()
    .split('\n')
    .filter(Boolean)
}
function relevantCommits(context: ImpactContext) {
  return context.commits.filter((commit) =>
    changedPaths(commit.hash, context.cwd ?? process.cwd()).some(
      (path) =>
        affects(path) &&
        !(
          (path === 'package.json' || path === 'bun.lock') &&
          benchmarkOnlyChange(commit.hash, path, context.cwd ?? process.cwd())
        ),
    ),
  )
}
export async function analyzeCommits(_config: unknown, context: ImpactContext) {
  const commits = relevantCommits(context)
  if (!commits.length) return null
  // Explicit 12.0.0 migration boundary, even if a squash title loses its !.
  if (/^11\./.test(context.lastRelease?.version ?? '')) return 'major'
  const { analyzeCommits: analyze } = await import('@semantic-release/commit-analyzer')
  const result = await analyze(
    {
      preset: 'conventionalcommits',
      releaseRules: [
        { breaking: true, release: 'major' },
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'chore', scope: 'deps', release: 'patch' },
      ],
    },
    { ...context, commits },
  )
  if (result) return result
  return commits.some(
    (commit) =>
      !/^[a-z][\w-]*(?:\([^)\n]+\))?!?:\s+\S/.test(commit.message.split('\n', 1)[0]) ||
      changedPaths(commit.hash, context.cwd ?? process.cwd()).includes('bun.lock'),
  )
    ? 'patch'
    : null
}
export async function generateNotes(_config: unknown, context: ImpactContext) {
  const { generateNotes: generate } = await import('@semantic-release/release-notes-generator')
  const notes = await generate(
    { preset: 'conventionalcommits' },
    { ...context, commits: relevantCommits(context) },
  )
  return /^11\./.test(context.lastRelease?.version ?? '')
    ? `${notes}\n### ESM-only migration\n\nkitsu-core and kitsu publish ESM only, joined by the native-fetch client kitsu-native. CommonJS entrypoints and UMD bundles are removed. See package migration guides for JSON:API 1.1 behavior changes.\n`
    : notes
}
