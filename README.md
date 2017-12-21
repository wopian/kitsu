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

A Simple framework agnostic [JSON:API] client for [Kitsu.io] and other spec compliant APIs

*For breaking changes in 3.0, check the [CHANGELOG][BREAKING]*

## Features

- Fully JSON-API compliant
- Automatically links relationships to data
- Works in Node and on the web
- Uses the [Promise] API
- Configurable timeout handling

## Install

### Yarn

```bash
yarn add kitsu
```

### NPM 5

```bash
npm install kitsu
```

## Response Comparison

A GET request to a JSON:API API returns:

```json5
{
  data: [
    {
      id: '4923ee67-19b0-4093-8aee-ab6ceeecf784'
      type: 'users'
      attributes: {
        name: 'wopian'
      }
      relationships: {
        followers: {
          data: [
            {
              id: '50cfe2db-8157-4999-be87-450fea1b4b52'
              type: 'follows'
            }
          ]
        }
      }
    }
  ]
  included: [
    {
      id: '50cfe2db-8157-4999-be87-450fea1b4b52'
      type: 'follows'
      attributes: {
        createdAt: '2017-08-24T02:36:26.006Z'
      }
    }
  ]
}
```

A GET request made with `kitsu` returns:
```json5
{
  data: [
    {
      id: '4923ee67-19b0-4093-8aee-ab6ceeecf784'
      type: 'users'
      name: 'wopian'
      followers: [
        {
          id: '50cfe2db-8157-4999-be87-450fea1b4b52'
          type: 'follows'
          createdAt: '2017-08-24T02:36:26.006Z'
        }
      ]
    }
  ]
}
```

## Usage

```javascript
// ES2015+/Babel
import Kitsu from 'kitsu'
// CommonJS/Browserify
const Kitsu = require('kitsu')

// For kitsu.io developers
const api = new Kitsu()

// For other JSON-API uses
// e.g api.example.org/2
const api = new Kitsu({
  baseURL: 'https://api.example.org',
  version: 2
})

// Get a collection of resources
api.get('anime').then(res => console.log(res))

// Get a resource
api.get('anime/1')

// Get a resource's relationship
api.get('anime/1/episodes')

// Create a resource
api.create('post', {
  content: 'some content'
})

// Update a resource
api.update('post', {
  id: '1',
  content: 'new content'
})

// Delete a resource
api.remove('post', 1)

// Destructuring with Async/Await
const { id } = await kitsu.get('users', {
  filter: { id: 2 }
})
```

[More Examples]

## Docs

You can find the kitsu package [documentation here][Kitsu Docs]

If you're working with [Kitsu.io]'s API, their [API documentation][Kitsu.io API Docs] lists all available
models with their attributes and relationships

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
[Kitsu Docs]:https://github.com/wopian/kitsu/tree/master/DOCS.md
[Kitsu.io API Docs]:https://kitsu.docs.apiary.io

[BREAKING]:https://github.com/wopian/kitsu/blob/master/CHANGELOG.md#breaking-changes
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

[cc coverage]:https://codeclimate.com/github/wopian/kitsu/coverage
[cc coverage badge]:https://img.shields.io/codeclimate/coverage/github/wopian/kitsu.svg?style=flat-square
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
