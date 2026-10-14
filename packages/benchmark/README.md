# JSON:API benchmarks

Run `bun run build`, then `bun run benchmark --output .cache/benchmark-run-1`.
Repeat into `.cache/benchmark-run-2` with no source changes or competing workload.
Run `bun run benchmark:verify .cache/benchmark-run-1 .cache/benchmark-run-2`.

Verification requires two complete independent runs on both Node and Bun, matching
built package fingerprints, harness, fixtures, library versions, and environments.
Git commit IDs remain provenance. Commits of an unchanged working tree do not
invalidate identical built package and harness fingerprints; verification records
different commit IDs explicitly.
Each core decode/encode case must lead the fastest measured devour, jsona, or
ts-japi codec by at least 5%. Each shared native-client decode/encode case must
lead fetchja and devour by at least 5%. Axios kitsu remains in comparisons but has
no every-case win requirement. Unsupported APIs and failed competitors never earn
wins. Verification writes every miss and unavailable comparison to
`verification.md` in the second run directory and exits nonzero for misses.

Use `--fixture NAME`, `--mode decode|encode|decode-encode`, `--suite codec|client`,
`--library NAME`, and `--runtime node|bun|both` for profiling. Partial and smoke
results cannot replace README benchmarks. Missing native package in an older base
revision is unsupported; missing current package is an error.

Run `bun run benchmark:report .cache/benchmark-run-2 --readme` to refresh root
README after complete measurements. Publish truthful results even when target is
not reached. Keep conversion, fresh inputs, graph traversal, correctness checks,
and worker limits unchanged when comparing optimizations.
