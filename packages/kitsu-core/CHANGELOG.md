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

