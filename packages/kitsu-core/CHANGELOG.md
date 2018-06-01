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

