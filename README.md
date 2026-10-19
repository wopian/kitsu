<h1 align=center>Kitsu</h1>

<p align="center">
  <a href="https://github.com/wopian/kitsu/actions"><img alt="GitHub checks" src="https://flat.badgen.net/github/checks/wopian/kitsu/master"></a>
  <a href="https://github.com/wopian/kitsu/blob/master/LICENSE.md"><img alt="MIT license" src="https://flat.badgen.net/github/license/wopian/kitsu"></a>
  <a href="https://github.com/wopian/kitsu/network/dependents"><img alt="Dependent repositories" src="https://flat.badgen.net/github/dependents-repo/wopian/kitsu"></a>
  <a href="https://github.com/wopian/kitsu/graphs/contributors"><img alt="Contributors" src="https://flat.badgen.net/github/contributors/wopian/kitsu"></a>
  <a href="https://github.com/sponsors/wopian"><img alt="Sponsor this project" src="https://flat.badgen.net/static/sponsor/%E2%9D%A4/pink?icon=github"></a>
</p>

<p align="center">
  <a href="https://jsonapi.org/format/1.1/"><img alt="JSON:API 1.1 client support" src="https://flat.badgen.net/static/JSON%3AAPI/1.1/blue"></a>
  <a href="package.json"><img alt="Node.js 22, 24, and 26 or newer" src="https://flat.badgen.net/static/node/22%20%7C%2024%20%7C%2026%2B/green"></a>
  <a href=".github/workflows/ci.yml"><img alt="Tested with Bun" src="https://flat.badgen.net/static/Bun/tested/blue?icon=bun"></a>
  <a href="packages/kitsu-core/src/types.ts"><img alt="TypeScript declarations included" src="https://flat.badgen.net/static/types/included/blue?icon=typescript"></a>
  <a href="package.json"><img alt="ECMAScript modules" src="https://flat.badgen.net/static/module/ESM/blue"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/kitsu-core"><img alt="kitsu-core on npm" src="https://flat.badgen.net/npm/v/kitsu-core?label=kitsu-core"></a>
  <a href="https://www.npmjs.com/package/kitsu-core"><img alt="kitsu-core monthly downloads" src="https://flat.badgen.net/npm/dm/kitsu-core"></a>
  <a href="https://bundlejs.com/?q=kitsu-core"><img alt="Published kitsu-core minified and gzipped bundle size" src="https://flat.badgen.net/bundlejs/minzip/kitsu-core?label=gzip%20size"></a>
  <a href="packages/kitsu-core/package.json"><img alt="kitsu-core has no runtime dependencies" src="https://flat.badgen.net/static/dependencies/0/green"></a>

<p align="center">
  <a href="https://www.npmjs.com/package/kitsu-native"><img alt="kitsu-native on npm" src="https://flat.badgen.net/npm/v/kitsu-native?label=kitsu-native"></a>
  <a href="https://www.npmjs.com/package/kitsu-native"><img alt="kitsu-native monthly downloads" src="https://flat.badgen.net/npm/dm/kitsu-native"></a>
  <a href="https://packagephobia.com/result?p=kitsu-native"><img alt="Published kitsu-native installed size including dependencies" src="https://flat.badgen.net/packagephobia/install/kitsu-native"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/kitsu"><img alt="kitsu on npm" src="https://flat.badgen.net/npm/v/kitsu?label=kitsu"></a>
  <a href="https://www.npmjs.com/package/kitsu"><img alt="kitsu monthly downloads" src="https://flat.badgen.net/npm/dm/kitsu"></a>
  <a href="https://packagephobia.com/result?p=kitsu"><img alt="Published kitsu installed size including dependencies" src="https://flat.badgen.net/packagephobia/install/kitsu"></a>
</p>

</p>

<p align=center>A simple, lightweight & framework agnostic <a href=http://jsonapi.org>JSON:API</a> client for <a href=https://kitsu.app>kitsu.app</a> & other APIs</p>

#

This is a monorepo containing the following packages:

- [kitsu]—Framework agnostic client using Axios
- [kitsu-native]—JSON:API client using native fetch, with kitsu resource methods and aliases.
- [kitsu-core]—Framework agnostic (de)serialisation components. Works with all HTTP libraries.

## Features

- **Fast JSON:API decoding for JavaScript and TypeScript**: [kitsu-core] is fastest in **15 of 28** measured Node.js/Bun decode scenarios. [See benchmarks](#benchmarks).
- **Fastest JSON:API client in most shared benchmarks**: [kitsu-native] leads **44 of 60** Node.js/Bun client scenarios, including **all 16 shared write cases**. [See benchmarks](#benchmarks).
- JSON:API 1.1 client support
- Automatically links relationships to data
- Works in Node & browsers

Node support: 22, 24 and 26 or newer.

<!-- benchmark:start -->
## Benchmarks

JSON:API codec and mocked client operations/s. Higher is faster. No network traffic.

Median of five samples after warmup. Codec timings exclude JSON text parsing/stringification. Client timings include native client conversion and mocked transport overhead.

One operation is one decode, one encode, or one complete decode-encode round trip. Client operations include all transport requests, including any automatic GET after HTTP 204 PATCH. Extra requests do not increase the reported rate.

Each scenario has its own table. Bold rows mark the fastest library per runtime, suite, mode, and scenario, including ties. Multipliers compare codecs with kitsu-core and clients with kitsu-native (1x). A 3x slower library runs at one third the reference rate. Missing reference scores show —.

Reproduce: `bun run build && bun run benchmark`. Quick check: `bun run benchmark:smoke`.

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/39326958927)

### bun 1\.4\.3

Measured commit: `613e355c4eef4ab9052f508057ad35c025f7fd2d`. Runner: linux x64, Intel\(R\) Xeon\(R\) 6973P-C.

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,876,597 | 1x |  |
| **devour** | **2,725,711** | **1.45x faster** |  |
| yayson | 1,148,332 | 1.63x slower |  |
| jsona | 1,945,811 | 1.04x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,438,569 | 1x |  |
| devour | 1,545,252 | 1.07x faster |  |
| yayson | 861,832 | 1.67x slower |  |
| **jsona** | **1,776,225** | **1.23x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **546,695** | **1x** |  |
| devour | 479,208 | 1.14x slower |  |
| yayson | 323,114 | 1.69x slower |  |
| jsona | 501,344 | 1.09x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **707,178** | **1x** |  |
| devour | 489,293 | 1.45x slower |  |
| yayson | 436,419 | 1.62x slower |  |
| jsona | 543,779 | 1.3x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 111,739 | 1x |  |
| devour | 145,297 | 1.3x faster |  |
| yayson | 113,282 | 1.01x faster |  |
| **jsona** | **349,567** | **3.13x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 79,958 | 1x |  |
| devour | 205,950 | 2.58x faster |  |
| yayson | 160,897 | 2.01x faster |  |
| **jsona** | **227,366** | **2.84x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **3,451,228** | **1x** |  |
| devour | 3,009,081 | 1.15x slower |  |
| yayson | 1,356,413 | 2.54x slower |  |
| jsona | 2,095,502 | 1.65x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,435,610 | 1x |  |
| devour | 1,180,409 | 1.22x slower |  |
| yayson | 888,409 | 1.62x slower |  |
| **jsona** | **1,520,797** | **1.06x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,189** | **1x** |  |
| devour | 655 | 1.81x slower |  |
| yayson | 773 | 1.54x slower |  |
| jsona | 649 | 1.83x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **571** | **1x** |  |
| devour | 12.79 | 44.59x slower |  |
| yayson | 57.74 | 9.88x slower |  |
| jsona | 241 | 2.37x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **84.42** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.69 | 123x slower |  |
| jsona | 32.73 | 2.58x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **567** | **1x** |  |
| devour | 7.28 | 77.89x slower |  |
| yayson | 33.37 | 17x slower |  |
| jsona | 225 | 2.52x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **655,515** | **1x** |  |
| devour | 464,464 | 1.41x slower |  |
| yayson | 379,418 | 1.73x slower |  |
| jsona | 466,956 | 1.4x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **540,599** | **1x** |  |
| devour | 382,194 | 1.41x slower |  |
| yayson | 282,046 | 1.92x slower |  |
| jsona | 390,116 | 1.39x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,994,049 | 1x |  |
| **devour** | **5,730,633** | **1.91x faster** |  |
| yayson | 2,710,172 | 1.1x slower |  |
| jsona | 3,107,201 | 1.04x faster |  |
| ts-japi | 1,252,408 | 2.39x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,933,731 | 1x |  |
| devour | 2,900,037 | 1.01x slower |  |
| yayson | 2,167,843 | 1.35x slower |  |
| **jsona** | **3,273,415** | **1.12x faster** |  |
| ts-japi | 1,178,683 | 2.49x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,663,479 | 1x |  |
| **devour** | **2,142,071** | **1.29x faster** |  |
| yayson | 1,354,381 | 1.23x slower |  |
| jsona | 1,502,338 | 1.11x slower |  |
| ts-japi | 593,207 | 2.8x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **3,084,597** | **1x** |  |
| devour | 2,165,228 | 1.42x slower |  |
| yayson | 1,406,223 | 2.19x slower |  |
| jsona | 1,581,722 | 1.95x slower |  |
| ts-japi | 622,771 | 4.95x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 208,327 | 1x |  |
| devour | 226,623 | 1.09x faster |  |
| yayson | 332,056 | 1.59x faster |  |
| **jsona** | **806,468** | **3.87x faster** |  |
| ts-japi | 441,848 | 2.12x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 94,762 | 1x |  |
| devour | 420,964 | 4.44x faster |  |
| **yayson** | **423,724** | **4.47x faster** |  |
| jsona | 410,623 | 4.33x faster |  |
| ts-japi | 279,501 | 2.95x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **8,375,645** | **1x** |  |
| devour | 8,041,979 | 1.04x slower |  |
| yayson | 3,135,363 | 2.67x slower |  |
| jsona | 3,511,719 | 2.39x slower |  |
| ts-japi | 1,271,415 | 6.59x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,034,129 | 1x |  |
| **devour** | **2,200,246** | **1.08x faster** |  |
| yayson | 1,483,690 | 1.37x slower |  |
| jsona | 1,926,792 | 1.06x slower |  |
| ts-japi | 650,787 | 3.13x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,291 | 1x |  |
| **devour** | **2,228** | **1.72x faster** |  |
| yayson | 1,419 | 1.1x faster |  |
| jsona | 1,258 | 1.03x slower |  |
| ts-japi | 745 | 1.73x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,388 | 1x |  |
| **devour** | **2,013** | **1.45x faster** |  |
| yayson | 1,516 | 1.09x faster |  |
| jsona | 1,374 | 1.01x slower |  |
| ts-japi | 774 | 1.79x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 692 | 1x |  |
| **devour** | **1,186** | **1.71x faster** |  |
| yayson | 1,105 | 1.6x faster |  |
| jsona | 683 | 1.01x slower |  |
| ts-japi | 457 | 1.51x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 5,052 | 1x |  |
| devour | 14,083 | 2.79x faster |  |
| **yayson** | **21,502** | **4.26x faster** |  |
| jsona | 5,654 | 1.12x faster |  |
| ts-japi | 7,501 | 1.48x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **3,498,466** | **1x** |  |
| devour | 2,418,401 | 1.45x slower |  |
| yayson | 1,223,197 | 2.86x slower |  |
| jsona | 1,576,373 | 2.22x slower |  |
| ts-japi | 630,289 | 5.55x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **3,716,879** | **1x** |  |
| devour | 2,493,606 | 1.49x slower |  |
| yayson | 1,529,429 | 2.43x slower |  |
| jsona | 1,591,424 | 2.34x slower |  |
| ts-japi | 625,855 | 5.94x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 957,486 | 1x |  |
| **devour** | **1,358,409** | **1.42x faster** |  |
| yayson | 782,888 | 1.22x slower |  |
| jsona | 1,078,901 | 1.13x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 751,508 | 1x |  |
| devour | 742,349 | 1.01x slower |  |
| yayson | 567,809 | 1.32x slower |  |
| **jsona** | **928,106** | **1.23x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **317,982** | **1x** |  |
| devour | 292,335 | 1.09x slower |  |
| yayson | 235,421 | 1.35x slower |  |
| jsona | 299,680 | 1.06x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 374,867 | 1x |  |
| **devour** | **388,892** | **1.04x faster** |  |
| yayson | 290,187 | 1.29x slower |  |
| jsona | 341,975 | 1.1x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 60,862 | 1x |  |
| devour | 79,381 | 1.3x faster |  |
| yayson | 73,393 | 1.21x faster |  |
| **jsona** | **181,523** | **2.98x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 41,328 | 1x |  |
| devour | 114,432 | 2.77x faster |  |
| yayson | 104,674 | 2.53x faster |  |
| **jsona** | **120,839** | **2.92x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,523,509** | **1x** |  |
| devour | 1,404,781 | 1.08x slower |  |
| yayson | 834,401 | 1.83x slower |  |
| jsona | 1,053,373 | 1.45x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 587,466 | 1x |  |
| devour | 566,911 | 1.04x slower |  |
| yayson | 472,016 | 1.24x slower |  |
| **jsona** | **595,965** | **1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **484** | **1x** |  |
| devour | 419 | 1.15x slower |  |
| yayson | 306 | 1.58x slower |  |
| jsona | 369 | 1.31x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **359** | **1x** |  |
| devour | 12.75 | 28.15x slower |  |
| yayson | 55.11 | 6.51x slower |  |
| jsona | 169 | 2.12x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **71.78** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.64 | 112x slower |  |
| jsona | 27.41 | 2.62x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **516** | **1x** |  |
| devour | 8.37 | 61.69x slower |  |
| yayson | 33.65 | 15.35x slower |  |
| jsona | 192 | 2.69x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **402,072** | **1x** |  |
| devour | 344,837 | 1.17x slower |  |
| yayson | 258,470 | 1.56x slower |  |
| jsona | 298,665 | 1.35x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **331,834** | **1x** |  |
| devour | 293,146 | 1.13x slower |  |
| yayson | 226,405 | 1.47x slower |  |
| jsona | 252,980 | 1.31x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 350,906 | 1x | 1 request/operation |
| kitsu | 96,850 | 3.62x slower | 1 request/operation |
| fetchja | 377,491 | 1.08x faster | 1 request/operation |
| devour | 89,253 | 3.93x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **381,510** | **1.09x faster** | **1 request/operation** |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 331,987 | 1x | 1 request/operation |
| kitsu | 81,021 | 4.1x slower | 1 request/operation |
| **fetchja** | **345,939** | **1.04x faster** | **1 request/operation** |
| devour | 79,942 | 4.15x slower | 1 request/operation |
| @bjornharrtell/json-api | 331,340 | <1.01x slower | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **209,803** | **1x** | **1 request/operation** |
| kitsu | 81,158 | 2.59x slower | 1 request/operation |
| fetchja | 169,114 | 1.24x slower | 1 request/operation |
| devour | 71,237 | 2.95x slower | 1 request/operation |
| @bjornharrtell/json-api | 204,227 | 1.03x slower | 1 request/operation |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **243,914** | **1x** | **1 request/operation** |
| kitsu | 85,554 | 2.85x slower | 1 request/operation |
| fetchja | 214,825 | 1.14x slower | 1 request/operation |
| devour | 75,205 | 3.24x slower | 1 request/operation |
| @bjornharrtell/json-api | 230,576 | 1.06x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 32,852 | 1x | 1 request/operation |
| kitsu | 29,628 | 1.11x slower | 1 request/operation |
| fetchja | 56,389 | 1.72x faster | 1 request/operation |
| devour | 32,953 | <1.01x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **59,993** | **1.83x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 32,352 | 1x | 1 request/operation |
| kitsu | 28,923 | 1.12x slower | 1 request/operation |
| fetchja | 58,116 | 1.8x faster | 1 request/operation |
| devour | 37,099 | 1.15x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **63,549** | **1.96x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **411,889** | **1x** | **1 request/operation** |
| kitsu | 89,360 | 4.61x slower | 1 request/operation |
| fetchja | 388,827 | 1.06x slower | 1 request/operation |
| devour | 80,566 | 5.11x slower | 1 request/operation |
| @bjornharrtell/json-api | 408,220 | 1.01x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 292,918 | 1x | 1 request/operation |
| kitsu | 93,987 | 3.12x slower | 1 request/operation |
| **fetchja** | **332,853** | **1.14x faster** | **1 request/operation** |
| devour | 85,275 | 3.43x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **746** | **1x** | **1 request/operation** |
| kitsu | 716 | 1.04x slower | 1 request/operation |
| fetchja | 611 | 1.22x slower | 1 request/operation |
| devour | 492 | 1.52x slower | 1 request/operation |
| @bjornharrtell/json-api | 641 | 1.16x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **298** | **1x** | **1 request/operation** |
| kitsu | 298 | <1.01x slower | 1 request/operation |
| fetchja | 231 | 1.29x slower | 1 request/operation |
| devour | 16.22 | 18.36x slower | 1 request/operation |
| @bjornharrtell/json-api | 251 | 1.19x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 36.41 | 1x | 1 request/operation |
| **kitsu** | **39.27** | **1.08x faster** | **1 request/operation** |
| fetchja | 33.63 | 1.08x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 33.01 | 1.1x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 303 | 1x | 1 request/operation |
| **kitsu** | **313** | **1.03x faster** | **1 request/operation** |
| fetchja | 208 | 1.46x slower | 1 request/operation |
| devour | 8.45 | 35.86x slower | 1 request/operation |
| @bjornharrtell/json-api | 229 | 1.32x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **225,106** | **1x** | **1 request/operation** |
| kitsu | 74,118 | 3.04x slower | 1 request/operation |
| fetchja | 200,986 | 1.12x slower | 1 request/operation |
| devour | 72,272 | 3.11x slower | 1 request/operation |
| @bjornharrtell/json-api | 206,187 | 1.09x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **206,888** | **1x** | **1 request/operation** |
| kitsu | 69,144 | 2.99x slower | 1 request/operation |
| fetchja | 178,272 | 1.16x slower | 1 request/operation |
| devour | 68,431 | 3.02x slower | 1 request/operation |
| @bjornharrtell/json-api | 182,387 | 1.13x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **469,793** | **1x** | **1 request/operation** |
| kitsu | 83,101 | 5.65x slower | 1 request/operation |
| fetchja | 427,946 | 1.1x slower | 1 request/operation |
| devour | 70,443 | 6.67x slower | 1 request/operation |
| @bjornharrtell/json-api | 189,438 | 2.48x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **443,874** | **1x** | **1 request/operation** |
| kitsu | 71,027 | 6.25x slower | 1 request/operation |
| fetchja | 427,510 | 1.04x slower | 1 request/operation |
| devour | 80,512 | 5.51x slower | 1 request/operation |
| @bjornharrtell/json-api | 176,864 | 2.51x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **346,650** | **1x** | **1 request/operation** |
| kitsu | 63,651 | 5.45x slower | 1 request/operation |
| fetchja | 309,544 | 1.12x slower | 1 request/operation |
| devour | 70,521 | 4.92x slower | 1 request/operation |
| @bjornharrtell/json-api | 129,227 | 2.68x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **444,557** | **1x** | **1 request/operation** |
| kitsu | 87,179 | 5.1x slower | 1 request/operation |
| fetchja | 341,057 | 1.3x slower | 1 request/operation |
| devour | 76,586 | 5.8x slower | 1 request/operation |
| @bjornharrtell/json-api | 147,165 | 3.02x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **58,900** | **1x** | **1 request/operation** |
| kitsu | 33,541 | 1.76x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **30,557** | **1x** | **1 request/operation** |
| kitsu | 20,783 | 1.47x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **558,814** | **1x** | **1 request/operation** |
| kitsu | 95,438 | 5.86x slower | 1 request/operation |
| fetchja | 492,961 | 1.13x slower | 1 request/operation |
| devour | 79,213 | 7.05x slower | 1 request/operation |
| @bjornharrtell/json-api | 201,550 | 2.77x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 345,015 | 1x | 1 request/operation |
| kitsu | 75,837 | 4.55x slower | 1 request/operation |
| **fetchja** | **372,076** | **1.08x faster** | **1 request/operation** |
| devour | 74,209 | 4.65x slower | 1 request/operation |
| @bjornharrtell/json-api | 147,210 | 2.34x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **668** | **1x** | **1 request/operation** |
| kitsu | 634 | 1.05x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **586** | **1x** | **1 request/operation** |
| kitsu | 544 | 1.08x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **176** | **1x** | **1 request/operation** |
| kitsu | 169 | 1.04x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **1,167** | **1x** | **1 request/operation** |
| kitsu | 1,162 | <1.01x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **459,669** | **1x** | **1 request/operation** |
| kitsu | 69,458 | 6.62x slower | 1 request/operation |
| fetchja | 386,525 | 1.19x slower | 1 request/operation |
| devour | 75,418 | 6.09x slower | 1 request/operation |
| @bjornharrtell/json-api | 123,434 | 3.72x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **426,328** | **1x** | **1 request/operation** |
| kitsu | 70,468 | 6.05x slower | 1 request/operation |
| fetchja | 376,040 | 1.13x slower | 1 request/operation |
| devour | 74,469 | 5.72x slower | 1 request/operation |
| @bjornharrtell/json-api | 113,017 | 3.77x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **196,963** | **1x** | **2 requests/operation** |
| kitsu | 43,292 | 4.55x slower | 2 requests/operation |
| fetchja | 192,575 | 1.02x slower | 2 requests/operation |
| devour | 35,206 | 5.59x slower | 2 requests/operation |
| @bjornharrtell/json-api | 123,001 | 1.6x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 175,282 | 1x | 2 requests/operation |
| kitsu | 39,311 | 4.46x slower | 2 requests/operation |
| **fetchja** | **178,552** | **1.02x faster** | **2 requests/operation** |
| devour | 39,679 | 4.42x slower | 2 requests/operation |
| @bjornharrtell/json-api | 115,338 | 1.52x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **116,849** | **1x** | **2 requests/operation** |
| kitsu | 30,367 | 3.85x slower | 2 requests/operation |
| fetchja | 109,771 | 1.06x slower | 2 requests/operation |
| devour | 33,336 | 3.51x slower | 2 requests/operation |
| @bjornharrtell/json-api | 74,244 | 1.57x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **141,883** | **1x** | **2 requests/operation** |
| kitsu | 38,362 | 3.7x slower | 2 requests/operation |
| fetchja | 107,446 | 1.32x slower | 2 requests/operation |
| devour | 35,935 | 3.95x slower | 2 requests/operation |
| @bjornharrtell/json-api | 82,781 | 1.71x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **19,767** | **1x** | **2 requests/operation** |
| kitsu | 14,928 | 1.32x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **15,146** | **1x** | **2 requests/operation** |
| kitsu | 11,865 | 1.28x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **231,843** | **1x** | **2 requests/operation** |
| kitsu | 46,070 | 5.03x slower | 2 requests/operation |
| fetchja | 203,264 | 1.14x slower | 2 requests/operation |
| devour | 38,105 | 6.08x slower | 2 requests/operation |
| @bjornharrtell/json-api | 130,291 | 1.78x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 157,326 | 1x | 2 requests/operation |
| kitsu | 38,346 | 4.1x slower | 2 requests/operation |
| **fetchja** | **157,521** | **<1.01x faster** | **2 requests/operation** |
| devour | 33,736 | 4.66x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 287 | 1x | 2 requests/operation |
| **kitsu** | **299** | **1.04x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **179** | **1x** | **2 requests/operation** |
| kitsu | 158 | 1.13x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **32.42** | **1x** | **2 requests/operation** |
| kitsu | 31.9 | 1.02x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 208 | 1x | 2 requests/operation |
| **kitsu** | **241** | **1.16x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **134,239** | **1x** | **2 requests/operation** |
| kitsu | 38,060 | 3.53x slower | 2 requests/operation |
| fetchja | 119,475 | 1.12x slower | 2 requests/operation |
| devour | 34,735 | 3.86x slower | 2 requests/operation |
| @bjornharrtell/json-api | 70,686 | 1.9x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **128,870** | **1x** | **2 requests/operation** |
| kitsu | 33,913 | 3.8x slower | 2 requests/operation |
| fetchja | 109,219 | 1.18x slower | 2 requests/operation |
| devour | 34,226 | 3.77x slower | 2 requests/operation |
| @bjornharrtell/json-api | 63,156 | 2.04x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

</details>

### node v26\.12\.0

Measured commit: `613e355c4eef4ab9052f508057ad35c025f7fd2d`. Runner: linux x64, AMD EPYC 7763 64-Core Processor.

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 964,314 | 1x |  |
| **devour** | **1,269,568** | **1.32x faster** |  |
| yayson | 590,599 | 1.63x slower |  |
| jsona | 1,179,793 | 1.22x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 777,627 | 1x |  |
| devour | 649,718 | 1.2x slower |  |
| yayson | 429,457 | 1.81x slower |  |
| **jsona** | **1,103,621** | **1.42x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 239,813 | 1x |  |
| devour | 186,407 | 1.29x slower |  |
| yayson | 135,519 | 1.77x slower |  |
| **jsona** | **267,550** | **1.12x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 301,029 | 1x |  |
| devour | 214,454 | 1.4x slower |  |
| yayson | 169,094 | 1.78x slower |  |
| **jsona** | **304,785** | **1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 68,662 | 1x |  |
| devour | 54,581 | 1.26x slower |  |
| yayson | 81,833 | 1.19x faster |  |
| **jsona** | **216,412** | **3.15x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 44,207 | 1x |  |
| devour | 64,572 | 1.46x faster |  |
| yayson | 69,704 | 1.58x faster |  |
| **jsona** | **89,999** | **2.04x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,650,940** | **1x** |  |
| devour | 1,574,786 | 1.05x slower |  |
| yayson | 598,482 | 2.76x slower |  |
| jsona | 1,510,457 | 1.09x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 758,814 | 1x |  |
| devour | 441,868 | 1.72x slower |  |
| yayson | 463,494 | 1.64x slower |  |
| **jsona** | **939,680** | **1.24x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **498** | **1x** |  |
| devour | 319 | 1.56x slower |  |
| yayson | 328 | 1.52x slower |  |
| jsona | 428 | 1.16x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **211** | **1x** |  |
| devour | 2.58 | 81.62x slower |  |
| yayson | 13.49 | 15.62x slower |  |
| jsona | 118 | 1.78x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **24.87** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.36 | 68.35x slower |  |
| jsona | 15.21 | 1.63x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **179** | **1x** |  |
| devour | 2.05 | 87.44x slower |  |
| yayson | 7.5 | 23.86x slower |  |
| jsona | 111 | 1.61x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **260,532** | **1x** |  |
| devour | 179,997 | 1.45x slower |  |
| yayson | 151,681 | 1.72x slower |  |
| jsona | 244,075 | 1.07x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **212,415** | **1x** |  |
| devour | 135,970 | 1.56x slower |  |
| yayson | 116,427 | 1.82x slower |  |
| jsona | 197,859 | 1.07x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,204,981 | 1x |  |
| devour | 2,053,958 | 1.7x faster |  |
| yayson | 1,140,292 | 1.06x slower |  |
| **jsona** | **2,300,471** | **1.91x faster** |  |
| ts-japi | 473,005 | 2.55x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,261,604 | 1x |  |
| devour | 1,059,636 | 1.19x slower |  |
| yayson | 942,809 | 1.34x slower |  |
| **jsona** | **2,294,272** | **1.82x faster** |  |
| ts-japi | 472,610 | 2.67x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 624,531 | 1x |  |
| devour | 682,749 | 1.09x faster |  |
| yayson | 545,368 | 1.15x slower |  |
| **jsona** | **1,204,326** | **1.93x faster** |  |
| ts-japi | 276,030 | 2.26x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,057,381 | 1x |  |
| devour | 826,090 | 1.28x slower |  |
| yayson | 620,464 | 1.7x slower |  |
| **jsona** | **1,330,456** | **1.26x faster** |  |
| ts-japi | 329,731 | 3.21x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 130,197 | 1x |  |
| devour | 64,001 | 2.03x slower |  |
| yayson | 155,034 | 1.19x faster |  |
| **jsona** | **567,244** | **4.36x faster** |  |
| ts-japi | 169,660 | 1.3x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 50,193 | 1x |  |
| devour | 125,591 | 2.5x faster |  |
| yayson | 164,280 | 3.27x faster |  |
| **jsona** | **251,488** | **5.01x faster** |  |
| ts-japi | 101,410 | 2.02x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 3,031,986 | 1x |  |
| **devour** | **4,345,875** | **1.43x faster** |  |
| yayson | 1,534,793 | 1.98x slower |  |
| jsona | 3,373,322 | 1.11x faster |  |
| ts-japi | 520,903 | 5.82x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 926,115 | 1x |  |
| devour | 687,211 | 1.35x slower |  |
| yayson | 624,211 | 1.48x slower |  |
| **jsona** | **1,344,090** | **1.45x faster** |  |
| ts-japi | 339,550 | 2.73x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 603 | 1x |  |
| devour | 810 | 1.34x faster |  |
| yayson | 577 | 1.04x slower |  |
| **jsona** | **1,270** | **2.11x faster** |  |
| ts-japi | 308 | 1.96x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 489 | 1x |  |
| devour | 634 | 1.3x faster |  |
| yayson | 497 | 1.02x faster |  |
| **jsona** | **1,134** | **2.32x faster** |  |
| ts-japi | 200 | 2.44x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 210 | 1x |  |
| devour | 375 | 1.78x faster |  |
| yayson | 254 | 1.21x faster |  |
| **jsona** | **396** | **1.88x faster** |  |
| ts-japi | 212 | 1.01x faster |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,640 | 1x |  |
| devour | 4,770 | 2.91x faster |  |
| **yayson** | **8,921** | **5.44x faster** |  |
| jsona | 6,202 | 3.78x faster |  |
| ts-japi | 7,090 | 4.32x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,048,286 | 1x |  |
| devour | 794,074 | 1.32x slower |  |
| yayson | 645,075 | 1.63x slower |  |
| **jsona** | **1,370,462** | **1.31x faster** |  |
| ts-japi | 338,795 | 3.09x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,081,601 | 1x |  |
| devour | 805,904 | 1.34x slower |  |
| yayson | 596,109 | 1.81x slower |  |
| **jsona** | **1,475,196** | **1.36x faster** |  |
| ts-japi | 324,205 | 3.34x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 503,353 | 1x |  |
| **devour** | **685,672** | **1.36x faster** |  |
| yayson | 336,638 | 1.5x slower |  |
| jsona | 656,777 | 1.3x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 435,738 | 1x |  |
| devour | 370,036 | 1.18x slower |  |
| yayson | 278,726 | 1.56x slower |  |
| **jsona** | **647,531** | **1.49x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 159,999 | 1x |  |
| devour | 127,900 | 1.25x slower |  |
| yayson | 91,479 | 1.75x slower |  |
| **jsona** | **185,571** | **1.16x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 215,899 | 1x |  |
| devour | 153,027 | 1.41x slower |  |
| yayson | 115,220 | 1.87x slower |  |
| **jsona** | **220,740** | **1.02x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 39,855 | 1x |  |
| devour | 27,448 | 1.45x slower |  |
| yayson | 51,840 | 1.3x faster |  |
| **jsona** | **111,370** | **2.79x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 20,491 | 1x |  |
| devour | 37,076 | 1.81x faster |  |
| yayson | 41,764 | 2.04x faster |  |
| **jsona** | **52,236** | **2.55x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,001,794 | 1x |  |
| **devour** | **1,028,572** | **1.03x faster** |  |
| yayson | 405,681 | 2.47x slower |  |
| jsona | 890,449 | 1.13x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 352,605 | 1x |  |
| devour | 246,238 | 1.43x slower |  |
| yayson | 221,888 | 1.59x slower |  |
| **jsona** | **455,807** | **1.29x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 220 | 1x |  |
| devour | 190 | 1.16x slower |  |
| yayson | 179 | 1.23x slower |  |
| **jsona** | **225** | **1.02x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **134** | **1x** |  |
| devour | 2.28 | 58.97x slower |  |
| yayson | 11.6 | 11.59x slower |  |
| jsona | 86.61 | 1.55x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **20.59** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.37 | 56.17x slower |  |
| jsona | 13.81 | 1.49x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **176** | **1x** |  |
| devour | 2 | 88.21x slower |  |
| yayson | 7.71 | 22.87x slower |  |
| jsona | 102 | 1.73x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **190,248** | **1x** |  |
| devour | 131,494 | 1.45x slower |  |
| yayson | 107,627 | 1.77x slower |  |
| jsona | 187,190 | 1.02x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **170,635** | **1x** |  |
| devour | 108,284 | 1.58x slower |  |
| yayson | 92,544 | 1.84x slower |  |
| jsona | 157,602 | 1.08x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **79,029** | **1x** | **1 request/operation** |
| kitsu | 39,111 | 2.02x slower | 1 request/operation |
| fetchja | 62,246 | 1.27x slower | 1 request/operation |
| devour | 33,529 | 2.36x slower | 1 request/operation |
| @bjornharrtell/json-api | 73,560 | 1.07x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **69,460** | **1x** | **1 request/operation** |
| kitsu | 35,431 | 1.96x slower | 1 request/operation |
| fetchja | 58,618 | 1.18x slower | 1 request/operation |
| devour | 29,110 | 2.39x slower | 1 request/operation |
| @bjornharrtell/json-api | 68,292 | 1.02x slower | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 33,073 | 1x | 1 request/operation |
| kitsu | 25,648 | 1.29x slower | 1 request/operation |
| fetchja | 30,846 | 1.07x slower | 1 request/operation |
| devour | 21,428 | 1.54x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **33,456** | **1.01x faster** | **1 request/operation** |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **41,234** | **1x** | **1 request/operation** |
| kitsu | 28,362 | 1.45x slower | 1 request/operation |
| fetchja | 33,676 | 1.22x slower | 1 request/operation |
| devour | 22,142 | 1.86x slower | 1 request/operation |
| @bjornharrtell/json-api | 39,402 | 1.05x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 11,366 | 1x | 1 request/operation |
| kitsu | 11,435 | 1.01x faster | 1 request/operation |
| fetchja | 12,078 | 1.06x faster | 1 request/operation |
| devour | 10,372 | 1.1x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **13,172** | **1.16x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 10,273 | 1x | 1 request/operation |
| kitsu | 10,554 | 1.03x faster | 1 request/operation |
| fetchja | 10,895 | 1.06x faster | 1 request/operation |
| devour | 10,989 | 1.07x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **12,302** | **1.2x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **100,035** | **1x** | **1 request/operation** |
| kitsu | 41,677 | 2.4x slower | 1 request/operation |
| fetchja | 78,179 | 1.28x slower | 1 request/operation |
| devour | 37,051 | 2.7x slower | 1 request/operation |
| @bjornharrtell/json-api | 90,170 | 1.11x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **70,836** | **1x** | **1 request/operation** |
| kitsu | 35,695 | 1.98x slower | 1 request/operation |
| fetchja | 59,570 | 1.19x slower | 1 request/operation |
| devour | 28,488 | 2.49x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 269 | 1x | 1 request/operation |
| **kitsu** | **278** | **1.03x faster** | **1 request/operation** |
| fetchja | 252 | 1.07x slower | 1 request/operation |
| devour | 182 | 1.48x slower | 1 request/operation |
| @bjornharrtell/json-api | 272 | 1.01x faster | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 112 | 1x | 1 request/operation |
| **kitsu** | **115** | **1.03x faster** | **1 request/operation** |
| fetchja | 94.1 | 1.19x slower | 1 request/operation |
| devour | 4.17 | 26.79x slower | 1 request/operation |
| @bjornharrtell/json-api | 85.92 | 1.3x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 16.82 | 1x | 1 request/operation |
| **kitsu** | **16.97** | **1.01x faster** | **1 request/operation** |
| fetchja | 13.76 | 1.22x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 12.6 | 1.34x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 107 | 1x | 1 request/operation |
| **kitsu** | **116** | **1.08x faster** | **1 request/operation** |
| fetchja | 88.19 | 1.21x slower | 1 request/operation |
| devour | 2.39 | 44.66x slower | 1 request/operation |
| @bjornharrtell/json-api | 90.88 | 1.18x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **35,406** | **1x** | **1 request/operation** |
| kitsu | 27,099 | 1.31x slower | 1 request/operation |
| fetchja | 31,725 | 1.12x slower | 1 request/operation |
| devour | 21,639 | 1.64x slower | 1 request/operation |
| @bjornharrtell/json-api | 34,868 | 1.02x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **31,866** | **1x** | **1 request/operation** |
| kitsu | 25,360 | 1.26x slower | 1 request/operation |
| fetchja | 29,435 | 1.08x slower | 1 request/operation |
| devour | 19,509 | 1.63x slower | 1 request/operation |
| @bjornharrtell/json-api | 29,685 | 1.07x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **176,379** | **1x** | **1 request/operation** |
| kitsu | 32,728 | 5.39x slower | 1 request/operation |
| fetchja | 143,088 | 1.23x slower | 1 request/operation |
| devour | 30,367 | 5.81x slower | 1 request/operation |
| @bjornharrtell/json-api | 22,581 | 7.81x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **161,567** | **1x** | **1 request/operation** |
| kitsu | 31,841 | 5.07x slower | 1 request/operation |
| fetchja | 134,116 | 1.2x slower | 1 request/operation |
| devour | 28,318 | 5.71x slower | 1 request/operation |
| @bjornharrtell/json-api | 21,639 | 7.47x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **102,657** | **1x** | **1 request/operation** |
| kitsu | 25,727 | 3.99x slower | 1 request/operation |
| fetchja | 95,766 | 1.07x slower | 1 request/operation |
| devour | 22,769 | 4.51x slower | 1 request/operation |
| @bjornharrtell/json-api | 15,880 | 6.46x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **146,577** | **1x** | **1 request/operation** |
| kitsu | 29,250 | 5.01x slower | 1 request/operation |
| fetchja | 121,426 | 1.21x slower | 1 request/operation |
| devour | 25,349 | 5.78x slower | 1 request/operation |
| @bjornharrtell/json-api | 17,759 | 8.25x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **25,148** | **1x** | **1 request/operation** |
| kitsu | 14,532 | 1.73x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **13,015** | **1x** | **1 request/operation** |
| kitsu | 9,149 | 1.42x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **247,862** | **1x** | **1 request/operation** |
| kitsu | 38,405 | 6.45x slower | 1 request/operation |
| fetchja | 173,538 | 1.43x slower | 1 request/operation |
| devour | 35,781 | 6.93x slower | 1 request/operation |
| @bjornharrtell/json-api | 25,346 | 9.78x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **145,511** | **1x** | **1 request/operation** |
| kitsu | 29,765 | 4.89x slower | 1 request/operation |
| fetchja | 129,117 | 1.13x slower | 1 request/operation |
| devour | 25,977 | 5.6x slower | 1 request/operation |
| @bjornharrtell/json-api | 20,879 | 6.97x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **232** | **1x** | **1 request/operation** |
| kitsu | 205 | 1.13x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 215 | 1x | 1 request/operation |
| **kitsu** | **232** | **1.08x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 76.59 | 1x | 1 request/operation |
| **kitsu** | **83.22** | **1.09x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **657** | **1x** | **1 request/operation** |
| kitsu | 600 | 1.09x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **146,475** | **1x** | **1 request/operation** |
| kitsu | 28,977 | 5.05x slower | 1 request/operation |
| fetchja | 110,903 | 1.32x slower | 1 request/operation |
| devour | 24,873 | 5.89x slower | 1 request/operation |
| @bjornharrtell/json-api | 17,238 | 8.5x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **147,668** | **1x** | **1 request/operation** |
| kitsu | 29,825 | 4.95x slower | 1 request/operation |
| fetchja | 111,318 | 1.33x slower | 1 request/operation |
| devour | 24,421 | 6.05x slower | 1 request/operation |
| @bjornharrtell/json-api | 16,014 | 9.22x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **49,563** | **1x** | **2 requests/operation** |
| kitsu | 17,390 | 2.85x slower | 2 requests/operation |
| fetchja | 36,829 | 1.35x slower | 2 requests/operation |
| devour | 14,827 | 3.34x slower | 2 requests/operation |
| @bjornharrtell/json-api | 17,254 | 2.87x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **44,303** | **1x** | **2 requests/operation** |
| kitsu | 17,192 | 2.58x slower | 2 requests/operation |
| fetchja | 35,425 | 1.25x slower | 2 requests/operation |
| devour | 13,557 | 3.27x slower | 2 requests/operation |
| @bjornharrtell/json-api | 16,142 | 2.74x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 19,088 | 1x | 2 requests/operation |
| kitsu | 12,362 | 1.54x slower | 2 requests/operation |
| **fetchja** | **21,615** | **1.13x faster** | **2 requests/operation** |
| devour | 10,390 | 1.84x slower | 2 requests/operation |
| @bjornharrtell/json-api | 11,274 | 1.69x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **28,275** | **1x** | **2 requests/operation** |
| kitsu | 13,955 | 2.03x slower | 2 requests/operation |
| fetchja | 25,026 | 1.13x slower | 2 requests/operation |
| devour | 11,196 | 2.53x slower | 2 requests/operation |
| @bjornharrtell/json-api | 12,804 | 2.21x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **7,348** | **1x** | **2 requests/operation** |
| kitsu | 6,140 | 1.2x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **5,358** | **1x** | **2 requests/operation** |
| kitsu | 4,648 | 1.15x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **64,585** | **1x** | **2 requests/operation** |
| kitsu | 19,576 | 3.3x slower | 2 requests/operation |
| fetchja | 49,934 | 1.29x slower | 2 requests/operation |
| devour | 16,515 | 3.91x slower | 2 requests/operation |
| @bjornharrtell/json-api | 19,465 | 3.32x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **35,634** | **1x** | **2 requests/operation** |
| kitsu | 16,051 | 2.22x slower | 2 requests/operation |
| fetchja | 30,916 | 1.15x slower | 2 requests/operation |
| devour | 12,919 | 2.76x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **119** | **1x** | **2 requests/operation** |
| kitsu | 110 | 1.08x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 64.92 | 1x | 2 requests/operation |
| **kitsu** | **70.07** | **1.08x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **13.54** | **1x** | **2 requests/operation** |
| kitsu | 13.31 | 1.02x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **95.14** | **1x** | **2 requests/operation** |
| kitsu | 92.98 | 1.02x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **25,938** | **1x** | **2 requests/operation** |
| kitsu | 13,119 | 1.98x slower | 2 requests/operation |
| fetchja | 23,364 | 1.11x slower | 2 requests/operation |
| devour | 10,864 | 2.39x slower | 2 requests/operation |
| @bjornharrtell/json-api | 11,562 | 2.24x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **24,984** | **1x** | **2 requests/operation** |
| kitsu | 13,172 | 1.9x slower | 2 requests/operation |
| fetchja | 22,990 | 1.09x slower | 2 requests/operation |
| devour | 10,712 | 2.33x slower | 2 requests/operation |
| @bjornharrtell/json-api | 10,661 | 2.34x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

</details>


- Codec APIs: kitsu-core, devour, yayson, jsona, ts-japi (encode only).
- Client APIs: kitsu-native, kitsu, fetchja, devour, @bjornharrtell/json-api. Public single-resource clients report collection writes as unsupported.

Full fixtures use 1,000 primary resources, 3 shared or 3,000 distinct includes, a complex graph with 21,016 includes and one wide relationship with 4,000 identifiers.
<!-- benchmark:end -->

<!-- compliance:start -->
## JSON:API compatibility

Executable capability checks against [JSON:API 1.0](https://jsonapi.org/format/1.0/) and [JSON:API 1.1](https://jsonapi.org/format/1.1/).

✅ = supported and correct on both Node and Bun. ❌ = unsupported, incorrect, error, or missing result on either runtime. These checks cover the listed public API capabilities, not blanket specification certification. Optional capabilities can also show ❌.

Clients use mocked HTTP and their real request/response pipelines. Codecs use their public conversion APIs. Server behavior, application policy, arbitrary extension semantics, and extension/profile request negotiation are outside these checks. Local identifier and metadata checks use the native representations exposed by each adapter.

Reproduce: `bun run build && bun run benchmark:compliance --readme`. Full results and failure reasons: `.cache/compliance/results-node.json`, `results-bun.json`, and `report.md`.

node v26\.5\.0; checked 2026-10-16T18:44:51\.810Z. Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`. Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

bun 1\.4\.3; checked 2026-10-16T18:44:55\.714Z. Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`. Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

### JSON:API 1.0

#### Clients

| Tested behavior | kitsu-native | kitsu | fetchja | devour | @bjornharrtell/json-api |
| --- | ---: | ---: | ---: | ---: | ---: |
| [Read single resource](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read resource collection](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read empty collection](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read null primary data](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ❌ | ✅ | ❌ |
| [Preserve JSON attribute values](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read included relationships](https://jsonapi.org/format/1.0/#document-compound-documents) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read unresolved relationship identifiers](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read null to-one relationship](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read empty to-many relationship](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read document metadata](https://jsonapi.org/format/1.0/#document-meta) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read resource metadata](https://jsonapi.org/format/1.0/#document-meta) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read pagination links](https://jsonapi.org/format/1.0/#fetching-pagination) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Preserve error objects](https://jsonapi.org/format/1.0/#errors) | ✅ | ✅ | ✅ | ❌ | ✅ |
| [Write resource attributes](https://jsonapi.org/format/1.0/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write relationship identifiers](https://jsonapi.org/format/1.0/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write null to-one relationship](https://jsonapi.org/format/1.0/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write empty to-many relationship](https://jsonapi.org/format/1.0/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Send JSON:API Accept header](https://jsonapi.org/format/1.0/#content-negotiation-clients) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Send JSON:API Content-Type header](https://jsonapi.org/format/1.0/#content-negotiation-clients) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Handle HTTP 204 update](https://jsonapi.org/format/1.0/#crud-updating-responses-204) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Reject HTTP error status](https://jsonapi.org/format/1.0/#errors) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Ignore response media parameters](https://jsonapi.org/format/1.0/#content-negotiation-clients) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Ignore unrecognized document members](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |

#### Codecs

| Tested behavior | kitsu-core | devour | yayson | jsona | ts-japi |
| --- | ---: | ---: | ---: | ---: | ---: |
| [Read single resource](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read resource collection](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read empty collection](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read null primary data](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Preserve JSON attribute values](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read included relationships](https://jsonapi.org/format/1.0/#document-compound-documents) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read unresolved relationship identifiers](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read null to-one relationship](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read empty to-many relationship](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read document metadata](https://jsonapi.org/format/1.0/#document-meta) | ✅ | ❌ | ✅ | ❌ | ❌ |
| [Read resource metadata](https://jsonapi.org/format/1.0/#document-meta) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read pagination links](https://jsonapi.org/format/1.0/#fetching-pagination) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Preserve error objects](https://jsonapi.org/format/1.0/#errors) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Write resource attributes](https://jsonapi.org/format/1.0/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write relationship identifiers](https://jsonapi.org/format/1.0/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write null to-one relationship](https://jsonapi.org/format/1.0/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write empty to-many relationship](https://jsonapi.org/format/1.0/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Ignore unrecognized document members](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |

### JSON:API 1.1

#### Clients

| Tested behavior | kitsu-native | kitsu | fetchja | devour | @bjornharrtell/json-api |
| --- | ---: | ---: | ---: | ---: | ---: |
| [Read single resource](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read resource collection](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read empty collection](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read null primary data](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ❌ | ✅ | ❌ |
| [Preserve JSON attribute values](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read included relationships](https://jsonapi.org/format/1.1/#document-compound-documents) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read unresolved relationship identifiers](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read null to-one relationship](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read empty to-many relationship](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read document metadata](https://jsonapi.org/format/1.1/#document-meta) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read resource metadata](https://jsonapi.org/format/1.1/#document-meta) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read pagination links](https://jsonapi.org/format/1.1/#fetching-pagination) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Preserve error objects](https://jsonapi.org/format/1.1/#errors) | ✅ | ✅ | ✅ | ❌ | ✅ |
| [Write resource attributes](https://jsonapi.org/format/1.1/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write relationship identifiers](https://jsonapi.org/format/1.1/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write null to-one relationship](https://jsonapi.org/format/1.1/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write empty to-many relationship](https://jsonapi.org/format/1.1/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Send JSON:API Accept header](https://jsonapi.org/format/1.1/#content-negotiation-clients) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Send JSON:API Content-Type header](https://jsonapi.org/format/1.1/#content-negotiation-clients) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Handle HTTP 204 update](https://jsonapi.org/format/1.1/#crud-updating-responses-204) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Reject HTTP error status](https://jsonapi.org/format/1.1/#errors) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Ignore response media parameters](https://jsonapi.org/format/1.1/#content-negotiation-clients) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read local identifier linkage](https://jsonapi.org/format/1.1/#document-resource-identifier-objects) | ✅ | ✅ | ❌ | ❌ | ❌ |
| [Write local identifier](https://jsonapi.org/format/1.1/#document-resource-identifier-objects) | ✅ | ✅ | ✅ | ❌ | ✅ |
| [Read extension/profile metadata](https://jsonapi.org/format/1.1/#document-jsonapi-object) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read rich link objects](https://jsonapi.org/format/1.1/#document-links) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read error source.header](https://jsonapi.org/format/1.1/#error-objects) | ✅ | ✅ | ✅ | ❌ | ✅ |
| [Ignore unrecognized document members](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ✅ |

#### Codecs

| Tested behavior | kitsu-core | devour | yayson | jsona | ts-japi |
| --- | ---: | ---: | ---: | ---: | ---: |
| [Read single resource](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read resource collection](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read empty collection](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read null primary data](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Preserve JSON attribute values](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read included relationships](https://jsonapi.org/format/1.1/#document-compound-documents) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read unresolved relationship identifiers](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read null to-one relationship](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read empty to-many relationship](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read document metadata](https://jsonapi.org/format/1.1/#document-meta) | ✅ | ❌ | ✅ | ❌ | ❌ |
| [Read resource metadata](https://jsonapi.org/format/1.1/#document-meta) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [Read pagination links](https://jsonapi.org/format/1.1/#fetching-pagination) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Preserve error objects](https://jsonapi.org/format/1.1/#errors) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Write resource attributes](https://jsonapi.org/format/1.1/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write relationship identifiers](https://jsonapi.org/format/1.1/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write null to-one relationship](https://jsonapi.org/format/1.1/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Write empty to-many relationship](https://jsonapi.org/format/1.1/#crud-updating-resource-attributes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Read local identifier linkage](https://jsonapi.org/format/1.1/#document-resource-identifier-objects) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Write local identifier](https://jsonapi.org/format/1.1/#document-resource-identifier-objects) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Read extension/profile metadata](https://jsonapi.org/format/1.1/#document-jsonapi-object) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Read rich link objects](https://jsonapi.org/format/1.1/#document-links) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Read error source.header](https://jsonapi.org/format/1.1/#error-objects) | ✅ | ❌ | ❌ | ❌ | ❌ |
| [Ignore unrecognized document members](https://jsonapi.org/format/1.1/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |

<details><summary>Unsupported or incorrect behavior</summary>

- fetchja / client / 1.0 / Read null primary data (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - null
- fetchja / client / 1.1 / Read null primary data (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - null
- fetchja / client / 1.1 / Read local identifier linkage (node, bun): incorrect; Expected values to be strictly equal:  undefined \!== 'Ada'
- devour / client / 1.0 / Preserve error objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \[ -   \{ -     detail: 'Bad title', -     source: \{ -       pointer: '/data/attributes/title' -     \}, -     status: '400', -     title: 'Invalid input' -   \} - \]
- devour / client / 1.1 / Preserve error objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \[ -   \{ -     detail: 'Bad title', -     source: \{ -       pointer: '/data/attributes/title' -     \}, -     status: '400', -     title: 'Invalid input' -   \} - \]
- devour / client / 1.1 / Read local identifier linkage (node, bun): incorrect; Expected values to be strictly equal:  undefined \!== 'Ada'
- devour / client / 1.1 / Write local identifier (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - 'draft'
- devour / client / 1.1 / Read error source\.header (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - 'Accept'
- devour / codec / 1.0 / Read null primary data (node): error; Cannot read properties of null \(reading 'type'\)
- devour / codec / 1.0 / Read document metadata (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   total: 1 - \}
- devour / codec / 1.0 / Read pagination links (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   next: null, -   self: '/articles/1' - \}
- devour / codec / 1.0 / Preserve error objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \[ -   \{ -     detail: 'Bad title', -     source: \{ -       pointer: '/data/attributes/title' -     \}, -     status: '400', -     title: 'Invalid input' -   \} - \]
- devour / codec / 1.1 / Read null primary data (node): error; Cannot read properties of null \(reading 'type'\)
- devour / codec / 1.1 / Read document metadata (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   total: 1 - \}
- devour / codec / 1.1 / Read pagination links (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   next: null, -   self: '/articles/1' - \}
- devour / codec / 1.1 / Preserve error objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \[ -   \{ -     detail: 'Bad title', -     source: \{ -       pointer: '/data/attributes/title' -     \}, -     status: '400', -     title: 'Invalid input' -   \} - \]
- devour / codec / 1.1 / Read local identifier linkage (node, bun): incorrect; Expected values to be strictly equal:  undefined \!== 'Ada'
- devour / codec / 1.1 / Write local identifier (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - 'draft'
- devour / codec / 1.1 / Read extension/profile metadata (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   ext: \[ -     'https://example\.org/version' -   \], -   profile: \[ -     'https://example\.org/profile' -   \], -   version: '1\.1' - \}
- devour / codec / 1.1 / Read rich link objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   describedby: '/schemas/article', -   href: '/articles/1', -   hreflang: \[ -     'en', -     'ja' -   \], -   rel: 'self', -   title: 'Article', -   type: 'ap
- devour / codec / 1.1 / Read error source\.header (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - 'Accept'
- @bjornharrtell/json-api / client / 1.0 / Read null primary data (node): error; Cannot read properties of null \(reading 'type'\)
- @bjornharrtell/json-api / client / 1.0 / Read unresolved relationship identifiers (node, bun): incorrect; decoded relationship count differs: author
- @bjornharrtell/json-api / client / 1.0 / Read empty to-many relationship (node, bun): incorrect; decoded relationship cardinality differs: comments
- @bjornharrtell/json-api / client / 1.1 / Read null primary data (node): error; Cannot read properties of null \(reading 'type'\)
- @bjornharrtell/json-api / client / 1.1 / Read unresolved relationship identifiers (node, bun): incorrect; decoded relationship count differs: author
- @bjornharrtell/json-api / client / 1.1 / Read empty to-many relationship (node, bun): incorrect; decoded relationship cardinality differs: comments
- @bjornharrtell/json-api / client / 1.1 / Read local identifier linkage (node, bun): error; Resource identifier must have an id
- yayson / codec / 1.0 / Read null primary data (node, bun): incorrect; Expected values to be strictly equal:  \[\] \!== null
- yayson / codec / 1.0 / Read pagination links (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   next: null, -   self: '/articles/1' - \}
- yayson / codec / 1.0 / Preserve error objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \[ -   \{ -     detail: 'Bad title', -     source: \{ -       pointer: '/data/attributes/title' -     \}, -     status: '400', -     title: 'Invalid input' -   \} - \]
- yayson / codec / 1.1 / Read null primary data (node, bun): incorrect; Expected values to be strictly equal:  \[\] \!== null
- yayson / codec / 1.1 / Read pagination links (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   next: null, -   self: '/articles/1' - \}
- yayson / codec / 1.1 / Preserve error objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \[ -   \{ -     detail: 'Bad title', -     source: \{ -       pointer: '/data/attributes/title' -     \}, -     status: '400', -     title: 'Invalid input' -   \} - \]
- yayson / codec / 1.1 / Read local identifier linkage (node): error; Cannot read properties of null \(reading 'name'\)
- yayson / codec / 1.1 / Write local identifier (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - 'draft'
- yayson / codec / 1.1 / Read extension/profile metadata (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   ext: \[ -     'https://example\.org/version' -   \], -   profile: \[ -     'https://example\.org/profile' -   \], -   version: '1\.1' - \}
- yayson / codec / 1.1 / Read rich link objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   describedby: '/schemas/article', -   href: '/articles/1', -   hreflang: \[ -     'en', -     'ja' -   \], -   rel: 'self', -   title: 'Article', -   type: 'ap
- yayson / codec / 1.1 / Read error source\.header (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - 'Accept'
- jsona / codec / 1.0 / Read null primary data (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - null
- jsona / codec / 1.0 / Read document metadata (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   total: 1 - \}
- jsona / codec / 1.0 / Read pagination links (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   next: null, -   self: '/articles/1' - \}
- jsona / codec / 1.0 / Preserve error objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \[ -   \{ -     detail: 'Bad title', -     source: \{ -       pointer: '/data/attributes/title' -     \}, -     status: '400', -     title: 'Invalid input' -   \} - \]
- jsona / codec / 1.1 / Read null primary data (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - null
- jsona / codec / 1.1 / Read document metadata (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   total: 1 - \}
- jsona / codec / 1.1 / Read pagination links (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   next: null, -   self: '/articles/1' - \}
- jsona / codec / 1.1 / Preserve error objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \[ -   \{ -     detail: 'Bad title', -     source: \{ -       pointer: '/data/attributes/title' -     \}, -     status: '400', -     title: 'Invalid input' -   \} - \]
- jsona / codec / 1.1 / Read local identifier linkage (node, bun): incorrect; Expected values to be strictly equal:  undefined \!== 'Ada'
- jsona / codec / 1.1 / Write local identifier (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - 'draft'
- jsona / codec / 1.1 / Read extension/profile metadata (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   ext: \[ -     'https://example\.org/version' -   \], -   profile: \[ -     'https://example\.org/profile' -   \], -   version: '1\.1' - \}
- jsona / codec / 1.1 / Read rich link objects (node, bun): incorrect; Expected values to be strictly deep-equal: \+ actual - expected  \+ undefined - \{ -   describedby: '/schemas/article', -   href: '/articles/1', -   hreflang: \[ -     'en', -     'ja' -   \], -   rel: 'self', -   title: 'Article', -   type: 'ap
- jsona / codec / 1.1 / Read error source\.header (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - 'Accept'
- ts-japi / codec / 1.0 / Read single resource (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read resource collection (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read empty collection (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read null primary data (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Preserve JSON attribute values (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read included relationships (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read unresolved relationship identifiers (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read null to-one relationship (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read empty to-many relationship (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read document metadata (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read resource metadata (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Read pagination links (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Preserve error objects (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.0 / Ignore unrecognized document members (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read single resource (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read resource collection (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read empty collection (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read null primary data (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Preserve JSON attribute values (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read included relationships (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read unresolved relationship identifiers (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read null to-one relationship (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read empty to-many relationship (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read document metadata (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read resource metadata (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read pagination links (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Preserve error objects (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read local identifier linkage (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Write local identifier (node, bun): incorrect; Expected values to be strictly equal: \+ actual - expected  \+ undefined - 'draft'
- ts-japi / codec / 1.1 / Read extension/profile metadata (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read rich link objects (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Read error source\.header (node, bun): unsupported; no public decoder
- ts-japi / codec / 1.1 / Ignore unrecognized document members (node, bun): unsupported; no public decoder
- devour / codec / 1.0 / Read null primary data (bun): error; null is not an object \(evaluating 'item\.type'\)
- devour / codec / 1.1 / Read null primary data (bun): error; null is not an object \(evaluating 'item\.type'\)
- @bjornharrtell/json-api / client / 1.0 / Read null primary data (bun): error; null is not an object \(evaluating 'e\.type'\)
- @bjornharrtell/json-api / client / 1.1 / Read null primary data (bun): error; null is not an object \(evaluating 'e\.type'\)
- yayson / codec / 1.1 / Read local identifier linkage (bun): error; null is not an object \(evaluating 'resource\[key\]'\)

</details>
<!-- compliance:end -->

## Contributing

See [CONTRIBUTING]

## Releases

See [Github Releases]

## License

All code released under [MIT]

[kitsu]: https://github.com/wopian/kitsu/tree/master/packages/kitsu
[kitsu-core]: https://github.com/wopian/kitsu/tree/master/packages/kitsu-core
[kitsu-native]: https://github.com/wopian/kitsu/tree/master/packages/kitsu-native
[github releases]: https://github.com/wopian/kitsu/releases
[contributing]: https://github.com/wopian/kitsu/blob/master/CONTRIBUTING.md
[mit]: https://github.com/wopian/kitsu/blob/master/LICENSE.md
