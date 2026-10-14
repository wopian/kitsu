# JSON:API test fixtures

Fixture directories pair independent JSON:API documents in `jsonapi.ts` with
literal expected flat data in `kitsu.ts`. `index.ts` exports each pair.

[JSON:API 1.1 compliance](compliance/README.md) adds requirement traceability and
offline core/client tests. Run `bun run test:compliance`.
