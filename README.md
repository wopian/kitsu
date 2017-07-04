# Kitsu

[![npm]][1]
[![npm installs]][1]
[![David]][7]

[![Travis]][2]
[![AppVeyor]][3]
[![CC Coverage]][4]
[![CC Score]][5]
[![CC Issues]][6]

Promise based NodeJS API wrapper for [Kitsu.io][KITSU]

## Features

- Supports OAuth2 authentication
- Supports the JSON API specification
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) API
- Retries on network failure
- Timeout handling

## Install

```bash
yarn add kitsu
```

or

```bash
npm install kitsu --save
```

## Usage

```javascript
// ES6/Babel/Webpack
import Kitsu from 'kitsu'
// CommonJS/Browserify
const Kitsu = require('kitsu')

const kitsu = new Kitsu()

kitsu.get('anime').then(res => console.log(res))
```

[More Examples](https://github.com/wopian/kitsu/tree/master/example)

## Docs

### kitsu.get(model, [options])

Returns a Promise of a `response` object

#### model

Type: `string`

The resource model to request. Check out the [Kitsu API documentation](https://docs.kitsu.apiary.io) for available models

#### options

Type: `object`

Any of the [JSON API](http://jsonapi.org/format/#fetching) request parameters

##### include

Type: `string`

Include relationships. Multiple includes are comma seperated

##### fields

Type: `object`

Returns only the specified fields

##### sort

Type: `string`

Sort lists by an attribute. Append `-` for descending order. Multiple sorts are comma seperated

##### page

Type: `object`

Limit number of returned resources (`page: { limit: 2 }`).

Offset returned resources (`page: { offset: 20 }`)

##### filter

Type: `object`

Filter returned resources by an attribute

## Contributing

### Requirements

- [git](https://git-scm.com/) 2.0.0 or newer
- [node.js](https://nodejs.org) 7.0.0 or newer
- [yarn](https://https://yarnpkg.com) 0.21.0 or newer (optional)

### Setup

1. Fork this repo

1. Clone your fork:

    ```bash
    git clone https://github.com/your-username/kitsu.git
    cd kitsu
    ```

1. Create a feature branch:

    ```bash
    git checkout -b your-feature-name
    ```

1. Install dependencies:

    ```bash
    yarn install
    # or
    npm install
    ```

1. Commit changes:

    ```bash
    git commit -am 'feat: add feature name'
    ```

1. Push changes:

    ```bash
    git push origin your-feature-name
    ```

1. Open a pull request

## Releases

See [CHANGELOG]

## License

All code released under [MIT]

[KITSU]:https://kitsu.io
[CHANGELOG]:https://github.com/wopian/kitsu-inactivity-pruner/blob/master/CHANGELOG.md
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
