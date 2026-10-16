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

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/38913138113)

### bun 1\.4\.3

Measured commit: `c5d7c562c1a48e5ecccd50a81d701452f70dc387`. Runner: linux x64, AMD EPYC 7763 64-Core Processor.

Built package fingerprint: `224176e00cdc9ab35518a648a0c1ead0f93fc80c838c70f97263aeb70f3cd843`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,016,597 | 1x |  |
| **small-no-relationships** | **devour** | **1,283,886** | **1.26x faster** |  |
| small-no-relationships | yayson | 753,881 | 1.35x slower |  |
| small-no-relationships | jsona | 1,139,208 | 1.12x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 738,111 | 1x |  |
| small-links-only | devour | 902,157 | 1.22x faster |  |
| small-links-only | yayson | 539,759 | 1.37x slower |  |
| **small-links-only** | **jsona** | **1,065,367** | **1.44x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| **small-relationships** | **kitsu-core** | **325,738** | **1x** |  |
| small-relationships | devour | 271,318 | 1.2x slower |  |
| small-relationships | yayson | 197,702 | 1.65x slower |  |
| small-relationships | jsona | 314,624 | 1.04x slower |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **441,457** | **1x** |  |
| nested-relationships | devour | 323,502 | 1.36x slower |  |
| nested-relationships | yayson | 269,633 | 1.64x slower |  |
| nested-relationships | jsona | 347,217 | 1.27x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 68,855 | 1x |  |
| collection | devour | 86,201 | 1.25x faster |  |
| collection | yayson | 69,509 | 1.01x faster |  |
| **collection** | **jsona** | **239,690** | **3.48x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 56,239 | 1x |  |
| collection-includes | devour | 112,111 | 1.99x faster |  |
| collection-includes | yayson | 99,129 | 1.76x faster |  |
| **collection-includes** | **jsona** | **118,575** | **2.11x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **1,837,439** | **1x** |  |
| patch-single | devour | 1,511,250 | 1.22x slower |  |
| patch-single | yayson | 813,427 | 2.26x slower |  |
| patch-single | jsona | 1,206,302 | 1.52x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 761,713 | 1x |  |
| empty-relationships | devour | 625,769 | 1.22x slower |  |
| empty-relationships | yayson | 615,681 | 1.24x slower |  |
| **empty-relationships** | **jsona** | **939,097** | **1.23x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **782** | **1x** |  |
| few-includes | devour | 431 | 1.81x slower |  |
| few-includes | yayson | 526 | 1.49x slower |  |
| few-includes | jsona | 497 | 1.57x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **370** | **1x** |  |
| many-includes | devour | 5.7 | 64.96x slower |  |
| many-includes | yayson | 30.66 | 12.07x slower |  |
| many-includes | jsona | 172 | 2.15x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **55.7** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.71 | 78.02x slower |  |
| complex-relationships | jsona | 24.05 | 2.32x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **403** | **1x** |  |
| wide-relationship | devour | 4 | 101x slower |  |
| wide-relationship | yayson | 17.4 | 23.14x slower |  |
| wide-relationship | jsona | 146 | 2.77x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **387,849** | **1x** |  |
| self-cycle | devour | 261,549 | 1.48x slower |  |
| self-cycle | yayson | 223,573 | 1.73x slower |  |
| self-cycle | jsona | 302,083 | 1.28x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **319,836** | **1x** |  |
| mutual-cycle | devour | 224,669 | 1.42x slower |  |
| mutual-cycle | yayson | 193,240 | 1.66x slower |  |
| mutual-cycle | jsona | 244,209 | 1.31x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,264,164 | 1x |  |
| **small-no-relationships** | **devour** | **2,771,465** | **2.19x faster** |  |
| small-no-relationships | yayson | 1,714,331 | 1.36x faster |  |
| small-no-relationships | jsona | 2,126,121 | 1.68x faster |  |
| small-no-relationships | ts-japi | 805,262 | 1.57x slower |  |
| small-links-only | kitsu-core | 1,573,237 | 1x |  |
| small-links-only | devour | 1,772,903 | 1.13x faster |  |
| small-links-only | yayson | 1,447,946 | 1.09x slower |  |
| **small-links-only** | **jsona** | **2,108,804** | **1.34x faster** |  |
| small-links-only | ts-japi | 777,402 | 2.02x slower |  |
| small-relationships | kitsu-core | 847,637 | 1x |  |
| **small-relationships** | **devour** | **1,063,446** | **1.25x faster** |  |
| small-relationships | yayson | 851,759 | <1.01x faster |  |
| small-relationships | jsona | 818,470 | 1.04x slower |  |
| small-relationships | ts-japi | 391,004 | 2.17x slower |  |
| **nested-relationships** | **kitsu-core** | **1,853,269** | **1x** |  |
| nested-relationships | devour | 1,347,111 | 1.38x slower |  |
| nested-relationships | yayson | 940,443 | 1.97x slower |  |
| nested-relationships | jsona | 897,894 | 2.06x slower |  |
| nested-relationships | ts-japi | 412,214 | 4.5x slower |  |
| collection | kitsu-core | 128,139 | 1x |  |
| collection | devour | 146,409 | 1.14x faster |  |
| collection | yayson | 211,805 | 1.65x faster |  |
| **collection** | **jsona** | **469,189** | **3.66x faster** |  |
| collection | ts-japi | 246,006 | 1.92x faster |  |
| collection-includes | kitsu-core | 66,700 | 1x |  |
| collection-includes | devour | 210,233 | 3.15x faster |  |
| **collection-includes** | **yayson** | **259,393** | **3.89x faster** |  |
| collection-includes | jsona | 225,441 | 3.38x faster |  |
| collection-includes | ts-japi | 144,329 | 2.16x faster |  |
| **patch-single** | **kitsu-core** | **4,791,787** | **1x** |  |
| patch-single | devour | 4,502,522 | 1.06x slower |  |
| patch-single | yayson | 1,886,045 | 2.54x slower |  |
| patch-single | jsona | 2,476,780 | 1.93x slower |  |
| patch-single | ts-japi | 737,743 | 6.5x slower |  |
| empty-relationships | kitsu-core | 960,572 | 1x |  |
| **empty-relationships** | **devour** | **1,156,027** | **1.2x faster** |  |
| empty-relationships | yayson | 937,259 | 1.02x slower |  |
| empty-relationships | jsona | 1,078,508 | 1.12x faster |  |
| empty-relationships | ts-japi | 410,763 | 2.34x slower |  |
| few-includes | kitsu-core | 720 | 1x |  |
| **few-includes** | **devour** | **1,538** | **2.14x faster** |  |
| few-includes | yayson | 1,038 | 1.44x faster |  |
| few-includes | jsona | 810 | 1.12x faster |  |
| few-includes | ts-japi | 510 | 1.41x slower |  |
| many-includes | kitsu-core | 841 | 1x |  |
| **many-includes** | **devour** | **1,172** | **1.39x faster** |  |
| many-includes | yayson | 1,089 | 1.29x faster |  |
| many-includes | jsona | 871 | 1.04x faster |  |
| many-includes | ts-japi | 506 | 1.66x slower |  |
| complex-relationships | kitsu-core | 463 | 1x |  |
| **complex-relationships** | **devour** | **769** | **1.66x faster** |  |
| complex-relationships | yayson | 657 | 1.42x faster |  |
| complex-relationships | jsona | 350 | 1.32x slower |  |
| complex-relationships | ts-japi | 347 | 1.33x slower |  |
| wide-relationship | kitsu-core | 4,258 | 1x |  |
| wide-relationship | devour | 13,621 | 3.2x faster |  |
| **wide-relationship** | **yayson** | **18,880** | **4.43x faster** |  |
| wide-relationship | jsona | 3,574 | 1.19x slower |  |
| wide-relationship | ts-japi | 6,646 | 1.56x faster |  |
| **self-cycle** | **kitsu-core** | **1,776,104** | **1x** |  |
| self-cycle | devour | 1,362,250 | 1.3x slower |  |
| self-cycle | yayson | 877,947 | 2.02x slower |  |
| self-cycle | jsona | 866,510 | 2.05x slower |  |
| self-cycle | ts-japi | 395,107 | 4.5x slower |  |
| **mutual-cycle** | **kitsu-core** | **1,797,667** | **1x** |  |
| mutual-cycle | devour | 1,275,832 | 1.41x slower |  |
| mutual-cycle | yayson | 893,909 | 2.01x slower |  |
| mutual-cycle | jsona | 898,009 | 2x slower |  |
| mutual-cycle | ts-japi | 405,506 | 4.43x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 504,692 | 1x |  |
| **small-no-relationships** | **devour** | **732,859** | **1.45x faster** |  |
| small-no-relationships | yayson | 508,606 | 1.01x faster |  |
| small-no-relationships | jsona | 655,451 | 1.3x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 431,414 | 1x |  |
| small-links-only | devour | 493,241 | 1.14x faster |  |
| small-links-only | yayson | 334,609 | 1.29x slower |  |
| **small-links-only** | **jsona** | **568,249** | **1.32x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 186,718 | 1x |  |
| **small-relationships** | **devour** | **191,837** | **1.03x faster** |  |
| small-relationships | yayson | 148,338 | 1.26x slower |  |
| small-relationships | jsona | 186,808 | <1.01x faster |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **262,036** | **1x** |  |
| nested-relationships | devour | 231,132 | 1.13x slower |  |
| nested-relationships | yayson | 188,370 | 1.39x slower |  |
| nested-relationships | jsona | 216,843 | 1.21x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 39,508 | 1x |  |
| collection | devour | 45,100 | 1.14x faster |  |
| collection | yayson | 45,545 | 1.15x faster |  |
| **collection** | **jsona** | **110,923** | **2.81x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 28,583 | 1x |  |
| collection-includes | devour | 63,357 | 2.22x faster |  |
| collection-includes | yayson | 55,947 | 1.96x faster |  |
| **collection-includes** | **jsona** | **70,870** | **2.48x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **959,981** | **1x** |  |
| patch-single | devour | 902,865 | 1.06x slower |  |
| patch-single | yayson | 529,625 | 1.81x slower |  |
| patch-single | jsona | 653,623 | 1.47x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 338,846 | 1x |  |
| empty-relationships | devour | 322,116 | 1.05x slower |  |
| empty-relationships | yayson | 306,844 | 1.1x slower |  |
| **empty-relationships** | **jsona** | **383,980** | **1.13x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **301** | **1x** |  |
| few-includes | devour | 275 | 1.09x slower |  |
| few-includes | yayson | 229 | 1.32x slower |  |
| few-includes | jsona | 256 | 1.17x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **218** | **1x** |  |
| many-includes | devour | 5.65 | 38.53x slower |  |
| many-includes | yayson | 29.57 | 7.36x slower |  |
| many-includes | jsona | 119 | 1.83x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **41.91** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.71 | 58.63x slower |  |
| complex-relationships | jsona | 18.84 | 2.23x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **312** | **1x** |  |
| wide-relationship | devour | 3.98 | 78.47x slower |  |
| wide-relationship | yayson | 17.42 | 17.92x slower |  |
| wide-relationship | jsona | 126 | 2.49x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **245,897** | **1x** |  |
| self-cycle | devour | 191,897 | 1.28x slower |  |
| self-cycle | yayson | 166,012 | 1.48x slower |  |
| self-cycle | jsona | 188,226 | 1.31x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **209,004** | **1x** |  |
| mutual-cycle | devour | 165,824 | 1.26x slower |  |
| mutual-cycle | yayson | 137,920 | 1.52x slower |  |
| mutual-cycle | jsona | 158,650 | 1.32x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 50,919 | 1x |  |
| small-no-relationships | kitsu-native | 189,203 | 3.72x faster |  |
| **small-no-relationships** | **fetchja** | **198,636** | **3.9x faster** |  |
| small-no-relationships | devour | 44,572 | 1.14x slower |  |
| small-links-only | kitsu | 50,950 | 1x |  |
| small-links-only | kitsu-native | 176,044 | 3.46x faster |  |
| **small-links-only** | **fetchja** | **194,454** | **3.82x faster** |  |
| small-links-only | devour | 44,101 | 1.16x slower |  |
| small-relationships | kitsu | 39,581 | 1x |  |
| **small-relationships** | **kitsu-native** | **108,849** | **2.75x faster** |  |
| small-relationships | fetchja | 101,839 | 2.57x faster |  |
| small-relationships | devour | 34,334 | 1.15x slower |  |
| nested-relationships | kitsu | 43,671 | 1x |  |
| **nested-relationships** | **kitsu-native** | **139,014** | **3.18x faster** |  |
| nested-relationships | fetchja | 118,879 | 2.72x faster |  |
| nested-relationships | devour | 34,456 | 1.27x slower |  |
| collection | kitsu | 14,435 | 1x |  |
| collection | kitsu-native | 14,836 | 1.03x faster |  |
| **collection** | **fetchja** | **29,929** | **2.07x faster** |  |
| collection | devour | 15,862 | 1.1x faster |  |
| collection-includes | kitsu | 14,914 | 1x |  |
| collection-includes | kitsu-native | 16,116 | 1.08x faster |  |
| **collection-includes** | **fetchja** | **28,958** | **1.94x faster** |  |
| collection-includes | devour | 16,106 | 1.08x faster |  |
| patch-single | kitsu | 59,117 | 1x |  |
| **patch-single** | **kitsu-native** | **249,762** | **4.22x faster** |  |
| patch-single | fetchja | 215,271 | 3.64x faster |  |
| patch-single | devour | 48,325 | 1.22x slower |  |
| empty-relationships | kitsu | 48,112 | 1x |  |
| empty-relationships | kitsu-native | 172,305 | 3.58x faster |  |
| **empty-relationships** | **fetchja** | **172,842** | **3.59x faster** |  |
| empty-relationships | devour | 44,389 | 1.08x slower |  |
| **few-includes** | **kitsu** | **474** | **1x** |  |
| few-includes | kitsu-native | 458 | 1.04x slower |  |
| few-includes | fetchja | 405 | 1.17x slower |  |
| few-includes | devour | 310 | 1.53x slower |  |
| **many-includes** | **kitsu** | **203** | **1x** |  |
| many-includes | kitsu-native | 203 | <1.01x slower |  |
| many-includes | fetchja | 165 | 1.23x slower |  |
| many-includes | devour | 8.01 | 25.35x slower |  |
| complex-relationships | kitsu | 30.95 | 1x |  |
| **complex-relationships** | **kitsu-native** | **33.05** | **1.07x faster** |  |
| complex-relationships | fetchja | 26.57 | 1.16x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| wide-relationship | kitsu | 199 | 1x |  |
| **wide-relationship** | **kitsu-native** | **203** | **1.02x faster** |  |
| wide-relationship | fetchja | 158 | 1.25x slower |  |
| wide-relationship | devour | 5.23 | 37.94x slower |  |
| self-cycle | kitsu | 44,023 | 1x |  |
| **self-cycle** | **kitsu-native** | **130,023** | **2.95x faster** |  |
| self-cycle | fetchja | 112,131 | 2.55x faster |  |
| self-cycle | devour | 32,221 | 1.37x slower |  |
| mutual-cycle | kitsu | 39,683 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **110,034** | **2.77x faster** |  |
| mutual-cycle | fetchja | 98,274 | 2.48x faster |  |
| mutual-cycle | devour | 30,582 | 1.3x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 44,984 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **251,421** | **5.59x faster** |  |
| small-no-relationships | fetchja | 230,354 | 5.12x faster |  |
| small-no-relationships | devour | 39,893 | 1.13x slower |  |
| small-links-only | kitsu | 45,136 | 1x |  |
| **small-links-only** | **kitsu-native** | **266,839** | **5.91x faster** |  |
| small-links-only | fetchja | 221,845 | 4.91x faster |  |
| small-links-only | devour | 41,831 | 1.08x slower |  |
| small-relationships | kitsu | 35,370 | 1x |  |
| **small-relationships** | **kitsu-native** | **179,812** | **5.08x faster** |  |
| small-relationships | fetchja | 168,624 | 4.77x faster |  |
| small-relationships | devour | 32,318 | 1.09x slower |  |
| nested-relationships | kitsu | 43,988 | 1x |  |
| **nested-relationships** | **kitsu-native** | **251,671** | **5.72x faster** |  |
| nested-relationships | fetchja | 194,976 | 4.43x faster |  |
| nested-relationships | devour | 35,596 | 1.24x slower |  |
| collection | kitsu | 16,672 | 1x |  |
| **collection** | **kitsu-native** | **33,021** | **1.98x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 11,111 | 1x |  |
| **collection-includes** | **kitsu-native** | **17,230** | **1.55x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 50,757 | 1x |  |
| **patch-single** | **kitsu-native** | **329,136** | **6.48x faster** |  |
| patch-single | fetchja | 257,540 | 5.07x faster |  |
| patch-single | devour | 43,419 | 1.17x slower |  |
| empty-relationships | kitsu | 38,877 | 1x |  |
| empty-relationships | kitsu-native | 202,937 | 5.22x faster |  |
| **empty-relationships** | **fetchja** | **205,137** | **5.28x faster** |  |
| empty-relationships | devour | 37,071 | 1.05x slower |  |
| few-includes | kitsu | 409 | 1x |  |
| **few-includes** | **kitsu-native** | **455** | **1.11x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **360** | **1x** |  |
| many-includes | kitsu-native | 351 | 1.02x slower |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 109 | 1x |  |
| **complex-relationships** | **kitsu-native** | **122** | **1.12x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **765** | **1x** |  |
| wide-relationship | kitsu-native | 756 | 1.01x slower |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 43,651 | 1x |  |
| **self-cycle** | **kitsu-native** | **261,898** | **6x faster** |  |
| self-cycle | fetchja | 205,999 | 4.72x faster |  |
| self-cycle | devour | 36,041 | 1.21x slower |  |
| mutual-cycle | kitsu | 41,488 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **245,571** | **5.92x faster** |  |
| mutual-cycle | fetchja | 196,884 | 4.75x faster |  |
| mutual-cycle | devour | 36,100 | 1.15x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 46,058 | 1x | 23,029 cycles/s |
| **small-no-relationships** | **kitsu-native** | **215,524** | **4.68x faster** | **107,762 cycles/s** |
| small-no-relationships | fetchja | 177,257 | 3.85x faster | 88,629 cycles/s |
| small-no-relationships | devour | 38,803 | 1.19x slower | 19,401 cycles/s |
| small-links-only | kitsu | 44,801 | 1x | 22,401 cycles/s |
| **small-links-only** | **kitsu-native** | **196,390** | **4.38x faster** | **98,195 cycles/s** |
| small-links-only | fetchja | 190,198 | 4.25x faster | 95,099 cycles/s |
| small-links-only | devour | 39,354 | 1.14x slower | 19,677 cycles/s |
| small-relationships | kitsu | 32,622 | 1x | 16,311 cycles/s |
| **small-relationships** | **kitsu-native** | **116,436** | **3.57x faster** | **58,218 cycles/s** |
| small-relationships | fetchja | 114,456 | 3.51x faster | 57,228 cycles/s |
| small-relationships | devour | 29,816 | 1.09x slower | 14,908 cycles/s |
| nested-relationships | kitsu | 40,271 | 1x | 20,136 cycles/s |
| **nested-relationships** | **kitsu-native** | **146,515** | **3.64x faster** | **73,258 cycles/s** |
| nested-relationships | fetchja | 128,519 | 3.19x faster | 64,260 cycles/s |
| nested-relationships | devour | 31,464 | 1.28x slower | 15,732 cycles/s |
| collection | kitsu | 14,923 | 1x | 7,462 cycles/s |
| **collection** | **kitsu-native** | **19,910** | **1.33x faster** | **9,955 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 12,598 | 1x | 6,299 cycles/s |
| **collection-includes** | **kitsu-native** | **16,267** | **1.29x faster** | **8,133 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 49,825 | 1x | 24,912 cycles/s |
| **patch-single** | **kitsu-native** | **268,284** | **5.38x faster** | **134,142 cycles/s** |
| patch-single | fetchja | 211,384 | 4.24x faster | 105,692 cycles/s |
| patch-single | devour | 43,440 | 1.15x slower | 21,720 cycles/s |
| empty-relationships | kitsu | 37,087 | 1x | 18,543 cycles/s |
| empty-relationships | kitsu-native | 161,716 | 4.36x faster | 80,858 cycles/s |
| **empty-relationships** | **fetchja** | **162,182** | **4.37x faster** | **81,091 cycles/s** |
| empty-relationships | devour | 34,049 | 1.09x slower | 17,025 cycles/s |
| few-includes | kitsu | 379 | 1x | 189 cycles/s |
| **few-includes** | **kitsu-native** | **383** | **1.01x faster** | **191 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 226 | 1x | 113 cycles/s |
| **many-includes** | **kitsu-native** | **229** | **1.01x faster** | **114 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **49.76** | **1x** | **24\.88 cycles/s** |
| complex-relationships | kitsu-native | 42.58 | 1.17x slower | 21\.29 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 308 | 1x | 154 cycles/s |
| **wide-relationship** | **kitsu-native** | **311** | **1.01x faster** | **156 cycles/s** |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 37,501 | 1x | 18,750 cycles/s |
| **self-cycle** | **kitsu-native** | **147,576** | **3.94x faster** | **73,788 cycles/s** |
| self-cycle | fetchja | 125,693 | 3.35x faster | 62,847 cycles/s |
| self-cycle | devour | 31,202 | 1.2x slower | 15,601 cycles/s |
| mutual-cycle | kitsu | 35,663 | 1x | 17,831 cycles/s |
| **mutual-cycle** | **kitsu-native** | **127,499** | **3.58x faster** | **63,749 cycles/s** |
| mutual-cycle | fetchja | 116,936 | 3.28x faster | 58,468 cycles/s |
| mutual-cycle | devour | 29,861 | 1.19x slower | 14,931 cycles/s |

</details>

### node v26\.12\.0

Measured commit: `c5d7c562c1a48e5ecccd50a81d701452f70dc387`. Runner: linux x64, INTEL\(R\) XEON\(R\) PLATINUM 8573C.

Built package fingerprint: `224176e00cdc9ab35518a648a0c1ead0f93fc80c838c70f97263aeb70f3cd843`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,170,950 | 1x |  |
| **small-no-relationships** | **devour** | **1,780,438** | **1.52x faster** |  |
| small-no-relationships | yayson | 814,298 | 1.44x slower |  |
| small-no-relationships | jsona | 1,662,667 | 1.42x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 926,708 | 1x |  |
| small-links-only | devour | 949,914 | 1.03x faster |  |
| small-links-only | yayson | 626,974 | 1.48x slower |  |
| **small-links-only** | **jsona** | **1,522,037** | **1.64x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 317,512 | 1x |  |
| small-relationships | devour | 272,045 | 1.17x slower |  |
| small-relationships | yayson | 199,709 | 1.59x slower |  |
| **small-relationships** | **jsona** | **349,767** | **1.1x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 402,234 | 1x |  |
| nested-relationships | devour | 317,066 | 1.27x slower |  |
| nested-relationships | yayson | 238,339 | 1.69x slower |  |
| **nested-relationships** | **jsona** | **405,675** | **1.01x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 77,313 | 1x |  |
| collection | devour | 79,602 | 1.03x faster |  |
| collection | yayson | 117,302 | 1.52x faster |  |
| **collection** | **jsona** | **305,090** | **3.95x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 58,686 | 1x |  |
| collection-includes | devour | 94,693 | 1.61x faster |  |
| collection-includes | yayson | 104,235 | 1.78x faster |  |
| **collection-includes** | **jsona** | **125,152** | **2.13x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,949,680 | 1x |  |
| **patch-single** | **devour** | **2,315,070** | **1.19x faster** |  |
| patch-single | yayson | 808,137 | 2.41x slower |  |
| patch-single | jsona | 2,071,261 | 1.06x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 937,202 | 1x |  |
| empty-relationships | devour | 571,362 | 1.64x slower |  |
| empty-relationships | yayson | 643,148 | 1.46x slower |  |
| **empty-relationships** | **jsona** | **1,283,770** | **1.37x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **623** | **1x** |  |
| few-includes | devour | 347 | 1.79x slower |  |
| few-includes | yayson | 383 | 1.63x slower |  |
| few-includes | jsona | 452 | 1.38x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **225** | **1x** |  |
| many-includes | devour | 5.7 | 39.5x slower |  |
| many-includes | yayson | 25.92 | 8.68x slower |  |
| many-includes | jsona | 160 | 1.41x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **32.02** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.45 | 70.88x slower |  |
| complex-relationships | jsona | 19.22 | 1.67x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **249** | **1x** |  |
| wide-relationship | devour | 3.16 | 78.67x slower |  |
| wide-relationship | yayson | 12.27 | 20.25x slower |  |
| wide-relationship | jsona | 153 | 1.63x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 342,183 | 1x |  |
| self-cycle | devour | 251,025 | 1.36x slower |  |
| self-cycle | yayson | 220,030 | 1.56x slower |  |
| **self-cycle** | **jsona** | **348,050** | **1.02x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **278,548** | **1x** |  |
| mutual-cycle | devour | 201,360 | 1.38x slower |  |
| mutual-cycle | yayson | 179,115 | 1.56x slower |  |
| mutual-cycle | jsona | 270,515 | 1.03x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,599,943 | 1x |  |
| small-no-relationships | devour | 2,742,081 | 1.71x faster |  |
| small-no-relationships | yayson | 1,608,507 | 1.01x faster |  |
| **small-no-relationships** | **jsona** | **2,799,673** | **1.75x faster** |  |
| small-no-relationships | ts-japi | 674,451 | 2.37x slower |  |
| small-links-only | kitsu-core | 1,369,510 | 1x |  |
| small-links-only | devour | 1,516,973 | 1.11x faster |  |
| small-links-only | yayson | 1,231,523 | 1.11x slower |  |
| **small-links-only** | **jsona** | **2,943,488** | **2.15x faster** |  |
| small-links-only | ts-japi | 679,124 | 2.02x slower |  |
| small-relationships | kitsu-core | 863,401 | 1x |  |
| small-relationships | devour | 886,792 | 1.03x faster |  |
| small-relationships | yayson | 776,242 | 1.11x slower |  |
| **small-relationships** | **jsona** | **1,323,727** | **1.53x faster** |  |
| small-relationships | ts-japi | 428,934 | 2.01x slower |  |
| nested-relationships | kitsu-core | 1,526,550 | 1x |  |
| nested-relationships | devour | 1,126,079 | 1.36x slower |  |
| nested-relationships | yayson | 909,006 | 1.68x slower |  |
| **nested-relationships** | **jsona** | **1,910,758** | **1.25x faster** |  |
| nested-relationships | ts-japi | 483,663 | 3.16x slower |  |
| collection | kitsu-core | 173,701 | 1x |  |
| collection | devour | 91,126 | 1.91x slower |  |
| collection | yayson | 204,873 | 1.18x faster |  |
| **collection** | **jsona** | **773,064** | **4.45x faster** |  |
| collection | ts-japi | 232,535 | 1.34x faster |  |
| collection-includes | kitsu-core | 73,214 | 1x |  |
| collection-includes | devour | 179,108 | 2.45x faster |  |
| collection-includes | yayson | 214,573 | 2.93x faster |  |
| **collection-includes** | **jsona** | **387,381** | **5.29x faster** |  |
| collection-includes | ts-japi | 142,880 | 1.95x faster |  |
| patch-single | kitsu-core | 4,066,531 | 1x |  |
| patch-single | devour | 3,892,455 | 1.04x slower |  |
| patch-single | yayson | 2,039,043 | 1.99x slower |  |
| **patch-single** | **jsona** | **4,697,994** | **1.16x faster** |  |
| patch-single | ts-japi | 731,251 | 5.56x slower |  |
| empty-relationships | kitsu-core | 1,186,055 | 1x |  |
| empty-relationships | devour | 990,026 | 1.2x slower |  |
| empty-relationships | yayson | 838,342 | 1.41x slower |  |
| **empty-relationships** | **jsona** | **1,731,338** | **1.46x faster** |  |
| empty-relationships | ts-japi | 481,946 | 2.46x slower |  |
| few-includes | kitsu-core | 828 | 1x |  |
| few-includes | devour | 799 | 1.04x slower |  |
| few-includes | yayson | 702 | 1.18x slower |  |
| **few-includes** | **jsona** | **1,601** | **1.93x faster** |  |
| few-includes | ts-japi | 340 | 2.44x slower |  |
| many-includes | kitsu-core | 640 | 1x |  |
| many-includes | devour | 909 | 1.42x faster |  |
| many-includes | yayson | 671 | 1.05x faster |  |
| **many-includes** | **jsona** | **1,451** | **2.27x faster** |  |
| many-includes | ts-japi | 248 | 2.58x slower |  |
| complex-relationships | kitsu-core | 295 | 1x |  |
| **complex-relationships** | **devour** | **454** | **1.54x faster** |  |
| complex-relationships | yayson | 250 | 1.18x slower |  |
| complex-relationships | jsona | 409 | 1.39x faster |  |
| complex-relationships | ts-japi | 205 | 1.44x slower |  |
| wide-relationship | kitsu-core | 2,376 | 1x |  |
| **wide-relationship** | **devour** | **15,474** | **6.51x faster** |  |
| wide-relationship | yayson | 7,287 | 3.07x faster |  |
| wide-relationship | jsona | 7,482 | 3.15x faster |  |
| wide-relationship | ts-japi | 11,312 | 4.76x faster |  |
| self-cycle | kitsu-core | 1,561,633 | 1x |  |
| self-cycle | devour | 1,131,868 | 1.38x slower |  |
| self-cycle | yayson | 856,165 | 1.82x slower |  |
| **self-cycle** | **jsona** | **1,873,685** | **1.2x faster** |  |
| self-cycle | ts-japi | 495,825 | 3.15x slower |  |
| mutual-cycle | kitsu-core | 1,505,801 | 1x |  |
| mutual-cycle | devour | 1,056,676 | 1.43x slower |  |
| mutual-cycle | yayson | 843,314 | 1.79x slower |  |
| **mutual-cycle** | **jsona** | **1,594,897** | **1.06x faster** |  |
| mutual-cycle | ts-japi | 455,061 | 3.31x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 606,397 | 1x |  |
| **small-no-relationships** | **devour** | **961,518** | **1.59x faster** |  |
| small-no-relationships | yayson | 470,404 | 1.29x slower |  |
| small-no-relationships | jsona | 921,269 | 1.52x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 552,955 | 1x |  |
| small-links-only | devour | 541,073 | 1.02x slower |  |
| small-links-only | yayson | 408,329 | 1.35x slower |  |
| **small-links-only** | **jsona** | **887,158** | **1.6x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 221,961 | 1x |  |
| small-relationships | devour | 187,777 | 1.18x slower |  |
| small-relationships | yayson | 146,487 | 1.52x slower |  |
| **small-relationships** | **jsona** | **253,557** | **1.14x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 276,937 | 1x |  |
| nested-relationships | devour | 232,983 | 1.19x slower |  |
| nested-relationships | yayson | 175,964 | 1.57x slower |  |
| **nested-relationships** | **jsona** | **292,804** | **1.06x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 49,244 | 1x |  |
| collection | devour | 39,342 | 1.25x slower |  |
| collection | yayson | 73,305 | 1.49x faster |  |
| **collection** | **jsona** | **162,160** | **3.29x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 28,593 | 1x |  |
| collection-includes | devour | 54,610 | 1.91x faster |  |
| collection-includes | yayson | 63,843 | 2.23x faster |  |
| **collection-includes** | **jsona** | **78,225** | **2.74x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,147,216 | 1x |  |
| **patch-single** | **devour** | **1,372,116** | **1.2x faster** |  |
| patch-single | yayson | 546,346 | 2.1x slower |  |
| patch-single | jsona | 1,163,998 | 1.01x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 481,533 | 1x |  |
| empty-relationships | devour | 349,401 | 1.38x slower |  |
| empty-relationships | yayson | 326,156 | 1.48x slower |  |
| **empty-relationships** | **jsona** | **599,529** | **1.25x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **301** | **1x** |  |
| few-includes | devour | 219 | 1.38x slower |  |
| few-includes | yayson | 212 | 1.42x slower |  |
| few-includes | jsona | 272 | 1.11x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **152** | **1x** |  |
| many-includes | devour | 5.54 | 27.38x slower |  |
| many-includes | yayson | 24.76 | 6.13x slower |  |
| many-includes | jsona | 117 | 1.29x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **24.32** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.44 | 54.85x slower |  |
| complex-relationships | jsona | 16.33 | 1.49x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **220** | **1x** |  |
| wide-relationship | devour | 2.97 | 74.28x slower |  |
| wide-relationship | yayson | 12.33 | 17.87x slower |  |
| wide-relationship | jsona | 140 | 1.58x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 261,794 | 1x |  |
| self-cycle | devour | 188,131 | 1.39x slower |  |
| self-cycle | yayson | 161,780 | 1.62x slower |  |
| **self-cycle** | **jsona** | **269,064** | **1.03x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| mutual-cycle | kitsu-core | 217,999 | 1x |  |
| mutual-cycle | devour | 163,853 | 1.33x slower |  |
| mutual-cycle | yayson | 138,242 | 1.58x slower |  |
| **mutual-cycle** | **jsona** | **221,971** | **1.02x faster** |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 63,298 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **151,841** | **2.4x faster** |  |
| small-no-relationships | fetchja | 140,533 | 2.22x faster |  |
| small-no-relationships | devour | 56,314 | 1.12x slower |  |
| small-links-only | kitsu | 60,186 | 1x |  |
| **small-links-only** | **kitsu-native** | **132,898** | **2.21x faster** |  |
| small-links-only | fetchja | 127,907 | 2.13x faster |  |
| small-links-only | devour | 53,444 | 1.13x slower |  |
| small-relationships | kitsu | 47,302 | 1x |  |
| **small-relationships** | **kitsu-native** | **86,044** | **1.82x faster** |  |
| small-relationships | fetchja | 76,904 | 1.63x faster |  |
| small-relationships | devour | 41,387 | 1.14x slower |  |
| nested-relationships | kitsu | 48,384 | 1x |  |
| **nested-relationships** | **kitsu-native** | **96,000** | **1.98x faster** |  |
| nested-relationships | fetchja | 86,198 | 1.78x faster |  |
| nested-relationships | devour | 44,245 | 1.09x slower |  |
| collection | kitsu | 19,358 | 1x |  |
| collection | kitsu-native | 19,686 | 1.02x faster |  |
| **collection** | **fetchja** | **24,080** | **1.24x faster** |  |
| collection | devour | 18,799 | 1.03x slower |  |
| collection-includes | kitsu | 18,528 | 1x |  |
| collection-includes | kitsu-native | 19,673 | 1.06x faster |  |
| **collection-includes** | **fetchja** | **23,014** | **1.24x faster** |  |
| collection-includes | devour | 21,093 | 1.14x faster |  |
| patch-single | kitsu | 64,005 | 1x |  |
| **patch-single** | **kitsu-native** | **169,811** | **2.65x faster** |  |
| patch-single | fetchja | 149,880 | 2.34x faster |  |
| patch-single | devour | 57,700 | 1.11x slower |  |
| empty-relationships | kitsu | 59,579 | 1x |  |
| **empty-relationships** | **kitsu-native** | **138,189** | **2.32x faster** |  |
| empty-relationships | fetchja | 124,150 | 2.08x faster |  |
| empty-relationships | devour | 51,084 | 1.17x slower |  |
| **few-includes** | **kitsu** | **390** | **1x** |  |
| few-includes | kitsu-native | 353 | 1.11x slower |  |
| few-includes | fetchja | 316 | 1.23x slower |  |
| few-includes | devour | 259 | 1.51x slower |  |
| **many-includes** | **kitsu** | **156** | **1x** |  |
| many-includes | kitsu-native | 152 | 1.02x slower |  |
| many-includes | fetchja | 131 | 1.19x slower |  |
| many-includes | devour | 7.06 | 22.03x slower |  |
| **complex-relationships** | **kitsu** | **22.16** | **1x** |  |
| complex-relationships | kitsu-native | 21.62 | 1.02x slower |  |
| complex-relationships | fetchja | 16.79 | 1.32x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **162** | **1x** |  |
| wide-relationship | kitsu-native | 156 | 1.04x slower |  |
| wide-relationship | fetchja | 139 | 1.17x slower |  |
| wide-relationship | devour | 3.69 | 43.95x slower |  |
| self-cycle | kitsu | 47,993 | 1x |  |
| **self-cycle** | **kitsu-native** | **89,514** | **1.87x faster** |  |
| self-cycle | fetchja | 81,116 | 1.69x faster |  |
| self-cycle | devour | 38,639 | 1.24x slower |  |
| mutual-cycle | kitsu | 44,752 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **80,880** | **1.81x faster** |  |
| mutual-cycle | fetchja | 71,272 | 1.59x faster |  |
| mutual-cycle | devour | 39,043 | 1.15x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 58,307 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **270,420** | **4.64x faster** |  |
| small-no-relationships | fetchja | 238,097 | 4.08x faster |  |
| small-no-relationships | devour | 55,599 | 1.05x slower |  |
| small-links-only | kitsu | 57,462 | 1x |  |
| **small-links-only** | **kitsu-native** | **283,682** | **4.94x faster** |  |
| small-links-only | fetchja | 233,335 | 4.06x faster |  |
| small-links-only | devour | 53,899 | 1.07x slower |  |
| small-relationships | kitsu | 49,005 | 1x |  |
| **small-relationships** | **kitsu-native** | **179,237** | **3.66x faster** |  |
| small-relationships | fetchja | 169,749 | 3.46x faster |  |
| small-relationships | devour | 45,850 | 1.07x slower |  |
| nested-relationships | kitsu | 53,818 | 1x |  |
| **nested-relationships** | **kitsu-native** | **243,010** | **4.52x faster** |  |
| nested-relationships | fetchja | 213,727 | 3.97x faster |  |
| nested-relationships | devour | 50,956 | 1.06x slower |  |
| collection | kitsu | 27,960 | 1x |  |
| **collection** | **kitsu-native** | **44,027** | **1.57x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 15,995 | 1x |  |
| **collection-includes** | **kitsu-native** | **22,099** | **1.38x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 62,861 | 1x |  |
| **patch-single** | **kitsu-native** | **387,456** | **6.16x faster** |  |
| patch-single | fetchja | 271,724 | 4.32x faster |  |
| patch-single | devour | 57,851 | 1.09x slower |  |
| empty-relationships | kitsu | 52,744 | 1x |  |
| **empty-relationships** | **kitsu-native** | **235,221** | **4.46x faster** |  |
| empty-relationships | fetchja | 203,229 | 3.85x faster |  |
| empty-relationships | devour | 48,496 | 1.09x slower |  |
| few-includes | kitsu | 304 | 1x |  |
| **few-includes** | **kitsu-native** | **313** | **1.03x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 311 | 1x |  |
| **many-includes** | **kitsu-native** | **315** | **1.01x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 101 | 1x |  |
| **complex-relationships** | **kitsu-native** | **119** | **1.19x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 879 | 1x |  |
| **wide-relationship** | **kitsu-native** | **1,017** | **1.16x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 53,906 | 1x |  |
| **self-cycle** | **kitsu-native** | **239,464** | **4.44x faster** |  |
| self-cycle | fetchja | 209,315 | 3.88x faster |  |
| self-cycle | devour | 48,618 | 1.11x slower |  |
| mutual-cycle | kitsu | 53,489 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **233,889** | **4.37x faster** |  |
| mutual-cycle | fetchja | 192,666 | 3.6x faster |  |
| mutual-cycle | devour | 50,882 | 1.05x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 59,143 | 1x | 29,572 cycles/s |
| **small-no-relationships** | **kitsu-native** | **194,622** | **3.29x faster** | **97,311 cycles/s** |
| small-no-relationships | fetchja | 171,295 | 2.9x faster | 85,647 cycles/s |
| small-no-relationships | devour | 54,407 | 1.09x slower | 27,204 cycles/s |
| small-links-only | kitsu | 57,412 | 1x | 28,706 cycles/s |
| **small-links-only** | **kitsu-native** | **174,589** | **3.04x faster** | **87,295 cycles/s** |
| small-links-only | fetchja | 157,616 | 2.75x faster | 78,808 cycles/s |
| small-links-only | devour | 52,625 | 1.09x slower | 26,312 cycles/s |
| small-relationships | kitsu | 45,858 | 1x | 22,929 cycles/s |
| **small-relationships** | **kitsu-native** | **103,098** | **2.25x faster** | **51,549 cycles/s** |
| small-relationships | fetchja | 102,497 | 2.24x faster | 51,248 cycles/s |
| small-relationships | devour | 41,689 | 1.1x slower | 20,844 cycles/s |
| nested-relationships | kitsu | 48,930 | 1x | 24,465 cycles/s |
| **nested-relationships** | **kitsu-native** | **126,336** | **2.58x faster** | **63,168 cycles/s** |
| nested-relationships | fetchja | 111,798 | 2.28x faster | 55,899 cycles/s |
| nested-relationships | devour | 44,928 | 1.09x slower | 22,464 cycles/s |
| collection | kitsu | 21,805 | 1x | 10,903 cycles/s |
| **collection** | **kitsu-native** | **26,352** | **1.21x faster** | **13,176 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 16,239 | 1x | 8,119 cycles/s |
| **collection-includes** | **kitsu-native** | **19,259** | **1.19x faster** | **9,630 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 63,675 | 1x | 31,837 cycles/s |
| **patch-single** | **kitsu-native** | **232,126** | **3.65x faster** | **116,063 cycles/s** |
| patch-single | fetchja | 188,141 | 2.95x faster | 94,070 cycles/s |
| patch-single | devour | 56,510 | 1.13x slower | 28,255 cycles/s |
| empty-relationships | kitsu | 55,026 | 1x | 27,513 cycles/s |
| **empty-relationships** | **kitsu-native** | **165,496** | **3.01x faster** | **82,748 cycles/s** |
| empty-relationships | fetchja | 145,145 | 2.64x faster | 72,572 cycles/s |
| empty-relationships | devour | 49,168 | 1.12x slower | 24,584 cycles/s |
| few-includes | kitsu | 316 | 1x | 158 cycles/s |
| **few-includes** | **kitsu-native** | **324** | **1.03x faster** | **162 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **197** | **1x** | **98\.61 cycles/s** |
| many-includes | kitsu-native | 176 | 1.12x slower | 87\.75 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 33.89 | 1x | 16\.95 cycles/s |
| **complex-relationships** | **kitsu-native** | **34.46** | **1.02x faster** | **17\.23 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **277** | **1x** | **138 cycles/s** |
| wide-relationship | kitsu-native | 263 | 1.05x slower | 132 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 48,608 | 1x | 24,304 cycles/s |
| **self-cycle** | **kitsu-native** | **125,081** | **2.57x faster** | **62,540 cycles/s** |
| self-cycle | fetchja | 110,894 | 2.28x faster | 55,447 cycles/s |
| self-cycle | devour | 43,126 | 1.13x slower | 21,563 cycles/s |
| mutual-cycle | kitsu | 45,061 | 1x | 22,531 cycles/s |
| **mutual-cycle** | **kitsu-native** | **113,295** | **2.51x faster** | **56,647 cycles/s** |
| mutual-cycle | fetchja | 104,021 | 2.31x faster | 52,011 cycles/s |
| mutual-cycle | devour | 41,092 | 1.1x slower | 20,546 cycles/s |

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
