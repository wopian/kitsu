# Migration

Use resource methods and JSON:API options as with kitsu. Replace `axiosOptions` with `fetchOptions`.
Inject `fetch` for custom transport. Replace Axios interceptor hooks with a fetch wrapper.
Response headers use native `Headers`. Errors expose original `Response` and parsed JSON:API `document`.
See kitsu-core migration guide for flat relationships and resource metadata under `$`.
