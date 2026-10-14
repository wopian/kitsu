# Release setup

## npm trusted publishers

Configure a GitHub Actions trusted publisher in npm settings for **both kitsu-core and kitsu**:

- Owner: `wopian`
- Repository: `kitsu`
- Workflow filename: `release.yml`
- Environment: leave empty; workflow uses no GitHub environment
- Allow direct `npm publish`

See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/). Use GitHub-hosted runners, Node 26, npm 11.5.1 or newer, and job permission `id-token: write`. No `NPM_TOKEN` or `NODE_AUTH_TOKEN` is used. npm generates provenance automatically through OIDC. Repository metadata points to wopian/kitsu.

## Release flow

Workflow validates source, builds ESM, checks packed packages and asks semantic-release for next shared version.

Plan records SHA, version, tag, notes, filenames and SHA-512 integrity of both tarballs. Staging rewrites workspace dependency to matching caret range and excludes source, tests, scripts and development dependencies. Immutable plan and tarballs upload before publication.

Publisher checks both local and existing registry integrities before writes. It publishes kitsu-core first, then kitsu, verifies published integrities and finally publishes shared tag and GitHub release. Registry reads use `--prefer-online` to refresh cached metadata. Missing versions retry with up to 20 minutes of waits per package after publication; registry request time is additional. Conflicting integrity fails immediately. Existing matching publications are skipped during recovery. Mismatched SHA, tag or integrity fails without overwriting existing releases.

[npm scans packages before making them available](https://github.blog/changelog/2026-07-28-npm-publish-time-malware-scanning-and-dual-use-metadata/). Scanning typically takes around five minutes and can take 15 minutes or more. A successful `npm publish` does not guarantee immediate registry visibility. If verification times out, recover with the saved plan after scanning completes; do not regenerate or republish accepted tarballs.

## Recovery

Rerun failed release job to reuse its saved plan and tarballs. If master advanced, dispatch Release workflow with original release run ID in `recovery_run_id`. Workflow restores artifact and checks out frozen SHA before verification and publishing. Missing requested recovery artifacts fail. Never regenerate tarballs for an already tagged release.

If recovery needs a publisher fix, commit that fix to master and dispatch the updated workflow with the original run ID. Workflow preserves its current publisher before checking out the frozen SHA. Package contents and release SHA remain frozen; publisher fixes remain available. Rerunning an old workflow uses its old publisher.

Do not unpublish packages or move tags. Revoke obsolete npm publish tokens through npm account settings after trusted publishing works. Live OIDC/provenance validation requires first hosted release; local dry checks cannot prove publisher authorization.
