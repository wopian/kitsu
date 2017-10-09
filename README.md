# Kitsu

[![npm]][1]
[![npm installs]][1]
[![David]][7]

[![Travis]][2]
[![AppVeyor]][3]
[![CC Coverage]][4]
[![CC Score]][5]
[![CC Issues]][6]

Simple, lightweight & framework agnostic [JSON-API][15] client for [Kitsu.io][KITSU] and other API backends

*For breaking changes in 3.0, check the [CHANGELOG][16]*

## Features

- Fully JSON-API complient
- Works in Node and the web
- Uses the [Promise][10] API
- Timeout handling

## Install

### Yarn

```bash
yarn add kitsu
```

### NPM 5

```bash
npm install kitsu
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

[More Examples][11]

## Docs

You can find the kitsu package [documentation here][13]

Check out the [Kitsu.io API documentation][12] for all the available
models with their attributes and relationships

## Contributing

See [CONTRIBUTING]

## Releases

See [CHANGELOG]

## License

All code released under [MIT]

[KITSU]:https://kitsu.io
[CHANGELOG]:https://github.com/wopian/kitsu-inactivity-pruner/blob/master/CHANGELOG.md
[CONTRIBUTING]:https://github.com/wopian/kitsu-inactivity-pruner/blob/master/CONTRIBUTING.md
[MIT]:https://github.com/wopian/kitsu/blob/master/LICENSE.md

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
[16]:https://github.com/wopian/kitsu/blob/master/CHANGELOG.md#breaking-changes
