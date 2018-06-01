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
* **kitsu:**  update browser support table (c564c907)

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

##### Build System / Dependencies

* **kitsu:**  fix size-limit errors (closes #138) (#141) (3b730f7a)

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

#### 5.0.2 (2018-02-16)

##### Documentation Changes

* **kitsu:**  update installation section with correct legacy/node require path (eb70f0c1)

#### 5.0.1 (2018-02-16)

##### Chores

* **kitsu-core:**  add homepage and repository urls (8764512d)
* **kitsu:**  re-add homepage and repository urls (45efe3c4)
* **lerna:**  commit changelog before publishing (ea321fed)

#### 5.0.1 (2018-02-16)

##### Chores

* **lerna:**  commit changelog before publishing (ea321fed)

## 5.0.0 (2018-02-16)

##### Breaking Changes

* **kitsu:**  remove deprecated isAuth() function (42b9d08e)

##### Build System / Dependencies

*  hide lerna info output (604a5c6c)
*  publish workspace packages, not root (108d64e3)
*  re-add changelog generation (d00932e0)
*  re-add build documentation command (c8ff23cf)
*  remove bail argument for build command (9d0576d3)
*  re-add build script to test command (d9a45d6c)
* **kitsu:**  fix commonjs exported name for kitsu-core (6c0a3281)

##### Chores

* **kitsu-core:**
  *  add npmignore (108fc957)
  *  rename prop to key in serialise (64b44d26)
* **kitsu:**
  *  removed unused files from npmignore (ec382e25)
  *  update examples (8a826cbc)
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

* **kitsu:**
  *  add node/legacy paths change to migration guide (7bcebcc3)
  *  link to package changelog (1cfed463)
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

### 4.6.0 (2018-02-12)

##### Chores

* **deps:**  update documentation to ~5.4.0 ([#122](https://github.com/wopian/kitsu/pull/122)) ([d91434ee](https://github.com/wopian/kitsu/commit/d91434ee3e42b77f92358ba825d6accedfefe95e))

##### New Features

*  include meta from relationships ([#118](https://github.com/wopian/kitsu/pull/118)) ([1add511c](https://github.com/wopian/kitsu/commit/1add511c552150421b91979da5d8cc160bc7b7f8))

#### 4.5.3 (2018-02-10)

##### Build System / Dependencies

*  remove unused js-beautify devDependency ([708f15e8](https://github.com/wopian/kitsu/commit/708f15e8e3df36c4748c97e3e0bd6ef9fa4d546f))

##### Chores

* **deps:**
  *  update eslint-config-wopian to ~1.1.0 ([#120](https://github.com/wopian/kitsu/pull/120)) ([986b3732](https://github.com/wopian/kitsu/commit/986b3732f765d4816c5a4f1fc6a1d15b860240f3))
  *  update axios-mock-adapter to ~1.13.0 ([#119](https://github.com/wopian/kitsu/pull/119)) ([30da1e8a](https://github.com/wopian/kitsu/commit/30da1e8a4c8eddc43ebbf8944436b23588cddad5))
  *  update jest to ~22.2.0 ([#117](https://github.com/wopian/kitsu/pull/117)) ([f5165ba0](https://github.com/wopian/kitsu/commit/f5165ba0dc4f94e47a22af5c659eea30d5455720))
  *  update eslint-plugin-node to ~6.0.0 ([#116](https://github.com/wopian/kitsu/pull/116)) ([e7112ba5](https://github.com/wopian/kitsu/commit/e7112ba5a9204fce5acb53461c4c64cbce113b92))
  *  update rollup-plugin-babel-minify to ~4.0.0 ([#115](https://github.com/wopian/kitsu/pull/115)) ([41b8f4a6](https://github.com/wopian/kitsu/commit/41b8f4a6f113575e3bccae37f6d097b1975517d0))
  *  update eslint to ~4.17.0 ([#114](https://github.com/wopian/kitsu/pull/114)) ([571a168c](https://github.com/wopian/kitsu/commit/571a168c63827d2c7edb9aa5bb344ee3612ee9e5))
  *  update lock file ([#112](https://github.com/wopian/kitsu/pull/112)) ([bf24d5b2](https://github.com/wopian/kitsu/commit/bf24d5b281ea9c3c8422cb758f9a14a6ce71940c))

##### Documentation Changes

* **readme:**
  *  update browser section ([1452e7d1](https://github.com/wopian/kitsu/commit/1452e7d1336f4044ab745c4ad2759b47f3c432e3))
  *  add package size notice ([1f87617d](https://github.com/wopian/kitsu/commit/1f87617d9a54eefd1e20abd0a6aaa59904e48d94))
* **dictionary:**  add JS destructuring ([a8dd1169](https://github.com/wopian/kitsu/commit/a8dd1169a004a53b1f2f329ae08b1357825e1caa))
* **migrating:**  update error handling for 3.x to 4.x ([86a77130](https://github.com/wopian/kitsu/commit/86a77130948dc8563fcb3c45a9406883e9e4e23d))
* **changelog:**  add revert notice to es module files ([dd83ed6c](https://github.com/wopian/kitsu/commit/dd83ed6c74a9d00ee5703c46a9c114cf53b41739))

##### New Features

*  use eslint-config-wopian ([82d057cd](https://github.com/wopian/kitsu/commit/82d057cdec24329523037327882b5bb2186006c0))

##### Bug Fixes

*  set browser usage cutoff to 0.05% instead of 0.5% for default usage ([dc1f8463](https://github.com/wopian/kitsu/commit/dc1f846352b92954b499caaf9a4caf954222f07f))

#### 4.5.2 (2018-01-27)

#### 4.5.1 (2018-01-27)

##### Build System / Dependencies

*  add TypeError and addUncountableRule to dictionary ([118a430a](https://github.com/wopian/kitsu/commit/118a430aa94781fd54f2f6354daa963e425e7c04))
*  run doc tasks before tests ([cdde056f](https://github.com/wopian/kitsu/commit/cdde056fa1a5d703baa7dc41c7fe337c47f76fb1))

##### Reverts

*  re-add ES modules ([47037566](https://github.com/wopian/kitsu/commit/47037566a23160307b42da7e3cd47f067f8c4d49))

### 4.5.0 (2018-01-27)

##### Breaking Changes

*  ~~remove ES module format~~ ([2d484e02](https://github.com/wopian/kitsu/commit/2d484e029c02cc8fda12ecda814af9c829c8b11b))
    - reverted in `4.5.1`
* **fix:**  rethrow JSON:API errors (fixes [#104](https://github.com/wopian/kitsu/pull/104)) ([4a3c6078](https://github.com/wopian/kitsu/commit/4a3c6078a4337115122f9c66691df058ddda53ee))
* **rollup:**  ~~use commonjs format instead of UMD for lib files~~ ([204ab3e3](https://github.com/wopian/kitsu/commit/204ab3e3c93b21109f1515ae3ebc168b06181a7f))
    - reverted in ([2dc27467](https://github.com/wopian/kitsu/commit/2dc274676abaf0b23a5d3ffb2b29b8278f44188a))

##### Build System / Dependencies

*  lint docs during doc generation ([95c44478](https://github.com/wopian/kitsu/commit/95c4447802648fabbbc118e013eb1e6aba34a0f1))

##### Chores

* **deps:**
  *  update axios-mock-adapter to ~1.12.0 ([#108](https://github.com/wopian/kitsu/pull/108)) ([24ccbc77](https://github.com/wopian/kitsu/commit/24ccbc77f753b6316bce8f27a60d97e82456e3a9))
  *  update rollup to ~0.55.0 ([#105](https://github.com/wopian/kitsu/pull/105)) ([264f2009](https://github.com/wopian/kitsu/commit/264f2009cc678716148f1506dbc82e1752593963))
*  remove useless throw case after 4a3c607 ([85e7cc67](https://github.com/wopian/kitsu/commit/85e7cc67287ca4d197874bcc91607bfa3027b80f))

##### Documentation Changes

* **readme:**  update package size in support table ([978d0430](https://github.com/wopian/kitsu/commit/978d0430e11ec928cd02a0967b0b7189365843cf))
* **isAuth:**  add deprecation notice ([c583889b](https://github.com/wopian/kitsu/commit/c583889bf42a5aca633885d0b6358cd0061d3685))
* **error:**  add documentation ([97a35564](https://github.com/wopian/kitsu/commit/97a355641a4689165530d6ee446fc41cbf8df994))
* **query:**  add documentation ([216a20d2](https://github.com/wopian/kitsu/commit/216a20d2750b42831f88536ef872ccb796050584))
*  update dictionary ([27a3c341](https://github.com/wopian/kitsu/commit/27a3c341fc2ad533ba2538b938c5f2a6880f2539))
*  add cdn usage and demo services (node & browser) ([671f7d34](https://github.com/wopian/kitsu/commit/671f7d348d2dd0ac1d61e03c661e95c7952a14d8))
*  tag linkArray/Object as private functions ([601612c9](https://github.com/wopian/kitsu/commit/601612c92b1403e5c1e63a156cf2b021ffa573ba))

##### Refactors

*  remove authentication requirements for post/patch/delete ([#107](https://github.com/wopian/kitsu/pull/107)) ([b91057e5](https://github.com/wopian/kitsu/commit/b91057e5bb50c6fb35fdc0125942824393e04f06))
*  don't check query param type is a string ([a4486b3d](https://github.com/wopian/kitsu/commit/a4486b3d38a5e9771da7e5561422730bda879c50))
*  cleanup linkRelationships ([c0e1aae8](https://github.com/wopian/kitsu/commit/c0e1aae84b57cac7e6ad295b1d2e65817438d899))
*  inject JSON:API error array into top level of axios error ([d4019919](https://github.com/wopian/kitsu/commit/d4019919f1ecd8c78af57f8c55af333feead6ee6))
*  simplify required jsonapi headers inclusion ([6f018c71](https://github.com/wopian/kitsu/commit/6f018c711d648f448e0c513e97add2a07c6a73f4))

##### Tests

* **error:**  update test cases ([5ea1f130](https://github.com/wopian/kitsu/commit/5ea1f1302edde30d6b71b791bfff39c1be4c852d))
*  ignore axios paramSerializer function line ([1a8dd927](https://github.com/wopian/kitsu/commit/1a8dd9272130e7f6a7b7b985df5aecf642aaa88d))
*  test uncovered throw in serialise ([0b055d36](https://github.com/wopian/kitsu/commit/0b055d36c9797902c96c8b822835c82449220368))
*  update test cases ([f974a2a0](https://github.com/wopian/kitsu/commit/f974a2a0b158635f785935d615bcb09cc551dea1))

#### 4.4.3 (2018-01-22)

##### Chores

*  simplify baseURL logical or operation ([0d2f8c55](https://github.com/wopian/kitsu/commit/0d2f8c5556260bc261933ab0c58decb4c6d4370b))

##### Tests

*  add tests for baseURL constructor ([b3ecd672](https://github.com/wopian/kitsu/commit/b3ecd672a7739d6853bf413297d897d56b09702e))

#### 4.4.2 (2018-01-22)

##### Documentation Changes

*  add navigatable links to JSON:API spec references ([9ba8db6b](https://github.com/wopian/kitsu/commit/9ba8db6bc25c32a4e3d61a2b18a4be1d2c752c16))

#### 4.4.1 (2018-01-22)

##### Chores

* **deps:**  update eslint to ~4.16.0 ([#102](https://github.com/wopian/kitsu/pull/102)) ([fa7805f2](https://github.com/wopian/kitsu/commit/fa7805f25d3f421526488fc45a3188002c1b0834))

##### Continuous Integration

* **codeclimate:**  increase cognitive complexity limit by 1 ([010290c0](https://github.com/wopian/kitsu/commit/010290c0a67a318d2d76d0430de15c956d4628ec))

##### Bug Fixes

*  correct name for exported module (fixes [#103](https://github.com/wopian/kitsu/pull/103)) ([f945e566](https://github.com/wopian/kitsu/commit/f945e5662f0c75bf2d95fbca9183bcfd23d3b4d7))
* **rollup:**  transpile node package for node 6 support ([b84a8253](https://github.com/wopian/kitsu/commit/b84a8253a4dbf79fc7cd7702d24a6d18c33f3c1c))

### 4.4.0 (2018-01-19)

##### Build System / Dependencies

*  add :docs script ([9eed1b64](https://github.com/wopian/kitsu/commit/9eed1b640dd1fb359a6b543f105a25a4c8e6d3c7))
*  lint docs but don't build during tests ([24ace510](https://github.com/wopian/kitsu/commit/24ace51036e2c07d0c4248a3afcd62fe851bd448))

##### Chores

* **deps:**  update axios-mock-adapter to ~1.11.0 ([#98](https://github.com/wopian/kitsu/pull/98)) ([2d36968b](https://github.com/wopian/kitsu/commit/2d36968b24e1ec7e6059eb9ae1ff1c99050572c1))

##### Documentation Changes

*  remove comma in example ([33a11083](https://github.com/wopian/kitsu/commit/33a1108322c4f26fab893d2639e67af35df9f66e))
*  fix changelog and contributing links pointing to wrong repo ([89ac6547](https://github.com/wopian/kitsu/commit/89ac654757a2c7a60b51175476cb63afb59941a9))
*  update dictionary ([62e6adec](https://github.com/wopian/kitsu/commit/62e6adec0390812d2f36a58dfb4017d6b53c62a9))
*  include api documentation inside readme instead of docs.md ([61ec6837](https://github.com/wopian/kitsu/commit/61ec68374214881b9159e569359d78b074dc5abe))
*  link to latest version's documentation ([eac1bd44](https://github.com/wopian/kitsu/commit/eac1bd44908cf82f34e808adb6e13640fc7c6d62))

##### New Features

*  support nested relationships ([#101](https://github.com/wopian/kitsu/pull/101)) ([4285e194](https://github.com/wopian/kitsu/commit/4285e1949383acc40683cd1b828a41bb25863461))

##### Bug Fixes

*  get item related resource ([#99](https://github.com/wopian/kitsu/pull/99)) ([e8da7575](https://github.com/wopian/kitsu/commit/e8da7575c9ab86bd820107a57a0b1e6a8b6483f0))

### 4.3.0 (2018-01-18)

##### Chores

* **deps:**  update eslint-plugin-jest to ~21.7.0 ([#97](https://github.com/wopian/kitsu/pull/97)) ([784cca45](https://github.com/wopian/kitsu/commit/784cca4533d62ce6794b6e19240af0b01fa550b1))

##### Reverts

*  use instance of axios instead of global axios ([#96](https://github.com/wopian/kitsu/pull/96)) ([a589ba01](https://github.com/wopian/kitsu/commit/a589ba01771aa9e5dd166d5a1e07cbe17dfba67f))

#### 4.2.1 (2018-01-18)

##### Chores

* **deps:**  update jest to ~22.1.0 ([#94](https://github.com/wopian/kitsu/pull/94)) ([5b5a76b8](https://github.com/wopian/kitsu/commit/5b5a76b881856f0ac5fe0ac5107447ff06bbb290))

##### Bug Fixes

*  convert CamelCase into lowercase for kebab and snake conversions ([#95](https://github.com/wopian/kitsu/pull/95)) ([ad948322](https://github.com/wopian/kitsu/commit/ad9483228056813c62979850aada1951c4648057))

### 4.2.0 (2018-01-16)

##### Chores

* **deps:**
  *  update size-limit to ~0.14.0 ([#93](https://github.com/wopian/kitsu/pull/93)) ([91d51aa4](https://github.com/wopian/kitsu/commit/91d51aa44369d978c2dac05d0c7cfadc830a22df))
  *  update rollup to ~0.54.0 ([#92](https://github.com/wopian/kitsu/pull/92)) ([e09f3b78](https://github.com/wopian/kitsu/commit/e09f3b78eb626948ea4921678ff42c78c88486f0))
  *  update eslint-plugin-jest to ~21.6.0 ([#89](https://github.com/wopian/kitsu/pull/89)) ([af49aacd](https://github.com/wopian/kitsu/commit/af49aacdf23f48b904c02f4084ba7443ff9fc3e3))
  *  update babel-eslint to ~8.2.0 ([#88](https://github.com/wopian/kitsu/pull/88)) ([6b0ee2b9](https://github.com/wopian/kitsu/commit/6b0ee2b91ad19f4c131506a182b48171d9ee8a3c))
  *  update eslint to ~4.15.0 ([#87](https://github.com/wopian/kitsu/pull/87)) ([196964d1](https://github.com/wopian/kitsu/commit/196964d16e762a87b8b30c9f90b7e50617179293))

##### Documentation Changes

* **readme:**  fix tagline grammar ([b77c13f6](https://github.com/wopian/kitsu/commit/b77c13f6f1972b057137b72ca6b25052276b5b50))

##### New Features

*  use last 2/10 years for default/legacy browser support + add node-only package ([55e74d58](https://github.com/wopian/kitsu/commit/55e74d58e3ba720e3e0b73796d836490b27d40c9))

##### Bug Fixes

*  forward get request errors through self function ([29fc2fa0](https://github.com/wopian/kitsu/commit/29fc2fa0e7cbd0e5982516f4d2671110d60ed103))
*  send serialised object instead of its data object (delete method) ([f1bb10b6](https://github.com/wopian/kitsu/commit/f1bb10b634398df96fcd749db48242c66ae04f6c))
*  serialised ID MUST return a string ([64c6df68](https://github.com/wopian/kitsu/commit/64c6df68eaaeaac2d68486a573bf56abb4d63638))
*  send serialised object instead of its data object ([74435db3](https://github.com/wopian/kitsu/commit/74435db383f90b9511c08ba74738083a3d46c8a3))
*  prevent adding types into serialised attributes ([d8c11da7](https://github.com/wopian/kitsu/commit/d8c11da71c30f18e669a9e44ea1254615b610cdd))
*  resolve headers not being applied for patch and post requests ([ff2d0d07](https://github.com/wopian/kitsu/commit/ff2d0d075b94ad9837c5baeae32832900cda6299))

##### Tests

*  add test for filterIncludes branch ([8522a964](https://github.com/wopian/kitsu/commit/8522a9641c0fa9aba61068879472bd0831d2041c))
*  add tests for error function ([0e27e8c8](https://github.com/wopian/kitsu/commit/0e27e8c827921c1bb7ad538e60ca2ef3d1a7829e))
*  remove console log ([9ba1a00a](https://github.com/wopian/kitsu/commit/9ba1a00ac2cab80383f913568c820c3810245ba8))
*  add tests to check requests' data contents ([5ca470d3](https://github.com/wopian/kitsu/commit/5ca470d33898e6fbca3eb1a033481815ba08c058))
*  test headers are sent in request ([32435ce8](https://github.com/wopian/kitsu/commit/32435ce8c48b0ce165208dc17fb3e36346ff3227))

### 4.1.0 (2018-01-05)

##### Build System / Dependencies

*  cleanup path to legacy package - still `kitsu/lib/legacy` for end users ([d4a658e3](https://github.com/wopian/kitsu/commit/d4a658e331d66b6e8549280b54544234d9d4f00f))
*  don't mangle variables in releases - removes need for sourcemap bloat ([b766c167](https://github.com/wopian/kitsu/commit/b766c167d1ff1e115a88b7999b5f85eb1c2a407c))
*  ignore src and dictionary in releases ([7d13695d](https://github.com/wopian/kitsu/commit/7d13695dd4c7218896636cb0a8b5ed7825d3eba5))
*  run jest without coverage report in pre-commit hook ([32ff71d9](https://github.com/wopian/kitsu/commit/32ff71d94f7a0457080cbafc128fc3098fb155df))
*  add pre-commit hook for tests ([fde20010](https://github.com/wopian/kitsu/commit/fde20010daf86398fbd8bea30018ad57d46efd3e))
*  update package scripts ([656137f6](https://github.com/wopian/kitsu/commit/656137f66dc9c24375e5ca3019e690ef5206e00f))

##### Continuous Integration

*  fix spec exclusion pattern ([a5115acf](https://github.com/wopian/kitsu/commit/a5115acf30e13ba5f61de25c0ac78e6e8564ed14))

##### Documentation Changes

*  document camel, kebab and snake functions ([24d27aab](https://github.com/wopian/kitsu/commit/24d27aab08c4d3cdfe5995cbf7aa8d0a3203f4dd))

##### Bug Fixes

* **deattribute:**  check data is an object/array instead of undefined, prevent throwing an error if data is defined but an invalid type ([d490ff27](https://github.com/wopian/kitsu/commit/d490ff277d3818eb6f4d001966edd0ceec789b9a))

##### Refactors

*  cleanup serialisation validation ([#85](https://github.com/wopian/kitsu/pull/85)) ([f99286eb](https://github.com/wopian/kitsu/commit/f99286eb85faf1a8ad0ca8fb17ce4bbb251da5e2))
*  make deattribute function 54% faster ([8cac0f04](https://github.com/wopian/kitsu/commit/8cac0f049d143c765f19cc4d509e8f7831a0f15a))

##### Tests

* **self:**  remove unused case import ([b8e7411e](https://github.com/wopian/kitsu/commit/b8e7411eb38fe2d603bdc5dd4a4f4b367240667d))
*  split Kitsu class tests into seperate files for each method ([757acab2](https://github.com/wopian/kitsu/commit/757acab2b6c33d754239225fb6eb8a7019624eb8))
*  properly capture thrown error by filterIncludes ([8f7fbebd](https://github.com/wopian/kitsu/commit/8f7fbebd06d3338c252f524e62d9b2dba205b34e))
*  properly handle async failures for deserialise ([19fd5587](https://github.com/wopian/kitsu/commit/19fd558784d4a6caad7dc2b636c8d951e939002f))
*  cleanup deattribute tests ([47a7fbaf](https://github.com/wopian/kitsu/commit/47a7fbaf1283e0c6490255a71e967832a0a26359))

#### 4.0.2 (2018-01-03)

##### Documentation Changes

*  add package size to browser support table ([78f85915](https://github.com/wopian/kitsu/commit/78f8591555fae384266ffd00f69f597dc43d407f))

#### 4.0.1 (2018-01-03)

##### Documentation Changes

*  fix typos ([c55335ef](https://github.com/wopian/kitsu/commit/c55335efab0ba50f3db350648b540736580fd0f8))
*  update DOCS link to 4.x ([cfd44c5b](https://github.com/wopian/kitsu/commit/cfd44c5bdb4e8e9876c391995a189caec844fee4))

## 4.0.0 (2018-01-03)

##### Breaking Changes

*  change default camelCase conversion from snake_case to kebab-case ([60181d7a](https://github.com/wopian/kitsu/commit/60181d7a165a21bdf825799c151b4d55cdd1a7ec))
*  create legacy bundle for IE8, 9, 10 and 11 support ([e8a31c78](https://github.com/wopian/kitsu/commit/e8a31c78e4aca6f040905b76c562788c8693e87e))
*  merge API version into baseURL ([d9d8c4f7](https://github.com/wopian/kitsu/commit/d9d8c4f7709959edc595eb0520103cd67a64ace3))
*  exclude ie mobile ([90b84346](https://github.com/wopian/kitsu/commit/90b843462ff14277a47f78d452aa5323fcc6b1cf))
* **fix:**  error object can now be destructured ([af067881](https://github.com/wopian/kitsu/commit/af067881be603a4d6f920fc5edc2873a6b06257d))

##### Build System / Dependencies

*  add spellchecker and library size reporter ([c4e20dad](https://github.com/wopian/kitsu/commit/c4e20dad28e33433d9a1d87681f660d72142f91e))
*  update globals location ([9c9436ae](https://github.com/wopian/kitsu/commit/9c9436aea317551f5600d79197faa06117bade03))
*  cleanup rollup config ([425a24e0](https://github.com/wopian/kitsu/commit/425a24e075c8974f98a220430e4d6c873c8c4d5c))
*  remove unused runtime helpers ([1bb4310c](https://github.com/wopian/kitsu/commit/1bb4310c1aef901394b6862a6f8ba7803b54d4f0))
*  lint docs ([1a76938d](https://github.com/wopian/kitsu/commit/1a76938d6f58706a5e7fa7a0857b5f3c5f5b0902))

##### Chores

* **deps:**
  *  update lockfile ([b7ae9d20](https://github.com/wopian/kitsu/commit/b7ae9d20bc3d0c4a483cf12ceaf1e52a744a2a97))
  *  lock file maintenance ([#83](https://github.com/wopian/kitsu/pull/83)) ([135e85c8](https://github.com/wopian/kitsu/commit/135e85c8dc9d49184c0c91f07151cd4c67987350))
  *  update babel-eslint to ~8.1.0 ([#79](https://github.com/wopian/kitsu/pull/79)) ([3343ebbb](https://github.com/wopian/kitsu/commit/3343ebbbe8e1375ef3d47e7570603b91124678e2))
  *  update eslint to ~4.14.0 ([#77](https://github.com/wopian/kitsu/pull/77)) ([fb8fcb86](https://github.com/wopian/kitsu/commit/fb8fcb8692e4ff6a083775167d070156c87f5449))
  *  update rollup to ~0.53.0 ([#78](https://github.com/wopian/kitsu/pull/78)) ([e283a28e](https://github.com/wopian/kitsu/commit/e283a28e6ff7ca3a4fb67ef938487488fc35c5bc))
  *  update jest to ~22.0.0 ([#75](https://github.com/wopian/kitsu/pull/75)) ([bf501352](https://github.com/wopian/kitsu/commit/bf50135220190c59e3e8eb908f86e39b10474e38))
  *  add missing eslint plugins ([6b8253f2](https://github.com/wopian/kitsu/commit/6b8253f23d8811407c5f077f83aea9b2fec2e35f))
  *  update generate-changelog to ~1.7.0 ([#72](https://github.com/wopian/kitsu/pull/72)) ([2a5a3da3](https://github.com/wopian/kitsu/commit/2a5a3da3fc273317bdbe6fe95b9f0815d8c21e90))
  *  update eslint-plugin-jest to ~21.5.0 ([#71](https://github.com/wopian/kitsu/pull/71)) ([eb87da70](https://github.com/wopian/kitsu/commit/eb87da7016d9c68308e548da7287a7ed044ac7a2))
* **npm:**
  *  ignore test usecases and spec files ([8d83c8c7](https://github.com/wopian/kitsu/commit/8d83c8c711f4165b6a00aeb020ff7f2c658e931e))
  *  remove non-existent ignores ([279f882e](https://github.com/wopian/kitsu/commit/279f882e40c73f10b855421c521296541702fcca))
  *  include source code in releases ([154ebd97](https://github.com/wopian/kitsu/commit/154ebd970ae2b09f3969e33732544e60e09296a1))
*  move serialise into directory ([87637c5f](https://github.com/wopian/kitsu/commit/87637c5f31b3d9ba18092d28145bc2c1093b81bc))
*  update renovate config ([936013c4](https://github.com/wopian/kitsu/commit/936013c4a08a6d422fcbcbf6e78c0e2661f11807))
* **readme:**  combine usage and docs section ([2c586b38](https://github.com/wopian/kitsu/commit/2c586b384c2da278534008d74422336485bfa20d))
* **renovate:**
  *  fix commit type ([a8344e97](https://github.com/wopian/kitsu/commit/a8344e9793984c3eb043bd21954cd9f3f2f56163))
  *  remove linters config ([c541abb4](https://github.com/wopian/kitsu/commit/c541abb44461c24cbbcc191410a0d3f865b41756))
  *  remove schedule ([e15c066e](https://github.com/wopian/kitsu/commit/e15c066e83e1c84b4aa854a608bd22b5508f6fe2))
  *  remove assign ([d3462de1](https://github.com/wopian/kitsu/commit/d3462de177778ad7cf112f90e5d810bb82fcccc4))
  *  stop displaying fix(deps) commits ([cd19bf3a](https://github.com/wopian/kitsu/commit/cd19bf3a4e8cfa1b670c546b9a0259400e19c525))

##### Continuous Integration

*  enforce eslint formatting rules ([f1f7df20](https://github.com/wopian/kitsu/commit/f1f7df2073cb645fb53459bf1cde29f344e2af91))
* **codeclimate:**
  *  migrate config to version 2 ([869288e4](https://github.com/wopian/kitsu/commit/869288e4f264c7f083fc2aa7a11b701a019d7751))
  *  ignore __cases__ directory ([e0842177](https://github.com/wopian/kitsu/commit/e08421777f0d731f70a5240cddd961acd35ce536))
* **appveyor:**
  *  update config ([d840e1b2](https://github.com/wopian/kitsu/commit/d840e1b287110c53f06b4f0edfff6dc541ae521d))
  *  stop testing with 32bit ([fc6bfcc2](https://github.com/wopian/kitsu/commit/fc6bfcc2ad84ea3cea0ff8c6160605b38cfb5326))
  *  don't mutate lockfile when testing ([0534ec21](https://github.com/wopian/kitsu/commit/0534ec21597b079bae22bd064f3e47bfce55688d))
* **travis:**
  *  disable macOS builds due to backlog ([5118fe14](https://github.com/wopian/kitsu/commit/5118fe1484f41242701b3a55e67c3921c491754d))
  *  force test node environment ([91140570](https://github.com/wopian/kitsu/commit/91140570eb4a80a950d1d42f73182d83c7840cfe))

##### Documentation Changes

*  add 4.x migration guide ([ef714744](https://github.com/wopian/kitsu/commit/ef7147440513d0cdc2dd110e69a0ae0324713f05))
*  update links ([2f66c1bc](https://github.com/wopian/kitsu/commit/2f66c1bccf9525d07d21ef1fbfb22dd3f44f71fe))
*  fix codeclimate coverage badge again ([78177dde](https://github.com/wopian/kitsu/commit/78177ddee87204a3837c5fba7b1c2a5725c8f69c))
*  fix codeclimate coverage badge ([b3719e36](https://github.com/wopian/kitsu/commit/b3719e36d75abfa993fd96e3b1f7410d9b3a22dc))
*  version tag link to docs ([77985497](https://github.com/wopian/kitsu/commit/779854973e8c2a8f0e1db632c3a438167ba755f3))
*  resolve lint warnings ([79589d7f](https://github.com/wopian/kitsu/commit/79589d7f7d8cd31d8d06f1bf5050b04d85898365))
*  add patreon ([854b3a08](https://github.com/wopian/kitsu/commit/854b3a0878adb0f24cf36ac24d64f01d4fcba9c6))
* **contributing:**  add test section ([c0c71657](https://github.com/wopian/kitsu/commit/c0c716572a92529e4c16a14c54ac27b3805b3d5a))

##### New Features

*  use pluralisation and camelisation options for data serialisation ([74a290f5](https://github.com/wopian/kitsu/commit/74a290f56f6058f5f4000a6dec7a7e01484a9f36))
*  allow disabling pluralize and decamelize ([#69](https://github.com/wopian/kitsu/pull/69)) ([aaa0c876](https://github.com/wopian/kitsu/commit/aaa0c87674afce6343ec40df24ad7f84e752b594))
*  support all browsers with usage higher than 0.1% (reverts 379ac32) ([432cdb16](https://github.com/wopian/kitsu/commit/432cdb16eef3799b581c39578594c370b6b7e78d))
*  drop browser support for ie ([379ac329](https://github.com/wopian/kitsu/commit/379ac32934aefe207b1f1a41c530ebf97e5dad3e))

##### Bug Fixes

*  prevent pluralising {baseURL}/resources/1 as {baseURL}/resource/1S ([91da8f09](https://github.com/wopian/kitsu/commit/91da8f09670476afedf9ecf170153563c89605b3))
*  handle relationship arrays (fixes [#80](https://github.com/wopian/kitsu/pull/80)) ([#81](https://github.com/wopian/kitsu/pull/81)) ([596ff898](https://github.com/wopian/kitsu/commit/596ff8980d9e59e51c7fe020460946134f450ea0))

##### Other Changes

*  mock axios and add response test cases ([937169a8](https://github.com/wopian/kitsu/commit/937169a8fcb92ec2facbd57166918aa088692f3a))

##### Refactors

*  avoid using template literal ([48c61150](https://github.com/wopian/kitsu/commit/48c61150c2c878eb699a9a59a65536fbddfd2793))
*  use own isAuth getter to check auth header ([fafcdc0e](https://github.com/wopian/kitsu/commit/fafcdc0e594b1a14f82145da1b6d7be1e38fea7f))
*  clean up source ([905ef7b0](https://github.com/wopian/kitsu/commit/905ef7b090120933ff44bf7457e94121718ce776))
*  don't bind methods to class ([da4efadd](https://github.com/wopian/kitsu/commit/da4efadd8d488ad50fb7a1819e4079b5ad67e573))
*  cleaner method imports ([8ece462d](https://github.com/wopian/kitsu/commit/8ece462d0f66a70ed209a692b4567a697a69da61))

##### Reverts

* **renovate:**  add assignee back ([bff492f0](https://github.com/wopian/kitsu/commit/bff492f0ccd25bc3d3444568fb513d160a7b4b1f))
*  force test node environment ([77c1dbb2](https://github.com/wopian/kitsu/commit/77c1dbb28e884a11a98f0ce5cf102c2b4025b602))

##### Tests

*  use exact url paths for axios mocking ([99568a53](https://github.com/wopian/kitsu/commit/99568a534179560f4922cd9ed8e86d5e274e58a3))
*  use toThrowError for serialise array test ([2cf31406](https://github.com/wopian/kitsu/commit/2cf31406f5d0c0acf03bc05135d597df859f818f))
*  add basic patch, post and delete tests ([89f2b45c](https://github.com/wopian/kitsu/commit/89f2b45c72d56d4c06a4a426de83221c99d02c54))
*  add more get test cases ([9dc2ce02](https://github.com/wopian/kitsu/commit/9dc2ce02a2e4b6fe2de4a258d5ed486ac36d4387))
*  add a few patch test cases ([3631d24b](https://github.com/wopian/kitsu/commit/3631d24bad15a67d061f5ddbf1f8390e45b488d5))
*  add Kitsu constructor tests ([17519c6e](https://github.com/wopian/kitsu/commit/17519c6e6ee523cdffbc06de98fb7e028803b7d0))

#### 3.1.4 (2017-12-12)

##### Chores

* update release scripts ([6f81ed9a](https://github.com/wopian/kitsu/commit/6f81ed9ac521f434fc3c169faf4c773ab3499f1c))
* remove 3.1.2 commits from 3.1.3 changelog ([64acafd5](https://github.com/wopian/kitsu/commit/64acafd55bb623d1464afcd4ed8027ba66e7b46a))
* fix changelog versioning ([53c10dab](https://github.com/wopian/kitsu/commit/53c10dab5f539adc8b1c81566da7831ff2eb6159))
* update build scripts ([bc3b1807](https://github.com/wopian/kitsu/commit/bc3b1807238391afbe536a0f65271abf56da12c6))
* use common error function ([c25e4dc2](https://github.com/wopian/kitsu/commit/c25e4dc2cf81c7f4058239039ecdd5bff8604270))
* **deps:**
  * renovate eslint packages (#68) ([151405ff](https://github.com/wopian/kitsu/commit/151405ff5df73b9c2b41b833699a8a61575357a5))
  * renovate eslint packages (#67) ([b8c66c25](https://github.com/wopian/kitsu/commit/b8c66c256f96733636e6bb605956ee265d240b4f))
  * update generate-changelog to ~1.6.0 (#65) ([563fc22b](https://github.com/wopian/kitsu/commit/563fc22bf2af8fc5b15b8d844d22fb15d5591700))
  * update rollup to ~0.52.0 (#66) ([853fa39d](https://github.com/wopian/kitsu/commit/853fa39d6b2e8a017428324493a4f8b123d5cdfc))

##### Continuous Integration

* **travis:**
  * use existing oauth token ([1f7f8373](https://github.com/wopian/kitsu/commit/1f7f83733796774b4941600cd43b7f2138a5a7d7))
  * add package files to github releases ([2c6e577e](https://github.com/wopian/kitsu/commit/2c6e577e9a7712dfc2305f319bc28ef436aac4a2))
* test against LTS node versions ([184ee6f7](https://github.com/wopian/kitsu/commit/184ee6f7b4a0bcf909fea3ef9594155f89b0f605))

##### Documentation Changes

* add contributors badge ([7bb04ba8](https://github.com/wopian/kitsu/commit/7bb04ba8860f3741285a9dba1c04074c4fbf0439))
* fix kitsu.io docs url ([39b337a1](https://github.com/wopian/kitsu/commit/39b337a1ea61de2ff7194dee17e280f163a93a69))
* update donation link ([c43b10b3](https://github.com/wopian/kitsu/commit/c43b10b38cd053f8608f3ae1816044143e97d216))
* use https for kitsu.io api docs link ([c0494cbc](https://github.com/wopian/kitsu/commit/c0494cbc1fa51fb465c2888e8ca9edb1170d8cf6))
* update badges and add example response comparison ([70be0a71](https://github.com/wopian/kitsu/commit/70be0a71707b81cc2a19e324f7ff1485faedcbed))

##### Bug Fixes

* add parentheses to fix short-circuiting of URL version (#64) ([b74fd7e3](https://github.com/wopian/kitsu/commit/b74fd7e37c9913a20b6efbe6a96503b48473817c))

#### 3.1.3 (2017-11-26)

##### Bug Fixes

* add parentheses to fix short-circuiting of URL version (#64) ([b74fd7e3](https://github.com/wopian/kitsu/commit/b74fd7e37c9913a20b6efbe6a96503b48473817c))

#### 3.1.2 (2017-11-24)

##### Chores

* update build scripts ([bc3b1807](https://github.com/wopian/kitsu/commit/bc3b1807238391afbe536a0f65271abf56da12c6))
* use common error function ([c25e4dc2](https://github.com/wopian/kitsu/commit/c25e4dc2cf81c7f4058239039ecdd5bff8604270))

##### Continuous Integration

* test against LTS node versions ([184ee6f7](https://github.com/wopian/kitsu/commit/184ee6f7b4a0bcf909fea3ef9594155f89b0f605))

#### 3.1.1 (2017-11-24)

##### Chores

* **deps:**
  * renovate eslint packages (#62) ([115a8b0d](https://github.com/wopian/kitsu/commit/115a8b0d2bb1f3b2f4b200db7713d0540f655ea0))
  * update rollup to ~0.51.0 (#63) ([0b4ae24f](https://github.com/wopian/kitsu/commit/0b4ae24fb88fc6269e13a01bd145ebe0f55c044f))

##### Continuous Integration

* **travis:** remove greenkeeper integrations ([bfae4aae](https://github.com/wopian/kitsu/commit/bfae4aae8d9aefee2e37b38acc32af2e021ae458))

##### Bug Fixes

* handle empty data arrays ([d95f0593](https://github.com/wopian/kitsu/commit/d95f059364d4083cb362c4ff487050878a8a0850))

##### Tests

* add empty data array spec ([122387a1](https://github.com/wopian/kitsu/commit/122387a1262a9908fc130dceabf29feb207d3b5d))

### 3.1.0 (2017-11-07)

##### Chores

* add kitsu.io to npm tags ([fec517ba](https://github.com/wopian/kitsu/commit/fec517badb4103a36e23cb63330316333d46448c))
* disable lockfile maintenance ([aef0a52b](https://github.com/wopian/kitsu/commit/aef0a52b1d829fed8f48ac55d672710e1d996749))
* enable renovate (#60) ([27608b1f](https://github.com/wopian/kitsu/commit/27608b1f14914ed0346b0829a38e9fc2de198059))
* **deps:** update lock file (#61) ([dd37a4c6](https://github.com/wopian/kitsu/commit/dd37a4c6efb0986441d65ac065d32e70c8625989))

##### New Features

* allow additional headers with requests ([6872b4e5](https://github.com/wopian/kitsu/commit/6872b4e512dc31ea8e14a5aa307d2d4328d58802))

#### 3.0.4 (2017-11-02)

##### Chores

* HTTPS -> HTTP for Apiary API docs link ([ee6fd365](https://github.com/wopian/kitsu/commit/ee6fd36548490c7c40549d66e4bb3ec04a402d7c))

#### 3.0.3 (2017-11-01)

##### Chores

* loosen production dependencies to major versions ([8bb3bc35](https://github.com/wopian/kitsu/commit/8bb3bc35a65416e295f4e198ecbbe8756e768c69))
* remove oauth2 and authorisation tags ([fc13f42d](https://github.com/wopian/kitsu/commit/fc13f42d75bb3a1a0f145043b392361941c4bad2))

##### Continuous Integration

* disable appveyor cache until they fix unzipping it ([2b3f8d70](https://github.com/wopian/kitsu/commit/2b3f8d70f31e89e278ed8d483125c68163542f69))

##### Documentation Changes

* fix typos ([3a8c0aad](https://github.com/wopian/kitsu/commit/3a8c0aadcf4848399da0a5428db1bcaa2b39601e))
* fix timeout capitalisation ([eae07a2f](https://github.com/wopian/kitsu/commit/eae07a2fcb5ea69275e42d4334faca4ae0f9096b))
* reword features list ([ee3d0ccb](https://github.com/wopian/kitsu/commit/ee3d0ccbca924f89eb3ea507325523ba644b009a))
* fix compliant typo in README ([657cc188](https://github.com/wopian/kitsu/commit/657cc1886d2e730cb1566decf516cd6284ee46d9))
* reword kitsu.io api documentation ([eb814cec](https://github.com/wopian/kitsu/commit/eb814cec91865709c737f702e4620baee4486348))

#### 3.0.2 (2017-10-13)

##### Documentation Changes

* fix typo in header example (#53) ([0b682aee](https://github.com/wopian/kitsu/commit/0b682aee79bb361e58b0e28b0eb224f5c90f06ef))

#### 3.0.1 (2017-10-09)

##### Chores

* remove unused globals from rollup config ([f0e002ba](https://github.com/wopian/kitsu/commit/f0e002baec59767886e64f97cf08b072fc41e930))

## 3.0.0 (2017-10-09)

##### **BREAKING CHANGES**

- Built in oAuth2 authentication has been removed. Use `client-oauth2` directly (example in `auth.js`)

- Option variable for the API URL and version on creating a new instance has changed
  - `apiUrl` is now `baseURL`
  - `apiVer` is now `version`

- Removed the `compact` option in the `whoAmI` function

- Removed the network failure retry ability (was a built-in feature of `got` not included with `axios`)

##### Chores

* readd header (broken) ([4d2ad285](https://github.com/wopian/kitsu/commit/4d2ad285c13c14673af8b53ac6ac9b015376a943))
* add doc linter command ([2481775d](https://github.com/wopian/kitsu/commit/2481775d19ee9411e04f939b6d99fd350a5cb6f9))

##### Documentation Changes

* update documentation and examples ([a43bc4fa](https://github.com/wopian/kitsu/commit/a43bc4fa4a289dc552ef452e08c667ad7d2f62f2))
* add destructuring example to readme ([28585a34](https://github.com/wopian/kitsu/commit/28585a349fe5c16aa2efe463c08c4464e64a3193))

##### New Features

* migrate utils to axios ([6a4ea87d](https://github.com/wopian/kitsu/commit/6a4ea87d6f2c86850810b1e75e9977e8983ee388))
* migrate whoAmI to axios ([e741b0fc](https://github.com/wopian/kitsu/commit/e741b0fc5532f303de45f033b9953af4298135ae))
* migrate update to axios ([581805b5](https://github.com/wopian/kitsu/commit/581805b5674c64b777569c2f6ebbf4a98bbea8b8))
* migrate remove to axios ([3eb7d335](https://github.com/wopian/kitsu/commit/3eb7d3354bea91eb01e89c4fd7e56656d62a2439))
* migrate fetch to axios ([6f255f84](https://github.com/wopian/kitsu/commit/6f255f84b1916ac7a388ec88af50159df39fc61a))
* migrate create to axios ([dbaacfae](https://github.com/wopian/kitsu/commit/dbaacfae5d0003b6fe0e8ae83afaf4f739841e52))
* switch to axios ([3cd7e5f8](https://github.com/wopian/kitsu/commit/3cd7e5f84942f3adae80fd7c7a1b0e14a49e7539))

##### Bug Fixes

* fix changing headers ([bdab1937](https://github.com/wopian/kitsu/commit/bdab1937471fc01242712bd720ac7f1648956671))

#### 2.0.4 (2017-08-10)

##### Chores

* update yarn.lock ([c7bfbc79](https://github.com/wopian/kitsu/commit/c7bfbc79d50c1adfa410ec3d06f379b28cce6a98))

##### Documentation Changes

* fix compliant typo ([95dbdd18](https://github.com/wopian/kitsu/commit/95dbdd189a4bae51cc16a2f19a343e908960e629))

#### 2.0.3 (2017-07-23)

##### Build System / Dependencies

* codeclimate ignore spec files ([eacdfea5](https://github.com/wopian/kitsu/commit/eacdfea546f4bab653fd51b7f68cd48321136609))

##### Documentation Changes

* fix link to repo LICENSE ([dccdb9ea](https://github.com/wopian/kitsu/commit/dccdb9eae252711dd25395cb299c9586f15e6da4))
* add resource relationship example ([794bf978](https://github.com/wopian/kitsu/commit/794bf97898ef9fb3421e4a028b1189119c23262e))
* update apiUrl override example ([8ce83d27](https://github.com/wopian/kitsu/commit/8ce83d27e14b5b41d286ef50b751dae4238dc252))

##### Bug Fixes

* bind methods outside of constructor (fixes aliases) ([9d3f74fd](https://github.com/wopian/kitsu/commit/9d3f74fd84a7f4296577b8d7c0bc08c8f751063b))

#### 2.0.2 (2017-07-19)

##### Build System / Dependencies

* codeclimate ignore spec files ([eacdfea5](https://github.com/wopian/kitsu/commit/eacdfea546f4bab653fd51b7f68cd48321136609))

##### Bug Fixes

* bind methods outside of constructor (fixes aliases) ([ed319d9c](https://github.com/wopian/kitsu/commit/ed319d9c692d15a94cdec7b4859c387c8a35e205))

#### 2.0.1 (2017-07-18)

##### Documentation Changes

* update package description ([61968965](https://github.com/wopian/kitsu/commit/619689659c3a1065884dd5df19338694063aeb31))

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
