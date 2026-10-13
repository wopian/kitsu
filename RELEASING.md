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

Publisher checks both local and existing registry integrities before writes. It publishes kitsu-core first, then kitsu, verifies published integrities and finally publishes shared tag and GitHub release. Existing matching publications are skipped during recovery. Mismatched SHA, tag or integrity fails without overwriting existing releases.

## Recovery

Rerun failed release job to reuse its saved plan and tarballs. If master advanced, dispatch Release workflow with original release run ID in `recovery_run_id`. Workflow restores artifact and checks out frozen SHA before verification and publishing. Missing requested recovery artifacts fail. Never regenerate tarballs for an already tagged release.

Do not unpublish packages or move tags. Revoke obsolete npm publish tokens through npm account settings after trusted publishing works. Live OIDC/provenance validation requires first hosted release; local dry checks cannot prove publisher authorization.
