# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.1.2](https://github.com/wopian/kitsu/compare/v9.1.1...v9.1.2) (2020-05-21)


### Bug Fixes

* **kitsu-core:** optional chain constructor calls to allow invalid JSON values ([66d76ef](https://github.com/wopian/kitsu/commit/66d76ef)), closes [#416](https://github.com/wopian/kitsu/issues/416)


### Build System / Dependencies

* generate typescript definitions on release ([ee2c35e](https://github.com/wopian/kitsu/commit/ee2c35e))


### Chores

* **release:** update documentation ([20e7cc6](https://github.com/wopian/kitsu/commit/20e7cc6))


### Documentation Changes

* **kitsu:** declare optional parameters in JSDoc syntax ([95eb9c1](https://github.com/wopian/kitsu/commit/95eb9c1))
* **kitsu-core:** declare optional parameters in JSDoc syntax ([a78a075](https://github.com/wopian/kitsu/commit/a78a075))
* autogenerate typescript definitions ([6e1879f](https://github.com/wopian/kitsu/commit/6e1879f))
* update JSDoc Array syntax for better TypeScript usability ([8f147ab](https://github.com/wopian/kitsu/commit/8f147ab))





## [9.1.1](https://github.com/wopian/kitsu/compare/v9.1.0...v9.1.1) (2020-05-21)


### Bug Fixes

* **kitsu-core:** throw error if type is missing during serialisation ([570ef11](https://github.com/wopian/kitsu/commit/570ef11))


### Chores

* **release:** update documentation ([1c19a06](https://github.com/wopian/kitsu/commit/1c19a06))





# [9.1.0](https://github.com/wopian/kitsu/compare/v9.0.7...v9.1.0) (2020-05-21)


### Bug Fixes

* **kitsu-core:** resolve linkedRelationships regression introduced in 568eff5 ([66095cc](https://github.com/wopian/kitsu/commit/66095cc))


### Chores

* **release:** update documentation ([d77384c](https://github.com/wopian/kitsu/commit/d77384c))
* increase package warning limit ([c0136dc](https://github.com/wopian/kitsu/commit/c0136dc))


### Documentation Changes

* correct errors in types ([9ad8fc0](https://github.com/wopian/kitsu/commit/9ad8fc0))
* **kitsu:** document usage of the bulk extension ([e37b7ad](https://github.com/wopian/kitsu/commit/e37b7ad))
* **kitsu-core:** add internal documentation for new private functions ([0d10ba3](https://github.com/wopian/kitsu/commit/0d10ba3))
* **kitsu-core:** update description of deserialise parameter ([94dc48a](https://github.com/wopian/kitsu/commit/94dc48a))


### New Features

* **kitsu:** support arbitrary requests ([e8aacc5](https://github.com/wopian/kitsu/commit/e8aacc5))
* **kitsu:** support the bulk extension specification ([f793988](https://github.com/wopian/kitsu/commit/f793988)), closes [#336](https://github.com/wopian/kitsu/issues/336)
* **kitsu-core:** support the bulk extension specification (serialise arrays) ([920ece3](https://github.com/wopian/kitsu/commit/920ece3)), closes [#336](https://github.com/wopian/kitsu/issues/336)


### Refactors

* **kitsu-core:** cleanup linkRelationships + use optional chaining ([568eff5](https://github.com/wopian/kitsu/commit/568eff5))
* **kitsu-core:** use optional chaining in deserialise ([43d5d4b](https://github.com/wopian/kitsu/commit/43d5d4b))





## [9.0.7](https://github.com/wopian/kitsu/compare/v9.0.6...v9.0.7) (2020-05-19)


### Build System / Dependencies

* update devdependency documentation to ~13.0.0 ([#410](https://github.com/wopian/kitsu/issues/410)) ([5e08add](https://github.com/wopian/kitsu/commit/5e08add))
* update devdependency eslint to ~7.0.0 ([#409](https://github.com/wopian/kitsu/issues/409)) ([1fafa1a](https://github.com/wopian/kitsu/commit/1fafa1a))
* update devdependency lerna to ~3.21.0 ([#412](https://github.com/wopian/kitsu/issues/412)) ([ae3c359](https://github.com/wopian/kitsu/commit/ae3c359))
* update devdependency rollup to ~2.10.0 ([#413](https://github.com/wopian/kitsu/issues/413)) ([f73c4dc](https://github.com/wopian/kitsu/commit/f73c4dc))
* update devdependency rollup to ~2.8.0 ([#408](https://github.com/wopian/kitsu/issues/408)) ([f977bb5](https://github.com/wopian/kitsu/commit/f977bb5))
* update devdependency rollup to ~2.9.0 ([#411](https://github.com/wopian/kitsu/issues/411)) ([78627b7](https://github.com/wopian/kitsu/commit/78627b7))


### Chores

* **release:** update documentation ([523553e](https://github.com/wopian/kitsu/commit/523553e))


### Documentation Changes

* **kitsu:** link to axios docs for axiosOptions and interceptors ([b678290](https://github.com/wopian/kitsu/commit/b678290))


### Other Changes

* Update MIGRATING.md ([7fbc3fa](https://github.com/wopian/kitsu/commit/7fbc3fa))
* Update MIGRATING.md ([c2fb17e](https://github.com/wopian/kitsu/commit/c2fb17e))





## [9.0.6](https://github.com/wopian/kitsu/compare/v9.0.5...v9.0.6) (2020-05-07)


### Chores

* **release:** update documentation ([03fc40e](https://github.com/wopian/kitsu/commit/03fc40e))
* remove rogue console.log ([29d3ae3](https://github.com/wopian/kitsu/commit/29d3ae3))


### Documentation Changes

* **kitsu:** add alias for delete to Quick Start in README ([c9ba1b6](https://github.com/wopian/kitsu/commit/c9ba1b6))
* **kitsu:** fix URL to more examples ([d3d46ce](https://github.com/wopian/kitsu/commit/d3d46ce))
* **kitsu:** remove node 12 notice ([6540e39](https://github.com/wopian/kitsu/commit/6540e39))
* **kitsu:** remove unused URL from README ([bafbeeb](https://github.com/wopian/kitsu/commit/bafbeeb))
* **kitsu:** update Quick Start in README ([f49064b](https://github.com/wopian/kitsu/commit/f49064b))
* **kitsu-core:** remove node 12 notice ([45f20bb](https://github.com/wopian/kitsu/commit/45f20bb))





## [9.0.5](https://github.com/wopian/kitsu/compare/v9.0.4...v9.0.5) (2020-05-07)


### Chores

* **release:** update documentation ([2df72e7](https://github.com/wopian/kitsu/commit/2df72e7))
* trim CHANGELOG length ([af7db19](https://github.com/wopian/kitsu/commit/af7db19))





## [9.0.4](https://github.com/wopian/kitsu/compare/v9.0.3...v9.0.4) (2020-05-07)


### Chores

* **release:** update documentation ([9561c63](https://github.com/wopian/kitsu/commit/9561c63))


### Documentation Changes

* **kitsu-core:** add example for query ([63c15f4](https://github.com/wopian/kitsu/commit/63c15f4))
* **kitsu-core:** add examples for error ([cb40de1](https://github.com/wopian/kitsu/commit/cb40de1))
* **kitsu-core:** add examples for filterIncludes ([66b5a6f](https://github.com/wopian/kitsu/commit/66b5a6f))
* **kitsu-core:** add examples for linkRelationships ([ff05659](https://github.com/wopian/kitsu/commit/ff05659))





## [9.0.3](https://github.com/wopian/kitsu/compare/v9.0.2...v9.0.3) (2020-05-07)


### Chores

* **release:** update documentation ([95c3fbb](https://github.com/wopian/kitsu/commit/95c3fbb))


### Documentation Changes

* **kitsu:** add JSON:API query parameters to Quick Start ([a5c501a](https://github.com/wopian/kitsu/commit/a5c501a))





## [9.0.2](https://github.com/wopian/kitsu/compare/v9.0.1...v9.0.2) (2020-05-07)


### Bug Fixes

* **kitsu-core:** correctly parse attributes.attributes (closes [#137](https://github.com/wopian/kitsu/issues/137)) ([b058e42](https://github.com/wopian/kitsu/commit/b058e42))


### Chores

* **release:** update documentation ([84d00c5](https://github.com/wopian/kitsu/commit/84d00c5))


### Tests

* **kitsu-core:** add test for ensuring all relationships exist in output ([1fc81d9](https://github.com/wopian/kitsu/commit/1fc81d9))





## [9.0.1](https://github.com/wopian/kitsu/compare/v9.0.0...v9.0.1) (2020-05-07)


### Chores

* **release:** update documentation ([03ec026](https://github.com/wopian/kitsu/commit/03ec026))


### Documentation Changes

* **kitsu:** add migration guide link to README ([e434df2](https://github.com/wopian/kitsu/commit/e434df2))
* **kitsu-core:** add migration guide link to README ([bf282af](https://github.com/wopian/kitsu/commit/bf282af))





# [9.0.0](https://github.com/wopian/kitsu/compare/v8.3.1...v9.0.0) (2020-05-07)


### Build System / Dependencies

* update jest monorepo to ~26.0.0 (major) ([#407](https://github.com/wopian/kitsu/issues/407)) ([a73ae66](https://github.com/wopian/kitsu/commit/a73ae66))
* **kitsu:** update devdependency [@size-limit](https://github.com/size-limit)/preset-small-lib to ~4.5.0 ([#405](https://github.com/wopian/kitsu/issues/405)) ([7e0072d](https://github.com/wopian/kitsu/commit/7e0072d))
* update devdependency size-limit to ~4.5.0 ([#406](https://github.com/wopian/kitsu/issues/406)) ([fb7a139](https://github.com/wopian/kitsu/commit/fb7a139))


### Chores

* **release:** update documentation ([08362a8](https://github.com/wopian/kitsu/commit/08362a8))


### Documentation Changes

* **kitsu:** add 9.0.0 migration guide ([8f899c5](https://github.com/wopian/kitsu/commit/8f899c5))
* **kitsu-core:** add 9.0.0 migration guide ([8576749](https://github.com/wopian/kitsu/commit/8576749))
* update README ([6a73433](https://github.com/wopian/kitsu/commit/6a73433))
* **kitsu-core:** use lowercase string for param type ([8254710](https://github.com/wopian/kitsu/commit/8254710))


### New Features

* **kitsu:** handle nested (relationship) routes using kitsu-core's splitModel ([4f641b9](https://github.com/wopian/kitsu/commit/4f641b9))
* **kitsu-core:** add splitModel ([782d1b6](https://github.com/wopian/kitsu/commit/782d1b6))
* **kitsu-core:** preserve links in relationships during deserialisation ([cbf50df](https://github.com/wopian/kitsu/commit/cbf50df))


### Refactors

* **kitsu:** (internal) pass camel and plural options as arguments to serialise ([046b51a](https://github.com/wopian/kitsu/commit/046b51a))
* **kitsu-core:** pass camelCase and pluralisation options as arguments to serialise ([34b9cae](https://github.com/wopian/kitsu/commit/34b9cae))


### BREAKING CHANGES

* **kitsu-core:** for deserialise and linkRelationships
* **kitsu-core:** serialise.apply[{ camel, resCase, plural}, [ model, data, method ]) is no longer neccessary. New syntax is serialise(model, data, method, { camelCaseTypes: camel, pluralTypes: plural}).
