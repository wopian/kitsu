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

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/45234625153)

### bun 1\.4\.5

Measured commit: `5de72653e8527e430e2fa782a21612ff53010287`. Runner: linux x64, AMD EPYC 9V74 80-Core Processor.

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,195,318 | 1x |  |
| **devour** | **1,488,246** | **1.25x faster** |  |
| yayson | 774,032 | 1.54x slower |  |
| jsona | 1,316,813 | 1.1x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 868,050 | 1x |  |
| devour | 873,330 | 1.01x faster |  |
| yayson | 512,597 | 1.69x slower |  |
| **jsona** | **1,041,626** | **1.2x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **347,650** | **1x** |  |
| devour | 280,539 | 1.24x slower |  |
| yayson | 213,360 | 1.63x slower |  |
| jsona | 329,747 | 1.05x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **464,329** | **1x** |  |
| devour | 342,463 | 1.36x slower |  |
| yayson | 265,549 | 1.75x slower |  |
| jsona | 386,477 | 1.2x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 96,048 | 1x |  |
| devour | 105,506 | 1.1x faster |  |
| yayson | 91,034 | 1.06x slower |  |
| **jsona** | **284,542** | **2.96x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 68,596 | 1x |  |
| devour | 124,281 | 1.81x faster |  |
| yayson | 111,578 | 1.63x faster |  |
| **jsona** | **154,137** | **2.25x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,991,347** | **1x** |  |
| devour | 1,588,523 | 1.25x slower |  |
| yayson | 837,703 | 2.38x slower |  |
| jsona | 1,380,893 | 1.44x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 901,922 | 1x |  |
| devour | 722,126 | 1.25x slower |  |
| yayson | 616,964 | 1.46x slower |  |
| **jsona** | **1,028,736** | **1.14x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **925** | **1x** |  |
| devour | 531 | 1.74x slower |  |
| yayson | 599 | 1.55x slower |  |
| jsona | 600 | 1.54x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **497** | **1x** |  |
| devour | 8.45 | 58.79x slower |  |
| yayson | 40.17 | 12.37x slower |  |
| jsona | 172 | 2.89x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **61.82** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.85 | 72.35x slower |  |
| jsona | 23.73 | 2.61x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **497** | **1x** |  |
| devour | 5.07 | 97.92x slower |  |
| yayson | 23.23 | 21.39x slower |  |
| jsona | 173 | 2.88x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **454,916** | **1x** |  |
| devour | 390,569 | 1.16x slower |  |
| yayson | 256,140 | 1.78x slower |  |
| jsona | 359,898 | 1.26x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **372,442** | **1x** |  |
| devour | 264,652 | 1.41x slower |  |
| yayson | 245,904 | 1.51x slower |  |
| jsona | 280,305 | 1.33x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,829,188 | 1x |  |
| **devour** | **3,690,019** | **2.02x faster** |  |
| yayson | 1,990,381 | 1.09x faster |  |
| jsona | 2,081,587 | 1.14x faster |  |
| ts-japi | 725,393 | 2.52x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,967,130 | 1x |  |
| devour | 1,999,621 | 1.02x faster |  |
| yayson | 1,548,486 | 1.27x slower |  |
| **jsona** | **2,329,237** | **1.18x faster** |  |
| ts-japi | 692,490 | 2.84x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,032,524 | 1x |  |
| **devour** | **1,267,219** | **1.23x faster** |  |
| yayson | 898,138 | 1.15x slower |  |
| jsona | 964,607 | 1.07x slower |  |
| ts-japi | 367,064 | 2.81x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,273,484** | **1x** |  |
| devour | 1,417,586 | 1.6x slower |  |
| yayson | 954,981 | 2.38x slower |  |
| jsona | 1,100,064 | 2.07x slower |  |
| ts-japi | 383,728 | 5.92x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 165,419 | 1x |  |
| devour | 182,782 | 1.1x faster |  |
| yayson | 253,314 | 1.53x faster |  |
| **jsona** | **673,982** | **4.07x faster** |  |
| ts-japi | 295,221 | 1.78x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 88,451 | 1x |  |
| devour | 272,087 | 3.08x faster |  |
| **yayson** | **324,125** | **3.66x faster** |  |
| jsona | 301,923 | 3.41x faster |  |
| ts-japi | 181,509 | 2.05x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **5,582,451** | **1x** |  |
| devour | 5,061,122 | 1.1x slower |  |
| yayson | 2,096,593 | 2.66x slower |  |
| jsona | 2,717,883 | 2.05x slower |  |
| ts-japi | 775,104 | 7.2x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,378,637 | 1x |  |
| **devour** | **1,529,970** | **1.11x faster** |  |
| yayson | 1,110,758 | 1.24x slower |  |
| jsona | 1,212,041 | 1.14x slower |  |
| ts-japi | 427,015 | 3.23x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,106 | 1x |  |
| **devour** | **1,713** | **1.55x faster** |  |
| yayson | 1,077 | 1.03x slower |  |
| jsona | 1,099 | 1.01x slower |  |
| ts-japi | 629 | 1.76x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,198 | 1x |  |
| **devour** | **1,588** | **1.33x faster** |  |
| yayson | 1,164 | 1.03x slower |  |
| jsona | 1,025 | 1.17x slower |  |
| ts-japi | 584 | 2.05x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 540 | 1x |  |
| devour | 747 | 1.38x faster |  |
| **yayson** | **833** | **1.54x faster** |  |
| jsona | 443 | 1.22x slower |  |
| ts-japi | 451 | 1.2x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 6,060 | 1x |  |
| **devour** | **17,284** | **2.85x faster** |  |
| yayson | 16,726 | 2.76x faster |  |
| jsona | 4,909 | 1.23x slower |  |
| ts-japi | 7,462 | 1.23x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,272,856** | **1x** |  |
| devour | 1,776,541 | 1.28x slower |  |
| yayson | 1,007,979 | 2.25x slower |  |
| jsona | 1,092,471 | 2.08x slower |  |
| ts-japi | 403,052 | 5.64x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,105,867** | **1x** |  |
| devour | 1,439,757 | 1.46x slower |  |
| yayson | 1,024,380 | 2.06x slower |  |
| jsona | 966,125 | 2.18x slower |  |
| ts-japi | 392,973 | 5.36x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 615,780 | 1x |  |
| **devour** | **820,960** | **1.33x faster** |  |
| yayson | 529,246 | 1.16x slower |  |
| jsona | 707,358 | 1.15x faster |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 470,759 | 1x |  |
| devour | 505,229 | 1.07x faster |  |
| yayson | 366,448 | 1.28x slower |  |
| **jsona** | **616,220** | **1.31x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 206,858 | 1x |  |
| devour | 200,270 | 1.03x slower |  |
| yayson | 161,487 | 1.28x slower |  |
| **jsona** | **220,132** | **1.06x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **296,604** | **1x** |  |
| devour | 242,588 | 1.22x slower |  |
| yayson | 196,116 | 1.51x slower |  |
| jsona | 239,905 | 1.24x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 52,251 | 1x |  |
| devour | 56,788 | 1.09x faster |  |
| yayson | 58,895 | 1.13x faster |  |
| **jsona** | **127,295** | **2.44x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 36,424 | 1x |  |
| devour | 70,886 | 1.95x faster |  |
| yayson | 75,945 | 2.09x faster |  |
| **jsona** | **92,306** | **2.53x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,126,065** | **1x** |  |
| devour | 962,949 | 1.17x slower |  |
| yayson | 546,220 | 2.06x slower |  |
| jsona | 736,895 | 1.53x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 419,761 | 1x |  |
| devour | 409,519 | 1.03x slower |  |
| yayson | 355,619 | 1.18x slower |  |
| **jsona** | **422,456** | **1.01x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **367** | **1x** |  |
| devour | 323 | 1.14x slower |  |
| yayson | 268 | 1.37x slower |  |
| jsona | 298 | 1.23x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **292** | **1x** |  |
| devour | 7.48 | 39.08x slower |  |
| yayson | 35.78 | 8.17x slower |  |
| jsona | 128 | 2.29x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **43.62** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.78 | 55.78x slower |  |
| jsona | 20.75 | 2.1x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **439** | **1x** |  |
| devour | 5.35 | 82.02x slower |  |
| yayson | 22.47 | 19.53x slower |  |
| jsona | 143 | 3.06x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **279,668** | **1x** |  |
| devour | 247,222 | 1.13x slower |  |
| yayson | 191,531 | 1.46x slower |  |
| jsona | 219,200 | 1.28x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **251,721** | **1x** |  |
| devour | 203,044 | 1.24x slower |  |
| yayson | 191,167 | 1.32x slower |  |
| jsona | 201,805 | 1.25x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 234,763 | 1x | 1 request/operation |
| kitsu | 69,747 | 3.37x slower | 1 request/operation |
| **fetchja** | **256,685** | **1.09x faster** | **1 request/operation** |
| devour | 62,045 | 3.78x slower | 1 request/operation |
| @bjornharrtell/json-api | 231,121 | 1.02x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 218,076 | 1x | 1 request/operation |
| kitsu | 64,297 | 3.39x slower | 1 request/operation |
| **fetchja** | **234,479** | **1.08x faster** | **1 request/operation** |
| devour | 57,015 | 3.82x slower | 1 request/operation |
| @bjornharrtell/json-api | 200,242 | 1.09x slower | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 124,533 | 1x | 1 request/operation |
| kitsu | 52,486 | 2.37x slower | 1 request/operation |
| fetchja | 134,436 | 1.08x faster | 1 request/operation |
| devour | 49,585 | 2.51x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **136,643** | **1.1x faster** | **1 request/operation** |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **154,353** | **1x** | **1 request/operation** |
| kitsu | 57,303 | 2.69x slower | 1 request/operation |
| fetchja | 149,370 | 1.03x slower | 1 request/operation |
| devour | 50,913 | 3.03x slower | 1 request/operation |
| @bjornharrtell/json-api | 148,109 | 1.04x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 21,282 | 1x | 1 request/operation |
| kitsu | 19,846 | 1.07x slower | 1 request/operation |
| fetchja | 35,878 | 1.69x faster | 1 request/operation |
| devour | 20,804 | 1.02x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **36,958** | **1.74x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 22,633 | 1x | 1 request/operation |
| kitsu | 19,895 | 1.14x slower | 1 request/operation |
| fetchja | 37,785 | 1.67x faster | 1 request/operation |
| devour | 22,487 | 1.01x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **40,683** | **1.8x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **300,703** | **1x** | **1 request/operation** |
| kitsu | 75,142 | 4x slower | 1 request/operation |
| fetchja | 279,942 | 1.07x slower | 1 request/operation |
| devour | 63,253 | 4.75x slower | 1 request/operation |
| @bjornharrtell/json-api | 247,442 | 1.22x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 228,318 | 1x | 1 request/operation |
| kitsu | 66,884 | 3.41x slower | 1 request/operation |
| **fetchja** | **260,901** | **1.14x faster** | **1 request/operation** |
| devour | 63,071 | 3.62x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 508 | 1x | 1 request/operation |
| **kitsu** | **508** | **<1.01x faster** | **1 request/operation** |
| fetchja | 434 | 1.17x slower | 1 request/operation |
| devour | 363 | 1.4x slower | 1 request/operation |
| @bjornharrtell/json-api | 448 | 1.13x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 220 | 1x | 1 request/operation |
| **kitsu** | **239** | **1.09x faster** | **1 request/operation** |
| fetchja | 190 | 1.16x slower | 1 request/operation |
| devour | 10.96 | 20.06x slower | 1 request/operation |
| @bjornharrtell/json-api | 193 | 1.14x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 34.68 | 1x | 1 request/operation |
| **kitsu** | **35.99** | **1.04x faster** | **1 request/operation** |
| fetchja | 28.16 | 1.23x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 26.63 | 1.3x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **261** | **1x** | **1 request/operation** |
| kitsu | 245 | 1.06x slower | 1 request/operation |
| fetchja | 196 | 1.33x slower | 1 request/operation |
| devour | 6.69 | 39x slower | 1 request/operation |
| @bjornharrtell/json-api | 190 | 1.37x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **179,110** | **1x** | **1 request/operation** |
| kitsu | 58,694 | 3.05x slower | 1 request/operation |
| fetchja | 164,253 | 1.09x slower | 1 request/operation |
| devour | 50,970 | 3.51x slower | 1 request/operation |
| @bjornharrtell/json-api | 144,742 | 1.24x slower | 1 request/operation |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **142,771** | **1x** | **1 request/operation** |
| kitsu | 58,146 | 2.46x slower | 1 request/operation |
| fetchja | 134,760 | 1.06x slower | 1 request/operation |
| devour | 49,844 | 2.86x slower | 1 request/operation |
| @bjornharrtell/json-api | 140,556 | 1.02x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **285,208** | **1x** | **1 request/operation** |
| kitsu | 56,889 | 5.01x slower | 1 request/operation |
| fetchja | 275,787 | 1.03x slower | 1 request/operation |
| devour | 60,124 | 4.74x slower | 1 request/operation |
| @bjornharrtell/json-api | 124,567 | 2.29x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **287,713** | **1x** | **1 request/operation** |
| kitsu | 55,867 | 5.15x slower | 1 request/operation |
| fetchja | 261,898 | 1.1x slower | 1 request/operation |
| devour | 54,163 | 5.31x slower | 1 request/operation |
| @bjornharrtell/json-api | 116,237 | 2.48x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **222,480** | **1x** | **1 request/operation** |
| kitsu | 50,819 | 4.38x slower | 1 request/operation |
| fetchja | 209,744 | 1.06x slower | 1 request/operation |
| devour | 48,797 | 4.56x slower | 1 request/operation |
| @bjornharrtell/json-api | 89,423 | 2.49x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **292,616** | **1x** | **1 request/operation** |
| kitsu | 58,549 | 5x slower | 1 request/operation |
| fetchja | 240,477 | 1.22x slower | 1 request/operation |
| devour | 52,885 | 5.53x slower | 1 request/operation |
| @bjornharrtell/json-api | 99,316 | 2.95x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **48,712** | **1x** | **1 request/operation** |
| kitsu | 24,817 | 1.96x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **25,859** | **1x** | **1 request/operation** |
| kitsu | 16,031 | 1.61x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **387,677** | **1x** | **1 request/operation** |
| kitsu | 69,878 | 5.55x slower | 1 request/operation |
| fetchja | 313,696 | 1.24x slower | 1 request/operation |
| devour | 60,862 | 6.37x slower | 1 request/operation |
| @bjornharrtell/json-api | 134,082 | 2.89x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 256,643 | 1x | 1 request/operation |
| kitsu | 55,802 | 4.6x slower | 1 request/operation |
| **fetchja** | **283,566** | **1.1x faster** | **1 request/operation** |
| devour | 52,779 | 4.86x slower | 1 request/operation |
| @bjornharrtell/json-api | 115,551 | 2.22x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **511** | **1x** | **1 request/operation** |
| kitsu | 463 | 1.1x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 415 | 1x | 1 request/operation |
| **kitsu** | **431** | **1.04x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 118 | 1x | 1 request/operation |
| **kitsu** | **119** | **1.01x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **967** | **1x** | **1 request/operation** |
| kitsu | 837 | 1.16x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **328,308** | **1x** | **1 request/operation** |
| kitsu | 61,399 | 5.35x slower | 1 request/operation |
| fetchja | 284,798 | 1.15x slower | 1 request/operation |
| devour | 54,482 | 6.03x slower | 1 request/operation |
| @bjornharrtell/json-api | 106,289 | 3.09x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **269,083** | **1x** | **1 request/operation** |
| kitsu | 58,533 | 4.6x slower | 1 request/operation |
| fetchja | 252,082 | 1.07x slower | 1 request/operation |
| devour | 53,278 | 5.05x slower | 1 request/operation |
| @bjornharrtell/json-api | 106,210 | 2.53x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 118,165 | 1x | 2 requests/operation |
| kitsu | 32,110 | 3.68x slower | 2 requests/operation |
| **fetchja** | **130,129** | **1.1x faster** | **2 requests/operation** |
| devour | 28,778 | 4.11x slower | 2 requests/operation |
| @bjornharrtell/json-api | 79,822 | 1.48x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **115,459** | **1x** | **2 requests/operation** |
| kitsu | 29,083 | 3.97x slower | 2 requests/operation |
| fetchja | 114,755 | 1.01x slower | 2 requests/operation |
| devour | 26,952 | 4.28x slower | 2 requests/operation |
| @bjornharrtell/json-api | 74,081 | 1.56x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 73,769 | 1x | 2 requests/operation |
| kitsu | 23,559 | 3.13x slower | 2 requests/operation |
| **fetchja** | **75,958** | **1.03x faster** | **2 requests/operation** |
| devour | 23,518 | 3.14x slower | 2 requests/operation |
| @bjornharrtell/json-api | 51,603 | 1.43x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **99,987** | **1x** | **2 requests/operation** |
| kitsu | 27,906 | 3.58x slower | 2 requests/operation |
| fetchja | 87,235 | 1.15x slower | 2 requests/operation |
| devour | 24,498 | 4.08x slower | 2 requests/operation |
| @bjornharrtell/json-api | 58,395 | 1.71x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **13,735** | **1x** | **2 requests/operation** |
| kitsu | 10,394 | 1.32x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **11,199** | **1x** | **2 requests/operation** |
| kitsu | 8,833 | 1.27x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **152,435** | **1x** | **2 requests/operation** |
| kitsu | 36,501 | 4.18x slower | 2 requests/operation |
| fetchja | 138,350 | 1.1x slower | 2 requests/operation |
| devour | 30,103 | 5.06x slower | 2 requests/operation |
| @bjornharrtell/json-api | 85,812 | 1.78x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 118,546 | 1x | 2 requests/operation |
| kitsu | 29,106 | 4.07x slower | 2 requests/operation |
| **fetchja** | **119,571** | **1.01x faster** | **2 requests/operation** |
| devour | 28,497 | 4.16x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **222** | **1x** | **2 requests/operation** |
| kitsu | 207 | 1.07x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 134 | 1x | 2 requests/operation |
| **kitsu** | **135** | **1.01x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 24.18 | 1x | 2 requests/operation |
| **kitsu** | **26.14** | **1.08x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **200** | **1x** | **2 requests/operation** |
| kitsu | 194 | 1.03x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **110,104** | **1x** | **2 requests/operation** |
| kitsu | 30,205 | 3.65x slower | 2 requests/operation |
| fetchja | 106,556 | 1.03x slower | 2 requests/operation |
| devour | 25,822 | 4.26x slower | 2 requests/operation |
| @bjornharrtell/json-api | 55,504 | 1.98x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **90,659** | **1x** | **2 requests/operation** |
| kitsu | 27,580 | 3.29x slower | 2 requests/operation |
| fetchja | 84,884 | 1.07x slower | 2 requests/operation |
| devour | 22,506 | 4.03x slower | 2 requests/operation |
| @bjornharrtell/json-api | 57,646 | 1.57x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

</details>

### node v26\.13\.1

Measured commit: `5de72653e8527e430e2fa782a21612ff53010287`. Runner: linux x64, AMD EPYC 9V74 80-Core Processor.

Built package fingerprint: `db4230bcf5a27f7fd8b9b04f236ae2fcbf985baf56640bbd3d3046360d007e12`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, @bjornharrtell/json-api 7\.0\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,135,665 | 1x |  |
| devour | 1,474,192 | 1.3x faster |  |
| yayson | 735,344 | 1.54x slower |  |
| **jsona** | **1,484,468** | **1.31x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 937,480 | 1x |  |
| devour | 822,826 | 1.14x slower |  |
| yayson | 577,630 | 1.62x slower |  |
| **jsona** | **1,345,939** | **1.44x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 328,748 | 1x |  |
| devour | 238,210 | 1.38x slower |  |
| yayson | 182,547 | 1.8x slower |  |
| **jsona** | **358,401** | **1.09x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **413,739** | **1x** |  |
| devour | 277,458 | 1.49x slower |  |
| yayson | 217,860 | 1.9x slower |  |
| jsona | 391,390 | 1.06x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 88,351 | 1x |  |
| devour | 85,345 | 1.04x slower |  |
| yayson | 106,134 | 1.2x faster |  |
| **jsona** | **251,481** | **2.85x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 52,750 | 1x |  |
| devour | 86,594 | 1.64x faster |  |
| yayson | 88,530 | 1.68x faster |  |
| **jsona** | **116,468** | **2.21x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **2,000,480** | **1x** |  |
| devour | 1,761,365 | 1.14x slower |  |
| yayson | 730,401 | 2.74x slower |  |
| jsona | 1,744,481 | 1.15x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 914,227 | 1x |  |
| devour | 633,141 | 1.44x slower |  |
| yayson | 612,737 | 1.49x slower |  |
| **jsona** | **1,086,086** | **1.19x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **608** | **1x** |  |
| devour | 394 | 1.54x slower |  |
| yayson | 445 | 1.37x slower |  |
| jsona | 557 | 1.09x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **255** | **1x** |  |
| devour | 3.97 | 64.22x slower |  |
| yayson | 19.48 | 13.08x slower |  |
| jsona | 149 | 1.71x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **26.92** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.47 | 56.7x slower |  |
| jsona | 17.93 | 1.5x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **264** | **1x** |  |
| devour | 2.47 | 107x slower |  |
| yayson | 10.06 | 26.24x slower |  |
| jsona | 149 | 1.77x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **349,788** | **1x** |  |
| devour | 237,109 | 1.48x slower |  |
| yayson | 194,912 | 1.79x slower |  |
| jsona | 329,350 | 1.06x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **281,445** | **1x** |  |
| devour | 189,151 | 1.49x slower |  |
| yayson | 154,151 | 1.83x slower |  |
| jsona | 256,406 | 1.1x slower |  |
| ts-japi | unsupported | — | no public decoder |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,534,286 | 1x |  |
| devour | 2,285,997 | 1.49x faster |  |
| yayson | 1,557,857 | 1.02x faster |  |
| **jsona** | **2,687,869** | **1.75x faster** |  |
| ts-japi | 576,965 | 2.66x slower |  |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,584,911 | 1x |  |
| devour | 1,434,233 | 1.11x slower |  |
| yayson | 1,220,598 | 1.3x slower |  |
| **jsona** | **2,628,313** | **1.66x faster** |  |
| ts-japi | 568,876 | 2.79x slower |  |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 827,595 | 1x |  |
| devour | 951,633 | 1.15x faster |  |
| yayson | 684,135 | 1.21x slower |  |
| **jsona** | **1,348,593** | **1.63x faster** |  |
| ts-japi | 364,653 | 2.27x slower |  |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,384,012 | 1x |  |
| devour | 1,095,838 | 1.26x slower |  |
| yayson | 751,077 | 1.84x slower |  |
| **jsona** | **1,524,268** | **1.1x faster** |  |
| ts-japi | 411,311 | 3.36x slower |  |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 175,882 | 1x |  |
| devour | 93,705 | 1.88x slower |  |
| yayson | 205,382 | 1.17x faster |  |
| **jsona** | **687,167** | **3.91x faster** |  |
| ts-japi | 216,629 | 1.23x faster |  |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 70,841 | 1x |  |
| devour | 174,527 | 2.46x faster |  |
| yayson | 207,431 | 2.93x faster |  |
| **jsona** | **365,049** | **5.15x faster** |  |
| ts-japi | 136,426 | 1.93x faster |  |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 3,943,720 | 1x |  |
| **devour** | **5,642,911** | **1.43x faster** |  |
| yayson | 1,935,023 | 2.04x slower |  |
| jsona | 4,004,501 | 1.02x faster |  |
| ts-japi | 612,654 | 6.44x slower |  |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,153,681 | 1x |  |
| devour | 911,153 | 1.27x slower |  |
| yayson | 848,896 | 1.36x slower |  |
| **jsona** | **1,595,123** | **1.38x faster** |  |
| ts-japi | 407,389 | 2.83x slower |  |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 807 | 1x |  |
| devour | 1,046 | 1.3x faster |  |
| yayson | 724 | 1.11x slower |  |
| **jsona** | **1,750** | **2.17x faster** |  |
| ts-japi | 336 | 2.4x slower |  |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 548 | 1x |  |
| devour | 859 | 1.57x faster |  |
| yayson | 628 | 1.15x faster |  |
| **jsona** | **1,436** | **2.62x faster** |  |
| ts-japi | 212 | 2.59x slower |  |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 259 | 1x |  |
| **devour** | **418** | **1.61x faster** |  |
| yayson | 374 | 1.44x faster |  |
| jsona | 270 | 1.04x faster |  |
| ts-japi | 163 | 1.59x slower |  |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 2,484 | 1x |  |
| devour | 5,483 | 2.21x faster |  |
| **yayson** | **11,263** | **4.53x faster** |  |
| jsona | 7,647 | 3.08x faster |  |
| ts-japi | 9,432 | 3.8x faster |  |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,463,792 | 1x |  |
| devour | 1,115,352 | 1.31x slower |  |
| yayson | 828,555 | 1.77x slower |  |
| **jsona** | **1,527,450** | **1.04x faster** |  |
| ts-japi | 403,849 | 3.62x slower |  |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 1,375,369 | 1x |  |
| devour | 1,176,387 | 1.17x slower |  |
| yayson | 774,992 | 1.77x slower |  |
| **jsona** | **1,644,365** | **1.2x faster** |  |
| ts-japi | 392,221 | 3.51x slower |  |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 619,405 | 1x |  |
| devour | 819,873 | 1.32x faster |  |
| yayson | 464,931 | 1.33x slower |  |
| **jsona** | **829,513** | **1.34x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-links-only

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 534,671 | 1x |  |
| devour | 475,588 | 1.12x slower |  |
| yayson | 388,528 | 1.38x slower |  |
| **jsona** | **795,244** | **1.49x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### small-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 221,407 | 1x |  |
| devour | 177,530 | 1.25x slower |  |
| yayson | 132,751 | 1.67x slower |  |
| **jsona** | **251,273** | **1.13x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### nested-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 287,101 | 1x |  |
| devour | 203,373 | 1.41x slower |  |
| yayson | 159,012 | 1.81x slower |  |
| **jsona** | **293,770** | **1.02x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 55,510 | 1x |  |
| devour | 40,337 | 1.38x slower |  |
| yayson | 65,021 | 1.17x faster |  |
| **jsona** | **138,530** | **2.5x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### collection-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 27,145 | 1x |  |
| devour | 51,375 | 1.89x faster |  |
| yayson | 56,697 | 2.09x faster |  |
| **jsona** | **71,857** | **2.65x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### patch-single

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **1,245,619** | **1x** |  |
| devour | 1,226,989 | 1.02x slower |  |
| yayson | 496,215 | 2.51x slower |  |
| jsona | 1,088,012 | 1.14x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### empty-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 449,675 | 1x |  |
| devour | 323,638 | 1.39x slower |  |
| yayson | 301,764 | 1.49x slower |  |
| **jsona** | **559,113** | **1.24x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### few-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| kitsu-core | 230 | 1x |  |
| devour | 237 | 1.03x faster |  |
| yayson | 209 | 1.1x slower |  |
| **jsona** | **306** | **1.33x faster** |  |
| ts-japi | unsupported | — | no public decoder |

##### many-includes

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **150** | **1x** |  |
| devour | 3.8 | 39.34x slower |  |
| yayson | 17.35 | 8.63x slower |  |
| jsona | 105 | 1.42x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### complex-relationships

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **23.52** | **1x** |  |
| devour | timeout | — | worker exceeds 30-second limit |
| yayson | 0.48 | 49.41x slower |  |
| jsona | 15.49 | 1.52x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### wide-relationship

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **234** | **1x** |  |
| devour | 2.43 | 96.67x slower |  |
| yayson | 9.78 | 23.97x slower |  |
| jsona | 143 | 1.64x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### self-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **253,664** | **1x** |  |
| devour | 181,463 | 1.4x slower |  |
| yayson | 151,318 | 1.68x slower |  |
| jsona | 243,963 | 1.04x slower |  |
| ts-japi | unsupported | — | no public decoder |

##### mutual-cycle

| Library | Operations/s | vs kitsu-core | Detail |
| --- | ---: | ---: | --- |
| **kitsu-core** | **221,561** | **1x** |  |
| devour | 152,628 | 1.45x slower |  |
| yayson | 117,113 | 1.89x slower |  |
| jsona | 202,543 | 1.09x slower |  |
| ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client operations/s</summary>

#### decode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **139,579** | **1x** | **1 request/operation** |
| kitsu | 59,297 | 2.35x slower | 1 request/operation |
| fetchja | 120,058 | 1.16x slower | 1 request/operation |
| devour | 49,739 | 2.81x slower | 1 request/operation |
| @bjornharrtell/json-api | 126,134 | 1.11x slower | 1 request/operation |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **126,133** | **1x** | **1 request/operation** |
| kitsu | 53,983 | 2.34x slower | 1 request/operation |
| fetchja | 115,857 | 1.09x slower | 1 request/operation |
| devour | 49,179 | 2.56x slower | 1 request/operation |
| @bjornharrtell/json-api | 118,139 | 1.07x slower | 1 request/operation |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **75,520** | **1x** | **1 request/operation** |
| kitsu | 44,437 | 1.7x slower | 1 request/operation |
| fetchja | 69,056 | 1.09x slower | 1 request/operation |
| devour | 38,098 | 1.98x slower | 1 request/operation |
| @bjornharrtell/json-api | 72,788 | 1.04x slower | 1 request/operation |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **86,527** | **1x** | **1 request/operation** |
| kitsu | 45,724 | 1.89x slower | 1 request/operation |
| fetchja | 76,629 | 1.13x slower | 1 request/operation |
| devour | 39,193 | 2.21x slower | 1 request/operation |
| @bjornharrtell/json-api | 69,597 | 1.24x slower | 1 request/operation |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 17,933 | 1x | 1 request/operation |
| kitsu | 18,112 | 1.01x faster | 1 request/operation |
| fetchja | 18,989 | 1.06x faster | 1 request/operation |
| devour | 16,011 | 1.12x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **19,810** | **1.1x faster** | **1 request/operation** |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 16,144 | 1x | 1 request/operation |
| kitsu | 16,217 | <1.01x faster | 1 request/operation |
| fetchja | 16,135 | <1.01x slower | 1 request/operation |
| devour | 17,207 | 1.07x faster | 1 request/operation |
| **@bjornharrtell/json-api** | **19,032** | **1.18x faster** | **1 request/operation** |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **158,454** | **1x** | **1 request/operation** |
| kitsu | 62,961 | 2.52x slower | 1 request/operation |
| fetchja | 134,494 | 1.18x slower | 1 request/operation |
| devour | 53,063 | 2.99x slower | 1 request/operation |
| @bjornharrtell/json-api | 132,254 | 1.2x slower | 1 request/operation |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **128,855** | **1x** | **1 request/operation** |
| kitsu | 56,638 | 2.28x slower | 1 request/operation |
| fetchja | 115,716 | 1.11x slower | 1 request/operation |
| devour | 48,365 | 2.66x slower | 1 request/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **343** | **1x** | **1 request/operation** |
| kitsu | 337 | 1.02x slower | 1 request/operation |
| fetchja | 311 | 1.1x slower | 1 request/operation |
| devour | 228 | 1.51x slower | 1 request/operation |
| @bjornharrtell/json-api | 340 | 1.01x slower | 1 request/operation |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **145** | **1x** | **1 request/operation** |
| kitsu | 145 | <1.01x slower | 1 request/operation |
| fetchja | 117 | 1.24x slower | 1 request/operation |
| devour | 5.58 | 26.06x slower | 1 request/operation |
| @bjornharrtell/json-api | 107 | 1.35x slower | 1 request/operation |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **20.69** | **1x** | **1 request/operation** |
| kitsu | 19.74 | 1.05x slower | 1 request/operation |
| fetchja | 15.36 | 1.35x slower | 1 request/operation |
| devour | timeout | — | worker exceeds 30-second limit |
| @bjornharrtell/json-api | 14.97 | 1.38x slower | 1 request/operation |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 143 | 1x | 1 request/operation |
| **kitsu** | **157** | **1.09x faster** | **1 request/operation** |
| fetchja | 115 | 1.24x slower | 1 request/operation |
| devour | 2.98 | 48.1x slower | 1 request/operation |
| @bjornharrtell/json-api | 121 | 1.18x slower | 1 request/operation |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 63,669 | 1x | 1 request/operation |
| kitsu | 45,701 | 1.39x slower | 1 request/operation |
| fetchja | 71,670 | 1.13x faster | 1 request/operation |
| devour | 37,517 | 1.7x slower | 1 request/operation |
| **@bjornharrtell/json-api** | **73,865** | **1.16x faster** | **1 request/operation** |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **73,670** | **1x** | **1 request/operation** |
| kitsu | 42,271 | 1.74x slower | 1 request/operation |
| fetchja | 64,871 | 1.14x slower | 1 request/operation |
| devour | 33,029 | 2.23x slower | 1 request/operation |
| @bjornharrtell/json-api | 64,925 | 1.13x slower | 1 request/operation |

#### encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **250,243** | **1x** | **1 request/operation** |
| kitsu | 54,158 | 4.62x slower | 1 request/operation |
| fetchja | 210,433 | 1.19x slower | 1 request/operation |
| devour | 49,105 | 5.1x slower | 1 request/operation |
| @bjornharrtell/json-api | 53,814 | 4.65x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **253,658** | **1x** | **1 request/operation** |
| kitsu | 53,994 | 4.7x slower | 1 request/operation |
| fetchja | 210,901 | 1.2x slower | 1 request/operation |
| devour | 50,695 | 5x slower | 1 request/operation |
| @bjornharrtell/json-api | 52,880 | 4.8x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **160,353** | **1x** | **1 request/operation** |
| kitsu | 45,257 | 3.54x slower | 1 request/operation |
| fetchja | 149,775 | 1.07x slower | 1 request/operation |
| devour | 39,969 | 4.01x slower | 1 request/operation |
| @bjornharrtell/json-api | 34,102 | 4.7x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **227,939** | **1x** | **1 request/operation** |
| kitsu | 50,733 | 4.49x slower | 1 request/operation |
| fetchja | 189,246 | 1.2x slower | 1 request/operation |
| devour | 45,106 | 5.05x slower | 1 request/operation |
| @bjornharrtell/json-api | 36,948 | 6.17x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **43,860** | **1x** | **1 request/operation** |
| kitsu | 24,866 | 1.76x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **19,981** | **1x** | **1 request/operation** |
| kitsu | 14,213 | 1.41x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **347,126** | **1x** | **1 request/operation** |
| kitsu | 60,485 | 5.74x slower | 1 request/operation |
| fetchja | 249,990 | 1.39x slower | 1 request/operation |
| devour | 53,422 | 6.5x slower | 1 request/operation |
| @bjornharrtell/json-api | 54,817 | 6.33x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **225,041** | **1x** | **1 request/operation** |
| kitsu | 49,524 | 4.54x slower | 1 request/operation |
| fetchja | 193,657 | 1.16x slower | 1 request/operation |
| devour | 46,400 | 4.85x slower | 1 request/operation |
| @bjornharrtell/json-api | 48,849 | 4.61x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **299** | **1x** | **1 request/operation** |
| kitsu | 237 | 1.26x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **288** | **1x** | **1 request/operation** |
| kitsu | 266 | 1.08x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 85 | 1x | 1 request/operation |
| **kitsu** | **101** | **1.19x faster** | **1 request/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **873** | **1x** | **1 request/operation** |
| kitsu | 769 | 1.14x slower | 1 request/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **221,939** | **1x** | **1 request/operation** |
| kitsu | 50,624 | 4.38x slower | 1 request/operation |
| fetchja | 190,654 | 1.16x slower | 1 request/operation |
| devour | 47,621 | 4.66x slower | 1 request/operation |
| @bjornharrtell/json-api | 36,189 | 6.13x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **229,899** | **1x** | **1 request/operation** |
| kitsu | 49,756 | 4.62x slower | 1 request/operation |
| fetchja | 190,615 | 1.21x slower | 1 request/operation |
| devour | 47,522 | 4.84x slower | 1 request/operation |
| @bjornharrtell/json-api | 32,249 | 7.13x slower | 2 requests/operation \(automatic GET after HTTP 204 PATCH\) |

#### decode-encode

##### small-no-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **87,038** | **1x** | **2 requests/operation** |
| kitsu | 28,200 | 3.09x slower | 2 requests/operation |
| fetchja | 76,637 | 1.14x slower | 2 requests/operation |
| devour | 25,336 | 3.44x slower | 2 requests/operation |
| @bjornharrtell/json-api | 37,572 | 2.32x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-links-only

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **79,456** | **1x** | **2 requests/operation** |
| kitsu | 26,764 | 2.97x slower | 2 requests/operation |
| fetchja | 70,432 | 1.13x slower | 2 requests/operation |
| devour | 24,629 | 3.23x slower | 2 requests/operation |
| @bjornharrtell/json-api | 36,341 | 2.19x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### small-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **46,758** | **1x** | **2 requests/operation** |
| kitsu | 21,075 | 2.22x slower | 2 requests/operation |
| fetchja | 39,562 | 1.18x slower | 2 requests/operation |
| devour | 18,948 | 2.47x slower | 2 requests/operation |
| @bjornharrtell/json-api | 23,221 | 2.01x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### nested-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **57,829** | **1x** | **2 requests/operation** |
| kitsu | 23,759 | 2.43x slower | 2 requests/operation |
| fetchja | 50,742 | 1.14x slower | 2 requests/operation |
| devour | 19,793 | 2.92x slower | 2 requests/operation |
| @bjornharrtell/json-api | 24,626 | 2.35x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### collection

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **11,552** | **1x** | **2 requests/operation** |
| kitsu | 9,823 | 1.18x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### collection-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **7,816** | **1x** | **2 requests/operation** |
| kitsu | 7,399 | 1.06x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### patch-single

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **104,015** | **1x** | **2 requests/operation** |
| kitsu | 30,886 | 3.37x slower | 2 requests/operation |
| fetchja | 85,552 | 1.22x slower | 2 requests/operation |
| devour | 26,182 | 3.97x slower | 2 requests/operation |
| @bjornharrtell/json-api | 40,428 | 2.57x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### empty-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **74,361** | **1x** | **2 requests/operation** |
| kitsu | 26,346 | 2.82x slower | 2 requests/operation |
| fetchja | 65,502 | 1.14x slower | 2 requests/operation |
| devour | 22,754 | 3.27x slower | 2 requests/operation |
| @bjornharrtell/json-api | incorrect | — | decoded relationship cardinality differs: comments |

##### few-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **156** | **1x** | **2 requests/operation** |
| kitsu | 145 | 1.08x slower | 2 requests/operation |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### many-includes

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 83.52 | 1x | 2 requests/operation |
| **kitsu** | **89.04** | **1.07x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### complex-relationships

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 14.82 | 1x | 2 requests/operation |
| **kitsu** | **16.4** | **1.11x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### wide-relationship

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| kitsu-native | 114 | 1x | 2 requests/operation |
| **kitsu** | **125** | **1.09x faster** | **2 requests/operation** |
| fetchja | unsupported | — | public client writes single resources only |
| devour | unsupported | — | public client writes single resources only |
| @bjornharrtell/json-api | unsupported | — | public client writes single resources only |

##### self-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **53,020** | **1x** | **2 requests/operation** |
| kitsu | 23,091 | 2.3x slower | 2 requests/operation |
| fetchja | 48,397 | 1.1x slower | 2 requests/operation |
| devour | 19,748 | 2.68x slower | 2 requests/operation |
| @bjornharrtell/json-api | 24,748 | 2.14x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

##### mutual-cycle

| Library | Operations/s | vs kitsu-native | Detail |
| --- | ---: | ---: | --- |
| **kitsu-native** | **49,193** | **1x** | **2 requests/operation** |
| kitsu | 22,158 | 2.22x slower | 2 requests/operation |
| fetchja | 44,936 | 1.09x slower | 2 requests/operation |
| devour | 18,331 | 2.68x slower | 2 requests/operation |
| @bjornharrtell/json-api | 22,024 | 2.23x slower | 3 requests/operation \(automatic GET after HTTP 204 PATCH\) |

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
