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

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/38950240782)

### bun 1\.4\.3

Measured commit: `3e6e1a968108ae0081decf5d055f12b1c79563e3`. Runner: linux x64, AMD EPYC 7763 64-Core Processor.

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,039,167 | 1x |  |
| **devour** | **1,567,700** | **1.51x faster** |  |
| yayson | 842,179 | 1.23x slower |  |
| jsona | 1,216,569 | 1.17x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 790,909 | 1x |  |
| devour | 824,295 | 1.04x faster |  |
| yayson | 498,781 | 1.59x slower |  |
| **jsona** | **1,003,789** | **1.27x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **332,400** | **1x** |  |
| devour | 254,231 | 1.31x slower |  |
| yayson | 202,160 | 1.64x slower |  |
| jsona | 300,238 | 1.11x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **434,598** | **1x** |  |
| devour | 326,130 | 1.33x slower |  |
| yayson | 253,013 | 1.72x slower |  |
| jsona | 341,644 | 1.27x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 71,252 | 1x |  |
| devour | 85,107 | 1.19x faster |  |
| yayson | 71,417 | <1.01x faster |  |
| **jsona** | **239,557** | **3.36x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 54,387 | 1x |  |
| devour | 112,693 | 2.07x faster |  |
| yayson | 91,434 | 1.68x faster |  |
| **jsona** | **122,080** | **2.24x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,853,546** | **1x** |  |
| devour | 1,507,641 | 1.23x slower |  |
| yayson | 838,941 | 2.21x slower |  |
| jsona | 1,278,238 | 1.45x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 777,044 | 1x |  |
| devour | 659,036 | 1.18x slower |  |
| yayson | 613,071 | 1.27x slower |  |
| **jsona** | **916,718** | **1.18x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **800** | **1x** |  |
| devour | 429 | 1.87x slower |  |
| yayson | 509 | 1.57x slower |  |
| jsona | 495 | 1.62x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **373** | **1x** |  |
| devour | 5.52 | 67.5x slower |  |
| yayson | 31.34 | 11.89x slower |  |
| jsona | 173 | 2.16x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **61.43** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.62 | 99.1x slower |  |
| jsona | 23.35 | 2.63x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **397** | **1x** |  |
| devour | 3.61 | 110x slower |  |
| yayson | 17.15 | 23.16x slower |  |
| jsona | 151 | 2.63x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **370,694** | **1x** |  |
| devour | 254,976 | 1.45x slower |  |
| yayson | 241,047 | 1.54x slower |  |
| jsona | 294,013 | 1.26x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **331,821** | **1x** |  |
| devour | 221,520 | 1.5x slower |  |
| yayson | 190,226 | 1.74x slower |  |
| jsona | 244,004 | 1.36x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,498,603 | 1x |  |
| **devour** | **3,005,599** | **2.01x faster** |  |
| yayson | 1,859,402 | 1.24x faster |  |
| jsona | 2,015,641 | 1.35x faster |  |
| ts-japi | 761,343 | 1.97x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,462,742 | 1x |  |
| devour | 1,663,769 | 1.14x faster |  |
| yayson | 1,424,884 | 1.03x slower |  |
| **jsona** | **2,117,030** | **1.45x faster** |  |
| ts-japi | 748,235 | 1.95x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 820,433 | 1x |  |
| **devour** | **1,120,583** | **1.37x faster** |  |
| yayson | 880,099 | 1.07x faster |  |
| jsona | 841,927 | 1.03x faster |  |
| ts-japi | 369,854 | 2.22x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,848,881** | **1x** |  |
| devour | 1,212,646 | 1.52x slower |  |
| yayson | 856,678 | 2.16x slower |  |
| jsona | 932,179 | 1.98x slower |  |
| ts-japi | 399,435 | 4.63x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 130,920 | 1x |  |
| devour | 133,781 | 1.02x faster |  |
| yayson | 201,003 | 1.54x faster |  |
| **jsona** | **494,622** | **3.78x faster** |  |
| ts-japi | 254,967 | 1.95x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 62,949 | 1x |  |
| devour | 202,088 | 3.21x faster |  |
| **yayson** | **251,880** | **4x faster** |  |
| jsona | 207,392 | 3.29x faster |  |
| ts-japi | 150,547 | 2.39x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **5,032,780** | **1x** |  |
| devour | 4,250,322 | 1.18x slower |  |
| yayson | 1,871,838 | 2.69x slower |  |
| jsona | 2,537,287 | 1.98x slower |  |
| ts-japi | 838,353 | 6x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,081,106 | 1x |  |
| devour | 1,159,544 | 1.07x faster |  |
| yayson | 944,283 | 1.14x slower |  |
| **jsona** | **1,252,357** | **1.16x faster** |  |
| ts-japi | 394,438 | 2.74x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 720 | 1x |  |
| **devour** | **1,429** | **1.99x faster** |  |
| yayson | 1,046 | 1.45x faster |  |
| jsona | 790 | 1.1x faster |  |
| ts-japi | 510 | 1.41x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 788 | 1x |  |
| **devour** | **1,284** | **1.63x faster** |  |
| yayson | 1,105 | 1.4x faster |  |
| jsona | 973 | 1.23x faster |  |
| ts-japi | 499 | 1.58x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 435 | 1x |  |
| devour | 662 | 1.52x faster |  |
| **yayson** | **663** | **1.53x faster** |  |
| jsona | 466 | 1.07x faster |  |
| ts-japi | 352 | 1.23x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 4,168 | 1x |  |
| devour | 13,285 | 3.19x faster |  |
| **yayson** | **14,073** | **3.38x faster** |  |
| jsona | 3,715 | 1.12x slower |  |
| ts-japi | 7,954 | 1.91x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,900,287** | **1x** |  |
| devour | 1,327,828 | 1.43x slower |  |
| yayson | 875,433 | 2.17x slower |  |
| jsona | 981,862 | 1.94x slower |  |
| ts-japi | 405,064 | 4.69x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,907,626** | **1x** |  |
| devour | 1,231,557 | 1.55x slower |  |
| yayson | 897,726 | 2.12x slower |  |
| jsona | 853,422 | 2.24x slower |  |
| ts-japi | 398,989 | 4.78x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 513,356 | 1x |  |
| **devour** | **813,909** | **1.59x faster** |  |
| yayson | 509,424 | 1.01x slower |  |
| jsona | 656,885 | 1.28x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 430,935 | 1x |  |
| devour | 467,892 | 1.09x faster |  |
| yayson | 343,062 | 1.26x slower |  |
| **jsona** | **496,287** | **1.15x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 187,972 | 1x |  |
| **devour** | **191,451** | **1.02x faster** |  |
| yayson | 141,946 | 1.32x slower |  |
| jsona | 187,866 | <1.01x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **256,062** | **1x** |  |
| devour | 224,437 | 1.14x slower |  |
| yayson | 185,687 | 1.38x slower |  |
| jsona | 208,641 | 1.23x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 40,161 | 1x |  |
| devour | 45,292 | 1.13x faster |  |
| yayson | 39,168 | 1.03x slower |  |
| **jsona** | **103,948** | **2.59x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 28,059 | 1x |  |
| devour | 60,588 | 2.16x faster |  |
| yayson | 62,199 | 2.22x faster |  |
| **jsona** | **68,557** | **2.44x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **914,098** | **1x** |  |
| devour | 911,128 | <1.01x slower |  |
| yayson | 544,063 | 1.68x slower |  |
| jsona | 688,331 | 1.33x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 341,980 | 1x |  |
| devour | 337,671 | 1.01x slower |  |
| yayson | 296,543 | 1.15x slower |  |
| **jsona** | **382,419** | **1.12x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **304** | **1x** |  |
| devour | 275 | 1.1x slower |  |
| yayson | 218 | 1.39x slower |  |
| jsona | 239 | 1.27x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **214** | **1x** |  |
| devour | 5.19 | 41.26x slower |  |
| yayson | 28.72 | 7.46x slower |  |
| jsona | 119 | 1.8x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **45.89** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.72 | 63.76x slower |  |
| jsona | 19.4 | 2.37x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **348** | **1x** |  |
| devour | 3.99 | 87.05x slower |  |
| yayson | 17.4 | 19.98x slower |  |
| jsona | 134 | 2.59x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **237,901** | **1x** |  |
| devour | 192,501 | 1.24x slower |  |
| yayson | 167,785 | 1.42x slower |  |
| jsona | 190,493 | 1.25x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **219,249** | **1x** |  |
| devour | 158,528 | 1.38x slower |  |
| yayson | 144,856 | 1.51x slower |  |
| jsona | 155,877 | 1.41x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **210,523** | **1x** | **1 request/operation** |
| kitsu | 52,874 | 3.98x slower | 1 request/operation |
| fetchja | 206,349 | 1.02x slower | 1 request/operation |
| devour | 49,309 | 4.27x slower | 1 request/operation |
| @bjornharrtell/json-api | 207,758 | 1.01x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 183,045 | 1x | 1 request/operation |
| kitsu | 51,074 | 3.58x slower | 1 request/operation |
| fetchja | 183,878 | <1.01x faster | 1 request/operation |
| devour | 44,217 | 4.14x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **188,353** | **1.03x faster** | **1 request/operation** |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **109,523** | **1x** | **1 request/operation** |
| kitsu | 39,734 | 2.76x slower | 1 request/operation |
| fetchja | 101,299 | 1.08x slower | 1 request/operation |
| devour | 32,001 | 3.42x slower | 1 request/operation |
| @bjornharrtell/json-api | 109,167 | <1.01x slower | 1 request/operation |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **137,961** | **1x** | **1 request/operation** |
| kitsu | 43,940 | 3.14x slower | 1 request/operation |
| fetchja | 113,900 | 1.21x slower | 1 request/operation |
| devour | 34,212 | 4.03x slower | 1 request/operation |
| @bjornharrtell/json-api | 100,656 | 1.37x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 15,656 | 1x | 1 request/operation |
| kitsu | 15,317 | 1.02x slower | 1 request/operation |
| fetchja | 29,680 | 1.9x faster | 1 request/operation |
| devour | 14,714 | 1.06x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **30,778** | **1.97x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 15,786 | 1x | 1 request/operation |
| kitsu | 14,331 | 1.1x slower | 1 request/operation |
| fetchja | 27,952 | 1.77x faster | 1 request/operation |
| devour | 15,971 | 1.01x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **32,887** | **2.08x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 217,846 | 1x | 1 request/operation |
| kitsu | 53,246 | 4.09x slower | 1 request/operation |
| fetchja | 192,241 | 1.13x slower | 1 request/operation |
| devour | 50,396 | 4.32x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **220,488** | **1.01x faster** | **1 request/operation** |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 170,219 | 1x | 1 request/operation |
| kitsu | 47,514 | 3.58x slower | 1 request/operation |
| **fetchja** | **177,526** | **1.04x faster** | **1 request/operation** |
| devour | 43,047 | 3.95x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **476** | **1x** | **1 request/operation** |
| kitsu | 463 | 1.03x slower | 1 request/operation |
| fetchja | 424 | 1.12x slower | 1 request/operation |
| devour | 305 | 1.56x slower | 1 request/operation |
| @bjornharrtell/json-api | 407 | 1.17x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 201 | 1x | 1 request/operation |
| **kitsu** | **208** | **1.03x faster** | **1 request/operation** |
| fetchja | 168 | 1.2x slower | 1 request/operation |
| devour | 7.89 | 25.51x slower | 1 request/operation |
| @bjornharrtell/json-api | 170 | 1.19x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 32.12 | 1x | 1 request/operation |
| **kitsu** | **33.58** | **1.05x faster** | **1 request/operation** |
| fetchja | 26.58 | 1.21x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 22.3 | 1.44x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 203 | 1x | 1 request/operation |
| **kitsu** | **209** | **1.03x faster** | **1 request/operation** |
| fetchja | 157 | 1.29x slower | 1 request/operation |
| devour | 5.21 | 38.9x slower | 1 request/operation |
| @bjornharrtell/json-api | 148 | 1.37x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **124,546** | **1x** | **1 request/operation** |
| kitsu | 42,910 | 2.9x slower | 1 request/operation |
| fetchja | 105,770 | 1.18x slower | 1 request/operation |
| devour | 33,609 | 3.71x slower | 1 request/operation |
| @bjornharrtell/json-api | 113,615 | 1.1x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **108,593** | **1x** | **1 request/operation** |
| kitsu | 40,301 | 2.69x slower | 1 request/operation |
| fetchja | 96,459 | 1.13x slower | 1 request/operation |
| devour | 31,296 | 3.47x slower | 1 request/operation |
| @bjornharrtell/json-api | 102,635 | 1.06x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **265,196** | **1x** | **1 request/operation** |
| kitsu | 44,526 | 5.96x slower | 1 request/operation |
| fetchja | 227,269 | 1.17x slower | 1 request/operation |
| devour | 41,177 | 6.44x slower | 1 request/operation |
| @bjornharrtell/json-api | 100,527 | 2.64x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **256,828** | **1x** | **1 request/operation** |
| kitsu | 45,051 | 5.7x slower | 1 request/operation |
| fetchja | 229,032 | 1.12x slower | 1 request/operation |
| devour | 40,795 | 6.3x slower | 1 request/operation |
| @bjornharrtell/json-api | 88,104 | 2.92x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **183,601** | **1x** | **1 request/operation** |
| kitsu | 36,594 | 5.02x slower | 1 request/operation |
| fetchja | 151,718 | 1.21x slower | 1 request/operation |
| devour | 32,248 | 5.69x slower | 1 request/operation |
| @bjornharrtell/json-api | 66,413 | 2.76x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **255,727** | **1x** | **1 request/operation** |
| kitsu | 43,613 | 5.86x slower | 1 request/operation |
| fetchja | 202,418 | 1.26x slower | 1 request/operation |
| devour | 37,398 | 6.84x slower | 1 request/operation |
| @bjornharrtell/json-api | 67,935 | 3.76x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **33,310** | **1x** | **1 request/operation** |
| kitsu | 17,173 | 1.94x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **17,055** | **1x** | **1 request/operation** |
| kitsu | 10,795 | 1.58x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **318,284** | **1x** | **1 request/operation** |
| kitsu | 48,791 | 6.52x slower | 1 request/operation |
| fetchja | 235,473 | 1.35x slower | 1 request/operation |
| devour | 43,987 | 7.24x slower | 1 request/operation |
| @bjornharrtell/json-api | 107,269 | 2.97x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **204,311** | **1x** | **1 request/operation** |
| kitsu | 38,780 | 5.27x slower | 1 request/operation |
| fetchja | 199,742 | 1.02x slower | 1 request/operation |
| devour | 37,500 | 5.45x slower | 1 request/operation |
| @bjornharrtell/json-api | 91,160 | 2.24x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **428** | **1x** | **1 request/operation** |
| kitsu | 411 | 1.04x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **366** | **1x** | **1 request/operation** |
| kitsu | 364 | <1.01x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 116 | 1x | 1 request/operation |
| **kitsu** | **118** | **1.02x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **787** | **1x** | **1 request/operation** |
| kitsu | 689 | 1.14x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **246,764** | **1x** | **1 request/operation** |
| kitsu | 42,577 | 5.8x slower | 1 request/operation |
| fetchja | 192,655 | 1.28x slower | 1 request/operation |
| devour | 36,122 | 6.83x slower | 1 request/operation |
| @bjornharrtell/json-api | 69,623 | 3.54x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **251,569** | **1x** | **1 request/operation** |
| kitsu | 43,112 | 5.84x slower | 1 request/operation |
| fetchja | 184,730 | 1.36x slower | 1 request/operation |
| devour | 35,857 | 7.02x slower | 1 request/operation |
| @bjornharrtell/json-api | 66,358 | 3.79x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **105,401** | **1x** | **2 requests/operation** |
| kitsu | 21,366 | 4.93x slower | 2 requests/operation |
| fetchja | 99,950 | 1.05x slower | 2 requests/operation |
| devour | 20,708 | 5.09x slower | 2 requests/operation |
| @bjornharrtell/json-api | 65,105 | 1.62x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **95,796** | **1x** | **2 requests/operation** |
| kitsu | 22,499 | 4.26x slower | 2 requests/operation |
| fetchja | 90,030 | 1.06x slower | 2 requests/operation |
| devour | 16,347 | 5.86x slower | 2 requests/operation |
| @bjornharrtell/json-api | 58,152 | 1.65x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 54,403 | 1x | 2 requests/operation |
| kitsu | 16,045 | 3.39x slower | 2 requests/operation |
| **fetchja** | **54,560** | **<1.01x faster** | **2 requests/operation** |
| devour | 14,813 | 3.67x slower | 2 requests/operation |
| @bjornharrtell/json-api | 40,264 | 1.35x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **74,286** | **1x** | **2 requests/operation** |
| kitsu | 19,479 | 3.81x slower | 2 requests/operation |
| fetchja | 63,229 | 1.17x slower | 2 requests/operation |
| devour | 14,998 | 4.95x slower | 2 requests/operation |
| @bjornharrtell/json-api | 40,270 | 1.84x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **10,066** | **1x** | **2 requests/operation** |
| kitsu | 7,648 | 1.32x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **7,965** | **1x** | **2 requests/operation** |
| kitsu | 6,163 | 1.29x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **121,624** | **1x** | **2 requests/operation** |
| kitsu | 25,592 | 4.75x slower | 2 requests/operation |
| fetchja | 102,656 | 1.18x slower | 2 requests/operation |
| devour | 23,163 | 5.25x slower | 2 requests/operation |
| @bjornharrtell/json-api | 72,903 | 1.67x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **84,473** | **1x** | **2 requests/operation** |
| kitsu | 20,483 | 4.12x slower | 2 requests/operation |
| fetchja | 83,840 | 1.01x slower | 2 requests/operation |
| devour | 17,455 | 4.84x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 189 | 1x | 2 requests/operation |
| **kitsu** | **190** | **<1.01x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 115 | 1x | 2 requests/operation |
| **kitsu** | **118** | **1.03x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 22.14 | 1x | 2 requests/operation |
| **kitsu** | **25.41** | **1.15x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 149 | 1x | 2 requests/operation |
| **kitsu** | **155** | **1.04x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **73,523** | **1x** | **2 requests/operation** |
| kitsu | 17,847 | 4.12x slower | 2 requests/operation |
| fetchja | 62,529 | 1.18x slower | 2 requests/operation |
| devour | 14,590 | 5.04x slower | 2 requests/operation |
| @bjornharrtell/json-api | 40,318 | 1.82x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **67,151** | **1x** | **2 requests/operation** |
| kitsu | 17,580 | 3.82x slower | 2 requests/operation |
| fetchja | 57,252 | 1.17x slower | 2 requests/operation |
| devour | 15,027 | 4.47x slower | 2 requests/operation |
| @bjornharrtell/json-api | 38,187 | 1.76x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

</details>

### node v26\.12\.0

Measured commit: `3e6e1a968108ae0081decf5d055f12b1c79563e3`. Runner: linux x64, AMD EPYC 9V45 96-Core Processor.

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,609,286 | 1x |  |
| **devour** | **2,040,370** | **1.27x faster** |  |
| yayson | 949,004 | 1.7x slower |  |
| jsona | 1,921,691 | 1.19x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,311,545 | 1x |  |
| devour | 1,131,708 | 1.16x slower |  |
| yayson | 786,043 | 1.67x slower |  |
| **jsona** | **1,836,457** | **1.4x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 418,042 | 1x |  |
| devour | 336,441 | 1.24x slower |  |
| yayson | 238,942 | 1.75x slower |  |
| **jsona** | **484,631** | **1.16x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 540,436 | 1x |  |
| devour | 369,799 | 1.46x slower |  |
| yayson | 306,559 | 1.76x slower |  |
| **jsona** | **546,713** | **1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 129,712 | 1x |  |
| devour | 111,376 | 1.16x slower |  |
| yayson | 153,008 | 1.18x faster |  |
| **jsona** | **401,195** | **3.09x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 78,525 | 1x |  |
| devour | 120,157 | 1.53x faster |  |
| yayson | 115,842 | 1.48x faster |  |
| **jsona** | **157,974** | **2.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,617,474** | **1x** |  |
| devour | 2,483,193 | 1.05x slower |  |
| yayson | 1,005,437 | 2.6x slower |  |
| jsona | 2,370,887 | 1.1x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,276,719 | 1x |  |
| devour | 839,081 | 1.52x slower |  |
| yayson | 822,976 | 1.55x slower |  |
| **jsona** | **1,535,838** | **1.2x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **923** | **1x** |  |
| devour | 469 | 1.97x slower |  |
| yayson | 590 | 1.56x slower |  |
| jsona | 692 | 1.33x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 238 | 1x |  |
| devour | 6.43 | 37.09x slower |  |
| yayson | 33.6 | 7.09x slower |  |
| **jsona** | **244** | **1.02x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **42.06** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.62 | 67.68x slower |  |
| jsona | 19.31 | 2.18x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **321** | **1x** |  |
| devour | 4.02 | 79.83x slower |  |
| yayson | 15.29 | 20.97x slower |  |
| jsona | 186 | 1.72x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 454,450 | 1x |  |
| devour | 318,736 | 1.43x slower |  |
| yayson | 283,519 | 1.6x slower |  |
| **jsona** | **473,657** | **1.04x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **414,501** | **1x** |  |
| devour | 248,107 | 1.67x slower |  |
| yayson | 220,370 | 1.88x slower |  |
| jsona | 366,651 | 1.13x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,997,764 | 1x |  |
| devour | 3,408,710 | 1.71x faster |  |
| yayson | 1,964,920 | 1.02x slower |  |
| **jsona** | **3,452,911** | **1.73x faster** |  |
| ts-japi | 799,715 | 2.5x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,046,585 | 1x |  |
| devour | 1,853,346 | 1.1x slower |  |
| yayson | 1,632,651 | 1.25x slower |  |
| **jsona** | **3,775,025** | **1.84x faster** |  |
| ts-japi | 737,584 | 2.77x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,126,563 | 1x |  |
| devour | 1,200,072 | 1.07x faster |  |
| yayson | 934,246 | 1.21x slower |  |
| **jsona** | **1,942,733** | **1.72x faster** |  |
| ts-japi | 459,504 | 2.45x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,934,930 | 1x |  |
| devour | 1,488,606 | 1.3x slower |  |
| yayson | 1,123,524 | 1.72x slower |  |
| **jsona** | **2,270,795** | **1.17x faster** |  |
| ts-japi | 632,509 | 3.06x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 246,300 | 1x |  |
| devour | 130,581 | 1.89x slower |  |
| yayson | 269,478 | 1.09x faster |  |
| **jsona** | **1,072,500** | **4.35x faster** |  |
| ts-japi | 296,343 | 1.2x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 103,010 | 1x |  |
| devour | 261,123 | 2.53x faster |  |
| yayson | 260,484 | 2.53x faster |  |
| **jsona** | **511,891** | **4.97x faster** |  |
| ts-japi | 181,394 | 1.76x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 4,603,965 | 1x |  |
| **devour** | **6,487,105** | **1.41x faster** |  |
| yayson | 2,612,250 | 1.76x slower |  |
| jsona | 5,674,644 | 1.23x faster |  |
| ts-japi | 841,828 | 5.47x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,553,068 | 1x |  |
| devour | 1,348,607 | 1.15x slower |  |
| yayson | 1,085,160 | 1.43x slower |  |
| **jsona** | **2,285,567** | **1.47x faster** |  |
| ts-japi | 546,144 | 2.84x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,073 | 1x |  |
| devour | 1,389 | 1.29x faster |  |
| yayson | 920 | 1.17x slower |  |
| **jsona** | **1,453** | **1.35x faster** |  |
| ts-japi | 426 | 2.52x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 785 | 1x |  |
| devour | 977 | 1.24x faster |  |
| yayson | 866 | 1.1x faster |  |
| **jsona** | **2,114** | **2.69x faster** |  |
| ts-japi | 297 | 2.64x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 406 | 1x |  |
| devour | 514 | 1.27x faster |  |
| yayson | 302 | 1.34x slower |  |
| **jsona** | **714** | **1.76x faster** |  |
| ts-japi | 292 | 1.39x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 3,447 | 1x |  |
| devour | 7,491 | 2.17x faster |  |
| yayson | 7,101 | 2.06x faster |  |
| jsona | 10,209 | 2.96x faster |  |
| **ts-japi** | **13,145** | **3.81x faster** |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,920,767 | 1x |  |
| devour | 1,569,253 | 1.22x slower |  |
| yayson | 1,096,702 | 1.75x slower |  |
| **jsona** | **2,361,097** | **1.23x faster** |  |
| ts-japi | 566,483 | 3.39x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,018,897 | 1x |  |
| devour | 1,540,995 | 1.31x slower |  |
| yayson | 1,061,532 | 1.9x slower |  |
| **jsona** | **2,536,027** | **1.26x faster** |  |
| ts-japi | 625,974 | 3.23x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 798,984 | 1x |  |
| **devour** | **1,103,265** | **1.38x faster** |  |
| yayson | 588,373 | 1.36x slower |  |
| jsona | 1,094,432 | 1.37x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 703,658 | 1x |  |
| devour | 618,344 | 1.14x slower |  |
| yayson | 506,626 | 1.39x slower |  |
| **jsona** | **1,010,977** | **1.44x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 287,050 | 1x |  |
| devour | 241,153 | 1.19x slower |  |
| yayson | 183,045 | 1.57x slower |  |
| **jsona** | **341,589** | **1.19x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 405,219 | 1x |  |
| devour | 272,372 | 1.49x slower |  |
| yayson | 225,696 | 1.8x slower |  |
| **jsona** | **407,143** | **<1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 73,881 | 1x |  |
| devour | 56,558 | 1.31x slower |  |
| yayson | 95,771 | 1.3x faster |  |
| **jsona** | **206,840** | **2.8x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 39,721 | 1x |  |
| devour | 74,150 | 1.87x faster |  |
| yayson | 80,724 | 2.03x faster |  |
| **jsona** | **106,610** | **2.68x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,578,241 | 1x |  |
| **devour** | **1,629,300** | **1.03x faster** |  |
| yayson | 671,097 | 2.35x slower |  |
| jsona | 1,473,762 | 1.07x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 617,630 | 1x |  |
| devour | 451,037 | 1.37x slower |  |
| yayson | 410,691 | 1.5x slower |  |
| **jsona** | **752,060** | **1.22x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 333 | 1x |  |
| devour | 307 | 1.09x slower |  |
| yayson | 298 | 1.12x slower |  |
| **jsona** | **361** | **1.08x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **157** | **1x** |  |
| devour | 5.93 | 26.43x slower |  |
| yayson | 31.99 | 4.9x slower |  |
| jsona | 154 | 1.02x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **32.17** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.64 | 50.36x slower |  |
| jsona | 20.57 | 1.56x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **244** | **1x** |  |
| devour | 4.1 | 59.58x slower |  |
| yayson | 16.32 | 14.97x slower |  |
| jsona | 181 | 1.35x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **338,646** | **1x** |  |
| devour | 241,823 | 1.4x slower |  |
| yayson | 209,332 | 1.62x slower |  |
| jsona | 337,532 | <1.01x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **315,892** | **1x** |  |
| devour | 206,454 | 1.53x slower |  |
| yayson | 178,997 | 1.76x slower |  |
| jsona | 294,025 | 1.07x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **197,443** | **1x** | **1 request/operation** |
| kitsu | 77,087 | 2.56x slower | 1 request/operation |
| fetchja | 176,326 | 1.12x slower | 1 request/operation |
| devour | 72,096 | 2.74x slower | 1 request/operation |
| @bjornharrtell/json-api | 181,693 | 1.09x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **173,692** | **1x** | **1 request/operation** |
| kitsu | 75,731 | 2.29x slower | 1 request/operation |
| fetchja | 162,090 | 1.07x slower | 1 request/operation |
| devour | 67,476 | 2.57x slower | 1 request/operation |
| @bjornharrtell/json-api | 167,387 | 1.04x slower | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **113,156** | **1x** | **1 request/operation** |
| kitsu | 58,169 | 1.95x slower | 1 request/operation |
| fetchja | 103,081 | 1.1x slower | 1 request/operation |
| devour | 53,537 | 2.11x slower | 1 request/operation |
| @bjornharrtell/json-api | 107,446 | 1.05x slower | 1 request/operation |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **125,782** | **1x** | **1 request/operation** |
| kitsu | 64,304 | 1.96x slower | 1 request/operation |
| fetchja | 112,173 | 1.12x slower | 1 request/operation |
| devour | 57,082 | 2.2x slower | 1 request/operation |
| @bjornharrtell/json-api | 118,471 | 1.06x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 29,963 | 1x | 1 request/operation |
| kitsu | 27,333 | 1.1x slower | 1 request/operation |
| fetchja | 32,247 | 1.08x faster | 1 request/operation |
| devour | 24,282 | 1.23x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **36,494** | **1.22x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 27,981 | 1x | 1 request/operation |
| kitsu | 25,450 | 1.1x slower | 1 request/operation |
| fetchja | 31,489 | 1.13x faster | 1 request/operation |
| devour | 27,840 | 1.01x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **33,505** | **1.2x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **216,469** | **1x** | **1 request/operation** |
| kitsu | 83,366 | 2.6x slower | 1 request/operation |
| fetchja | 188,595 | 1.15x slower | 1 request/operation |
| devour | 71,985 | 3.01x slower | 1 request/operation |
| @bjornharrtell/json-api | 189,485 | 1.14x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **187,282** | **1x** | **1 request/operation** |
| kitsu | 77,989 | 2.4x slower | 1 request/operation |
| fetchja | 160,111 | 1.17x slower | 1 request/operation |
| devour | 67,308 | 2.78x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 484 | 1x | 1 request/operation |
| **kitsu** | **540** | **1.11x faster** | **1 request/operation** |
| fetchja | 384 | 1.26x slower | 1 request/operation |
| devour | 300 | 1.62x slower | 1 request/operation |
| @bjornharrtell/json-api | 397 | 1.22x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 164 | 1x | 1 request/operation |
| **kitsu** | **176** | **1.07x faster** | **1 request/operation** |
| fetchja | 164 | <1.01x slower | 1 request/operation |
| devour | 8.28 | 19.83x slower | 1 request/operation |
| @bjornharrtell/json-api | 164 | <1.01x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 24.56 | 1x | 1 request/operation |
| **kitsu** | **28.74** | **1.17x faster** | **1 request/operation** |
| fetchja | 20.9 | 1.18x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 20.13 | 1.22x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 167 | 1x | 1 request/operation |
| **kitsu** | **188** | **1.12x faster** | **1 request/operation** |
| fetchja | 149 | 1.13x slower | 1 request/operation |
| devour | 4.54 | 36.86x slower | 1 request/operation |
| @bjornharrtell/json-api | 159 | 1.06x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **118,212** | **1x** | **1 request/operation** |
| kitsu | 62,380 | 1.9x slower | 1 request/operation |
| fetchja | 113,829 | 1.04x slower | 1 request/operation |
| devour | 55,668 | 2.12x slower | 1 request/operation |
| @bjornharrtell/json-api | 106,614 | 1.11x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **106,951** | **1x** | **1 request/operation** |
| kitsu | 63,172 | 1.69x slower | 1 request/operation |
| fetchja | 97,054 | 1.1x slower | 1 request/operation |
| devour | 53,540 | 2x slower | 1 request/operation |
| @bjornharrtell/json-api | 105,841 | 1.01x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **354,750** | **1x** | **1 request/operation** |
| kitsu | 74,803 | 4.74x slower | 1 request/operation |
| fetchja | 297,499 | 1.19x slower | 1 request/operation |
| devour | 71,854 | 4.94x slower | 1 request/operation |
| @bjornharrtell/json-api | 79,357 | 4.47x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **349,306** | **1x** | **1 request/operation** |
| kitsu | 73,839 | 4.73x slower | 1 request/operation |
| fetchja | 291,661 | 1.2x slower | 1 request/operation |
| devour | 69,234 | 5.05x slower | 1 request/operation |
| @bjornharrtell/json-api | 76,448 | 4.57x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **240,229** | **1x** | **1 request/operation** |
| kitsu | 62,740 | 3.83x slower | 1 request/operation |
| fetchja | 221,017 | 1.09x slower | 1 request/operation |
| devour | 58,243 | 4.12x slower | 1 request/operation |
| @bjornharrtell/json-api | 58,268 | 4.12x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **324,045** | **1x** | **1 request/operation** |
| kitsu | 65,280 | 4.96x slower | 1 request/operation |
| fetchja | 269,919 | 1.2x slower | 1 request/operation |
| devour | 67,706 | 4.79x slower | 1 request/operation |
| @bjornharrtell/json-api | 67,693 | 4.79x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **66,146** | **1x** | **1 request/operation** |
| kitsu | 37,887 | 1.75x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **31,017** | **1x** | **1 request/operation** |
| kitsu | 23,659 | 1.31x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **450,720** | **1x** | **1 request/operation** |
| kitsu | 77,512 | 5.81x slower | 1 request/operation |
| fetchja | 337,244 | 1.34x slower | 1 request/operation |
| devour | 72,043 | 6.26x slower | 1 request/operation |
| @bjornharrtell/json-api | 86,196 | 5.23x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **312,661** | **1x** | **1 request/operation** |
| kitsu | 70,536 | 4.43x slower | 1 request/operation |
| fetchja | 275,088 | 1.14x slower | 1 request/operation |
| devour | 65,531 | 4.77x slower | 1 request/operation |
| @bjornharrtell/json-api | 77,183 | 4.05x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 394 | 1x | 1 request/operation |
| **kitsu** | **415** | **1.05x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 358 | 1x | 1 request/operation |
| **kitsu** | **366** | **1.02x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **129** | **1x** | **1 request/operation** |
| kitsu | 116 | 1.11x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 1,175 | 1x | 1 request/operation |
| **kitsu** | **1,176** | **<1.01x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **336,985** | **1x** | **1 request/operation** |
| kitsu | 70,932 | 4.75x slower | 1 request/operation |
| fetchja | 279,021 | 1.21x slower | 1 request/operation |
| devour | 68,533 | 4.92x slower | 1 request/operation |
| @bjornharrtell/json-api | 62,235 | 5.41x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **330,863** | **1x** | **1 request/operation** |
| kitsu | 73,171 | 4.52x slower | 1 request/operation |
| fetchja | 272,918 | 1.21x slower | 1 request/operation |
| devour | 70,728 | 4.68x slower | 1 request/operation |
| @bjornharrtell/json-api | 60,396 | 5.48x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **121,163** | **1x** | **2 requests/operation** |
| kitsu | 37,600 | 3.22x slower | 2 requests/operation |
| fetchja | 106,191 | 1.14x slower | 2 requests/operation |
| devour | 34,826 | 3.48x slower | 2 requests/operation |
| @bjornharrtell/json-api | 53,425 | 2.27x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **114,247** | **1x** | **2 requests/operation** |
| kitsu | 35,987 | 3.17x slower | 2 requests/operation |
| fetchja | 103,984 | 1.1x slower | 2 requests/operation |
| devour | 32,603 | 3.5x slower | 2 requests/operation |
| @bjornharrtell/json-api | 51,634 | 2.21x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **73,064** | **1x** | **2 requests/operation** |
| kitsu | 30,914 | 2.36x slower | 2 requests/operation |
| fetchja | 65,387 | 1.12x slower | 2 requests/operation |
| devour | 27,521 | 2.65x slower | 2 requests/operation |
| @bjornharrtell/json-api | 36,917 | 1.98x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **88,574** | **1x** | **2 requests/operation** |
| kitsu | 29,615 | 2.99x slower | 2 requests/operation |
| fetchja | 74,206 | 1.19x slower | 2 requests/operation |
| devour | 29,643 | 2.99x slower | 2 requests/operation |
| @bjornharrtell/json-api | 43,258 | 2.05x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **19,570** | **1x** | **2 requests/operation** |
| kitsu | 15,280 | 1.28x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **14,076** | **1x** | **2 requests/operation** |
| kitsu | 11,346 | 1.24x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **141,552** | **1x** | **2 requests/operation** |
| kitsu | 39,174 | 3.61x slower | 2 requests/operation |
| fetchja | 121,752 | 1.16x slower | 2 requests/operation |
| devour | 35,512 | 3.99x slower | 2 requests/operation |
| @bjornharrtell/json-api | 60,400 | 2.34x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **108,958** | **1x** | **2 requests/operation** |
| kitsu | 36,326 | 3x slower | 2 requests/operation |
| fetchja | 99,332 | 1.1x slower | 2 requests/operation |
| devour | 33,555 | 3.25x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **224** | **1x** | **2 requests/operation** |
| kitsu | 201 | 1.12x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 103 | 1x | 2 requests/operation |
| **kitsu** | **116** | **1.13x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **20.72** | **1x** | **2 requests/operation** |
| kitsu | 20.04 | 1.03x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 147 | 1x | 2 requests/operation |
| **kitsu** | **151** | **1.03x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **86,047** | **1x** | **2 requests/operation** |
| kitsu | 32,687 | 2.63x slower | 2 requests/operation |
| fetchja | 72,697 | 1.18x slower | 2 requests/operation |
| devour | 27,832 | 3.09x slower | 2 requests/operation |
| @bjornharrtell/json-api | 38,953 | 2.21x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **77,618** | **1x** | **2 requests/operation** |
| kitsu | 32,108 | 2.42x slower | 2 requests/operation |
| fetchja | 67,522 | 1.15x slower | 2 requests/operation |
| devour | 28,330 | 2.74x slower | 2 requests/operation |
| @bjornharrtell/json-api | 38,160 | 2.03x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

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
