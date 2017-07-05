# Kitsu

[![Greenkeeper badge](https://badges.greenkeeper.io/wopian/kitsu.svg)](https://greenkeeper.io/)

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
  - Serialises and deserialises requests for pain-free usage
- Supports the [Promise][10] API
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

[More Examples][11]

## Docs

- [new Kitsu([options])](#new-Kitsuoptions)
- [kitsu.auth([options])](#kitsuauthoptions)
- [kitsu.delete(model, data)](#kitsudeletemodel-data)
- [kitsu.get(model, [options])](#kitsugetmodel-options)
- [kitsu.patch(model, data)](#kitsupatchmodel-data)
- [kitsu.post(model, data)](#kitsupostmodel-data)
- [kitsu.whoAmI([options])](#kitsuwhoamioptions)
- [kitsu.headers](#kitsuheaders)
- [kitsu.isAuth](#kitsuisauth)

### new Kitsu([options])

Creates a new instance with the required JSON API headers already
set

#### options

Type: `object`

##### headers

Type: `object`

Add extra headers to be sent with all requests, or override the
default `user-agent` header
(`Kitsu/<version> (https://github.com/wopian/kitsu)`)

If you already have an `accessToken` for authentication, you can
construct the `authorization` header here with
`authorization: 'Bearer <accessToken>'`

##### retries

Type: `number`
Default: `2`

Number of times to retry requests after network failures

##### timeout

Type: `number`
Default: `30000`

Milliseconds to wait before aborting the request with an `ETIMEDOUT`
error

##### useElectronNet

Type: `boolean`
Default: `true`

When used in Electron, Kitsu will automatically use
[electron.net][14] instead of the NodeJS `http` module

### kitsu.auth([options])

Returns a Promised object containing an `accessToken` on successful
authentication

The `authorization` header is automatically applied and passed in
all subsequent `DELETE`, `GET`, `PATCH` and `POST` requests

#### options

Type: `object`

Inputs for the OAuth 2 Authorization Code grant type. See the
[Kitsu API documentation][12] for further details

##### clientId (required)

Type: `string`

##### clientSecret (required)

Type: `string`

##### username (required)

Type: `string`

##### password (required)

Type: `string`

### kitsu.delete(model, data)

Not yet implemented!

### kitsu.get(model, [options])

Returns a Promised `response` object

#### model

Type: `string`

The resource model to request. Check out the [Kitsu API documentation][12] for
available models

#### options

Type: `object`

Any of the [JSON API][13] request parameters

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

### kitsu.patch(model, data)

Not yet implemented!

### kitsu.post(model, data)

Not yet implemented!

### kitsu.whoAmI([options])

Returns a Promised object containing the user data if the
`authorization` header is set

#### options

Type: object

##### compact

Type: boolean
Default: false

Returns just the user ID and name if `true`

### kitsu.headers

Type: `object`

Returns the current headers

### kitsu.isAuth

Type: `boolean`

Returns `true` if the `authorization` header is set

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
[10]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
[11]:https://github.com/wopian/kitsu/tree/master/example
[12]:https://docs.kitsu.apiary.io
[13]:http://jsonapi.org/format/#fetching
[14]:https://electron.atom.io/docs/api/net/
