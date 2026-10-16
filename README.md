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

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/38835940020)

### bun 1\.4\.3

Measured commit: `6fcfdeab5ce0ae1fbf919c2a9a1302f098e0114b`. Runner: linux x64, AMD EPYC 9V74 80-Core Processor.

Built package fingerprint: `224176e00cdc9ab35518a648a0c1ead0f93fc80c838c70f97263aeb70f3cd843`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,088,784 | 1x |  |
| **small-no-relationships** | **devour** | **1,440,960** | **1.32x faster** |  |
| small-no-relationships | yayson | 836,526 | 1.3x slower |  |
| small-no-relationships | jsona | 1,215,290 | 1.12x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 803,989 | 1x |  |
| small-links-only | devour | 846,175 | 1.05x faster |  |
| small-links-only | yayson | 475,238 | 1.69x slower |  |
| **small-links-only** | **jsona** | **966,649** | **1.2x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| **small-relationships** | **kitsu-core** | **327,575** | **1x** |  |
| small-relationships | devour | 277,387 | 1.18x slower |  |
| small-relationships | yayson | 224,478 | 1.46x slower |  |
| small-relationships | jsona | 318,450 | 1.03x slower |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **433,584** | **1x** |  |
| nested-relationships | devour | 342,562 | 1.27x slower |  |
| nested-relationships | yayson | 288,880 | 1.5x slower |  |
| nested-relationships | jsona | 360,675 | 1.2x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 82,185 | 1x |  |
| collection | devour | 101,428 | 1.23x faster |  |
| collection | yayson | 80,476 | 1.02x slower |  |
| **collection** | **jsona** | **240,626** | **2.93x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 55,846 | 1x |  |
| collection-includes | devour | 121,440 | 2.17x faster |  |
| collection-includes | yayson | 121,134 | 2.17x faster |  |
| **collection-includes** | **jsona** | **144,329** | **2.58x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **1,789,573** | **1x** |  |
| patch-single | devour | 1,652,176 | 1.08x slower |  |
| patch-single | yayson | 820,104 | 2.18x slower |  |
| patch-single | jsona | 1,257,902 | 1.42x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 808,914 | 1x |  |
| empty-relationships | devour | 671,879 | 1.2x slower |  |
| empty-relationships | yayson | 661,234 | 1.22x slower |  |
| **empty-relationships** | **jsona** | **930,870** | **1.15x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **853** | **1x** |  |
| few-includes | devour | 417 | 2.04x slower |  |
| few-includes | yayson | 543 | 1.57x slower |  |
| few-includes | jsona | 545 | 1.57x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **403** | **1x** |  |
| many-includes | devour | 6.38 | 63.12x slower |  |
| many-includes | yayson | 33.39 | 12.06x slower |  |
| many-includes | jsona | 167 | 2.42x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **57.87** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.64 | 90.58x slower |  |
| complex-relationships | jsona | 21.7 | 2.67x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **390** | **1x** |  |
| wide-relationship | devour | 3.91 | 99.79x slower |  |
| wide-relationship | yayson | 17.88 | 21.82x slower |  |
| wide-relationship | jsona | 149 | 2.61x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **350,743** | **1x** |  |
| self-cycle | devour | 248,904 | 1.41x slower |  |
| self-cycle | yayson | 238,809 | 1.47x slower |  |
| self-cycle | jsona | 322,196 | 1.09x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **337,650** | **1x** |  |
| mutual-cycle | devour | 219,527 | 1.54x slower |  |
| mutual-cycle | yayson | 205,778 | 1.64x slower |  |
| mutual-cycle | jsona | 262,521 | 1.29x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,741,466 | 1x |  |
| **small-no-relationships** | **devour** | **3,256,081** | **1.87x faster** |  |
| small-no-relationships | yayson | 1,858,794 | 1.07x faster |  |
| small-no-relationships | jsona | 2,077,641 | 1.19x faster |  |
| small-no-relationships | ts-japi | 808,555 | 2.15x slower |  |
| small-links-only | kitsu-core | 1,612,824 | 1x |  |
| small-links-only | devour | 1,699,295 | 1.05x faster |  |
| small-links-only | yayson | 1,405,044 | 1.15x slower |  |
| **small-links-only** | **jsona** | **2,163,496** | **1.34x faster** |  |
| small-links-only | ts-japi | 695,753 | 2.32x slower |  |
| small-relationships | kitsu-core | 925,596 | 1x |  |
| **small-relationships** | **devour** | **1,201,516** | **1.3x faster** |  |
| small-relationships | yayson | 967,315 | 1.05x faster |  |
| small-relationships | jsona | 895,249 | 1.03x slower |  |
| small-relationships | ts-japi | 398,711 | 2.32x slower |  |
| **nested-relationships** | **kitsu-core** | **1,885,368** | **1x** |  |
| nested-relationships | devour | 1,373,476 | 1.37x slower |  |
| nested-relationships | yayson | 1,006,685 | 1.87x slower |  |
| nested-relationships | jsona | 1,043,728 | 1.81x slower |  |
| nested-relationships | ts-japi | 415,959 | 4.53x slower |  |
| collection | kitsu-core | 149,096 | 1x |  |
| collection | devour | 161,638 | 1.08x faster |  |
| collection | yayson | 219,147 | 1.47x faster |  |
| **collection** | **jsona** | **567,698** | **3.81x faster** |  |
| collection | ts-japi | 268,686 | 1.8x faster |  |
| collection-includes | kitsu-core | 70,931 | 1x |  |
| collection-includes | devour | 260,455 | 3.67x faster |  |
| **collection-includes** | **yayson** | **323,151** | **4.56x faster** |  |
| collection-includes | jsona | 271,795 | 3.83x faster |  |
| collection-includes | ts-japi | 181,990 | 2.57x faster |  |
| **patch-single** | **kitsu-core** | **4,673,643** | **1x** |  |
| patch-single | devour | 4,664,366 | <1.01x slower |  |
| patch-single | yayson | 1,968,577 | 2.37x slower |  |
| patch-single | jsona | 2,436,190 | 1.92x slower |  |
| patch-single | ts-japi | 826,325 | 5.66x slower |  |
| empty-relationships | kitsu-core | 1,093,550 | 1x |  |
| **empty-relationships** | **devour** | **1,293,867** | **1.18x faster** |  |
| empty-relationships | yayson | 1,024,669 | 1.07x slower |  |
| empty-relationships | jsona | 1,254,930 | 1.15x faster |  |
| empty-relationships | ts-japi | 446,548 | 2.45x slower |  |
| few-includes | kitsu-core | 768 | 1x |  |
| **few-includes** | **devour** | **1,584** | **2.06x faster** |  |
| few-includes | yayson | 1,021 | 1.33x faster |  |
| few-includes | jsona | 899 | 1.17x faster |  |
| few-includes | ts-japi | 513 | 1.5x slower |  |
| many-includes | kitsu-core | 974 | 1x |  |
| **many-includes** | **devour** | **1,479** | **1.52x faster** |  |
| many-includes | yayson | 1,042 | 1.07x faster |  |
| many-includes | jsona | 900 | 1.08x slower |  |
| many-includes | ts-japi | 500 | 1.95x slower |  |
| complex-relationships | kitsu-core | 489 | 1x |  |
| **complex-relationships** | **devour** | **728** | **1.49x faster** |  |
| complex-relationships | yayson | 634 | 1.3x faster |  |
| complex-relationships | jsona | 330 | 1.48x slower |  |
| complex-relationships | ts-japi | 304 | 1.61x slower |  |
| wide-relationship | kitsu-core | 3,768 | 1x |  |
| wide-relationship | devour | 11,245 | 2.98x faster |  |
| **wide-relationship** | **yayson** | **12,958** | **3.44x faster** |  |
| wide-relationship | jsona | 3,868 | 1.03x faster |  |
| wide-relationship | ts-japi | 6,632 | 1.76x faster |  |
| **self-cycle** | **kitsu-core** | **1,919,740** | **1x** |  |
| self-cycle | devour | 1,198,638 | 1.6x slower |  |
| self-cycle | yayson | 854,071 | 2.25x slower |  |
| self-cycle | jsona | 1,001,956 | 1.92x slower |  |
| self-cycle | ts-japi | 401,459 | 4.78x slower |  |
| **mutual-cycle** | **kitsu-core** | **1,937,790** | **1x** |  |
| mutual-cycle | devour | 1,106,833 | 1.75x slower |  |
| mutual-cycle | yayson | 907,448 | 2.14x slower |  |
| mutual-cycle | jsona | 942,496 | 2.06x slower |  |
| mutual-cycle | ts-japi | 405,296 | 4.78x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 567,160 | 1x |  |
| **small-no-relationships** | **devour** | **749,535** | **1.32x faster** |  |
| small-no-relationships | yayson | 531,210 | 1.07x slower |  |
| small-no-relationships | jsona | 672,618 | 1.19x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 458,091 | 1x |  |
| small-links-only | devour | 459,249 | <1.01x faster |  |
| small-links-only | yayson | 367,589 | 1.25x slower |  |
| **small-links-only** | **jsona** | **579,883** | **1.27x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 202,184 | 1x |  |
| **small-relationships** | **devour** | **209,022** | **1.03x faster** |  |
| small-relationships | yayson | 159,573 | 1.27x slower |  |
| small-relationships | jsona | 207,645 | 1.03x faster |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **274,723** | **1x** |  |
| nested-relationships | devour | 241,613 | 1.14x slower |  |
| nested-relationships | yayson | 197,252 | 1.39x slower |  |
| nested-relationships | jsona | 232,231 | 1.18x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 46,891 | 1x |  |
| collection | devour | 51,879 | 1.11x faster |  |
| collection | yayson | 50,196 | 1.07x faster |  |
| **collection** | **jsona** | **112,146** | **2.39x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 30,133 | 1x |  |
| collection-includes | devour | 72,255 | 2.4x faster |  |
| collection-includes | yayson | 76,329 | 2.53x faster |  |
| **collection-includes** | **jsona** | **86,927** | **2.88x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **922,412** | **1x** |  |
| patch-single | devour | 912,938 | 1.01x slower |  |
| patch-single | yayson | 542,842 | 1.7x slower |  |
| patch-single | jsona | 659,209 | 1.4x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 365,006 | 1x |  |
| empty-relationships | devour | 353,717 | 1.03x slower |  |
| empty-relationships | yayson | 328,567 | 1.11x slower |  |
| **empty-relationships** | **jsona** | **413,656** | **1.13x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **339** | **1x** |  |
| few-includes | devour | 269 | 1.26x slower |  |
| few-includes | yayson | 248 | 1.37x slower |  |
| few-includes | jsona | 260 | 1.3x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **236** | **1x** |  |
| many-includes | devour | 6.08 | 38.81x slower |  |
| many-includes | yayson | 31.27 | 7.55x slower |  |
| many-includes | jsona | 113 | 2.1x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **41.46** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.63 | 65.88x slower |  |
| complex-relationships | jsona | 18.5 | 2.24x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **329** | **1x** |  |
| wide-relationship | devour | 3.94 | 83.36x slower |  |
| wide-relationship | yayson | 18.01 | 18.25x slower |  |
| wide-relationship | jsona | 127 | 2.59x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **234,437** | **1x** |  |
| self-cycle | devour | 186,038 | 1.26x slower |  |
| self-cycle | yayson | 182,786 | 1.28x slower |  |
| self-cycle | jsona | 197,231 | 1.19x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **226,376** | **1x** |  |
| mutual-cycle | devour | 163,695 | 1.38x slower |  |
| mutual-cycle | yayson | 158,463 | 1.43x slower |  |
| mutual-cycle | jsona | 179,104 | 1.26x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 66,414 | 1x |  |
| small-no-relationships | kitsu-native | 234,793 | 3.54x faster |  |
| **small-no-relationships** | **fetchja** | **238,756** | **3.59x faster** |  |
| small-no-relationships | devour | 56,630 | 1.17x slower |  |
| small-links-only | kitsu | 63,468 | 1x |  |
| small-links-only | kitsu-native | 200,650 | 3.16x faster |  |
| **small-links-only** | **fetchja** | **215,836** | **3.4x faster** |  |
| small-links-only | devour | 56,334 | 1.13x slower |  |
| small-relationships | kitsu | 53,453 | 1x |  |
| **small-relationships** | **kitsu-native** | **129,530** | **2.42x faster** |  |
| small-relationships | fetchja | 125,766 | 2.35x faster |  |
| small-relationships | devour | 45,056 | 1.19x slower |  |
| nested-relationships | kitsu | 56,126 | 1x |  |
| **nested-relationships** | **kitsu-native** | **154,096** | **2.75x faster** |  |
| nested-relationships | fetchja | 142,702 | 2.54x faster |  |
| nested-relationships | devour | 49,859 | 1.13x slower |  |
| collection | kitsu | 18,783 | 1x |  |
| collection | kitsu-native | 17,924 | 1.05x slower |  |
| **collection** | **fetchja** | **37,075** | **1.97x faster** |  |
| collection | devour | 18,793 | <1.01x faster |  |
| collection-includes | kitsu | 18,577 | 1x |  |
| collection-includes | kitsu-native | 19,788 | 1.07x faster |  |
| **collection-includes** | **fetchja** | **37,525** | **2.02x faster** |  |
| collection-includes | devour | 21,223 | 1.14x faster |  |
| patch-single | kitsu | 69,431 | 1x |  |
| **patch-single** | **kitsu-native** | **278,103** | **4.01x faster** |  |
| patch-single | fetchja | 246,531 | 3.55x faster |  |
| patch-single | devour | 60,825 | 1.14x slower |  |
| empty-relationships | kitsu | 61,236 | 1x |  |
| **empty-relationships** | **kitsu-native** | **212,766** | **3.47x faster** |  |
| empty-relationships | fetchja | 209,571 | 3.42x faster |  |
| empty-relationships | devour | 55,824 | 1.1x slower |  |
| few-includes | kitsu | 474 | 1x |  |
| **few-includes** | **kitsu-native** | **482** | **1.02x faster** |  |
| few-includes | fetchja | 404 | 1.17x slower |  |
| few-includes | devour | 339 | 1.4x slower |  |
| **many-includes** | **kitsu** | **216** | **1x** |  |
| many-includes | kitsu-native | 215 | 1.01x slower |  |
| many-includes | fetchja | 176 | 1.23x slower |  |
| many-includes | devour | 8.76 | 24.64x slower |  |
| **complex-relationships** | **kitsu** | **30.89** | **1x** |  |
| complex-relationships | kitsu-native | 29.94 | 1.03x slower |  |
| complex-relationships | fetchja | 27.33 | 1.13x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **208** | **1x** |  |
| wide-relationship | kitsu-native | 201 | 1.03x slower |  |
| wide-relationship | fetchja | 158 | 1.32x slower |  |
| wide-relationship | devour | 5.28 | 39.41x slower |  |
| self-cycle | kitsu | 52,418 | 1x |  |
| **self-cycle** | **kitsu-native** | **132,584** | **2.53x faster** |  |
| self-cycle | fetchja | 118,656 | 2.26x faster |  |
| self-cycle | devour | 42,754 | 1.23x slower |  |
| mutual-cycle | kitsu | 51,578 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **128,859** | **2.5x faster** |  |
| mutual-cycle | fetchja | 115,757 | 2.24x faster |  |
| mutual-cycle | devour | 40,254 | 1.28x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 58,798 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **273,546** | **4.65x faster** |  |
| small-no-relationships | fetchja | 271,685 | 4.62x faster |  |
| small-no-relationships | devour | 54,265 | 1.08x slower |  |
| small-links-only | kitsu | 56,646 | 1x |  |
| **small-links-only** | **kitsu-native** | **277,664** | **4.9x faster** |  |
| small-links-only | fetchja | 241,976 | 4.27x faster |  |
| small-links-only | devour | 52,549 | 1.08x slower |  |
| small-relationships | kitsu | 46,811 | 1x |  |
| **small-relationships** | **kitsu-native** | **197,302** | **4.21x faster** |  |
| small-relationships | fetchja | 187,666 | 4.01x faster |  |
| small-relationships | devour | 45,944 | 1.02x slower |  |
| nested-relationships | kitsu | 54,186 | 1x |  |
| **nested-relationships** | **kitsu-native** | **279,177** | **5.15x faster** |  |
| nested-relationships | fetchja | 235,608 | 4.35x faster |  |
| nested-relationships | devour | 49,692 | 1.09x slower |  |
| collection | kitsu | 22,608 | 1x |  |
| **collection** | **kitsu-native** | **40,529** | **1.79x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 14,025 | 1x |  |
| **collection-includes** | **kitsu-native** | **22,368** | **1.59x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 62,261 | 1x |  |
| **patch-single** | **kitsu-native** | **357,893** | **5.75x faster** |  |
| patch-single | fetchja | 300,006 | 4.82x faster |  |
| patch-single | devour | 56,168 | 1.11x slower |  |
| empty-relationships | kitsu | 52,231 | 1x |  |
| **empty-relationships** | **kitsu-native** | **242,174** | **4.64x faster** |  |
| empty-relationships | fetchja | 236,848 | 4.53x faster |  |
| empty-relationships | devour | 48,364 | 1.08x slower |  |
| few-includes | kitsu | 427 | 1x |  |
| **few-includes** | **kitsu-native** | **458** | **1.07x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 373 | 1x |  |
| **many-includes** | **kitsu-native** | **395** | **1.06x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 110 | 1x |  |
| **complex-relationships** | **kitsu-native** | **114** | **1.04x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 720 | 1x |  |
| **wide-relationship** | **kitsu-native** | **848** | **1.18x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 55,022 | 1x |  |
| **self-cycle** | **kitsu-native** | **272,441** | **4.95x faster** |  |
| self-cycle | fetchja | 199,178 | 3.62x faster |  |
| self-cycle | devour | 45,320 | 1.21x slower |  |
| mutual-cycle | kitsu | 53,370 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **262,052** | **4.91x faster** |  |
| mutual-cycle | fetchja | 215,957 | 4.05x faster |  |
| mutual-cycle | devour | 47,447 | 1.12x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 60,400 | 1x | 30,200 cycles/s |
| **small-no-relationships** | **kitsu-native** | **253,901** | **4.2x faster** | **126,950 cycles/s** |
| small-no-relationships | fetchja | 235,701 | 3.9x faster | 117,850 cycles/s |
| small-no-relationships | devour | 55,970 | 1.08x slower | 27,985 cycles/s |
| small-links-only | kitsu | 57,984 | 1x | 28,992 cycles/s |
| **small-links-only** | **kitsu-native** | **234,428** | **4.04x faster** | **117,214 cycles/s** |
| small-links-only | fetchja | 216,932 | 3.74x faster | 108,466 cycles/s |
| small-links-only | devour | 52,206 | 1.11x slower | 26,103 cycles/s |
| small-relationships | kitsu | 46,745 | 1x | 23,373 cycles/s |
| **small-relationships** | **kitsu-native** | **148,604** | **3.18x faster** | **74,302 cycles/s** |
| small-relationships | fetchja | 139,447 | 2.98x faster | 69,724 cycles/s |
| small-relationships | devour | 40,521 | 1.15x slower | 20,260 cycles/s |
| nested-relationships | kitsu | 51,780 | 1x | 25,890 cycles/s |
| **nested-relationships** | **kitsu-native** | **187,158** | **3.61x faster** | **93,579 cycles/s** |
| nested-relationships | fetchja | 165,169 | 3.19x faster | 82,585 cycles/s |
| nested-relationships | devour | 47,434 | 1.09x slower | 23,717 cycles/s |
| collection | kitsu | 19,064 | 1x | 9,532 cycles/s |
| **collection** | **kitsu-native** | **24,244** | **1.27x faster** | **12,122 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 15,901 | 1x | 7,950 cycles/s |
| **collection-includes** | **kitsu-native** | **19,795** | **1.24x faster** | **9,897 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 62,954 | 1x | 31,477 cycles/s |
| **patch-single** | **kitsu-native** | **303,687** | **4.82x faster** | **151,843 cycles/s** |
| patch-single | fetchja | 260,814 | 4.14x faster | 130,407 cycles/s |
| patch-single | devour | 54,888 | 1.15x slower | 27,444 cycles/s |
| empty-relationships | kitsu | 54,550 | 1x | 27,275 cycles/s |
| empty-relationships | kitsu-native | 205,350 | 3.76x faster | 102,675 cycles/s |
| **empty-relationships** | **fetchja** | **205,807** | **3.77x faster** | **102,903 cycles/s** |
| empty-relationships | devour | 50,172 | 1.09x slower | 25,086 cycles/s |
| **few-includes** | **kitsu** | **400** | **1x** | **200 cycles/s** |
| few-includes | kitsu-native | 381 | 1.05x slower | 190 cycles/s |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **227** | **1x** | **114 cycles/s** |
| many-includes | kitsu-native | 222 | 1.02x slower | 111 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **45.76** | **1x** | **22\.88 cycles/s** |
| complex-relationships | kitsu-native | 44.39 | 1.03x slower | 22\.19 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **311** | **1x** | **156 cycles/s** |
| wide-relationship | kitsu-native | 310 | <1.01x slower | 155 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 49,727 | 1x | 24,864 cycles/s |
| **self-cycle** | **kitsu-native** | **170,999** | **3.44x faster** | **85,500 cycles/s** |
| self-cycle | fetchja | 139,325 | 2.8x faster | 69,663 cycles/s |
| self-cycle | devour | 42,950 | 1.16x slower | 21,475 cycles/s |
| mutual-cycle | kitsu | 49,386 | 1x | 24,693 cycles/s |
| **mutual-cycle** | **kitsu-native** | **164,053** | **3.32x faster** | **82,027 cycles/s** |
| mutual-cycle | fetchja | 133,513 | 2.7x faster | 66,756 cycles/s |
| mutual-cycle | devour | 42,737 | 1.16x slower | 21,368 cycles/s |

</details>

### node v26\.12\.0

Measured commit: `6fcfdeab5ce0ae1fbf919c2a9a1302f098e0114b`. Runner: linux x64, AMD EPYC 9V74 80-Core Processor.

Built package fingerprint: `224176e00cdc9ab35518a648a0c1ead0f93fc80c838c70f97263aeb70f3cd843`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,119,848 | 1x |  |
| **small-no-relationships** | **devour** | **1,628,624** | **1.45x faster** |  |
| small-no-relationships | yayson | 774,214 | 1.45x slower |  |
| small-no-relationships | jsona | 1,533,680 | 1.37x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 932,603 | 1x |  |
| small-links-only | devour | 877,275 | 1.06x slower |  |
| small-links-only | yayson | 597,049 | 1.56x slower |  |
| **small-links-only** | **jsona** | **1,427,992** | **1.53x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 342,961 | 1x |  |
| small-relationships | devour | 261,516 | 1.31x slower |  |
| small-relationships | yayson | 195,683 | 1.75x slower |  |
| **small-relationships** | **jsona** | **369,666** | **1.08x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 414,450 | 1x |  |
| nested-relationships | devour | 308,543 | 1.34x slower |  |
| nested-relationships | yayson | 237,168 | 1.75x slower |  |
| **nested-relationships** | **jsona** | **422,927** | **1.02x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 85,451 | 1x |  |
| collection | devour | 87,248 | 1.02x faster |  |
| collection | yayson | 114,819 | 1.34x faster |  |
| **collection** | **jsona** | **271,183** | **3.17x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 60,071 | 1x |  |
| collection-includes | devour | 94,938 | 1.58x faster |  |
| collection-includes | yayson | 99,602 | 1.66x faster |  |
| **collection-includes** | **jsona** | **126,432** | **2.1x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,846,929 | 1x |  |
| **patch-single** | **devour** | **2,038,204** | **1.1x faster** |  |
| patch-single | yayson | 775,954 | 2.38x slower |  |
| patch-single | jsona | 1,868,500 | 1.01x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 961,195 | 1x |  |
| empty-relationships | devour | 634,206 | 1.52x slower |  |
| empty-relationships | yayson | 625,213 | 1.54x slower |  |
| **empty-relationships** | **jsona** | **1,157,039** | **1.2x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **651** | **1x** |  |
| few-includes | devour | 378 | 1.72x slower |  |
| few-includes | yayson | 438 | 1.49x slower |  |
| few-includes | jsona | 519 | 1.26x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **277** | **1x** |  |
| many-includes | devour | 4.14 | 66.95x slower |  |
| many-includes | yayson | 20.05 | 13.82x slower |  |
| many-includes | jsona | 199 | 1.39x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **32.48** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.49 | 66.55x slower |  |
| complex-relationships | jsona | 20.46 | 1.59x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **266** | **1x** |  |
| wide-relationship | devour | 2.41 | 110x slower |  |
| wide-relationship | yayson | 9.6 | 27.7x slower |  |
| wide-relationship | jsona | 169 | 1.58x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 358,028 | 1x |  |
| self-cycle | devour | 244,314 | 1.47x slower |  |
| self-cycle | yayson | 212,965 | 1.68x slower |  |
| **self-cycle** | **jsona** | **364,166** | **1.02x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **296,093** | **1x** |  |
| mutual-cycle | devour | 198,281 | 1.49x slower |  |
| mutual-cycle | yayson | 173,894 | 1.7x slower |  |
| mutual-cycle | jsona | 273,560 | 1.08x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,609,721 | 1x |  |
| small-no-relationships | devour | 2,892,058 | 1.8x faster |  |
| small-no-relationships | yayson | 1,589,829 | 1.01x slower |  |
| **small-no-relationships** | **jsona** | **3,010,500** | **1.87x faster** |  |
| small-no-relationships | ts-japi | 637,268 | 2.53x slower |  |
| small-links-only | kitsu-core | 1,553,840 | 1x |  |
| small-links-only | devour | 1,508,504 | 1.03x slower |  |
| small-links-only | yayson | 1,210,575 | 1.28x slower |  |
| **small-links-only** | **jsona** | **2,959,746** | **1.9x faster** |  |
| small-links-only | ts-japi | 612,068 | 2.54x slower |  |
| small-relationships | kitsu-core | 877,650 | 1x |  |
| small-relationships | devour | 959,153 | 1.09x faster |  |
| small-relationships | yayson | 758,742 | 1.16x slower |  |
| **small-relationships** | **jsona** | **1,455,431** | **1.66x faster** |  |
| small-relationships | ts-japi | 401,035 | 2.19x slower |  |
| nested-relationships | kitsu-core | 1,448,605 | 1x |  |
| nested-relationships | devour | 1,181,671 | 1.23x slower |  |
| nested-relationships | yayson | 894,375 | 1.62x slower |  |
| **nested-relationships** | **jsona** | **1,849,680** | **1.28x faster** |  |
| nested-relationships | ts-japi | 447,718 | 3.24x slower |  |
| collection | kitsu-core | 181,336 | 1x |  |
| collection | devour | 99,514 | 1.82x slower |  |
| collection | yayson | 212,128 | 1.17x faster |  |
| **collection** | **jsona** | **762,413** | **4.2x faster** |  |
| collection | ts-japi | 238,185 | 1.31x faster |  |
| collection-includes | kitsu-core | 77,488 | 1x |  |
| collection-includes | devour | 192,839 | 2.49x faster |  |
| collection-includes | yayson | 221,429 | 2.86x faster |  |
| **collection-includes** | **jsona** | **378,390** | **4.88x faster** |  |
| collection-includes | ts-japi | 144,796 | 1.87x faster |  |
| patch-single | kitsu-core | 4,012,118 | 1x |  |
| **patch-single** | **devour** | **5,762,202** | **1.44x faster** |  |
| patch-single | yayson | 2,094,963 | 1.92x slower |  |
| patch-single | jsona | 4,558,051 | 1.14x faster |  |
| patch-single | ts-japi | 672,707 | 5.96x slower |  |
| empty-relationships | kitsu-core | 1,176,967 | 1x |  |
| empty-relationships | devour | 981,333 | 1.2x slower |  |
| empty-relationships | yayson | 827,139 | 1.42x slower |  |
| **empty-relationships** | **jsona** | **1,718,770** | **1.46x faster** |  |
| empty-relationships | ts-japi | 445,986 | 2.64x slower |  |
| few-includes | kitsu-core | 729 | 1x |  |
| few-includes | devour | 912 | 1.25x faster |  |
| few-includes | yayson | 654 | 1.11x slower |  |
| **few-includes** | **jsona** | **1,603** | **2.2x faster** |  |
| few-includes | ts-japi | 374 | 1.95x slower |  |
| many-includes | kitsu-core | 749 | 1x |  |
| many-includes | devour | 1,047 | 1.4x faster |  |
| many-includes | yayson | 776 | 1.04x faster |  |
| **many-includes** | **jsona** | **1,698** | **2.27x faster** |  |
| many-includes | ts-japi | 265 | 2.82x slower |  |
| complex-relationships | kitsu-core | 299 | 1x |  |
| **complex-relationships** | **devour** | **581** | **1.94x faster** |  |
| complex-relationships | yayson | 215 | 1.39x slower |  |
| complex-relationships | jsona | 290 | 1.03x slower |  |
| complex-relationships | ts-japi | 307 | 1.03x faster |  |
| wide-relationship | kitsu-core | 3,232 | 1x |  |
| **wide-relationship** | **devour** | **20,945** | **6.48x faster** |  |
| wide-relationship | yayson | 5,459 | 1.69x faster |  |
| wide-relationship | jsona | 5,754 | 1.78x faster |  |
| wide-relationship | ts-japi | 12,001 | 3.71x faster |  |
| self-cycle | kitsu-core | 1,491,330 | 1x |  |
| self-cycle | devour | 1,193,420 | 1.25x slower |  |
| self-cycle | yayson | 863,305 | 1.73x slower |  |
| **self-cycle** | **jsona** | **1,831,564** | **1.23x faster** |  |
| self-cycle | ts-japi | 468,623 | 3.18x slower |  |
| mutual-cycle | kitsu-core | 1,475,505 | 1x |  |
| mutual-cycle | devour | 1,211,694 | 1.22x slower |  |
| mutual-cycle | yayson | 875,884 | 1.68x slower |  |
| **mutual-cycle** | **jsona** | **1,791,281** | **1.21x faster** |  |
| mutual-cycle | ts-japi | 459,037 | 3.21x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 632,930 | 1x |  |
| **small-no-relationships** | **devour** | **920,356** | **1.45x faster** |  |
| small-no-relationships | yayson | 476,951 | 1.33x slower |  |
| small-no-relationships | jsona | 868,895 | 1.37x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 542,702 | 1x |  |
| small-links-only | devour | 504,123 | 1.08x slower |  |
| small-links-only | yayson | 406,728 | 1.33x slower |  |
| **small-links-only** | **jsona** | **830,499** | **1.53x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 220,918 | 1x |  |
| small-relationships | devour | 181,069 | 1.22x slower |  |
| small-relationships | yayson | 143,385 | 1.54x slower |  |
| **small-relationships** | **jsona** | **271,249** | **1.23x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 292,973 | 1x |  |
| nested-relationships | devour | 222,693 | 1.32x slower |  |
| nested-relationships | yayson | 175,714 | 1.67x slower |  |
| **nested-relationships** | **jsona** | **303,143** | **1.03x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 52,404 | 1x |  |
| collection | devour | 42,533 | 1.23x slower |  |
| collection | yayson | 71,611 | 1.37x faster |  |
| **collection** | **jsona** | **151,946** | **2.9x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 29,537 | 1x |  |
| collection-includes | devour | 55,947 | 1.89x faster |  |
| collection-includes | yayson | 62,705 | 2.12x faster |  |
| **collection-includes** | **jsona** | **76,899** | **2.6x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,157,951 | 1x |  |
| **patch-single** | **devour** | **1,309,124** | **1.13x faster** |  |
| patch-single | yayson | 548,168 | 2.11x slower |  |
| patch-single | jsona | 1,162,772 | <1.01x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 444,649 | 1x |  |
| empty-relationships | devour | 336,890 | 1.32x slower |  |
| empty-relationships | yayson | 318,434 | 1.4x slower |  |
| **empty-relationships** | **jsona** | **569,020** | **1.28x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 308 | 1x |  |
| few-includes | devour | 253 | 1.22x slower |  |
| few-includes | yayson | 223 | 1.38x slower |  |
| **few-includes** | **jsona** | **329** | **1.07x faster** |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **170** | **1x** |  |
| many-includes | devour | 3.88 | 43.77x slower |  |
| many-includes | yayson | 19.38 | 8.76x slower |  |
| many-includes | jsona | 151 | 1.12x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **28.36** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.48 | 58.68x slower |  |
| complex-relationships | jsona | 19.22 | 1.48x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **238** | **1x** |  |
| wide-relationship | devour | 2.45 | 97.49x slower |  |
| wide-relationship | yayson | 10.16 | 23.46x slower |  |
| wide-relationship | jsona | 167 | 1.43x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 265,947 | 1x |  |
| self-cycle | devour | 191,138 | 1.39x slower |  |
| self-cycle | yayson | 159,838 | 1.66x slower |  |
| **self-cycle** | **jsona** | **277,740** | **1.04x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **232,155** | **1x** |  |
| mutual-cycle | devour | 157,654 | 1.47x slower |  |
| mutual-cycle | yayson | 137,432 | 1.69x slower |  |
| mutual-cycle | jsona | 225,911 | 1.03x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 61,561 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **144,091** | **2.34x faster** |  |
| small-no-relationships | fetchja | 133,239 | 2.16x faster |  |
| small-no-relationships | devour | 55,697 | 1.11x slower |  |
| small-links-only | kitsu | 57,823 | 1x |  |
| **small-links-only** | **kitsu-native** | **135,309** | **2.34x faster** |  |
| small-links-only | fetchja | 122,941 | 2.13x faster |  |
| small-links-only | devour | 51,284 | 1.13x slower |  |
| small-relationships | kitsu | 46,410 | 1x |  |
| **small-relationships** | **kitsu-native** | **81,935** | **1.77x faster** |  |
| small-relationships | fetchja | 76,637 | 1.65x faster |  |
| small-relationships | devour | 40,529 | 1.15x slower |  |
| nested-relationships | kitsu | 49,102 | 1x |  |
| **nested-relationships** | **kitsu-native** | **94,791** | **1.93x faster** |  |
| nested-relationships | fetchja | 79,422 | 1.62x faster |  |
| nested-relationships | devour | 41,826 | 1.17x slower |  |
| collection | kitsu | 17,977 | 1x |  |
| collection | kitsu-native | 18,231 | 1.01x faster |  |
| **collection** | **fetchja** | **20,643** | **1.15x faster** |  |
| collection | devour | 17,347 | 1.04x slower |  |
| collection-includes | kitsu | 17,192 | 1x |  |
| collection-includes | kitsu-native | 17,990 | 1.05x faster |  |
| collection-includes | fetchja | 18,663 | 1.09x faster |  |
| **collection-includes** | **devour** | **19,217** | **1.12x faster** |  |
| patch-single | kitsu | 65,215 | 1x |  |
| **patch-single** | **kitsu-native** | **172,890** | **2.65x faster** |  |
| patch-single | fetchja | 147,155 | 2.26x faster |  |
| patch-single | devour | 58,018 | 1.12x slower |  |
| empty-relationships | kitsu | 58,964 | 1x |  |
| **empty-relationships** | **kitsu-native** | **138,852** | **2.35x faster** |  |
| empty-relationships | fetchja | 119,863 | 2.03x faster |  |
| empty-relationships | devour | 51,059 | 1.15x slower |  |
| **few-includes** | **kitsu** | **364** | **1x** |  |
| few-includes | kitsu-native | 359 | 1.01x slower |  |
| few-includes | fetchja | 310 | 1.17x slower |  |
| few-includes | devour | 240 | 1.51x slower |  |
| **many-includes** | **kitsu** | **154** | **1x** |  |
| many-includes | kitsu-native | 150 | 1.02x slower |  |
| many-includes | fetchja | 135 | 1.14x slower |  |
| many-includes | devour | 5.74 | 26.74x slower |  |
| **complex-relationships** | **kitsu** | **22.59** | **1x** |  |
| complex-relationships | kitsu-native | 20.29 | 1.11x slower |  |
| complex-relationships | fetchja | 16.86 | 1.34x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **156** | **1x** |  |
| wide-relationship | kitsu-native | 145 | 1.08x slower |  |
| wide-relationship | fetchja | 133 | 1.18x slower |  |
| wide-relationship | devour | 3 | 52.13x slower |  |
| self-cycle | kitsu | 47,054 | 1x |  |
| **self-cycle** | **kitsu-native** | **84,786** | **1.8x faster** |  |
| self-cycle | fetchja | 78,717 | 1.67x faster |  |
| self-cycle | devour | 39,555 | 1.19x slower |  |
| mutual-cycle | kitsu | 44,570 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **76,150** | **1.71x faster** |  |
| mutual-cycle | fetchja | 71,114 | 1.6x faster |  |
| mutual-cycle | devour | 37,838 | 1.18x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 58,018 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **273,326** | **4.71x faster** |  |
| small-no-relationships | fetchja | 224,235 | 3.86x faster |  |
| small-no-relationships | devour | 56,130 | 1.03x slower |  |
| small-links-only | kitsu | 56,059 | 1x |  |
| **small-links-only** | **kitsu-native** | **273,073** | **4.87x faster** |  |
| small-links-only | fetchja | 221,272 | 3.95x faster |  |
| small-links-only | devour | 53,565 | 1.05x slower |  |
| small-relationships | kitsu | 47,041 | 1x |  |
| **small-relationships** | **kitsu-native** | **180,711** | **3.84x faster** |  |
| small-relationships | fetchja | 166,340 | 3.54x faster |  |
| small-relationships | devour | 46,030 | 1.02x slower |  |
| nested-relationships | kitsu | 53,807 | 1x |  |
| **nested-relationships** | **kitsu-native** | **243,077** | **4.52x faster** |  |
| nested-relationships | fetchja | 205,063 | 3.81x faster |  |
| nested-relationships | devour | 49,317 | 1.09x slower |  |
| collection | kitsu | 26,577 | 1x |  |
| **collection** | **kitsu-native** | **45,590** | **1.72x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 15,362 | 1x |  |
| **collection-includes** | **kitsu-native** | **21,654** | **1.41x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 61,718 | 1x |  |
| **patch-single** | **kitsu-native** | **360,174** | **5.84x faster** |  |
| patch-single | fetchja | 261,557 | 4.24x faster |  |
| patch-single | devour | 59,800 | 1.03x slower |  |
| empty-relationships | kitsu | 52,650 | 1x |  |
| **empty-relationships** | **kitsu-native** | **226,611** | **4.3x faster** |  |
| empty-relationships | fetchja | 205,362 | 3.9x faster |  |
| empty-relationships | devour | 48,436 | 1.09x slower |  |
| **few-includes** | **kitsu** | **306** | **1x** |  |
| few-includes | kitsu-native | 299 | 1.02x slower |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 288 | 1x |  |
| **many-includes** | **kitsu-native** | **308** | **1.07x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 90.72 | 1x |  |
| **complex-relationships** | **kitsu-native** | **115** | **1.27x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 805 | 1x |  |
| **wide-relationship** | **kitsu-native** | **912** | **1.13x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 53,234 | 1x |  |
| **self-cycle** | **kitsu-native** | **239,378** | **4.5x faster** |  |
| self-cycle | fetchja | 202,802 | 3.81x faster |  |
| self-cycle | devour | 49,737 | 1.07x slower |  |
| mutual-cycle | kitsu | 53,640 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **233,825** | **4.36x faster** |  |
| mutual-cycle | fetchja | 203,885 | 3.8x faster |  |
| mutual-cycle | devour | 50,454 | 1.06x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 58,297 | 1x | 29,148 cycles/s |
| **small-no-relationships** | **kitsu-native** | **190,083** | **3.26x faster** | **95,041 cycles/s** |
| small-no-relationships | fetchja | 161,154 | 2.76x faster | 80,577 cycles/s |
| small-no-relationships | devour | 53,607 | 1.09x slower | 26,804 cycles/s |
| small-links-only | kitsu | 56,433 | 1x | 28,216 cycles/s |
| **small-links-only** | **kitsu-native** | **174,266** | **3.09x faster** | **87,133 cycles/s** |
| small-links-only | fetchja | 152,688 | 2.71x faster | 76,344 cycles/s |
| small-links-only | devour | 50,996 | 1.11x slower | 25,498 cycles/s |
| small-relationships | kitsu | 43,812 | 1x | 21,906 cycles/s |
| **small-relationships** | **kitsu-native** | **102,502** | **2.34x faster** | **51,251 cycles/s** |
| small-relationships | fetchja | 93,872 | 2.14x faster | 46,936 cycles/s |
| small-relationships | devour | 40,791 | 1.07x slower | 20,396 cycles/s |
| nested-relationships | kitsu | 50,040 | 1x | 25,020 cycles/s |
| **nested-relationships** | **kitsu-native** | **126,069** | **2.52x faster** | **63,034 cycles/s** |
| nested-relationships | fetchja | 110,450 | 2.21x faster | 55,225 cycles/s |
| nested-relationships | devour | 43,531 | 1.15x slower | 21,766 cycles/s |
| collection | kitsu | 20,424 | 1x | 10,212 cycles/s |
| **collection** | **kitsu-native** | **23,398** | **1.15x faster** | **11,699 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 15,608 | 1x | 7,804 cycles/s |
| **collection-includes** | **kitsu-native** | **17,109** | **1.1x faster** | **8,555 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 62,389 | 1x | 31,194 cycles/s |
| **patch-single** | **kitsu-native** | **228,332** | **3.66x faster** | **114,166 cycles/s** |
| patch-single | fetchja | 183,188 | 2.94x faster | 91,594 cycles/s |
| patch-single | devour | 57,122 | 1.09x slower | 28,561 cycles/s |
| empty-relationships | kitsu | 54,112 | 1x | 27,056 cycles/s |
| **empty-relationships** | **kitsu-native** | **163,524** | **3.02x faster** | **81,762 cycles/s** |
| empty-relationships | fetchja | 140,693 | 2.6x faster | 70,346 cycles/s |
| empty-relationships | devour | 48,856 | 1.11x slower | 24,428 cycles/s |
| few-includes | kitsu | 301 | 1x | 150 cycles/s |
| **few-includes** | **kitsu-native** | **313** | **1.04x faster** | **157 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **193** | **1x** | **96\.6 cycles/s** |
| many-includes | kitsu-native | 186 | 1.04x slower | 92\.78 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **34.72** | **1x** | **17\.36 cycles/s** |
| complex-relationships | kitsu-native | 33.97 | 1.02x slower | 16\.98 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **265** | **1x** | **132 cycles/s** |
| wide-relationship | kitsu-native | 248 | 1.07x slower | 124 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 48,557 | 1x | 24,279 cycles/s |
| **self-cycle** | **kitsu-native** | **118,820** | **2.45x faster** | **59,410 cycles/s** |
| self-cycle | fetchja | 106,331 | 2.19x faster | 53,166 cycles/s |
| self-cycle | devour | 41,892 | 1.16x slower | 20,946 cycles/s |
| mutual-cycle | kitsu | 46,541 | 1x | 23,271 cycles/s |
| **mutual-cycle** | **kitsu-native** | **107,810** | **2.32x faster** | **53,905 cycles/s** |
| mutual-cycle | fetchja | 97,827 | 2.1x faster | 48,914 cycles/s |
| mutual-cycle | devour | 40,867 | 1.14x slower | 20,433 cycles/s |

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
