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

Base commit (local changes measured): `9728d544b7193c79cd29d02e242616821ea07b70`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `9539c00965e1889939d3830f2091babe327b30ebe741a163b9d1bdd3bdfe6141`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,205,133 | 1x |  |
| **small-no-relationships** | **devour** | **1,952,192** | **1.62x faster** |  |
| small-no-relationships | yayson | 1,011,193 | 1.19x slower |  |
| small-no-relationships | jsona | 1,473,276 | 1.22x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 984,657 | 1x |  |
| small-links-only | devour | 1,194,391 | 1.21x faster |  |
| small-links-only | yayson | 651,394 | 1.51x slower |  |
| **small-links-only** | **jsona** | **1,312,496** | **1.33x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| **small-relationships** | **kitsu-core** | **396,960** | **1x** |  |
| small-relationships | devour | 339,793 | 1.17x slower |  |
| small-relationships | yayson | 257,453 | 1.54x slower |  |
| small-relationships | jsona | 373,928 | 1.06x slower |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **538,334** | **1x** |  |
| nested-relationships | devour | 419,478 | 1.28x slower |  |
| nested-relationships | yayson | 330,829 | 1.63x slower |  |
| nested-relationships | jsona | 409,568 | 1.31x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 92,990 | 1x |  |
| collection | devour | 118,839 | 1.28x faster |  |
| collection | yayson | 89,436 | 1.04x slower |  |
| **collection** | **jsona** | **276,892** | **2.98x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 67,076 | 1x |  |
| collection-includes | devour | 145,253 | 2.17x faster |  |
| collection-includes | yayson | 133,605 | 1.99x faster |  |
| **collection-includes** | **jsona** | **164,680** | **2.46x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **2,322,704** | **1x** |  |
| patch-single | devour | 1,695,777 | 1.37x slower |  |
| patch-single | yayson | 1,038,529 | 2.24x slower |  |
| patch-single | jsona | 1,599,407 | 1.45x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 969,845 | 1x |  |
| empty-relationships | devour | 855,362 | 1.13x slower |  |
| empty-relationships | yayson | 787,063 | 1.23x slower |  |
| **empty-relationships** | **jsona** | **1,150,514** | **1.19x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **1,033** | **1x** |  |
| few-includes | devour | 607 | 1.7x slower |  |
| few-includes | yayson | 706 | 1.46x slower |  |
| few-includes | jsona | 674 | 1.53x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **575** | **1x** |  |
| many-includes | devour | 8.69 | 66.15x slower |  |
| many-includes | yayson | 42.85 | 13.42x slower |  |
| many-includes | jsona | 234 | 2.46x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **88.04** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.97 | 90.86x slower |  |
| complex-relationships | jsona | 33.33 | 2.64x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **574** | **1x** |  |
| wide-relationship | devour | 5.53 | 104x slower |  |
| wide-relationship | yayson | 25.23 | 22.75x slower |  |
| wide-relationship | jsona | 194 | 2.96x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **494,080** | **1x** |  |
| self-cycle | devour | 352,926 | 1.4x slower |  |
| self-cycle | yayson | 299,879 | 1.65x slower |  |
| self-cycle | jsona | 361,038 | 1.37x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **403,197** | **1x** |  |
| mutual-cycle | devour | 274,369 | 1.47x slower |  |
| mutual-cycle | yayson | 250,982 | 1.61x slower |  |
| mutual-cycle | jsona | 284,292 | 1.42x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 2,130,827 | 1x |  |
| **small-no-relationships** | **devour** | **3,945,756** | **1.85x faster** |  |
| small-no-relationships | yayson | 2,043,994 | 1.04x slower |  |
| small-no-relationships | jsona | 2,581,237 | 1.21x faster |  |
| small-no-relationships | ts-japi | 927,073 | 2.3x slower |  |
| small-links-only | kitsu-core | 2,024,009 | 1x |  |
| small-links-only | devour | 2,417,094 | 1.19x faster |  |
| small-links-only | yayson | 1,790,163 | 1.13x slower |  |
| **small-links-only** | **jsona** | **2,901,075** | **1.43x faster** |  |
| small-links-only | ts-japi | 931,093 | 2.17x slower |  |
| small-relationships | kitsu-core | 1,259,097 | 1x |  |
| **small-relationships** | **devour** | **1,435,207** | **1.14x faster** |  |
| small-relationships | yayson | 1,147,897 | 1.1x slower |  |
| small-relationships | jsona | 1,097,559 | 1.15x slower |  |
| small-relationships | ts-japi | 483,422 | 2.6x slower |  |
| **nested-relationships** | **kitsu-core** | **2,179,930** | **1x** |  |
| nested-relationships | devour | 1,621,509 | 1.34x slower |  |
| nested-relationships | yayson | 1,118,076 | 1.95x slower |  |
| nested-relationships | jsona | 1,355,600 | 1.61x slower |  |
| nested-relationships | ts-japi | 511,958 | 4.26x slower |  |
| collection | kitsu-core | 165,782 | 1x |  |
| collection | devour | 195,727 | 1.18x faster |  |
| collection | yayson | 261,707 | 1.58x faster |  |
| **collection** | **jsona** | **684,895** | **4.13x faster** |  |
| collection | ts-japi | 364,001 | 2.2x faster |  |
| collection-includes | kitsu-core | 89,843 | 1x |  |
| collection-includes | devour | 325,426 | 3.62x faster |  |
| **collection-includes** | **yayson** | **375,088** | **4.17x faster** |  |
| collection-includes | jsona | 368,505 | 4.1x faster |  |
| collection-includes | ts-japi | 222,177 | 2.47x faster |  |
| **patch-single** | **kitsu-core** | **6,661,679** | **1x** |  |
| patch-single | devour | 5,310,535 | 1.25x slower |  |
| patch-single | yayson | 2,299,228 | 2.9x slower |  |
| patch-single | jsona | 3,624,882 | 1.84x slower |  |
| patch-single | ts-japi | 1,017,737 | 6.55x slower |  |
| empty-relationships | kitsu-core | 1,389,334 | 1x |  |
| **empty-relationships** | **devour** | **1,599,996** | **1.15x faster** |  |
| empty-relationships | yayson | 1,173,519 | 1.18x slower |  |
| empty-relationships | jsona | 1,411,802 | 1.02x faster |  |
| empty-relationships | ts-japi | 531,638 | 2.61x slower |  |
| few-includes | kitsu-core | 1,265 | 1x |  |
| **few-includes** | **devour** | **1,986** | **1.57x faster** |  |
| few-includes | yayson | 1,287 | 1.02x faster |  |
| few-includes | jsona | 1,445 | 1.14x faster |  |
| few-includes | ts-japi | 757 | 1.67x slower |  |
| many-includes | kitsu-core | 1,229 | 1x |  |
| **many-includes** | **devour** | **2,026** | **1.65x faster** |  |
| many-includes | yayson | 1,381 | 1.12x faster |  |
| many-includes | jsona | 1,344 | 1.09x faster |  |
| many-includes | ts-japi | 756 | 1.63x slower |  |
| complex-relationships | kitsu-core | 707 | 1x |  |
| **complex-relationships** | **devour** | **1,173** | **1.66x faster** |  |
| complex-relationships | yayson | 939 | 1.33x faster |  |
| complex-relationships | jsona | 665 | 1.06x slower |  |
| complex-relationships | ts-japi | 496 | 1.43x slower |  |
| wide-relationship | kitsu-core | 7,710 | 1x |  |
| **wide-relationship** | **devour** | **30,902** | **4.01x faster** |  |
| wide-relationship | yayson | 20,348 | 2.64x faster |  |
| wide-relationship | jsona | 5,461 | 1.41x slower |  |
| wide-relationship | ts-japi | 9,837 | 1.28x faster |  |
| **self-cycle** | **kitsu-core** | **2,137,091** | **1x** |  |
| self-cycle | devour | 1,909,591 | 1.12x slower |  |
| self-cycle | yayson | 1,084,785 | 1.97x slower |  |
| self-cycle | jsona | 1,273,699 | 1.68x slower |  |
| self-cycle | ts-japi | 509,518 | 4.19x slower |  |
| **mutual-cycle** | **kitsu-core** | **2,103,711** | **1x** |  |
| mutual-cycle | devour | 1,752,401 | 1.2x slower |  |
| mutual-cycle | yayson | 1,084,439 | 1.94x slower |  |
| mutual-cycle | jsona | 1,105,427 | 1.9x slower |  |
| mutual-cycle | ts-japi | 479,508 | 4.39x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 661,270 | 1x |  |
| **small-no-relationships** | **devour** | **825,303** | **1.25x faster** |  |
| small-no-relationships | yayson | 606,591 | 1.09x slower |  |
| small-no-relationships | jsona | 824,759 | 1.25x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 556,495 | 1x |  |
| small-links-only | devour | 656,915 | 1.18x faster |  |
| small-links-only | yayson | 434,641 | 1.28x slower |  |
| **small-links-only** | **jsona** | **725,181** | **1.3x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 237,450 | 1x |  |
| **small-relationships** | **devour** | **248,397** | **1.05x faster** |  |
| small-relationships | yayson | 185,054 | 1.28x slower |  |
| small-relationships | jsona | 230,649 | 1.03x slower |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **325,551** | **1x** |  |
| nested-relationships | devour | 279,023 | 1.17x slower |  |
| nested-relationships | yayson | 232,041 | 1.4x slower |  |
| nested-relationships | jsona | 258,741 | 1.26x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 53,145 | 1x |  |
| collection | devour | 61,052 | 1.15x faster |  |
| collection | yayson | 59,318 | 1.12x faster |  |
| **collection** | **jsona** | **126,593** | **2.38x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 36,780 | 1x |  |
| collection-includes | devour | 88,531 | 2.41x faster |  |
| collection-includes | yayson | 91,003 | 2.47x faster |  |
| **collection-includes** | **jsona** | **102,276** | **2.78x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **1,174,667** | **1x** |  |
| patch-single | devour | 1,141,544 | 1.03x slower |  |
| patch-single | yayson | 649,873 | 1.81x slower |  |
| patch-single | jsona | 818,892 | 1.43x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 437,320 | 1x |  |
| empty-relationships | devour | 427,729 | 1.02x slower |  |
| empty-relationships | yayson | 377,431 | 1.16x slower |  |
| **empty-relationships** | **jsona** | **456,254** | **1.04x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **437** | **1x** |  |
| few-includes | devour | 379 | 1.15x slower |  |
| few-includes | yayson | 324 | 1.35x slower |  |
| few-includes | jsona | 356 | 1.23x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **315** | **1x** |  |
| many-includes | devour | 7.97 | 39.49x slower |  |
| many-includes | yayson | 40.13 | 7.84x slower |  |
| many-includes | jsona | 168 | 1.87x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **65.75** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.98 | 67.3x slower |  |
| complex-relationships | jsona | 26.76 | 2.46x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **482** | **1x** |  |
| wide-relationship | devour | 5.58 | 86.27x slower |  |
| wide-relationship | yayson | 23.61 | 20.4x slower |  |
| wide-relationship | jsona | 169 | 2.85x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **293,785** | **1x** |  |
| self-cycle | devour | 256,799 | 1.14x slower |  |
| self-cycle | yayson | 211,599 | 1.39x slower |  |
| self-cycle | jsona | 229,111 | 1.28x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **262,069** | **1x** |  |
| mutual-cycle | devour | 209,869 | 1.25x slower |  |
| mutual-cycle | yayson | 177,328 | 1.48x slower |  |
| mutual-cycle | jsona | 197,144 | 1.33x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 72,051 | 1x |  |
| small-no-relationships | kitsu-native | 255,450 | 3.55x faster |  |
| **small-no-relationships** | **fetchja** | **278,210** | **3.86x faster** |  |
| small-no-relationships | devour | 65,037 | 1.11x slower |  |
| small-links-only | kitsu | 67,926 | 1x |  |
| small-links-only | kitsu-native | 240,123 | 3.54x faster |  |
| **small-links-only** | **fetchja** | **243,536** | **3.59x faster** |  |
| small-links-only | devour | 62,798 | 1.08x slower |  |
| small-relationships | kitsu | 52,525 | 1x |  |
| **small-relationships** | **kitsu-native** | **137,159** | **2.61x faster** |  |
| small-relationships | fetchja | 133,159 | 2.54x faster |  |
| small-relationships | devour | 47,456 | 1.11x slower |  |
| nested-relationships | kitsu | 57,372 | 1x |  |
| **nested-relationships** | **kitsu-native** | **169,227** | **2.95x faster** |  |
| nested-relationships | fetchja | 161,454 | 2.81x faster |  |
| nested-relationships | devour | 49,163 | 1.17x slower |  |
| collection | kitsu | 22,538 | 1x |  |
| collection | kitsu-native | 22,637 | <1.01x faster |  |
| **collection** | **fetchja** | **40,588** | **1.8x faster** |  |
| collection | devour | 22,606 | <1.01x faster |  |
| collection-includes | kitsu | 21,277 | 1x |  |
| collection-includes | kitsu-native | 23,315 | 1.1x faster |  |
| **collection-includes** | **fetchja** | **40,027** | **1.88x faster** |  |
| collection-includes | devour | 24,511 | 1.15x faster |  |
| patch-single | kitsu | 78,714 | 1x |  |
| **patch-single** | **kitsu-native** | **341,008** | **4.33x faster** |  |
| patch-single | fetchja | 307,496 | 3.91x faster |  |
| patch-single | devour | 70,051 | 1.12x slower |  |
| empty-relationships | kitsu | 68,413 | 1x |  |
| **empty-relationships** | **kitsu-native** | **238,822** | **3.49x faster** |  |
| empty-relationships | fetchja | 226,174 | 3.31x faster |  |
| empty-relationships | devour | 60,096 | 1.14x slower |  |
| **few-includes** | **kitsu** | **661** | **1x** |  |
| few-includes | kitsu-native | 634 | 1.04x slower |  |
| few-includes | fetchja | 608 | 1.09x slower |  |
| few-includes | devour | 455 | 1.45x slower |  |
| **many-includes** | **kitsu** | **307** | **1x** |  |
| many-includes | kitsu-native | 296 | 1.04x slower |  |
| many-includes | fetchja | 241 | 1.28x slower |  |
| many-includes | devour | 11.52 | 26.65x slower |  |
| complex-relationships | kitsu | 46.55 | 1x |  |
| **complex-relationships** | **kitsu-native** | **46.68** | **<1.01x faster** |  |
| complex-relationships | fetchja | 38.55 | 1.21x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **300** | **1x** |  |
| wide-relationship | kitsu-native | 294 | 1.02x slower |  |
| wide-relationship | fetchja | 224 | 1.34x slower |  |
| wide-relationship | devour | 7.06 | 42.49x slower |  |
| self-cycle | kitsu | 59,046 | 1x |  |
| **self-cycle** | **kitsu-native** | **159,251** | **2.7x faster** |  |
| self-cycle | fetchja | 144,722 | 2.45x faster |  |
| self-cycle | devour | 47,289 | 1.25x slower |  |
| mutual-cycle | kitsu | 55,810 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **141,093** | **2.53x faster** |  |
| mutual-cycle | fetchja | 131,800 | 2.36x faster |  |
| mutual-cycle | devour | 44,777 | 1.25x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 62,452 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **339,350** | **5.43x faster** |  |
| small-no-relationships | fetchja | 320,347 | 5.13x faster |  |
| small-no-relationships | devour | 60,659 | 1.03x slower |  |
| small-links-only | kitsu | 63,729 | 1x |  |
| **small-links-only** | **kitsu-native** | **331,728** | **5.21x faster** |  |
| small-links-only | fetchja | 303,241 | 4.76x faster |  |
| small-links-only | devour | 58,594 | 1.09x slower |  |
| small-relationships | kitsu | 53,124 | 1x |  |
| **small-relationships** | **kitsu-native** | **238,008** | **4.48x faster** |  |
| small-relationships | fetchja | 227,266 | 4.28x faster |  |
| small-relationships | devour | 50,035 | 1.06x slower |  |
| nested-relationships | kitsu | 61,903 | 1x |  |
| **nested-relationships** | **kitsu-native** | **334,614** | **5.41x faster** |  |
| nested-relationships | fetchja | 268,064 | 4.33x faster |  |
| nested-relationships | devour | 53,125 | 1.17x slower |  |
| collection | kitsu | 25,161 | 1x |  |
| **collection** | **kitsu-native** | **43,761** | **1.74x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 16,411 | 1x |  |
| **collection-includes** | **kitsu-native** | **24,276** | **1.48x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 71,232 | 1x |  |
| **patch-single** | **kitsu-native** | **441,148** | **6.19x faster** |  |
| patch-single | fetchja | 373,826 | 5.25x faster |  |
| patch-single | devour | 64,368 | 1.11x slower |  |
| empty-relationships | kitsu | 56,591 | 1x |  |
| **empty-relationships** | **kitsu-native** | **284,281** | **5.02x faster** |  |
| empty-relationships | fetchja | 262,967 | 4.65x faster |  |
| empty-relationships | devour | 52,099 | 1.09x slower |  |
| **few-includes** | **kitsu** | **623** | **1x** |  |
| few-includes | kitsu-native | 623 | <1.01x slower |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 514 | 1x |  |
| **many-includes** | **kitsu-native** | **599** | **1.16x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 166 | 1x |  |
| **complex-relationships** | **kitsu-native** | **187** | **1.13x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 1,236 | 1x |  |
| **wide-relationship** | **kitsu-native** | **1,290** | **1.04x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 62,869 | 1x |  |
| **self-cycle** | **kitsu-native** | **319,601** | **5.08x faster** |  |
| self-cycle | fetchja | 274,627 | 4.37x faster |  |
| self-cycle | devour | 52,449 | 1.2x slower |  |
| mutual-cycle | kitsu | 58,953 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **298,371** | **5.06x faster** |  |
| mutual-cycle | fetchja | 262,832 | 4.46x faster |  |
| mutual-cycle | devour | 53,045 | 1.11x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 68,790 | 1x | 34,395 cycles/s |
| small-no-relationships | kitsu-native | 276,773 | 4.02x faster | 138,387 cycles/s |
| **small-no-relationships** | **fetchja** | **278,846** | **4.05x faster** | **139,423 cycles/s** |
| small-no-relationships | devour | 60,141 | 1.14x slower | 30,071 cycles/s |
| small-links-only | kitsu | 66,555 | 1x | 33,278 cycles/s |
| **small-links-only** | **kitsu-native** | **251,131** | **3.77x faster** | **125,566 cycles/s** |
| small-links-only | fetchja | 244,341 | 3.67x faster | 122,171 cycles/s |
| small-links-only | devour | 57,252 | 1.16x slower | 28,626 cycles/s |
| small-relationships | kitsu | 50,779 | 1x | 25,389 cycles/s |
| **small-relationships** | **kitsu-native** | **153,437** | **3.02x faster** | **76,719 cycles/s** |
| small-relationships | fetchja | 146,826 | 2.89x faster | 73,413 cycles/s |
| small-relationships | devour | 45,867 | 1.11x slower | 22,934 cycles/s |
| nested-relationships | kitsu | 58,426 | 1x | 29,213 cycles/s |
| **nested-relationships** | **kitsu-native** | **174,215** | **2.98x faster** | **87,107 cycles/s** |
| nested-relationships | fetchja | 167,927 | 2.87x faster | 83,964 cycles/s |
| nested-relationships | devour | 47,133 | 1.24x slower | 23,567 cycles/s |
| collection | kitsu | 22,778 | 1x | 11,389 cycles/s |
| **collection** | **kitsu-native** | **27,378** | **1.2x faster** | **13,689 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 17,631 | 1x | 8,815 cycles/s |
| **collection-includes** | **kitsu-native** | **21,873** | **1.24x faster** | **10,937 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 76,571 | 1x | 38,285 cycles/s |
| **patch-single** | **kitsu-native** | **352,889** | **4.61x faster** | **176,444 cycles/s** |
| patch-single | fetchja | 296,607 | 3.87x faster | 148,303 cycles/s |
| patch-single | devour | 63,402 | 1.21x slower | 31,701 cycles/s |
| empty-relationships | kitsu | 59,756 | 1x | 29,878 cycles/s |
| empty-relationships | kitsu-native | 218,598 | 3.66x faster | 109,299 cycles/s |
| **empty-relationships** | **fetchja** | **220,947** | **3.7x faster** | **110,474 cycles/s** |
| empty-relationships | devour | 53,227 | 1.12x slower | 26,613 cycles/s |
| **few-includes** | **kitsu** | **555** | **1x** | **277 cycles/s** |
| few-includes | kitsu-native | 552 | <1.01x slower | 276 cycles/s |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 346 | 1x | 173 cycles/s |
| **many-includes** | **kitsu-native** | **348** | **1.01x faster** | **174 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 64.9 | 1x | 32\.45 cycles/s |
| **complex-relationships** | **kitsu-native** | **68.64** | **1.06x faster** | **34\.32 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **451** | **1x** | **226 cycles/s** |
| wide-relationship | kitsu-native | 446 | 1.01x slower | 223 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 56,840 | 1x | 28,420 cycles/s |
| **self-cycle** | **kitsu-native** | **181,844** | **3.2x faster** | **90,922 cycles/s** |
| self-cycle | fetchja | 167,231 | 2.94x faster | 83,615 cycles/s |
| self-cycle | devour | 46,836 | 1.21x slower | 23,418 cycles/s |
| mutual-cycle | kitsu | 55,702 | 1x | 27,851 cycles/s |
| **mutual-cycle** | **kitsu-native** | **165,382** | **2.97x faster** | **82,691 cycles/s** |
| mutual-cycle | fetchja | 153,521 | 2.76x faster | 76,760 cycles/s |
| mutual-cycle | devour | 46,407 | 1.2x slower | 23,203 cycles/s |

</details>

### node v26\.5\.0

Base commit (local changes measured): `9728d544b7193c79cd29d02e242616821ea07b70`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `9539c00965e1889939d3830f2091babe327b30ebe741a163b9d1bdd3bdfe6141`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,259,306 | 1x |  |
| **small-no-relationships** | **devour** | **1,767,367** | **1.4x faster** |  |
| small-no-relationships | yayson | 792,347 | 1.59x slower |  |
| small-no-relationships | jsona | 1,679,799 | 1.33x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 958,339 | 1x |  |
| small-links-only | devour | 860,746 | 1.11x slower |  |
| small-links-only | yayson | 621,668 | 1.54x slower |  |
| **small-links-only** | **jsona** | **1,592,951** | **1.66x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 336,581 | 1x |  |
| small-relationships | devour | 248,658 | 1.35x slower |  |
| small-relationships | yayson | 189,968 | 1.77x slower |  |
| **small-relationships** | **jsona** | **373,585** | **1.11x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 419,712 | 1x |  |
| nested-relationships | devour | 285,135 | 1.47x slower |  |
| nested-relationships | yayson | 239,793 | 1.75x slower |  |
| **nested-relationships** | **jsona** | **422,038** | **1.01x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 80,688 | 1x |  |
| collection | devour | 64,461 | 1.25x slower |  |
| collection | yayson | 123,343 | 1.53x faster |  |
| **collection** | **jsona** | **305,381** | **3.78x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 62,563 | 1x |  |
| collection-includes | devour | 87,904 | 1.41x faster |  |
| collection-includes | yayson | 104,684 | 1.67x faster |  |
| **collection-includes** | **jsona** | **131,195** | **2.1x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 2,095,896 | 1x |  |
| **patch-single** | **devour** | **2,318,949** | **1.11x faster** |  |
| patch-single | yayson | 802,224 | 2.61x slower |  |
| patch-single | jsona | 2,144,000 | 1.02x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 1,035,517 | 1x |  |
| empty-relationships | devour | 582,445 | 1.78x slower |  |
| empty-relationships | yayson | 638,236 | 1.62x slower |  |
| **empty-relationships** | **jsona** | **1,327,877** | **1.28x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **709** | **1x** |  |
| few-includes | devour | 403 | 1.76x slower |  |
| few-includes | yayson | 471 | 1.5x slower |  |
| few-includes | jsona | 560 | 1.27x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **288** | **1x** |  |
| many-includes | devour | 4.06 | 70.98x slower |  |
| many-includes | yayson | 19.41 | 14.86x slower |  |
| many-includes | jsona | 214 | 1.35x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **40.16** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.53 | 75.6x slower |  |
| complex-relationships | jsona | 23.8 | 1.69x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **295** | **1x** |  |
| wide-relationship | devour | 2.95 | 99.94x slower |  |
| wide-relationship | yayson | 12.13 | 24.33x slower |  |
| wide-relationship | jsona | 186 | 1.59x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **351,381** | **1x** |  |
| self-cycle | devour | 231,987 | 1.51x slower |  |
| self-cycle | yayson | 216,265 | 1.62x slower |  |
| self-cycle | jsona | 349,654 | <1.01x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **289,824** | **1x** |  |
| mutual-cycle | devour | 182,593 | 1.59x slower |  |
| mutual-cycle | yayson | 176,087 | 1.65x slower |  |
| mutual-cycle | jsona | 279,286 | 1.04x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,674,638 | 1x |  |
| small-no-relationships | devour | 2,819,603 | 1.68x faster |  |
| small-no-relationships | yayson | 1,642,419 | 1.02x slower |  |
| **small-no-relationships** | **jsona** | **2,959,447** | **1.77x faster** |  |
| small-no-relationships | ts-japi | 710,866 | 2.36x slower |  |
| small-links-only | kitsu-core | 1,707,520 | 1x |  |
| small-links-only | devour | 1,353,010 | 1.26x slower |  |
| small-links-only | yayson | 1,355,843 | 1.26x slower |  |
| **small-links-only** | **jsona** | **3,135,113** | **1.84x faster** |  |
| small-links-only | ts-japi | 650,395 | 2.63x slower |  |
| small-relationships | kitsu-core | 886,324 | 1x |  |
| small-relationships | devour | 773,471 | 1.15x slower |  |
| small-relationships | yayson | 742,611 | 1.19x slower |  |
| **small-relationships** | **jsona** | **1,539,675** | **1.74x faster** |  |
| small-relationships | ts-japi | 448,841 | 1.97x slower |  |
| nested-relationships | kitsu-core | 1,505,181 | 1x |  |
| nested-relationships | devour | 957,815 | 1.57x slower |  |
| nested-relationships | yayson | 891,246 | 1.69x slower |  |
| **nested-relationships** | **jsona** | **1,997,116** | **1.33x faster** |  |
| nested-relationships | ts-japi | 508,063 | 2.96x slower |  |
| collection | kitsu-core | 187,288 | 1x |  |
| collection | devour | 76,033 | 2.46x slower |  |
| collection | yayson | 217,486 | 1.16x faster |  |
| **collection** | **jsona** | **813,508** | **4.34x faster** |  |
| collection | ts-japi | 242,771 | 1.3x faster |  |
| collection-includes | kitsu-core | 78,510 | 1x |  |
| collection-includes | devour | 167,004 | 2.13x faster |  |
| collection-includes | yayson | 259,376 | 3.3x faster |  |
| **collection-includes** | **jsona** | **388,305** | **4.95x faster** |  |
| collection-includes | ts-japi | 165,971 | 2.11x faster |  |
| patch-single | kitsu-core | 4,365,663 | 1x |  |
| **patch-single** | **devour** | **6,313,720** | **1.45x faster** |  |
| patch-single | yayson | 2,270,016 | 1.92x slower |  |
| patch-single | jsona | 5,063,426 | 1.16x faster |  |
| patch-single | ts-japi | 755,110 | 5.78x slower |  |
| empty-relationships | kitsu-core | 1,240,707 | 1x |  |
| empty-relationships | devour | 811,857 | 1.53x slower |  |
| empty-relationships | yayson | 867,244 | 1.43x slower |  |
| **empty-relationships** | **jsona** | **1,868,470** | **1.51x faster** |  |
| empty-relationships | ts-japi | 521,216 | 2.38x slower |  |
| few-includes | kitsu-core | 788 | 1x |  |
| few-includes | devour | 972 | 1.23x faster |  |
| few-includes | yayson | 812 | 1.03x faster |  |
| **few-includes** | **jsona** | **1,626** | **2.06x faster** |  |
| few-includes | ts-japi | 487 | 1.62x slower |  |
| many-includes | kitsu-core | 718 | 1x |  |
| many-includes | devour | 887 | 1.24x faster |  |
| many-includes | yayson | 839 | 1.17x faster |  |
| **many-includes** | **jsona** | **1,939** | **2.7x faster** |  |
| many-includes | ts-japi | 384 | 1.87x slower |  |
| complex-relationships | kitsu-core | 347 | 1x |  |
| **complex-relationships** | **devour** | **598** | **1.73x faster** |  |
| complex-relationships | yayson | 417 | 1.2x faster |  |
| complex-relationships | jsona | 431 | 1.24x faster |  |
| complex-relationships | ts-japi | 271 | 1.28x slower |  |
| wide-relationship | kitsu-core | 3,018 | 1x |  |
| wide-relationship | devour | 10,464 | 3.47x faster |  |
| wide-relationship | yayson | 7,895 | 2.62x faster |  |
| wide-relationship | jsona | 6,354 | 2.11x faster |  |
| **wide-relationship** | **ts-japi** | **13,360** | **4.43x faster** |  |
| self-cycle | kitsu-core | 1,571,554 | 1x |  |
| self-cycle | devour | 948,900 | 1.66x slower |  |
| self-cycle | yayson | 936,028 | 1.68x slower |  |
| **self-cycle** | **jsona** | **1,953,164** | **1.24x faster** |  |
| self-cycle | ts-japi | 505,954 | 3.11x slower |  |
| mutual-cycle | kitsu-core | 1,560,016 | 1x |  |
| mutual-cycle | devour | 961,299 | 1.62x slower |  |
| mutual-cycle | yayson | 857,114 | 1.82x slower |  |
| **mutual-cycle** | **jsona** | **2,106,610** | **1.35x faster** |  |
| mutual-cycle | ts-japi | 487,562 | 3.2x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 687,877 | 1x |  |
| **small-no-relationships** | **devour** | **1,005,831** | **1.46x faster** |  |
| small-no-relationships | yayson | 474,787 | 1.45x slower |  |
| small-no-relationships | jsona | 988,073 | 1.44x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 578,660 | 1x |  |
| small-links-only | devour | 465,731 | 1.24x slower |  |
| small-links-only | yayson | 393,086 | 1.47x slower |  |
| **small-links-only** | **jsona** | **923,795** | **1.6x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 224,357 | 1x |  |
| small-relationships | devour | 173,626 | 1.29x slower |  |
| small-relationships | yayson | 135,042 | 1.66x slower |  |
| **small-relationships** | **jsona** | **265,274** | **1.18x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 286,378 | 1x |  |
| nested-relationships | devour | 207,310 | 1.38x slower |  |
| nested-relationships | yayson | 171,379 | 1.67x slower |  |
| **nested-relationships** | **jsona** | **325,576** | **1.14x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 52,282 | 1x |  |
| collection | devour | 33,583 | 1.56x slower |  |
| collection | yayson | 76,503 | 1.46x faster |  |
| **collection** | **jsona** | **165,492** | **3.17x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 30,534 | 1x |  |
| collection-includes | devour | 50,941 | 1.67x faster |  |
| collection-includes | yayson | 63,101 | 2.07x faster |  |
| **collection-includes** | **jsona** | **81,561** | **2.67x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,360,064 | 1x |  |
| **patch-single** | **devour** | **1,526,853** | **1.12x faster** |  |
| patch-single | yayson | 552,990 | 2.46x slower |  |
| patch-single | jsona | 1,314,566 | 1.03x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 480,100 | 1x |  |
| empty-relationships | devour | 297,959 | 1.61x slower |  |
| empty-relationships | yayson | 307,554 | 1.56x slower |  |
| **empty-relationships** | **jsona** | **656,503** | **1.37x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 337 | 1x |  |
| few-includes | devour | 249 | 1.36x slower |  |
| few-includes | yayson | 271 | 1.25x slower |  |
| **few-includes** | **jsona** | **343** | **1.02x faster** |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **192** | **1x** |  |
| many-includes | devour | 4.01 | 47.87x slower |  |
| many-includes | yayson | 17.95 | 10.68x slower |  |
| many-includes | jsona | 163 | 1.18x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **34.96** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.52 | 66.62x slower |  |
| complex-relationships | jsona | 23.53 | 1.49x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **265** | **1x** |  |
| wide-relationship | devour | 2.96 | 89.76x slower |  |
| wide-relationship | yayson | 11.68 | 22.7x slower |  |
| wide-relationship | jsona | 176 | 1.51x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 274,122 | 1x |  |
| self-cycle | devour | 172,670 | 1.59x slower |  |
| self-cycle | yayson | 158,624 | 1.73x slower |  |
| **self-cycle** | **jsona** | **284,300** | **1.04x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **228,434** | **1x** |  |
| mutual-cycle | devour | 143,018 | 1.6x slower |  |
| mutual-cycle | yayson | 132,322 | 1.73x slower |  |
| mutual-cycle | jsona | 219,720 | 1.04x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 59,400 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **104,525** | **1.76x faster** |  |
| small-no-relationships | fetchja | 82,596 | 1.39x faster |  |
| small-no-relationships | devour | 52,206 | 1.14x slower |  |
| small-links-only | kitsu | 54,603 | 1x |  |
| **small-links-only** | **kitsu-native** | **87,725** | **1.61x faster** |  |
| small-links-only | fetchja | 78,652 | 1.44x faster |  |
| small-links-only | devour | 46,707 | 1.17x slower |  |
| small-relationships | kitsu | 41,868 | 1x |  |
| **small-relationships** | **kitsu-native** | **56,358** | **1.35x faster** |  |
| small-relationships | fetchja | 51,001 | 1.22x faster |  |
| small-relationships | devour | 34,210 | 1.22x slower |  |
| nested-relationships | kitsu | 44,739 | 1x |  |
| **nested-relationships** | **kitsu-native** | **65,235** | **1.46x faster** |  |
| nested-relationships | fetchja | 54,335 | 1.21x faster |  |
| nested-relationships | devour | 37,015 | 1.21x slower |  |
| **collection** | **kitsu** | **16,710** | **1x** |  |
| collection | kitsu-native | 13,433 | 1.24x slower |  |
| collection | fetchja | 14,451 | 1.16x slower |  |
| collection | devour | 15,158 | 1.1x slower |  |
| collection-includes | kitsu | 16,189 | 1x |  |
| collection-includes | kitsu-native | 13,484 | 1.2x slower |  |
| collection-includes | fetchja | 14,161 | 1.14x slower |  |
| **collection-includes** | **devour** | **17,531** | **1.08x faster** |  |
| patch-single | kitsu | 64,170 | 1x |  |
| **patch-single** | **kitsu-native** | **120,784** | **1.88x faster** |  |
| patch-single | fetchja | 96,144 | 1.5x faster |  |
| patch-single | devour | 55,386 | 1.16x slower |  |
| empty-relationships | kitsu | 56,476 | 1x |  |
| **empty-relationships** | **kitsu-native** | **90,766** | **1.61x faster** |  |
| empty-relationships | fetchja | 74,335 | 1.32x faster |  |
| empty-relationships | devour | 42,700 | 1.32x slower |  |
| **few-includes** | **kitsu** | **397** | **1x** |  |
| few-includes | kitsu-native | 374 | 1.06x slower |  |
| few-includes | fetchja | 317 | 1.25x slower |  |
| few-includes | devour | 264 | 1.51x slower |  |
| **many-includes** | **kitsu** | **168** | **1x** |  |
| many-includes | kitsu-native | 156 | 1.08x slower |  |
| many-includes | fetchja | 133 | 1.26x slower |  |
| many-includes | devour | 6.62 | 25.36x slower |  |
| **complex-relationships** | **kitsu** | **26.16** | **1x** |  |
| complex-relationships | kitsu-native | 24.69 | 1.06x slower |  |
| complex-relationships | fetchja | 18.56 | 1.41x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **166** | **1x** |  |
| wide-relationship | kitsu-native | 156 | 1.06x slower |  |
| wide-relationship | fetchja | 126 | 1.32x slower |  |
| wide-relationship | devour | 3.54 | 46.82x slower |  |
| self-cycle | kitsu | 43,098 | 1x |  |
| **self-cycle** | **kitsu-native** | **62,772** | **1.46x faster** |  |
| self-cycle | fetchja | 51,986 | 1.21x faster |  |
| self-cycle | devour | 33,308 | 1.29x slower |  |
| mutual-cycle | kitsu | 40,045 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **56,253** | **1.4x faster** |  |
| mutual-cycle | fetchja | 49,160 | 1.23x faster |  |
| mutual-cycle | devour | 31,040 | 1.29x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 51,646 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **277,528** | **5.37x faster** |  |
| small-no-relationships | fetchja | 195,813 | 3.79x faster |  |
| small-no-relationships | devour | 48,778 | 1.06x slower |  |
| small-links-only | kitsu | 51,337 | 1x |  |
| **small-links-only** | **kitsu-native** | **268,203** | **5.22x faster** |  |
| small-links-only | fetchja | 186,947 | 3.64x faster |  |
| small-links-only | devour | 45,049 | 1.14x slower |  |
| small-relationships | kitsu | 42,919 | 1x |  |
| **small-relationships** | **kitsu-native** | **169,902** | **3.96x faster** |  |
| small-relationships | fetchja | 134,875 | 3.14x faster |  |
| small-relationships | devour | 38,507 | 1.11x slower |  |
| nested-relationships | kitsu | 48,370 | 1x |  |
| **nested-relationships** | **kitsu-native** | **232,482** | **4.81x faster** |  |
| nested-relationships | fetchja | 170,834 | 3.53x faster |  |
| nested-relationships | devour | 43,971 | 1.1x slower |  |
| collection | kitsu | 22,297 | 1x |  |
| **collection** | **kitsu-native** | **37,256** | **1.67x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 13,431 | 1x |  |
| **collection-includes** | **kitsu-native** | **19,163** | **1.43x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 59,722 | 1x |  |
| **patch-single** | **kitsu-native** | **366,833** | **6.14x faster** |  |
| patch-single | fetchja | 230,610 | 3.86x faster |  |
| patch-single | devour | 54,302 | 1.1x slower |  |
| empty-relationships | kitsu | 46,972 | 1x |  |
| **empty-relationships** | **kitsu-native** | **223,380** | **4.76x faster** |  |
| empty-relationships | fetchja | 168,008 | 3.58x faster |  |
| empty-relationships | devour | 43,446 | 1.08x slower |  |
| few-includes | kitsu | 313 | 1x |  |
| **few-includes** | **kitsu-native** | **332** | **1.06x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **327** | **1x** |  |
| many-includes | kitsu-native | 317 | 1.03x slower |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 119 | 1x |  |
| **complex-relationships** | **kitsu-native** | **123** | **1.04x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 902 | 1x |  |
| **wide-relationship** | **kitsu-native** | **986** | **1.09x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 47,846 | 1x |  |
| **self-cycle** | **kitsu-native** | **230,185** | **4.81x faster** |  |
| self-cycle | fetchja | 173,619 | 3.63x faster |  |
| self-cycle | devour | 42,923 | 1.11x slower |  |
| mutual-cycle | kitsu | 49,167 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **217,862** | **4.43x faster** |  |
| mutual-cycle | fetchja | 163,985 | 3.34x faster |  |
| mutual-cycle | devour | 43,864 | 1.12x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 54,280 | 1x | 27,140 cycles/s |
| **small-no-relationships** | **kitsu-native** | **130,725** | **2.41x faster** | **65,362 cycles/s** |
| small-no-relationships | fetchja | 101,611 | 1.87x faster | 50,805 cycles/s |
| small-no-relationships | devour | 49,198 | 1.1x slower | 24,599 cycles/s |
| small-links-only | kitsu | 52,619 | 1x | 26,309 cycles/s |
| **small-links-only** | **kitsu-native** | **120,725** | **2.29x faster** | **60,363 cycles/s** |
| small-links-only | fetchja | 99,837 | 1.9x faster | 49,919 cycles/s |
| small-links-only | devour | 46,269 | 1.14x slower | 23,134 cycles/s |
| small-relationships | kitsu | 41,239 | 1x | 20,620 cycles/s |
| **small-relationships** | **kitsu-native** | **68,555** | **1.66x faster** | **34,278 cycles/s** |
| small-relationships | fetchja | 61,948 | 1.5x faster | 30,974 cycles/s |
| small-relationships | devour | 34,082 | 1.21x slower | 17,041 cycles/s |
| nested-relationships | kitsu | 45,579 | 1x | 22,790 cycles/s |
| **nested-relationships** | **kitsu-native** | **89,663** | **1.97x faster** | **44,831 cycles/s** |
| nested-relationships | fetchja | 76,476 | 1.68x faster | 38,238 cycles/s |
| nested-relationships | devour | 38,983 | 1.17x slower | 19,492 cycles/s |
| collection | kitsu | 18,536 | 1x | 9,268 cycles/s |
| **collection** | **kitsu-native** | **18,609** | **<1.01x faster** | **9,305 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| **collection-includes** | **kitsu** | **14,459** | **1x** | **7,229 cycles/s** |
| collection-includes | kitsu-native | 14,366 | 1.01x slower | 7,183 cycles/s |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 60,582 | 1x | 30,291 cycles/s |
| **patch-single** | **kitsu-native** | **172,797** | **2.85x faster** | **86,399 cycles/s** |
| patch-single | fetchja | 125,678 | 2.07x faster | 62,839 cycles/s |
| patch-single | devour | 54,479 | 1.11x slower | 27,240 cycles/s |
| empty-relationships | kitsu | 50,308 | 1x | 25,154 cycles/s |
| **empty-relationships** | **kitsu-native** | **112,827** | **2.24x faster** | **56,413 cycles/s** |
| empty-relationships | fetchja | 92,167 | 1.83x faster | 46,084 cycles/s |
| empty-relationships | devour | 42,149 | 1.19x slower | 21,075 cycles/s |
| few-includes | kitsu | 336 | 1x | 168 cycles/s |
| **few-includes** | **kitsu-native** | **345** | **1.03x faster** | **173 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **211** | **1x** | **105 cycles/s** |
| many-includes | kitsu-native | 196 | 1.08x slower | 97\.92 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **40.92** | **1x** | **20\.46 cycles/s** |
| complex-relationships | kitsu-native | 37.18 | 1.1x slower | 18\.59 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **277** | **1x** | **138 cycles/s** |
| wide-relationship | kitsu-native | 266 | 1.04x slower | 133 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 43,183 | 1x | 21,592 cycles/s |
| **self-cycle** | **kitsu-native** | **83,891** | **1.94x faster** | **41,946 cycles/s** |
| self-cycle | fetchja | 70,672 | 1.64x faster | 35,336 cycles/s |
| self-cycle | devour | 36,419 | 1.19x slower | 18,210 cycles/s |
| mutual-cycle | kitsu | 42,506 | 1x | 21,253 cycles/s |
| **mutual-cycle** | **kitsu-native** | **75,488** | **1.78x faster** | **37,744 cycles/s** |
| mutual-cycle | fetchja | 64,109 | 1.51x faster | 32,055 cycles/s |
| mutual-cycle | devour | 34,628 | 1.23x slower | 17,314 cycles/s |

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
