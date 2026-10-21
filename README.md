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

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/39549138987)

### bun 1\.4\.3

Measured commit: `fb7d610a5de26900aa1e8609fc6d0e670adbdda0`. Runner: linux x64, AMD EPYC 9V74 80-Core Processor.

Built package fingerprint: `9cd1f71014ba24d098f95519074bf603715d068fa22ff5d4c352aa9f1faffe16`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,282,640 | 1x |  |
| **devour** | **1,947,191** | **1.52x faster** |  |
| yayson | 991,873 | 1.29x slower |  |
| jsona | 1,542,600 | 1.2x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,077,044 | 1x |  |
| devour | 1,155,715 | 1.07x faster |  |
| yayson | 697,002 | 1.55x slower |  |
| **jsona** | **1,337,947** | **1.24x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **433,965** | **1x** |  |
| devour | 379,341 | 1.14x slower |  |
| yayson | 286,055 | 1.52x slower |  |
| jsona | 426,240 | 1.02x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **580,841** | **1x** |  |
| devour | 446,914 | 1.3x slower |  |
| yayson | 357,254 | 1.63x slower |  |
| jsona | 472,660 | 1.23x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 105,079 | 1x |  |
| devour | 127,230 | 1.21x faster |  |
| yayson | 102,094 | 1.03x slower |  |
| **jsona** | **310,191** | **2.95x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 80,622 | 1x |  |
| devour | 164,177 | 2.04x faster |  |
| yayson | 161,108 | 2x faster |  |
| **jsona** | **173,450** | **2.15x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,274,010** | **1x** |  |
| devour | 2,127,309 | 1.07x slower |  |
| yayson | 1,077,037 | 2.11x slower |  |
| jsona | 1,591,450 | 1.43x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,013,569 | 1x |  |
| devour | 874,328 | 1.16x slower |  |
| yayson | 835,554 | 1.21x slower |  |
| **jsona** | **1,212,633** | **1.2x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,154** | **1x** |  |
| devour | 576 | 2x slower |  |
| yayson | 703 | 1.64x slower |  |
| jsona | 684 | 1.69x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **498** | **1x** |  |
| devour | 8.48 | 58.72x slower |  |
| yayson | 43.82 | 11.36x slower |  |
| jsona | 224 | 2.23x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **88.66** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.78 | 114x slower |  |
| jsona | 27.34 | 3.24x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **557** | **1x** |  |
| devour | 5.08 | 110x slower |  |
| yayson | 22.76 | 24.49x slower |  |
| jsona | 196 | 2.84x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **528,329** | **1x** |  |
| devour | 364,550 | 1.45x slower |  |
| yayson | 323,373 | 1.63x slower |  |
| jsona | 412,680 | 1.28x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **401,465** | **1x** |  |
| devour | 273,144 | 1.47x slower |  |
| yayson | 273,776 | 1.47x slower |  |
| jsona | 339,702 | 1.18x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,005,982 | 1x |  |
| **devour** | **4,246,654** | **2.12x faster** |  |
| yayson | 2,318,243 | 1.16x faster |  |
| jsona | 2,517,870 | 1.26x faster |  |
| ts-japi | 1,003,322 | 2x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,171,913 | 1x |  |
| devour | 2,511,486 | 1.16x faster |  |
| yayson | 1,927,154 | 1.13x slower |  |
| **jsona** | **2,715,187** | **1.25x faster** |  |
| ts-japi | 868,697 | 2.5x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,229,543 | 1x |  |
| **devour** | **1,613,738** | **1.31x faster** |  |
| yayson | 1,219,428 | 1.01x slower |  |
| jsona | 1,181,599 | 1.04x slower |  |
| ts-japi | 516,650 | 2.38x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,377,362** | **1x** |  |
| devour | 1,854,193 | 1.28x slower |  |
| yayson | 1,347,066 | 1.76x slower |  |
| jsona | 1,293,730 | 1.84x slower |  |
| ts-japi | 528,784 | 4.5x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 195,445 | 1x |  |
| devour | 208,345 | 1.07x faster |  |
| yayson | 277,926 | 1.42x faster |  |
| **jsona** | **750,155** | **3.84x faster** |  |
| ts-japi | 351,871 | 1.8x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 92,190 | 1x |  |
| devour | 354,416 | 3.84x faster |  |
| **yayson** | **413,885** | **4.49x faster** |  |
| jsona | 366,820 | 3.98x faster |  |
| ts-japi | 218,501 | 2.37x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **5,993,088** | **1x** |  |
| devour | 5,654,290 | 1.06x slower |  |
| yayson | 2,556,347 | 2.34x slower |  |
| jsona | 3,021,664 | 1.98x slower |  |
| ts-japi | 1,070,533 | 5.6x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,442,137 | 1x |  |
| **devour** | **1,617,124** | **1.12x faster** |  |
| yayson | 1,299,870 | 1.11x slower |  |
| jsona | 1,592,534 | 1.1x faster |  |
| ts-japi | 568,003 | 2.54x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,089 | 1x |  |
| **devour** | **2,060** | **1.89x faster** |  |
| yayson | 1,345 | 1.23x faster |  |
| jsona | 1,146 | 1.05x faster |  |
| ts-japi | 645 | 1.69x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,189 | 1x |  |
| **devour** | **1,855** | **1.56x faster** |  |
| yayson | 1,389 | 1.17x faster |  |
| jsona | 1,272 | 1.07x faster |  |
| ts-japi | 652 | 1.82x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 544 | 1x |  |
| **devour** | **969** | **1.78x faster** |  |
| yayson | 821 | 1.51x faster |  |
| jsona | 510 | 1.07x slower |  |
| ts-japi | 447 | 1.22x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 5,801 | 1x |  |
| devour | 14,849 | 2.56x faster |  |
| **yayson** | **21,519** | **3.71x faster** |  |
| jsona | 4,738 | 1.22x slower |  |
| ts-japi | 8,062 | 1.39x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,517,935** | **1x** |  |
| devour | 1,853,392 | 1.36x slower |  |
| yayson | 1,262,167 | 1.99x slower |  |
| jsona | 1,396,487 | 1.8x slower |  |
| ts-japi | 545,318 | 4.62x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,343,692** | **1x** |  |
| devour | 1,894,190 | 1.24x slower |  |
| yayson | 1,273,018 | 1.84x slower |  |
| jsona | 1,261,023 | 1.86x slower |  |
| ts-japi | 543,802 | 4.31x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 656,711 | 1x |  |
| **devour** | **1,036,478** | **1.58x faster** |  |
| yayson | 663,671 | 1.01x faster |  |
| jsona | 788,082 | 1.2x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 590,902 | 1x |  |
| devour | 662,662 | 1.12x faster |  |
| yayson | 474,766 | 1.24x slower |  |
| **jsona** | **719,895** | **1.22x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 258,886 | 1x |  |
| devour | 252,507 | 1.03x slower |  |
| yayson | 203,387 | 1.27x slower |  |
| **jsona** | **261,451** | **1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **361,913** | **1x** |  |
| devour | 313,639 | 1.15x slower |  |
| yayson | 256,445 | 1.41x slower |  |
| jsona | 291,914 | 1.24x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 61,332 | 1x |  |
| devour | 59,949 | 1.02x slower |  |
| yayson | 67,897 | 1.11x faster |  |
| **jsona** | **157,802** | **2.57x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 41,652 | 1x |  |
| devour | 94,275 | 2.26x faster |  |
| yayson | 100,223 | 2.41x faster |  |
| **jsona** | **108,848** | **2.61x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,191,273 | 1x |  |
| **devour** | **1,197,045** | **<1.01x faster** |  |
| yayson | 692,621 | 1.72x slower |  |
| jsona | 853,044 | 1.4x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 476,133 | 1x |  |
| devour | 462,982 | 1.03x slower |  |
| yayson | 423,697 | 1.12x slower |  |
| **jsona** | **528,148** | **1.11x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **424** | **1x** |  |
| devour | 369 | 1.15x slower |  |
| yayson | 307 | 1.38x slower |  |
| jsona | 340 | 1.25x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **315** | **1x** |  |
| devour | 7.82 | 40.27x slower |  |
| yayson | 39.85 | 7.91x slower |  |
| jsona | 158 | 1.99x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **58.21** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.82 | 71.2x slower |  |
| jsona | 24.5 | 2.38x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **466** | **1x** |  |
| devour | 5 | 93.2x slower |  |
| yayson | 22.25 | 20.92x slower |  |
| jsona | 169 | 2.76x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **337,808** | **1x** |  |
| devour | 277,198 | 1.22x slower |  |
| yayson | 232,032 | 1.46x slower |  |
| jsona | 269,926 | 1.25x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **300,274** | **1x** |  |
| devour | 230,128 | 1.3x slower |  |
| yayson | 200,418 | 1.5x slower |  |
| jsona | 232,141 | 1.29x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **313,265** | **1x** | **1 request/operation** |
| kitsu | 75,061 | 4.17x slower | 1 request/operation |
| fetchja | 285,224 | 1.1x slower | 1 request/operation |
| devour | 75,218 | 4.16x slower | 1 request/operation |
| @bjornharrtell/json-api | 277,448 | 1.13x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 275,064 | 1x | 1 request/operation |
| kitsu | 80,714 | 3.41x slower | 1 request/operation |
| **fetchja** | **276,227** | **<1.01x faster** | **1 request/operation** |
| devour | 72,791 | 3.78x slower | 1 request/operation |
| @bjornharrtell/json-api | 271,760 | 1.01x slower | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **180,308** | **1x** | **1 request/operation** |
| kitsu | 68,683 | 2.63x slower | 1 request/operation |
| fetchja | 157,082 | 1.15x slower | 1 request/operation |
| devour | 59,097 | 3.05x slower | 1 request/operation |
| @bjornharrtell/json-api | 175,282 | 1.03x slower | 1 request/operation |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **207,357** | **1x** | **1 request/operation** |
| kitsu | 74,656 | 2.78x slower | 1 request/operation |
| fetchja | 179,843 | 1.15x slower | 1 request/operation |
| devour | 63,959 | 3.24x slower | 1 request/operation |
| @bjornharrtell/json-api | 189,691 | 1.09x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 24,665 | 1x | 1 request/operation |
| kitsu | 24,838 | 1.01x faster | 1 request/operation |
| fetchja | 44,906 | 1.82x faster | 1 request/operation |
| devour | 23,471 | 1.05x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **48,913** | **1.98x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 25,038 | 1x | 1 request/operation |
| kitsu | 25,632 | 1.02x faster | 1 request/operation |
| fetchja | 47,666 | 1.9x faster | 1 request/operation |
| devour | 26,970 | 1.08x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **54,958** | **2.19x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **345,215** | **1x** | **1 request/operation** |
| kitsu | 87,887 | 3.93x slower | 1 request/operation |
| fetchja | 317,238 | 1.09x slower | 1 request/operation |
| devour | 80,773 | 4.27x slower | 1 request/operation |
| @bjornharrtell/json-api | 333,534 | 1.04x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **272,060** | **1x** | **1 request/operation** |
| kitsu | 83,330 | 3.26x slower | 1 request/operation |
| fetchja | 269,213 | 1.01x slower | 1 request/operation |
| devour | 73,079 | 3.72x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 619 | 1x | 1 request/operation |
| **kitsu** | **646** | **1.04x faster** | **1 request/operation** |
| fetchja | 535 | 1.16x slower | 1 request/operation |
| devour | 414 | 1.5x slower | 1 request/operation |
| @bjornharrtell/json-api | 568 | 1.09x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 276 | 1x | 1 request/operation |
| **kitsu** | **282** | **1.02x faster** | **1 request/operation** |
| fetchja | 217 | 1.27x slower | 1 request/operation |
| devour | 11.35 | 24.3x slower | 1 request/operation |
| @bjornharrtell/json-api | 226 | 1.22x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **42.88** | **1x** | **1 request/operation** |
| kitsu | 39.59 | 1.08x slower | 1 request/operation |
| fetchja | 32.34 | 1.33x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 28.63 | 1.5x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **267** | **1x** | **1 request/operation** |
| kitsu | 264 | 1.01x slower | 1 request/operation |
| fetchja | 207 | 1.29x slower | 1 request/operation |
| devour | 6.78 | 39.37x slower | 1 request/operation |
| @bjornharrtell/json-api | 196 | 1.36x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **192,928** | **1x** | **1 request/operation** |
| kitsu | 72,522 | 2.66x slower | 1 request/operation |
| fetchja | 170,855 | 1.13x slower | 1 request/operation |
| devour | 61,801 | 3.12x slower | 1 request/operation |
| @bjornharrtell/json-api | 171,450 | 1.13x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **170,675** | **1x** | **1 request/operation** |
| kitsu | 65,419 | 2.61x slower | 1 request/operation |
| fetchja | 147,160 | 1.16x slower | 1 request/operation |
| devour | 56,393 | 3.03x slower | 1 request/operation |
| @bjornharrtell/json-api | 153,440 | 1.11x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **377,393** | **1x** | **1 request/operation** |
| kitsu | 76,523 | 4.93x slower | 1 request/operation |
| fetchja | 344,351 | 1.1x slower | 1 request/operation |
| devour | 67,223 | 5.61x slower | 1 request/operation |
| @bjornharrtell/json-api | 137,731 | 2.74x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **369,762** | **1x** | **1 request/operation** |
| kitsu | 71,062 | 5.2x slower | 1 request/operation |
| fetchja | 312,238 | 1.18x slower | 1 request/operation |
| devour | 69,846 | 5.29x slower | 1 request/operation |
| @bjornharrtell/json-api | 145,882 | 2.53x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **258,830** | **1x** | **1 request/operation** |
| kitsu | 58,163 | 4.45x slower | 1 request/operation |
| fetchja | 241,045 | 1.07x slower | 1 request/operation |
| devour | 53,496 | 4.84x slower | 1 request/operation |
| @bjornharrtell/json-api | 107,458 | 2.41x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **366,917** | **1x** | **1 request/operation** |
| kitsu | 72,745 | 5.04x slower | 1 request/operation |
| fetchja | 305,163 | 1.2x slower | 1 request/operation |
| devour | 65,224 | 5.63x slower | 1 request/operation |
| @bjornharrtell/json-api | 121,193 | 3.03x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **54,179** | **1x** | **1 request/operation** |
| kitsu | 30,001 | 1.81x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **25,811** | **1x** | **1 request/operation** |
| kitsu | 18,213 | 1.42x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **475,015** | **1x** | **1 request/operation** |
| kitsu | 81,141 | 5.85x slower | 1 request/operation |
| fetchja | 376,961 | 1.26x slower | 1 request/operation |
| devour | 74,467 | 6.38x slower | 1 request/operation |
| @bjornharrtell/json-api | 168,239 | 2.82x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **315,885** | **1x** | **1 request/operation** |
| kitsu | 66,210 | 4.77x slower | 1 request/operation |
| fetchja | 300,533 | 1.05x slower | 1 request/operation |
| devour | 64,913 | 4.87x slower | 1 request/operation |
| @bjornharrtell/json-api | 141,195 | 2.24x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **591** | **1x** | **1 request/operation** |
| kitsu | 574 | 1.03x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **488** | **1x** | **1 request/operation** |
| kitsu | 480 | 1.01x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **165** | **1x** | **1 request/operation** |
| kitsu | 142 | 1.16x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **1,072** | **1x** | **1 request/operation** |
| kitsu | 987 | 1.09x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **360,301** | **1x** | **1 request/operation** |
| kitsu | 70,418 | 5.12x slower | 1 request/operation |
| fetchja | 311,098 | 1.16x slower | 1 request/operation |
| devour | 63,101 | 5.71x slower | 1 request/operation |
| @bjornharrtell/json-api | 110,799 | 3.25x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **351,835** | **1x** | **1 request/operation** |
| kitsu | 69,674 | 5.05x slower | 1 request/operation |
| fetchja | 289,586 | 1.21x slower | 1 request/operation |
| devour | 62,980 | 5.59x slower | 1 request/operation |
| @bjornharrtell/json-api | 109,902 | 3.2x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 147,705 | 1x | 2 requests/operation |
| kitsu | 38,418 | 3.84x slower | 2 requests/operation |
| **fetchja** | **157,437** | **1.07x faster** | **2 requests/operation** |
| devour | 32,412 | 4.56x slower | 2 requests/operation |
| @bjornharrtell/json-api | 97,046 | 1.52x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **147,998** | **1x** | **2 requests/operation** |
| kitsu | 36,531 | 4.05x slower | 2 requests/operation |
| fetchja | 144,170 | 1.03x slower | 2 requests/operation |
| devour | 33,320 | 4.44x slower | 2 requests/operation |
| @bjornharrtell/json-api | 96,173 | 1.54x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **99,361** | **1x** | **2 requests/operation** |
| kitsu | 30,235 | 3.29x slower | 2 requests/operation |
| fetchja | 90,839 | 1.09x slower | 2 requests/operation |
| devour | 27,917 | 3.56x slower | 2 requests/operation |
| @bjornharrtell/json-api | 58,218 | 1.71x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **119,557** | **1x** | **2 requests/operation** |
| kitsu | 34,227 | 3.49x slower | 2 requests/operation |
| fetchja | 104,366 | 1.15x slower | 2 requests/operation |
| devour | 29,454 | 4.06x slower | 2 requests/operation |
| @bjornharrtell/json-api | 71,308 | 1.68x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **15,306** | **1x** | **2 requests/operation** |
| kitsu | 13,234 | 1.16x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **11,776** | **1x** | **2 requests/operation** |
| kitsu | 9,869 | 1.19x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **191,534** | **1x** | **2 requests/operation** |
| kitsu | 39,922 | 4.8x slower | 2 requests/operation |
| fetchja | 165,666 | 1.16x slower | 2 requests/operation |
| devour | 37,767 | 5.07x slower | 2 requests/operation |
| @bjornharrtell/json-api | 107,704 | 1.78x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **134,807** | **1x** | **2 requests/operation** |
| kitsu | 33,573 | 4.02x slower | 2 requests/operation |
| fetchja | 134,802 | <1.01x slower | 2 requests/operation |
| devour | 33,086 | 4.07x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **252** | **1x** | **2 requests/operation** |
| kitsu | 251 | <1.01x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 158 | 1x | 2 requests/operation |
| **kitsu** | **158** | **<1.01x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 28.89 | 1x | 2 requests/operation |
| **kitsu** | **30.23** | **1.05x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 207 | 1x | 2 requests/operation |
| **kitsu** | **210** | **1.02x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **113,897** | **1x** | **2 requests/operation** |
| kitsu | 32,947 | 3.46x slower | 2 requests/operation |
| fetchja | 101,592 | 1.12x slower | 2 requests/operation |
| devour | 28,555 | 3.99x slower | 2 requests/operation |
| @bjornharrtell/json-api | 67,111 | 1.7x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **107,736** | **1x** | **2 requests/operation** |
| kitsu | 32,552 | 3.31x slower | 2 requests/operation |
| fetchja | 94,043 | 1.15x slower | 2 requests/operation |
| devour | 27,803 | 3.88x slower | 2 requests/operation |
| @bjornharrtell/json-api | 62,107 | 1.73x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

</details>

### node v26\.12\.0

Measured commit: `fb7d610a5de26900aa1e8609fc6d0e670adbdda0`. Runner: linux x64, AMD EPYC 7763 64-Core Processor.

Built package fingerprint: `9cd1f71014ba24d098f95519074bf603715d068fa22ff5d4c352aa9f1faffe16`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 954,600 | 1x |  |
| **devour** | **1,174,425** | **1.23x faster** |  |
| yayson | 550,385 | 1.73x slower |  |
| jsona | 1,135,949 | 1.19x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 757,263 | 1x |  |
| devour | 638,340 | 1.19x slower |  |
| yayson | 425,089 | 1.78x slower |  |
| **jsona** | **1,092,746** | **1.44x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 238,286 | 1x |  |
| devour | 173,977 | 1.37x slower |  |
| yayson | 129,541 | 1.84x slower |  |
| **jsona** | **268,261** | **1.13x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **299,174** | **1x** |  |
| devour | 212,923 | 1.41x slower |  |
| yayson | 164,334 | 1.82x slower |  |
| jsona | 291,807 | 1.03x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 67,397 | 1x |  |
| devour | 53,742 | 1.25x slower |  |
| yayson | 79,242 | 1.18x faster |  |
| **jsona** | **214,336** | **3.18x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 43,863 | 1x |  |
| devour | 60,787 | 1.39x faster |  |
| yayson | 70,218 | 1.6x faster |  |
| **jsona** | **87,939** | **2x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,584,679** | **1x** |  |
| devour | 1,536,214 | 1.03x slower |  |
| yayson | 577,428 | 2.74x slower |  |
| jsona | 1,446,876 | 1.1x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 724,975 | 1x |  |
| devour | 459,053 | 1.58x slower |  |
| yayson | 450,883 | 1.61x slower |  |
| **jsona** | **866,714** | **1.2x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **464** | **1x** |  |
| devour | 307 | 1.51x slower |  |
| yayson | 342 | 1.36x slower |  |
| jsona | 406 | 1.14x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **187** | **1x** |  |
| devour | 2.66 | 70.34x slower |  |
| yayson | 13.53 | 13.81x slower |  |
| jsona | 106 | 1.77x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **26.22** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.37 | 71.68x slower |  |
| jsona | 15.36 | 1.71x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **213** | **1x** |  |
| devour | 2.04 | 104x slower |  |
| yayson | 7.69 | 27.71x slower |  |
| jsona | 122 | 1.75x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **259,187** | **1x** |  |
| devour | 172,469 | 1.5x slower |  |
| yayson | 153,060 | 1.69x slower |  |
| jsona | 241,191 | 1.07x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **211,664** | **1x** |  |
| devour | 135,176 | 1.57x slower |  |
| yayson | 121,391 | 1.74x slower |  |
| jsona | 190,277 | 1.11x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,178,714 | 1x |  |
| devour | 1,995,515 | 1.69x faster |  |
| yayson | 1,194,996 | 1.01x faster |  |
| **jsona** | **2,209,927** | **1.87x faster** |  |
| ts-japi | 469,602 | 2.51x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,219,430 | 1x |  |
| devour | 1,037,111 | 1.18x slower |  |
| yayson | 885,180 | 1.38x slower |  |
| **jsona** | **2,286,012** | **1.87x faster** |  |
| ts-japi | 470,082 | 2.59x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 588,023 | 1x |  |
| devour | 657,150 | 1.12x faster |  |
| yayson | 512,186 | 1.15x slower |  |
| **jsona** | **1,010,082** | **1.72x faster** |  |
| ts-japi | 285,685 | 2.06x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 997,754 | 1x |  |
| devour | 756,612 | 1.32x slower |  |
| yayson | 600,959 | 1.66x slower |  |
| **jsona** | **1,303,714** | **1.31x faster** |  |
| ts-japi | 327,894 | 3.04x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 130,786 | 1x |  |
| devour | 61,343 | 2.13x slower |  |
| yayson | 145,106 | 1.11x faster |  |
| **jsona** | **564,428** | **4.32x faster** |  |
| ts-japi | 168,835 | 1.29x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 51,532 | 1x |  |
| devour | 124,751 | 2.42x faster |  |
| yayson | 153,294 | 2.97x faster |  |
| **jsona** | **257,997** | **5.01x faster** |  |
| ts-japi | 99,583 | 1.93x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,947,229 | 1x |  |
| **devour** | **4,439,877** | **1.51x faster** |  |
| yayson | 1,520,642 | 1.94x slower |  |
| jsona | 3,152,553 | 1.07x faster |  |
| ts-japi | 508,332 | 5.8x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 844,270 | 1x |  |
| devour | 696,787 | 1.21x slower |  |
| yayson | 617,552 | 1.37x slower |  |
| **jsona** | **1,249,633** | **1.48x faster** |  |
| ts-japi | 330,805 | 2.55x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 501 | 1x |  |
| devour | 805 | 1.61x faster |  |
| yayson | 527 | 1.05x faster |  |
| **jsona** | **1,305** | **2.6x faster** |  |
| ts-japi | 303 | 1.65x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 492 | 1x |  |
| devour | 636 | 1.29x faster |  |
| yayson | 479 | 1.03x slower |  |
| **jsona** | **985** | **2x faster** |  |
| ts-japi | 196 | 2.52x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 217 | 1x |  |
| devour | 363 | 1.67x faster |  |
| yayson | 174 | 1.25x slower |  |
| **jsona** | **431** | **1.98x faster** |  |
| ts-japi | 176 | 1.23x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,934 | 1x |  |
| **devour** | **16,976** | **8.78x faster** |  |
| yayson | 8,657 | 4.48x faster |  |
| jsona | 3,821 | 1.98x faster |  |
| ts-japi | 10,217 | 5.28x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,044,912 | 1x |  |
| devour | 812,408 | 1.29x slower |  |
| yayson | 659,804 | 1.58x slower |  |
| **jsona** | **1,315,954** | **1.26x faster** |  |
| ts-japi | 336,700 | 3.1x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,087,554 | 1x |  |
| devour | 810,332 | 1.34x slower |  |
| yayson | 623,378 | 1.74x slower |  |
| **jsona** | **1,449,323** | **1.33x faster** |  |
| ts-japi | 336,847 | 3.23x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 488,986 | 1x |  |
| **devour** | **670,461** | **1.37x faster** |  |
| yayson | 340,328 | 1.44x slower |  |
| jsona | 656,686 | 1.34x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 396,231 | 1x |  |
| devour | 351,453 | 1.13x slower |  |
| yayson | 262,421 | 1.51x slower |  |
| **jsona** | **634,307** | **1.6x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 156,013 | 1x |  |
| devour | 127,285 | 1.23x slower |  |
| yayson | 93,329 | 1.67x slower |  |
| **jsona** | **178,920** | **1.15x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **217,708** | **1x** |  |
| devour | 147,348 | 1.48x slower |  |
| yayson | 117,064 | 1.86x slower |  |
| jsona | 210,518 | 1.03x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 39,284 | 1x |  |
| devour | 27,105 | 1.45x slower |  |
| yayson | 50,562 | 1.29x faster |  |
| **jsona** | **111,794** | **2.85x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 20,861 | 1x |  |
| devour | 37,239 | 1.79x faster |  |
| yayson | 41,177 | 1.97x faster |  |
| **jsona** | **51,244** | **2.46x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 993,478 | 1x |  |
| **devour** | **1,017,580** | **1.02x faster** |  |
| yayson | 390,527 | 2.54x slower |  |
| jsona | 863,269 | 1.15x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 336,567 | 1x |  |
| devour | 240,208 | 1.4x slower |  |
| yayson | 207,013 | 1.63x slower |  |
| **jsona** | **439,565** | **1.31x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 219 | 1x |  |
| devour | 188 | 1.17x slower |  |
| yayson | 176 | 1.25x slower |  |
| **jsona** | **245** | **1.12x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **110** | **1x** |  |
| devour | 3.07 | 35.79x slower |  |
| yayson | 11.55 | 9.52x slower |  |
| jsona | 94.16 | 1.17x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **21.78** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.36 | 59.91x slower |  |
| jsona | 13.74 | 1.59x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **188** | **1x** |  |
| devour | 2 | 94.3x slower |  |
| yayson | 7.45 | 25.25x slower |  |
| jsona | 114 | 1.65x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **188,734** | **1x** |  |
| devour | 130,792 | 1.44x slower |  |
| yayson | 106,331 | 1.77x slower |  |
| jsona | 188,508 | <1.01x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **158,326** | **1x** |  |
| devour | 107,054 | 1.48x slower |  |
| yayson | 87,274 | 1.81x slower |  |
| jsona | 154,393 | 1.03x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **77,530** | **1x** | **1 request/operation** |
| kitsu | 36,723 | 2.11x slower | 1 request/operation |
| fetchja | 61,093 | 1.27x slower | 1 request/operation |
| devour | 27,365 | 2.83x slower | 1 request/operation |
| @bjornharrtell/json-api | 69,480 | 1.12x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **69,827** | **1x** | **1 request/operation** |
| kitsu | 35,550 | 1.96x slower | 1 request/operation |
| fetchja | 57,208 | 1.22x slower | 1 request/operation |
| devour | 28,290 | 2.47x slower | 1 request/operation |
| @bjornharrtell/json-api | 65,796 | 1.06x slower | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **33,850** | **1x** | **1 request/operation** |
| kitsu | 26,388 | 1.28x slower | 1 request/operation |
| fetchja | 28,759 | 1.18x slower | 1 request/operation |
| devour | 21,892 | 1.55x slower | 1 request/operation |
| @bjornharrtell/json-api | 33,677 | 1.01x slower | 1 request/operation |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **42,643** | **1x** | **1 request/operation** |
| kitsu | 28,432 | 1.5x slower | 1 request/operation |
| fetchja | 33,735 | 1.26x slower | 1 request/operation |
| devour | 22,492 | 1.9x slower | 1 request/operation |
| @bjornharrtell/json-api | 39,629 | 1.08x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 11,194 | 1x | 1 request/operation |
| kitsu | 11,302 | 1.01x faster | 1 request/operation |
| fetchja | 11,807 | 1.05x faster | 1 request/operation |
| devour | 10,430 | 1.07x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **13,599** | **1.21x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 10,413 | 1x | 1 request/operation |
| kitsu | 10,744 | 1.03x faster | 1 request/operation |
| fetchja | 10,574 | 1.02x faster | 1 request/operation |
| devour | 10,958 | 1.05x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **12,519** | **1.2x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **92,631** | **1x** | **1 request/operation** |
| kitsu | 40,058 | 2.31x slower | 1 request/operation |
| fetchja | 77,821 | 1.19x slower | 1 request/operation |
| devour | 35,620 | 2.6x slower | 1 request/operation |
| @bjornharrtell/json-api | 83,275 | 1.11x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **68,434** | **1x** | **1 request/operation** |
| kitsu | 35,787 | 1.91x slower | 1 request/operation |
| fetchja | 57,048 | 1.2x slower | 1 request/operation |
| devour | 27,919 | 2.45x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 260 | 1x | 1 request/operation |
| **kitsu** | **267** | **1.03x faster** | **1 request/operation** |
| fetchja | 259 | 1.01x slower | 1 request/operation |
| devour | 195 | 1.34x slower | 1 request/operation |
| @bjornharrtell/json-api | 256 | 1.02x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **113** | **1x** | **1 request/operation** |
| kitsu | 112 | 1.01x slower | 1 request/operation |
| fetchja | 93.17 | 1.21x slower | 1 request/operation |
| devour | 4.11 | 27.45x slower | 1 request/operation |
| @bjornharrtell/json-api | 88.21 | 1.28x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 16.34 | 1x | 1 request/operation |
| **kitsu** | **17.72** | **1.08x faster** | **1 request/operation** |
| fetchja | 12.96 | 1.26x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 12.82 | 1.27x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 121 | 1x | 1 request/operation |
| **kitsu** | **123** | **1.02x faster** | **1 request/operation** |
| fetchja | 100 | 1.21x slower | 1 request/operation |
| devour | 2.41 | 50.45x slower | 1 request/operation |
| @bjornharrtell/json-api | 94.91 | 1.28x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **36,007** | **1x** | **1 request/operation** |
| kitsu | 26,767 | 1.35x slower | 1 request/operation |
| fetchja | 29,266 | 1.23x slower | 1 request/operation |
| devour | 20,190 | 1.78x slower | 1 request/operation |
| @bjornharrtell/json-api | 34,616 | 1.04x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **31,769** | **1x** | **1 request/operation** |
| kitsu | 24,999 | 1.27x slower | 1 request/operation |
| fetchja | 28,957 | 1.1x slower | 1 request/operation |
| devour | 18,961 | 1.68x slower | 1 request/operation |
| @bjornharrtell/json-api | 30,343 | 1.05x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **161,814** | **1x** | **1 request/operation** |
| kitsu | 32,994 | 4.9x slower | 1 request/operation |
| fetchja | 139,594 | 1.16x slower | 1 request/operation |
| devour | 29,646 | 5.46x slower | 1 request/operation |
| @bjornharrtell/json-api | 22,186 | 7.29x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **162,113** | **1x** | **1 request/operation** |
| kitsu | 30,996 | 5.23x slower | 1 request/operation |
| fetchja | 128,119 | 1.27x slower | 1 request/operation |
| devour | 27,790 | 5.83x slower | 1 request/operation |
| @bjornharrtell/json-api | 21,825 | 7.43x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **102,637** | **1x** | **1 request/operation** |
| kitsu | 25,634 | 4x slower | 1 request/operation |
| fetchja | 94,004 | 1.09x slower | 1 request/operation |
| devour | 22,214 | 4.62x slower | 1 request/operation |
| @bjornharrtell/json-api | 15,901 | 6.45x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **149,458** | **1x** | **1 request/operation** |
| kitsu | 28,536 | 5.24x slower | 1 request/operation |
| fetchja | 121,989 | 1.23x slower | 1 request/operation |
| devour | 25,248 | 5.92x slower | 1 request/operation |
| @bjornharrtell/json-api | 16,071 | 9.3x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **25,734** | **1x** | **1 request/operation** |
| kitsu | 14,624 | 1.76x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **12,555** | **1x** | **1 request/operation** |
| kitsu | 6,178 | 2.03x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **238,882** | **1x** | **1 request/operation** |
| kitsu | 37,568 | 6.36x slower | 1 request/operation |
| fetchja | 170,742 | 1.4x slower | 1 request/operation |
| devour | 35,396 | 6.75x slower | 1 request/operation |
| @bjornharrtell/json-api | 26,406 | 9.05x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **139,697** | **1x** | **1 request/operation** |
| kitsu | 29,243 | 4.78x slower | 1 request/operation |
| fetchja | 119,310 | 1.17x slower | 1 request/operation |
| devour | 25,828 | 5.41x slower | 1 request/operation |
| @bjornharrtell/json-api | 20,969 | 6.66x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **222** | **1x** | **1 request/operation** |
| kitsu | 211 | 1.05x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **212** | **1x** | **1 request/operation** |
| kitsu | 205 | 1.04x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 75.93 | 1x | 1 request/operation |
| **kitsu** | **82.36** | **1.08x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **703** | **1x** | **1 request/operation** |
| kitsu | 597 | 1.18x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **145,644** | **1x** | **1 request/operation** |
| kitsu | 30,125 | 4.83x slower | 1 request/operation |
| fetchja | 108,915 | 1.34x slower | 1 request/operation |
| devour | 25,482 | 5.72x slower | 1 request/operation |
| @bjornharrtell/json-api | 17,911 | 8.13x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **134,138** | **1x** | **1 request/operation** |
| kitsu | 28,756 | 4.66x slower | 1 request/operation |
| fetchja | 117,554 | 1.14x slower | 1 request/operation |
| devour | 24,953 | 5.38x slower | 1 request/operation |
| @bjornharrtell/json-api | 16,801 | 7.98x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **46,997** | **1x** | **2 requests/operation** |
| kitsu | 17,817 | 2.64x slower | 2 requests/operation |
| fetchja | 35,730 | 1.32x slower | 2 requests/operation |
| devour | 14,956 | 3.14x slower | 2 requests/operation |
| @bjornharrtell/json-api | 17,582 | 2.67x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **36,696** | **1x** | **2 requests/operation** |
| kitsu | 15,306 | 2.4x slower | 2 requests/operation |
| fetchja | 33,228 | 1.1x slower | 2 requests/operation |
| devour | 13,326 | 2.75x slower | 2 requests/operation |
| @bjornharrtell/json-api | 15,655 | 2.34x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **22,657** | **1x** | **2 requests/operation** |
| kitsu | 12,198 | 1.86x slower | 2 requests/operation |
| fetchja | 21,801 | 1.04x slower | 2 requests/operation |
| devour | 10,495 | 2.16x slower | 2 requests/operation |
| @bjornharrtell/json-api | 11,218 | 2.02x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **27,707** | **1x** | **2 requests/operation** |
| kitsu | 13,811 | 2.01x slower | 2 requests/operation |
| fetchja | 23,817 | 1.16x slower | 2 requests/operation |
| devour | 11,234 | 2.47x slower | 2 requests/operation |
| @bjornharrtell/json-api | 11,865 | 2.34x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **7,190** | **1x** | **2 requests/operation** |
| kitsu | 6,162 | 1.17x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **5,240** | **1x** | **2 requests/operation** |
| kitsu | 4,713 | 1.11x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **59,806** | **1x** | **2 requests/operation** |
| kitsu | 19,055 | 3.14x slower | 2 requests/operation |
| fetchja | 48,023 | 1.25x slower | 2 requests/operation |
| devour | 16,155 | 3.7x slower | 2 requests/operation |
| @bjornharrtell/json-api | 19,071 | 3.14x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **32,868** | **1x** | **2 requests/operation** |
| kitsu | 14,835 | 2.22x slower | 2 requests/operation |
| fetchja | 28,549 | 1.15x slower | 2 requests/operation |
| devour | 12,787 | 2.57x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **119** | **1x** | **2 requests/operation** |
| kitsu | 109 | 1.09x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 69.61 | 1x | 2 requests/operation |
| **kitsu** | **73.35** | **1.05x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **13.32** | **1x** | **2 requests/operation** |
| kitsu | 13.09 | 1.02x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 97.77 | 1x | 2 requests/operation |
| **kitsu** | **102** | **1.04x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **25,771** | **1x** | **2 requests/operation** |
| kitsu | 13,441 | 1.92x slower | 2 requests/operation |
| fetchja | 23,320 | 1.11x slower | 2 requests/operation |
| devour | 11,030 | 2.34x slower | 2 requests/operation |
| @bjornharrtell/json-api | 11,948 | 2.16x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **24,419** | **1x** | **2 requests/operation** |
| kitsu | 12,993 | 1.88x slower | 2 requests/operation |
| fetchja | 21,404 | 1.14x slower | 2 requests/operation |
| devour | 10,466 | 2.33x slower | 2 requests/operation |
| @bjornharrtell/json-api | 10,555 | 2.31x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

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
