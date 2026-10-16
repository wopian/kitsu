# Migration Guides

## Migrating to `13.0.0`

Version 13 keeps attributes flat, removes relationship `data` wrappers, and gives
resource metadata its own `$` object. The examples below use a fictional bakery API.

### Node.js support changes

Node.js 18, 19, 20, 21, 23, and 25 are no longer supported.

Move your application and CI to Node.js 22, 24, or 26 and later before upgrading.

Browser support remains available. TypeScript output targets ES2023.

### Read relationships directly

Suppose article `42`, "Moonlight Bread", has author Mina Reed. With the default
`hoistData: false`, change how you read the author:

```js
// Before
result.data.author.data.name // 'Mina Reed'
result.data.tags.data[0].name // 'Baking'

// After
result.data.author.name // 'Mina Reed'
result.data.tags[0].name // 'Baking'
result.data.editor // null when the server sends an empty to-one relationship
```

Relationships now return a resource, an array, or `null`. This works even when a
relationship has its own links or metadata. You do not need to enable hoisting.

Resources in `included` remain available at `result.included`. If Mina appears as
both author and reviewer, both properties point to the same decoded resource.
This also works for cycles and resources identified by a JSON:API local ID, `lid`.

### Keep resource metadata under `$`

Before, resource metadata shared property names with attributes. An attribute
named `meta` could hide the resource's metadata. Version 13 keeps both values.

For example, the server sends this article and metadata about the whole response:

```js
const document = {
  data: {
    type: 'articles',
    id: '42',
    attributes: {
      title: 'Moonlight Bread',
      meta: { summary: 'A recipe for night owls' }
    },
    meta: { reviewed: true },
    links: { self: '/articles/42' },
    relationships: {
      author: {
        data: { type: 'people', id: '9', meta: { role: 'writer' } },
        meta: { featured: true },
        links: { related: '/articles/42/author' }
      }
    }
  },
  included: [{ type: 'people', id: '9', attributes: { name: 'Mina Reed' }, meta: { verified: true } }],
  meta: { total: 1 }
}
```

Read the different values without mixing them:

```js
import { deserialise, serialise } from 'kitsu-core'

const result = deserialise(document)

result.data.title // 'Moonlight Bread'
result.data.meta.summary // 'A recipe for night owls': an attribute
result.data.$.meta.reviewed // true: metadata about this article
result.data.$.links.self // '/articles/42': a link for this article
result.meta.total // 1: metadata about the whole response
```

Document `meta`, `links`, and `jsonapi` stay beside `data`. They do not move into
the article's `$` object. Attributes named `links`, `lid`, or `attributes` also
remain ordinary attributes. A resource without extra metadata has no `$` object.

Relationship metadata belongs to the connection, not the linked person:

```js
const article = result.data

article.$.relationships.author.meta // { featured: true }: relationship metadata
article.$.relationships.author.links.related // URL for loading its author
article.$.relationships.author.data.meta // { role: 'writer' }: identifier metadata
article.author.$.meta // { verified: true }: metadata about Mina herself
```

On writes, put resource metadata under `$` too:

```js
// Before: resource metadata used the flat namespace
const before = { id: '42', title: 'Moonlight Bread', meta: { reviewed: true } }

// After: metadata and attributes have separate places
const after = {
  id: '42',
  title: 'Moonlight Bread',
  $: { meta: { reviewed: true } }
}

serialise('articles', after, 'PATCH').data.meta // { reviewed: true }
```

Pass metadata about the whole request through `options.document`:

```js
import { serialise } from 'kitsu-core'

serialise('articles', { title: 'Moonlight Bread' }, 'POST', {
  document: { meta: { source: 'bakery-editor' } }
})
// {
//   meta: { source: 'bakery-editor' },
//   data: { type: 'articles', attributes: { title: 'Moonlight Bread' } }
// }
```

Generated `data` stays under library control. Supplied `document.included` already
uses JSON:API format; it is merged by identity and its attribute names stay as supplied.

### Choose whether to unwrap the document

`hoistData` defaults to `false`. Enable it to remove a document containing only `data`:

```js
const document = {
  data: {
    type: 'articles', id: '42',
    attributes: { title: 'Moonlight Bread' },
    meta: { reviewed: true }
  }
}

deserialise(document, { hoistData: false })
// { data: { type: 'articles', id: '42', title: 'Moonlight Bread', $: { meta: { reviewed: true } } } }

deserialise(document, { hoistData: true })
// { type: 'articles', id: '42', title: 'Moonlight Bread', $: { meta: { reviewed: true } } }
```

Resource metadata under `$` does not prevent hoisting. Metadata about the whole
document does, because removing the document would lose that metadata:

```js
deserialise({ ...document, meta: { total: 1 } }, { hoistData: true })
// {
//   data: { type: 'articles', id: '42', title: 'Moonlight Bread', $: { meta: { reviewed: true } } },
//   meta: { total: 1 }
// }
```

Document `links`, `jsonapi`, and preserved `included` also keep the wrapper.
Even empty members, such as `meta: {}` or `included: []`, keep it.
For a document containing only `data`, core also unwraps arrays and `null`:

```js
deserialise({ data: [] }, { hoistData: true }) // []
deserialise({ data: null }, { hoistData: true }) // null
```

Before, hoisting also unwrapped attribute objects containing only `data`.
Version 13 leaves arbitrary JSON attributes alone:

```js
// A bakery stores this JSON attribute: preferences: { data: { newsletter: true } }
// Before, with hoistData: true
article.preferences.newsletter

// After, with hoistData: true or false
article.preferences.data.newsletter
```

### Convert attribute names only when enabled

Suppose the bakery API uses `first-name`, but your application prefers `firstName`.
Conversion is disabled by default:

```js
import { camel, deserialise, kebab, serialise, snake } from 'kitsu-core'

const document = {
  data: { type: 'people', id: '9', attributes: { 'first-name': 'Mina' } }
}

deserialise(document).data['first-name'] // 'Mina': disabled
deserialise(document, { attributeCase: camel }).data.firstName // 'Mina': enabled

const person = { id: '9', firstName: 'Mina' }

serialise('people', person, 'PATCH').data.attributes
// { firstName: 'Mina' }: disabled

serialise('people', person, 'PATCH', { attributeCase: kebab }).data.attributes
// { 'first-name': 'Mina' }: enabled

serialise('people', person, 'PATCH', { attributeCase: snake }).data.attributes
// { first_name: 'Mina' }: enabled
```

`deattribute(data, options)` and `linkRelationships(data, included, options)` accept
the same callback. Conversion also applies to included and related resources.
Nested JSON keys, relationship names, query names, metadata, IDs, and extension
members stay unchanged. For example, `preferences['email-frequency']` stays that way.

If `first-name` and `first_name` both become `firstName`, conversion throws rather
than choosing one value. Use consistent server names and callbacks that return
the same output for the same input. Conversion does not recover arbitrary original spellings.

### Send relationships without `data` wrappers

Change existing relationship input before passing it to `serialise`:

```js
// Before
const before = { author: { data: { type: 'people', id: '9' } } }

// After
const after = { author: { type: 'people', id: '9' } }

serialise('articles', after).data.relationships.author
// { data: { type: 'people', id: '9' } }
```

A `{ data: ... }` object is now an ordinary JSON attribute. The library adds the
JSON:API relationship wrapper itself.

A plain `null` means an attribute. Use `$` to clear a to-one relationship or to
keep an empty array or identifier-shaped object as an attribute:

```js
serialise('articles', {
  id: '42',
  subtitle: null, // an attribute
  tags: [], // clear a to-many relationship
  $: {
    attributes: {
      shoppingList: [], // an attribute, not a relationship
      reference: { type: 'recipe-card', id: 7 } // ordinary JSON
    },
    relationships: { editor: { data: null } } // clear a to-one relationship
  }
}, 'PATCH')
```

Values in `$.attributes` are always attributes, even if they look like relationships.
They replace same-named values in the flat object. If you change `article.author`,
the new person wins over the old identifier saved under `$`. Old identifier
metadata is reused only when the type and ID or local ID still match.

An identifier such as `{ type: 'people', id: '9' }` only creates linkage.
Add fields, such as `name: 'Mina Reed'`, to include the related resource in `included`.
The same resource is included only once, using its type and ID or local ID.
Conflicting full versions of the same resource throw;
use one consistent person object instead of two people with the same ID and different names.

Numeric input IDs, including `0`, become strings in the JSON sent to the server.
For a new resource without a server ID, use `$: { lid: 'draft-article' }`.
For relationship endpoints, pass `relationship: true` to serialize primary data as identifiers.

### Inputs and query encoding

Before, decoding could change the document you passed in. Version 13 leaves inputs
untouched and copies nested JSON values into the result. Changing the decoded
bakery preferences does not change your original response object.

Query spaces now use `+`, while a literal plus sign uses `%2B`:

```js
import { query } from 'kitsu-core'

query({ filter: { title: 'Tea + toast' } })
// 'filter%5Btitle%5D=Tea+%2B+toast'
```

Traditional and modern array modes remain available. Existing headers still
configure extensions and profiles; `jsonapi.ext` and `jsonapi.profile` describe a
document and do not configure headers. Unknown members are ignored; extension and
`@` members are preserved without interpreting them. Atomic Operations is not included.

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
