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

JSON:API codec operations/s and mocked client requests/s. Higher is faster. No network traffic.

Median of five samples after warmup. Codec timings exclude JSON text parsing/stringification. Client timings include native client conversion and mocked transport overhead.

Bold rows mark the fastest library per runtime, suite, mode, and scenario, including ties. Multipliers compare codecs with kitsu-core and clients with kitsu (1x). A 3x slower library runs at one third the reference rate. Missing reference scores show —.

Reproduce: `bun run build && bun run benchmark`. Quick check: `bun run benchmark:smoke`.

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/38834413237)

### bun 1\.4\.3

Measured commit: `165195b7127eaf6690b61b8c8cb3aa5e5d673566`. Runner: linux x64, AMD EPYC 7763 64-Core Processor.

Built package fingerprint: `224176e00cdc9ab35518a648a0c1ead0f93fc80c838c70f97263aeb70f3cd843`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 886,002 | 1x |  |
| **small-no-relationships** | **devour** | **1,001,880** | **1.13x faster** |  |
| small-no-relationships | yayson | 609,004 | 1.45x slower |  |
| small-no-relationships | jsona | 945,014 | 1.07x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 615,826 | 1x |  |
| small-links-only | devour | 654,569 | 1.06x faster |  |
| small-links-only | yayson | 373,329 | 1.65x slower |  |
| **small-links-only** | **jsona** | **840,559** | **1.36x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 243,137 | 1x |  |
| small-relationships | devour | 206,417 | 1.18x slower |  |
| small-relationships | yayson | 165,966 | 1.46x slower |  |
| **small-relationships** | **jsona** | **248,174** | **1.02x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **319,809** | **1x** |  |
| nested-relationships | devour | 248,448 | 1.29x slower |  |
| nested-relationships | yayson | 213,290 | 1.5x slower |  |
| nested-relationships | jsona | 318,553 | <1.01x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 66,751 | 1x |  |
| collection | devour | 77,859 | 1.17x faster |  |
| collection | yayson | 63,939 | 1.04x slower |  |
| **collection** | **jsona** | **232,018** | **3.48x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 49,530 | 1x |  |
| collection-includes | devour | 101,904 | 2.06x faster |  |
| collection-includes | yayson | 108,724 | 2.2x faster |  |
| **collection-includes** | **jsona** | **113,626** | **2.29x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **1,651,634** | **1x** |  |
| patch-single | devour | 1,274,236 | 1.3x slower |  |
| patch-single | yayson | 728,793 | 2.27x slower |  |
| patch-single | jsona | 1,333,109 | 1.24x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| **empty-relationships** | **kitsu-core** | **775,787** | **1x** |  |
| empty-relationships | devour | 500,890 | 1.55x slower |  |
| empty-relationships | yayson | 506,189 | 1.53x slower |  |
| empty-relationships | jsona | 716,903 | 1.08x slower |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **696** | **1x** |  |
| few-includes | devour | 406 | 1.71x slower |  |
| few-includes | yayson | 476 | 1.46x slower |  |
| few-includes | jsona | 502 | 1.38x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **344** | **1x** |  |
| many-includes | devour | 5.89 | 58.42x slower |  |
| many-includes | yayson | 29.29 | 11.74x slower |  |
| many-includes | jsona | 157 | 2.19x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **52.37** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.64 | 81.98x slower |  |
| complex-relationships | jsona | 19.6 | 2.67x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **365** | **1x** |  |
| wide-relationship | devour | 3.84 | 95.25x slower |  |
| wide-relationship | yayson | 16.9 | 21.62x slower |  |
| wide-relationship | jsona | 125 | 2.92x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **296,881** | **1x** |  |
| self-cycle | devour | 241,596 | 1.23x slower |  |
| self-cycle | yayson | 181,547 | 1.64x slower |  |
| self-cycle | jsona | 242,064 | 1.23x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **263,399** | **1x** |  |
| mutual-cycle | devour | 171,140 | 1.54x slower |  |
| mutual-cycle | yayson | 178,205 | 1.48x slower |  |
| mutual-cycle | jsona | 228,528 | 1.15x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,408,737 | 1x |  |
| **small-no-relationships** | **devour** | **2,688,729** | **1.91x faster** |  |
| small-no-relationships | yayson | 1,292,237 | 1.09x slower |  |
| small-no-relationships | jsona | 1,737,980 | 1.23x faster |  |
| small-no-relationships | ts-japi | 565,322 | 2.49x slower |  |
| small-links-only | kitsu-core | 1,333,593 | 1x |  |
| small-links-only | devour | 1,418,642 | 1.06x faster |  |
| small-links-only | yayson | 1,141,593 | 1.17x slower |  |
| **small-links-only** | **jsona** | **1,668,316** | **1.25x faster** |  |
| small-links-only | ts-japi | 527,909 | 2.53x slower |  |
| small-relationships | kitsu-core | 754,439 | 1x |  |
| **small-relationships** | **devour** | **887,192** | **1.18x faster** |  |
| small-relationships | yayson | 757,166 | <1.01x faster |  |
| small-relationships | jsona | 697,895 | 1.08x slower |  |
| small-relationships | ts-japi | 313,270 | 2.41x slower |  |
| **nested-relationships** | **kitsu-core** | **1,578,818** | **1x** |  |
| nested-relationships | devour | 1,097,607 | 1.44x slower |  |
| nested-relationships | yayson | 978,621 | 1.61x slower |  |
| nested-relationships | jsona | 892,197 | 1.77x slower |  |
| nested-relationships | ts-japi | 330,382 | 4.78x slower |  |
| collection | kitsu-core | 114,051 | 1x |  |
| collection | devour | 129,318 | 1.13x faster |  |
| collection | yayson | 204,166 | 1.79x faster |  |
| **collection** | **jsona** | **483,692** | **4.24x faster** |  |
| collection | ts-japi | 234,422 | 2.06x faster |  |
| collection-includes | kitsu-core | 60,792 | 1x |  |
| collection-includes | devour | 179,850 | 2.96x faster |  |
| **collection-includes** | **yayson** | **272,115** | **4.48x faster** |  |
| collection-includes | jsona | 214,385 | 3.53x faster |  |
| collection-includes | ts-japi | 143,687 | 2.36x faster |  |
| **patch-single** | **kitsu-core** | **4,567,074** | **1x** |  |
| patch-single | devour | 4,123,558 | 1.11x slower |  |
| patch-single | yayson | 1,725,857 | 2.65x slower |  |
| patch-single | jsona | 2,171,218 | 2.1x slower |  |
| patch-single | ts-japi | 656,654 | 6.96x slower |  |
| empty-relationships | kitsu-core | 943,740 | 1x |  |
| **empty-relationships** | **devour** | **999,102** | **1.06x faster** |  |
| empty-relationships | yayson | 922,953 | 1.02x slower |  |
| empty-relationships | jsona | 937,742 | 1.01x slower |  |
| empty-relationships | ts-japi | 347,103 | 2.72x slower |  |
| few-includes | kitsu-core | 587 | 1x |  |
| **few-includes** | **devour** | **1,477** | **2.52x faster** |  |
| few-includes | yayson | 999 | 1.7x faster |  |
| few-includes | jsona | 744 | 1.27x faster |  |
| few-includes | ts-japi | 487 | 1.21x slower |  |
| many-includes | kitsu-core | 786 | 1x |  |
| **many-includes** | **devour** | **1,185** | **1.51x faster** |  |
| many-includes | yayson | 912 | 1.16x faster |  |
| many-includes | jsona | 809 | 1.03x faster |  |
| many-includes | ts-japi | 505 | 1.56x slower |  |
| complex-relationships | kitsu-core | 438 | 1x |  |
| **complex-relationships** | **devour** | **663** | **1.51x faster** |  |
| complex-relationships | yayson | 591 | 1.35x faster |  |
| complex-relationships | jsona | 433 | 1.01x slower |  |
| complex-relationships | ts-japi | 273 | 1.61x slower |  |
| wide-relationship | kitsu-core | 3,692 | 1x |  |
| wide-relationship | devour | 13,268 | 3.59x faster |  |
| **wide-relationship** | **yayson** | **14,657** | **3.97x faster** |  |
| wide-relationship | jsona | 2,972 | 1.24x slower |  |
| wide-relationship | ts-japi | 5,645 | 1.53x faster |  |
| **self-cycle** | **kitsu-core** | **1,670,626** | **1x** |  |
| self-cycle | devour | 1,002,475 | 1.67x slower |  |
| self-cycle | yayson | 788,334 | 2.12x slower |  |
| self-cycle | jsona | 809,847 | 2.06x slower |  |
| self-cycle | ts-japi | 319,497 | 5.23x slower |  |
| **mutual-cycle** | **kitsu-core** | **1,679,060** | **1x** |  |
| mutual-cycle | devour | 1,084,115 | 1.55x slower |  |
| mutual-cycle | yayson | 745,324 | 2.25x slower |  |
| mutual-cycle | jsona | 775,388 | 2.17x slower |  |
| mutual-cycle | ts-japi | 328,166 | 5.12x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 442,118 | 1x |  |
| small-no-relationships | devour | 573,321 | 1.3x faster |  |
| small-no-relationships | yayson | 396,486 | 1.12x slower |  |
| **small-no-relationships** | **jsona** | **574,563** | **1.3x faster** |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 336,475 | 1x |  |
| small-links-only | devour | 394,852 | 1.17x faster |  |
| small-links-only | yayson | 290,926 | 1.16x slower |  |
| **small-links-only** | **jsona** | **454,564** | **1.35x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 148,466 | 1x |  |
| **small-relationships** | **devour** | **160,547** | **1.08x faster** |  |
| small-relationships | yayson | 117,998 | 1.26x slower |  |
| small-relationships | jsona | 155,579 | 1.05x faster |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **246,571** | **1x** |  |
| nested-relationships | devour | 201,382 | 1.22x slower |  |
| nested-relationships | yayson | 151,237 | 1.63x slower |  |
| nested-relationships | jsona | 181,400 | 1.36x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 37,869 | 1x |  |
| collection | devour | 41,633 | 1.1x faster |  |
| collection | yayson | 41,901 | 1.11x faster |  |
| **collection** | **jsona** | **94,508** | **2.5x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 27,864 | 1x |  |
| collection-includes | devour | 52,577 | 1.89x faster |  |
| collection-includes | yayson | 55,393 | 1.99x faster |  |
| **collection-includes** | **jsona** | **66,361** | **2.38x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 811,692 | 1x |  |
| **patch-single** | **devour** | **864,720** | **1.07x faster** |  |
| patch-single | yayson | 467,679 | 1.74x slower |  |
| patch-single | jsona | 588,552 | 1.38x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| **empty-relationships** | **kitsu-core** | **328,709** | **1x** |  |
| empty-relationships | devour | 279,924 | 1.17x slower |  |
| empty-relationships | yayson | 289,570 | 1.14x slower |  |
| empty-relationships | jsona | 319,917 | 1.03x slower |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **284** | **1x** |  |
| few-includes | devour | 238 | 1.2x slower |  |
| few-includes | yayson | 217 | 1.31x slower |  |
| few-includes | jsona | 233 | 1.22x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **225** | **1x** |  |
| many-includes | devour | 5.35 | 41.99x slower |  |
| many-includes | yayson | 27.5 | 8.17x slower |  |
| many-includes | jsona | 108 | 2.08x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **38.38** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.63 | 61.18x slower |  |
| complex-relationships | jsona | 17.05 | 2.25x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **305** | **1x** |  |
| wide-relationship | devour | 4 | 76.24x slower |  |
| wide-relationship | yayson | 17.13 | 17.8x slower |  |
| wide-relationship | jsona | 113 | 2.69x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **201,187** | **1x** |  |
| self-cycle | devour | 150,406 | 1.34x slower |  |
| self-cycle | yayson | 158,429 | 1.27x slower |  |
| self-cycle | jsona | 163,565 | 1.23x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **180,058** | **1x** |  |
| mutual-cycle | devour | 137,641 | 1.31x slower |  |
| mutual-cycle | yayson | 122,534 | 1.47x slower |  |
| mutual-cycle | jsona | 152,841 | 1.18x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 44,917 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **174,396** | **3.88x faster** |  |
| small-no-relationships | fetchja | 162,704 | 3.62x faster |  |
| small-no-relationships | devour | 38,252 | 1.17x slower |  |
| small-links-only | kitsu | 42,882 | 1x |  |
| small-links-only | kitsu-native | 146,224 | 3.41x faster |  |
| **small-links-only** | **fetchja** | **160,365** | **3.74x faster** |  |
| small-links-only | devour | 36,915 | 1.16x slower |  |
| small-relationships | kitsu | 34,976 | 1x |  |
| **small-relationships** | **kitsu-native** | **94,794** | **2.71x faster** |  |
| small-relationships | fetchja | 83,335 | 2.38x faster |  |
| small-relationships | devour | 29,380 | 1.19x slower |  |
| nested-relationships | kitsu | 39,233 | 1x |  |
| **nested-relationships** | **kitsu-native** | **109,196** | **2.78x faster** |  |
| nested-relationships | fetchja | 96,768 | 2.47x faster |  |
| nested-relationships | devour | 33,391 | 1.17x slower |  |
| collection | kitsu | 13,736 | 1x |  |
| collection | kitsu-native | 14,437 | 1.05x faster |  |
| **collection** | **fetchja** | **24,878** | **1.81x faster** |  |
| collection | devour | 14,920 | 1.09x faster |  |
| collection-includes | kitsu | 13,026 | 1x |  |
| collection-includes | kitsu-native | 15,717 | 1.21x faster |  |
| **collection-includes** | **fetchja** | **25,425** | **1.95x faster** |  |
| collection-includes | devour | 16,275 | 1.25x faster |  |
| patch-single | kitsu | 57,554 | 1x |  |
| **patch-single** | **kitsu-native** | **208,390** | **3.62x faster** |  |
| patch-single | fetchja | 205,145 | 3.56x faster |  |
| patch-single | devour | 47,527 | 1.21x slower |  |
| empty-relationships | kitsu | 46,969 | 1x |  |
| empty-relationships | kitsu-native | 162,569 | 3.46x faster |  |
| **empty-relationships** | **fetchja** | **176,085** | **3.75x faster** |  |
| empty-relationships | devour | 38,363 | 1.22x slower |  |
| **few-includes** | **kitsu** | **425** | **1x** |  |
| few-includes | kitsu-native | 406 | 1.05x slower |  |
| few-includes | fetchja | 403 | 1.05x slower |  |
| few-includes | devour | 297 | 1.43x slower |  |
| **many-includes** | **kitsu** | **199** | **1x** |  |
| many-includes | kitsu-native | 197 | 1.01x slower |  |
| many-includes | fetchja | 154 | 1.29x slower |  |
| many-includes | devour | 7.94 | 25.09x slower |  |
| complex-relationships | kitsu | 27.96 | 1x |  |
| **complex-relationships** | **kitsu-native** | **32.28** | **1.15x faster** |  |
| complex-relationships | fetchja | 25.25 | 1.11x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **196** | **1x** |  |
| wide-relationship | kitsu-native | 195 | <1.01x slower |  |
| wide-relationship | fetchja | 148 | 1.32x slower |  |
| wide-relationship | devour | 5.11 | 38.3x slower |  |
| self-cycle | kitsu | 36,639 | 1x |  |
| **self-cycle** | **kitsu-native** | **112,007** | **3.06x faster** |  |
| self-cycle | fetchja | 86,673 | 2.37x faster |  |
| self-cycle | devour | 29,512 | 1.24x slower |  |
| mutual-cycle | kitsu | 39,641 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **94,784** | **2.39x faster** |  |
| mutual-cycle | fetchja | 79,585 | 2.01x faster |  |
| mutual-cycle | devour | 29,227 | 1.36x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 38,773 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **197,605** | **5.1x faster** |  |
| small-no-relationships | fetchja | 190,183 | 4.91x faster |  |
| small-no-relationships | devour | 36,299 | 1.07x slower |  |
| small-links-only | kitsu | 38,578 | 1x |  |
| **small-links-only** | **kitsu-native** | **209,762** | **5.44x faster** |  |
| small-links-only | fetchja | 184,791 | 4.79x faster |  |
| small-links-only | devour | 31,055 | 1.24x slower |  |
| small-relationships | kitsu | 31,775 | 1x |  |
| **small-relationships** | **kitsu-native** | **158,386** | **4.98x faster** |  |
| small-relationships | fetchja | 131,859 | 4.15x faster |  |
| small-relationships | devour | 27,723 | 1.15x slower |  |
| nested-relationships | kitsu | 39,069 | 1x |  |
| **nested-relationships** | **kitsu-native** | **229,723** | **5.88x faster** |  |
| nested-relationships | fetchja | 173,418 | 4.44x faster |  |
| nested-relationships | devour | 36,348 | 1.07x slower |  |
| collection | kitsu | 15,277 | 1x |  |
| **collection** | **kitsu-native** | **32,384** | **2.12x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 10,514 | 1x |  |
| **collection-includes** | **kitsu-native** | **17,403** | **1.66x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 50,816 | 1x |  |
| **patch-single** | **kitsu-native** | **287,575** | **5.66x faster** |  |
| patch-single | fetchja | 222,485 | 4.38x faster |  |
| patch-single | devour | 43,984 | 1.16x slower |  |
| empty-relationships | kitsu | 37,605 | 1x |  |
| empty-relationships | kitsu-native | 195,489 | 5.2x faster |  |
| **empty-relationships** | **fetchja** | **196,334** | **5.22x faster** |  |
| empty-relationships | devour | 33,083 | 1.14x slower |  |
| few-includes | kitsu | 361 | 1x |  |
| **few-includes** | **kitsu-native** | **404** | **1.12x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 319 | 1x |  |
| **many-includes** | **kitsu-native** | **362** | **1.13x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 108 | 1x |  |
| **complex-relationships** | **kitsu-native** | **116** | **1.07x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 696 | 1x |  |
| **wide-relationship** | **kitsu-native** | **742** | **1.07x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 39,075 | 1x |  |
| **self-cycle** | **kitsu-native** | **222,003** | **5.68x faster** |  |
| self-cycle | fetchja | 169,393 | 4.34x faster |  |
| self-cycle | devour | 33,687 | 1.16x slower |  |
| mutual-cycle | kitsu | 37,588 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **203,074** | **5.4x faster** |  |
| mutual-cycle | fetchja | 166,046 | 4.42x faster |  |
| mutual-cycle | devour | 33,241 | 1.13x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 39,699 | 1x | 19,850 cycles/s |
| **small-no-relationships** | **kitsu-native** | **170,451** | **4.29x faster** | **85,225 cycles/s** |
| small-no-relationships | fetchja | 159,078 | 4.01x faster | 79,539 cycles/s |
| small-no-relationships | devour | 34,189 | 1.16x slower | 17,095 cycles/s |
| small-links-only | kitsu | 36,251 | 1x | 18,125 cycles/s |
| **small-links-only** | **kitsu-native** | **153,912** | **4.25x faster** | **76,956 cycles/s** |
| small-links-only | fetchja | 153,623 | 4.24x faster | 76,812 cycles/s |
| small-links-only | devour | 29,983 | 1.21x slower | 14,991 cycles/s |
| small-relationships | kitsu | 27,397 | 1x | 13,699 cycles/s |
| **small-relationships** | **kitsu-native** | **96,400** | **3.52x faster** | **48,200 cycles/s** |
| small-relationships | fetchja | 70,065 | 2.56x faster | 35,032 cycles/s |
| small-relationships | devour | 23,354 | 1.17x slower | 11,677 cycles/s |
| nested-relationships | kitsu | 32,122 | 1x | 16,061 cycles/s |
| **nested-relationships** | **kitsu-native** | **130,382** | **4.06x faster** | **65,191 cycles/s** |
| nested-relationships | fetchja | 113,607 | 3.54x faster | 56,804 cycles/s |
| nested-relationships | devour | 28,391 | 1.13x slower | 14,195 cycles/s |
| collection | kitsu | 14,548 | 1x | 7,274 cycles/s |
| **collection** | **kitsu-native** | **18,647** | **1.28x faster** | **9,324 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 11,464 | 1x | 5,732 cycles/s |
| **collection-includes** | **kitsu-native** | **15,169** | **1.32x faster** | **7,585 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 53,822 | 1x | 26,911 cycles/s |
| **patch-single** | **kitsu-native** | **256,929** | **4.77x faster** | **128,464 cycles/s** |
| patch-single | fetchja | 179,951 | 3.34x faster | 89,975 cycles/s |
| patch-single | devour | 40,812 | 1.32x slower | 20,406 cycles/s |
| empty-relationships | kitsu | 38,941 | 1x | 19,471 cycles/s |
| **empty-relationships** | **kitsu-native** | **154,465** | **3.97x faster** | **77,233 cycles/s** |
| empty-relationships | fetchja | 145,968 | 3.75x faster | 72,984 cycles/s |
| empty-relationships | devour | 31,216 | 1.25x slower | 15,608 cycles/s |
| few-includes | kitsu | 342 | 1x | 171 cycles/s |
| **few-includes** | **kitsu-native** | **352** | **1.03x faster** | **176 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 222 | 1x | 111 cycles/s |
| **many-includes** | **kitsu-native** | **227** | **1.03x faster** | **114 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **46.44** | **1x** | **23\.22 cycles/s** |
| complex-relationships | kitsu-native | 40.24 | 1.15x slower | 20\.12 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 275 | 1x | 138 cycles/s |
| **wide-relationship** | **kitsu-native** | **293** | **1.06x faster** | **147 cycles/s** |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 30,687 | 1x | 15,344 cycles/s |
| **self-cycle** | **kitsu-native** | **114,481** | **3.73x faster** | **57,240 cycles/s** |
| self-cycle | fetchja | 103,410 | 3.37x faster | 51,705 cycles/s |
| self-cycle | devour | 24,993 | 1.23x slower | 12,496 cycles/s |
| mutual-cycle | kitsu | 31,605 | 1x | 15,803 cycles/s |
| **mutual-cycle** | **kitsu-native** | **104,657** | **3.31x faster** | **52,328 cycles/s** |
| mutual-cycle | fetchja | 91,256 | 2.89x faster | 45,628 cycles/s |
| mutual-cycle | devour | 26,212 | 1.21x slower | 13,106 cycles/s |

</details>

### node v26\.12\.0

Measured commit: `165195b7127eaf6690b61b8c8cb3aa5e5d673566`. Runner: linux x64, AMD EPYC 9V74 80-Core Processor.

Built package fingerprint: `224176e00cdc9ab35518a648a0c1ead0f93fc80c838c70f97263aeb70f3cd843`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,159,179 | 1x |  |
| **small-no-relationships** | **devour** | **1,596,053** | **1.38x faster** |  |
| small-no-relationships | yayson | 753,915 | 1.54x slower |  |
| small-no-relationships | jsona | 1,554,094 | 1.34x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 904,197 | 1x |  |
| small-links-only | devour | 876,759 | 1.03x slower |  |
| small-links-only | yayson | 589,966 | 1.53x slower |  |
| **small-links-only** | **jsona** | **1,369,888** | **1.52x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 340,101 | 1x |  |
| small-relationships | devour | 258,266 | 1.32x slower |  |
| small-relationships | yayson | 189,396 | 1.8x slower |  |
| **small-relationships** | **jsona** | **358,609** | **1.05x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **413,444** | **1x** |  |
| nested-relationships | devour | 297,161 | 1.39x slower |  |
| nested-relationships | yayson | 236,263 | 1.75x slower |  |
| nested-relationships | jsona | 404,388 | 1.02x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 83,985 | 1x |  |
| collection | devour | 86,972 | 1.04x faster |  |
| collection | yayson | 112,563 | 1.34x faster |  |
| **collection** | **jsona** | **272,842** | **3.25x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 59,729 | 1x |  |
| collection-includes | devour | 94,935 | 1.59x faster |  |
| collection-includes | yayson | 98,525 | 1.65x faster |  |
| **collection-includes** | **jsona** | **124,995** | **2.09x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,872,381 | 1x |  |
| **patch-single** | **devour** | **2,026,846** | **1.08x faster** |  |
| patch-single | yayson | 771,472 | 2.43x slower |  |
| patch-single | jsona | 1,883,930 | 1.01x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 958,630 | 1x |  |
| empty-relationships | devour | 629,146 | 1.52x slower |  |
| empty-relationships | yayson | 623,775 | 1.54x slower |  |
| **empty-relationships** | **jsona** | **1,139,418** | **1.19x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **623** | **1x** |  |
| few-includes | devour | 360 | 1.73x slower |  |
| few-includes | yayson | 433 | 1.44x slower |  |
| few-includes | jsona | 470 | 1.33x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **258** | **1x** |  |
| many-includes | devour | 4.15 | 62.08x slower |  |
| many-includes | yayson | 19.79 | 13.03x slower |  |
| many-includes | jsona | 201 | 1.28x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **33.01** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.48 | 68.73x slower |  |
| complex-relationships | jsona | 18.73 | 1.76x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **246** | **1x** |  |
| wide-relationship | devour | 2.41 | 102x slower |  |
| wide-relationship | yayson | 9.36 | 26.3x slower |  |
| wide-relationship | jsona | 179 | 1.37x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 343,750 | 1x |  |
| self-cycle | devour | 244,829 | 1.4x slower |  |
| self-cycle | yayson | 203,621 | 1.69x slower |  |
| **self-cycle** | **jsona** | **357,047** | **1.04x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **289,960** | **1x** |  |
| mutual-cycle | devour | 182,844 | 1.59x slower |  |
| mutual-cycle | yayson | 171,129 | 1.69x slower |  |
| mutual-cycle | jsona | 277,555 | 1.04x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,621,644 | 1x |  |
| small-no-relationships | devour | 2,700,146 | 1.67x faster |  |
| small-no-relationships | yayson | 1,587,308 | 1.02x slower |  |
| **small-no-relationships** | **jsona** | **3,013,775** | **1.86x faster** |  |
| small-no-relationships | ts-japi | 633,980 | 2.56x slower |  |
| small-links-only | kitsu-core | 1,651,582 | 1x |  |
| small-links-only | devour | 1,467,360 | 1.13x slower |  |
| small-links-only | yayson | 1,223,028 | 1.35x slower |  |
| **small-links-only** | **jsona** | **2,996,259** | **1.81x faster** |  |
| small-links-only | ts-japi | 622,165 | 2.65x slower |  |
| small-relationships | kitsu-core | 882,235 | 1x |  |
| small-relationships | devour | 941,919 | 1.07x faster |  |
| small-relationships | yayson | 760,848 | 1.16x slower |  |
| **small-relationships** | **jsona** | **1,439,486** | **1.63x faster** |  |
| small-relationships | ts-japi | 406,067 | 2.17x slower |  |
| nested-relationships | kitsu-core | 1,456,101 | 1x |  |
| nested-relationships | devour | 1,176,158 | 1.24x slower |  |
| nested-relationships | yayson | 859,214 | 1.69x slower |  |
| **nested-relationships** | **jsona** | **1,815,309** | **1.25x faster** |  |
| nested-relationships | ts-japi | 450,894 | 3.23x slower |  |
| collection | kitsu-core | 182,138 | 1x |  |
| collection | devour | 97,031 | 1.88x slower |  |
| collection | yayson | 206,740 | 1.14x faster |  |
| **collection** | **jsona** | **751,042** | **4.12x faster** |  |
| collection | ts-japi | 233,717 | 1.28x faster |  |
| collection-includes | kitsu-core | 74,687 | 1x |  |
| collection-includes | devour | 189,835 | 2.54x faster |  |
| collection-includes | yayson | 218,311 | 2.92x faster |  |
| **collection-includes** | **jsona** | **374,648** | **5.02x faster** |  |
| collection-includes | ts-japi | 141,267 | 1.89x faster |  |
| patch-single | kitsu-core | 4,089,258 | 1x |  |
| **patch-single** | **devour** | **5,799,890** | **1.42x faster** |  |
| patch-single | yayson | 2,068,740 | 1.98x slower |  |
| patch-single | jsona | 4,568,526 | 1.12x faster |  |
| patch-single | ts-japi | 642,984 | 6.36x slower |  |
| empty-relationships | kitsu-core | 1,179,432 | 1x |  |
| empty-relationships | devour | 979,042 | 1.2x slower |  |
| empty-relationships | yayson | 832,271 | 1.42x slower |  |
| **empty-relationships** | **jsona** | **1,739,781** | **1.48x faster** |  |
| empty-relationships | ts-japi | 450,164 | 2.62x slower |  |
| few-includes | kitsu-core | 688 | 1x |  |
| few-includes | devour | 877 | 1.27x faster |  |
| few-includes | yayson | 738 | 1.07x faster |  |
| **few-includes** | **jsona** | **1,392** | **2.02x faster** |  |
| few-includes | ts-japi | 336 | 2.05x slower |  |
| many-includes | kitsu-core | 593 | 1x |  |
| many-includes | devour | 1,042 | 1.76x faster |  |
| many-includes | yayson | 768 | 1.3x faster |  |
| **many-includes** | **jsona** | **1,555** | **2.62x faster** |  |
| many-includes | ts-japi | 265 | 2.24x slower |  |
| complex-relationships | kitsu-core | 299 | 1x |  |
| **complex-relationships** | **devour** | **565** | **1.89x faster** |  |
| complex-relationships | yayson | 291 | 1.03x slower |  |
| complex-relationships | jsona | 258 | 1.16x slower |  |
| complex-relationships | ts-japi | 191 | 1.56x slower |  |
| wide-relationship | kitsu-core | 3,312 | 1x |  |
| **wide-relationship** | **devour** | **14,098** | **4.26x faster** |  |
| wide-relationship | yayson | 11,221 | 3.39x faster |  |
| wide-relationship | jsona | 5,597 | 1.69x faster |  |
| wide-relationship | ts-japi | 11,568 | 3.49x faster |  |
| self-cycle | kitsu-core | 1,507,390 | 1x |  |
| self-cycle | devour | 1,126,102 | 1.34x slower |  |
| self-cycle | yayson | 802,501 | 1.88x slower |  |
| **self-cycle** | **jsona** | **1,557,249** | **1.03x faster** |  |
| self-cycle | ts-japi | 414,901 | 3.63x slower |  |
| mutual-cycle | kitsu-core | 1,454,466 | 1x |  |
| mutual-cycle | devour | 1,153,567 | 1.26x slower |  |
| mutual-cycle | yayson | 811,291 | 1.79x slower |  |
| **mutual-cycle** | **jsona** | **1,605,076** | **1.1x faster** |  |
| mutual-cycle | ts-japi | 420,163 | 3.46x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 629,197 | 1x |  |
| **small-no-relationships** | **devour** | **884,306** | **1.41x faster** |  |
| small-no-relationships | yayson | 474,516 | 1.33x slower |  |
| small-no-relationships | jsona | 883,319 | 1.4x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 535,023 | 1x |  |
| small-links-only | devour | 502,348 | 1.07x slower |  |
| small-links-only | yayson | 408,818 | 1.31x slower |  |
| **small-links-only** | **jsona** | **845,498** | **1.58x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 222,040 | 1x |  |
| small-relationships | devour | 188,011 | 1.18x slower |  |
| small-relationships | yayson | 140,401 | 1.58x slower |  |
| **small-relationships** | **jsona** | **262,603** | **1.18x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 288,779 | 1x |  |
| nested-relationships | devour | 225,362 | 1.28x slower |  |
| nested-relationships | yayson | 169,019 | 1.71x slower |  |
| **nested-relationships** | **jsona** | **307,464** | **1.06x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 52,005 | 1x |  |
| collection | devour | 42,353 | 1.23x slower |  |
| collection | yayson | 69,788 | 1.34x faster |  |
| **collection** | **jsona** | **152,298** | **2.93x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 29,132 | 1x |  |
| collection-includes | devour | 56,047 | 1.92x faster |  |
| collection-includes | yayson | 61,931 | 2.13x faster |  |
| **collection-includes** | **jsona** | **77,071** | **2.65x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,180,762 | 1x |  |
| **patch-single** | **devour** | **1,291,029** | **1.09x faster** |  |
| patch-single | yayson | 539,270 | 2.19x slower |  |
| patch-single | jsona | 1,142,732 | 1.03x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 451,286 | 1x |  |
| empty-relationships | devour | 336,322 | 1.34x slower |  |
| empty-relationships | yayson | 315,411 | 1.43x slower |  |
| **empty-relationships** | **jsona** | **552,030** | **1.22x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **298** | **1x** |  |
| few-includes | devour | 241 | 1.24x slower |  |
| few-includes | yayson | 229 | 1.3x slower |  |
| few-includes | jsona | 296 | 1.01x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **153** | **1x** |  |
| many-includes | devour | 3.84 | 39.9x slower |  |
| many-includes | yayson | 19.25 | 7.95x slower |  |
| many-includes | jsona | 143 | 1.07x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **27.78** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.48 | 57.77x slower |  |
| complex-relationships | jsona | 17.69 | 1.57x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **230** | **1x** |  |
| wide-relationship | devour | 2.38 | 96.33x slower |  |
| wide-relationship | yayson | 9.54 | 24.09x slower |  |
| wide-relationship | jsona | 169 | 1.36x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 260,050 | 1x |  |
| self-cycle | devour | 183,981 | 1.41x slower |  |
| self-cycle | yayson | 155,963 | 1.67x slower |  |
| **self-cycle** | **jsona** | **272,036** | **1.05x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **223,053** | **1x** |  |
| mutual-cycle | devour | 152,288 | 1.46x slower |  |
| mutual-cycle | yayson | 130,440 | 1.71x slower |  |
| mutual-cycle | jsona | 217,522 | 1.03x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 61,718 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **151,325** | **2.45x faster** |  |
| small-no-relationships | fetchja | 136,350 | 2.21x faster |  |
| small-no-relationships | devour | 55,461 | 1.11x slower |  |
| small-links-only | kitsu | 58,474 | 1x |  |
| **small-links-only** | **kitsu-native** | **134,015** | **2.29x faster** |  |
| small-links-only | fetchja | 121,694 | 2.08x faster |  |
| small-links-only | devour | 51,343 | 1.14x slower |  |
| small-relationships | kitsu | 46,786 | 1x |  |
| **small-relationships** | **kitsu-native** | **84,051** | **1.8x faster** |  |
| small-relationships | fetchja | 75,061 | 1.6x faster |  |
| small-relationships | devour | 40,209 | 1.16x slower |  |
| nested-relationships | kitsu | 47,188 | 1x |  |
| **nested-relationships** | **kitsu-native** | **90,940** | **1.93x faster** |  |
| nested-relationships | fetchja | 83,013 | 1.76x faster |  |
| nested-relationships | devour | 42,074 | 1.12x slower |  |
| collection | kitsu | 18,174 | 1x |  |
| collection | kitsu-native | 18,158 | <1.01x slower |  |
| **collection** | **fetchja** | **19,985** | **1.1x faster** |  |
| collection | devour | 17,292 | 1.05x slower |  |
| collection-includes | kitsu | 17,011 | 1x |  |
| collection-includes | kitsu-native | 17,818 | 1.05x faster |  |
| collection-includes | fetchja | 18,146 | 1.07x faster |  |
| **collection-includes** | **devour** | **18,411** | **1.08x faster** |  |
| patch-single | kitsu | 65,179 | 1x |  |
| **patch-single** | **kitsu-native** | **174,641** | **2.68x faster** |  |
| patch-single | fetchja | 146,046 | 2.24x faster |  |
| patch-single | devour | 57,790 | 1.13x slower |  |
| empty-relationships | kitsu | 58,340 | 1x |  |
| **empty-relationships** | **kitsu-native** | **134,215** | **2.3x faster** |  |
| empty-relationships | fetchja | 120,796 | 2.07x faster |  |
| empty-relationships | devour | 50,647 | 1.15x slower |  |
| few-includes | kitsu | 354 | 1x |  |
| **few-includes** | **kitsu-native** | **355** | **<1.01x faster** |  |
| few-includes | fetchja | 304 | 1.16x slower |  |
| few-includes | devour | 235 | 1.5x slower |  |
| **many-includes** | **kitsu** | **145** | **1x** |  |
| many-includes | kitsu-native | 143 | 1.01x slower |  |
| many-includes | fetchja | 135 | 1.07x slower |  |
| many-includes | devour | 5.78 | 25.07x slower |  |
| **complex-relationships** | **kitsu** | **21.46** | **1x** |  |
| complex-relationships | kitsu-native | 21.27 | 1.01x slower |  |
| complex-relationships | fetchja | 17.66 | 1.22x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **152** | **1x** |  |
| wide-relationship | kitsu-native | 138 | 1.1x slower |  |
| wide-relationship | fetchja | 120 | 1.27x slower |  |
| wide-relationship | devour | 2.96 | 51.27x slower |  |
| self-cycle | kitsu | 45,308 | 1x |  |
| **self-cycle** | **kitsu-native** | **85,457** | **1.89x faster** |  |
| self-cycle | fetchja | 76,217 | 1.68x faster |  |
| self-cycle | devour | 38,645 | 1.17x slower |  |
| mutual-cycle | kitsu | 42,721 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **72,433** | **1.7x faster** |  |
| mutual-cycle | fetchja | 67,789 | 1.59x faster |  |
| mutual-cycle | devour | 34,722 | 1.23x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 56,486 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **274,888** | **4.87x faster** |  |
| small-no-relationships | fetchja | 227,404 | 4.03x faster |  |
| small-no-relationships | devour | 54,926 | 1.03x slower |  |
| small-links-only | kitsu | 57,323 | 1x |  |
| **small-links-only** | **kitsu-native** | **271,589** | **4.74x faster** |  |
| small-links-only | fetchja | 234,481 | 4.09x faster |  |
| small-links-only | devour | 52,536 | 1.09x slower |  |
| small-relationships | kitsu | 46,271 | 1x |  |
| **small-relationships** | **kitsu-native** | **176,062** | **3.81x faster** |  |
| small-relationships | fetchja | 166,364 | 3.6x faster |  |
| small-relationships | devour | 45,202 | 1.02x slower |  |
| nested-relationships | kitsu | 53,581 | 1x |  |
| **nested-relationships** | **kitsu-native** | **241,709** | **4.51x faster** |  |
| nested-relationships | fetchja | 201,800 | 3.77x faster |  |
| nested-relationships | devour | 49,696 | 1.08x slower |  |
| collection | kitsu | 25,675 | 1x |  |
| **collection** | **kitsu-native** | **44,130** | **1.72x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 14,537 | 1x |  |
| **collection-includes** | **kitsu-native** | **21,128** | **1.45x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 61,115 | 1x |  |
| **patch-single** | **kitsu-native** | **354,297** | **5.8x faster** |  |
| patch-single | fetchja | 260,417 | 4.26x faster |  |
| patch-single | devour | 58,495 | 1.04x slower |  |
| empty-relationships | kitsu | 50,623 | 1x |  |
| **empty-relationships** | **kitsu-native** | **230,950** | **4.56x faster** |  |
| empty-relationships | fetchja | 202,454 | 4x faster |  |
| empty-relationships | devour | 45,426 | 1.11x slower |  |
| **few-includes** | **kitsu** | **306** | **1x** |  |
| few-includes | kitsu-native | 298 | 1.03x slower |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 282 | 1x |  |
| **many-includes** | **kitsu-native** | **308** | **1.09x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 94.06 | 1x |  |
| **complex-relationships** | **kitsu-native** | **114** | **1.22x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 777 | 1x |  |
| **wide-relationship** | **kitsu-native** | **895** | **1.15x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 52,795 | 1x |  |
| **self-cycle** | **kitsu-native** | **235,079** | **4.45x faster** |  |
| self-cycle | fetchja | 193,753 | 3.67x faster |  |
| self-cycle | devour | 48,413 | 1.09x slower |  |
| mutual-cycle | kitsu | 52,715 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **228,991** | **4.34x faster** |  |
| mutual-cycle | fetchja | 195,174 | 3.7x faster |  |
| mutual-cycle | devour | 46,657 | 1.13x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 58,730 | 1x | 29,365 cycles/s |
| **small-no-relationships** | **kitsu-native** | **191,937** | **3.27x faster** | **95,969 cycles/s** |
| small-no-relationships | fetchja | 162,145 | 2.76x faster | 81,073 cycles/s |
| small-no-relationships | devour | 54,456 | 1.08x slower | 27,228 cycles/s |
| small-links-only | kitsu | 57,508 | 1x | 28,754 cycles/s |
| **small-links-only** | **kitsu-native** | **176,135** | **3.06x faster** | **88,067 cycles/s** |
| small-links-only | fetchja | 157,064 | 2.73x faster | 78,532 cycles/s |
| small-links-only | devour | 51,499 | 1.12x slower | 25,749 cycles/s |
| small-relationships | kitsu | 44,714 | 1x | 22,357 cycles/s |
| **small-relationships** | **kitsu-native** | **101,669** | **2.27x faster** | **50,834 cycles/s** |
| small-relationships | fetchja | 91,432 | 2.04x faster | 45,716 cycles/s |
| small-relationships | devour | 40,101 | 1.12x slower | 20,051 cycles/s |
| nested-relationships | kitsu | 50,488 | 1x | 25,244 cycles/s |
| **nested-relationships** | **kitsu-native** | **125,965** | **2.49x faster** | **62,983 cycles/s** |
| nested-relationships | fetchja | 104,356 | 2.07x faster | 52,178 cycles/s |
| nested-relationships | devour | 43,170 | 1.17x slower | 21,585 cycles/s |
| collection | kitsu | 20,333 | 1x | 10,166 cycles/s |
| **collection** | **kitsu-native** | **24,276** | **1.19x faster** | **12,138 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 15,466 | 1x | 7,733 cycles/s |
| **collection-includes** | **kitsu-native** | **17,235** | **1.11x faster** | **8,618 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 62,749 | 1x | 31,374 cycles/s |
| **patch-single** | **kitsu-native** | **229,430** | **3.66x faster** | **114,715 cycles/s** |
| patch-single | fetchja | 177,129 | 2.82x faster | 88,565 cycles/s |
| patch-single | devour | 56,835 | 1.1x slower | 28,417 cycles/s |
| empty-relationships | kitsu | 54,442 | 1x | 27,221 cycles/s |
| **empty-relationships** | **kitsu-native** | **165,958** | **3.05x faster** | **82,979 cycles/s** |
| empty-relationships | fetchja | 143,985 | 2.64x faster | 71,993 cycles/s |
| empty-relationships | devour | 47,372 | 1.15x slower | 23,686 cycles/s |
| few-includes | kitsu | 313 | 1x | 157 cycles/s |
| **few-includes** | **kitsu-native** | **319** | **1.02x faster** | **160 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **186** | **1x** | **92\.82 cycles/s** |
| many-includes | kitsu-native | 175 | 1.06x slower | 87\.46 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 33.63 | 1x | 16\.82 cycles/s |
| **complex-relationships** | **kitsu-native** | **34.22** | **1.02x faster** | **17\.11 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **247** | **1x** | **124 cycles/s** |
| wide-relationship | kitsu-native | 240 | 1.03x slower | 120 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 46,716 | 1x | 23,358 cycles/s |
| **self-cycle** | **kitsu-native** | **115,832** | **2.48x faster** | **57,916 cycles/s** |
| self-cycle | fetchja | 103,538 | 2.22x faster | 51,769 cycles/s |
| self-cycle | devour | 40,686 | 1.15x slower | 20,343 cycles/s |
| mutual-cycle | kitsu | 45,087 | 1x | 22,544 cycles/s |
| **mutual-cycle** | **kitsu-native** | **100,131** | **2.22x faster** | **50,066 cycles/s** |
| mutual-cycle | fetchja | 92,871 | 2.06x faster | 46,435 cycles/s |
| mutual-cycle | devour | 39,198 | 1.15x slower | 19,599 cycles/s |

</details>


- Codec APIs: kitsu-core, devour, yayson, jsona, ts-japi (encode only).
- Client APIs: kitsu, fetchja, devour. Public single-resource clients report collection writes as unsupported.

Full fixtures use 1,000 primary resources, 3 shared or 3,000 distinct includes, a complex graph with 21,016 includes and one wide relationship with 4,000 identifiers.
<!-- benchmark:end -->

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
