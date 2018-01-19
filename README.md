# Kitsu

[![npm badge]][npm]
[![npm install badge]][npm]
[![david badge]][david]
[![contributors badge]][contributors]
[![donate badge]][donate]

[![travis badge]][travis]
[![appveyor badge]][appveyor]
[![david dev badge]][david dev]
[![cc maintainability badge]][cc maintainability]
[![cc coverage badge]][cc coverage]

A simple, lightweight & framework agnostic [JSON:API] client for [Kitsu.io] and other APIs

*Check out the [Migration Guide] for breaking changes and new features in `4.x`*

## Features

- JSON-API 1.0 compliant
- Automatically links relationships to data
- Works in Node and on the web
- Uses the [Promise] API
- Configurable timeout handling

## Install

```bash
yarn add kitsu
npm install kitsu
```

## Node / Browser Support

| Package   | Package<br> Size | Node | Chrome | Firefox | Safari | Edge | IE
| --------: | :--------------: | :--: | :----: | :-----: | :----: | :--: | :-:
| [Default] | 17.8 kb          | 6+   | 49+    | 57+     | 10.1+  | 15+
| [Legacy]  | 19.8 kb          | 6+   | 4+     | 3+      | 3.1+   | 12+  | 8+
| Node      | 14.0 kb          | 6+

[Default]:http://browserl.ist/?q=last+2+years%2C+not+%3C+0.5%25
[Legacy]:http://browserl.ist/?q=last+10+years

## Response Comparison

A GET response by a JSON:API server returns:

```json5
{
  data: {
    id: '1'
    type: 'articles'
    attributes: {
      title: 'JSON API paints my bikeshed'
    }
    relationships: {
      author: {
        data: {
          id: '42'
          type: 'people'
        }
      }
    }
  }
  included: [
    {
      id: '42'
      type: 'people'
      attributes: {
        name: 'John'
      }
    }
  ]
}
```

A GET request with `kitsu` returns:
```json5
{
  data: {
    id: '1'
    type: 'articles'
    title: 'JSON API paints my bikeshed'
    author: {
      id: '42',
      type: 'people'
      name: 'John'
    }
  }
}
```

## Usage

```javascript
import Kitsu from 'kitsu'                 // ES Modules and Babel
const Kitsu = require('kitsu')            // CommonJS and Browserify
const Kitsu = require('kitsu/lib/legacy') // Legacy IE8+ support
const Kitsu = require('kitsu/lib/node')   // Lighter node-only package

const api = new Kitsu()                   // For kitsu.io developers

const api = new Kitsu({                   // For other JSON:API servers
  baseURL: 'https://api.example/2'        // e.g https://api.example/2
})

const { data } = await api.get('anime')   // Using with async/await

api.get('anime')                          // Using with Promises
  .then(({ data }) => { ... })
  .catch(err => throw err)

// Fetching resources with get() or fetch()
api.get('anime', { params }, { headers }) // Collection of resources
api.get('anime/1')                        // Single resource
api.get('anime/1/episodes')               // Single resource's relationship

// Creating resources with post() or create()
api.create('post', {
  content: 'some content'
})

// Updating resources with patch() or update()
api.update('post', {
  id: '1',
  content: 'new content'
})

// Deleting resources
api.remove('post', 1)
```

[Read the Documentation]

[More Examples]

If you're working with [Kitsu.io]'s API, their [API docs][Kitsu.io API Docs] lists all available resources with their attributes and relationships

## Contributing

See [CONTRIBUTING]

## Releases

See [CHANGELOG]

## License

All code released under [MIT]

[Kitsu.io]:https://kitsu.io
[JSON:API]:http://jsonapi.org
[Promise]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
[More Examples]:https://github.com/wopian/kitsu/tree/master/example
[Read the Documentation]:https://github.com/wopian/kitsu/blob/v4.3.0/DOCS.md
[Kitsu.io API Docs]:https://kitsu.docs.apiary.io

[Migration Guide]:https://github.com/wopian/kitsu/blob/master/MIGRATING.md
[CHANGELOG]:https://github.com/wopian/kitsu-inactivity-pruner/blob/master/CHANGELOG.md
[CONTRIBUTING]:https://github.com/wopian/kitsu-inactivity-pruner/blob/master/CONTRIBUTING.md
[MIT]:https://github.com/wopian/kitsu/blob/master/LICENSE.md

[npm]:https://www.npmjs.com/package/kitsu
[npm badge]:https://img.shields.io/npm/v/kitsu.svg?style=flat-square
[npm install badge]:https://img.shields.io/npm/dt/kitsu.svg?style=flat-square

[travis]:https://travis-ci.org/wopian/kitsu
[travis badge]:https://img.shields.io/travis/wopian/kitsu/master.svg?style=flat-square&label=linux%20%26%20macOS

[appveyor]:https://ci.appveyor.com/project/wopian/kitsu
[appveyor badge]:https://img.shields.io/appveyor/ci/wopian/kitsu/master.svg?style=flat-square&label=windows

[cc coverage]:https://codeclimate.com/github/wopian/kitsu/code
[cc coverage badge]:https://img.shields.io/codeclimate/c/wopian/kitsu.svg?style=flat-square
[cc maintainability]:https://codeclimate.com/github/wopian/kitsu
[cc maintainability badge]:https://img.shields.io/codeclimate/maintainability/wopian/kitsu.svg?style=flat-square

[david]:https://david-dm.org/wopian/kitsu
[david badge]:https://img.shields.io/david/wopian/kitsu.svg?style=flat-square
[david dev]:https://david-dm.org/wopian/kitsu?type=dev
[david dev badge]:https://img.shields.io/david/dev/wopian/kitsu.svg?style=flat-square

[contributors]:https://github.com/wopian/kitsu/graphs/contributors
[contributors badge]:https://img.shields.io/github/contributors/wopian/kitsu.svg?style=flat-square

[donate]:https://www.patreon.com/wopian
[donate badge]:https://img.shields.io/badge/patreon-donate-ff69b4.svg?style=flat-square
