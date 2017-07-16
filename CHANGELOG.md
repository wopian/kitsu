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
