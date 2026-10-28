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

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/40618485148)

### bun 1\.4\.4

Measured commit: `6de7de3455a1ae6c3009c4484e82c63dce75665e`. Runner: linux x64, AMD EPYC 9V74 80-Core Processor.

Built package fingerprint: `9cd1f71014ba24d098f95519074bf603715d068fa22ff5d4c352aa9f1faffe16`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,009,360 | 1x |  |
| **devour** | **1,569,825** | **1.56x faster** |  |
| yayson | 849,584 | 1.19x slower |  |
| jsona | 1,177,635 | 1.17x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 812,911 | 1x |  |
| devour | 898,103 | 1.1x faster |  |
| yayson | 521,661 | 1.56x slower |  |
| **jsona** | **1,032,381** | **1.27x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **347,466** | **1x** |  |
| devour | 284,530 | 1.22x slower |  |
| yayson | 221,193 | 1.57x slower |  |
| jsona | 324,006 | 1.07x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **447,800** | **1x** |  |
| devour | 359,633 | 1.25x slower |  |
| yayson | 292,041 | 1.53x slower |  |
| jsona | 377,740 | 1.19x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 85,135 | 1x |  |
| devour | 100,898 | 1.19x faster |  |
| yayson | 81,556 | 1.04x slower |  |
| **jsona** | **261,584** | **3.07x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 62,169 | 1x |  |
| devour | 130,851 | 2.1x faster |  |
| yayson | 125,585 | 2.02x faster |  |
| **jsona** | **153,408** | **2.47x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,878,529** | **1x** |  |
| devour | 1,682,225 | 1.12x slower |  |
| yayson | 845,463 | 2.22x slower |  |
| jsona | 1,242,052 | 1.51x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 858,161 | 1x |  |
| devour | 701,836 | 1.22x slower |  |
| yayson | 667,038 | 1.29x slower |  |
| **jsona** | **935,648** | **1.09x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **891** | **1x** |  |
| devour | 508 | 1.76x slower |  |
| yayson | 576 | 1.55x slower |  |
| jsona | 532 | 1.68x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **407** | **1x** |  |
| devour | 6.37 | 63.79x slower |  |
| yayson | 33.49 | 12.14x slower |  |
| jsona | 179 | 2.28x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **65.05** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.62 | 105x slower |  |
| jsona | 22.68 | 2.87x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **427** | **1x** |  |
| devour | 3.92 | 109x slower |  |
| yayson | 18.39 | 23.2x slower |  |
| jsona | 157 | 2.72x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **419,448** | **1x** |  |
| devour | 300,525 | 1.4x slower |  |
| yayson | 255,824 | 1.64x slower |  |
| jsona | 299,287 | 1.4x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **328,805** | **1x** |  |
| devour | 252,793 | 1.3x slower |  |
| yayson | 205,881 | 1.6x slower |  |
| jsona | 253,583 | 1.3x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,604,182 | 1x |  |
| **devour** | **3,024,584** | **1.89x faster** |  |
| yayson | 1,997,864 | 1.25x faster |  |
| jsona | 1,824,437 | 1.14x faster |  |
| ts-japi | 809,714 | 1.98x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,569,398 | 1x |  |
| devour | 1,943,102 | 1.24x faster |  |
| yayson | 1,550,076 | 1.01x slower |  |
| **jsona** | **2,079,843** | **1.33x faster** |  |
| ts-japi | 784,444 | 2x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 998,103 | 1x |  |
| **devour** | **1,140,559** | **1.14x faster** |  |
| yayson | 1,017,483 | 1.02x faster |  |
| jsona | 926,356 | 1.08x slower |  |
| ts-japi | 397,329 | 2.51x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,979,365** | **1x** |  |
| devour | 1,306,541 | 1.51x slower |  |
| yayson | 1,035,202 | 1.91x slower |  |
| jsona | 1,046,586 | 1.89x slower |  |
| ts-japi | 415,272 | 4.77x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 151,138 | 1x |  |
| devour | 156,837 | 1.04x faster |  |
| yayson | 230,955 | 1.53x faster |  |
| **jsona** | **610,272** | **4.04x faster** |  |
| ts-japi | 302,565 | 2x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 77,314 | 1x |  |
| devour | 270,001 | 3.49x faster |  |
| yayson | 304,459 | 3.94x faster |  |
| **jsona** | **311,722** | **4.03x faster** |  |
| ts-japi | 184,862 | 2.39x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **5,090,694** | **1x** |  |
| devour | 4,913,792 | 1.04x slower |  |
| yayson | 2,079,463 | 2.45x slower |  |
| jsona | 2,342,279 | 2.17x slower |  |
| ts-japi | 845,385 | 6.02x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,192,450 | 1x |  |
| **devour** | **1,341,933** | **1.13x faster** |  |
| yayson | 1,026,560 | 1.16x slower |  |
| jsona | 1,222,617 | 1.03x faster |  |
| ts-japi | 452,502 | 2.64x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 861 | 1x |  |
| **devour** | **1,466** | **1.7x faster** |  |
| yayson | 1,116 | 1.3x faster |  |
| jsona | 945 | 1.1x faster |  |
| ts-japi | 526 | 1.64x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,025 | 1x |  |
| **devour** | **1,359** | **1.33x faster** |  |
| yayson | 1,105 | 1.08x faster |  |
| jsona | 889 | 1.15x slower |  |
| ts-japi | 529 | 1.94x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 496 | 1x |  |
| **devour** | **722** | **1.46x faster** |  |
| yayson | 649 | 1.31x faster |  |
| jsona | 407 | 1.22x slower |  |
| ts-japi | 344 | 1.44x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 5,478 | 1x |  |
| devour | 9,361 | 1.71x faster |  |
| **yayson** | **15,957** | **2.91x faster** |  |
| jsona | 4,082 | 1.34x slower |  |
| ts-japi | 7,478 | 1.37x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,859,192** | **1x** |  |
| devour | 1,407,937 | 1.32x slower |  |
| yayson | 959,140 | 1.94x slower |  |
| jsona | 927,071 | 2.01x slower |  |
| ts-japi | 428,720 | 4.34x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,898,243** | **1x** |  |
| devour | 1,255,968 | 1.51x slower |  |
| yayson | 991,577 | 1.91x slower |  |
| jsona | 930,731 | 2.04x slower |  |
| ts-japi | 409,159 | 4.64x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 581,057 | 1x |  |
| **devour** | **855,147** | **1.47x faster** |  |
| yayson | 549,852 | 1.06x slower |  |
| jsona | 628,824 | 1.08x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 453,858 | 1x |  |
| devour | 458,915 | 1.01x faster |  |
| yayson | 380,124 | 1.19x slower |  |
| **jsona** | **603,153** | **1.33x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 213,672 | 1x |  |
| **devour** | **214,234** | **<1.01x faster** |  |
| yayson | 166,172 | 1.29x slower |  |
| jsona | 212,698 | <1.01x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **290,856** | **1x** |  |
| devour | 247,172 | 1.18x slower |  |
| yayson | 204,650 | 1.42x slower |  |
| jsona | 242,500 | 1.2x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 46,604 | 1x |  |
| devour | 52,195 | 1.12x faster |  |
| yayson | 53,311 | 1.14x faster |  |
| **jsona** | **133,085** | **2.86x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 33,447 | 1x |  |
| devour | 77,590 | 2.32x faster |  |
| yayson | 79,960 | 2.39x faster |  |
| **jsona** | **89,977** | **2.69x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **995,540** | **1x** |  |
| devour | 970,962 | 1.03x slower |  |
| yayson | 578,946 | 1.72x slower |  |
| jsona | 650,789 | 1.53x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 396,056 | 1x |  |
| devour | 375,667 | 1.05x slower |  |
| yayson | 342,017 | 1.16x slower |  |
| **jsona** | **414,025** | **1.05x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **337** | **1x** |  |
| devour | 314 | 1.07x slower |  |
| yayson | 257 | 1.31x slower |  |
| jsona | 266 | 1.27x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **248** | **1x** |  |
| devour | 6.43 | 38.54x slower |  |
| yayson | 31.74 | 7.81x slower |  |
| jsona | 129 | 1.92x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **44.07** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.59 | 74.79x slower |  |
| jsona | 19.33 | 2.28x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **372** | **1x** |  |
| devour | 4.02 | 92.63x slower |  |
| yayson | 18.54 | 20.06x slower |  |
| jsona | 132 | 2.82x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **271,585** | **1x** |  |
| devour | 225,414 | 1.2x slower |  |
| yayson | 188,805 | 1.44x slower |  |
| jsona | 204,521 | 1.33x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **238,493** | **1x** |  |
| devour | 186,075 | 1.28x slower |  |
| yayson | 163,335 | 1.46x slower |  |
| jsona | 176,831 | 1.35x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 226,428 | 1x | 1 request/operation |
| kitsu | 64,013 | 3.54x slower | 1 request/operation |
| **fetchja** | **266,329** | **1.18x faster** | **1 request/operation** |
| devour | 61,971 | 3.65x slower | 1 request/operation |
| @bjornharrtell/json-api | 262,648 | 1.16x faster | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 215,574 | 1x | 1 request/operation |
| kitsu | 62,322 | 3.46x slower | 1 request/operation |
| fetchja | 227,676 | 1.06x faster | 1 request/operation |
| devour | 53,545 | 4.03x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **235,909** | **1.09x faster** | **1 request/operation** |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **142,724** | **1x** | **1 request/operation** |
| kitsu | 52,374 | 2.73x slower | 1 request/operation |
| fetchja | 130,423 | 1.09x slower | 1 request/operation |
| devour | 46,814 | 3.05x slower | 1 request/operation |
| @bjornharrtell/json-api | 137,615 | 1.04x slower | 1 request/operation |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **164,457** | **1x** | **1 request/operation** |
| kitsu | 56,377 | 2.92x slower | 1 request/operation |
| fetchja | 142,787 | 1.15x slower | 1 request/operation |
| devour | 49,110 | 3.35x slower | 1 request/operation |
| @bjornharrtell/json-api | 155,086 | 1.06x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 19,034 | 1x | 1 request/operation |
| kitsu | 19,254 | 1.01x faster | 1 request/operation |
| fetchja | 36,713 | 1.93x faster | 1 request/operation |
| devour | 19,075 | <1.01x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **37,753** | **1.98x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 20,182 | 1x | 1 request/operation |
| kitsu | 19,199 | 1.05x slower | 1 request/operation |
| fetchja | 40,212 | 1.99x faster | 1 request/operation |
| devour | 23,420 | 1.16x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **43,266** | **2.14x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **312,164** | **1x** | **1 request/operation** |
| kitsu | 70,976 | 4.4x slower | 1 request/operation |
| fetchja | 302,155 | 1.03x slower | 1 request/operation |
| devour | 60,973 | 5.12x slower | 1 request/operation |
| @bjornharrtell/json-api | 273,199 | 1.14x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 230,984 | 1x | 1 request/operation |
| kitsu | 65,618 | 3.52x slower | 1 request/operation |
| **fetchja** | **242,711** | **1.05x faster** | **1 request/operation** |
| devour | 57,426 | 4.02x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **486** | **1x** | **1 request/operation** |
| kitsu | 485 | <1.01x slower | 1 request/operation |
| fetchja | 443 | 1.1x slower | 1 request/operation |
| devour | 352 | 1.38x slower | 1 request/operation |
| @bjornharrtell/json-api | 433 | 1.12x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **215** | **1x** | **1 request/operation** |
| kitsu | 215 | <1.01x slower | 1 request/operation |
| fetchja | 176 | 1.22x slower | 1 request/operation |
| devour | 8.91 | 24.15x slower | 1 request/operation |
| @bjornharrtell/json-api | 170 | 1.26x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 31.34 | 1x | 1 request/operation |
| **kitsu** | **33.57** | **1.07x faster** | **1 request/operation** |
| fetchja | 25.92 | 1.21x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 24.28 | 1.29x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **213** | **1x** | **1 request/operation** |
| kitsu | 206 | 1.03x slower | 1 request/operation |
| fetchja | 160 | 1.33x slower | 1 request/operation |
| devour | 5.27 | 40.39x slower | 1 request/operation |
| @bjornharrtell/json-api | 154 | 1.38x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **151,962** | **1x** | **1 request/operation** |
| kitsu | 52,058 | 2.92x slower | 1 request/operation |
| fetchja | 142,388 | 1.07x slower | 1 request/operation |
| devour | 43,305 | 3.51x slower | 1 request/operation |
| @bjornharrtell/json-api | 137,491 | 1.11x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **139,166** | **1x** | **1 request/operation** |
| kitsu | 52,014 | 2.68x slower | 1 request/operation |
| fetchja | 127,780 | 1.09x slower | 1 request/operation |
| devour | 43,723 | 3.18x slower | 1 request/operation |
| @bjornharrtell/json-api | 124,066 | 1.12x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **311,923** | **1x** | **1 request/operation** |
| kitsu | 48,412 | 6.44x slower | 1 request/operation |
| fetchja | 286,923 | 1.09x slower | 1 request/operation |
| devour | 54,644 | 5.71x slower | 1 request/operation |
| @bjornharrtell/json-api | 130,271 | 2.39x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **304,225** | **1x** | **1 request/operation** |
| kitsu | 55,675 | 5.46x slower | 1 request/operation |
| fetchja | 267,235 | 1.14x slower | 1 request/operation |
| devour | 47,479 | 6.41x slower | 1 request/operation |
| @bjornharrtell/json-api | 124,973 | 2.43x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **231,371** | **1x** | **1 request/operation** |
| kitsu | 49,185 | 4.7x slower | 1 request/operation |
| fetchja | 215,825 | 1.07x slower | 1 request/operation |
| devour | 46,352 | 4.99x slower | 1 request/operation |
| @bjornharrtell/json-api | 90,237 | 2.56x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **298,638** | **1x** | **1 request/operation** |
| kitsu | 54,310 | 5.5x slower | 1 request/operation |
| fetchja | 241,345 | 1.24x slower | 1 request/operation |
| devour | 49,957 | 5.98x slower | 1 request/operation |
| @bjornharrtell/json-api | 100,681 | 2.97x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **43,270** | **1x** | **1 request/operation** |
| kitsu | 22,956 | 1.88x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **22,846** | **1x** | **1 request/operation** |
| kitsu | 14,453 | 1.58x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **405,105** | **1x** | **1 request/operation** |
| kitsu | 62,309 | 6.5x slower | 1 request/operation |
| fetchja | 331,542 | 1.22x slower | 1 request/operation |
| devour | 57,591 | 7.03x slower | 1 request/operation |
| @bjornharrtell/json-api | 141,140 | 2.87x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **264,130** | **1x** | **1 request/operation** |
| kitsu | 52,454 | 5.04x slower | 1 request/operation |
| fetchja | 263,405 | <1.01x slower | 1 request/operation |
| devour | 48,914 | 5.4x slower | 1 request/operation |
| @bjornharrtell/json-api | 121,097 | 2.18x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **455** | **1x** | **1 request/operation** |
| kitsu | 444 | 1.03x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **390** | **1x** | **1 request/operation** |
| kitsu | 371 | 1.05x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **112** | **1x** | **1 request/operation** |
| kitsu | 110 | 1.02x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 769 | 1x | 1 request/operation |
| **kitsu** | **791** | **1.03x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **295,475** | **1x** | **1 request/operation** |
| kitsu | 53,888 | 5.48x slower | 1 request/operation |
| fetchja | 248,404 | 1.19x slower | 1 request/operation |
| devour | 47,154 | 6.27x slower | 1 request/operation |
| @bjornharrtell/json-api | 91,507 | 3.23x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **284,319** | **1x** | **1 request/operation** |
| kitsu | 53,686 | 5.3x slower | 1 request/operation |
| fetchja | 234,001 | 1.22x slower | 1 request/operation |
| devour | 46,448 | 6.12x slower | 1 request/operation |
| @bjornharrtell/json-api | 86,286 | 3.3x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 137,558 | 1x | 2 requests/operation |
| kitsu | 29,383 | 4.68x slower | 2 requests/operation |
| **fetchja** | **138,450** | **1.01x faster** | **2 requests/operation** |
| devour | 28,278 | 4.86x slower | 2 requests/operation |
| @bjornharrtell/json-api | 83,405 | 1.65x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 118,440 | 1x | 2 requests/operation |
| kitsu | 28,159 | 4.21x slower | 2 requests/operation |
| **fetchja** | **128,816** | **1.09x faster** | **2 requests/operation** |
| devour | 26,671 | 4.44x slower | 2 requests/operation |
| @bjornharrtell/json-api | 79,467 | 1.49x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **80,056** | **1x** | **2 requests/operation** |
| kitsu | 22,316 | 3.59x slower | 2 requests/operation |
| fetchja | 77,833 | 1.03x slower | 2 requests/operation |
| devour | 21,552 | 3.71x slower | 2 requests/operation |
| @bjornharrtell/json-api | 53,142 | 1.51x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **96,501** | **1x** | **2 requests/operation** |
| kitsu | 25,865 | 3.73x slower | 2 requests/operation |
| fetchja | 89,883 | 1.07x slower | 2 requests/operation |
| devour | 23,885 | 4.04x slower | 2 requests/operation |
| @bjornharrtell/json-api | 59,173 | 1.63x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **12,189** | **1x** | **2 requests/operation** |
| kitsu | 9,385 | 1.3x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **10,371** | **1x** | **2 requests/operation** |
| kitsu | 8,062 | 1.29x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **166,459** | **1x** | **2 requests/operation** |
| kitsu | 32,164 | 5.18x slower | 2 requests/operation |
| fetchja | 145,741 | 1.14x slower | 2 requests/operation |
| devour | 28,870 | 5.77x slower | 2 requests/operation |
| @bjornharrtell/json-api | 90,523 | 1.84x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **116,348** | **1x** | **2 requests/operation** |
| kitsu | 26,903 | 4.32x slower | 2 requests/operation |
| fetchja | 115,687 | 1.01x slower | 2 requests/operation |
| devour | 24,710 | 4.71x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 197 | 1x | 2 requests/operation |
| **kitsu** | **199** | **1.01x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 120 | 1x | 2 requests/operation |
| **kitsu** | **121** | **<1.01x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 23.46 | 1x | 2 requests/operation |
| **kitsu** | **25.16** | **1.07x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 157 | 1x | 2 requests/operation |
| **kitsu** | **161** | **1.03x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **89,906** | **1x** | **2 requests/operation** |
| kitsu | 24,624 | 3.65x slower | 2 requests/operation |
| fetchja | 85,568 | 1.05x slower | 2 requests/operation |
| devour | 22,344 | 4.02x slower | 2 requests/operation |
| @bjornharrtell/json-api | 53,987 | 1.67x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **88,933** | **1x** | **2 requests/operation** |
| kitsu | 24,681 | 3.6x slower | 2 requests/operation |
| fetchja | 72,097 | 1.23x slower | 2 requests/operation |
| devour | 21,547 | 4.13x slower | 2 requests/operation |
| @bjornharrtell/json-api | 50,435 | 1.76x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

</details>

### node v26\.12\.1

Measured commit: `6de7de3455a1ae6c3009c4484e82c63dce75665e`. Runner: linux x64, AMD EPYC 7763 64-Core Processor.

Built package fingerprint: `9cd1f71014ba24d098f95519074bf603715d068fa22ff5d4c352aa9f1faffe16`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 923,043 | 1x |  |
| **devour** | **1,196,466** | **1.3x faster** |  |
| yayson | 556,610 | 1.66x slower |  |
| jsona | 1,155,962 | 1.25x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 755,178 | 1x |  |
| devour | 635,240 | 1.19x slower |  |
| yayson | 408,475 | 1.85x slower |  |
| **jsona** | **1,011,112** | **1.34x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 233,737 | 1x |  |
| devour | 182,048 | 1.28x slower |  |
| yayson | 128,586 | 1.82x slower |  |
| **jsona** | **256,718** | **1.1x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 291,007 | 1x |  |
| devour | 211,153 | 1.38x slower |  |
| yayson | 166,519 | 1.75x slower |  |
| **jsona** | **292,580** | **1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 67,717 | 1x |  |
| devour | 53,923 | 1.26x slower |  |
| yayson | 82,089 | 1.21x faster |  |
| **jsona** | **208,869** | **3.08x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 43,263 | 1x |  |
| devour | 63,825 | 1.48x faster |  |
| yayson | 69,559 | 1.61x faster |  |
| **jsona** | **87,079** | **2.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,576,990** | **1x** |  |
| devour | 1,546,893 | 1.02x slower |  |
| yayson | 573,396 | 2.75x slower |  |
| jsona | 1,408,515 | 1.12x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 726,257 | 1x |  |
| devour | 452,186 | 1.61x slower |  |
| yayson | 447,804 | 1.62x slower |  |
| **jsona** | **892,973** | **1.23x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **458** | **1x** |  |
| devour | 307 | 1.49x slower |  |
| yayson | 330 | 1.39x slower |  |
| jsona | 427 | 1.07x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **212** | **1x** |  |
| devour | 2.57 | 82.5x slower |  |
| yayson | 13.4 | 15.84x slower |  |
| jsona | 118 | 1.8x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **26.39** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.37 | 71.37x slower |  |
| jsona | 16.12 | 1.64x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **194** | **1x** |  |
| devour | 2.03 | 95.8x slower |  |
| yayson | 7.74 | 25.11x slower |  |
| jsona | 120 | 1.63x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **251,864** | **1x** |  |
| devour | 174,664 | 1.44x slower |  |
| yayson | 150,689 | 1.67x slower |  |
| jsona | 238,543 | 1.06x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **206,639** | **1x** |  |
| devour | 134,780 | 1.53x slower |  |
| yayson | 118,842 | 1.74x slower |  |
| jsona | 190,001 | 1.09x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,171,911 | 1x |  |
| devour | 1,901,719 | 1.62x faster |  |
| yayson | 1,134,826 | 1.03x slower |  |
| **jsona** | **2,290,923** | **1.95x faster** |  |
| ts-japi | 469,985 | 2.49x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,194,958 | 1x |  |
| devour | 1,016,508 | 1.18x slower |  |
| yayson | 882,896 | 1.35x slower |  |
| **jsona** | **2,246,357** | **1.88x faster** |  |
| ts-japi | 456,077 | 2.62x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 577,988 | 1x |  |
| devour | 655,807 | 1.13x faster |  |
| yayson | 510,106 | 1.13x slower |  |
| **jsona** | **1,102,753** | **1.91x faster** |  |
| ts-japi | 293,125 | 1.97x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 964,628 | 1x |  |
| devour | 777,384 | 1.24x slower |  |
| yayson | 584,718 | 1.65x slower |  |
| **jsona** | **1,350,654** | **1.4x faster** |  |
| ts-japi | 331,895 | 2.91x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 132,411 | 1x |  |
| devour | 63,954 | 2.07x slower |  |
| yayson | 151,124 | 1.14x faster |  |
| **jsona** | **539,346** | **4.07x faster** |  |
| ts-japi | 166,764 | 1.26x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 53,109 | 1x |  |
| devour | 126,074 | 2.37x faster |  |
| yayson | 163,897 | 3.09x faster |  |
| **jsona** | **256,460** | **4.83x faster** |  |
| ts-japi | 101,398 | 1.91x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,925,144 | 1x |  |
| **devour** | **4,563,916** | **1.56x faster** |  |
| yayson | 1,528,463 | 1.91x slower |  |
| jsona | 3,450,429 | 1.18x faster |  |
| ts-japi | 516,167 | 5.67x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 889,458 | 1x |  |
| devour | 690,714 | 1.29x slower |  |
| yayson | 604,307 | 1.47x slower |  |
| **jsona** | **1,326,656** | **1.49x faster** |  |
| ts-japi | 342,911 | 2.59x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 583 | 1x |  |
| devour | 778 | 1.33x faster |  |
| yayson | 535 | 1.09x slower |  |
| **jsona** | **1,273** | **2.18x faster** |  |
| ts-japi | 316 | 1.84x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 491 | 1x |  |
| devour | 524 | 1.07x faster |  |
| yayson | 477 | 1.03x slower |  |
| **jsona** | **998** | **2.03x faster** |  |
| ts-japi | 206 | 2.38x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 222 | 1x |  |
| **devour** | **361** | **1.62x faster** |  |
| yayson | 323 | 1.45x faster |  |
| jsona | 208 | 1.07x slower |  |
| ts-japi | 160 | 1.39x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,764 | 1x |  |
| devour | 5,276 | 2.99x faster |  |
| yayson | 4,493 | 2.55x faster |  |
| jsona | 2,499 | 1.42x faster |  |
| **ts-japi** | **9,163** | **5.19x faster** |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,015,432 | 1x |  |
| devour | 796,854 | 1.27x slower |  |
| yayson | 642,274 | 1.58x slower |  |
| **jsona** | **1,350,625** | **1.33x faster** |  |
| ts-japi | 323,719 | 3.14x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,029,887 | 1x |  |
| devour | 822,785 | 1.25x slower |  |
| yayson | 617,404 | 1.67x slower |  |
| **jsona** | **1,451,123** | **1.41x faster** |  |
| ts-japi | 327,638 | 3.14x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 468,739 | 1x |  |
| **devour** | **683,950** | **1.46x faster** |  |
| yayson | 332,138 | 1.41x slower |  |
| jsona | 661,041 | 1.41x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 404,150 | 1x |  |
| devour | 355,249 | 1.14x slower |  |
| yayson | 270,088 | 1.5x slower |  |
| **jsona** | **619,476** | **1.53x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 153,174 | 1x |  |
| devour | 128,030 | 1.2x slower |  |
| yayson | 89,759 | 1.71x slower |  |
| **jsona** | **173,795** | **1.13x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 211,001 | 1x |  |
| devour | 149,129 | 1.41x slower |  |
| yayson | 111,989 | 1.88x slower |  |
| **jsona** | **211,066** | **<1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 39,090 | 1x |  |
| devour | 27,342 | 1.43x slower |  |
| yayson | 49,534 | 1.27x faster |  |
| **jsona** | **106,500** | **2.72x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 20,929 | 1x |  |
| devour | 36,965 | 1.77x faster |  |
| yayson | 43,623 | 2.08x faster |  |
| **jsona** | **53,626** | **2.56x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 974,772 | 1x |  |
| **devour** | **1,019,888** | **1.05x faster** |  |
| yayson | 393,337 | 2.48x slower |  |
| jsona | 866,089 | 1.13x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 342,713 | 1x |  |
| devour | 239,323 | 1.43x slower |  |
| yayson | 210,002 | 1.63x slower |  |
| **jsona** | **439,441** | **1.28x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 211 | 1x |  |
| devour | 185 | 1.14x slower |  |
| yayson | 163 | 1.29x slower |  |
| **jsona** | **229** | **1.09x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **125** | **1x** |  |
| devour | 3.17 | 39.5x slower |  |
| yayson | 12.16 | 10.31x slower |  |
| jsona | 103 | 1.22x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **21.88** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.37 | 59.47x slower |  |
| jsona | 14.73 | 1.49x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **179** | **1x** |  |
| devour | 2.01 | 89.33x slower |  |
| yayson | 7.96 | 22.54x slower |  |
| jsona | 112 | 1.61x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **183,781** | **1x** |  |
| devour | 130,140 | 1.41x slower |  |
| yayson | 101,484 | 1.81x slower |  |
| jsona | 179,946 | 1.02x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **155,528** | **1x** |  |
| devour | 105,711 | 1.47x slower |  |
| yayson | 84,704 | 1.84x slower |  |
| jsona | 148,909 | 1.04x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **75,603** | **1x** | **1 request/operation** |
| kitsu | 37,132 | 2.04x slower | 1 request/operation |
| fetchja | 61,592 | 1.23x slower | 1 request/operation |
| devour | 31,982 | 2.36x slower | 1 request/operation |
| @bjornharrtell/json-api | 71,655 | 1.06x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 62,576 | 1x | 1 request/operation |
| kitsu | 34,541 | 1.81x slower | 1 request/operation |
| fetchja | 57,582 | 1.09x slower | 1 request/operation |
| devour | 26,684 | 2.35x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **63,715** | **1.02x faster** | **1 request/operation** |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 29,762 | 1x | 1 request/operation |
| kitsu | 26,176 | 1.14x slower | 1 request/operation |
| fetchja | 29,340 | 1.01x slower | 1 request/operation |
| devour | 20,579 | 1.45x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **31,897** | **1.07x faster** | **1 request/operation** |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 34,697 | 1x | 1 request/operation |
| kitsu | 27,681 | 1.25x slower | 1 request/operation |
| fetchja | 31,956 | 1.09x slower | 1 request/operation |
| devour | 21,842 | 1.59x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **34,793** | **<1.01x faster** | **1 request/operation** |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 10,070 | 1x | 1 request/operation |
| kitsu | 11,120 | 1.1x faster | 1 request/operation |
| fetchja | 11,170 | 1.11x faster | 1 request/operation |
| devour | 10,116 | <1.01x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **12,511** | **1.24x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 9,795 | 1x | 1 request/operation |
| kitsu | 10,240 | 1.05x faster | 1 request/operation |
| fetchja | 10,052 | 1.03x faster | 1 request/operation |
| devour | 11,074 | 1.13x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **11,503** | **1.17x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **90,726** | **1x** | **1 request/operation** |
| kitsu | 41,205 | 2.2x slower | 1 request/operation |
| fetchja | 72,812 | 1.25x slower | 1 request/operation |
| devour | 36,263 | 2.5x slower | 1 request/operation |
| @bjornharrtell/json-api | 83,608 | 1.09x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **64,034** | **1x** | **1 request/operation** |
| kitsu | 33,891 | 1.89x slower | 1 request/operation |
| fetchja | 58,059 | 1.1x slower | 1 request/operation |
| devour | 26,629 | 2.4x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 275 | 1x | 1 request/operation |
| **kitsu** | **281** | **1.02x faster** | **1 request/operation** |
| fetchja | 255 | 1.08x slower | 1 request/operation |
| devour | 190 | 1.45x slower | 1 request/operation |
| @bjornharrtell/json-api | 267 | 1.03x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 112 | 1x | 1 request/operation |
| **kitsu** | **116** | **1.03x faster** | **1 request/operation** |
| fetchja | 96.02 | 1.17x slower | 1 request/operation |
| devour | 4.17 | 26.85x slower | 1 request/operation |
| @bjornharrtell/json-api | 94.18 | 1.19x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 16.9 | 1x | 1 request/operation |
| **kitsu** | **17.07** | **1.01x faster** | **1 request/operation** |
| fetchja | 12.5 | 1.35x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 12.64 | 1.34x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 118 | 1x | 1 request/operation |
| **kitsu** | **120** | **1.02x faster** | **1 request/operation** |
| fetchja | 101 | 1.17x slower | 1 request/operation |
| devour | 2.39 | 49.31x slower | 1 request/operation |
| @bjornharrtell/json-api | 93.76 | 1.26x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **32,435** | **1x** | **1 request/operation** |
| kitsu | 25,772 | 1.26x slower | 1 request/operation |
| fetchja | 30,140 | 1.08x slower | 1 request/operation |
| devour | 20,871 | 1.55x slower | 1 request/operation |
| @bjornharrtell/json-api | 30,520 | 1.06x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **31,409** | **1x** | **1 request/operation** |
| kitsu | 24,140 | 1.3x slower | 1 request/operation |
| fetchja | 29,365 | 1.07x slower | 1 request/operation |
| devour | 18,641 | 1.68x slower | 1 request/operation |
| @bjornharrtell/json-api | 29,906 | 1.05x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **173,176** | **1x** | **1 request/operation** |
| kitsu | 31,940 | 5.42x slower | 1 request/operation |
| fetchja | 143,657 | 1.21x slower | 1 request/operation |
| devour | 29,514 | 5.87x slower | 1 request/operation |
| @bjornharrtell/json-api | 22,577 | 7.67x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **168,482** | **1x** | **1 request/operation** |
| kitsu | 31,597 | 5.33x slower | 1 request/operation |
| fetchja | 138,707 | 1.21x slower | 1 request/operation |
| devour | 27,196 | 6.2x slower | 1 request/operation |
| @bjornharrtell/json-api | 20,373 | 8.27x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **105,396** | **1x** | **1 request/operation** |
| kitsu | 24,904 | 4.23x slower | 1 request/operation |
| fetchja | 94,549 | 1.11x slower | 1 request/operation |
| devour | 22,197 | 4.75x slower | 1 request/operation |
| @bjornharrtell/json-api | 14,291 | 7.38x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **138,783** | **1x** | **1 request/operation** |
| kitsu | 28,673 | 4.84x slower | 1 request/operation |
| fetchja | 121,910 | 1.14x slower | 1 request/operation |
| devour | 24,615 | 5.64x slower | 1 request/operation |
| @bjornharrtell/json-api | 16,546 | 8.39x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **25,597** | **1x** | **1 request/operation** |
| kitsu | 13,989 | 1.83x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **12,760** | **1x** | **1 request/operation** |
| kitsu | 9,055 | 1.41x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **240,466** | **1x** | **1 request/operation** |
| kitsu | 35,222 | 6.83x slower | 1 request/operation |
| fetchja | 162,301 | 1.48x slower | 1 request/operation |
| devour | 34,306 | 7.01x slower | 1 request/operation |
| @bjornharrtell/json-api | 24,900 | 9.66x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **140,736** | **1x** | **1 request/operation** |
| kitsu | 25,337 | 5.55x slower | 1 request/operation |
| fetchja | 125,763 | 1.12x slower | 1 request/operation |
| devour | 24,908 | 5.65x slower | 1 request/operation |
| @bjornharrtell/json-api | 20,893 | 6.74x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **229** | **1x** | **1 request/operation** |
| kitsu | 208 | 1.1x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **213** | **1x** | **1 request/operation** |
| kitsu | 205 | 1.04x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 73.5 | 1x | 1 request/operation |
| **kitsu** | **77.87** | **1.06x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **665** | **1x** | **1 request/operation** |
| kitsu | 581 | 1.14x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **142,028** | **1x** | **1 request/operation** |
| kitsu | 29,184 | 4.87x slower | 1 request/operation |
| fetchja | 114,562 | 1.24x slower | 1 request/operation |
| devour | 24,945 | 5.69x slower | 1 request/operation |
| @bjornharrtell/json-api | 14,692 | 9.67x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **140,740** | **1x** | **1 request/operation** |
| kitsu | 29,026 | 4.85x slower | 1 request/operation |
| fetchja | 113,722 | 1.24x slower | 1 request/operation |
| devour | 23,741 | 5.93x slower | 1 request/operation |
| @bjornharrtell/json-api | 14,757 | 9.54x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **41,573** | **1x** | **2 requests/operation** |
| kitsu | 17,683 | 2.35x slower | 2 requests/operation |
| fetchja | 37,913 | 1.1x slower | 2 requests/operation |
| devour | 15,268 | 2.72x slower | 2 requests/operation |
| @bjornharrtell/json-api | 16,413 | 2.53x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **36,822** | **1x** | **2 requests/operation** |
| kitsu | 16,267 | 2.26x slower | 2 requests/operation |
| fetchja | 32,956 | 1.12x slower | 2 requests/operation |
| devour | 13,026 | 2.83x slower | 2 requests/operation |
| @bjornharrtell/json-api | 14,925 | 2.47x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **20,479** | **1x** | **2 requests/operation** |
| kitsu | 12,207 | 1.68x slower | 2 requests/operation |
| fetchja | 19,336 | 1.06x slower | 2 requests/operation |
| devour | 10,389 | 1.97x slower | 2 requests/operation |
| @bjornharrtell/json-api | 10,559 | 1.94x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **26,547** | **1x** | **2 requests/operation** |
| kitsu | 13,309 | 1.99x slower | 2 requests/operation |
| fetchja | 23,549 | 1.13x slower | 2 requests/operation |
| devour | 11,100 | 2.39x slower | 2 requests/operation |
| @bjornharrtell/json-api | 11,356 | 2.34x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **7,027** | **1x** | **2 requests/operation** |
| kitsu | 5,991 | 1.17x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **5,044** | **1x** | **2 requests/operation** |
| kitsu | 4,618 | 1.09x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **58,586** | **1x** | **2 requests/operation** |
| kitsu | 18,868 | 3.11x slower | 2 requests/operation |
| fetchja | 48,176 | 1.22x slower | 2 requests/operation |
| devour | 16,443 | 3.56x slower | 2 requests/operation |
| @bjornharrtell/json-api | 19,496 | 3.01x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **33,325** | **1x** | **2 requests/operation** |
| kitsu | 15,509 | 2.15x slower | 2 requests/operation |
| fetchja | 27,589 | 1.21x slower | 2 requests/operation |
| devour | 12,680 | 2.63x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **119** | **1x** | **2 requests/operation** |
| kitsu | 112 | 1.07x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 65.52 | 1x | 2 requests/operation |
| **kitsu** | **73.37** | **1.12x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 11.97 | 1x | 2 requests/operation |
| **kitsu** | **12.27** | **1.03x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 96.82 | 1x | 2 requests/operation |
| **kitsu** | **98.96** | **1.02x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 22,451 | 1x | 2 requests/operation |
| kitsu | 13,232 | 1.7x slower | 2 requests/operation |
| **fetchja** | **22,883** | **1.02x faster** | **2 requests/operation** |
| devour | 11,049 | 2.03x slower | 2 requests/operation |
| @bjornharrtell/json-api | 11,349 | 1.98x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **24,133** | **1x** | **2 requests/operation** |
| kitsu | 12,541 | 1.92x slower | 2 requests/operation |
| fetchja | 20,529 | 1.18x slower | 2 requests/operation |
| devour | 10,445 | 2.31x slower | 2 requests/operation |
| @bjornharrtell/json-api | 10,626 | 2.27x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

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
