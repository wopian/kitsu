# JSON:API benchmarks

Private workspace. No package version or npm publication. Dependencies belong to this workspace;
source fixtures come from `specification/*/jsonapi.ts`. One adapter folder per library.

```sh
bun install --frozen-lockfile
bun run build
bun run benchmark
bun run benchmark:smoke
bun run benchmark --runtime node --base-root .cache/benchmark-base
bun run benchmark --runtime bun --library kitsu-core
bun run benchmark:report .cache/benchmark
```

Build both checkouts before using `--base-root`. Node 26 and Bun 1.4.3 run separate measurements.
Bun workers disable repository TypeScript path aliases, so each checkout loads its own built
Kitsu packages and production dependencies. Competitors, adapters, and fixtures stay identical
between base and proposed changes. Samples alternate base/head order on one runner.

Codec results measure decode, encode, and decode-encode operations/s. Client results measure
mocked requests/s through public HTTP operations. Client decode-encode performs GET then PATCH;
results also show cycles/s. Encode-only uses prepared native data and an empty HTTP 204 response.
HTTP 204 responses carry no content-type header. No server or network latency is measured.

Encoding writes primary attributes and relationship identifiers. Included resources affect decoding,
not encode-only work. Decode-encode includes conversion of decoded primary resources into native
write data. This avoids feeding hydrated graphs to serializers that require identifier-only input.
Yayson collection writes dispatch its public single-resource presenter for each primary resource.
Single-resource clients do not receive invented bulk APIs; collection writes are unsupported.
Kitsu collection writes use its existing bulk extension.

Every operation receives fresh input and an empty identity store. Fixture preparation, cloning,
model registration, store reset, and mock response text creation stay outside timing. Library
conversion, lazy relationship traversal, and mock transport overhead stay inside timing. Per-operation
timers count only measured work within 250 ms sample windows after a 250 ms warmup;
report median of five samples. Preparation can reduce sample operation counts but never enters throughput's time denominator.
Spread is sample range divided by median. Smoke uses 1 ms warmup and five 2 ms samples with smaller
stress fixtures; smoke results cannot publish README updates. Workers stop after 30 seconds.

Correctness checks require primary attributes, cardinality, identifiers, and included attributes
through nested and circular relationships. Links/meta retention is outside throughput scoring.
No library earns a score by returning missing relationships or nonstandard resource linkage.
Results distinguish unsupported APIs, incorrect output, thrown library errors, and worker timeouts.
Existing library behavior is measured; benchmark work does not repair library implementations.

Artifacts live in `.cache/benchmark/results-{node,bun}.json` and `report.md`. PR comments label
every positive/negative throughput change faster/slower, including changes within measurement noise.
Benchmark and publishing workflows remain advisory. Existing quality checks still enforce harness
tests, types, and formatting.

Publisher executes only trusted default-branch code. It reads bounded JSON artifacts, validates
SHAs against GitHub, and updates one bot comment per PR. Master publication edits only root README's
benchmark markers using a non-forced branch update. Stale runs preserve existing results.
