# Migration Guides

## JSON:API 1.1 behavior changes

Node support covers 22, 24, and 26. Node 18, 19, 20, 21, 23, and 25 are no
longer supported. Browser support remains available; TypeScript targets ES2023.

Encoding copies output values during construction. Decoding allocates resources
before linking relationships, including deeply nested cycles. Input documents and
payloads remain untouched; returned JSON values remain independent copies.

Relationships now return direct resources, arrays, or null. Replace
`resource.author.data.name` with `resource.author.name`. Resources share identity
within each document, including cycles and `lid` aliases. Decoding never mutates
input. Supplied `included` remains available, including resources whose linkage
is absent because of sparse fieldsets.

Resource metadata moves under `$`:

```js
resource.$.meta
resource.$.links.self
resource.$.lid
resource.$.relationships.author.meta
resource.$.relationships.author.links.related
resource.$.relationships.author.data.meta // identifier metadata, separate from resource metadata
```

Attributes named `meta`, `links`, `lid`, or `attributes` remain ordinary attributes.
Resources with no metadata have no `$`. Unknown resource/document members are
ignored; namespaced and @-members remain opaque.

Writes accept direct relationships only. Existing `{ data: ... }` wrappers are
ordinary JSON attributes; migrate to direct identifiers:

```js
const input = {
  title: 'Hello',
  author: { type: 'people', id: '9' },
  tags: [], // empty to-many relationship
  $: {
    lid: 'draft-1',
    meta: { draft: true },
    attributes: { values: [], payload: { type: 'plain JSON', id: 1 } },
    relationships: {
      author: { meta: { role: 'primary' } },
      editor: { data: null } // clear to-one relationship
    }
  }
}
```

Plain null is an attribute. Empty arrays and objects carrying an identifier imply
relationships. Use `$.attributes` to force ambiguous JSON attributes. Explicit
attributes override inference. Related objects with fields enter `included`;
linkage contains only identifiers. Conflicting full representations of one identity
throw. Numeric input IDs, including 0, become strings on the wire.

Pass top-level members through `SerialiseOptions.document` or kitsu request
`config.document`. Generated primary data cannot be overridden. To serialize
relationship primary linkage with core, pass `relationship: true`.

Relationship metadata merges with generated linkage. A supplied direct relationship
controls its current linkage. Saved identifier metadata applies only to matching
identities; it never overwrites shared resource metadata.

`hoistData` unwraps only documents containing solely `data`, including null and
arrays. Document metadata keeps the document wrapper. HTTP responses keep arrays
and null under `data` so status and headers cannot replace their values. Nested attribute objects
containing `data` are never unwrapped.

Query encoding follows form serialization: spaces become `+`; literal plus signs
become `%2B`. Traditional and modern implementation-specific array modes remain.

Extensions and profiles use existing headers. Supply quoted URI lists in
`Content-Type` and optional `Accept` parameters. `jsonapi.ext/profile` is document
metadata, not negotiation. Atomic Operations is outside this support.


## Migrating to `12.0.0`

Both packages now publish ESM only. Replace `require()` with `import`, and enable ESM in your application with `"type": "module"` or an `.mjs` file. CommonJS exports and UMD bundles, including the `kitsuCore` global, are removed.

## Migrating to `10.0.0`

### Exports

The compiled output of `kitsu-core` has been changed from `lib` to `dist`.

```js
// Legacy behaviour, any of:
import kitsu from 'kitsu-core'
import { serialise } from 'kitsu-core'
import { serialise } from 'kitsu-core/lib/serialise'

// New behaviour, any of:
import kitsu from 'kitsu-core'
import { serialise } from 'kitsu-core'
import { serialise } from 'kitsu-core/serialise' // Node 12+
import { serialise } from 'kitsu-core/dist/serialise'
```

### `camel`, `kebab` and `snake`

These exports are now named exports instead of default exports.

```js
// Legacy behaviour, any of:
import { camel } from 'kitsu-core'
import camel from 'kitsu-core/lib/camel'

// New behaviour, any of:
import { camel } from 'kitsu-core'
import { camel } from 'kitsu-core/camel'
import { camel } from 'kitsu-core/dist/camel'
```

### Serialising

`serialise` has been refactored to match the v9 `deserialise` behaviour. This was intended for the v9 release, however it slipped though the net and resulted in broken relationship serialisation in v9.

Relationships given to the `serialise` function are now always an object containing either a `data` object or a `data` array. This allows for optional top-level relationship `links` and `meta` objects to be serialised into the JSON:API format.

Exemptions:
- `links` that are not objects or do not contain `self` or `related` will become attributes as normal
- `meta` that are not objects will become attributes as normal

#### Legacy Input

```js
{
  id: '1',
  type: 'libraryEntries',
  links: { self: 'library-entries/1' }
  user: { // one-to-one relationship
    id: '2',
    type: 'users',
    links: { self: 'users/2' }
    name: 'Example'
  },
  unit: [ // one-to-many relationship
    {
      id: '3',
      type: 'episodes',
      links: { self: 'episodes/3' }
      number: 12
    }
  ]
}
```

##### Legacy Output

```js
data: {
  id: '1',
  type: 'libraryEntries',
  attributes: {
    links: { self: 'library-entries/1' }
  },
  relationships: {
    user: {
      data: {
        id: '2',
        type: 'users',
        attributes: {
          links: { self: 'users/2' }
          name: 'Example'
        }
      }
    },
    unit: {
      data: [
        {
          id: '3',
          type: 'episodes',
          attributes: {
            links: { self: 'episodes/3' }
            number: 12
          }
        }
      ]
    }
  }
}
```

#### New Input

```js
{
  id: '1',
  type: 'libraryEntries',
  links: { self: 'library-entries/1' }
  user: { // one-to-one relationship
    links: {
      self: 'library-entries/1/relationships/user'
      related: 'libary-entries/1/user'
    },
    data: {
      id: '2',
      type: 'users',
      links: { self: 'users/2' }
      name: 'Example'
    }
  },
  unit: { // one-to-many relationship
    links: {
      self: 'library-entries/1/relationships/unit',
      related: 'library-entries/1/unit'
    },
    data: [
      {
        id: '3',
        type: 'episodes',
        links: { self: 'episodes/3' },
        number: 12
      }
    ]
  }
}
```

##### New Output

```
data: {
  id: '1',
  type: 'libraryEntries',
  links: { self: 'library-entries/1' },
  relationships: {
    user: {
      links: {
        self: 'library-entries/1/relationships/user'
        related: 'libary-entries/1/user'
      },
      data: {
        id: '2',
        type: 'users',
        links: { self: 'users/2' },
        attributes: {
          name: 'Example'
        }
      }
    },
    unit: {
      links: {
        self: 'library-entries/1/relationships/unit',
        related: 'library-entries/1/unit'
      },
      data: [
        {
          id: '3',
          type: 'episodes',
          links: { self: 'episodes/3' },
          attributes: {
            number: 12
          }
        }
      ]
    }
  }
}
```

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
    self: 'library-entries/1'
  },
  attributes: {
    ratingTwenty: 10
  },
  relationships: {
    user: {
      links: {
        self: 'library-entries/1/relationships/user',
        related: 'library-entries/1/user'
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
      self: 'users/2'
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
    self: 'library-entries/1'
  },
  ratingTwenty: 10,
  user: {
    links: {
      self: 'library-entries/1/relationships/user',
      related: 'library-entries/1/user'
    },
    data: {
      id: '2',
      type: 'users',
      links: {
        self: 'users/2'
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
