# Contributing

## Requirements

Use Git and Bun 1.4.3. Node 26 runs documentation and release tooling. Published libraries support Node 22, 24, or 26+.

## Development

Run these commands from repository root:

```sh
bun install --frozen-lockfile
bun run typecheck
bun run test:coverage
bun run lint
bun run format
bun run docs
bun run build
bun run size
bun run test:packages
bun run test:compatibility
```

Use `bun run fix` and `bun run format:fix` for Biome corrections. Preserve runtime behavior when changing types or formatting. `bun run test:compatibility` checks unchanged helpers against v11.1.1 and verifies JSON:API 1.1 behavior for changed modules.

Use `bun run docs:build` to regenerate README API sections. Declarations regenerate during builds.

Dependency updates follow three-day minimum age.

## Tests

Bun tests use explicit `bun:test` imports. Coverage requires 100% library lines and functions and writes text plus LCOV reports. Restore mocks after tests and preserve existing assertions.

## Commit messages

Use Conventional Commits. Breaking changes (`feat!:` etc) release major versions; `feat` releases minor; `fix`, `perf`, and `chore(deps)` release patch versions. Relevant nonconventional commits and lockfile changes fall back to patch releases. Documentation, examples and tests do not independently trigger releases.

Commit example:

```text
feat!: publish ESM-only packages

BREAKING CHANGE: remove CommonJS entrypoints and UMD bundles.
```

## Releases

All three packages share versions and `v*` tags. Releases run from master with semantic-release analysis and a frozen plan tied to commit SHA. See [release setup](RELEASING.md).
