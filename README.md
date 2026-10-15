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

Built package fingerprint: `876ecb7f65f6458401824b84282e9f11628074ef8d3f72ad710a333dba877e5c`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,331,413 | 1x |  |
| **small-no-relationships** | **devour** | **1,709,670** | **1.28x faster** |  |
| small-no-relationships | yayson | 994,044 | 1.34x slower |  |
| small-no-relationships | jsona | 1,502,384 | 1.13x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 989,813 | 1x |  |
| small-links-only | devour | 1,122,760 | 1.13x faster |  |
| small-links-only | yayson | 666,343 | 1.49x slower |  |
| **small-links-only** | **jsona** | **1,258,760** | **1.27x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| **small-relationships** | **kitsu-core** | **388,687** | **1x** |  |
| small-relationships | devour | 339,925 | 1.14x slower |  |
| small-relationships | yayson | 246,855 | 1.57x slower |  |
| small-relationships | jsona | 346,546 | 1.12x slower |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **540,355** | **1x** |  |
| nested-relationships | devour | 399,342 | 1.35x slower |  |
| nested-relationships | yayson | 319,532 | 1.69x slower |  |
| nested-relationships | jsona | 399,071 | 1.35x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 91,623 | 1x |  |
| collection | devour | 119,309 | 1.3x faster |  |
| collection | yayson | 90,866 | 1.01x slower |  |
| **collection** | **jsona** | **277,205** | **3.03x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 69,291 | 1x |  |
| collection-includes | devour | 144,205 | 2.08x faster |  |
| collection-includes | yayson | 121,958 | 1.76x faster |  |
| **collection-includes** | **jsona** | **161,579** | **2.33x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **2,452,952** | **1x** |  |
| patch-single | devour | 1,977,204 | 1.24x slower |  |
| patch-single | yayson | 999,256 | 2.45x slower |  |
| patch-single | jsona | 1,542,941 | 1.59x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 889,369 | 1x |  |
| empty-relationships | devour | 791,273 | 1.12x slower |  |
| empty-relationships | yayson | 784,772 | 1.13x slower |  |
| **empty-relationships** | **jsona** | **1,107,347** | **1.25x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **1,042** | **1x** |  |
| few-includes | devour | 597 | 1.74x slower |  |
| few-includes | yayson | 789 | 1.32x slower |  |
| few-includes | jsona | 637 | 1.63x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **549** | **1x** |  |
| many-includes | devour | 8.68 | 63.23x slower |  |
| many-includes | yayson | 42.36 | 12.95x slower |  |
| many-includes | jsona | 227 | 2.42x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **81.68** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.99 | 82.84x slower |  |
| complex-relationships | jsona | 31.96 | 2.56x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **565** | **1x** |  |
| wide-relationship | devour | 5.56 | 102x slower |  |
| wide-relationship | yayson | 24.06 | 23.49x slower |  |
| wide-relationship | jsona | 192 | 2.95x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **452,916** | **1x** |  |
| self-cycle | devour | 325,728 | 1.39x slower |  |
| self-cycle | yayson | 298,210 | 1.52x slower |  |
| self-cycle | jsona | 350,748 | 1.29x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **401,946** | **1x** |  |
| mutual-cycle | devour | 267,939 | 1.5x slower |  |
| mutual-cycle | yayson | 248,891 | 1.61x slower |  |
| mutual-cycle | jsona | 272,637 | 1.47x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 2,161,467 | 1x |  |
| **small-no-relationships** | **devour** | **4,078,540** | **1.89x faster** |  |
| small-no-relationships | yayson | 2,051,678 | 1.05x slower |  |
| small-no-relationships | jsona | 2,683,974 | 1.24x faster |  |
| small-no-relationships | ts-japi | 762,001 | 2.84x slower |  |
| small-links-only | kitsu-core | 2,053,931 | 1x |  |
| small-links-only | devour | 2,390,560 | 1.16x faster |  |
| small-links-only | yayson | 1,628,449 | 1.26x slower |  |
| **small-links-only** | **jsona** | **2,617,061** | **1.27x faster** |  |
| small-links-only | ts-japi | 926,255 | 2.22x slower |  |
| small-relationships | kitsu-core | 1,225,500 | 1x |  |
| **small-relationships** | **devour** | **1,444,607** | **1.18x faster** |  |
| small-relationships | yayson | 1,095,830 | 1.12x slower |  |
| small-relationships | jsona | 1,153,883 | 1.06x slower |  |
| small-relationships | ts-japi | 464,329 | 2.64x slower |  |
| **nested-relationships** | **kitsu-core** | **1,943,594** | **1x** |  |
| nested-relationships | devour | 1,710,003 | 1.14x slower |  |
| nested-relationships | yayson | 1,053,114 | 1.85x slower |  |
| nested-relationships | jsona | 1,217,554 | 1.6x slower |  |
| nested-relationships | ts-japi | 481,536 | 4.04x slower |  |
| collection | kitsu-core | 172,321 | 1x |  |
| collection | devour | 185,670 | 1.08x faster |  |
| collection | yayson | 250,665 | 1.45x faster |  |
| **collection** | **jsona** | **599,175** | **3.48x faster** |  |
| collection | ts-japi | 321,451 | 1.87x faster |  |
| collection-includes | kitsu-core | 86,412 | 1x |  |
| collection-includes | devour | 280,828 | 3.25x faster |  |
| collection-includes | yayson | 317,133 | 3.67x faster |  |
| **collection-includes** | **jsona** | **360,183** | **4.17x faster** |  |
| collection-includes | ts-japi | 206,121 | 2.39x faster |  |
| patch-single | kitsu-core | 6,663,920 | 1x |  |
| **patch-single** | **devour** | **6,701,153** | **1.01x faster** |  |
| patch-single | yayson | 2,095,783 | 3.18x slower |  |
| patch-single | jsona | 3,037,892 | 2.19x slower |  |
| patch-single | ts-japi | 964,835 | 6.91x slower |  |
| empty-relationships | kitsu-core | 1,473,380 | 1x |  |
| **empty-relationships** | **devour** | **1,681,172** | **1.14x faster** |  |
| empty-relationships | yayson | 1,147,896 | 1.28x slower |  |
| empty-relationships | jsona | 1,389,120 | 1.06x slower |  |
| empty-relationships | ts-japi | 520,993 | 2.83x slower |  |
| few-includes | kitsu-core | 1,279 | 1x |  |
| **few-includes** | **devour** | **1,907** | **1.49x faster** |  |
| few-includes | yayson | 1,304 | 1.02x faster |  |
| few-includes | jsona | 1,262 | 1.01x slower |  |
| few-includes | ts-japi | 735 | 1.74x slower |  |
| many-includes | kitsu-core | 1,327 | 1x |  |
| **many-includes** | **devour** | **1,982** | **1.49x faster** |  |
| many-includes | yayson | 1,350 | 1.02x faster |  |
| many-includes | jsona | 1,390 | 1.05x faster |  |
| many-includes | ts-japi | 697 | 1.9x slower |  |
| complex-relationships | kitsu-core | 732 | 1x |  |
| **complex-relationships** | **devour** | **1,367** | **1.87x faster** |  |
| complex-relationships | yayson | 1,059 | 1.45x faster |  |
| complex-relationships | jsona | 623 | 1.18x slower |  |
| complex-relationships | ts-japi | 619 | 1.18x slower |  |
| wide-relationship | kitsu-core | 7,168 | 1x |  |
| wide-relationship | devour | 18,046 | 2.52x faster |  |
| **wide-relationship** | **yayson** | **21,299** | **2.97x faster** |  |
| wide-relationship | jsona | 6,001 | 1.19x slower |  |
| wide-relationship | ts-japi | 9,709 | 1.35x faster |  |
| **self-cycle** | **kitsu-core** | **2,121,638** | **1x** |  |
| self-cycle | devour | 1,873,172 | 1.13x slower |  |
| self-cycle | yayson | 1,175,958 | 1.8x slower |  |
| self-cycle | jsona | 1,310,450 | 1.62x slower |  |
| self-cycle | ts-japi | 501,361 | 4.23x slower |  |
| **mutual-cycle** | **kitsu-core** | **1,898,192** | **1x** |  |
| mutual-cycle | devour | 1,653,509 | 1.15x slower |  |
| mutual-cycle | yayson | 1,005,934 | 1.89x slower |  |
| mutual-cycle | jsona | 923,523 | 2.06x slower |  |
| mutual-cycle | ts-japi | 475,510 | 3.99x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 697,992 | 1x |  |
| **small-no-relationships** | **devour** | **965,614** | **1.38x faster** |  |
| small-no-relationships | yayson | 619,366 | 1.13x slower |  |
| small-no-relationships | jsona | 792,839 | 1.14x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 528,809 | 1x |  |
| small-links-only | devour | 612,065 | 1.16x faster |  |
| small-links-only | yayson | 418,858 | 1.26x slower |  |
| **small-links-only** | **jsona** | **649,296** | **1.23x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 239,197 | 1x |  |
| **small-relationships** | **devour** | **246,547** | **1.03x faster** |  |
| small-relationships | yayson | 171,507 | 1.39x slower |  |
| small-relationships | jsona | 227,908 | 1.05x slower |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **311,754** | **1x** |  |
| nested-relationships | devour | 273,635 | 1.14x slower |  |
| nested-relationships | yayson | 221,193 | 1.41x slower |  |
| nested-relationships | jsona | 257,599 | 1.21x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 51,739 | 1x |  |
| collection | devour | 57,704 | 1.12x faster |  |
| collection | yayson | 57,506 | 1.11x faster |  |
| **collection** | **jsona** | **136,337** | **2.64x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 36,798 | 1x |  |
| collection-includes | devour | 82,009 | 2.23x faster |  |
| collection-includes | yayson | 84,131 | 2.29x faster |  |
| **collection-includes** | **jsona** | **95,721** | **2.6x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **1,171,035** | **1x** |  |
| patch-single | devour | 954,654 | 1.23x slower |  |
| patch-single | yayson | 639,316 | 1.83x slower |  |
| patch-single | jsona | 815,543 | 1.44x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 434,672 | 1x |  |
| empty-relationships | devour | 386,284 | 1.13x slower |  |
| empty-relationships | yayson | 372,973 | 1.17x slower |  |
| **empty-relationships** | **jsona** | **477,550** | **1.1x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **433** | **1x** |  |
| few-includes | devour | 386 | 1.12x slower |  |
| few-includes | yayson | 324 | 1.33x slower |  |
| few-includes | jsona | 343 | 1.26x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **312** | **1x** |  |
| many-includes | devour | 8.06 | 38.68x slower |  |
| many-includes | yayson | 39.69 | 7.85x slower |  |
| many-includes | jsona | 166 | 1.88x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **60.82** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 1.01 | 60.3x slower |  |
| complex-relationships | jsona | 27.82 | 2.19x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **434** | **1x** |  |
| wide-relationship | devour | 5.55 | 78.31x slower |  |
| wide-relationship | yayson | 23.82 | 18.23x slower |  |
| wide-relationship | jsona | 168 | 2.58x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **298,374** | **1x** |  |
| self-cycle | devour | 244,896 | 1.22x slower |  |
| self-cycle | yayson | 210,571 | 1.42x slower |  |
| self-cycle | jsona | 232,246 | 1.28x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **266,044** | **1x** |  |
| mutual-cycle | devour | 213,654 | 1.25x slower |  |
| mutual-cycle | yayson | 177,786 | 1.5x slower |  |
| mutual-cycle | jsona | 197,806 | 1.34x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 69,915 | 1x |  |
| small-no-relationships | kitsu-native | 266,240 | 3.81x faster |  |
| **small-no-relationships** | **fetchja** | **270,847** | **3.87x faster** |  |
| small-no-relationships | devour | 65,548 | 1.07x slower |  |
| small-links-only | kitsu | 68,395 | 1x |  |
| small-links-only | kitsu-native | 227,560 | 3.33x faster |  |
| **small-links-only** | **fetchja** | **238,318** | **3.48x faster** |  |
| small-links-only | devour | 63,155 | 1.08x slower |  |
| small-relationships | kitsu | 54,629 | 1x |  |
| **small-relationships** | **kitsu-native** | **136,210** | **2.49x faster** |  |
| small-relationships | fetchja | 133,220 | 2.44x faster |  |
| small-relationships | devour | 47,804 | 1.14x slower |  |
| nested-relationships | kitsu | 61,855 | 1x |  |
| **nested-relationships** | **kitsu-native** | **165,083** | **2.67x faster** |  |
| nested-relationships | fetchja | 150,536 | 2.43x faster |  |
| nested-relationships | devour | 49,538 | 1.25x slower |  |
| collection | kitsu | 20,980 | 1x |  |
| collection | kitsu-native | 22,944 | 1.09x faster |  |
| **collection** | **fetchja** | **38,952** | **1.86x faster** |  |
| collection | devour | 22,107 | 1.05x faster |  |
| collection-includes | kitsu | 20,413 | 1x |  |
| collection-includes | kitsu-native | 23,008 | 1.13x faster |  |
| **collection-includes** | **fetchja** | **36,571** | **1.79x faster** |  |
| collection-includes | devour | 24,320 | 1.19x faster |  |
| patch-single | kitsu | 78,736 | 1x |  |
| **patch-single** | **kitsu-native** | **334,212** | **4.24x faster** |  |
| patch-single | fetchja | 290,905 | 3.69x faster |  |
| patch-single | devour | 66,375 | 1.19x slower |  |
| empty-relationships | kitsu | 69,539 | 1x |  |
| empty-relationships | kitsu-native | 222,219 | 3.2x faster |  |
| **empty-relationships** | **fetchja** | **225,881** | **3.25x faster** |  |
| empty-relationships | devour | 60,017 | 1.16x slower |  |
| **few-includes** | **kitsu** | **679** | **1x** |  |
| few-includes | kitsu-native | 651 | 1.04x slower |  |
| few-includes | fetchja | 604 | 1.12x slower |  |
| few-includes | devour | 437 | 1.55x slower |  |
| many-includes | kitsu | 283 | 1x |  |
| **many-includes** | **kitsu-native** | **286** | **1.01x faster** |  |
| many-includes | fetchja | 241 | 1.17x slower |  |
| many-includes | devour | 10.87 | 26.05x slower |  |
| **complex-relationships** | **kitsu** | **45.36** | **1x** |  |
| complex-relationships | kitsu-native | 42.32 | 1.07x slower |  |
| complex-relationships | fetchja | 37.11 | 1.22x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **296** | **1x** |  |
| wide-relationship | kitsu-native | 288 | 1.03x slower |  |
| wide-relationship | fetchja | 220 | 1.34x slower |  |
| wide-relationship | devour | 6.98 | 42.33x slower |  |
| self-cycle | kitsu | 57,642 | 1x |  |
| **self-cycle** | **kitsu-native** | **158,938** | **2.76x faster** |  |
| self-cycle | fetchja | 134,206 | 2.33x faster |  |
| self-cycle | devour | 46,732 | 1.23x slower |  |
| mutual-cycle | kitsu | 54,771 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **140,269** | **2.56x faster** |  |
| mutual-cycle | fetchja | 126,744 | 2.31x faster |  |
| mutual-cycle | devour | 46,683 | 1.17x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 63,462 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **346,523** | **5.46x faster** |  |
| small-no-relationships | fetchja | 295,892 | 4.66x faster |  |
| small-no-relationships | devour | 58,635 | 1.08x slower |  |
| small-links-only | kitsu | 65,828 | 1x |  |
| **small-links-only** | **kitsu-native** | **319,182** | **4.85x faster** |  |
| small-links-only | fetchja | 292,509 | 4.44x faster |  |
| small-links-only | devour | 56,323 | 1.17x slower |  |
| small-relationships | kitsu | 54,037 | 1x |  |
| **small-relationships** | **kitsu-native** | **244,017** | **4.52x faster** |  |
| small-relationships | fetchja | 227,041 | 4.2x faster |  |
| small-relationships | devour | 47,574 | 1.14x slower |  |
| nested-relationships | kitsu | 59,970 | 1x |  |
| **nested-relationships** | **kitsu-native** | **314,142** | **5.24x faster** |  |
| nested-relationships | fetchja | 250,080 | 4.17x faster |  |
| nested-relationships | devour | 52,906 | 1.13x slower |  |
| collection | kitsu | 25,959 | 1x |  |
| **collection** | **kitsu-native** | **45,352** | **1.75x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 16,357 | 1x |  |
| **collection-includes** | **kitsu-native** | **23,140** | **1.41x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 73,557 | 1x |  |
| **patch-single** | **kitsu-native** | **427,881** | **5.82x faster** |  |
| patch-single | fetchja | 360,106 | 4.9x faster |  |
| patch-single | devour | 61,929 | 1.19x slower |  |
| empty-relationships | kitsu | 55,357 | 1x |  |
| **empty-relationships** | **kitsu-native** | **271,131** | **4.9x faster** |  |
| empty-relationships | fetchja | 263,856 | 4.77x faster |  |
| empty-relationships | devour | 50,767 | 1.09x slower |  |
| few-includes | kitsu | 644 | 1x |  |
| **few-includes** | **kitsu-native** | **655** | **1.02x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 477 | 1x |  |
| **many-includes** | **kitsu-native** | **554** | **1.16x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 160 | 1x |  |
| **complex-relationships** | **kitsu-native** | **189** | **1.18x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 1,028 | 1x |  |
| **wide-relationship** | **kitsu-native** | **1,354** | **1.32x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 60,767 | 1x |  |
| **self-cycle** | **kitsu-native** | **329,559** | **5.42x faster** |  |
| self-cycle | fetchja | 258,552 | 4.25x faster |  |
| self-cycle | devour | 53,588 | 1.13x slower |  |
| mutual-cycle | kitsu | 60,031 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **310,942** | **5.18x faster** |  |
| mutual-cycle | fetchja | 258,261 | 4.3x faster |  |
| mutual-cycle | devour | 47,173 | 1.27x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 67,508 | 1x | 33,754 cycles/s |
| small-no-relationships | kitsu-native | 269,069 | 3.99x faster | 134,534 cycles/s |
| **small-no-relationships** | **fetchja** | **270,044** | **4x faster** | **135,022 cycles/s** |
| small-no-relationships | devour | 58,882 | 1.15x slower | 29,441 cycles/s |
| small-links-only | kitsu | 60,710 | 1x | 30,355 cycles/s |
| **small-links-only** | **kitsu-native** | **246,969** | **4.07x faster** | **123,485 cycles/s** |
| small-links-only | fetchja | 245,110 | 4.04x faster | 122,555 cycles/s |
| small-links-only | devour | 56,715 | 1.07x slower | 28,358 cycles/s |
| small-relationships | kitsu | 48,604 | 1x | 24,302 cycles/s |
| small-relationships | kitsu-native | 140,126 | 2.88x faster | 70,063 cycles/s |
| **small-relationships** | **fetchja** | **146,172** | **3.01x faster** | **73,086 cycles/s** |
| small-relationships | devour | 45,092 | 1.08x slower | 22,546 cycles/s |
| nested-relationships | kitsu | 58,103 | 1x | 29,052 cycles/s |
| **nested-relationships** | **kitsu-native** | **190,017** | **3.27x faster** | **95,009 cycles/s** |
| nested-relationships | fetchja | 164,067 | 2.82x faster | 82,034 cycles/s |
| nested-relationships | devour | 48,459 | 1.2x slower | 24,229 cycles/s |
| collection | kitsu | 22,586 | 1x | 11,293 cycles/s |
| **collection** | **kitsu-native** | **26,407** | **1.17x faster** | **13,203 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 18,241 | 1x | 9,120 cycles/s |
| **collection-includes** | **kitsu-native** | **21,455** | **1.18x faster** | **10,728 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 75,129 | 1x | 37,564 cycles/s |
| **patch-single** | **kitsu-native** | **347,918** | **4.63x faster** | **173,959 cycles/s** |
| patch-single | fetchja | 292,363 | 3.89x faster | 146,182 cycles/s |
| patch-single | devour | 64,353 | 1.17x slower | 32,176 cycles/s |
| empty-relationships | kitsu | 61,302 | 1x | 30,651 cycles/s |
| **empty-relationships** | **kitsu-native** | **214,602** | **3.5x faster** | **107,301 cycles/s** |
| empty-relationships | fetchja | 210,310 | 3.43x faster | 105,155 cycles/s |
| empty-relationships | devour | 52,792 | 1.16x slower | 26,396 cycles/s |
| few-includes | kitsu | 554 | 1x | 277 cycles/s |
| **few-includes** | **kitsu-native** | **557** | **<1.01x faster** | **278 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 347 | 1x | 173 cycles/s |
| **many-includes** | **kitsu-native** | **358** | **1.03x faster** | **179 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **68.28** | **1x** | **34\.14 cycles/s** |
| complex-relationships | kitsu-native | 68.16 | <1.01x slower | 34\.08 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **453** | **1x** | **226 cycles/s** |
| wide-relationship | kitsu-native | 436 | 1.04x slower | 218 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 55,379 | 1x | 27,690 cycles/s |
| **self-cycle** | **kitsu-native** | **177,636** | **3.21x faster** | **88,818 cycles/s** |
| self-cycle | fetchja | 162,390 | 2.93x faster | 81,195 cycles/s |
| self-cycle | devour | 47,285 | 1.17x slower | 23,643 cycles/s |
| mutual-cycle | kitsu | 55,242 | 1x | 27,621 cycles/s |
| **mutual-cycle** | **kitsu-native** | **162,698** | **2.95x faster** | **81,349 cycles/s** |
| mutual-cycle | fetchja | 151,683 | 2.75x faster | 75,842 cycles/s |
| mutual-cycle | devour | 46,985 | 1.18x slower | 23,493 cycles/s |

</details>

### node v26\.5\.0

Base commit (local changes measured): `9728d544b7193c79cd29d02e242616821ea07b70`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `876ecb7f65f6458401824b84282e9f11628074ef8d3f72ad710a333dba877e5c`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,188,049 | 1x |  |
| **small-no-relationships** | **devour** | **1,661,285** | **1.4x faster** |  |
| small-no-relationships | yayson | 769,177 | 1.54x slower |  |
| small-no-relationships | jsona | 1,605,589 | 1.35x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 899,945 | 1x |  |
| small-links-only | devour | 805,093 | 1.12x slower |  |
| small-links-only | yayson | 586,703 | 1.53x slower |  |
| **small-links-only** | **jsona** | **1,487,042** | **1.65x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 315,133 | 1x |  |
| small-relationships | devour | 240,819 | 1.31x slower |  |
| small-relationships | yayson | 191,943 | 1.64x slower |  |
| **small-relationships** | **jsona** | **369,416** | **1.17x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 386,468 | 1x |  |
| nested-relationships | devour | 282,048 | 1.37x slower |  |
| nested-relationships | yayson | 237,315 | 1.63x slower |  |
| **nested-relationships** | **jsona** | **410,270** | **1.06x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 84,335 | 1x |  |
| collection | devour | 66,350 | 1.27x slower |  |
| collection | yayson | 123,701 | 1.47x faster |  |
| **collection** | **jsona** | **317,876** | **3.77x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 62,334 | 1x |  |
| collection-includes | devour | 88,254 | 1.42x faster |  |
| collection-includes | yayson | 106,345 | 1.71x faster |  |
| **collection-includes** | **jsona** | **129,197** | **2.07x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 2,007,201 | 1x |  |
| **patch-single** | **devour** | **2,232,467** | **1.11x faster** |  |
| patch-single | yayson | 813,682 | 2.47x slower |  |
| patch-single | jsona | 2,157,630 | 1.07x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 997,739 | 1x |  |
| empty-relationships | devour | 584,981 | 1.71x slower |  |
| empty-relationships | yayson | 645,313 | 1.55x slower |  |
| **empty-relationships** | **jsona** | **1,295,320** | **1.3x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **680** | **1x** |  |
| few-includes | devour | 406 | 1.68x slower |  |
| few-includes | yayson | 465 | 1.46x slower |  |
| few-includes | jsona | 638 | 1.07x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **293** | **1x** |  |
| many-includes | devour | 4.51 | 64.85x slower |  |
| many-includes | yayson | 19.77 | 14.81x slower |  |
| many-includes | jsona | 218 | 1.35x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **41.61** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.54 | 77.21x slower |  |
| complex-relationships | jsona | 24.81 | 1.68x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **276** | **1x** |  |
| wide-relationship | devour | 2.94 | 94.08x slower |  |
| wide-relationship | yayson | 12.07 | 22.91x slower |  |
| wide-relationship | jsona | 181 | 1.53x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **358,523** | **1x** |  |
| self-cycle | devour | 229,518 | 1.56x slower |  |
| self-cycle | yayson | 217,799 | 1.65x slower |  |
| self-cycle | jsona | 350,311 | 1.02x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **306,283** | **1x** |  |
| mutual-cycle | devour | 183,339 | 1.67x slower |  |
| mutual-cycle | yayson | 175,379 | 1.75x slower |  |
| mutual-cycle | jsona | 280,859 | 1.09x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,483,988 | 1x |  |
| **small-no-relationships** | **devour** | **3,142,978** | **2.12x faster** |  |
| small-no-relationships | yayson | 1,628,023 | 1.1x faster |  |
| small-no-relationships | jsona | 2,815,508 | 1.9x faster |  |
| small-no-relationships | ts-japi | 618,702 | 2.4x slower |  |
| small-links-only | kitsu-core | 1,573,207 | 1x |  |
| small-links-only | devour | 1,213,995 | 1.3x slower |  |
| small-links-only | yayson | 1,281,764 | 1.23x slower |  |
| **small-links-only** | **jsona** | **2,977,029** | **1.89x faster** |  |
| small-links-only | ts-japi | 661,725 | 2.38x slower |  |
| small-relationships | kitsu-core | 834,324 | 1x |  |
| small-relationships | devour | 723,880 | 1.15x slower |  |
| small-relationships | yayson | 728,373 | 1.15x slower |  |
| **small-relationships** | **jsona** | **1,618,086** | **1.94x faster** |  |
| small-relationships | ts-japi | 439,915 | 1.9x slower |  |
| nested-relationships | kitsu-core | 1,485,784 | 1x |  |
| nested-relationships | devour | 929,217 | 1.6x slower |  |
| nested-relationships | yayson | 849,273 | 1.75x slower |  |
| **nested-relationships** | **jsona** | **1,920,115** | **1.29x faster** |  |
| nested-relationships | ts-japi | 506,880 | 2.93x slower |  |
| collection | kitsu-core | 193,454 | 1x |  |
| collection | devour | 74,815 | 2.59x slower |  |
| collection | yayson | 228,191 | 1.18x faster |  |
| **collection** | **jsona** | **797,496** | **4.12x faster** |  |
| collection | ts-japi | 253,169 | 1.31x faster |  |
| collection-includes | kitsu-core | 78,873 | 1x |  |
| collection-includes | devour | 166,884 | 2.12x faster |  |
| collection-includes | yayson | 255,822 | 3.24x faster |  |
| **collection-includes** | **jsona** | **393,485** | **4.99x faster** |  |
| collection-includes | ts-japi | 161,169 | 2.04x faster |  |
| patch-single | kitsu-core | 4,220,682 | 1x |  |
| **patch-single** | **devour** | **6,230,544** | **1.48x faster** |  |
| patch-single | yayson | 2,258,954 | 1.87x slower |  |
| patch-single | jsona | 4,946,000 | 1.17x faster |  |
| patch-single | ts-japi | 788,888 | 5.35x slower |  |
| empty-relationships | kitsu-core | 1,266,049 | 1x |  |
| empty-relationships | devour | 854,033 | 1.48x slower |  |
| empty-relationships | yayson | 899,946 | 1.41x slower |  |
| **empty-relationships** | **jsona** | **1,843,135** | **1.46x faster** |  |
| empty-relationships | ts-japi | 498,342 | 2.54x slower |  |
| few-includes | kitsu-core | 767 | 1x |  |
| few-includes | devour | 866 | 1.13x faster |  |
| few-includes | yayson | 840 | 1.09x faster |  |
| **few-includes** | **jsona** | **1,701** | **2.22x faster** |  |
| few-includes | ts-japi | 454 | 1.69x slower |  |
| many-includes | kitsu-core | 729 | 1x |  |
| many-includes | devour | 881 | 1.21x faster |  |
| many-includes | yayson | 778 | 1.07x faster |  |
| **many-includes** | **jsona** | **1,423** | **1.95x faster** |  |
| many-includes | ts-japi | 355 | 2.05x slower |  |
| complex-relationships | kitsu-core | 347 | 1x |  |
| **complex-relationships** | **devour** | **536** | **1.54x faster** |  |
| complex-relationships | yayson | 404 | 1.16x faster |  |
| complex-relationships | jsona | 446 | 1.28x faster |  |
| complex-relationships | ts-japi | 286 | 1.21x slower |  |
| wide-relationship | kitsu-core | 2,743 | 1x |  |
| wide-relationship | devour | 10,666 | 3.89x faster |  |
| wide-relationship | yayson | 8,134 | 2.97x faster |  |
| wide-relationship | jsona | 6,235 | 2.27x faster |  |
| **wide-relationship** | **ts-japi** | **12,697** | **4.63x faster** |  |
| self-cycle | kitsu-core | 1,554,925 | 1x |  |
| self-cycle | devour | 937,351 | 1.66x slower |  |
| self-cycle | yayson | 926,832 | 1.68x slower |  |
| **self-cycle** | **jsona** | **1,948,696** | **1.25x faster** |  |
| self-cycle | ts-japi | 507,463 | 3.06x slower |  |
| mutual-cycle | kitsu-core | 1,505,437 | 1x |  |
| mutual-cycle | devour | 962,386 | 1.56x slower |  |
| mutual-cycle | yayson | 875,207 | 1.72x slower |  |
| **mutual-cycle** | **jsona** | **2,046,682** | **1.36x faster** |  |
| mutual-cycle | ts-japi | 500,302 | 3.01x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 635,749 | 1x |  |
| **small-no-relationships** | **devour** | **926,520** | **1.46x faster** |  |
| small-no-relationships | yayson | 470,872 | 1.35x slower |  |
| small-no-relationships | jsona | 878,631 | 1.38x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 524,865 | 1x |  |
| small-links-only | devour | 458,593 | 1.14x slower |  |
| small-links-only | yayson | 387,784 | 1.35x slower |  |
| **small-links-only** | **jsona** | **878,215** | **1.67x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 215,347 | 1x |  |
| small-relationships | devour | 171,367 | 1.26x slower |  |
| small-relationships | yayson | 130,203 | 1.65x slower |  |
| **small-relationships** | **jsona** | **261,165** | **1.21x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 279,802 | 1x |  |
| nested-relationships | devour | 202,008 | 1.39x slower |  |
| nested-relationships | yayson | 171,402 | 1.63x slower |  |
| **nested-relationships** | **jsona** | **311,973** | **1.11x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 52,210 | 1x |  |
| collection | devour | 33,550 | 1.56x slower |  |
| collection | yayson | 77,381 | 1.48x faster |  |
| **collection** | **jsona** | **170,067** | **3.26x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 30,802 | 1x |  |
| collection-includes | devour | 52,878 | 1.72x faster |  |
| collection-includes | yayson | 63,665 | 2.07x faster |  |
| **collection-includes** | **jsona** | **80,914** | **2.63x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,341,794 | 1x |  |
| **patch-single** | **devour** | **1,504,651** | **1.12x faster** |  |
| patch-single | yayson | 551,122 | 2.43x slower |  |
| patch-single | jsona | 1,285,250 | 1.04x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 489,264 | 1x |  |
| empty-relationships | devour | 307,254 | 1.59x slower |  |
| empty-relationships | yayson | 305,346 | 1.6x slower |  |
| **empty-relationships** | **jsona** | **657,051** | **1.34x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 295 | 1x |  |
| few-includes | devour | 249 | 1.19x slower |  |
| few-includes | yayson | 263 | 1.12x slower |  |
| **few-includes** | **jsona** | **334** | **1.13x faster** |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **192** | **1x** |  |
| many-includes | devour | 3.96 | 48.37x slower |  |
| many-includes | yayson | 18.55 | 10.32x slower |  |
| many-includes | jsona | 158 | 1.21x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **32.14** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.54 | 59.79x slower |  |
| complex-relationships | jsona | 21.83 | 1.47x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **254** | **1x** |  |
| wide-relationship | devour | 3 | 84.44x slower |  |
| wide-relationship | yayson | 11.65 | 21.76x slower |  |
| wide-relationship | jsona | 173 | 1.46x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 271,017 | 1x |  |
| self-cycle | devour | 173,244 | 1.56x slower |  |
| self-cycle | yayson | 160,171 | 1.69x slower |  |
| **self-cycle** | **jsona** | **279,520** | **1.03x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **227,582** | **1x** |  |
| mutual-cycle | devour | 143,732 | 1.58x slower |  |
| mutual-cycle | yayson | 133,051 | 1.71x slower |  |
| mutual-cycle | jsona | 223,620 | 1.02x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 54,906 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **91,440** | **1.67x faster** |  |
| small-no-relationships | fetchja | 76,355 | 1.39x faster |  |
| small-no-relationships | devour | 47,324 | 1.16x slower |  |
| small-links-only | kitsu | 48,386 | 1x |  |
| **small-links-only** | **kitsu-native** | **79,657** | **1.65x faster** |  |
| small-links-only | fetchja | 70,897 | 1.47x faster |  |
| small-links-only | devour | 43,705 | 1.11x slower |  |
| small-relationships | kitsu | 40,997 | 1x |  |
| **small-relationships** | **kitsu-native** | **57,347** | **1.4x faster** |  |
| small-relationships | fetchja | 48,689 | 1.19x faster |  |
| small-relationships | devour | 34,344 | 1.19x slower |  |
| nested-relationships | kitsu | 42,638 | 1x |  |
| **nested-relationships** | **kitsu-native** | **65,609** | **1.54x faster** |  |
| nested-relationships | fetchja | 56,737 | 1.33x faster |  |
| nested-relationships | devour | 35,472 | 1.2x slower |  |
| **collection** | **kitsu** | **16,737** | **1x** |  |
| collection | kitsu-native | 13,194 | 1.27x slower |  |
| collection | fetchja | 14,982 | 1.12x slower |  |
| collection | devour | 15,346 | 1.09x slower |  |
| collection-includes | kitsu | 16,117 | 1x |  |
| collection-includes | kitsu-native | 13,842 | 1.16x slower |  |
| collection-includes | fetchja | 14,008 | 1.15x slower |  |
| **collection-includes** | **devour** | **17,502** | **1.09x faster** |  |
| patch-single | kitsu | 62,943 | 1x |  |
| **patch-single** | **kitsu-native** | **120,200** | **1.91x faster** |  |
| patch-single | fetchja | 96,625 | 1.54x faster |  |
| patch-single | devour | 54,335 | 1.16x slower |  |
| empty-relationships | kitsu | 54,273 | 1x |  |
| **empty-relationships** | **kitsu-native** | **94,967** | **1.75x faster** |  |
| empty-relationships | fetchja | 81,408 | 1.5x faster |  |
| empty-relationships | devour | 45,392 | 1.2x slower |  |
| **few-includes** | **kitsu** | **387** | **1x** |  |
| few-includes | kitsu-native | 374 | 1.04x slower |  |
| few-includes | fetchja | 314 | 1.24x slower |  |
| few-includes | devour | 259 | 1.49x slower |  |
| **many-includes** | **kitsu** | **164** | **1x** |  |
| many-includes | kitsu-native | 153 | 1.07x slower |  |
| many-includes | fetchja | 132 | 1.24x slower |  |
| many-includes | devour | 6.91 | 23.79x slower |  |
| **complex-relationships** | **kitsu** | **25.87** | **1x** |  |
| complex-relationships | kitsu-native | 24.99 | 1.04x slower |  |
| complex-relationships | fetchja | 18.71 | 1.38x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **165** | **1x** |  |
| wide-relationship | kitsu-native | 155 | 1.06x slower |  |
| wide-relationship | fetchja | 123 | 1.34x slower |  |
| wide-relationship | devour | 3.52 | 46.87x slower |  |
| self-cycle | kitsu | 42,956 | 1x |  |
| **self-cycle** | **kitsu-native** | **59,255** | **1.38x faster** |  |
| self-cycle | fetchja | 49,740 | 1.16x faster |  |
| self-cycle | devour | 35,189 | 1.22x slower |  |
| mutual-cycle | kitsu | 39,608 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **56,226** | **1.42x faster** |  |
| mutual-cycle | fetchja | 47,962 | 1.21x faster |  |
| mutual-cycle | devour | 30,221 | 1.31x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 48,770 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **250,603** | **5.14x faster** |  |
| small-no-relationships | fetchja | 181,474 | 3.72x faster |  |
| small-no-relationships | devour | 46,165 | 1.06x slower |  |
| small-links-only | kitsu | 47,127 | 1x |  |
| **small-links-only** | **kitsu-native** | **243,509** | **5.17x faster** |  |
| small-links-only | fetchja | 179,535 | 3.81x faster |  |
| small-links-only | devour | 44,490 | 1.06x slower |  |
| small-relationships | kitsu | 40,600 | 1x |  |
| **small-relationships** | **kitsu-native** | **163,933** | **4.04x faster** |  |
| small-relationships | fetchja | 137,857 | 3.4x faster |  |
| small-relationships | devour | 37,728 | 1.08x slower |  |
| nested-relationships | kitsu | 46,214 | 1x |  |
| **nested-relationships** | **kitsu-native** | **219,459** | **4.75x faster** |  |
| nested-relationships | fetchja | 161,410 | 3.49x faster |  |
| nested-relationships | devour | 40,832 | 1.13x slower |  |
| collection | kitsu | 22,209 | 1x |  |
| **collection** | **kitsu-native** | **37,876** | **1.71x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 14,024 | 1x |  |
| **collection-includes** | **kitsu-native** | **19,564** | **1.4x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 59,465 | 1x |  |
| **patch-single** | **kitsu-native** | **366,680** | **6.17x faster** |  |
| patch-single | fetchja | 233,305 | 3.92x faster |  |
| patch-single | devour | 55,943 | 1.06x slower |  |
| empty-relationships | kitsu | 46,936 | 1x |  |
| **empty-relationships** | **kitsu-native** | **219,666** | **4.68x faster** |  |
| empty-relationships | fetchja | 173,557 | 3.7x faster |  |
| empty-relationships | devour | 41,822 | 1.12x slower |  |
| few-includes | kitsu | 305 | 1x |  |
| **few-includes** | **kitsu-native** | **315** | **1.03x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **321** | **1x** |  |
| many-includes | kitsu-native | 317 | 1.01x slower |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 115 | 1x |  |
| **complex-relationships** | **kitsu-native** | **123** | **1.07x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 868 | 1x |  |
| **wide-relationship** | **kitsu-native** | **962** | **1.11x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 48,198 | 1x |  |
| **self-cycle** | **kitsu-native** | **236,200** | **4.9x faster** |  |
| self-cycle | fetchja | 163,549 | 3.39x faster |  |
| self-cycle | devour | 43,808 | 1.1x slower |  |
| mutual-cycle | kitsu | 48,181 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **224,465** | **4.66x faster** |  |
| mutual-cycle | fetchja | 170,924 | 3.55x faster |  |
| mutual-cycle | devour | 41,285 | 1.17x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 51,425 | 1x | 25,713 cycles/s |
| **small-no-relationships** | **kitsu-native** | **123,653** | **2.4x faster** | **61,827 cycles/s** |
| small-no-relationships | fetchja | 99,614 | 1.94x faster | 49,807 cycles/s |
| small-no-relationships | devour | 44,310 | 1.16x slower | 22,155 cycles/s |
| small-links-only | kitsu | 47,500 | 1x | 23,750 cycles/s |
| **small-links-only** | **kitsu-native** | **107,982** | **2.27x faster** | **53,991 cycles/s** |
| small-links-only | fetchja | 90,749 | 1.91x faster | 45,374 cycles/s |
| small-links-only | devour | 42,593 | 1.12x slower | 21,297 cycles/s |
| small-relationships | kitsu | 39,144 | 1x | 19,572 cycles/s |
| **small-relationships** | **kitsu-native** | **69,983** | **1.79x faster** | **34,991 cycles/s** |
| small-relationships | fetchja | 60,106 | 1.54x faster | 30,053 cycles/s |
| small-relationships | devour | 33,533 | 1.17x slower | 16,766 cycles/s |
| nested-relationships | kitsu | 42,792 | 1x | 21,396 cycles/s |
| **nested-relationships** | **kitsu-native** | **94,585** | **2.21x faster** | **47,293 cycles/s** |
| nested-relationships | fetchja | 75,099 | 1.76x faster | 37,550 cycles/s |
| nested-relationships | devour | 38,344 | 1.12x slower | 19,172 cycles/s |
| collection | kitsu | 18,578 | 1x | 9,289 cycles/s |
| **collection** | **kitsu-native** | **18,594** | **<1.01x faster** | **9,297 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 14,547 | 1x | 7,273 cycles/s |
| **collection-includes** | **kitsu-native** | **14,963** | **1.03x faster** | **7,481 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 60,529 | 1x | 30,264 cycles/s |
| **patch-single** | **kitsu-native** | **169,650** | **2.8x faster** | **84,825 cycles/s** |
| patch-single | fetchja | 120,556 | 1.99x faster | 60,278 cycles/s |
| patch-single | devour | 53,906 | 1.12x slower | 26,953 cycles/s |
| empty-relationships | kitsu | 49,491 | 1x | 24,746 cycles/s |
| **empty-relationships** | **kitsu-native** | **113,016** | **2.28x faster** | **56,508 cycles/s** |
| empty-relationships | fetchja | 92,035 | 1.86x faster | 46,017 cycles/s |
| empty-relationships | devour | 42,161 | 1.17x slower | 21,081 cycles/s |
| few-includes | kitsu | 326 | 1x | 163 cycles/s |
| **few-includes** | **kitsu-native** | **336** | **1.03x faster** | **168 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **208** | **1x** | **104 cycles/s** |
| many-includes | kitsu-native | 202 | 1.03x slower | 101 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **40.67** | **1x** | **20\.34 cycles/s** |
| complex-relationships | kitsu-native | 38.32 | 1.06x slower | 19\.16 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **285** | **1x** | **142 cycles/s** |
| wide-relationship | kitsu-native | 263 | 1.08x slower | 131 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 44,456 | 1x | 22,228 cycles/s |
| **self-cycle** | **kitsu-native** | **82,294** | **1.85x faster** | **41,147 cycles/s** |
| self-cycle | fetchja | 66,856 | 1.5x faster | 33,428 cycles/s |
| self-cycle | devour | 38,068 | 1.17x slower | 19,034 cycles/s |
| mutual-cycle | kitsu | 41,786 | 1x | 20,893 cycles/s |
| **mutual-cycle** | **kitsu-native** | **77,706** | **1.86x faster** | **38,853 cycles/s** |
| mutual-cycle | fetchja | 65,156 | 1.56x faster | 32,578 cycles/s |
| mutual-cycle | devour | 35,397 | 1.18x slower | 17,698 cycles/s |

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
