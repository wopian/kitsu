# JSON:API 1.1 compliance

Run `bun run test:compliance`. Normal `bun test --check` and CI also discover this suite.
Tests run offline. HTTP tests use an isolated Axios mock adapter per client.

Specification: https://jsonapi.org/format/1.1/

## Traceability

`requirements.json` records all 205 normative paragraph/list blocks in the pinned
1.1 HTML, including recommendations and optional features. Each entry identifies
its section, ordinal within that section, normative strengths, and SHA-256 of its
normalized source text. Nested list obligations may also occur in a parent block.
Source hashes identify text without copying the specification into this repository.

Every entry maps to named executable scenarios or an explicit boundary.
`requirements.spec.ts` rejects missing scenario references and skipped compliance tests.
Tests assert literal expected documents; expected output never calls production codecs.

- `Dxx`: document shapes, resource envelopes, links, errors, and arbitrary JSON.
- `Lxx`: compound documents, local identity, canonical references, and sparse fieldsets.
- `Sxx`: generated request documents, identifier projection, and conflicts.
- `Qxx`: query encoding and standard parameter values.
- `Hxx`: client headers, URLs, bodies, status handling, and errors.

## Boundaries

This suite verifies client capabilities, not a JSON schema validator.
Incoming server documents are assumed compliant; unknown members do not change
core interpretation. Metadata, namespaced members, and @-members remain opaque.

Server storage, authorization, transactions, endpoint availability, sorting,
pagination execution, and server negotiation decisions cannot be certified by
mocked client tests. Tests verify the corresponding client requests and responses.

Callers choose globally unique client-generated IDs, valid URIs/language tags,
extension namespaces and semantics, and appropriate request headers. Specify
applied extensions/profiles in `Content-Type`; document `jsonapi.ext/profile`
does not negotiate them. No Atomic Operations or arbitrary extension processing.

Legacy resource-array writes remain available for existing bulk integrations.
They are not base JSON:API resource creation/update compliance. Relationship-array
writes are base JSON:API and covered independently.
