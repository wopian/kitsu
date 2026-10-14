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

Base commit (local changes measured): `2559f756236f18c6aa5c45f173e23a2198aae8f8`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `2bdcf04e297d5dc8082ec9eea0063e0be252a73a497c908939f5cb4e8838f9db`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,089,054 | 1x |  |
| **small-no-relationships** | **devour** | **1,373,811** | **1.26x faster** |  |
| small-no-relationships | yayson | 718,788 | 1.52x slower |  |
| small-no-relationships | jsona | 1,273,031 | 1.17x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 793,038 | 1x |  |
| small-links-only | devour | 904,149 | 1.14x faster |  |
| small-links-only | yayson | 512,186 | 1.55x slower |  |
| **small-links-only** | **jsona** | **1,039,446** | **1.31x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| **small-relationships** | **kitsu-core** | **323,814** | **1x** |  |
| small-relationships | devour | 282,943 | 1.14x slower |  |
| small-relationships | yayson | 212,776 | 1.52x slower |  |
| small-relationships | jsona | 312,727 | 1.04x slower |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **399,614** | **1x** |  |
| nested-relationships | devour | 325,941 | 1.23x slower |  |
| nested-relationships | yayson | 278,989 | 1.43x slower |  |
| nested-relationships | jsona | 312,151 | 1.28x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 79,533 | 1x |  |
| collection | devour | 102,960 | 1.29x faster |  |
| collection | yayson | 78,440 | 1.01x slower |  |
| **collection** | **jsona** | **255,761** | **3.22x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 63,759 | 1x |  |
| collection-includes | devour | 124,186 | 1.95x faster |  |
| collection-includes | yayson | 108,279 | 1.7x faster |  |
| **collection-includes** | **jsona** | **148,322** | **2.33x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **1,865,693** | **1x** |  |
| patch-single | devour | 1,597,432 | 1.17x slower |  |
| patch-single | yayson | 846,476 | 2.2x slower |  |
| patch-single | jsona | 1,444,937 | 1.29x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 750,309 | 1x |  |
| empty-relationships | devour | 669,071 | 1.12x slower |  |
| empty-relationships | yayson | 616,257 | 1.22x slower |  |
| **empty-relationships** | **jsona** | **907,388** | **1.21x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **878** | **1x** |  |
| few-includes | devour | 525 | 1.67x slower |  |
| few-includes | yayson | 677 | 1.3x slower |  |
| few-includes | jsona | 613 | 1.43x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **447** | **1x** |  |
| many-includes | devour | 8.26 | 54.08x slower |  |
| many-includes | yayson | 39.04 | 11.44x slower |  |
| many-includes | jsona | 195 | 2.29x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **66.45** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.95 | 70.05x slower |  |
| complex-relationships | jsona | 28.03 | 2.37x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **442** | **1x** |  |
| wide-relationship | devour | 5.33 | 82.93x slower |  |
| wide-relationship | yayson | 23.81 | 18.56x slower |  |
| wide-relationship | jsona | 173 | 2.56x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **377,695** | **1x** |  |
| self-cycle | devour | 267,833 | 1.41x slower |  |
| self-cycle | yayson | 249,626 | 1.51x slower |  |
| self-cycle | jsona | 306,506 | 1.23x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **299,436** | **1x** |  |
| mutual-cycle | devour | 211,209 | 1.42x slower |  |
| mutual-cycle | yayson | 210,227 | 1.42x slower |  |
| mutual-cycle | jsona | 246,953 | 1.21x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,652,374 | 1x |  |
| **small-no-relationships** | **devour** | **3,156,369** | **1.91x faster** |  |
| small-no-relationships | yayson | 1,670,167 | 1.01x faster |  |
| small-no-relationships | jsona | 2,279,356 | 1.38x faster |  |
| small-no-relationships | ts-japi | 725,465 | 2.28x slower |  |
| small-links-only | kitsu-core | 1,571,637 | 1x |  |
| small-links-only | devour | 1,976,947 | 1.26x faster |  |
| small-links-only | yayson | 1,329,995 | 1.18x slower |  |
| **small-links-only** | **jsona** | **2,098,713** | **1.34x faster** |  |
| small-links-only | ts-japi | 722,635 | 2.17x slower |  |
| small-relationships | kitsu-core | 1,033,029 | 1x |  |
| **small-relationships** | **devour** | **1,171,178** | **1.13x faster** |  |
| small-relationships | yayson | 885,146 | 1.17x slower |  |
| small-relationships | jsona | 920,060 | 1.12x slower |  |
| small-relationships | ts-japi | 394,887 | 2.62x slower |  |
| **nested-relationships** | **kitsu-core** | **1,806,871** | **1x** |  |
| nested-relationships | devour | 1,380,862 | 1.31x slower |  |
| nested-relationships | yayson | 973,954 | 1.86x slower |  |
| nested-relationships | jsona | 959,788 | 1.88x slower |  |
| nested-relationships | ts-japi | 435,300 | 4.15x slower |  |
| collection | kitsu-core | 149,511 | 1x |  |
| collection | devour | 163,175 | 1.09x faster |  |
| collection | yayson | 231,538 | 1.55x faster |  |
| **collection** | **jsona** | **618,715** | **4.14x faster** |  |
| collection | ts-japi | 294,787 | 1.97x faster |  |
| collection-includes | kitsu-core | 20,039 | 1x |  |
| collection-includes | devour | 255,774 | 12.76x faster |  |
| **collection-includes** | **yayson** | **321,920** | **16.06x faster** |  |
| collection-includes | jsona | 290,886 | 14.52x faster |  |
| collection-includes | ts-japi | 163,447 | 8.16x faster |  |
| **patch-single** | **kitsu-core** | **5,688,186** | **1x** |  |
| patch-single | devour | 5,260,980 | 1.08x slower |  |
| patch-single | yayson | 1,867,264 | 3.05x slower |  |
| patch-single | jsona | 2,630,506 | 2.16x slower |  |
| patch-single | ts-japi | 789,439 | 7.21x slower |  |
| **empty-relationships** | **kitsu-core** | **1,377,327** | **1x** |  |
| empty-relationships | devour | 1,273,159 | 1.08x slower |  |
| empty-relationships | yayson | 1,005,094 | 1.37x slower |  |
| empty-relationships | jsona | 1,093,173 | 1.26x slower |  |
| empty-relationships | ts-japi | 450,887 | 3.05x slower |  |
| few-includes | kitsu-core | 1,269 | 1x |  |
| **few-includes** | **devour** | **1,797** | **1.42x faster** |  |
| few-includes | yayson | 1,186 | 1.07x slower |  |
| few-includes | jsona | 1,193 | 1.06x slower |  |
| few-includes | ts-japi | 599 | 2.12x slower |  |
| many-includes | kitsu-core | 1,247 | 1x |  |
| **many-includes** | **devour** | **1,843** | **1.48x faster** |  |
| many-includes | yayson | 1,163 | 1.07x slower |  |
| many-includes | jsona | 1,300 | 1.04x faster |  |
| many-includes | ts-japi | 620 | 2.01x slower |  |
| complex-relationships | kitsu-core | 689 | 1x |  |
| **complex-relationships** | **devour** | **1,043** | **1.51x faster** |  |
| complex-relationships | yayson | 917 | 1.33x faster |  |
| complex-relationships | jsona | 631 | 1.09x slower |  |
| complex-relationships | ts-japi | 516 | 1.33x slower |  |
| wide-relationship | kitsu-core | 6,772 | 1x |  |
| **wide-relationship** | **devour** | **21,737** | **3.21x faster** |  |
| wide-relationship | yayson | 15,965 | 2.36x faster |  |
| wide-relationship | jsona | 4,642 | 1.46x slower |  |
| wide-relationship | ts-japi | 8,599 | 1.27x faster |  |
| **self-cycle** | **kitsu-core** | **1,852,786** | **1x** |  |
| self-cycle | devour | 1,476,529 | 1.25x slower |  |
| self-cycle | yayson | 882,653 | 2.1x slower |  |
| self-cycle | jsona | 1,095,417 | 1.69x slower |  |
| self-cycle | ts-japi | 428,440 | 4.32x slower |  |
| **mutual-cycle** | **kitsu-core** | **1,955,281** | **1x** |  |
| mutual-cycle | devour | 1,218,482 | 1.6x slower |  |
| mutual-cycle | yayson | 847,430 | 2.31x slower |  |
| mutual-cycle | jsona | 892,170 | 2.19x slower |  |
| mutual-cycle | ts-japi | 400,298 | 4.88x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 582,560 | 1x |  |
| **small-no-relationships** | **devour** | **783,590** | **1.35x faster** |  |
| small-no-relationships | yayson | 509,082 | 1.14x slower |  |
| small-no-relationships | jsona | 707,096 | 1.21x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 444,908 | 1x |  |
| small-links-only | devour | 499,722 | 1.12x faster |  |
| small-links-only | yayson | 367,288 | 1.21x slower |  |
| **small-links-only** | **jsona** | **607,760** | **1.37x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| **small-relationships** | **kitsu-core** | **209,102** | **1x** |  |
| small-relationships | devour | 200,251 | 1.04x slower |  |
| small-relationships | yayson | 151,621 | 1.38x slower |  |
| small-relationships | jsona | 204,355 | 1.02x slower |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **260,959** | **1x** |  |
| nested-relationships | devour | 245,174 | 1.06x slower |  |
| nested-relationships | yayson | 192,136 | 1.36x slower |  |
| nested-relationships | jsona | 225,704 | 1.16x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 46,738 | 1x |  |
| collection | devour | 50,990 | 1.09x faster |  |
| collection | yayson | 49,766 | 1.06x faster |  |
| **collection** | **jsona** | **119,164** | **2.55x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 33,044 | 1x |  |
| collection-includes | devour | 69,674 | 2.11x faster |  |
| collection-includes | yayson | 69,814 | 2.11x faster |  |
| **collection-includes** | **jsona** | **82,397** | **2.49x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **968,589** | **1x** |  |
| patch-single | devour | 926,729 | 1.05x slower |  |
| patch-single | yayson | 560,215 | 1.73x slower |  |
| patch-single | jsona | 718,635 | 1.35x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 369,208 | 1x |  |
| empty-relationships | devour | 359,879 | 1.03x slower |  |
| empty-relationships | yayson | 331,553 | 1.11x slower |  |
| **empty-relationships** | **jsona** | **416,181** | **1.13x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **391** | **1x** |  |
| few-includes | devour | 334 | 1.17x slower |  |
| few-includes | yayson | 292 | 1.34x slower |  |
| few-includes | jsona | 325 | 1.2x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **276** | **1x** |  |
| many-includes | devour | 7.98 | 34.52x slower |  |
| many-includes | yayson | 36.56 | 7.54x slower |  |
| many-includes | jsona | 141 | 1.96x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **48.51** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.96 | 50.54x slower |  |
| complex-relationships | jsona | 24.69 | 1.97x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **376** | **1x** |  |
| wide-relationship | devour | 5.44 | 69.2x slower |  |
| wide-relationship | yayson | 22.31 | 16.87x slower |  |
| wide-relationship | jsona | 149 | 2.53x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **244,517** | **1x** |  |
| self-cycle | devour | 207,000 | 1.18x slower |  |
| self-cycle | yayson | 181,578 | 1.35x slower |  |
| self-cycle | jsona | 196,620 | 1.24x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **213,617** | **1x** |  |
| mutual-cycle | devour | 182,688 | 1.17x slower |  |
| mutual-cycle | yayson | 153,772 | 1.39x slower |  |
| mutual-cycle | jsona | 175,895 | 1.21x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 64,549 | 1x |  |
| small-no-relationships | kitsu-native | 217,177 | 3.36x faster |  |
| **small-no-relationships** | **fetchja** | **234,676** | **3.64x faster** |  |
| small-no-relationships | devour | 57,435 | 1.12x slower |  |
| small-links-only | kitsu | 60,989 | 1x |  |
| small-links-only | kitsu-native | 189,620 | 3.11x faster |  |
| **small-links-only** | **fetchja** | **210,303** | **3.45x faster** |  |
| small-links-only | devour | 53,792 | 1.13x slower |  |
| small-relationships | kitsu | 46,405 | 1x |  |
| small-relationships | kitsu-native | 114,161 | 2.46x faster |  |
| **small-relationships** | **fetchja** | **118,699** | **2.56x faster** |  |
| small-relationships | devour | 42,038 | 1.1x slower |  |
| nested-relationships | kitsu | 51,485 | 1x |  |
| **nested-relationships** | **kitsu-native** | **140,475** | **2.73x faster** |  |
| nested-relationships | fetchja | 131,869 | 2.56x faster |  |
| nested-relationships | devour | 42,710 | 1.21x slower |  |
| collection | kitsu | 19,406 | 1x |  |
| collection | kitsu-native | 19,161 | 1.01x slower |  |
| **collection** | **fetchja** | **33,202** | **1.71x faster** |  |
| collection | devour | 19,530 | 1.01x faster |  |
| collection-includes | kitsu | 18,459 | 1x |  |
| collection-includes | kitsu-native | 20,100 | 1.09x faster |  |
| **collection-includes** | **fetchja** | **34,087** | **1.85x faster** |  |
| collection-includes | devour | 20,837 | 1.13x faster |  |
| patch-single | kitsu | 71,903 | 1x |  |
| **patch-single** | **kitsu-native** | **263,783** | **3.67x faster** |  |
| patch-single | fetchja | 262,552 | 3.65x faster |  |
| patch-single | devour | 60,701 | 1.18x slower |  |
| empty-relationships | kitsu | 60,792 | 1x |  |
| empty-relationships | kitsu-native | 179,009 | 2.94x faster |  |
| **empty-relationships** | **fetchja** | **202,309** | **3.33x faster** |  |
| empty-relationships | devour | 52,276 | 1.16x slower |  |
| **few-includes** | **kitsu** | **590** | **1x** |  |
| few-includes | kitsu-native | 566 | 1.04x slower |  |
| few-includes | fetchja | 529 | 1.12x slower |  |
| few-includes | devour | 395 | 1.49x slower |  |
| many-includes | kitsu | 242 | 1x |  |
| **many-includes** | **kitsu-native** | **244** | **1.01x faster** |  |
| many-includes | fetchja | 201 | 1.21x slower |  |
| many-includes | devour | 10.68 | 22.68x slower |  |
| **complex-relationships** | **kitsu** | **38.04** | **1x** |  |
| complex-relationships | kitsu-native | 37.06 | 1.03x slower |  |
| complex-relationships | fetchja | 32.78 | 1.16x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| wide-relationship | kitsu | 232 | 1x |  |
| **wide-relationship** | **kitsu-native** | **234** | **1.01x faster** |  |
| wide-relationship | fetchja | 188 | 1.24x slower |  |
| wide-relationship | devour | 6.57 | 35.41x slower |  |
| self-cycle | kitsu | 50,394 | 1x |  |
| **self-cycle** | **kitsu-native** | **126,078** | **2.5x faster** |  |
| self-cycle | fetchja | 125,038 | 2.48x faster |  |
| self-cycle | devour | 41,358 | 1.22x slower |  |
| mutual-cycle | kitsu | 47,222 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **118,719** | **2.51x faster** |  |
| mutual-cycle | fetchja | 109,851 | 2.33x faster |  |
| mutual-cycle | devour | 39,273 | 1.2x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 57,530 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **278,094** | **4.83x faster** |  |
| small-no-relationships | fetchja | 266,846 | 4.64x faster |  |
| small-no-relationships | devour | 52,737 | 1.09x slower |  |
| small-links-only | kitsu | 58,435 | 1x |  |
| **small-links-only** | **kitsu-native** | **269,239** | **4.61x faster** |  |
| small-links-only | fetchja | 263,261 | 4.51x faster |  |
| small-links-only | devour | 50,121 | 1.17x slower |  |
| small-relationships | kitsu | 47,353 | 1x |  |
| **small-relationships** | **kitsu-native** | **211,008** | **4.46x faster** |  |
| small-relationships | fetchja | 199,049 | 4.2x faster |  |
| small-relationships | devour | 42,875 | 1.1x slower |  |
| nested-relationships | kitsu | 55,291 | 1x |  |
| **nested-relationships** | **kitsu-native** | **273,445** | **4.95x faster** |  |
| nested-relationships | fetchja | 222,650 | 4.03x faster |  |
| nested-relationships | devour | 46,655 | 1.19x slower |  |
| collection | kitsu | 23,117 | 1x |  |
| **collection** | **kitsu-native** | **38,929** | **1.68x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 8,834 | 1x |  |
| **collection-includes** | **kitsu-native** | **10,871** | **1.23x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 65,557 | 1x |  |
| **patch-single** | **kitsu-native** | **375,674** | **5.73x faster** |  |
| patch-single | fetchja | 305,352 | 4.66x faster |  |
| patch-single | devour | 56,225 | 1.17x slower |  |
| empty-relationships | kitsu | 50,123 | 1x |  |
| empty-relationships | kitsu-native | 227,922 | 4.55x faster |  |
| **empty-relationships** | **fetchja** | **228,028** | **4.55x faster** |  |
| empty-relationships | devour | 44,560 | 1.12x slower |  |
| few-includes | kitsu | 564 | 1x |  |
| **few-includes** | **kitsu-native** | **576** | **1.02x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 458 | 1x |  |
| **many-includes** | **kitsu-native** | **506** | **1.1x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 145 | 1x |  |
| **complex-relationships** | **kitsu-native** | **145** | **<1.01x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 954 | 1x |  |
| **wide-relationship** | **kitsu-native** | **1,101** | **1.15x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 54,662 | 1x |  |
| **self-cycle** | **kitsu-native** | **260,125** | **4.76x faster** |  |
| self-cycle | fetchja | 230,332 | 4.21x faster |  |
| self-cycle | devour | 45,870 | 1.19x slower |  |
| mutual-cycle | kitsu | 53,656 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **259,961** | **4.84x faster** |  |
| mutual-cycle | fetchja | 223,460 | 4.16x faster |  |
| mutual-cycle | devour | 44,426 | 1.21x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 59,106 | 1x | 29,553 cycles/s |
| small-no-relationships | kitsu-native | 222,766 | 3.77x faster | 111,383 cycles/s |
| **small-no-relationships** | **fetchja** | **230,009** | **3.89x faster** | **115,004 cycles/s** |
| small-no-relationships | devour | 50,130 | 1.18x slower | 25,065 cycles/s |
| small-links-only | kitsu | 58,865 | 1x | 29,433 cycles/s |
| small-links-only | kitsu-native | 204,940 | 3.48x faster | 102,470 cycles/s |
| **small-links-only** | **fetchja** | **214,847** | **3.65x faster** | **107,424 cycles/s** |
| small-links-only | devour | 49,651 | 1.19x slower | 24,825 cycles/s |
| small-relationships | kitsu | 43,912 | 1x | 21,956 cycles/s |
| small-relationships | kitsu-native | 123,562 | 2.81x faster | 61,781 cycles/s |
| **small-relationships** | **fetchja** | **129,810** | **2.96x faster** | **64,905 cycles/s** |
| small-relationships | devour | 39,216 | 1.12x slower | 19,608 cycles/s |
| nested-relationships | kitsu | 47,450 | 1x | 23,725 cycles/s |
| **nested-relationships** | **kitsu-native** | **150,648** | **3.17x faster** | **75,324 cycles/s** |
| nested-relationships | fetchja | 150,038 | 3.16x faster | 75,019 cycles/s |
| nested-relationships | devour | 42,816 | 1.11x slower | 21,408 cycles/s |
| collection | kitsu | 19,320 | 1x | 9,660 cycles/s |
| **collection** | **kitsu-native** | **23,281** | **1.21x faster** | **11,641 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 16,043 | 1x | 8,022 cycles/s |
| **collection-includes** | **kitsu-native** | **19,803** | **1.23x faster** | **9,901 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 66,957 | 1x | 33,478 cycles/s |
| **patch-single** | **kitsu-native** | **279,354** | **4.17x faster** | **139,677 cycles/s** |
| patch-single | fetchja | 254,648 | 3.8x faster | 127,324 cycles/s |
| patch-single | devour | 54,877 | 1.22x slower | 27,438 cycles/s |
| empty-relationships | kitsu | 50,870 | 1x | 25,435 cycles/s |
| empty-relationships | kitsu-native | 175,857 | 3.46x faster | 87,929 cycles/s |
| **empty-relationships** | **fetchja** | **192,727** | **3.79x faster** | **96,364 cycles/s** |
| empty-relationships | devour | 44,660 | 1.14x slower | 22,330 cycles/s |
| few-includes | kitsu | 482 | 1x | 241 cycles/s |
| **few-includes** | **kitsu-native** | **502** | **1.04x faster** | **251 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **304** | **1x** | **152 cycles/s** |
| many-includes | kitsu-native | 301 | 1.01x slower | 150 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **56.76** | **1x** | **28\.38 cycles/s** |
| complex-relationships | kitsu-native | 52.21 | 1.09x slower | 26\.11 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 379 | 1x | 190 cycles/s |
| **wide-relationship** | **kitsu-native** | **382** | **1.01x faster** | **191 cycles/s** |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 49,768 | 1x | 24,884 cycles/s |
| **self-cycle** | **kitsu-native** | **145,769** | **2.93x faster** | **72,885 cycles/s** |
| self-cycle | fetchja | 138,981 | 2.79x faster | 69,491 cycles/s |
| self-cycle | devour | 41,512 | 1.2x slower | 20,756 cycles/s |
| mutual-cycle | kitsu | 47,575 | 1x | 23,788 cycles/s |
| **mutual-cycle** | **kitsu-native** | **136,921** | **2.88x faster** | **68,461 cycles/s** |
| mutual-cycle | fetchja | 127,583 | 2.68x faster | 63,792 cycles/s |
| mutual-cycle | devour | 41,166 | 1.16x slower | 20,583 cycles/s |

</details>

### node v26\.5\.0

Base commit (local changes measured): `2559f756236f18c6aa5c45f173e23a2198aae8f8`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `2bdcf04e297d5dc8082ec9eea0063e0be252a73a497c908939f5cb4e8838f9db`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,125,524 | 1x |  |
| small-no-relationships | devour | 1,563,543 | 1.39x faster |  |
| small-no-relationships | yayson | 786,186 | 1.43x slower |  |
| **small-no-relationships** | **jsona** | **1,587,683** | **1.41x faster** |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 906,226 | 1x |  |
| small-links-only | devour | 780,682 | 1.16x slower |  |
| small-links-only | yayson | 581,397 | 1.56x slower |  |
| **small-links-only** | **jsona** | **1,503,533** | **1.66x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 277,312 | 1x |  |
| small-relationships | devour | 233,360 | 1.19x slower |  |
| small-relationships | yayson | 176,854 | 1.57x slower |  |
| **small-relationships** | **jsona** | **363,122** | **1.31x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 330,456 | 1x |  |
| nested-relationships | devour | 255,369 | 1.29x slower |  |
| nested-relationships | yayson | 225,323 | 1.47x slower |  |
| **nested-relationships** | **jsona** | **408,632** | **1.24x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 77,147 | 1x |  |
| collection | devour | 62,304 | 1.24x slower |  |
| collection | yayson | 114,972 | 1.49x faster |  |
| **collection** | **jsona** | **297,556** | **3.86x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 60,297 | 1x |  |
| collection-includes | devour | 84,851 | 1.41x faster |  |
| collection-includes | yayson | 100,746 | 1.67x faster |  |
| **collection-includes** | **jsona** | **125,622** | **2.08x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,839,363 | 1x |  |
| patch-single | devour | 2,056,141 | 1.12x faster |  |
| patch-single | yayson | 805,671 | 2.28x slower |  |
| **patch-single** | **jsona** | **2,058,154** | **1.12x faster** |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 927,874 | 1x |  |
| empty-relationships | devour | 531,665 | 1.75x slower |  |
| empty-relationships | yayson | 614,524 | 1.51x slower |  |
| **empty-relationships** | **jsona** | **1,260,805** | **1.36x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **603** | **1x** |  |
| few-includes | devour | 364 | 1.66x slower |  |
| few-includes | yayson | 443 | 1.36x slower |  |
| few-includes | jsona | 447 | 1.35x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **230** | **1x** |  |
| many-includes | devour | 3.79 | 60.79x slower |  |
| many-includes | yayson | 18.3 | 12.59x slower |  |
| many-includes | jsona | 168 | 1.37x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **28.08** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.48 | 59.07x slower |  |
| complex-relationships | jsona | 21.24 | 1.32x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **227** | **1x** |  |
| wide-relationship | devour | 2.85 | 79.45x slower |  |
| wide-relationship | yayson | 10.35 | 21.91x slower |  |
| wide-relationship | jsona | 155 | 1.47x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 305,949 | 1x |  |
| self-cycle | devour | 212,132 | 1.44x slower |  |
| self-cycle | yayson | 211,025 | 1.45x slower |  |
| **self-cycle** | **jsona** | **327,861** | **1.07x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| mutual-cycle | kitsu-core | 243,223 | 1x |  |
| mutual-cycle | devour | 170,585 | 1.43x slower |  |
| mutual-cycle | yayson | 168,750 | 1.44x slower |  |
| **mutual-cycle** | **jsona** | **269,704** | **1.11x faster** |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,536,128 | 1x |  |
| small-no-relationships | devour | 2,072,080 | 1.35x faster |  |
| small-no-relationships | yayson | 1,566,299 | 1.02x faster |  |
| **small-no-relationships** | **jsona** | **3,086,929** | **2.01x faster** |  |
| small-no-relationships | ts-japi | 661,635 | 2.32x slower |  |
| small-links-only | kitsu-core | 1,522,773 | 1x |  |
| small-links-only | devour | 1,212,220 | 1.26x slower |  |
| small-links-only | yayson | 1,321,111 | 1.15x slower |  |
| **small-links-only** | **jsona** | **3,105,702** | **2.04x faster** |  |
| small-links-only | ts-japi | 661,444 | 2.3x slower |  |
| small-relationships | kitsu-core | 935,606 | 1x |  |
| small-relationships | devour | 702,471 | 1.33x slower |  |
| small-relationships | yayson | 703,895 | 1.33x slower |  |
| **small-relationships** | **jsona** | **1,586,350** | **1.7x faster** |  |
| small-relationships | ts-japi | 410,320 | 2.28x slower |  |
| nested-relationships | kitsu-core | 1,663,196 | 1x |  |
| nested-relationships | devour | 862,049 | 1.93x slower |  |
| nested-relationships | yayson | 782,346 | 2.13x slower |  |
| **nested-relationships** | **jsona** | **1,801,185** | **1.08x faster** |  |
| nested-relationships | ts-japi | 484,049 | 3.44x slower |  |
| collection | kitsu-core | 195,552 | 1x |  |
| collection | devour | 71,946 | 2.72x slower |  |
| collection | yayson | 216,135 | 1.11x faster |  |
| **collection** | **jsona** | **793,838** | **4.06x faster** |  |
| collection | ts-japi | 238,230 | 1.22x faster |  |
| collection-includes | kitsu-core | 20,315 | 1x |  |
| collection-includes | devour | 164,404 | 8.09x faster |  |
| collection-includes | yayson | 241,556 | 11.89x faster |  |
| **collection-includes** | **jsona** | **388,587** | **19.13x faster** |  |
| collection-includes | ts-japi | 145,776 | 7.18x faster |  |
| patch-single | kitsu-core | 4,003,124 | 1x |  |
| **patch-single** | **devour** | **5,892,118** | **1.47x faster** |  |
| patch-single | yayson | 2,175,417 | 1.84x slower |  |
| patch-single | jsona | 4,372,149 | 1.09x faster |  |
| patch-single | ts-japi | 736,011 | 5.44x slower |  |
| empty-relationships | kitsu-core | 1,379,910 | 1x |  |
| empty-relationships | devour | 791,219 | 1.74x slower |  |
| empty-relationships | yayson | 854,038 | 1.62x slower |  |
| **empty-relationships** | **jsona** | **1,747,644** | **1.27x faster** |  |
| empty-relationships | ts-japi | 462,674 | 2.98x slower |  |
| few-includes | kitsu-core | 761 | 1x |  |
| few-includes | devour | 727 | 1.05x slower |  |
| few-includes | yayson | 757 | 1.01x slower |  |
| **few-includes** | **jsona** | **1,329** | **1.75x faster** |  |
| few-includes | ts-japi | 382 | 1.99x slower |  |
| many-includes | kitsu-core | 743 | 1x |  |
| many-includes | devour | 759 | 1.02x faster |  |
| many-includes | yayson | 728 | 1.02x slower |  |
| **many-includes** | **jsona** | **1,669** | **2.25x faster** |  |
| many-includes | ts-japi | 275 | 2.71x slower |  |
| complex-relationships | kitsu-core | 343 | 1x |  |
| **complex-relationships** | **devour** | **504** | **1.47x faster** |  |
| complex-relationships | yayson | 372 | 1.09x faster |  |
| complex-relationships | jsona | 378 | 1.1x faster |  |
| complex-relationships | ts-japi | 176 | 1.94x slower |  |
| wide-relationship | kitsu-core | 2,758 | 1x |  |
| wide-relationship | devour | 7,888 | 2.86x faster |  |
| wide-relationship | yayson | 6,302 | 2.29x faster |  |
| wide-relationship | jsona | 5,123 | 1.86x faster |  |
| **wide-relationship** | **ts-japi** | **9,327** | **3.38x faster** |  |
| self-cycle | kitsu-core | 1,685,472 | 1x |  |
| self-cycle | devour | 772,872 | 2.18x slower |  |
| self-cycle | yayson | 835,383 | 2.02x slower |  |
| **self-cycle** | **jsona** | **1,699,018** | **1.01x faster** |  |
| self-cycle | ts-japi | 458,045 | 3.68x slower |  |
| mutual-cycle | kitsu-core | 1,553,970 | 1x |  |
| mutual-cycle | devour | 867,431 | 1.79x slower |  |
| mutual-cycle | yayson | 809,054 | 1.92x slower |  |
| **mutual-cycle** | **jsona** | **1,997,028** | **1.29x faster** |  |
| mutual-cycle | ts-japi | 475,301 | 3.27x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 630,854 | 1x |  |
| small-no-relationships | devour | 897,581 | 1.42x faster |  |
| small-no-relationships | yayson | 458,534 | 1.38x slower |  |
| **small-no-relationships** | **jsona** | **939,739** | **1.49x faster** |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 534,618 | 1x |  |
| small-links-only | devour | 487,377 | 1.1x slower |  |
| small-links-only | yayson | 387,432 | 1.38x slower |  |
| **small-links-only** | **jsona** | **882,277** | **1.65x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 187,605 | 1x |  |
| small-relationships | devour | 159,177 | 1.18x slower |  |
| small-relationships | yayson | 128,452 | 1.46x slower |  |
| **small-relationships** | **jsona** | **252,700** | **1.35x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 255,774 | 1x |  |
| nested-relationships | devour | 180,980 | 1.41x slower |  |
| nested-relationships | yayson | 162,727 | 1.57x slower |  |
| **nested-relationships** | **jsona** | **294,452** | **1.15x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 50,785 | 1x |  |
| collection | devour | 31,758 | 1.6x slower |  |
| collection | yayson | 74,273 | 1.46x faster |  |
| **collection** | **jsona** | **159,276** | **3.14x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 30,355 | 1x |  |
| collection-includes | devour | 50,790 | 1.67x faster |  |
| collection-includes | yayson | 60,673 | 2x faster |  |
| **collection-includes** | **jsona** | **73,339** | **2.42x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,267,538 | 1x |  |
| **patch-single** | **devour** | **1,443,670** | **1.14x faster** |  |
| patch-single | yayson | 560,579 | 2.26x slower |  |
| patch-single | jsona | 1,212,425 | 1.05x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 461,347 | 1x |  |
| empty-relationships | devour | 290,011 | 1.59x slower |  |
| empty-relationships | yayson | 309,298 | 1.49x slower |  |
| **empty-relationships** | **jsona** | **623,946** | **1.35x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 264 | 1x |  |
| few-includes | devour | 225 | 1.17x slower |  |
| few-includes | yayson | 231 | 1.14x slower |  |
| **few-includes** | **jsona** | **322** | **1.22x faster** |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **154** | **1x** |  |
| many-includes | devour | 3.83 | 40.25x slower |  |
| many-includes | yayson | 16.85 | 9.15x slower |  |
| many-includes | jsona | 136 | 1.14x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **26.46** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.5 | 53.4x slower |  |
| complex-relationships | jsona | 19.78 | 1.34x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **195** | **1x** |  |
| wide-relationship | devour | 2.78 | 70.04x slower |  |
| wide-relationship | yayson | 11.06 | 17.62x slower |  |
| wide-relationship | jsona | 139 | 1.4x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 225,669 | 1x |  |
| self-cycle | devour | 161,189 | 1.4x slower |  |
| self-cycle | yayson | 146,841 | 1.54x slower |  |
| **self-cycle** | **jsona** | **251,462** | **1.11x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| mutual-cycle | kitsu-core | 191,440 | 1x |  |
| mutual-cycle | devour | 130,537 | 1.47x slower |  |
| mutual-cycle | yayson | 129,737 | 1.48x slower |  |
| **mutual-cycle** | **jsona** | **214,589** | **1.12x faster** |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 51,815 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **90,216** | **1.74x faster** |  |
| small-no-relationships | fetchja | 76,538 | 1.48x faster |  |
| small-no-relationships | devour | 43,805 | 1.18x slower |  |
| small-links-only | kitsu | 49,219 | 1x |  |
| **small-links-only** | **kitsu-native** | **80,053** | **1.63x faster** |  |
| small-links-only | fetchja | 74,431 | 1.51x faster |  |
| small-links-only | devour | 42,614 | 1.16x slower |  |
| small-relationships | kitsu | 37,514 | 1x |  |
| **small-relationships** | **kitsu-native** | **52,848** | **1.41x faster** |  |
| small-relationships | fetchja | 44,808 | 1.19x faster |  |
| small-relationships | devour | 31,874 | 1.18x slower |  |
| nested-relationships | kitsu | 41,567 | 1x |  |
| nested-relationships | kitsu-native | 51,714 | 1.24x faster |  |
| **nested-relationships** | **fetchja** | **52,386** | **1.26x faster** |  |
| nested-relationships | devour | 31,952 | 1.3x slower |  |
| **collection** | **kitsu** | **15,735** | **1x** |  |
| collection | kitsu-native | 13,333 | 1.18x slower |  |
| collection | fetchja | 14,299 | 1.1x slower |  |
| collection | devour | 14,174 | 1.11x slower |  |
| collection-includes | kitsu | 15,879 | 1x |  |
| collection-includes | kitsu-native | 14,310 | 1.11x slower |  |
| collection-includes | fetchja | 12,982 | 1.22x slower |  |
| **collection-includes** | **devour** | **16,264** | **1.02x faster** |  |
| patch-single | kitsu | 59,670 | 1x |  |
| **patch-single** | **kitsu-native** | **110,494** | **1.85x faster** |  |
| patch-single | fetchja | 90,771 | 1.52x faster |  |
| patch-single | devour | 51,305 | 1.16x slower |  |
| empty-relationships | kitsu | 49,207 | 1x |  |
| **empty-relationships** | **kitsu-native** | **82,325** | **1.67x faster** |  |
| empty-relationships | fetchja | 69,470 | 1.41x faster |  |
| empty-relationships | devour | 40,974 | 1.2x slower |  |
| **few-includes** | **kitsu** | **350** | **1x** |  |
| few-includes | kitsu-native | 327 | 1.07x slower |  |
| few-includes | fetchja | 278 | 1.26x slower |  |
| few-includes | devour | 236 | 1.48x slower |  |
| **many-includes** | **kitsu** | **132** | **1x** |  |
| many-includes | kitsu-native | 129 | 1.02x slower |  |
| many-includes | fetchja | 115 | 1.15x slower |  |
| many-includes | devour | 6.5 | 20.28x slower |  |
| **complex-relationships** | **kitsu** | **21.13** | **1x** |  |
| complex-relationships | kitsu-native | 20.39 | 1.04x slower |  |
| complex-relationships | fetchja | 16.98 | 1.24x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **137** | **1x** |  |
| wide-relationship | kitsu-native | 133 | 1.03x slower |  |
| wide-relationship | fetchja | 113 | 1.21x slower |  |
| wide-relationship | devour | 3.37 | 40.64x slower |  |
| self-cycle | kitsu | 38,391 | 1x |  |
| **self-cycle** | **kitsu-native** | **50,136** | **1.31x faster** |  |
| self-cycle | fetchja | 47,401 | 1.23x faster |  |
| self-cycle | devour | 30,826 | 1.25x slower |  |
| mutual-cycle | kitsu | 33,835 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **48,165** | **1.42x faster** |  |
| mutual-cycle | fetchja | 42,716 | 1.26x faster |  |
| mutual-cycle | devour | 28,029 | 1.21x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 45,430 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **240,081** | **5.28x faster** |  |
| small-no-relationships | fetchja | 183,020 | 4.03x faster |  |
| small-no-relationships | devour | 43,952 | 1.03x slower |  |
| small-links-only | kitsu | 46,503 | 1x |  |
| **small-links-only** | **kitsu-native** | **245,279** | **5.27x faster** |  |
| small-links-only | fetchja | 178,106 | 3.83x faster |  |
| small-links-only | devour | 43,964 | 1.06x slower |  |
| small-relationships | kitsu | 38,053 | 1x |  |
| **small-relationships** | **kitsu-native** | **151,580** | **3.98x faster** |  |
| small-relationships | fetchja | 133,700 | 3.51x faster |  |
| small-relationships | devour | 33,529 | 1.13x slower |  |
| nested-relationships | kitsu | 44,712 | 1x |  |
| **nested-relationships** | **kitsu-native** | **213,164** | **4.77x faster** |  |
| nested-relationships | fetchja | 159,085 | 3.56x faster |  |
| nested-relationships | devour | 40,361 | 1.11x slower |  |
| collection | kitsu | 21,133 | 1x |  |
| **collection** | **kitsu-native** | **36,664** | **1.73x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 7,645 | 1x |  |
| **collection-includes** | **kitsu-native** | **9,955** | **1.3x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 52,340 | 1x |  |
| **patch-single** | **kitsu-native** | **341,105** | **6.52x faster** |  |
| patch-single | fetchja | 226,892 | 4.33x faster |  |
| patch-single | devour | 52,212 | <1.01x slower |  |
| empty-relationships | kitsu | 44,712 | 1x |  |
| **empty-relationships** | **kitsu-native** | **202,554** | **4.53x faster** |  |
| empty-relationships | fetchja | 159,524 | 3.57x faster |  |
| empty-relationships | devour | 38,416 | 1.16x slower |  |
| **few-includes** | **kitsu** | **290** | **1x** |  |
| few-includes | kitsu-native | 287 | 1.01x slower |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **300** | **1x** |  |
| many-includes | kitsu-native | 296 | 1.01x slower |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 93.58 | 1x |  |
| **complex-relationships** | **kitsu-native** | **113** | **1.2x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 795 | 1x |  |
| **wide-relationship** | **kitsu-native** | **888** | **1.12x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 44,248 | 1x |  |
| **self-cycle** | **kitsu-native** | **218,864** | **4.95x faster** |  |
| self-cycle | fetchja | 159,474 | 3.6x faster |  |
| self-cycle | devour | 37,277 | 1.19x slower |  |
| mutual-cycle | kitsu | 43,691 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **210,852** | **4.83x faster** |  |
| mutual-cycle | fetchja | 154,299 | 3.53x faster |  |
| mutual-cycle | devour | 36,653 | 1.19x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 47,834 | 1x | 23,917 cycles/s |
| **small-no-relationships** | **kitsu-native** | **121,023** | **2.53x faster** | **60,512 cycles/s** |
| small-no-relationships | fetchja | 96,159 | 2.01x faster | 48,079 cycles/s |
| small-no-relationships | devour | 43,897 | 1.09x slower | 21,949 cycles/s |
| small-links-only | kitsu | 49,797 | 1x | 24,899 cycles/s |
| **small-links-only** | **kitsu-native** | **108,382** | **2.18x faster** | **54,191 cycles/s** |
| small-links-only | fetchja | 93,506 | 1.88x faster | 46,753 cycles/s |
| small-links-only | devour | 41,845 | 1.19x slower | 20,922 cycles/s |
| small-relationships | kitsu | 33,148 | 1x | 16,574 cycles/s |
| **small-relationships** | **kitsu-native** | **65,600** | **1.98x faster** | **32,800 cycles/s** |
| small-relationships | fetchja | 56,886 | 1.72x faster | 28,443 cycles/s |
| small-relationships | devour | 32,602 | 1.02x slower | 16,301 cycles/s |
| nested-relationships | kitsu | 39,795 | 1x | 19,897 cycles/s |
| **nested-relationships** | **kitsu-native** | **79,262** | **1.99x faster** | **39,631 cycles/s** |
| nested-relationships | fetchja | 62,883 | 1.58x faster | 31,442 cycles/s |
| nested-relationships | devour | 34,245 | 1.16x slower | 17,122 cycles/s |
| collection | kitsu | 17,675 | 1x | 8,837 cycles/s |
| **collection** | **kitsu-native** | **18,349** | **1.04x faster** | **9,174 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 13,722 | 1x | 6,861 cycles/s |
| **collection-includes** | **kitsu-native** | **14,095** | **1.03x faster** | **7,047 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 57,463 | 1x | 28,732 cycles/s |
| **patch-single** | **kitsu-native** | **154,974** | **2.7x faster** | **77,487 cycles/s** |
| patch-single | fetchja | 114,871 | 2x faster | 57,436 cycles/s |
| patch-single | devour | 49,188 | 1.17x slower | 24,594 cycles/s |
| empty-relationships | kitsu | 45,321 | 1x | 22,661 cycles/s |
| **empty-relationships** | **kitsu-native** | **97,425** | **2.15x faster** | **48,713 cycles/s** |
| empty-relationships | fetchja | 86,565 | 1.91x faster | 43,283 cycles/s |
| empty-relationships | devour | 39,166 | 1.16x slower | 19,583 cycles/s |
| **few-includes** | **kitsu** | **303** | **1x** | **152 cycles/s** |
| few-includes | kitsu-native | 293 | 1.04x slower | 146 cycles/s |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **186** | **1x** | **93\.16 cycles/s** |
| many-includes | kitsu-native | 170 | 1.09x slower | 85\.13 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **34.55** | **1x** | **17\.28 cycles/s** |
| complex-relationships | kitsu-native | 34.5 | <1.01x slower | 17\.25 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **240** | **1x** | **120 cycles/s** |
| wide-relationship | kitsu-native | 225 | 1.07x slower | 113 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 37,805 | 1x | 18,903 cycles/s |
| **self-cycle** | **kitsu-native** | **74,164** | **1.96x faster** | **37,082 cycles/s** |
| self-cycle | fetchja | 62,605 | 1.66x faster | 31,303 cycles/s |
| self-cycle | devour | 33,682 | 1.12x slower | 16,841 cycles/s |
| mutual-cycle | kitsu | 38,442 | 1x | 19,221 cycles/s |
| **mutual-cycle** | **kitsu-native** | **68,903** | **1.79x faster** | **34,451 cycles/s** |
| mutual-cycle | fetchja | 58,168 | 1.51x faster | 29,084 cycles/s |
| mutual-cycle | devour | 29,869 | 1.29x slower | 14,934 cycles/s |

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
