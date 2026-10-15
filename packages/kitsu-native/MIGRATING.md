# Migration

Use resource methods and JSON:API options as with kitsu. Replace `axiosOptions` with `fetchOptions`.
Inject `fetch` for custom transport. Replace Axios interceptor hooks with a fetch wrapper.
Response headers use native `Headers`. Errors expose original `Response` and parsed JSON:API `document`.
See kitsu-core migration guide for flat relationships and resource metadata under `$`.

`attributeCase: 'kebab' | 'snake' | 'none'` matches kitsu. Default `'none'` preserves
attribute names. Enabled modes decode camelCase and encode the selected wire case.
Nested JSON keys, relationships, queries, and metadata stay unchanged. Name
collisions reject. See the kitsu migration guide for usage examples.

Document metadata remains beside `data`; resource metadata belongs under `$`.
`hoistData: true` keeps documents with `meta`, `links`, `jsonapi`, or `included`
wrapped. Relationships always flatten, including those carrying empty metadata.
