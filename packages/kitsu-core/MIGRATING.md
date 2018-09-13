# Migration Guides

## Migrating to `7.0.0`

Dropped Node 6 support. Lowest supported version is now Node 8.

`kitsu-core/node` now exists as a standalone package called `kitsu-core-node`. This has no dependency on Babel Runtime, as it's required only by the browser version of `kitsu-core`.

## Migrating to `6.0.0`

### Babel 7

Kitsu Core now depends on Babel 7 with a significantly lower package size (over 50% reduction for the node variant). If your web app depends on Babel 6 you may want to hold off upgrading as you'll have two runtimes in your web bundles.

### Legacy Bundle

`kitsu-core/legacy` has been removed as it didn't see any usage.

### Nested Query Parameters

Query parameters handling has been rewritten to support nested parameters. This should not be a breaking change for daily use, but edge cases may be effected.

```js
// Returns %2Fresources%3Ffilter%5BmyFilter%5D%5Bcontent%5D%5Bname%5D%3Dfilter_name
kitsuCore.query({
  filter: {
    myFilter: {
      content: {
        name: 'filter_name'
    }
  }
})
```
