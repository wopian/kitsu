# Migration Guides

## Migrating to `9.0.0`

### Deserialising

`deserialise` and `linkRelationships` have been refactored. They now preserve `link` objects from relationships and match the structure of the root `data` object/array.
- Root `data` self links are avaiable as `data.links` or `data[].links`
- Relationship objects are now `relationshipName.data.id` from `relationshipName.id`
- Relationship arrays are now `relationshipName.data[].id` from `relationshipName[].id`
- Relationship links are avaiable as `relationshipName.links`

For the full change in behaviour, see the legacy and new outputs below.

#### Legacy Behaviour

Input:

```js
data: {
  id: '1',
  type: 'libraryEntries'
  links: {
    self: 'https://kitsu.io/api/edge/library-entries/1'
  },
  attributes: {
    ratingTwenty: 10
  },
  relationships: {
    user: {
      links: {
        self: 'https://kitsu.io/api/edge/library-entries/1/relationships/user',
        related: 'https://kitsu.io/api/edge/library-entries/1/user'
      },
      data: {
        id: '2',
        type: 'users'
      }
    }
  }
},
included: [
  {
    id: '2',
    type: 'users',
    links: {
      self: 'https://kitsu.io/api/edge/users/2'
    },
    attributes: {
      name: 'Example'
    }
  }
```

Output:

```js
data: {
  id: '1',
  type: 'libraryEntries',
  ratingTwenty: 10,
  user: {
    id: '2',
    type: 'users',
    name: 'Example'
  }
}
```

#### New Behaviour


Output with same input data as legacy behaviour:

```js
data: {
  id: '1',
  type: 'libraryEntries',
  links: {
    self: 'https://kitsu.io/api/edge/library-entries/1'
  },
  ratingTwenty: 10,
  user: {
    links: {
      self: 'https://kitsu.io/api/edge/library-entries/1/relationships/user',
      related: 'https://kitsu.io/api/edge/library-entries/1/user'
    },
    data: {
      id: '2',
      type: 'users',
      links: {
        self: 'https://kitsu.io/api/edge/users/2'
      },
      name: 'Example'
    }
  }
}
```

### Serialising

`serialise` has been refactored. It now passes camel case and pluralisation options as argument options. Options are 100% optional and will default to no conversion or pluralisation (e.g libraryEntry -> libraryEntry).

#### Legacy Syntax

```js
import { serialise, camel, kebab } from 'kitsu-core'
import plural from 'pluralize'

serialise.apply({ camel, resCase: kebab, plural }, [ model, obj, 'PATCH' ])
```

#### New Syntax

```js
import { serialise, camel } from 'kitsu-core'
import plural from 'pluralize'

serialise(model, obj, 'PATCH', {
  camelCaseTypes: camel,
  pluralTypes: plural
})
```

## Migrating to `8.0.0`

Dropped Node 8 support. Lowest supported version is now Node 10.

`kitsu-core/node` has been removed as it is now identical to`kitsu-core`.

- Replace `kitsu-core/node` imports with `kitsu-core`
- Replace `kitsu-core/node/index.mjs` imports with `kitsu-corelib/index.mjs`

## Migrating to `7.0.0`

Dropped Node 6 support. Lowest supported version is now Node 8.

~~`kitsu/node` now exists as a standalone package called `kitsu-node`. This has no dependency on Babel Runtime, as it's required only by the browser version of `kitsu`.~~ Change reverted.

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
