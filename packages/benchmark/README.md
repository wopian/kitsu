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
lead fetchja, devour, and @bjornharrtell/json-api by at least 5%. Axios kitsu remains in comparisons but has
no every-case win requirement. Unsupported APIs and failed competitors never earn
wins. Verification writes every miss and unavailable comparison to
`verification.md` in the second run directory and exits nonzero for misses.

Use `--fixture NAME`, `--mode decode|encode|decode-encode`, `--suite codec|client`,
`--library NAME`, and `--runtime node|bun|both` for profiling. Partial and smoke
results cannot replace README benchmarks. Missing native package in an older base
revision is unsupported; missing current package is an error.

The measurement command and Benchmark workflow fail only for current-revision
`kitsu-core`, `kitsu`, or `kitsu-native` cells marked `incorrect`, `error`, or
`timeout`. Competitor failures and older base failures remain visible in reports
without failing measurement. Unsupported cells never fail measurement. Reports
and artifacts are saved even when a Kitsu benchmark fails. The separate
`benchmark:verify` command retains its strict performance targets.

Run `bun run benchmark:report .cache/benchmark-run-2 --readme` to refresh root
README after complete measurements. Publish truthful results even when target is
not reached. Keep conversion, fresh inputs, graph traversal, correctness checks,
and worker limits unchanged when comparing optimizations.

The @bjornharrtell/json-api client uses its public `findRecord`, `findAll`, and
`saveRecord` APIs. Like other single-resource clients, collection writes are
unsupported. Writes receive HTTP 204; `saveRecord` then fetches the saved resource.
Decode, encode, and decode-encode therefore use 1, 2, and 3 requests per operation.
All report rates, winners, multipliers, and performance targets use completed
operations/s for every library. One operation is one decode, one encode, or one
complete decode-encode round trip. Timings include all requests; request counts
appear only as explanatory details. Raw artifacts retain requests/s for backward
compatibility, but reports never use requests/s for comparisons. Extra GET requests
earn no advantage. Correctness failures remain visible, including missing empty
to-many relationships in version 7.0.0.

Reports group every scenario into its own table. Client multipliers use
`kitsu-native` as their baseline, followed by `kitsu`; codecs use `kitsu-core`.

Run `bun run build`, then `bun run benchmark:compliance --readme` to check all
benchmark libraries against shared JSON:API 1.0 and 1.1 capabilities on Node and
Bun. The separate compatibility section survives benchmark regeneration.
✅ means the listed behavior passes on both runtimes; ❌ means unsupported,
incorrect, error, or missing evidence. Optional capabilities can also show ❌;
these tables do not certify complete specification compliance. Raw JSON and
failure reasons are saved under `.cache/compliance`.

Checks reuse benchmark adapters and literal scenarios from the same requirements
covered by `specification/compliance`. Client requests and HTTP responses are
observed only through injected mock transports; timed workers retain their normal
transport. Server implementation, application policy, arbitrary extension
processing, and extension/profile request negotiation remain outside this matrix.
