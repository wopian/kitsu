# Migration Guides

## Migrating to `6.0.0`

Kitsu Core now depends on Babel 7 with a significantly lower package size (over 50% reduction for the node variant). If your web app depends on Babel 6 you may want to hold off upgrading as you'll have two runtimes in your web bundles.

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
