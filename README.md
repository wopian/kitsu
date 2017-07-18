# Kitsu

[![npm]][1]
[![npm installs]][1]
[![David]][7]

[![Travis]][2]
[![AppVeyor]][3]
[![CC Coverage]][4]
[![CC Score]][5]
[![CC Issues]][6]

Lightweight [JSON-API][15] client for [Kitsu.io][KITSU] and other complient APIs

While yet another [JavaScript client implementation][14], none offer a simple
solution with the needed features or without unneeded annoyances

## Features

- Supports OAuth2 token authentication
- Uses the [Promise][10] API
- Retries on network failure
- Timeout handling

## Install

```bash
yarn add kitsu
```

```bash
npm install kitsu --save
```

## 1.x to 2.0 Migration Guide

`2.0` contains several breaking changes to match `devour-client`

### Changes

- Attributes have been moved to the parent object
  - `data.attributes.canonicalTitle` becomes `data.canonicalTitle`

- The relationship name is now used in the `GET` output instead of the relationship type, i.e:
  - In 1.x, the `waifu` relationship erroneously became `characters: {}`
  - In 2.x it remains `waifu: {}`

- Removing resources has been simplified
  - `kitsu.remove('model', { id: 1 })` becomes `kitsu.remove('model', 1)`

### Removed

- `header` (previously `setHeader`) has been removed. Identical implementation was already provided
  by `headers`
  - `kitsu.header('key', 'value')` becomes `kitsu.headers['key'] = 'value'`
  - `kitsu.headers['key']` returns the header's `value` (1.x)

## Usage

```javascript
// ES6/Babel/Webpack
import Kitsu from 'kitsu'
// CommonJS/Browserify
const Kitsu = require('kitsu')

// For kitsu.io developers
const kitsu = new Kitsu()

// For other JSON-API uses
const example = new Kitsu({
  apiUrl: 'https://example.org/api'
})

// Get a collection of resources
kitsu.get('anime').then(res => console.log(res))

// Get a resource
kitsu.get('anime/1')

// Create a resource
kitsu.post('post', {
  content: 'some content'
})

// Update a resource
kitsu.patch('post', {
  id: '1',
  content: 'new content'
})

// Delete a resource
kitsu.remove('post', 1)
```

[More Examples][11]

## Docs

You can find the kitsu package [documentation here][13]

Check out the [Kitsu.io API documentation][12] for all the available
models and their responses and relationships

## Contributing

See [CONTRIBUTING]

## Releases

See [CHANGELOG]

## License

All code released under [MIT]

[KITSU]:https://kitsu.io
[CHANGELOG]:https://github.com/wopian/kitsu-inactivity-pruner/blob/master/CHANGELOG.md
[CONTRIBUTING]:https://github.com/wopian/kitsu-inactivity-pruner/blob/master/CONTRIBUTING.md
[MIT]:https://github.com/wopian/kitsu-inactivity-pruner/blob/master/LICENSE.md

[npm]:https://img.shields.io/npm/v/kitsu.svg?style=flat-square
[npm installs]:https://img.shields.io/npm/dt/kitsu.svg?style=flat-square
[Travis]:https://img.shields.io/travis/wopian/kitsu/master.svg?style=flat-square&label=linux%20%26%20macOS
[CC Coverage]:https://img.shields.io/codeclimate/coverage/github/wopian/kitsu.svg?style=flat-square
[CC Score]:https://img.shields.io/codeclimate/github/wopian/kitsu.svg?style=flat-square
[CC Issues]:https://img.shields.io/codeclimate/issues/github/wopian/kitsu.svg?style=flat-square
[David]:https://img.shields.io/david/wopian/kitsu.svg?style=flat-square
[AppVeyor]:https://img.shields.io/appveyor/ci/wopian/kitsu/master.svg?style=flat-square&label=windows
[1]:https://www.npmjs.com/package/kitsu
[2]:https://travis-ci.org/wopian/kitsu
[3]:https://ci.appveyor.com/project/wopian/kitsu
[4]:https://codeclimate.com/github/wopian/kitsu/coverage
[5]:https://codeclimate.com/github/wopian/kitsu
[6]:https://codeclimate.com/github/wopian/kitsu/issues
[7]:https://david-dm.org/wopian/kitsu
[8]:https://github.com/wopian/kitsu/blob/master/CHANGELOG.md
[9]:https://github.com/wopian/kitsu/blob/master/LICENSE.md
[10]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
[11]:https://github.com/wopian/kitsu/tree/master/example
[12]:https://docs.kitsu.apiary.io
[13]:https://github.com/wopian/kitsu/tree/master/DOCS.md
[14]:http://jsonapi.org/implementations/#client-libraries-javascript
[15]:http://jsonapi.org
