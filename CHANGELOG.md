# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
