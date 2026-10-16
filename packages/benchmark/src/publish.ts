import { libraries } from './libraries.ts'
import { commentMarker, renderComment, renderReadme, replaceReadme } from './report.ts'
import type { Measurement } from './types.ts'

export type GitHubApi = (path: string, method?: string, body?: unknown) => Promise<any>

export async function publishReports(
  reports: Measurement[],
  repository: string,
  runId: string,
  api: GitHubApi,
): Promise<void> {
  const run = await api(`actions/runs/${runId}`)
  if (
    run.name !== 'Benchmark' ||
    run.repository.full_name !== repository ||
    run.status !== 'completed' ||
    !['push', 'pull_request', 'workflow_dispatch'].includes(run.event)
  )
    throw new Error('untrusted benchmark run')
  if (
    !reports.length ||
    reports.length > 2 ||
    new Set(reports.map((report) => report.runtime)).size !== reports.length ||
    reports.some((report) => report.smoke || !report.cells.length)
  )
    throw new Error('invalid publication report set')
  const runUrl = `https://github.com/${repository}/actions/runs/${runId}`

  if (run.event === 'pull_request') {
    // Resolve association from GitHub, never from artifact-controlled PR numbers.
    const associated = run.pull_requests.length
      ? run.pull_requests
      : await api(`commits/${run.head_sha}/pulls`)
    const candidate = associated[0]
    if (!candidate) throw new Error('benchmark run has no matching PR')
    const pull = await api(`pulls/${candidate.number}`)
    if (
      pull.state !== 'open' ||
      (candidate.head?.sha !== undefined && pull.head.sha !== candidate.head.sha) ||
      ![pull.head.sha, pull.merge_commit_sha].includes(run.head_sha) ||
      pull.base.repo.full_name !== repository
    ) {
      console.log('Skip stale PR benchmark run')
    } else {
      if (
        reports.some(
          (report) => report.headSha !== pull.merge_commit_sha || report.baseSha !== pull.base.sha,
        )
      )
        throw new Error('report SHAs do not match current PR base and merge')
      const comments: any[] = []
      for (let page = 1; page <= 20; page++) {
        const batch = await api(`issues/${pull.number}/comments?per_page=100&page=${page}`)
        comments.push(...batch)
        if (batch.length < 100) break
      }
      const existing = comments.find(
        (comment) =>
          comment.user.login === 'github-actions[bot]' && comment.body.includes(commentMarker),
      )
      const body = renderComment(
        reports.sort((a, b) => a.runtime.localeCompare(b.runtime)),
        runUrl,
      )
      await api(
        existing ? `issues/comments/${existing.id}` : `issues/${pull.number}/comments`,
        existing ? 'PATCH' : 'POST',
        { body },
      )
    }
  } else {
    if (
      run.head_branch !== 'master' ||
      reports.some((report) => report.headSha !== run.head_sha || report.baseSha !== undefined)
    )
      throw new Error('report does not match master run')
    const branch = await api('git/ref/heads/master')
    if (branch.object.sha !== run.head_sha) {
      console.log('Skip stale master benchmark run')
    } else {
      // Do not replace useful results with an incomplete run. Library errors remain explicit rows.
      if (
        reports.length !== 2 ||
        reports.some(
          (report) => report.partial || report.cells.length !== libraries.length * 2 * 3 * 14,
        )
      )
        throw new Error('incomplete benchmark run; preserve existing README results')
      const old = await api(`contents/README.md?ref=${run.head_sha}`)
      const markdown = Buffer.from(old.content, 'base64').toString('utf8')
      const content = replaceReadme(
        markdown,
        renderReadme(
          reports.sort((a, b) => a.runtime.localeCompare(b.runtime)),
          runUrl,
        ),
      )
      if (content !== markdown) {
        // Create commit against measured SHA, then update branch only by fast-forward.
        // A concurrent release/source push causes a safe rejection instead of a stale overwrite.
        const parent = await api(`git/commits/${run.head_sha}`)
        const blob = await api('git/blobs', 'POST', { content, encoding: 'utf-8' })
        const tree = await api('git/trees', 'POST', {
          base_tree: parent.tree.sha,
          tree: [{ path: 'README.md', mode: '100644', type: 'blob', sha: blob.sha }],
        })
        const commit = await api('git/commits', 'POST', {
          message: 'docs: update JSON:API benchmarks [skip ci]',
          tree: tree.sha,
          parents: [run.head_sha],
        })
        await api('git/refs/heads/master', 'PATCH', { sha: commit.sha, force: false })
        console.log('Updated README benchmark region')
      }
    }
  }

  // Keep this module dependency-free so trusted publisher never installs or executes PR packages.
}
