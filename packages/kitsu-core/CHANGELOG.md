# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.0.4](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v9.0.3...v9.0.4) (2020-05-07)


### Chores

* **release:** update documentation ([9561c63](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/9561c63))


### Documentation Changes

* **kitsu-core:** add example for query ([63c15f4](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/63c15f4))
* **kitsu-core:** add examples for error ([cb40de1](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/cb40de1))
* **kitsu-core:** add examples for filterIncludes ([66b5a6f](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/66b5a6f))
* **kitsu-core:** add examples for linkRelationships ([ff05659](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ff05659))





## [9.0.3](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v9.0.2...v9.0.3) (2020-05-07)


### Chores

* **release:** update documentation ([95c3fbb](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/95c3fbb))





## [9.0.2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v9.0.1...v9.0.2) (2020-05-07)


### Bug Fixes

* **kitsu-core:** correctly parse attributes.attributes (closes [#137](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/137)) ([b058e42](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/b058e42))


### Chores

* **release:** update documentation ([84d00c5](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/84d00c5))


### Tests

* **kitsu-core:** add test for ensuring all relationships exist in output ([1fc81d9](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/1fc81d9))





## [9.0.1](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v9.0.0...v9.0.1) (2020-05-07)


### Chores

* **release:** update documentation ([03ec026](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/03ec026))


### Documentation Changes

* **kitsu-core:** add migration guide link to README ([bf282af](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/bf282af))





# [9.0.0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.3.1...v9.0.0) (2020-05-07)


### Build System / Dependencies

* **kitsu:** update devdependency [@size-limit](https://github.com/size-limit)/preset-small-lib to ~4.5.0 ([#405](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/405)) ([7e0072d](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/7e0072d))


### Chores

* **release:** update documentation ([08362a8](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/08362a8))


### Documentation Changes

* **kitsu-core:** add 9.0.0 migration guide ([8576749](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8576749))
* update README ([6a73433](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/6a73433))
* **kitsu-core:** use lowercase string for param type ([8254710](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8254710))


### New Features

* **kitsu-core:** add splitModel ([782d1b6](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/782d1b6))
* **kitsu-core:** preserve links in relationships during deserialisation ([cbf50df](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/cbf50df))


### Refactors

* **kitsu-core:** pass camelCase and pluralisation options as arguments to serialise ([34b9cae](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/34b9cae))


### BREAKING CHANGES

* **kitsu-core:** for deserialise and linkRelationships
* **kitsu-core:** serialise.apply[{ camel, resCase, plural}, [ model, data, method ]) is no longer neccessary. New syntax is serialise(model, data, method, { camelCaseTypes: camel, pluralTypes: plural}).





## [8.3.1](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.3.0...v8.3.1) (2020-05-02)


### Bug Fixes

* prevent undefined id for empty relationship data objects ([ee381a9](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ee381a9))


### Chores

* **release:** update documentation ([0d6e89b](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/0d6e89b))
* remove old devDependencies no longer used ([72acbe7](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/72acbe7))





# [8.3.0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.2.0...v8.3.0) (2020-05-02)


### Chores

* **release:** update documentation ([5382aad](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/5382aad))


### New Features

* **kitsu-core:** check id exists before serialising objects/arrays as relationships ([#402](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/402)) ([79287d0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/79287d0))
* **kitsu-core:** serialise deletion of to-one and to-many relationships ([#403](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/403)) ([5f868e7](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/5f868e7))





# [8.2.0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.1.1...v8.2.0) (2020-04-26)


### Build System / Dependencies

* **kitsu:** update devdependency [@size-limit](https://github.com/size-limit)/preset-small-lib… ([#375](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/375)) ([d8bc45d](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/d8bc45d))
* **kitsu:** update devdependency [@size-limit](https://github.com/size-limit)/preset-small-lib… ([#379](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/379)) ([7efdc07](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/7efdc07))
* **kitsu:** update devdependency [@size-limit](https://github.com/size-limit)/preset-small-lib… ([#383](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/383)) ([d86a1e6](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/d86a1e6))


### Chores

* **release:** update documentation ([ef7efec](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ef7efec))
* remove trailing spaces ([16d33a7](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/16d33a7))
* undo formatting changes in [#395](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/395) ([a4d7b23](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/a4d7b23))


### New Features

* **kitsu-core:** optional pluralisation during serialisation ([#395](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/395)) ([c2e6f02](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/c2e6f02))





## [8.1.1](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.1.0...v8.1.1) (2020-02-28)


### Chores

* **release:** update documentation ([6201aa4](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/6201aa4))


### Documentation Changes

* **kitsu-core:** fix typo in CDN script example ([6ca6f62](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/6ca6f62))





# [8.1.0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.0.5...v8.1.0) (2020-02-28)


### Chores

* **release:** update documentation ([8f1b075](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8f1b075))


### New Features

* **kitsu:** deserialise POST and PATCH responses ([#371](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/371)) ([3c9c3ce](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/3c9c3ce))





## [8.0.5](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.0.4...v8.0.5) (2020-02-12)


### Bug Fixes

* **kitsu-core:** keep ID with POST requests ([e4d84e0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/e4d84e0))


### Build System / Dependencies

* **kitsu:** update devdependency [@size-limit](https://github.com/size-limit)/preset-small-lib to ~3.0.0 ([#357](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/357)) ([15e3226](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/15e3226))
* **kitsu:** update devdependency [@size-limit](https://github.com/size-limit)/preset-small-lib to ~4.0.1 ([09d3373](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/09d3373))


### Chores

* **release:** update documentation ([d799bce](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/d799bce))
* build with Node 10 as Node 8 was dropped in 43a8d8d9b8c5cbfabdc5bdaf51856fd6752ef9c4 ([75c4367](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/75c4367))


### Tests

* **kitsu-core:** add serialise with client-generated ID ([4feba44](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/4feba44))





## [8.0.4](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.0.3...v8.0.4) (2020-01-08)


### Chores

* **release:** update documentation ([b381f9a](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/b381f9a))





## [8.0.3](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.0.2...v8.0.3) (2020-01-07)


### Chores

* **release:** update documentation ([65f0559](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/65f0559))
* improve TypeScript declarations ([#355](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/355)) ([934c79e](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/934c79e))


### Documentation Changes

* remove appveyor badge [skip ci] ([8063c4a](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8063c4a))





## [8.0.2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.0.1...v8.0.2) (2019-12-24)


### Chores

* **release:** update documentation ([ec5f653](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ec5f653))


### Documentation Changes

* **kitsu-core:** update README ([61ee773](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/61ee773))





## [8.0.1](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v8.0.0...v8.0.1) (2019-12-24)


### Build System / Dependencies

* update linters ([#346](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/346)) ([6dd5080](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/6dd5080))


### Chores

* **release:** update documentation ([b8399f4](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/b8399f4))


### Refactors

* **kitsu-core:** remove unnecessary instances of async/await ([#351](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/351)) ([8a88fe4](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8a88fe4))





# [8.0.0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v7.3.0...v8.0.0) (2019-12-03)


### Chores

* **release:** update documentation ([ea8790a](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ea8790a))
* cleanup configs ([4576fd5](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/4576fd5))


### Documentation Changes

* add migration for `kitsu/node` and `kitsu-core/node`  users ([4bd2182](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/4bd2182))


### New Features

* **kitsu-core:** create browser bundle (umd) ([ca01db8](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ca01db8))
* **kitsu-core:** proper tree-shaking for individual components ([b2c55a0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/b2c55a0))
* **kitsu-core:** remove redundent node folder ([4041649](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/4041649))


### BREAKING CHANGES

* **kitsu-core:** Only for those using `kitsu-core/node` or `kitsu-core/node/index.mjs`.
7.3.0 made both code bases identical. You can safely switch to `kitsu-core` or `kitsu-core/lib/index.mjs`





## [7.2.2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v7.2.1...v7.2.2) (2019-11-25)


### Bug Fixes

* switch babel-minify to terser ([d687532](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/d687532))


### Chores

* **ci:** restore size-limit for bundle outputs ([56b9e01](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/56b9e01))
* **release:** update documentation ([29e9743](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/29e9743))





## [7.2.1](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v7.2.0...v7.2.1) (2019-11-25)


### Chores

* **release:** update documentation ([0bebf33](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/0bebf33))





## [7.0.4](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v7.0.3...v7.0.4) (2019-06-16)


### Bug Fixes

* **rollup:** remove dependencies lookup for kitsu-core ([e380524](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/e380524))


### Chores

* **release:** update documentation ([9000c94](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/9000c94))


### Continuous Integration

* **kitsu-core:** disable unneeded size-limit feature ([853d474](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/853d474))





## [7.0.3](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v7.0.2...v7.0.3) (2019-05-12)


### Chores

* **release:** update documentation ([e1d6663](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/e1d6663))
* update package size limit warnings ([679d6b6](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/679d6b6))
* **kitsu-core:** remove unused babel runtime dependency ([0afa678](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/0afa678))





## [7.0.2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v7.0.1...v7.0.2) (2019-05-11)


### Bug Fixes

* update main/module paths to support Node 12 ESM (closes [#292](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/292)) ([b6083d6](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/b6083d6))


### Chores

* **release:** update documentation ([e079395](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/e079395))
* **rollup:** remove duplicated filenames from config ([633655c](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/633655c))


### Documentation Changes

* add footnote for breaking Node 12 changes with kitsu/node and kitsu-core/node ([3d07bcb](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/3d07bcb))





## [7.0.1](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v7.0.0...v7.0.1) (2019-04-15)


### Chores

* **release:** update documentation ([60e15f9](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/60e15f9))





# [7.0.0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v6.2.3...v7.0.0) (2019-03-02)


### Bug Fixes

* **ci:** remove node-only packages ([467e501](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/467e501))
* **kitsu-core:** change & to && ([#268](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/268)) ([7195a39](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/7195a39))


### Build System / Dependencies

* update dependency babel to ^7.0.0 ([81f6be2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/81f6be2))


### Chores

* **release:** update documentation ([4421b82](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/4421b82))
* drop support for node 6 ([7e48c42](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/7e48c42))
* **release:** publish packages ([4ef5cd2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/4ef5cd2))
* **release:** publish packages ([52c4b5d](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/52c4b5d))
* **release:** publish packages ([3c84631](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/3c84631))
* **release:** update documentation ([12d3b6e](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/12d3b6e))
* **release:** update documentation ([4fd20c5](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/4fd20c5))
* **release:** update documentation ([c59db70](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/c59db70))


### Documentation Changes

* update package sizes ([07d2aca](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/07d2aca))
* **kitsu-core:** mark internal functions as private ([7d8cff1](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/7d8cff1))
* switch david-dm badges to badgen ([8172616](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8172616))


### New Features

* add generated typescript declarations ([0cac34d](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/0cac34d))
* split kitsu-core/node into kitsu-core ([ccaee90](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ccaee90))


### BREAKING CHANGES

* Brings native async/await for kitsu/node and kitsu-core/node






# [6.4.0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/kitsu-core@6.3.1...kitsu-core@6.4.0) (2018-09-08)


### Chores

* **release:** update documentation ([12d3b6e](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/12d3b6e))


### New Features

* add generated typescript declarations ([0cac34d](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/0cac34d))





<a name="6.3.0"></a>
# 6.3.0 (2018-08-29)


### Chores

* **release:** update documentation ([c59db70](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/c59db70))


### Documentation

* switch david-dm badges to badgen ([8172616](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8172616))



<a name="6.2.3"></a>
## 6.2.3 (2018-08-15)


### Chores

* restore pre-conventional-changelog changelogs ([e44ab97](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/e44ab97))
* **release:** publish v6.2.3 ([1c767b8](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/1c767b8))
* **release:** update documentation ([49390b9](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/49390b9))


### Documentation

* **kitsu-core:** update migration guide ([16f01c3](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/16f01c3))



<a name="6.2.2"></a>
## 6.2.2 (2018-08-15)


### Chores

* **release:** publish v6.2.2 ([245d1b8](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/245d1b8))
* **release:** update documentation ([d15797f](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/d15797f))
* **release:** update documentation ([ad160e4](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ad160e4))


### Code Refactoring

* **serialise :** reduce cognitive complexity ([593b2af](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/593b2af))



<a name="6.2.1"></a>
## 6.2.1 (2018-08-15)


### Chores

* **release:** publish v6.2.1 ([c284051](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/c284051))



<a name="6.2.0"></a>
# 6.2.0 (2018-08-14)


### Chores

* remove legacy [@babel](https://github.com/babel)/runtime dependencies ([03056f8](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/03056f8))
* remove legacy bundles ([df084d2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/df084d2))
* remove need for sourcemaps ([1b37fbd](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/1b37fbd))
* remove todos in rollup configs ([410b20b](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/410b20b))
* update npmignore ([6afa4d0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/6afa4d0))


### Code Refactoring

* **kitsu-core:** reduce query's cognitive complexity ([fb167b2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/fb167b2))


### Documentation

* fix links in READMEs ([ef629c9](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ef629c9))
* format READMEs ([d4b2384](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/d4b2384))
* link to coverage, maintainability & debt pages in codeclimate badges ([f267c03](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/f267c03))
* restore itallic text for migration guide notices ([e9a764e](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/e9a764e))
* switch codeclimate and contributor badges to badgen ([ef56b76](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ef56b76))
* update README to 6.x ([436644d](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/436644d))
* use source order for API documentation ([8e3d2bb](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8e3d2bb))



<a name="6.1.0"></a>
# 6.1.0 (2018-08-10)


### Features

* re-add ES modules (closes [#155](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/155)) ([7506fd0](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/7506fd0))



<a name="6.0.3"></a>
## 6.0.3 (2018-08-10)


### Documentation

* fix links to migration guide ([cad735c](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/cad735c))



<a name="6.0.2"></a>
## 6.0.2 (2018-08-10)


### Documentation

* switch badges to badgen ([19166bd](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/19166bd))



<a name="6.0.1"></a>
## 6.0.1 (2018-08-10)


### Documentation

* add ^6 migration note ([60bad61](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/60bad61))



<a name="6.0.0"></a>
# 6.0.0 (2018-08-10)


### Code Refactoring

* upgrade to babel 7 ([6372acf](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/6372acf))


### Documentation

* **kitsu-core:** update README ([037d842](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/037d842))


### Features

* **kitsu-core:** support nested parameters  (closes [#148](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/148)) [breaking] ([14b7747](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/14b7747))



<a name="5.2.2"></a>
## 5.2.2 (2018-07-23)


### Chores

* add contributors to package.json ([789125b](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/789125b))
* lock file maintenance ([#183](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/183)) ([9cb4f03](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/9cb4f03))


### Documentation

* **kitsu-core:** add bundlephobia size badge ([ed0c23b](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/ed0c23b))



<a name="5.2.0"></a>
# 5.2.0 (2018-06-25)



<a name="5.1.1"></a>
## 5.1.1 (2018-06-01)


### Documentation

* **kitsu-core:** update browser support table ([577b38f](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/577b38f))



<a name="5.1.0"></a>
# 5.1.0 (2018-04-01)


### Bug Fixes

* temporarily disable ecmascript module output (resolves [#155](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/issues/155)) ([3da9a54](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/3da9a54))



<a name="5.0.7"></a>
## 5.0.7 (2018-03-19)



<a name="5.0.6"></a>
## 5.0.6 (2018-03-08)


### Bug Fixes

* escape uri query string ([e4210fc](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/e4210fc))


### Tests

* remove 'should' from test names ([eba777a](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/eba777a))
* update query expectations ([dc494a3](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/dc494a3))



<a name="5.0.5"></a>
## 5.0.5 (2018-03-07)


### Bug Fixes

* **kitsu-core:** correctly deattribute nested filter/field queries ([b6d2dd4](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/b6d2dd4))



<a name="5.0.4"></a>
## 5.0.4 (2018-03-03)


### Bug Fixes

* **kitsu-core:** check data object exists before deattributing it ([8b5f761](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8b5f761))
* **kitsu-core:** slice first character of query before adding prefix ([756748b](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/756748b))


### Chores

* **kitsu-core:** build documentation ([d642353](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/d642353))


### Code Refactoring

* **kitsu-core:** remove circular imports ([f733d72](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/f733d72))


### Documentation

* **kitsu-core:** add example for deattribute function ([89d9a40](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/89d9a40))
* **kitsu-core:** add example for kebab function ([eec0fec](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/eec0fec))
* **kitsu-core:** add example for snake function ([560196b](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/560196b))
* **kitsu-core:** add examples for camel function ([05bf2d6](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/05bf2d6))
* **kitsu-core:** add examples for deserialise function ([4d9197a](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/4d9197a))
* **kitsu-core:** add serialise example with 5.0.x 'this' limitiation ([8384c16](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8384c16))


### Features

* **kitsu-core:** add prefix option to query function ([c91e1f7](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/c91e1f7))


### Tests

* namespace package tests ([8c22d35](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8c22d35))



<a name="5.0.3"></a>
## 5.0.3 (2018-02-16)


### Chores

* **kitsu-core:** remove files property from package.json ([f882d20](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/f882d20))



<a name="5.0.2"></a>
## 5.0.2 (2018-02-16)



<a name="5.0.1"></a>
## 5.0.1 (2018-02-16)


### Chores

* **kitsu-core:** add homepage and repository urls ([8764512](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8764512))



<a name="5.0.0"></a>
# 5.0.0 (2018-02-16)


### Chores

* **deps:** update eslint-config-wopian to ~1.3.0 ([7655109](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/7655109))
* **deps:** update lerna to ~2.9.0 ([4f43c66](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/4f43c66))
* **kitsu-core:** add npmignore ([108fc95](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/108fc95))
* **kitsu-core:** rename prop to key in serialise ([64b44d2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/64b44d2))


### Code Refactoring

* **kitsu-core:** optimise undefined checks ([f551955](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/f551955))


### Documentation

* **kitsu-core:** add name for default exports ([03356eb](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/03356eb))
* **kitsu-core:** link to package changelog ([35f1113](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/35f1113))
* **kitsu-core:** remove private flags ([8099b9b](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8099b9b))
* **readme:** update readmes ([bb824f8](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/bb824f8))


### Features

* split internal functions into a seperate package ([a0bab70](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/a0bab70))
* use node/legacy version of kitsu-core for node/legacy packages ([8c77574](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/8c77574))


### Styles

* fix eslint issues ([d1372b1](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/commit/d1372b1))





<a name="6.2.3"></a>
## [6.2.3](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v6.2.2...v6.2.3) (2018-08-15)

**Note:** Version bump only for package kitsu-core





<a name="6.2.2"></a>
## [6.2.2](https://github.com/wopian/kitsu/tree/master/packages/kitsu-core/compare/v6.2.1...v6.2.2) (2018-08-15)

**Note:** Version bump only for package kitsu-core

#### 6.2.1 (2018-08-15)

##### Build System / Dependencies

*  update devdependency lerna to ~3.0.5 to fix regressions (867d1609)

### 6.2.0 (2018-08-14)

##### Build System / Dependencies

*  update devdependency lerna to ~3.0.0 (#195) (6d599022)
*  update devdependency jest to ~23.5.0 (#194) (292345fd)

##### Chores

*  remove todos in rollup configs (410b20b5)
*  remove legacy @babel/runtime dependencies (03056f80)
*  remove redundent package.json script (7e182d77)
*  update npmignore (6afa4d09)
*  remove need for sourcemaps No longer minifies lib/node files to 1-line. (1b37fbd3)
*  remove legacy bundles They haven't seen any usage and are causing unneccessary package size bloat. (df084d21)

##### Documentation Changes

*  link to coverage, maintainability & debt pages in codeclimate badges (f267c03e)
*  format READMEs (d4b23845)
*  restore itallic text for migration guide notices (e9a764eb)
*  fix links in READMEs (ef629c92)
*  use source order for API documentation (8e3d2bb9)
*  update README to 6.x (436644d1)
*  switch codeclimate and contributor badges to badgen (ef56b765)

##### Refactors

* **kitsu-core:**  reduce query's cognitive complexity (fb167b2e)

### 6.1.0 (2018-08-10)

##### New Features

*  re-add ES modules (closes #155) (7506fd0e)

#### 6.0.3 (2018-08-10)

##### Documentation Changes

*  fix links to migration guide (cad735c4)

#### 6.0.2 (2018-08-10)

##### Documentation Changes

*  switch badges to badgen (19166bd6)

##### Other Changes

*  remove unused @babel/stage-0 devDependency (a9a2ab0d)

#### 6.0.1 (2018-08-10)

##### Chores

*  move targets to top of config/presets (6b2e9736)
*  drop testing on node 6/non active LTS (5e1fb268)

##### Continuous Integration

*  allow node 6 test failures (0088d7c3)

##### Documentation Changes

*  add ^6 migration note (60bad611)

## 6.0.0 (2018-08-10)

##### Breaking Changes

* **kitsu-core:**  support nested parameters  (closes #148) breaking)

##### Build System / Dependencies

*  update dependency rollup to ~0.64.0 (#193) (279f85a7)
*  update dependency eslint to ~5.3.0 (#192) (64c36c20)
*  update dependency documentation to ~8.1.0 (#191) (80d2aade)
*  update dependency size-limit to ~0.19.0 (#189) (032c98c2)

##### Chores

*  lock file maintenance (#190) (aa43d781)

##### Documentation Changes

* **kitsu-core:**  update README (037d8423)

##### Refactors

*  upgrade to babel 7 (6372acfa)

#### 5.2.2 (2018-07-23)

##### Build System / Dependencies

*  update dependency eslint to ~5.2.0 (#188) (c1b50b4f)
*  update dependency rollup to ~0.63.0 (#187) (a792cff5)
*  update dependency jest to ~23.4.0 (#186) (b0a206ed)
*  update dependency eslint to ~5.1.0 (#185) (cd66096f)
*  update dependency jest to ~23.3.0 (#184) (5975041c)
*  update dependency jest to ~23.2.0 (#181) (552202b1)
*  update dependency rollup to ~0.62.0 (#182) (8abaab74)

##### Chores

*  add contributors to package.json (789125b2)
*  lock file maintenance (#183) (9cb4f037)

##### Documentation Changes

* **kitsu-core:**  add bundlephobia size badge (ed0c23b3)

#### 5.2.1 (2018-07-13)

##### Build System / Dependencies

*  update dependency jest to ~23.3.0 (#184) (5975041c)
*  update dependency jest to ~23.2.0 (#181) (552202b1)
*  update dependency rollup to ~0.62.0 (#182) (8abaab74)

##### Chores

*  add contributors to package.json (789125b2)
*  lock file maintenance (#183) (9cb4f037)

### 5.2.0 (2018-06-25)

##### Build System / Dependencies

*  update dependency eslint to ~5.0.0 (#179) (91dd6e5f)
*  update dependency rollup to ~0.61.0 (#178) (8244747e)
*  update dependency cross-env to ~5.2.0 (#176) (84ca9373)
*  update dependency documentation to ~8.0.0 (#173) (a1e441b8)
*  update dependency rollup to ~0.60.0 (#174) (1ead68dd)

##### Chores

* **deps:**  update dependency jest to ~23.1.0 (#172) (b84b615f)
* **renovate:**  scope package updates (00f934da)

#### 5.1.1 (2018-06-01)

##### Chores

* **vscode:**  hide output directories (afdd4831)
* **deps:**
  *  update dependency documentation to ~7.1.0 (#171) (8526d828)
  *  update dependency jest to v23 (#170) (ec74d6bb)
  *  update dependency documentation to v7 (#169) (05ee3320)
  *  update dependency rollup-plugin-babel-minify to v5 (#168) (2ac8fca5)
  *  update dependency rollup to ~0.59.0 (#167) (6b989f93)
  *  update dependency size-limit to ~0.18.0 (#166) (5395b12d)
  *  update dependency babel-preset-env to ~1.7.0 (#165) (34e2042f)
  *  lock file maintenance (#163) (8c0b650f)
  *  lock file maintenance (4fac11f0)
  *  update lerna to ~2.10.0 (#157) (955c694a)
  *  update documentation to ~6.2.0 (#158) (cbc87cc2)
  *  update axios-mock-adapter to ~1.15.0 (#156) (b9cde7db)
* **renovate:**  use shareable config (86b0d93a)

##### Documentation Changes

* **kitsu-core:**  update browser support table (577b38f1)

### 5.1.0 (2018-04-01)

##### Chores

* **deps:**  update replace-in-file to ~3.4.0 (#153) (1df1c961)

##### Bug Fixes

*  temporarily disable ecmascript module output (resolves #155) (3da9a540)

#### 5.0.7 (2018-03-19)

##### Chores

* **deps:**
  *  update size-limit to ~0.17.0 (#151) (7b71ab81)
  *  update eslint to ~4.19.0 (#150) (8c1764ae)
  *  update rollup to ~0.57.0 (#149) (ef441b33)
  *  update documentation to ~6.1.0 (#147) (350a37db)

#### 5.0.6 (2018-03-08)

##### Chores

* **deps:**
  *  update replace-in-file to ~3.2.0 (#145) (6b004bd6)
  *  update size-limit to ~0.16.0 (#143) (87513ba5)

##### Bug Fixes

*  escape uri query string (e4210fc8)

##### Tests

*  update query expectations (dc494a3c)
*  remove 'should' from test names (eba777ab)

#### 5.0.5 (2018-03-07)

##### Bug Fixes

* **kitsu-core:**  correctly deattribute nested filter/field queries (b6d2dd4a)

#### 5.0.4 (2018-03-03)

##### Chores

* **deps:**
  *  update documentation to ~6.0.0 (#142) (9faef85f)
  *  update documentation to ~5.5.0 (#140) (d2792aa3)
  *  lock file maintenance (#139) (56d69d9d)
  *  update axios to ^0.18.0 (#135) (ed426417)
  *  update jest to ~22.4.0 (#136) (7c6909c9)
  *  update axios-mock-adapter to ~1.14.0 (#134) (4790c559)
  *  update eslint to ~4.18.0 (#131) (4f2ac2fe)
*  remove empty object in package.json (cde44b38)
*  move test json:api cases to monorepo root (576a9d87)
* **kitsu-core:**  build documentation (d642353a)

##### Documentation Changes

* **kitsu-core:**
  *  add examples for deserialise function (4d9197a7)
  *  add example for snake function (560196bd)
  *  add example for kebab function (eec0fecf)
  *  add example for deattribute function (89d9a401)
  *  add examples for camel function (05bf2d60)
  *  add serialise example with 5.0.x 'this' limitiation (8384c16e)

##### New Features

* **kitsu-core:**  add prefix option to query function (c91e1f72)

##### Bug Fixes

* **kitsu-core:**
  *  slice first character of query before adding prefix (756748b3)
  *  check data object exists before deattributing it (8b5f7615)

##### Refactors

* **kitsu-core:**  remove circular imports (f733d729)

##### Tests

*  namespace package tests (8c22d35c)

#### 5.0.3 (2018-02-16)

##### Chores

* **kitsu-core:**  remove files property from package.json (f882d20e)
* **npm:**  remove files property from package.json (a8decf9e)

#### 5.0.1 (2018-02-16)

##### Chores

* **kitsu-core:**  add homepage and repository urls (8764512d)
* **lerna:**  commit changelog before publishing (ea321fed)

#### 5.0.1 (2018-02-16)

##### Chores

* **lerna:**  commit changelog before publishing (ea321fed)

## 5.0.0 (2018-02-16)

##### Build System / Dependencies

*  hide lerna info output (604a5c6c)
*  publish workspace packages, not root (108d64e3)
*  re-add changelog generation (d00932e0)
*  re-add build documentation command (c8ff23cf)
*  remove bail argument for build command (9d0576d3)
*  re-add build script to test command (d9a45d6c)

##### Chores

* **kitsu-core:**
  *  add npmignore (108fc957)
  *  rename prop to key in serialise (64b44d26)
* **deps:**
  *  update eslint-config-wopian to ~1.3.0 (7655109d)
  *  update lock file (356b1d88)
  *  update rollup to ~0.56.0 (bd6c286c)
  *  update lerna to ~2.9.0 (4f43c665)
  *  update rollup to ~0.56.0 (#127) (950363d6)
  *  revert changes to kitsu-core dependency (227a313f)
  *  pin new devDeps to minor instead of major (979cd879)
  *  update jest to ~22.3.0 (#124) (34410887)
  *  update eslint-config-wopian to ~1.2.0 (#123) (5702e214)
*  split kitsu into a monorepo (#126) (b825acc8)
*  re-add major and minor publish scripts (4afdf246)
* **lerna:**  remove publish skips (59d66518)

##### Continuous Integration

* **travis:**  re-enable email notifications (7596a8d7)
* **codeclimate:**
  *  disable eslint until custom configs are supported by codeclimate (f350da04)
  *  exclude example and cases directory (b7c26871)
  *  fix spec exclusion pattern (656f46f9)
  *  update exclude patterns (3fbf5a5d)
  *  fetch eslint config from repo (b15e79f1)

##### Documentation Changes

* **readme:**
  *  fix link to kitsu-core readme (d28ec1f7)
  *  one-line badges (dfbf4c45)
  *  update readmes (bb824f89)
* **contributing:**
  *  update commit message formatting (b62603f4)
  *  add code style and commit message (7b5e16fe)
* **kitsu-core:**
  *  link to package changelog (35f1113e)
  *  add name for default exports (03356eb5)
  *  remove private flags (8099b9b1)
*  link to github releases in root readme (9c71a30b)

##### New Features

*  use node/legacy version of kitsu-core for node/legacy packages (8c77574c)
*  split internal functions into a seperate package (a0bab704)

##### Refactors

* **kitsu-core:**  optimise undefined checks (f5519551)

##### Code Style Changes

*  fix spacing in auth example (489760dd)
*  fix eslint issues (d1372b16)
* **eslint:**  fix jest issues (d15c07bf)
