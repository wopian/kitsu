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

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/45290307441)

### bun 1\.4\.5

Measured commit: `c167a16767fd14a535586f20ce6416ecbb140f3e`. Runner: linux x64, AMD EPYC 7763 64-Core Processor.

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.8.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 930,625 | 1x |  |
| **devour** | **1,199,401** | **1.29x faster** |  |
| yayson | 727,468 | 1.28x slower |  |
| jsona | 1,052,034 | 1.13x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 684,127 | 1x |  |
| devour | 893,930 | 1.31x faster |  |
| yayson | 544,780 | 1.26x slower |  |
| **jsona** | **1,115,700** | **1.63x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **358,026** | **1x** |  |
| devour | 292,293 | 1.22x slower |  |
| yayson | 200,557 | 1.79x slower |  |
| jsona | 297,486 | 1.2x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **454,527** | **1x** |  |
| devour | 344,713 | 1.32x slower |  |
| yayson | 273,258 | 1.66x slower |  |
| jsona | 355,750 | 1.28x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 76,257 | 1x |  |
| devour | 96,356 | 1.26x faster |  |
| yayson | 76,037 | <1.01x slower |  |
| **jsona** | **247,009** | **3.24x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 58,173 | 1x |  |
| devour | 121,991 | 2.1x faster |  |
| yayson | 113,109 | 1.94x faster |  |
| **jsona** | **146,181** | **2.51x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,804,303** | **1x** |  |
| devour | 1,384,648 | 1.3x slower |  |
| yayson | 820,127 | 2.2x slower |  |
| jsona | 1,222,571 | 1.48x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 795,752 | 1x |  |
| devour | 616,939 | 1.29x slower |  |
| yayson | 654,865 | 1.22x slower |  |
| **jsona** | **939,423** | **1.18x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **807** | **1x** |  |
| devour | 520 | 1.55x slower |  |
| yayson | 580 | 1.39x slower |  |
| jsona | 545 | 1.48x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **365** | **1x** |  |
| devour | 5.27 | 69.33x slower |  |
| yayson | 30.19 | 12.1x slower |  |
| jsona | 167 | 2.19x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **59.48** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.75 | 79.22x slower |  |
| jsona | 23.88 | 2.49x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **401** | **1x** |  |
| devour | 4.03 | 99.5x slower |  |
| yayson | 18.36 | 21.84x slower |  |
| jsona | 154 | 2.6x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **364,337** | **1x** |  |
| devour | 299,418 | 1.22x slower |  |
| yayson | 246,284 | 1.48x slower |  |
| jsona | 310,306 | 1.17x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **340,321** | **1x** |  |
| devour | 239,176 | 1.42x slower |  |
| yayson | 200,850 | 1.69x slower |  |
| jsona | 244,636 | 1.39x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,574,626 | 1x |  |
| **devour** | **2,882,698** | **1.83x faster** |  |
| yayson | 1,737,835 | 1.1x faster |  |
| jsona | 1,774,474 | 1.13x faster |  |
| ts-japi | 662,459 | 2.38x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,494,140 | 1x |  |
| devour | 1,832,497 | 1.23x faster |  |
| yayson | 1,552,402 | 1.04x faster |  |
| **jsona** | **2,176,313** | **1.46x faster** |  |
| ts-japi | 838,741 | 1.78x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,001,613 | 1x |  |
| **devour** | **1,183,383** | **1.18x faster** |  |
| yayson | 945,519 | 1.06x slower |  |
| jsona | 900,187 | 1.11x slower |  |
| ts-japi | 425,146 | 2.36x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,926,028** | **1x** |  |
| devour | 1,448,079 | 1.33x slower |  |
| yayson | 1,062,295 | 1.81x slower |  |
| jsona | 984,579 | 1.96x slower |  |
| ts-japi | 439,493 | 4.38x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 141,845 | 1x |  |
| devour | 146,191 | 1.03x faster |  |
| yayson | 214,629 | 1.51x faster |  |
| **jsona** | **480,399** | **3.39x faster** |  |
| ts-japi | 299,594 | 2.11x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 69,770 | 1x |  |
| devour | 223,156 | 3.2x faster |  |
| **yayson** | **314,636** | **4.51x faster** |  |
| jsona | 284,562 | 4.08x faster |  |
| ts-japi | 154,903 | 2.22x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **4,832,489** | **1x** |  |
| devour | 4,418,919 | 1.09x slower |  |
| yayson | 1,922,217 | 2.51x slower |  |
| jsona | 2,502,212 | 1.93x slower |  |
| ts-japi | 862,864 | 5.6x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,007,621 | 1x |  |
| **devour** | **1,307,440** | **1.3x faster** |  |
| yayson | 1,041,742 | 1.03x faster |  |
| jsona | 1,289,814 | 1.28x faster |  |
| ts-japi | 457,079 | 2.2x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 973 | 1x |  |
| **devour** | **1,664** | **1.71x faster** |  |
| yayson | 977 | <1.01x faster |  |
| jsona | 749 | 1.3x slower |  |
| ts-japi | 521 | 1.87x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 859 | 1x |  |
| **devour** | **1,204** | **1.4x faster** |  |
| yayson | 949 | 1.1x faster |  |
| jsona | 842 | 1.02x slower |  |
| ts-japi | 519 | 1.65x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 427 | 1x |  |
| devour | 658 | 1.54x faster |  |
| **yayson** | **699** | **1.64x faster** |  |
| jsona | 399 | 1.07x slower |  |
| ts-japi | 377 | 1.13x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 5,659 | 1x |  |
| devour | 10,445 | 1.85x faster |  |
| **yayson** | **12,639** | **2.23x faster** |  |
| jsona | 4,011 | 1.41x slower |  |
| ts-japi | 7,516 | 1.33x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,080,937** | **1x** |  |
| devour | 1,544,976 | 1.35x slower |  |
| yayson | 1,049,072 | 1.98x slower |  |
| jsona | 1,034,244 | 2.01x slower |  |
| ts-japi | 441,036 | 4.72x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,964,990** | **1x** |  |
| devour | 1,491,426 | 1.32x slower |  |
| yayson | 1,048,246 | 1.87x slower |  |
| jsona | 1,071,932 | 1.83x slower |  |
| ts-japi | 437,207 | 4.49x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 486,190 | 1x |  |
| **devour** | **755,772** | **1.55x faster** |  |
| yayson | 497,064 | 1.02x faster |  |
| jsona | 609,941 | 1.25x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 388,040 | 1x |  |
| devour | 501,967 | 1.29x faster |  |
| yayson | 369,360 | 1.05x slower |  |
| **jsona** | **555,589** | **1.43x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 203,048 | 1x |  |
| **devour** | **203,474** | **<1.01x faster** |  |
| yayson | 144,536 | 1.4x slower |  |
| jsona | 191,278 | 1.06x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **273,968** | **1x** |  |
| devour | 241,896 | 1.13x slower |  |
| yayson | 192,491 | 1.42x slower |  |
| jsona | 223,130 | 1.23x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 42,503 | 1x |  |
| devour | 50,403 | 1.19x faster |  |
| yayson | 48,646 | 1.14x faster |  |
| **jsona** | **111,438** | **2.62x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 29,458 | 1x |  |
| devour | 69,626 | 2.36x faster |  |
| yayson | 68,681 | 2.33x faster |  |
| **jsona** | **78,071** | **2.65x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **984,299** | **1x** |  |
| devour | 973,461 | 1.01x slower |  |
| yayson | 542,649 | 1.81x slower |  |
| jsona | 661,142 | 1.49x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 336,200 | 1x |  |
| devour | 362,807 | 1.08x faster |  |
| yayson | 329,547 | 1.02x slower |  |
| **jsona** | **393,659** | **1.17x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 321 | 1x |  |
| **devour** | **326** | **1.02x faster** |  |
| yayson | 234 | 1.37x slower |  |
| jsona | 258 | 1.24x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **233** | **1x** |  |
| devour | 5.59 | 41.62x slower |  |
| yayson | 27.05 | 8.6x slower |  |
| jsona | 112 | 2.07x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **39.55** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.74 | 53.7x slower |  |
| jsona | 20.51 | 1.93x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **333** | **1x** |  |
| devour | 3.75 | 88.69x slower |  |
| yayson | 17.99 | 18.5x slower |  |
| jsona | 128 | 2.59x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **257,540** | **1x** |  |
| devour | 207,492 | 1.24x slower |  |
| yayson | 170,644 | 1.51x slower |  |
| jsona | 207,217 | 1.24x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **221,451** | **1x** |  |
| devour | 182,255 | 1.22x slower |  |
| yayson | 148,864 | 1.49x slower |  |
| jsona | 163,705 | 1.35x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 196,536 | 1x | 1 request/operation |
| kitsu | 35,090 | 5.6x slower | 1 request/operation |
| **fetchja** | **201,989** | **1.03x faster** | **1 request/operation** |
| devour | 34,680 | 5.67x slower | 1 request/operation |
| @bjornharrtell/json-api | 183,602 | 1.07x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 166,008 | 1x | 1 request/operation |
| kitsu | 36,068 | 4.6x slower | 1 request/operation |
| fetchja | 179,403 | 1.08x faster | 1 request/operation |
| devour | 34,573 | 4.8x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **206,162** | **1.24x faster** | **1 request/operation** |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 118,028 | 1x | 1 request/operation |
| kitsu | 32,653 | 3.61x slower | 1 request/operation |
| fetchja | 106,492 | 1.11x slower | 1 request/operation |
| devour | 27,547 | 4.28x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **122,205** | **1.04x faster** | **1 request/operation** |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **146,596** | **1x** | **1 request/operation** |
| kitsu | 36,864 | 3.98x slower | 1 request/operation |
| fetchja | 138,367 | 1.06x slower | 1 request/operation |
| devour | 28,475 | 5.15x slower | 1 request/operation |
| @bjornharrtell/json-api | 123,680 | 1.19x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 17,916 | 1x | 1 request/operation |
| kitsu | 14,256 | 1.26x slower | 1 request/operation |
| fetchja | 32,512 | 1.81x faster | 1 request/operation |
| devour | 14,149 | 1.27x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **32,694** | **1.82x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 18,815 | 1x | 1 request/operation |
| kitsu | 14,075 | 1.34x slower | 1 request/operation |
| fetchja | 31,686 | 1.68x faster | 1 request/operation |
| devour | 14,459 | 1.3x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **34,221** | **1.82x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **303,170** | **1x** | **1 request/operation** |
| kitsu | 45,661 | 6.64x slower | 1 request/operation |
| fetchja | 277,415 | 1.09x slower | 1 request/operation |
| devour | 37,425 | 8.1x slower | 1 request/operation |
| @bjornharrtell/json-api | 209,237 | 1.45x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 181,559 | 1x | 1 request/operation |
| kitsu | 37,678 | 4.82x slower | 1 request/operation |
| **fetchja** | **192,180** | **1.06x faster** | **1 request/operation** |
| devour | 32,218 | 5.64x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **480** | **1x** | **1 request/operation** |
| kitsu | 462 | 1.04x slower | 1 request/operation |
| fetchja | 436 | 1.1x slower | 1 request/operation |
| devour | 342 | 1.4x slower | 1 request/operation |
| @bjornharrtell/json-api | 442 | 1.08x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **224** | **1x** | **1 request/operation** |
| kitsu | 211 | 1.06x slower | 1 request/operation |
| fetchja | 164 | 1.37x slower | 1 request/operation |
| devour | 8.09 | 27.65x slower | 1 request/operation |
| @bjornharrtell/json-api | 163 | 1.37x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 29.73 | 1x | 1 request/operation |
| **kitsu** | **32.12** | **1.08x faster** | **1 request/operation** |
| fetchja | 25.25 | 1.18x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 24.39 | 1.22x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 202 | 1x | 1 request/operation |
| **kitsu** | **213** | **1.06x faster** | **1 request/operation** |
| fetchja | 157 | 1.28x slower | 1 request/operation |
| devour | 5.27 | 38.22x slower | 1 request/operation |
| @bjornharrtell/json-api | 151 | 1.34x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **136,795** | **1x** | **1 request/operation** |
| kitsu | 35,642 | 3.84x slower | 1 request/operation |
| fetchja | 120,565 | 1.13x slower | 1 request/operation |
| devour | 28,318 | 4.83x slower | 1 request/operation |
| @bjornharrtell/json-api | 124,390 | 1.1x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **121,629** | **1x** | **1 request/operation** |
| kitsu | 34,119 | 3.56x slower | 1 request/operation |
| fetchja | 108,710 | 1.12x slower | 1 request/operation |
| devour | 25,995 | 4.68x slower | 1 request/operation |
| @bjornharrtell/json-api | 106,855 | 1.14x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **264,005** | **1x** | **1 request/operation** |
| kitsu | 35,926 | 7.35x slower | 1 request/operation |
| fetchja | 216,048 | 1.22x slower | 1 request/operation |
| devour | 31,412 | 8.4x slower | 1 request/operation |
| @bjornharrtell/json-api | 95,761 | 2.76x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **245,501** | **1x** | **1 request/operation** |
| kitsu | 32,735 | 7.5x slower | 1 request/operation |
| fetchja | 224,536 | 1.09x slower | 1 request/operation |
| devour | 29,747 | 8.25x slower | 1 request/operation |
| @bjornharrtell/json-api | 103,848 | 2.36x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **206,286** | **1x** | **1 request/operation** |
| kitsu | 28,538 | 7.23x slower | 1 request/operation |
| fetchja | 188,452 | 1.09x slower | 1 request/operation |
| devour | 26,382 | 7.82x slower | 1 request/operation |
| @bjornharrtell/json-api | 74,072 | 2.78x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **296,741** | **1x** | **1 request/operation** |
| kitsu | 35,143 | 8.44x slower | 1 request/operation |
| fetchja | 213,196 | 1.39x slower | 1 request/operation |
| devour | 28,802 | 10.3x slower | 1 request/operation |
| @bjornharrtell/json-api | 80,914 | 3.67x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **37,168** | **1x** | **1 request/operation** |
| kitsu | 16,373 | 2.27x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **17,170** | **1x** | **1 request/operation** |
| kitsu | 10,913 | 1.57x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **405,484** | **1x** | **1 request/operation** |
| kitsu | 38,935 | 10.41x slower | 1 request/operation |
| fetchja | 312,954 | 1.3x slower | 1 request/operation |
| devour | 33,683 | 12.04x slower | 1 request/operation |
| @bjornharrtell/json-api | 106,913 | 3.79x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **212,584** | **1x** | **1 request/operation** |
| kitsu | 31,076 | 6.84x slower | 1 request/operation |
| fetchja | 193,614 | 1.1x slower | 1 request/operation |
| devour | 28,210 | 7.54x slower | 1 request/operation |
| @bjornharrtell/json-api | 94,021 | 2.26x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **453** | **1x** | **1 request/operation** |
| kitsu | 400 | 1.13x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **403** | **1x** | **1 request/operation** |
| kitsu | 361 | 1.12x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **134** | **1x** | **1 request/operation** |
| kitsu | 111 | 1.21x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 810 | 1x | 1 request/operation |
| **kitsu** | **828** | **1.02x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **286,169** | **1x** | **1 request/operation** |
| kitsu | 35,719 | 8.01x slower | 1 request/operation |
| fetchja | 227,829 | 1.26x slower | 1 request/operation |
| devour | 28,067 | 10.2x slower | 1 request/operation |
| @bjornharrtell/json-api | 76,715 | 3.73x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **278,799** | **1x** | **1 request/operation** |
| kitsu | 33,440 | 8.34x slower | 1 request/operation |
| fetchja | 226,554 | 1.23x slower | 1 request/operation |
| devour | 29,309 | 9.51x slower | 1 request/operation |
| @bjornharrtell/json-api | 71,885 | 3.88x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 99,746 | 1x | 2 requests/operation |
| kitsu | 18,322 | 5.44x slower | 2 requests/operation |
| **fetchja** | **105,978** | **1.06x faster** | **2 requests/operation** |
| devour | 15,427 | 6.47x slower | 2 requests/operation |
| @bjornharrtell/json-api | 60,335 | 1.65x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 87,815 | 1x | 2 requests/operation |
| kitsu | 15,603 | 5.63x slower | 2 requests/operation |
| **fetchja** | **92,748** | **1.06x faster** | **2 requests/operation** |
| devour | 15,601 | 5.63x slower | 2 requests/operation |
| @bjornharrtell/json-api | 69,656 | 1.26x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **62,753** | **1x** | **2 requests/operation** |
| kitsu | 14,461 | 4.34x slower | 2 requests/operation |
| fetchja | 57,685 | 1.09x slower | 2 requests/operation |
| devour | 12,224 | 5.13x slower | 2 requests/operation |
| @bjornharrtell/json-api | 42,862 | 1.46x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **81,603** | **1x** | **2 requests/operation** |
| kitsu | 16,167 | 5.05x slower | 2 requests/operation |
| fetchja | 74,120 | 1.1x slower | 2 requests/operation |
| devour | 13,458 | 6.06x slower | 2 requests/operation |
| @bjornharrtell/json-api | 44,168 | 1.85x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **11,623** | **1x** | **2 requests/operation** |
| kitsu | 7,435 | 1.56x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **9,210** | **1x** | **2 requests/operation** |
| kitsu | 6,040 | 1.52x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **158,717** | **1x** | **2 requests/operation** |
| kitsu | 20,792 | 7.63x slower | 2 requests/operation |
| fetchja | 130,345 | 1.22x slower | 2 requests/operation |
| devour | 16,633 | 9.54x slower | 2 requests/operation |
| @bjornharrtell/json-api | 73,652 | 2.15x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 85,988 | 1x | 2 requests/operation |
| kitsu | 16,318 | 5.27x slower | 2 requests/operation |
| **fetchja** | **92,901** | **1.08x faster** | **2 requests/operation** |
| devour | 14,082 | 6.11x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **196** | **1x** | **2 requests/operation** |
| kitsu | 192 | 1.02x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 114 | 1x | 2 requests/operation |
| **kitsu** | **122** | **1.07x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 22.97 | 1x | 2 requests/operation |
| **kitsu** | **24.11** | **1.05x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 155 | 1x | 2 requests/operation |
| **kitsu** | **166** | **1.07x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **77,997** | **1x** | **2 requests/operation** |
| kitsu | 16,342 | 4.77x slower | 2 requests/operation |
| fetchja | 68,898 | 1.13x slower | 2 requests/operation |
| devour | 13,161 | 5.93x slower | 2 requests/operation |
| @bjornharrtell/json-api | 44,214 | 1.76x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **72,046** | **1x** | **2 requests/operation** |
| kitsu | 14,632 | 4.92x slower | 2 requests/operation |
| fetchja | 63,936 | 1.13x slower | 2 requests/operation |
| devour | 12,544 | 5.74x slower | 2 requests/operation |
| @bjornharrtell/json-api | 40,223 | 1.79x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

</details>

### node v26\.13\.1

Measured commit: `c167a16767fd14a535586f20ce6416ecbb140f3e`. Runner: linux x64, AMD EPYC 9V74 80-Core Processor.

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.8.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 957,947 | 1x |  |
| **devour** | **1,259,575** | **1.31x faster** |  |
| yayson | 611,695 | 1.57x slower |  |
| jsona | 1,202,346 | 1.26x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 740,086 | 1x |  |
| devour | 682,954 | 1.08x slower |  |
| yayson | 465,212 | 1.59x slower |  |
| **jsona** | **1,100,107** | **1.49x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 258,246 | 1x |  |
| devour | 197,578 | 1.31x slower |  |
| yayson | 147,060 | 1.76x slower |  |
| **jsona** | **274,705** | **1.06x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 315,833 | 1x |  |
| devour | 231,059 | 1.37x slower |  |
| yayson | 179,073 | 1.76x slower |  |
| **jsona** | **317,315** | **<1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 71,810 | 1x |  |
| devour | 65,935 | 1.09x slower |  |
| yayson | 88,285 | 1.23x faster |  |
| **jsona** | **171,582** | **2.39x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 45,991 | 1x |  |
| devour | 71,550 | 1.56x faster |  |
| yayson | 76,759 | 1.67x faster |  |
| **jsona** | **93,303** | **2.03x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,571,066** | **1x** |  |
| devour | 1,545,516 | 1.02x slower |  |
| yayson | 597,192 | 2.63x slower |  |
| jsona | 1,395,713 | 1.13x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 757,885 | 1x |  |
| devour | 485,423 | 1.56x slower |  |
| yayson | 485,009 | 1.56x slower |  |
| **jsona** | **909,219** | **1.2x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **510** | **1x** |  |
| devour | 313 | 1.63x slower |  |
| yayson | 337 | 1.51x slower |  |
| jsona | 388 | 1.32x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **224** | **1x** |  |
| devour | 3.16 | 70.85x slower |  |
| yayson | 15.87 | 14.13x slower |  |
| jsona | 171 | 1.31x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **28.04** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.37 | 74.9x slower |  |
| jsona | 16.67 | 1.68x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **214** | **1x** |  |
| devour | 1.87 | 115x slower |  |
| yayson | 7.72 | 27.76x slower |  |
| jsona | 140 | 1.53x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **276,730** | **1x** |  |
| devour | 190,597 | 1.45x slower |  |
| yayson | 160,019 | 1.73x slower |  |
| jsona | 267,276 | 1.04x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **235,608** | **1x** |  |
| devour | 151,208 | 1.56x slower |  |
| yayson | 133,290 | 1.77x slower |  |
| jsona | 212,309 | 1.11x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,197,876 | 1x |  |
| devour | 2,115,145 | 1.77x faster |  |
| yayson | 1,208,027 | 1.01x faster |  |
| **jsona** | **2,290,064** | **1.91x faster** |  |
| ts-japi | 487,098 | 2.46x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,207,453 | 1x |  |
| devour | 1,175,496 | 1.03x slower |  |
| yayson | 955,682 | 1.26x slower |  |
| **jsona** | **2,384,780** | **1.98x faster** |  |
| ts-japi | 487,421 | 2.48x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 658,364 | 1x |  |
| devour | 719,674 | 1.09x faster |  |
| yayson | 596,444 | 1.1x slower |  |
| **jsona** | **1,104,186** | **1.68x faster** |  |
| ts-japi | 309,988 | 2.12x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,101,850 | 1x |  |
| devour | 903,582 | 1.22x slower |  |
| yayson | 689,270 | 1.6x slower |  |
| **jsona** | **1,392,239** | **1.26x faster** |  |
| ts-japi | 360,015 | 3.06x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 138,231 | 1x |  |
| devour | 74,292 | 1.86x slower |  |
| yayson | 162,007 | 1.17x faster |  |
| **jsona** | **574,815** | **4.16x faster** |  |
| ts-japi | 174,194 | 1.26x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 57,275 | 1x |  |
| devour | 141,516 | 2.47x faster |  |
| yayson | 169,666 | 2.96x faster |  |
| **jsona** | **282,560** | **4.93x faster** |  |
| ts-japi | 107,235 | 1.87x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,945,809 | 1x |  |
| **devour** | **4,570,887** | **1.55x faster** |  |
| yayson | 1,592,337 | 1.85x slower |  |
| jsona | 3,458,377 | 1.17x faster |  |
| ts-japi | 525,297 | 5.61x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 911,949 | 1x |  |
| devour | 794,408 | 1.15x slower |  |
| yayson | 635,799 | 1.43x slower |  |
| **jsona** | **1,341,687** | **1.47x faster** |  |
| ts-japi | 352,469 | 2.59x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 604 | 1x |  |
| devour | 896 | 1.48x faster |  |
| yayson | 514 | 1.18x slower |  |
| **jsona** | **973** | **1.61x faster** |  |
| ts-japi | 309 | 1.96x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 530 | 1x |  |
| devour | 768 | 1.45x faster |  |
| yayson | 616 | 1.16x faster |  |
| **jsona** | **1,226** | **2.31x faster** |  |
| ts-japi | 241 | 2.2x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 226 | 1x |  |
| **devour** | **374** | **1.65x faster** |  |
| yayson | 168 | 1.34x slower |  |
| jsona | 366 | 1.62x faster |  |
| ts-japi | 163 | 1.39x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,564 | 1x |  |
| **devour** | **16,524** | **6.44x faster** |  |
| yayson | 9,365 | 3.65x faster |  |
| jsona | 6,280 | 2.45x faster |  |
| ts-japi | 8,633 | 3.37x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,086,476 | 1x |  |
| devour | 903,644 | 1.2x slower |  |
| yayson | 664,236 | 1.64x slower |  |
| **jsona** | **1,451,293** | **1.34x faster** |  |
| ts-japi | 350,510 | 3.1x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,109,647 | 1x |  |
| devour | 903,037 | 1.23x slower |  |
| yayson | 681,954 | 1.63x slower |  |
| **jsona** | **1,345,135** | **1.21x faster** |  |
| ts-japi | 347,587 | 3.19x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 497,385 | 1x |  |
| **devour** | **684,667** | **1.38x faster** |  |
| yayson | 370,499 | 1.34x slower |  |
| jsona | 661,048 | 1.33x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 428,169 | 1x |  |
| devour | 391,598 | 1.09x slower |  |
| yayson | 314,253 | 1.36x slower |  |
| **jsona** | **644,003** | **1.5x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 168,678 | 1x |  |
| devour | 145,197 | 1.16x slower |  |
| yayson | 107,392 | 1.57x slower |  |
| **jsona** | **199,813** | **1.18x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **231,931** | **1x** |  |
| devour | 170,384 | 1.36x slower |  |
| yayson | 133,813 | 1.73x slower |  |
| jsona | 228,856 | 1.01x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 43,226 | 1x |  |
| devour | 32,743 | 1.32x slower |  |
| yayson | 56,339 | 1.3x faster |  |
| **jsona** | **117,743** | **2.72x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 22,366 | 1x |  |
| devour | 42,344 | 1.89x faster |  |
| yayson | 47,602 | 2.13x faster |  |
| **jsona** | **56,990** | **2.55x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 963,804 | 1x |  |
| **devour** | **1,035,371** | **1.07x faster** |  |
| yayson | 426,197 | 2.26x slower |  |
| jsona | 916,642 | 1.05x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 353,455 | 1x |  |
| devour | 262,294 | 1.35x slower |  |
| yayson | 244,980 | 1.44x slower |  |
| **jsona** | **436,495** | **1.23x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 210 | 1x |  |
| devour | 184 | 1.14x slower |  |
| yayson | 181 | 1.16x slower |  |
| **jsona** | **268** | **1.28x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **128** | **1x** |  |
| devour | 3.02 | 42.58x slower |  |
| yayson | 15.15 | 8.48x slower |  |
| jsona | 109 | 1.18x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **21.76** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.38 | 57.96x slower |  |
| jsona | 15.07 | 1.44x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **198** | **1x** |  |
| devour | 1.94 | 102x slower |  |
| yayson | 7.43 | 26.59x slower |  |
| jsona | 134 | 1.48x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 203,241 | 1x |  |
| devour | 145,651 | 1.4x slower |  |
| yayson | 119,583 | 1.7x slower |  |
| **jsona** | **209,701** | **1.03x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **181,138** | **1x** |  |
| devour | 119,202 | 1.52x slower |  |
| yayson | 102,940 | 1.76x slower |  |
| jsona | 170,878 | 1.06x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **92,981** | **1x** | **1 request/operation** |
| kitsu | 35,014 | 2.66x slower | 1 request/operation |
| fetchja | 83,495 | 1.11x slower | 1 request/operation |
| devour | 30,896 | 3.01x slower | 1 request/operation |
| @bjornharrtell/json-api | 83,732 | 1.11x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **85,932** | **1x** | **1 request/operation** |
| kitsu | 33,497 | 2.57x slower | 1 request/operation |
| fetchja | 78,886 | 1.09x slower | 1 request/operation |
| devour | 28,953 | 2.97x slower | 1 request/operation |
| @bjornharrtell/json-api | 80,927 | 1.06x slower | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **48,688** | **1x** | **1 request/operation** |
| kitsu | 26,091 | 1.87x slower | 1 request/operation |
| fetchja | 46,531 | 1.05x slower | 1 request/operation |
| devour | 22,655 | 2.15x slower | 1 request/operation |
| @bjornharrtell/json-api | 45,550 | 1.07x slower | 1 request/operation |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **59,581** | **1x** | **1 request/operation** |
| kitsu | 28,254 | 2.11x slower | 1 request/operation |
| fetchja | 50,661 | 1.18x slower | 1 request/operation |
| devour | 23,516 | 2.53x slower | 1 request/operation |
| @bjornharrtell/json-api | 52,860 | 1.13x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 13,606 | 1x | 1 request/operation |
| kitsu | 11,776 | 1.16x slower | 1 request/operation |
| fetchja | 14,941 | 1.1x faster | 1 request/operation |
| devour | 11,147 | 1.22x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **16,511** | **1.21x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 13,040 | 1x | 1 request/operation |
| kitsu | 11,273 | 1.16x slower | 1 request/operation |
| fetchja | 13,351 | 1.02x faster | 1 request/operation |
| devour | 11,906 | 1.1x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **15,719** | **1.21x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **105,599** | **1x** | **1 request/operation** |
| kitsu | 35,947 | 2.94x slower | 1 request/operation |
| fetchja | 94,039 | 1.12x slower | 1 request/operation |
| devour | 33,631 | 3.14x slower | 1 request/operation |
| @bjornharrtell/json-api | 96,541 | 1.09x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **84,733** | **1x** | **1 request/operation** |
| kitsu | 33,344 | 2.54x slower | 1 request/operation |
| fetchja | 78,752 | 1.08x slower | 1 request/operation |
| devour | 27,491 | 3.08x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 275 | 1x | 1 request/operation |
| **kitsu** | **289** | **1.05x faster** | **1 request/operation** |
| fetchja | 257 | 1.07x slower | 1 request/operation |
| devour | 196 | 1.4x slower | 1 request/operation |
| @bjornharrtell/json-api | 269 | 1.02x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 122 | 1x | 1 request/operation |
| **kitsu** | **124** | **1.01x faster** | **1 request/operation** |
| fetchja | 103 | 1.19x slower | 1 request/operation |
| devour | 3.84 | 31.87x slower | 1 request/operation |
| @bjornharrtell/json-api | 93.74 | 1.3x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 17.15 | 1x | 1 request/operation |
| **kitsu** | **17.65** | **1.03x faster** | **1 request/operation** |
| fetchja | 13.69 | 1.25x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 12.21 | 1.41x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 117 | 1x | 1 request/operation |
| **kitsu** | **118** | **1.01x faster** | **1 request/operation** |
| fetchja | 99.11 | 1.18x slower | 1 request/operation |
| devour | 2.31 | 50.74x slower | 1 request/operation |
| @bjornharrtell/json-api | 101 | 1.16x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **50,336** | **1x** | **1 request/operation** |
| kitsu | 27,013 | 1.86x slower | 1 request/operation |
| fetchja | 46,672 | 1.08x slower | 1 request/operation |
| devour | 22,084 | 2.28x slower | 1 request/operation |
| @bjornharrtell/json-api | 47,854 | 1.05x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **43,971** | **1x** | **1 request/operation** |
| kitsu | 26,010 | 1.69x slower | 1 request/operation |
| fetchja | 42,102 | 1.04x slower | 1 request/operation |
| devour | 21,223 | 2.07x slower | 1 request/operation |
| @bjornharrtell/json-api | 43,491 | 1.01x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **208,274** | **1x** | **1 request/operation** |
| kitsu | 32,257 | 6.46x slower | 1 request/operation |
| fetchja | 173,661 | 1.2x slower | 1 request/operation |
| devour | 28,834 | 7.22x slower | 1 request/operation |
| @bjornharrtell/json-api | 35,524 | 5.86x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **208,858** | **1x** | **1 request/operation** |
| kitsu | 33,032 | 6.32x slower | 1 request/operation |
| fetchja | 177,123 | 1.18x slower | 1 request/operation |
| devour | 28,551 | 7.32x slower | 1 request/operation |
| @bjornharrtell/json-api | 35,285 | 5.92x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **138,164** | **1x** | **1 request/operation** |
| kitsu | 26,110 | 5.29x slower | 1 request/operation |
| fetchja | 125,941 | 1.1x slower | 1 request/operation |
| devour | 24,126 | 5.73x slower | 1 request/operation |
| @bjornharrtell/json-api | 24,365 | 5.67x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **182,912** | **1x** | **1 request/operation** |
| kitsu | 28,931 | 6.32x slower | 1 request/operation |
| fetchja | 153,891 | 1.19x slower | 1 request/operation |
| devour | 26,054 | 7.02x slower | 1 request/operation |
| @bjornharrtell/json-api | 25,982 | 7.04x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **34,263** | **1x** | **1 request/operation** |
| kitsu | 16,455 | 2.08x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **16,418** | **1x** | **1 request/operation** |
| kitsu | 10,313 | 1.59x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **271,613** | **1x** | **1 request/operation** |
| kitsu | 34,812 | 7.8x slower | 1 request/operation |
| fetchja | 197,613 | 1.37x slower | 1 request/operation |
| devour | 32,337 | 8.4x slower | 1 request/operation |
| @bjornharrtell/json-api | 40,773 | 6.66x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **172,698** | **1x** | **1 request/operation** |
| kitsu | 29,455 | 5.86x slower | 1 request/operation |
| fetchja | 155,414 | 1.11x slower | 1 request/operation |
| devour | 26,069 | 6.62x slower | 1 request/operation |
| @bjornharrtell/json-api | 35,707 | 4.84x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 222 | 1x | 1 request/operation |
| **kitsu** | **236** | **1.06x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **235** | **1x** | **1 request/operation** |
| kitsu | 230 | 1.02x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **90.64** | **1x** | **1 request/operation** |
| kitsu | 78.05 | 1.16x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **709** | **1x** | **1 request/operation** |
| kitsu | 651 | 1.09x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **182,236** | **1x** | **1 request/operation** |
| kitsu | 28,884 | 6.31x slower | 1 request/operation |
| fetchja | 156,818 | 1.16x slower | 1 request/operation |
| devour | 26,564 | 6.86x slower | 1 request/operation |
| @bjornharrtell/json-api | 26,281 | 6.93x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **181,246** | **1x** | **1 request/operation** |
| kitsu | 29,578 | 6.13x slower | 1 request/operation |
| fetchja | 152,713 | 1.19x slower | 1 request/operation |
| devour | 26,499 | 6.84x slower | 1 request/operation |
| @bjornharrtell/json-api | 24,191 | 7.49x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **61,736** | **1x** | **2 requests/operation** |
| kitsu | 16,741 | 3.69x slower | 2 requests/operation |
| fetchja | 52,862 | 1.17x slower | 2 requests/operation |
| devour | 15,155 | 4.07x slower | 2 requests/operation |
| @bjornharrtell/json-api | 25,081 | 2.46x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **55,966** | **1x** | **2 requests/operation** |
| kitsu | 16,503 | 3.39x slower | 2 requests/operation |
| fetchja | 49,401 | 1.13x slower | 2 requests/operation |
| devour | 14,035 | 3.99x slower | 2 requests/operation |
| @bjornharrtell/json-api | 24,234 | 2.31x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **31,342** | **1x** | **2 requests/operation** |
| kitsu | 13,404 | 2.34x slower | 2 requests/operation |
| fetchja | 29,864 | 1.05x slower | 2 requests/operation |
| devour | 10,824 | 2.9x slower | 2 requests/operation |
| @bjornharrtell/json-api | 17,409 | 1.8x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **40,421** | **1x** | **2 requests/operation** |
| kitsu | 13,809 | 2.93x slower | 2 requests/operation |
| fetchja | 33,447 | 1.21x slower | 2 requests/operation |
| devour | 11,831 | 3.42x slower | 2 requests/operation |
| @bjornharrtell/json-api | 17,441 | 2.32x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **8,963** | **1x** | **2 requests/operation** |
| kitsu | 6,744 | 1.33x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **6,276** | **1x** | **2 requests/operation** |
| kitsu | 5,074 | 1.24x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **74,025** | **1x** | **2 requests/operation** |
| kitsu | 17,496 | 4.23x slower | 2 requests/operation |
| fetchja | 59,125 | 1.25x slower | 2 requests/operation |
| devour | 15,672 | 4.72x slower | 2 requests/operation |
| @bjornharrtell/json-api | 27,353 | 2.71x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **50,601** | **1x** | **2 requests/operation** |
| kitsu | 15,836 | 3.2x slower | 2 requests/operation |
| fetchja | 44,261 | 1.14x slower | 2 requests/operation |
| devour | 13,115 | 3.86x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **124** | **1x** | **2 requests/operation** |
| kitsu | 113 | 1.1x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 69.04 | 1x | 2 requests/operation |
| **kitsu** | **74.69** | **1.08x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 12.26 | 1x | 2 requests/operation |
| **kitsu** | **12.77** | **1.04x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **99.19** | **1x** | **2 requests/operation** |
| kitsu | 98.99 | <1.01x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **35,655** | **1x** | **2 requests/operation** |
| kitsu | 13,660 | 2.61x slower | 2 requests/operation |
| fetchja | 33,034 | 1.08x slower | 2 requests/operation |
| devour | 11,112 | 3.21x slower | 2 requests/operation |
| @bjornharrtell/json-api | 16,592 | 2.15x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **32,997** | **1x** | **2 requests/operation** |
| kitsu | 13,680 | 2.41x slower | 2 requests/operation |
| fetchja | 28,525 | 1.16x slower | 2 requests/operation |
| devour | 11,604 | 2.84x slower | 2 requests/operation |
| @bjornharrtell/json-api | 15,667 | 2.11x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

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
