## 2.0.0 (2017-07-18)

##### **BREAKING CHANGES**

- Attributes have been moved to the parent object
  - `data.attributes.canonicalTitle` becomes `data.canonicalTitle`

- The relationship name is now used in the `GET` output instead of the relationship type, i.e:
  - In 1.x, the `waifu` relationship erroneously became `characters: {}`
  - In 2.x it remains `waifu: {}`

- Removing resources has been simplified
  - `kitsu.remove('model', { id: 1 })` becomes `kitsu.remove('model', 1)`

- `header` (previously `setHeader`) has been **removed**. Identical implementation was already provided
  by `headers`
  - `kitsu.header('key', 'value')` becomes `kitsu.headers['key'] = 'value'`
  - `kitsu.headers['key']` returns the header's `value` (1.x)

##### Build System / Dependencies

* update path to test coverage ([a167daa4](https://github.com/wopian/kitsu/commit/a167daa494d0f36b3e4dd59cd984a6b6647254c4))

##### Chores

* add apiVer back ([dc6bf3ed](https://github.com/wopian/kitsu/commit/dc6bf3ed1a9ee91fe6d40b908739a1dfb6709d22))
* add new example to package.json ([b3a78fb8](https://github.com/wopian/kitsu/commit/b3a78fb864a80594fbdf2a9355d4cc4c4954e6e8))
* remove debugging calls ([7f57f736](https://github.com/wopian/kitsu/commit/7f57f736e70ba009baa9131ff59ecf0fb8ff2215))
* update examples ([ae390a88](https://github.com/wopian/kitsu/commit/ae390a8816df62799045caddd62998f27946bef4))
* move aliases to top of class ([8701af60](https://github.com/wopian/kitsu/commit/8701af6078a4281cdac55a134bbeaf8dddf478d0))

##### Documentation Changes

* split contributing into seperate file ([494f15a4](https://github.com/wopian/kitsu/commit/494f15a439686d6990c2d7da08cff76542cb9808))
* mention existing functionality of kitsu.headers ([4ea1c848](https://github.com/wopian/kitsu/commit/4ea1c848ab7fa55e9917cd4b1cd25d87c253274e))
* add 2.0 migration guide ([db148b3c](https://github.com/wopian/kitsu/commit/db148b3c0b1676ccc719db6f5048f4f99b128de8))
* add a more complex example ([dbc700fb](https://github.com/wopian/kitsu/commit/dbc700fbf9a8d12a42375ce7ea406e2a74856a11))
* update auth example ([b03fcff9](https://github.com/wopian/kitsu/commit/b03fcff9b61a372ede6375c7109aa948b741891e))

##### New Features

* simplify remove method ([a3325fda](https://github.com/wopian/kitsu/commit/a3325fda580d18802439a1f74766edcf7c33cbf8))
* removed header (use headers) ([f3a0af63](https://github.com/wopian/kitsu/commit/f3a0af6328aefcf2d6df40b9e5cfa29f6d2d6032))

##### Bug Fixes

* link relationship arrays without discarding everything after first ([0d76f02e](https://github.com/wopian/kitsu/commit/0d76f02ed7780b7fac8cf707f133d48f20091c95))
* prevent linking relationships twice ([71cc4e86](https://github.com/wopian/kitsu/commit/71cc4e86637499ec7787f75ae97ef700e59e526e))
* correct deserialise implementation for arrays ([17965b38](https://github.com/wopian/kitsu/commit/17965b3803d979c4750de99c0a5ade2d537ea84c))
* properly pass request errors ([93c89f67](https://github.com/wopian/kitsu/commit/93c89f67a3fcc5aea5192af938fa6faecfaba59a))
* handle relationship arrays ([faf2884c](https://github.com/wopian/kitsu/commit/faf2884c2138d0c4a21c8b8f9e6b6403ec2300f0))
* move attributes into parent object ([80785480](https://github.com/wopian/kitsu/commit/8078548015d3d5b12067c014059c8d24b03ce0f5))
* use relationship name instead of type for deserialised relationships key ([9640f318](https://github.com/wopian/kitsu/commit/9640f318a38302c3e8e1a65832a70f560961c129))

##### Reverts

* json parse before throwing errors ([6fd7962d](https://github.com/wopian/kitsu/commit/6fd7962d01e3620816110d64f3290275d3c296b9))

##### Tests

* add assertions to ensure async failures ([f2f262bf](https://github.com/wopian/kitsu/commit/f2f262bf369dd4a5568983d6e092f0b39d4f2063))
* update deattribute test name ([a2b07be1](https://github.com/wopian/kitsu/commit/a2b07be133e15569d1b3be4e149feb39ecaf7185))
* add tests for util functions ([11443d70](https://github.com/wopian/kitsu/commit/11443d707672d6741a24db090620f87a3f16c707))

### 1.3.0 (2017-07-16)

##### Build System / Dependencies

* correct EOL type ([bbd51d1b](https://github.com/wopian/kitsu/commit/bbd51d1b86e6f185fc903044e92d5d42dc4cfbb2))

##### Performance Improvements

* bind methods instead of assigning ([d14599b9](https://github.com/wopian/kitsu/commit/d14599b93a9cc50a9a549e0947935e9184f376ef))

##### Refactors

* rename setHeader to header ([6bd9ae92](https://github.com/wopian/kitsu/commit/6bd9ae9231d87b9896b88c8fa93f065e00af7aee))
* change opts to options ([c1a89b20](https://github.com/wopian/kitsu/commit/c1a89b2027b4237c5dbc9862cb5ecafdfa8c4251))

##### Reverts

* change options back to opts ([c55b0ecc](https://github.com/wopian/kitsu/commit/c55b0ecc8e52eab968d9d1b975a43593ed7d8d9c))

#### 1.2.2 (2017-07-16)

##### Build System / Dependencies

* use rollup-cleanup over uglify-es ([2eb60f3c](https://github.com/wopian/kitsu/commit/2eb60f3c441224cb060a18ffd49d1e308d612641))

##### Documentation Changes

* add more get examples ([005bd996](https://github.com/wopian/kitsu/commit/005bd99644e2f49c60baf14c78866048b1ccc00a))

##### Refactors

* split class into multiple files ([8cf599e0](https://github.com/wopian/kitsu/commit/8cf599e0324c0e7492e96b4f4a0d09992583ea80))

#### 1.2.1 (2017-07-08)

##### Build System / Dependencies

* cause release script to fail on test failures ([b10dc982](https://github.com/wopian/kitsu/commit/b10dc98256468b63c9a2f86e44202af817674f8c))

##### Bug Fixes

* ensure isAuth returns true when header set ([1f3ee195](https://github.com/wopian/kitsu/commit/1f3ee19549855df77fb3609d74819d7196154f2a))

### 1.2.0 (2017-07-06)

##### Bug Fixes

* throw new errors ([5aaf154a](https://github.com/wopian/kitsu/commit/5aaf154aac4c2785835c5564a431d1d4b0181c1a))

### 1.1.0 (2017-07-06)

##### Chores

* update examples ([1b5ed7b5](https://github.com/wopian/kitsu/commit/1b5ed7b56196843af2c2ad7e9ef2f8c9a64c80ee))

##### Bug Fixes

* throw errors ([8fd2979e](https://github.com/wopian/kitsu/commit/8fd2979e9a747219377293364ee0c40a0f05ae07))
* kebab-case method names ([97907060](https://github.com/wopian/kitsu/commit/97907060ef713fa8e97e05a5deae0492227edb28))

#### 1.0.3 (2017-07-06)

##### Chores

* remove debug log ([17e54311](https://github.com/wopian/kitsu/commit/17e5431188e923ce9bc72f917d288c46f2bd99c0))

##### Continuous Integration

* disable email notifications ([e2baf0f8](https://github.com/wopian/kitsu/commit/e2baf0f8ecf770d637ffb131c35a70ea782f1a01))

#### 1.0.2 (2017-07-06)

##### Chores

* add npm publish to release command ([d23c4fa0](https://github.com/wopian/kitsu/commit/d23c4fa0348190777bb5ba1d350ba7ee771a4dac))
* improve release commit message ([d06e5ff3](https://github.com/wopian/kitsu/commit/d06e5ff350bb7c6ffdb893dee238439dc0b41ea2))

##### New Features

* check if console exists before logging ([046f3ab6](https://github.com/wopian/kitsu/commit/046f3ab6b63092f24fdaae017363cfc923950b24))

#### 1.0.1 (2017-07-06)

##### Build System / Dependencies

* bump version ([aefdf577](https://github.com/wopian/kitsu/commit/aefdf57738e918b4a71317b553031f05780666da))

##### Chores

* changelog adjustments ([3a7bc94f](https://github.com/wopian/kitsu/commit/3a7bc94ff385f9b7ee5829f6b9c644cdb9faa419))
* add docs to npm releases ([c00e2f0b](https://github.com/wopian/kitsu/commit/c00e2f0bcfa976f090f35b8563958fe6a3ca4933))

## 1.0.0 (2017-07-06)

##### Added

- POST requests (`kitsu.<post|create>`)
- PATCH requests (`kitsu.<patch|update>`)
- DELETE requests (`kitsu.<remove|destroy>`)
- Aliases for GET requests (`kitsu.<fetch|find>`)

## 0.2.0 (2017-07-05)

##### Added

- Exposed headers (`kitsu.headers`)

##### Changed

- Updated package description
- Documented the api

## 0.1.2 (2017-06-30)

##### Added

- ES6 module version for webpack 2/3

## 0.1.1 (2017-06-29)

##### Fixed

- Added `babel-runtime` to dependencies

##### Removed

- Removed build files from published package

## 0.1.0 (2017-06-29)

##### Added

- GET requests for all models
- JSON API query parameters
- Authentication
