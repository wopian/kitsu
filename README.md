<h1 align=center>Kitsu</h1>

<p align=center>
  <a href=https://github.com/wopian/kitsu><img alt=checks src=https://flat.badgen.net/github/checks/wopian/kitsu/master></a>
  <a href=https://www.npmjs.com/package/kitsu><img alt=checks src=https://flat.badgen.net/npm/v/kitsu?label=kitsu></a>
  <a href=https://www.npmjs.com/package/kitsu-core><img alt=checks src=https://flat.badgen.net/npm/v/kitsu-core?label=kitsu-core></a>
</p>

<p align=center>
  <a href=https://github.com/wopian/kitsu><img alt=checks src=https://flat.badgen.net/github/license/wopian/kitsu></a>
  <a href=https://github.com/wopian/kitsu/network/dependents><img alt=repoDependants src=https://flat.badgen.net/github/dependents-repo/wopian/kitsu></a>
  <a href=https://github.com/wopian/kitsu/graphs/contributors><img alt=contributors src=https://flat.badgen.net/github/contributors/wopian/kitsu></a>
  <a href=https://github.com/sponsors/wopian><img alt=sponsor src='https://flat.badgen.net/badge/sponsor/%E2%9D%A4/pink?icon=github'></a>
</p>

<p align=center>
  <a href=https://github.com/wopian/kitsu/tree/master/packages/kitsu#readme><img alt=checks src=https://flat.badgen.net/static/pkg/kitsu/cyan></a>
  <a href=https://www.npmjs.com/package/kitsu><img alt=checks src=https://flat.badgen.net/npm/node/kitsu></a>
  <a href=https://www.npmjs.com/package/kitsu><img alt=checks src=https://flat.badgen.net/npm/dy/kitsu></a>
  <a href=https://www.npmjs.com/package/kitsu><img alt=checks src=https://flat.badgen.net/npm/dw/kitsu></a>
</p>

<p align=center>
  <a href=https://github.com/wopian/kitsu/tree/master/packages/kitsu-core#readme><img alt=checks src=https://flat.badgen.net/static/pkg/kitsu-core/cyan></a>
  <a href=https://www.npmjs.com/package/kitsu-core><img alt=checks src=https://flat.badgen.net/npm/node/kitsu-core></a>
  <a href=https://www.npmjs.com/package/kitsu-core><img alt=checks src=https://flat.badgen.net/npm/dy/kitsu-core></a>
  <a href=https://www.npmjs.com/package/kitsu-core><img alt=checks src=https://flat.badgen.net/npm/dw/kitsu-core></a>
</p>

<p align=center>A simple, lightweight & framework agnostic <a href=http://jsonapi.org>JSON:API</a> client for <a href=https://kitsu.app>kitsu.app</a> & other APIs</p>

#

This is a monorepo containing the following packages:

- [kitsu]—Framework agnostic client using Axios
- [kitsu-native]—JSON:API client using native fetch, with kitsu resource methods and aliases.
- [kitsu-core]—Framework agnostic (de)serialisation components. Works with all HTTP libraries.

## Features

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

Local measurements. Master CI refreshes this section automatically.

### bun 1\.4\.3

Base commit (local changes measured): `499840183b8b1cb8aa51904e9ff1311226fbc125`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `3682d7e0a8696bd04935e6b701765d8a0cce9d550713f8509deaefce8bae210a`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,068,689 | 1x |  |
| **small-no-relationships** | **devour** | **1,358,287** | **1.27x faster** |  |
| small-no-relationships | yayson | 807,614 | 1.32x slower |  |
| small-no-relationships | jsona | 1,153,283 | 1.08x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 748,089 | 1x |  |
| small-links-only | devour | 703,652 | 1.06x slower |  |
| small-links-only | yayson | 470,809 | 1.59x slower |  |
| **small-links-only** | **jsona** | **998,613** | **1.33x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| **small-relationships** | **kitsu-core** | **286,951** | **1x** |  |
| small-relationships | devour | 268,389 | 1.07x slower |  |
| small-relationships | yayson | 151,405 | 1.9x slower |  |
| small-relationships | jsona | 280,014 | 1.02x slower |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **405,733** | **1x** |  |
| nested-relationships | devour | 278,112 | 1.46x slower |  |
| nested-relationships | yayson | 253,494 | 1.6x slower |  |
| nested-relationships | jsona | 340,482 | 1.19x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 79,358 | 1x |  |
| collection | devour | 95,785 | 1.21x faster |  |
| collection | yayson | 78,238 | 1.01x slower |  |
| **collection** | **jsona** | **240,619** | **3.03x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 59,887 | 1x |  |
| collection-includes | devour | 106,077 | 1.77x faster |  |
| collection-includes | yayson | 104,578 | 1.75x faster |  |
| **collection-includes** | **jsona** | **144,959** | **2.42x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,945,596 | 1x |  |
| **patch-single** | **devour** | **2,074,502** | **1.07x faster** |  |
| patch-single | yayson | 822,708 | 2.36x slower |  |
| patch-single | jsona | 1,333,107 | 1.46x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 695,514 | 1x |  |
| empty-relationships | devour | 614,531 | 1.13x slower |  |
| empty-relationships | yayson | 602,809 | 1.15x slower |  |
| **empty-relationships** | **jsona** | **867,659** | **1.25x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **874** | **1x** |  |
| few-includes | devour | 530 | 1.65x slower |  |
| few-includes | yayson | 550 | 1.59x slower |  |
| few-includes | jsona | 564 | 1.55x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **459** | **1x** |  |
| many-includes | devour | 8.03 | 57.19x slower |  |
| many-includes | yayson | 38.83 | 11.82x slower |  |
| many-includes | jsona | 174 | 2.64x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **63.76** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.95 | 67.33x slower |  |
| complex-relationships | jsona | 26.45 | 2.41x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **484** | **1x** |  |
| wide-relationship | devour | 5.39 | 89.85x slower |  |
| wide-relationship | yayson | 22.96 | 21.09x slower |  |
| wide-relationship | jsona | 163 | 2.97x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **387,918** | **1x** |  |
| self-cycle | devour | 281,706 | 1.38x slower |  |
| self-cycle | yayson | 251,469 | 1.54x slower |  |
| self-cycle | jsona | 313,244 | 1.24x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **289,075** | **1x** |  |
| mutual-cycle | devour | 231,075 | 1.25x slower |  |
| mutual-cycle | yayson | 210,894 | 1.37x slower |  |
| mutual-cycle | jsona | 252,617 | 1.14x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,514,286 | 1x |  |
| **small-no-relationships** | **devour** | **3,186,377** | **2.1x faster** |  |
| small-no-relationships | yayson | 1,729,348 | 1.14x faster |  |
| small-no-relationships | jsona | 1,951,377 | 1.29x faster |  |
| small-no-relationships | ts-japi | 720,896 | 2.1x slower |  |
| small-links-only | kitsu-core | 1,676,586 | 1x |  |
| small-links-only | devour | 1,695,770 | 1.01x faster |  |
| small-links-only | yayson | 1,262,248 | 1.33x slower |  |
| **small-links-only** | **jsona** | **1,907,729** | **1.14x faster** |  |
| small-links-only | ts-japi | 660,702 | 2.54x slower |  |
| small-relationships | kitsu-core | 830,776 | 1x |  |
| **small-relationships** | **devour** | **1,284,691** | **1.55x faster** |  |
| small-relationships | yayson | 882,774 | 1.06x faster |  |
| small-relationships | jsona | 805,966 | 1.03x slower |  |
| small-relationships | ts-japi | 367,175 | 2.26x slower |  |
| **nested-relationships** | **kitsu-core** | **1,697,432** | **1x** |  |
| nested-relationships | devour | 1,297,618 | 1.31x slower |  |
| nested-relationships | yayson | 870,169 | 1.95x slower |  |
| nested-relationships | jsona | 917,103 | 1.85x slower |  |
| nested-relationships | ts-japi | 396,516 | 4.28x slower |  |
| collection | kitsu-core | 150,515 | 1x |  |
| collection | devour | 161,933 | 1.08x faster |  |
| collection | yayson | 232,540 | 1.54x faster |  |
| **collection** | **jsona** | **596,061** | **3.96x faster** |  |
| collection | ts-japi | 286,162 | 1.9x faster |  |
| collection-includes | kitsu-core | 55,398 | 1x |  |
| collection-includes | devour | 245,018 | 4.42x faster |  |
| collection-includes | yayson | 266,690 | 4.81x faster |  |
| **collection-includes** | **jsona** | **280,677** | **5.07x faster** |  |
| collection-includes | ts-japi | 168,522 | 3.04x faster |  |
| patch-single | kitsu-core | 4,031,726 | 1x |  |
| **patch-single** | **devour** | **4,596,922** | **1.14x faster** |  |
| patch-single | yayson | 1,684,937 | 2.39x slower |  |
| patch-single | jsona | 2,553,740 | 1.58x slower |  |
| patch-single | ts-japi | 616,606 | 6.54x slower |  |
| empty-relationships | kitsu-core | 1,099,309 | 1x |  |
| **empty-relationships** | **devour** | **1,165,939** | **1.06x faster** |  |
| empty-relationships | yayson | 866,143 | 1.27x slower |  |
| empty-relationships | jsona | 1,125,040 | 1.02x faster |  |
| empty-relationships | ts-japi | 422,155 | 2.6x slower |  |
| few-includes | kitsu-core | 1,271 | 1x |  |
| **few-includes** | **devour** | **1,757** | **1.38x faster** |  |
| few-includes | yayson | 1,086 | 1.17x slower |  |
| few-includes | jsona | 1,214 | 1.05x slower |  |
| few-includes | ts-japi | 460 | 2.76x slower |  |
| many-includes | kitsu-core | 1,043 | 1x |  |
| **many-includes** | **devour** | **1,663** | **1.6x faster** |  |
| many-includes | yayson | 1,093 | 1.05x faster |  |
| many-includes | jsona | 1,193 | 1.14x faster |  |
| many-includes | ts-japi | 588 | 1.77x slower |  |
| complex-relationships | kitsu-core | 628 | 1x |  |
| **complex-relationships** | **devour** | **1,085** | **1.73x faster** |  |
| complex-relationships | yayson | 1,068 | 1.7x faster |  |
| complex-relationships | jsona | 658 | 1.05x faster |  |
| complex-relationships | ts-japi | 403 | 1.56x slower |  |
| wide-relationship | kitsu-core | 6,543 | 1x |  |
| **wide-relationship** | **devour** | **22,057** | **3.37x faster** |  |
| wide-relationship | yayson | 21,341 | 3.26x faster |  |
| wide-relationship | jsona | 5,149 | 1.27x slower |  |
| wide-relationship | ts-japi | 7,994 | 1.22x faster |  |
| **self-cycle** | **kitsu-core** | **1,766,205** | **1x** |  |
| self-cycle | devour | 1,483,767 | 1.19x slower |  |
| self-cycle | yayson | 926,811 | 1.91x slower |  |
| self-cycle | jsona | 948,414 | 1.86x slower |  |
| self-cycle | ts-japi | 397,687 | 4.44x slower |  |
| **mutual-cycle** | **kitsu-core** | **1,531,238** | **1x** |  |
| mutual-cycle | devour | 1,144,018 | 1.34x slower |  |
| mutual-cycle | yayson | 1,033,898 | 1.48x slower |  |
| mutual-cycle | jsona | 855,377 | 1.79x slower |  |
| mutual-cycle | ts-japi | 411,962 | 3.72x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 580,800 | 1x |  |
| **small-no-relationships** | **devour** | **747,802** | **1.29x faster** |  |
| small-no-relationships | yayson | 449,455 | 1.29x slower |  |
| small-no-relationships | jsona | 700,221 | 1.21x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 405,336 | 1x |  |
| small-links-only | devour | 471,023 | 1.16x faster |  |
| small-links-only | yayson | 365,354 | 1.11x slower |  |
| **small-links-only** | **jsona** | **531,664** | **1.31x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 178,620 | 1x |  |
| small-relationships | devour | 182,181 | 1.02x faster |  |
| small-relationships | yayson | 134,244 | 1.33x slower |  |
| **small-relationships** | **jsona** | **189,397** | **1.06x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **260,044** | **1x** |  |
| nested-relationships | devour | 202,203 | 1.29x slower |  |
| nested-relationships | yayson | 190,443 | 1.37x slower |  |
| nested-relationships | jsona | 221,069 | 1.18x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 46,487 | 1x |  |
| collection | devour | 53,683 | 1.15x faster |  |
| collection | yayson | 50,906 | 1.1x faster |  |
| **collection** | **jsona** | **108,462** | **2.33x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 32,442 | 1x |  |
| collection-includes | devour | 69,139 | 2.13x faster |  |
| collection-includes | yayson | 69,793 | 2.15x faster |  |
| **collection-includes** | **jsona** | **79,245** | **2.44x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **984,630** | **1x** |  |
| patch-single | devour | 846,254 | 1.16x slower |  |
| patch-single | yayson | 497,636 | 1.98x slower |  |
| patch-single | jsona | 698,447 | 1.41x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 336,730 | 1x |  |
| empty-relationships | devour | 341,574 | 1.01x faster |  |
| empty-relationships | yayson | 313,879 | 1.07x slower |  |
| **empty-relationships** | **jsona** | **406,977** | **1.21x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **367** | **1x** |  |
| few-includes | devour | 306 | 1.2x slower |  |
| few-includes | yayson | 276 | 1.33x slower |  |
| few-includes | jsona | 298 | 1.23x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **263** | **1x** |  |
| many-includes | devour | 7.25 | 36.24x slower |  |
| many-includes | yayson | 36.2 | 7.25x slower |  |
| many-includes | jsona | 115 | 2.28x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **47.65** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.88 | 54.13x slower |  |
| complex-relationships | jsona | 23.19 | 2.06x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **404** | **1x** |  |
| wide-relationship | devour | 4.9 | 82.49x slower |  |
| wide-relationship | yayson | 21.72 | 18.6x slower |  |
| wide-relationship | jsona | 112 | 3.6x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **251,572** | **1x** |  |
| self-cycle | devour | 213,838 | 1.18x slower |  |
| self-cycle | yayson | 183,702 | 1.37x slower |  |
| self-cycle | jsona | 194,081 | 1.3x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **221,458** | **1x** |  |
| mutual-cycle | devour | 176,688 | 1.25x slower |  |
| mutual-cycle | yayson | 158,219 | 1.4x slower |  |
| mutual-cycle | jsona | 173,631 | 1.28x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 62,650 | 1x |  |
| small-no-relationships | kitsu-native | 218,824 | 3.49x faster |  |
| **small-no-relationships** | **fetchja** | **230,874** | **3.69x faster** |  |
| small-no-relationships | devour | 58,001 | 1.08x slower |  |
| small-links-only | kitsu | 60,166 | 1x |  |
| **small-links-only** | **kitsu-native** | **198,815** | **3.3x faster** |  |
| small-links-only | fetchja | 179,834 | 2.99x faster |  |
| small-links-only | devour | 48,851 | 1.23x slower |  |
| small-relationships | kitsu | 41,632 | 1x |  |
| small-relationships | kitsu-native | 99,381 | 2.39x faster |  |
| **small-relationships** | **fetchja** | **106,719** | **2.56x faster** |  |
| small-relationships | devour | 38,702 | 1.08x slower |  |
| nested-relationships | kitsu | 50,078 | 1x |  |
| **nested-relationships** | **kitsu-native** | **129,945** | **2.59x faster** |  |
| nested-relationships | fetchja | 122,533 | 2.45x faster |  |
| nested-relationships | devour | 42,820 | 1.17x slower |  |
| collection | kitsu | 18,759 | 1x |  |
| collection | kitsu-native | 19,330 | 1.03x faster |  |
| **collection** | **fetchja** | **32,304** | **1.72x faster** |  |
| collection | devour | 18,855 | 1.01x faster |  |
| collection-includes | kitsu | 17,776 | 1x |  |
| collection-includes | kitsu-native | 19,684 | 1.11x faster |  |
| **collection-includes** | **fetchja** | **30,351** | **1.71x faster** |  |
| collection-includes | devour | 20,164 | 1.13x faster |  |
| patch-single | kitsu | 68,433 | 1x |  |
| **patch-single** | **kitsu-native** | **264,816** | **3.87x faster** |  |
| patch-single | fetchja | 244,172 | 3.57x faster |  |
| patch-single | devour | 58,414 | 1.17x slower |  |
| empty-relationships | kitsu | 56,983 | 1x |  |
| empty-relationships | kitsu-native | 176,992 | 3.11x faster |  |
| **empty-relationships** | **fetchja** | **180,364** | **3.17x faster** |  |
| empty-relationships | devour | 51,151 | 1.11x slower |  |
| **few-includes** | **kitsu** | **556** | **1x** |  |
| few-includes | kitsu-native | 544 | 1.02x slower |  |
| few-includes | fetchja | 451 | 1.24x slower |  |
| few-includes | devour | 361 | 1.54x slower |  |
| many-includes | kitsu | 209 | 1x |  |
| **many-includes** | **kitsu-native** | **210** | **1.01x faster** |  |
| many-includes | fetchja | 208 | <1.01x slower |  |
| many-includes | devour | 10.49 | 19.9x slower |  |
| complex-relationships | kitsu | 35.22 | 1x |  |
| **complex-relationships** | **kitsu-native** | **38.5** | **1.09x faster** |  |
| complex-relationships | fetchja | 31.7 | 1.11x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| wide-relationship | kitsu | 250 | 1x |  |
| **wide-relationship** | **kitsu-native** | **255** | **1.02x faster** |  |
| wide-relationship | fetchja | 202 | 1.24x slower |  |
| wide-relationship | devour | 6.38 | 39.22x slower |  |
| self-cycle | kitsu | 51,785 | 1x |  |
| **self-cycle** | **kitsu-native** | **134,825** | **2.6x faster** |  |
| self-cycle | fetchja | 124,455 | 2.4x faster |  |
| self-cycle | devour | 41,566 | 1.25x slower |  |
| mutual-cycle | kitsu | 46,477 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **118,010** | **2.54x faster** |  |
| mutual-cycle | fetchja | 111,099 | 2.39x faster |  |
| mutual-cycle | devour | 38,727 | 1.2x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 53,350 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **283,691** | **5.32x faster** |  |
| small-no-relationships | fetchja | 259,216 | 4.86x faster |  |
| small-no-relationships | devour | 50,848 | 1.05x slower |  |
| small-links-only | kitsu | 56,558 | 1x |  |
| **small-links-only** | **kitsu-native** | **267,311** | **4.73x faster** |  |
| small-links-only | fetchja | 218,980 | 3.87x faster |  |
| small-links-only | devour | 46,415 | 1.22x slower |  |
| small-relationships | kitsu | 42,748 | 1x |  |
| **small-relationships** | **kitsu-native** | **194,261** | **4.54x faster** |  |
| small-relationships | fetchja | 179,481 | 4.2x faster |  |
| small-relationships | devour | 38,863 | 1.1x slower |  |
| nested-relationships | kitsu | 51,650 | 1x |  |
| **nested-relationships** | **kitsu-native** | **264,521** | **5.12x faster** |  |
| nested-relationships | fetchja | 200,767 | 3.89x faster |  |
| nested-relationships | devour | 43,874 | 1.18x slower |  |
| collection | kitsu | 22,902 | 1x |  |
| **collection** | **kitsu-native** | **38,240** | **1.67x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 12,434 | 1x |  |
| **collection-includes** | **kitsu-native** | **16,249** | **1.31x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 62,961 | 1x |  |
| **patch-single** | **kitsu-native** | **360,551** | **5.73x faster** |  |
| patch-single | fetchja | 286,267 | 4.55x faster |  |
| patch-single | devour | 54,398 | 1.16x slower |  |
| empty-relationships | kitsu | 46,457 | 1x |  |
| **empty-relationships** | **kitsu-native** | **215,129** | **4.63x faster** |  |
| empty-relationships | fetchja | 192,224 | 4.14x faster |  |
| empty-relationships | devour | 45,100 | 1.03x slower |  |
| few-includes | kitsu | 496 | 1x |  |
| **few-includes** | **kitsu-native** | **559** | **1.13x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 438 | 1x |  |
| **many-includes** | **kitsu-native** | **441** | **1.01x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 138 | 1x |  |
| **complex-relationships** | **kitsu-native** | **143** | **1.04x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 1,066 | 1x |  |
| **wide-relationship** | **kitsu-native** | **1,116** | **1.05x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 54,132 | 1x |  |
| **self-cycle** | **kitsu-native** | **286,507** | **5.29x faster** |  |
| self-cycle | fetchja | 231,319 | 4.27x faster |  |
| self-cycle | devour | 47,802 | 1.13x slower |  |
| mutual-cycle | kitsu | 53,696 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **260,289** | **4.85x faster** |  |
| mutual-cycle | fetchja | 222,407 | 4.14x faster |  |
| mutual-cycle | devour | 45,503 | 1.18x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 58,696 | 1x | 29,348 cycles/s |
| small-no-relationships | kitsu-native | 218,573 | 3.72x faster | 109,286 cycles/s |
| **small-no-relationships** | **fetchja** | **228,253** | **3.89x faster** | **114,126 cycles/s** |
| small-no-relationships | devour | 50,948 | 1.15x slower | 25,474 cycles/s |
| small-links-only | kitsu | 54,529 | 1x | 27,264 cycles/s |
| **small-links-only** | **kitsu-native** | **209,178** | **3.84x faster** | **104,589 cycles/s** |
| small-links-only | fetchja | 183,949 | 3.37x faster | 91,974 cycles/s |
| small-links-only | devour | 43,545 | 1.25x slower | 21,772 cycles/s |
| small-relationships | kitsu | 38,480 | 1x | 19,240 cycles/s |
| **small-relationships** | **kitsu-native** | **124,261** | **3.23x faster** | **62,131 cycles/s** |
| small-relationships | fetchja | 117,516 | 3.05x faster | 58,758 cycles/s |
| small-relationships | devour | 36,184 | 1.06x slower | 18,092 cycles/s |
| nested-relationships | kitsu | 47,272 | 1x | 23,636 cycles/s |
| **nested-relationships** | **kitsu-native** | **158,431** | **3.35x faster** | **79,215 cycles/s** |
| nested-relationships | fetchja | 131,979 | 2.79x faster | 65,990 cycles/s |
| nested-relationships | devour | 40,355 | 1.17x slower | 20,178 cycles/s |
| collection | kitsu | 19,454 | 1x | 9,727 cycles/s |
| **collection** | **kitsu-native** | **24,001** | **1.23x faster** | **12,000 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 15,747 | 1x | 7,874 cycles/s |
| **collection-includes** | **kitsu-native** | **18,072** | **1.15x faster** | **9,036 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 65,694 | 1x | 32,847 cycles/s |
| **patch-single** | **kitsu-native** | **282,917** | **4.31x faster** | **141,458 cycles/s** |
| patch-single | fetchja | 243,426 | 3.71x faster | 121,713 cycles/s |
| patch-single | devour | 52,462 | 1.25x slower | 26,231 cycles/s |
| empty-relationships | kitsu | 45,125 | 1x | 22,563 cycles/s |
| empty-relationships | kitsu-native | 178,088 | 3.95x faster | 89,044 cycles/s |
| **empty-relationships** | **fetchja** | **179,976** | **3.99x faster** | **89,988 cycles/s** |
| empty-relationships | devour | 44,544 | 1.01x slower | 22,272 cycles/s |
| **few-includes** | **kitsu** | **482** | **1x** | **241 cycles/s** |
| few-includes | kitsu-native | 451 | 1.07x slower | 225 cycles/s |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **254** | **1x** | **127 cycles/s** |
| many-includes | kitsu-native | 221 | 1.15x slower | 111 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 51.03 | 1x | 25\.51 cycles/s |
| **complex-relationships** | **kitsu-native** | **51.99** | **1.02x faster** | **25\.99 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **401** | **1x** | **200 cycles/s** |
| wide-relationship | kitsu-native | 390 | 1.03x slower | 195 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 49,352 | 1x | 24,676 cycles/s |
| **self-cycle** | **kitsu-native** | **157,800** | **3.2x faster** | **78,900 cycles/s** |
| self-cycle | fetchja | 141,514 | 2.87x faster | 70,757 cycles/s |
| self-cycle | devour | 41,555 | 1.19x slower | 20,778 cycles/s |
| mutual-cycle | kitsu | 47,824 | 1x | 23,912 cycles/s |
| **mutual-cycle** | **kitsu-native** | **144,002** | **3.01x faster** | **72,001 cycles/s** |
| mutual-cycle | fetchja | 131,869 | 2.76x faster | 65,935 cycles/s |
| mutual-cycle | devour | 40,081 | 1.19x slower | 20,041 cycles/s |

</details>

### node v26\.5\.0

Base commit (local changes measured): `499840183b8b1cb8aa51904e9ff1311226fbc125`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `3682d7e0a8696bd04935e6b701765d8a0cce9d550713f8509deaefce8bae210a`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,110,491 | 1x |  |
| **small-no-relationships** | **devour** | **1,593,593** | **1.44x faster** |  |
| small-no-relationships | yayson | 730,481 | 1.52x slower |  |
| small-no-relationships | jsona | 1,564,495 | 1.41x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 892,613 | 1x |  |
| small-links-only | devour | 768,893 | 1.16x slower |  |
| small-links-only | yayson | 574,213 | 1.55x slower |  |
| **small-links-only** | **jsona** | **1,502,394** | **1.68x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 287,131 | 1x |  |
| small-relationships | devour | 226,881 | 1.27x slower |  |
| small-relationships | yayson | 183,535 | 1.56x slower |  |
| **small-relationships** | **jsona** | **361,401** | **1.26x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 358,388 | 1x |  |
| nested-relationships | devour | 263,431 | 1.36x slower |  |
| nested-relationships | yayson | 223,628 | 1.6x slower |  |
| **nested-relationships** | **jsona** | **403,184** | **1.12x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 80,572 | 1x |  |
| collection | devour | 60,875 | 1.32x slower |  |
| collection | yayson | 112,621 | 1.4x faster |  |
| **collection** | **jsona** | **260,514** | **3.23x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 57,204 | 1x |  |
| collection-includes | devour | 76,232 | 1.33x faster |  |
| collection-includes | yayson | 97,633 | 1.71x faster |  |
| **collection-includes** | **jsona** | **121,133** | **2.12x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,725,204 | 1x |  |
| **patch-single** | **devour** | **2,133,151** | **1.24x faster** |  |
| patch-single | yayson | 776,231 | 2.22x slower |  |
| patch-single | jsona | 2,007,995 | 1.16x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 910,766 | 1x |  |
| empty-relationships | devour | 495,916 | 1.84x slower |  |
| empty-relationships | yayson | 607,874 | 1.5x slower |  |
| **empty-relationships** | **jsona** | **1,191,851** | **1.31x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 538 | 1x |  |
| few-includes | devour | 348 | 1.55x slower |  |
| few-includes | yayson | 415 | 1.3x slower |  |
| **few-includes** | **jsona** | **562** | **1.04x faster** |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **229** | **1x** |  |
| many-includes | devour | 3.89 | 58.77x slower |  |
| many-includes | yayson | 17.72 | 12.91x slower |  |
| many-includes | jsona | 145 | 1.58x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **34.67** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.43 | 80.99x slower |  |
| complex-relationships | jsona | 16.49 | 2.1x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **212** | **1x** |  |
| wide-relationship | devour | 2.81 | 75.39x slower |  |
| wide-relationship | yayson | 11.05 | 19.16x slower |  |
| wide-relationship | jsona | 146 | 1.45x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 315,613 | 1x |  |
| self-cycle | devour | 191,839 | 1.65x slower |  |
| self-cycle | yayson | 204,763 | 1.54x slower |  |
| **self-cycle** | **jsona** | **331,376** | **1.05x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **267,749** | **1x** |  |
| mutual-cycle | devour | 163,037 | 1.64x slower |  |
| mutual-cycle | yayson | 169,904 | 1.58x slower |  |
| mutual-cycle | jsona | 266,618 | <1.01x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,471,920 | 1x |  |
| small-no-relationships | devour | 2,611,696 | 1.77x faster |  |
| small-no-relationships | yayson | 727,627 | 2.02x slower |  |
| **small-no-relationships** | **jsona** | **3,056,857** | **2.08x faster** |  |
| small-no-relationships | ts-japi | 671,549 | 2.19x slower |  |
| small-links-only | kitsu-core | 1,711,580 | 1x |  |
| small-links-only | devour | 1,209,436 | 1.42x slower |  |
| small-links-only | yayson | 1,267,396 | 1.35x slower |  |
| **small-links-only** | **jsona** | **2,766,231** | **1.62x faster** |  |
| small-links-only | ts-japi | 627,314 | 2.73x slower |  |
| small-relationships | kitsu-core | 794,086 | 1x |  |
| small-relationships | devour | 710,964 | 1.12x slower |  |
| small-relationships | yayson | 719,051 | 1.1x slower |  |
| **small-relationships** | **jsona** | **1,480,599** | **1.86x faster** |  |
| small-relationships | ts-japi | 411,063 | 1.93x slower |  |
| nested-relationships | kitsu-core | 1,494,102 | 1x |  |
| nested-relationships | devour | 869,376 | 1.72x slower |  |
| nested-relationships | yayson | 797,004 | 1.87x slower |  |
| **nested-relationships** | **jsona** | **1,762,968** | **1.18x faster** |  |
| nested-relationships | ts-japi | 468,950 | 3.19x slower |  |
| collection | kitsu-core | 175,566 | 1x |  |
| collection | devour | 68,845 | 2.55x slower |  |
| collection | yayson | 192,532 | 1.1x faster |  |
| **collection** | **jsona** | **750,585** | **4.28x faster** |  |
| collection | ts-japi | 219,912 | 1.25x faster |  |
| collection-includes | kitsu-core | 54,181 | 1x |  |
| collection-includes | devour | 164,216 | 3.03x faster |  |
| collection-includes | yayson | 204,544 | 3.78x faster |  |
| **collection-includes** | **jsona** | **383,425** | **7.08x faster** |  |
| collection-includes | ts-japi | 135,891 | 2.51x faster |  |
| patch-single | kitsu-core | 4,315,740 | 1x |  |
| **patch-single** | **devour** | **5,815,694** | **1.35x faster** |  |
| patch-single | yayson | 2,122,812 | 2.03x slower |  |
| patch-single | jsona | 4,403,224 | 1.02x faster |  |
| patch-single | ts-japi | 707,017 | 6.1x slower |  |
| empty-relationships | kitsu-core | 1,233,465 | 1x |  |
| empty-relationships | devour | 750,981 | 1.64x slower |  |
| empty-relationships | yayson | 815,916 | 1.51x slower |  |
| **empty-relationships** | **jsona** | **1,722,034** | **1.4x faster** |  |
| empty-relationships | ts-japi | 469,586 | 2.63x slower |  |
| few-includes | kitsu-core | 689 | 1x |  |
| few-includes | devour | 807 | 1.17x faster |  |
| few-includes | yayson | 669 | 1.03x slower |  |
| **few-includes** | **jsona** | **1,326** | **1.93x faster** |  |
| few-includes | ts-japi | 372 | 1.85x slower |  |
| many-includes | kitsu-core | 624 | 1x |  |
| many-includes | devour | 625 | <1.01x faster |  |
| many-includes | yayson | 718 | 1.15x faster |  |
| **many-includes** | **jsona** | **1,706** | **2.73x faster** |  |
| many-includes | ts-japi | 274 | 2.27x slower |  |
| complex-relationships | kitsu-core | 299 | 1x |  |
| complex-relationships | devour | 465 | 1.56x faster |  |
| complex-relationships | yayson | 253 | 1.18x slower |  |
| **complex-relationships** | **jsona** | **592** | **1.98x faster** |  |
| complex-relationships | ts-japi | 156 | 1.92x slower |  |
| wide-relationship | kitsu-core | 2,594 | 1x |  |
| wide-relationship | devour | 8,695 | 3.35x faster |  |
| wide-relationship | yayson | 7,001 | 2.7x faster |  |
| wide-relationship | jsona | 4,020 | 1.55x faster |  |
| **wide-relationship** | **ts-japi** | **8,815** | **3.4x faster** |  |
| self-cycle | kitsu-core | 1,408,125 | 1x |  |
| self-cycle | devour | 805,979 | 1.75x slower |  |
| self-cycle | yayson | 856,894 | 1.64x slower |  |
| **self-cycle** | **jsona** | **1,784,531** | **1.27x faster** |  |
| self-cycle | ts-japi | 436,623 | 3.23x slower |  |
| mutual-cycle | kitsu-core | 1,453,818 | 1x |  |
| mutual-cycle | devour | 837,364 | 1.74x slower |  |
| mutual-cycle | yayson | 780,675 | 1.86x slower |  |
| **mutual-cycle** | **jsona** | **1,955,852** | **1.35x faster** |  |
| mutual-cycle | ts-japi | 457,021 | 3.18x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 625,735 | 1x |  |
| **small-no-relationships** | **devour** | **925,137** | **1.48x faster** |  |
| small-no-relationships | yayson | 450,639 | 1.39x slower |  |
| small-no-relationships | jsona | 856,779 | 1.37x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 522,168 | 1x |  |
| small-links-only | devour | 437,246 | 1.19x slower |  |
| small-links-only | yayson | 371,010 | 1.41x slower |  |
| **small-links-only** | **jsona** | **829,820** | **1.59x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 211,643 | 1x |  |
| small-relationships | devour | 156,674 | 1.35x slower |  |
| small-relationships | yayson | 126,485 | 1.67x slower |  |
| **small-relationships** | **jsona** | **256,762** | **1.21x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 258,549 | 1x |  |
| nested-relationships | devour | 193,361 | 1.34x slower |  |
| nested-relationships | yayson | 157,444 | 1.64x slower |  |
| **nested-relationships** | **jsona** | **295,182** | **1.14x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 49,917 | 1x |  |
| collection | devour | 31,066 | 1.61x slower |  |
| collection | yayson | 67,299 | 1.35x faster |  |
| **collection** | **jsona** | **140,858** | **2.82x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 28,356 | 1x |  |
| collection-includes | devour | 48,127 | 1.7x faster |  |
| collection-includes | yayson | 54,831 | 1.93x faster |  |
| **collection-includes** | **jsona** | **75,880** | **2.68x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,225,052 | 1x |  |
| **patch-single** | **devour** | **1,394,382** | **1.14x faster** |  |
| patch-single | yayson | 531,408 | 2.31x slower |  |
| patch-single | jsona | 1,247,090 | 1.02x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 426,340 | 1x |  |
| empty-relationships | devour | 280,390 | 1.52x slower |  |
| empty-relationships | yayson | 280,386 | 1.52x slower |  |
| **empty-relationships** | **jsona** | **599,517** | **1.41x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 254 | 1x |  |
| few-includes | devour | 206 | 1.23x slower |  |
| few-includes | yayson | 226 | 1.12x slower |  |
| **few-includes** | **jsona** | **279** | **1.1x faster** |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **136** | **1x** |  |
| many-includes | devour | 3.73 | 36.57x slower |  |
| many-includes | yayson | 17.08 | 7.98x slower |  |
| many-includes | jsona | 126 | 1.08x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **27.73** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.5 | 55.8x slower |  |
| complex-relationships | jsona | 16.72 | 1.66x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **195** | **1x** |  |
| wide-relationship | devour | 2.83 | 68.88x slower |  |
| wide-relationship | yayson | 10.86 | 17.95x slower |  |
| wide-relationship | jsona | 132 | 1.47x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 214,018 | 1x |  |
| self-cycle | devour | 153,798 | 1.39x slower |  |
| self-cycle | yayson | 146,582 | 1.46x slower |  |
| **self-cycle** | **jsona** | **258,637** | **1.21x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| mutual-cycle | kitsu-core | 180,127 | 1x |  |
| mutual-cycle | devour | 130,262 | 1.38x slower |  |
| mutual-cycle | yayson | 125,108 | 1.44x slower |  |
| **mutual-cycle** | **jsona** | **217,667** | **1.21x faster** |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 51,631 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **88,139** | **1.71x faster** |  |
| small-no-relationships | fetchja | 76,662 | 1.48x faster |  |
| small-no-relationships | devour | 45,890 | 1.13x slower |  |
| small-links-only | kitsu | 49,857 | 1x |  |
| **small-links-only** | **kitsu-native** | **83,437** | **1.67x faster** |  |
| small-links-only | fetchja | 72,404 | 1.45x faster |  |
| small-links-only | devour | 40,665 | 1.23x slower |  |
| small-relationships | kitsu | 36,826 | 1x |  |
| **small-relationships** | **kitsu-native** | **48,780** | **1.32x faster** |  |
| small-relationships | fetchja | 43,858 | 1.19x faster |  |
| small-relationships | devour | 30,462 | 1.21x slower |  |
| nested-relationships | kitsu | 41,247 | 1x |  |
| **nested-relationships** | **kitsu-native** | **61,750** | **1.5x faster** |  |
| nested-relationships | fetchja | 52,066 | 1.26x faster |  |
| nested-relationships | devour | 32,510 | 1.27x slower |  |
| **collection** | **kitsu** | **15,542** | **1x** |  |
| collection | kitsu-native | 12,043 | 1.29x slower |  |
| collection | fetchja | 13,540 | 1.15x slower |  |
| collection | devour | 13,685 | 1.14x slower |  |
| **collection-includes** | **kitsu** | **14,943** | **1x** |  |
| collection-includes | kitsu-native | 12,280 | 1.22x slower |  |
| collection-includes | fetchja | 12,359 | 1.21x slower |  |
| collection-includes | devour | 14,003 | 1.07x slower |  |
| patch-single | kitsu | 58,991 | 1x |  |
| **patch-single** | **kitsu-native** | **116,052** | **1.97x faster** |  |
| patch-single | fetchja | 87,869 | 1.49x faster |  |
| patch-single | devour | 48,530 | 1.22x slower |  |
| empty-relationships | kitsu | 47,767 | 1x |  |
| **empty-relationships** | **kitsu-native** | **77,841** | **1.63x faster** |  |
| empty-relationships | fetchja | 69,366 | 1.45x faster |  |
| empty-relationships | devour | 39,453 | 1.21x slower |  |
| **few-includes** | **kitsu** | **353** | **1x** |  |
| few-includes | kitsu-native | 330 | 1.07x slower |  |
| few-includes | fetchja | 277 | 1.27x slower |  |
| few-includes | devour | 228 | 1.55x slower |  |
| **many-includes** | **kitsu** | **143** | **1x** |  |
| many-includes | kitsu-native | 128 | 1.12x slower |  |
| many-includes | fetchja | 116 | 1.23x slower |  |
| many-includes | devour | 6.15 | 23.25x slower |  |
| **complex-relationships** | **kitsu** | **22.45** | **1x** |  |
| complex-relationships | kitsu-native | 20.4 | 1.1x slower |  |
| complex-relationships | fetchja | 16.61 | 1.35x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **140** | **1x** |  |
| wide-relationship | kitsu-native | 135 | 1.04x slower |  |
| wide-relationship | fetchja | 113 | 1.24x slower |  |
| wide-relationship | devour | 3.2 | 43.81x slower |  |
| self-cycle | kitsu | 37,443 | 1x |  |
| **self-cycle** | **kitsu-native** | **45,349** | **1.21x faster** |  |
| self-cycle | fetchja | 41,461 | 1.11x faster |  |
| self-cycle | devour | 30,112 | 1.24x slower |  |
| mutual-cycle | kitsu | 35,506 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **46,540** | **1.31x faster** |  |
| mutual-cycle | fetchja | 38,952 | 1.1x faster |  |
| mutual-cycle | devour | 28,764 | 1.23x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 43,012 | 1x |  |
| small-no-relationships | kitsu-native | 161,430 | 3.75x faster |  |
| **small-no-relationships** | **fetchja** | **169,457** | **3.94x faster** |  |
| small-no-relationships | devour | 45,123 | 1.05x faster |  |
| small-links-only | kitsu | 46,019 | 1x |  |
| **small-links-only** | **kitsu-native** | **243,778** | **5.3x faster** |  |
| small-links-only | fetchja | 171,246 | 3.72x faster |  |
| small-links-only | devour | 40,593 | 1.13x slower |  |
| small-relationships | kitsu | 37,552 | 1x |  |
| **small-relationships** | **kitsu-native** | **139,835** | **3.72x faster** |  |
| small-relationships | fetchja | 125,515 | 3.34x faster |  |
| small-relationships | devour | 33,053 | 1.14x slower |  |
| nested-relationships | kitsu | 44,372 | 1x |  |
| **nested-relationships** | **kitsu-native** | **214,699** | **4.84x faster** |  |
| nested-relationships | fetchja | 153,119 | 3.45x faster |  |
| nested-relationships | devour | 39,806 | 1.11x slower |  |
| collection | kitsu | 20,109 | 1x |  |
| **collection** | **kitsu-native** | **35,050** | **1.74x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 7,401 | 1x |  |
| **collection-includes** | **kitsu-native** | **14,442** | **1.95x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 55,055 | 1x |  |
| **patch-single** | **kitsu-native** | **348,221** | **6.32x faster** |  |
| patch-single | fetchja | 210,001 | 3.81x faster |  |
| patch-single | devour | 50,622 | 1.09x slower |  |
| empty-relationships | kitsu | 40,847 | 1x |  |
| **empty-relationships** | **kitsu-native** | **195,223** | **4.78x faster** |  |
| empty-relationships | fetchja | 159,072 | 3.89x faster |  |
| empty-relationships | devour | 35,213 | 1.16x slower |  |
| few-includes | kitsu | 266 | 1x |  |
| **few-includes** | **kitsu-native** | **288** | **1.08x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **285** | **1x** |  |
| many-includes | kitsu-native | 229 | 1.24x slower |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 101 | 1x |  |
| **complex-relationships** | **kitsu-native** | **105** | **1.04x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 753 | 1x |  |
| **wide-relationship** | **kitsu-native** | **891** | **1.18x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 44,484 | 1x |  |
| **self-cycle** | **kitsu-native** | **197,137** | **4.43x faster** |  |
| self-cycle | fetchja | 147,387 | 3.31x faster |  |
| self-cycle | devour | 37,692 | 1.18x slower |  |
| mutual-cycle | kitsu | 43,327 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **217,421** | **5.02x faster** |  |
| mutual-cycle | fetchja | 145,207 | 3.35x faster |  |
| mutual-cycle | devour | 38,258 | 1.13x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 49,092 | 1x | 24,546 cycles/s |
| **small-no-relationships** | **kitsu-native** | **115,777** | **2.36x faster** | **57,888 cycles/s** |
| small-no-relationships | fetchja | 92,411 | 1.88x faster | 46,205 cycles/s |
| small-no-relationships | devour | 44,757 | 1.1x slower | 22,378 cycles/s |
| small-links-only | kitsu | 47,439 | 1x | 23,719 cycles/s |
| **small-links-only** | **kitsu-native** | **110,777** | **2.34x faster** | **55,388 cycles/s** |
| small-links-only | fetchja | 89,300 | 1.88x faster | 44,650 cycles/s |
| small-links-only | devour | 37,011 | 1.28x slower | 18,505 cycles/s |
| small-relationships | kitsu | 36,112 | 1x | 18,056 cycles/s |
| small-relationships | kitsu-native | 46,074 | 1.28x faster | 23,037 cycles/s |
| **small-relationships** | **fetchja** | **53,502** | **1.48x faster** | **26,751 cycles/s** |
| small-relationships | devour | 31,971 | 1.13x slower | 15,986 cycles/s |
| nested-relationships | kitsu | 39,773 | 1x | 19,887 cycles/s |
| **nested-relationships** | **kitsu-native** | **81,554** | **2.05x faster** | **40,777 cycles/s** |
| nested-relationships | fetchja | 65,494 | 1.65x faster | 32,747 cycles/s |
| nested-relationships | devour | 35,208 | 1.13x slower | 17,604 cycles/s |
| collection | kitsu | 16,865 | 1x | 8,433 cycles/s |
| **collection** | **kitsu-native** | **17,003** | **1.01x faster** | **8,501 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 11,633 | 1x | 5,816 cycles/s |
| **collection-includes** | **kitsu-native** | **13,217** | **1.14x faster** | **6,609 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 55,266 | 1x | 27,633 cycles/s |
| **patch-single** | **kitsu-native** | **155,078** | **2.81x faster** | **77,539 cycles/s** |
| patch-single | fetchja | 109,993 | 1.99x faster | 54,997 cycles/s |
| patch-single | devour | 47,781 | 1.16x slower | 23,891 cycles/s |
| empty-relationships | kitsu | 43,178 | 1x | 21,589 cycles/s |
| **empty-relationships** | **kitsu-native** | **103,134** | **2.39x faster** | **51,567 cycles/s** |
| empty-relationships | fetchja | 90,022 | 2.08x faster | 45,011 cycles/s |
| empty-relationships | devour | 34,928 | 1.24x slower | 17,464 cycles/s |
| **few-includes** | **kitsu** | **311** | **1x** | **156 cycles/s** |
| few-includes | kitsu-native | 302 | 1.03x slower | 151 cycles/s |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **177** | **1x** | **88\.37 cycles/s** |
| many-includes | kitsu-native | 159 | 1.11x slower | 79\.68 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **35.68** | **1x** | **17\.84 cycles/s** |
| complex-relationships | kitsu-native | 35.34 | 1.01x slower | 17\.67 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **243** | **1x** | **122 cycles/s** |
| wide-relationship | kitsu-native | 234 | 1.04x slower | 117 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 37,753 | 1x | 18,877 cycles/s |
| **self-cycle** | **kitsu-native** | **73,766** | **1.95x faster** | **36,883 cycles/s** |
| self-cycle | fetchja | 59,293 | 1.57x faster | 29,647 cycles/s |
| self-cycle | devour | 33,845 | 1.12x slower | 16,922 cycles/s |
| mutual-cycle | kitsu | 38,735 | 1x | 19,367 cycles/s |
| **mutual-cycle** | **kitsu-native** | **61,857** | **1.6x faster** | **30,929 cycles/s** |
| mutual-cycle | fetchja | 57,746 | 1.49x faster | 28,873 cycles/s |
| mutual-cycle | devour | 32,678 | 1.19x slower | 16,339 cycles/s |

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
