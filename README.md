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

Local measurements. Master CI refreshes this section automatically.

### bun 1\.4\.3

Base commit (local changes measured): `50a93d9d37b9ee47927963da12e3cc2ecedaa309`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,337,574 | 1x |  |
| **devour** | **1,566,204** | **1.17x faster** |  |
| yayson | 935,917 | 1.43x slower |  |
| jsona | 1,393,696 | 1.04x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 978,425 | 1x |  |
| devour | 1,080,216 | 1.1x faster |  |
| yayson | 625,750 | 1.56x slower |  |
| **jsona** | **1,209,001** | **1.24x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **401,023** | **1x** |  |
| devour | 340,341 | 1.18x slower |  |
| yayson | 243,184 | 1.65x slower |  |
| jsona | 346,074 | 1.16x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **542,567** | **1x** |  |
| devour | 380,309 | 1.43x slower |  |
| yayson | 328,013 | 1.65x slower |  |
| jsona | 393,767 | 1.38x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 88,720 | 1x |  |
| devour | 120,096 | 1.35x faster |  |
| yayson | 85,995 | 1.03x slower |  |
| **jsona** | **296,962** | **3.35x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 71,240 | 1x |  |
| devour | 142,030 | 1.99x faster |  |
| yayson | 125,504 | 1.76x faster |  |
| **jsona** | **157,610** | **2.21x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,423,558** | **1x** |  |
| devour | 2,011,146 | 1.21x slower |  |
| yayson | 986,533 | 2.46x slower |  |
| jsona | 1,531,382 | 1.58x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 951,970 | 1x |  |
| devour | 789,893 | 1.21x slower |  |
| yayson | 759,733 | 1.25x slower |  |
| **jsona** | **1,060,647** | **1.11x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,042** | **1x** |  |
| devour | 576 | 1.81x slower |  |
| yayson | 760 | 1.37x slower |  |
| jsona | 630 | 1.65x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **598** | **1x** |  |
| devour | 8.41 | 71.15x slower |  |
| yayson | 41.93 | 14.26x slower |  |
| jsona | 227 | 2.63x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **85.46** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 1 | 85.52x slower |  |
| jsona | 30.87 | 2.77x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **558** | **1x** |  |
| devour | 5.46 | 102x slower |  |
| yayson | 23.9 | 23.34x slower |  |
| jsona | 192 | 2.91x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **472,348** | **1x** |  |
| devour | 337,474 | 1.4x slower |  |
| yayson | 292,424 | 1.62x slower |  |
| jsona | 332,668 | 1.42x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **399,814** | **1x** |  |
| devour | 272,906 | 1.47x slower |  |
| yayson | 244,100 | 1.64x slower |  |
| jsona | 273,652 | 1.46x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,147,685 | 1x |  |
| **devour** | **3,593,677** | **1.67x faster** |  |
| yayson | 1,972,137 | 1.09x slower |  |
| jsona | 2,301,961 | 1.07x faster |  |
| ts-japi | 881,859 | 2.44x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,951,296 | 1x |  |
| devour | 2,330,923 | 1.19x faster |  |
| yayson | 1,660,876 | 1.17x slower |  |
| **jsona** | **2,461,822** | **1.26x faster** |  |
| ts-japi | 907,864 | 2.15x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,171,039 | 1x |  |
| **devour** | **1,425,572** | **1.22x faster** |  |
| yayson | 1,116,265 | 1.05x slower |  |
| jsona | 1,020,179 | 1.15x slower |  |
| ts-japi | 455,296 | 2.57x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,997,759** | **1x** |  |
| devour | 1,641,891 | 1.22x slower |  |
| yayson | 1,025,935 | 1.95x slower |  |
| jsona | 1,009,434 | 1.98x slower |  |
| ts-japi | 476,602 | 4.19x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 167,441 | 1x |  |
| devour | 180,069 | 1.08x faster |  |
| yayson | 230,518 | 1.38x faster |  |
| **jsona** | **546,683** | **3.26x faster** |  |
| ts-japi | 302,884 | 1.81x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 85,305 | 1x |  |
| devour | 271,981 | 3.19x faster |  |
| yayson | 283,236 | 3.32x faster |  |
| **jsona** | **359,721** | **4.22x faster** |  |
| ts-japi | 187,763 | 2.2x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **6,392,691** | **1x** |  |
| devour | 5,448,383 | 1.17x slower |  |
| yayson | 2,119,372 | 3.02x slower |  |
| jsona | 3,218,061 | 1.99x slower |  |
| ts-japi | 945,416 | 6.76x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,390,774 | 1x |  |
| **devour** | **1,508,494** | **1.08x faster** |  |
| yayson | 1,064,218 | 1.31x slower |  |
| jsona | 1,365,497 | 1.02x slower |  |
| ts-japi | 549,878 | 2.53x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,305 | 1x |  |
| **devour** | **2,107** | **1.61x faster** |  |
| yayson | 1,305 | <1.01x slower |  |
| jsona | 1,268 | 1.03x slower |  |
| ts-japi | 703 | 1.86x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,283 | 1x |  |
| **devour** | **2,040** | **1.59x faster** |  |
| yayson | 1,370 | 1.07x faster |  |
| jsona | 1,321 | 1.03x faster |  |
| ts-japi | 689 | 1.86x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 705 | 1x |  |
| **devour** | **1,253** | **1.78x faster** |  |
| yayson | 1,088 | 1.54x faster |  |
| jsona | 679 | 1.04x slower |  |
| ts-japi | 513 | 1.37x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 6,798 | 1x |  |
| **devour** | **21,845** | **3.21x faster** |  |
| yayson | 16,198 | 2.38x faster |  |
| jsona | 6,180 | 1.1x slower |  |
| ts-japi | 10,594 | 1.56x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,041,445** | **1x** |  |
| devour | 1,639,514 | 1.25x slower |  |
| yayson | 1,033,136 | 1.98x slower |  |
| jsona | 1,314,756 | 1.55x slower |  |
| ts-japi | 483,330 | 4.22x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,999,761** | **1x** |  |
| devour | 1,332,743 | 1.5x slower |  |
| yayson | 1,097,183 | 1.82x slower |  |
| jsona | 1,010,838 | 1.98x slower |  |
| ts-japi | 456,067 | 4.38x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 658,551 | 1x |  |
| **devour** | **930,124** | **1.41x faster** |  |
| yayson | 577,208 | 1.14x slower |  |
| jsona | 786,754 | 1.19x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 552,352 | 1x |  |
| devour | 613,749 | 1.11x faster |  |
| yayson | 421,884 | 1.31x slower |  |
| **jsona** | **690,739** | **1.25x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **240,607** | **1x** |  |
| devour | 237,754 | 1.01x slower |  |
| yayson | 176,523 | 1.36x slower |  |
| jsona | 224,091 | 1.07x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **317,119** | **1x** |  |
| devour | 271,448 | 1.17x slower |  |
| yayson | 228,526 | 1.39x slower |  |
| jsona | 254,142 | 1.25x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 50,690 | 1x |  |
| devour | 60,921 | 1.2x faster |  |
| yayson | 59,284 | 1.17x faster |  |
| **jsona** | **141,543** | **2.79x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 36,520 | 1x |  |
| devour | 81,843 | 2.24x faster |  |
| yayson | 78,971 | 2.16x faster |  |
| **jsona** | **94,765** | **2.59x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,227,350** | **1x** |  |
| devour | 1,040,343 | 1.18x slower |  |
| yayson | 627,546 | 1.96x slower |  |
| jsona | 811,625 | 1.51x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 428,226 | 1x |  |
| devour | 417,396 | 1.03x slower |  |
| yayson | 373,582 | 1.15x slower |  |
| **jsona** | **458,919** | **1.07x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **433** | **1x** |  |
| devour | 365 | 1.19x slower |  |
| yayson | 313 | 1.38x slower |  |
| jsona | 345 | 1.25x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **317** | **1x** |  |
| devour | 7.9 | 40.13x slower |  |
| yayson | 38.95 | 8.14x slower |  |
| jsona | 162 | 1.96x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **65.17** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 1 | 65.03x slower |  |
| jsona | 25.95 | 2.51x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **453** | **1x** |  |
| devour | 5.56 | 81.41x slower |  |
| yayson | 24.64 | 18.37x slower |  |
| jsona | 164 | 2.76x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **292,584** | **1x** |  |
| devour | 248,048 | 1.18x slower |  |
| yayson | 210,590 | 1.39x slower |  |
| jsona | 224,225 | 1.3x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **271,074** | **1x** |  |
| devour | 200,574 | 1.35x slower |  |
| yayson | 174,946 | 1.55x slower |  |
| jsona | 191,940 | 1.41x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 250,503 | 1x | 1 request/operation |
| kitsu | 71,429 | 3.51x slower | 1 request/operation |
| fetchja | 267,246 | 1.07x faster | 1 request/operation |
| devour | 65,774 | 3.81x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **269,501** | **1.08x faster** | **1 request/operation** |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 227,947 | 1x | 1 request/operation |
| kitsu | 66,917 | 3.41x slower | 1 request/operation |
| **fetchja** | **240,530** | **1.06x faster** | **1 request/operation** |
| devour | 58,734 | 3.88x slower | 1 request/operation |
| @bjornharrtell/json-api | 235,493 | 1.03x faster | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 129,262 | 1x | 1 request/operation |
| kitsu | 46,538 | 2.78x slower | 1 request/operation |
| fetchja | 133,452 | 1.03x faster | 1 request/operation |
| devour | 47,294 | 2.73x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **144,898** | **1.12x faster** | **1 request/operation** |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **170,838** | **1x** | **1 request/operation** |
| kitsu | 59,630 | 2.86x slower | 1 request/operation |
| fetchja | 145,022 | 1.18x slower | 1 request/operation |
| devour | 50,507 | 3.38x slower | 1 request/operation |
| @bjornharrtell/json-api | 159,295 | 1.07x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 22,783 | 1x | 1 request/operation |
| kitsu | 21,644 | 1.05x slower | 1 request/operation |
| fetchja | 40,272 | 1.77x faster | 1 request/operation |
| devour | 20,994 | 1.09x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **42,369** | **1.86x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 22,673 | 1x | 1 request/operation |
| kitsu | 20,777 | 1.09x slower | 1 request/operation |
| fetchja | 39,322 | 1.73x faster | 1 request/operation |
| devour | 24,233 | 1.07x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **45,350** | **2x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **323,183** | **1x** | **1 request/operation** |
| kitsu | 75,958 | 4.25x slower | 1 request/operation |
| fetchja | 295,056 | 1.1x slower | 1 request/operation |
| devour | 67,295 | 4.8x slower | 1 request/operation |
| @bjornharrtell/json-api | 302,019 | 1.07x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 218,645 | 1x | 1 request/operation |
| kitsu | 69,820 | 3.13x slower | 1 request/operation |
| **fetchja** | **230,367** | **1.05x faster** | **1 request/operation** |
| devour | 56,826 | 3.85x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **676** | **1x** | **1 request/operation** |
| kitsu | 664 | 1.02x slower | 1 request/operation |
| fetchja | 588 | 1.15x slower | 1 request/operation |
| devour | 447 | 1.51x slower | 1 request/operation |
| @bjornharrtell/json-api | 614 | 1.1x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **302** | **1x** | **1 request/operation** |
| kitsu | 298 | 1.01x slower | 1 request/operation |
| fetchja | 241 | 1.26x slower | 1 request/operation |
| devour | 10.97 | 27.54x slower | 1 request/operation |
| @bjornharrtell/json-api | 237 | 1.27x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 45.82 | 1x | 1 request/operation |
| **kitsu** | **46.93** | **1.02x faster** | **1 request/operation** |
| fetchja | 37.09 | 1.24x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 33.39 | 1.37x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 285 | 1x | 1 request/operation |
| **kitsu** | **288** | **1.01x faster** | **1 request/operation** |
| fetchja | 219 | 1.3x slower | 1 request/operation |
| devour | 6.84 | 41.64x slower | 1 request/operation |
| @bjornharrtell/json-api | 213 | 1.34x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **160,836** | **1x** | **1 request/operation** |
| kitsu | 57,715 | 2.79x slower | 1 request/operation |
| fetchja | 139,733 | 1.15x slower | 1 request/operation |
| devour | 47,699 | 3.37x slower | 1 request/operation |
| @bjornharrtell/json-api | 153,629 | 1.05x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **141,462** | **1x** | **1 request/operation** |
| kitsu | 56,055 | 2.52x slower | 1 request/operation |
| fetchja | 122,627 | 1.15x slower | 1 request/operation |
| devour | 43,851 | 3.23x slower | 1 request/operation |
| @bjornharrtell/json-api | 129,094 | 1.1x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **329,367** | **1x** | **1 request/operation** |
| kitsu | 63,984 | 5.15x slower | 1 request/operation |
| fetchja | 305,235 | 1.08x slower | 1 request/operation |
| devour | 59,121 | 5.57x slower | 1 request/operation |
| @bjornharrtell/json-api | 134,150 | 2.46x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **335,788** | **1x** | **1 request/operation** |
| kitsu | 64,585 | 5.2x slower | 1 request/operation |
| fetchja | 296,598 | 1.13x slower | 1 request/operation |
| devour | 55,357 | 6.07x slower | 1 request/operation |
| @bjornharrtell/json-api | 124,922 | 2.69x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **236,903** | **1x** | **1 request/operation** |
| kitsu | 52,264 | 4.53x slower | 1 request/operation |
| fetchja | 216,363 | 1.09x slower | 1 request/operation |
| devour | 48,690 | 4.87x slower | 1 request/operation |
| @bjornharrtell/json-api | 87,199 | 2.72x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **314,706** | **1x** | **1 request/operation** |
| kitsu | 59,405 | 5.3x slower | 1 request/operation |
| fetchja | 255,625 | 1.23x slower | 1 request/operation |
| devour | 52,410 | 6x slower | 1 request/operation |
| @bjornharrtell/json-api | 100,322 | 3.14x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **43,766** | **1x** | **1 request/operation** |
| kitsu | 25,587 | 1.71x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **23,116** | **1x** | **1 request/operation** |
| kitsu | 16,368 | 1.41x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **438,163** | **1x** | **1 request/operation** |
| kitsu | 73,191 | 5.99x slower | 1 request/operation |
| fetchja | 348,784 | 1.26x slower | 1 request/operation |
| devour | 62,523 | 7.01x slower | 1 request/operation |
| @bjornharrtell/json-api | 150,897 | 2.9x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **268,920** | **1x** | **1 request/operation** |
| kitsu | 55,032 | 4.89x slower | 1 request/operation |
| fetchja | 256,948 | 1.05x slower | 1 request/operation |
| devour | 51,785 | 5.19x slower | 1 request/operation |
| @bjornharrtell/json-api | 120,906 | 2.22x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **623** | **1x** | **1 request/operation** |
| kitsu | 576 | 1.08x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **526** | **1x** | **1 request/operation** |
| kitsu | 500 | 1.05x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 175 | 1x | 1 request/operation |
| **kitsu** | **180** | **1.03x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **1,153** | **1x** | **1 request/operation** |
| kitsu | 1,081 | 1.07x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **301,863** | **1x** | **1 request/operation** |
| kitsu | 60,560 | 4.98x slower | 1 request/operation |
| fetchja | 254,737 | 1.18x slower | 1 request/operation |
| devour | 50,727 | 5.95x slower | 1 request/operation |
| @bjornharrtell/json-api | 94,602 | 3.19x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **303,034** | **1x** | **1 request/operation** |
| kitsu | 58,520 | 5.18x slower | 1 request/operation |
| fetchja | 254,233 | 1.19x slower | 1 request/operation |
| devour | 51,699 | 5.86x slower | 1 request/operation |
| @bjornharrtell/json-api | 89,016 | 3.4x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **135,900** | **1x** | **2 requests/operation** |
| kitsu | 33,302 | 4.08x slower | 2 requests/operation |
| fetchja | 133,005 | 1.02x slower | 2 requests/operation |
| devour | 29,352 | 4.63x slower | 2 requests/operation |
| @bjornharrtell/json-api | 87,766 | 1.55x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 117,099 | 1x | 2 requests/operation |
| kitsu | 31,763 | 3.69x slower | 2 requests/operation |
| **fetchja** | **124,490** | **1.06x faster** | **2 requests/operation** |
| devour | 27,102 | 4.32x slower | 2 requests/operation |
| @bjornharrtell/json-api | 82,311 | 1.42x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **73,798** | **1x** | **2 requests/operation** |
| kitsu | 24,188 | 3.05x slower | 2 requests/operation |
| fetchja | 73,734 | <1.01x slower | 2 requests/operation |
| devour | 22,018 | 3.35x slower | 2 requests/operation |
| @bjornharrtell/json-api | 53,064 | 1.39x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **94,312** | **1x** | **2 requests/operation** |
| kitsu | 29,100 | 3.24x slower | 2 requests/operation |
| fetchja | 86,023 | 1.1x slower | 2 requests/operation |
| devour | 23,441 | 4.02x slower | 2 requests/operation |
| @bjornharrtell/json-api | 58,552 | 1.61x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **13,992** | **1x** | **2 requests/operation** |
| kitsu | 10,856 | 1.29x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **11,013** | **1x** | **2 requests/operation** |
| kitsu | 8,902 | 1.24x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **164,109** | **1x** | **2 requests/operation** |
| kitsu | 37,734 | 4.35x slower | 2 requests/operation |
| fetchja | 146,961 | 1.12x slower | 2 requests/operation |
| devour | 32,097 | 5.11x slower | 2 requests/operation |
| @bjornharrtell/json-api | 97,306 | 1.69x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 106,008 | 1x | 2 requests/operation |
| kitsu | 29,259 | 3.62x slower | 2 requests/operation |
| **fetchja** | **108,678** | **1.03x faster** | **2 requests/operation** |
| devour | 25,143 | 4.22x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 273 | 1x | 2 requests/operation |
| **kitsu** | **277** | **1.01x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **175** | **1x** | **2 requests/operation** |
| kitsu | 172 | 1.02x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 33.62 | 1x | 2 requests/operation |
| **kitsu** | **34.65** | **1.03x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **217** | **1x** | **2 requests/operation** |
| kitsu | 211 | 1.03x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **90,823** | **1x** | **2 requests/operation** |
| kitsu | 28,435 | 3.19x slower | 2 requests/operation |
| fetchja | 78,768 | 1.15x slower | 2 requests/operation |
| devour | 23,111 | 3.93x slower | 2 requests/operation |
| @bjornharrtell/json-api | 54,453 | 1.67x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **81,548** | **1x** | **2 requests/operation** |
| kitsu | 26,586 | 3.07x slower | 2 requests/operation |
| fetchja | 70,313 | 1.16x slower | 2 requests/operation |
| devour | 22,603 | 3.61x slower | 2 requests/operation |
| @bjornharrtell/json-api | 50,717 | 1.61x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

</details>

### node v26\.5\.0

Base commit (local changes measured): `50a93d9d37b9ee47927963da12e3cc2ecedaa309`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,363,733 | 1x |  |
| **devour** | **1,725,920** | **1.27x faster** |  |
| yayson | 802,341 | 1.7x slower |  |
| jsona | 1,706,543 | 1.25x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,057,773 | 1x |  |
| devour | 846,687 | 1.25x slower |  |
| yayson | 627,347 | 1.69x slower |  |
| **jsona** | **1,578,420** | **1.49x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 346,866 | 1x |  |
| devour | 242,294 | 1.43x slower |  |
| yayson | 196,386 | 1.77x slower |  |
| **jsona** | **378,814** | **1.09x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **428,978** | **1x** |  |
| devour | 278,974 | 1.54x slower |  |
| yayson | 245,496 | 1.75x slower |  |
| jsona | 426,244 | 1.01x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 95,095 | 1x |  |
| devour | 65,422 | 1.45x slower |  |
| yayson | 119,556 | 1.26x faster |  |
| **jsona** | **316,515** | **3.33x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 64,497 | 1x |  |
| devour | 90,514 | 1.4x faster |  |
| yayson | 105,721 | 1.64x faster |  |
| **jsona** | **132,666** | **2.06x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,434,569** | **1x** |  |
| devour | 2,300,935 | 1.06x slower |  |
| yayson | 818,744 | 2.97x slower |  |
| jsona | 2,140,633 | 1.14x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,019,676 | 1x |  |
| devour | 592,106 | 1.72x slower |  |
| yayson | 656,062 | 1.55x slower |  |
| **jsona** | **1,316,928** | **1.29x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **708** | **1x** |  |
| devour | 395 | 1.79x slower |  |
| yayson | 476 | 1.49x slower |  |
| jsona | 548 | 1.29x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **310** | **1x** |  |
| devour | 4.57 | 67.88x slower |  |
| yayson | 19.82 | 15.66x slower |  |
| jsona | 213 | 1.46x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **41.77** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.53 | 78.37x slower |  |
| jsona | 23.71 | 1.76x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **299** | **1x** |  |
| devour | 2.93 | 102x slower |  |
| yayson | 11.89 | 25.14x slower |  |
| jsona | 182 | 1.64x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 369,350 | 1x |  |
| devour | 232,944 | 1.59x slower |  |
| yayson | 221,073 | 1.67x slower |  |
| **jsona** | **373,966** | **1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **314,147** | **1x** |  |
| devour | 180,629 | 1.74x slower |  |
| yayson | 180,880 | 1.74x slower |  |
| jsona | 289,850 | 1.08x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,756,185 | 1x |  |
| devour | 2,919,007 | 1.66x faster |  |
| yayson | 1,675,917 | 1.05x slower |  |
| **jsona** | **3,262,104** | **1.86x faster** |  |
| ts-japi | 711,165 | 2.47x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,759,402 | 1x |  |
| devour | 1,328,527 | 1.32x slower |  |
| yayson | 1,335,011 | 1.32x slower |  |
| **jsona** | **3,257,688** | **1.85x faster** |  |
| ts-japi | 699,515 | 2.52x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 917,037 | 1x |  |
| devour | 781,115 | 1.17x slower |  |
| yayson | 806,303 | 1.14x slower |  |
| **jsona** | **1,590,309** | **1.73x faster** |  |
| ts-japi | 439,538 | 2.09x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,549,111 | 1x |  |
| devour | 943,715 | 1.64x slower |  |
| yayson | 918,893 | 1.69x slower |  |
| **jsona** | **1,975,495** | **1.28x faster** |  |
| ts-japi | 503,196 | 3.08x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 188,044 | 1x |  |
| devour | 74,213 | 2.53x slower |  |
| yayson | 223,347 | 1.19x faster |  |
| **jsona** | **816,862** | **4.34x faster** |  |
| ts-japi | 252,125 | 1.34x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 80,450 | 1x |  |
| devour | 176,205 | 2.19x faster |  |
| yayson | 261,018 | 3.24x faster |  |
| **jsona** | **427,277** | **5.31x faster** |  |
| ts-japi | 166,249 | 2.07x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 4,201,904 | 1x |  |
| **devour** | **6,024,063** | **1.43x faster** |  |
| yayson | 2,292,880 | 1.83x slower |  |
| jsona | 4,486,908 | 1.07x faster |  |
| ts-japi | 781,568 | 5.38x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,295,670 | 1x |  |
| devour | 842,938 | 1.54x slower |  |
| yayson | 870,774 | 1.49x slower |  |
| **jsona** | **1,870,305** | **1.44x faster** |  |
| ts-japi | 509,592 | 2.54x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 780 | 1x |  |
| devour | 876 | 1.12x faster |  |
| yayson | 775 | 1.01x slower |  |
| **jsona** | **1,627** | **2.09x faster** |  |
| ts-japi | 458 | 1.7x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 692 | 1x |  |
| devour | 879 | 1.27x faster |  |
| yayson | 778 | 1.12x faster |  |
| **jsona** | **1,640** | **2.37x faster** |  |
| ts-japi | 371 | 1.86x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 357 | 1x |  |
| **devour** | **578** | **1.62x faster** |  |
| yayson | 347 | 1.03x slower |  |
| jsona | 429 | 1.2x faster |  |
| ts-japi | 234 | 1.53x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 3,129 | 1x |  |
| devour | 9,791 | 3.13x faster |  |
| yayson | 7,762 | 2.48x faster |  |
| jsona | 6,249 | 2x faster |  |
| **ts-japi** | **10,988** | **3.51x faster** |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,539,439 | 1x |  |
| devour | 935,429 | 1.65x slower |  |
| yayson | 908,077 | 1.7x slower |  |
| **jsona** | **2,099,065** | **1.36x faster** |  |
| ts-japi | 501,753 | 3.07x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,496,303 | 1x |  |
| devour | 942,852 | 1.59x slower |  |
| yayson | 869,547 | 1.72x slower |  |
| **jsona** | **2,093,491** | **1.4x faster** |  |
| ts-japi | 500,854 | 2.99x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 708,227 | 1x |  |
| **devour** | **991,853** | **1.4x faster** |  |
| yayson | 490,441 | 1.44x slower |  |
| jsona | 983,357 | 1.39x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 606,475 | 1x |  |
| devour | 475,822 | 1.27x slower |  |
| yayson | 395,540 | 1.53x slower |  |
| **jsona** | **925,945** | **1.53x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 234,836 | 1x |  |
| devour | 175,866 | 1.34x slower |  |
| yayson | 138,650 | 1.69x slower |  |
| **jsona** | **277,297** | **1.18x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 305,533 | 1x |  |
| devour | 205,203 | 1.49x slower |  |
| yayson | 173,459 | 1.76x slower |  |
| **jsona** | **324,734** | **1.06x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 56,280 | 1x |  |
| devour | 33,366 | 1.69x slower |  |
| yayson | 74,128 | 1.32x faster |  |
| **jsona** | **165,859** | **2.95x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 31,243 | 1x |  |
| devour | 53,140 | 1.7x faster |  |
| yayson | 63,178 | 2.02x faster |  |
| **jsona** | **79,871** | **2.56x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,465,240 | 1x |  |
| **devour** | **1,500,531** | **1.02x faster** |  |
| yayson | 562,587 | 2.6x slower |  |
| jsona | 1,315,148 | 1.11x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 486,844 | 1x |  |
| devour | 309,788 | 1.57x slower |  |
| yayson | 313,587 | 1.55x slower |  |
| **jsona** | **660,460** | **1.36x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 321 | 1x |  |
| devour | 249 | 1.29x slower |  |
| yayson | 261 | 1.23x slower |  |
| **jsona** | **324** | **1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **196** | **1x** |  |
| devour | 4.01 | 48.95x slower |  |
| yayson | 18.65 | 10.53x slower |  |
| jsona | 152 | 1.29x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **33.66** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.54 | 62.9x slower |  |
| jsona | 23.21 | 1.45x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **261** | **1x** |  |
| devour | 2.9 | 90.27x slower |  |
| yayson | 11.88 | 22.01x slower |  |
| jsona | 181 | 1.45x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 278,341 | 1x |  |
| devour | 171,384 | 1.62x slower |  |
| yayson | 163,229 | 1.71x slower |  |
| **jsona** | **285,591** | **1.03x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **240,200** | **1x** |  |
| devour | 144,947 | 1.66x slower |  |
| yayson | 135,629 | 1.77x slower |  |
| jsona | 230,674 | 1.04x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **102,277** | **1x** | **1 request/operation** |
| kitsu | 58,972 | 1.73x slower | 1 request/operation |
| fetchja | 79,277 | 1.29x slower | 1 request/operation |
| devour | 51,141 | 2x slower | 1 request/operation |
| @bjornharrtell/json-api | 92,117 | 1.11x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **93,847** | **1x** | **1 request/operation** |
| kitsu | 54,769 | 1.71x slower | 1 request/operation |
| fetchja | 78,165 | 1.2x slower | 1 request/operation |
| devour | 46,249 | 2.03x slower | 1 request/operation |
| @bjornharrtell/json-api | 86,425 | 1.09x slower | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **57,544** | **1x** | **1 request/operation** |
| kitsu | 40,692 | 1.41x slower | 1 request/operation |
| fetchja | 51,074 | 1.13x slower | 1 request/operation |
| devour | 34,814 | 1.65x slower | 1 request/operation |
| @bjornharrtell/json-api | 56,203 | 1.02x slower | 1 request/operation |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **65,940** | **1x** | **1 request/operation** |
| kitsu | 45,366 | 1.45x slower | 1 request/operation |
| fetchja | 58,134 | 1.13x slower | 1 request/operation |
| devour | 36,364 | 1.81x slower | 1 request/operation |
| @bjornharrtell/json-api | 62,089 | 1.06x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 14,539 | 1x | 1 request/operation |
| **kitsu** | **17,438** | **1.2x faster** | **1 request/operation** |
| fetchja | 14,779 | 1.02x faster | 1 request/operation |
| devour | 15,500 | 1.07x faster | 1 request/operation |
| @bjornharrtell/json-api | 16,656 | 1.15x faster | 1 request/operation |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 14,479 | 1x | 1 request/operation |
| kitsu | 16,558 | 1.14x faster | 1 request/operation |
| fetchja | 13,937 | 1.04x slower | 1 request/operation |
| **devour** | **17,568** | **1.21x faster** | **1 request/operation** |
| @bjornharrtell/json-api | 16,703 | 1.15x faster | 1 request/operation |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **122,213** | **1x** | **1 request/operation** |
| kitsu | 63,600 | 1.92x slower | 1 request/operation |
| fetchja | 98,562 | 1.24x slower | 1 request/operation |
| devour | 54,718 | 2.23x slower | 1 request/operation |
| @bjornharrtell/json-api | 103,996 | 1.18x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **91,500** | **1x** | **1 request/operation** |
| kitsu | 54,370 | 1.68x slower | 1 request/operation |
| fetchja | 78,669 | 1.16x slower | 1 request/operation |
| devour | 44,847 | 2.04x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 383 | 1x | 1 request/operation |
| **kitsu** | **399** | **1.04x faster** | **1 request/operation** |
| fetchja | 313 | 1.22x slower | 1 request/operation |
| devour | 258 | 1.48x slower | 1 request/operation |
| @bjornharrtell/json-api | 352 | 1.09x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 160 | 1x | 1 request/operation |
| **kitsu** | **167** | **1.04x faster** | **1 request/operation** |
| fetchja | 132 | 1.22x slower | 1 request/operation |
| devour | 6.86 | 23.36x slower | 1 request/operation |
| @bjornharrtell/json-api | 146 | 1.1x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 23.87 | 1x | 1 request/operation |
| **kitsu** | **26.38** | **1.11x faster** | **1 request/operation** |
| fetchja | 18.63 | 1.28x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 20.31 | 1.18x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 159 | 1x | 1 request/operation |
| **kitsu** | **168** | **1.06x faster** | **1 request/operation** |
| fetchja | 124 | 1.28x slower | 1 request/operation |
| devour | 3.5 | 45.31x slower | 1 request/operation |
| @bjornharrtell/json-api | 134 | 1.18x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **62,781** | **1x** | **1 request/operation** |
| kitsu | 43,309 | 1.45x slower | 1 request/operation |
| fetchja | 51,356 | 1.22x slower | 1 request/operation |
| devour | 34,327 | 1.83x slower | 1 request/operation |
| @bjornharrtell/json-api | 55,219 | 1.14x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **52,925** | **1x** | **1 request/operation** |
| kitsu | 40,969 | 1.29x slower | 1 request/operation |
| fetchja | 47,085 | 1.12x slower | 1 request/operation |
| devour | 31,475 | 1.68x slower | 1 request/operation |
| @bjornharrtell/json-api | 50,928 | 1.04x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **266,810** | **1x** | **1 request/operation** |
| kitsu | 47,730 | 5.59x slower | 1 request/operation |
| fetchja | 189,818 | 1.41x slower | 1 request/operation |
| devour | 49,629 | 5.38x slower | 1 request/operation |
| @bjornharrtell/json-api | 25,582 | 10.43x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **276,652** | **1x** | **1 request/operation** |
| kitsu | 50,955 | 5.43x slower | 1 request/operation |
| fetchja | 192,177 | 1.44x slower | 1 request/operation |
| devour | 47,189 | 5.86x slower | 1 request/operation |
| @bjornharrtell/json-api | 25,959 | 10.66x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **170,641** | **1x** | **1 request/operation** |
| kitsu | 43,422 | 3.93x slower | 1 request/operation |
| fetchja | 139,392 | 1.22x slower | 1 request/operation |
| devour | 37,856 | 4.51x slower | 1 request/operation |
| @bjornharrtell/json-api | 20,917 | 8.16x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **233,841** | **1x** | **1 request/operation** |
| kitsu | 48,469 | 4.82x slower | 1 request/operation |
| fetchja | 167,077 | 1.4x slower | 1 request/operation |
| devour | 43,223 | 5.41x slower | 1 request/operation |
| @bjornharrtell/json-api | 22,118 | 10.57x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **37,948** | **1x** | **1 request/operation** |
| kitsu | 21,933 | 1.73x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **19,651** | **1x** | **1 request/operation** |
| kitsu | 13,978 | 1.41x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **373,594** | **1x** | **1 request/operation** |
| kitsu | 58,333 | 6.4x slower | 1 request/operation |
| fetchja | 241,039 | 1.55x slower | 1 request/operation |
| devour | 54,370 | 6.87x slower | 1 request/operation |
| @bjornharrtell/json-api | 30,198 | 12.37x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **224,719** | **1x** | **1 request/operation** |
| kitsu | 46,313 | 4.85x slower | 1 request/operation |
| fetchja | 171,126 | 1.31x slower | 1 request/operation |
| devour | 43,239 | 5.2x slower | 1 request/operation |
| @bjornharrtell/json-api | 25,503 | 8.81x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **321** | **1x** | **1 request/operation** |
| kitsu | 298 | 1.08x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 301 | 1x | 1 request/operation |
| **kitsu** | **316** | **1.05x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **125** | **1x** | **1 request/operation** |
| kitsu | 115 | 1.09x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **975** | **1x** | **1 request/operation** |
| kitsu | 884 | 1.1x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **234,806** | **1x** | **1 request/operation** |
| kitsu | 47,746 | 4.92x slower | 1 request/operation |
| fetchja | 169,900 | 1.38x slower | 1 request/operation |
| devour | 42,888 | 5.47x slower | 1 request/operation |
| @bjornharrtell/json-api | 21,655 | 10.84x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **214,976** | **1x** | **1 request/operation** |
| kitsu | 48,022 | 4.48x slower | 1 request/operation |
| fetchja | 161,748 | 1.33x slower | 1 request/operation |
| devour | 42,870 | 5.01x slower | 1 request/operation |
| @bjornharrtell/json-api | 20,847 | 10.31x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **68,988** | **1x** | **2 requests/operation** |
| kitsu | 26,945 | 2.56x slower | 2 requests/operation |
| fetchja | 51,985 | 1.33x slower | 2 requests/operation |
| devour | 24,599 | 2.8x slower | 2 requests/operation |
| @bjornharrtell/json-api | 20,400 | 3.38x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **59,912** | **1x** | **2 requests/operation** |
| kitsu | 25,279 | 2.37x slower | 2 requests/operation |
| fetchja | 50,781 | 1.18x slower | 2 requests/operation |
| devour | 22,609 | 2.65x slower | 2 requests/operation |
| @bjornharrtell/json-api | 19,869 | 3.02x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **37,861** | **1x** | **2 requests/operation** |
| kitsu | 19,735 | 1.92x slower | 2 requests/operation |
| fetchja | 31,232 | 1.21x slower | 2 requests/operation |
| devour | 18,007 | 2.1x slower | 2 requests/operation |
| @bjornharrtell/json-api | 14,795 | 2.56x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **46,871** | **1x** | **2 requests/operation** |
| kitsu | 21,961 | 2.13x slower | 2 requests/operation |
| fetchja | 36,805 | 1.27x slower | 2 requests/operation |
| devour | 19,143 | 2.45x slower | 2 requests/operation |
| @bjornharrtell/json-api | 16,034 | 2.92x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **9,854** | **1x** | **2 requests/operation** |
| kitsu | 9,277 | 1.06x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **7,663** | **1x** | **2 requests/operation** |
| kitsu | 7,361 | 1.04x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **86,937** | **1x** | **2 requests/operation** |
| kitsu | 30,521 | 2.85x slower | 2 requests/operation |
| fetchja | 61,738 | 1.41x slower | 2 requests/operation |
| devour | 26,455 | 3.29x slower | 2 requests/operation |
| @bjornharrtell/json-api | 22,780 | 3.82x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **56,877** | **1x** | **2 requests/operation** |
| kitsu | 24,713 | 2.3x slower | 2 requests/operation |
| fetchja | 47,101 | 1.21x slower | 2 requests/operation |
| devour | 21,584 | 2.64x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **170** | **1x** | **2 requests/operation** |
| kitsu | 166 | 1.02x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 95.51 | 1x | 2 requests/operation |
| **kitsu** | **108** | **1.13x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **19.87** | **1x** | **2 requests/operation** |
| kitsu | 19.57 | 1.02x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 135 | 1x | 2 requests/operation |
| **kitsu** | **139** | **1.03x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **43,032** | **1x** | **2 requests/operation** |
| kitsu | 21,966 | 1.96x slower | 2 requests/operation |
| fetchja | 33,653 | 1.28x slower | 2 requests/operation |
| devour | 18,455 | 2.33x slower | 2 requests/operation |
| @bjornharrtell/json-api | 15,312 | 2.81x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **38,316** | **1x** | **2 requests/operation** |
| kitsu | 20,559 | 1.86x slower | 2 requests/operation |
| fetchja | 31,788 | 1.21x slower | 2 requests/operation |
| devour | 17,681 | 2.17x slower | 2 requests/operation |
| @bjornharrtell/json-api | 15,067 | 2.54x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

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
