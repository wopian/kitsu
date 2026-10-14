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

Measured commit: `5bcfa6e54ea2267c250307d59d68f9c6a2018091`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 763,549 | 1x |  |
| **small-no-relationships** | **devour** | **1,402,390** | **1.84x faster** |  |
| small-no-relationships | yayson | 788,431 | 1.03x faster |  |
| small-no-relationships | jsona | 1,198,674 | 1.57x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 428,822 | 1x |  |
| small-links-only | devour | 877,305 | 2.05x faster |  |
| small-links-only | yayson | 473,216 | 1.1x faster |  |
| **small-links-only** | **jsona** | **1,023,114** | **2.39x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 171,161 | 1x |  |
| small-relationships | devour | 289,157 | 1.69x faster |  |
| small-relationships | yayson | 203,495 | 1.19x faster |  |
| **small-relationships** | **jsona** | **299,357** | **1.75x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 218,922 | 1x |  |
| nested-relationships | devour | 299,619 | 1.37x faster |  |
| nested-relationships | yayson | 265,081 | 1.21x faster |  |
| **nested-relationships** | **jsona** | **342,210** | **1.56x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 71,147 | 1x |  |
| collection | devour | 95,257 | 1.34x faster |  |
| collection | yayson | 76,724 | 1.08x faster |  |
| **collection** | **jsona** | **270,612** | **3.8x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 47,050 | 1x |  |
| collection-includes | devour | 119,741 | 2.54x faster |  |
| collection-includes | yayson | 107,407 | 2.28x faster |  |
| **collection-includes** | **jsona** | **140,004** | **2.98x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,374,320 | 1x |  |
| **patch-single** | **devour** | **1,528,682** | **1.11x faster** |  |
| patch-single | yayson | 784,024 | 1.75x slower |  |
| patch-single | jsona | 1,369,702 | <1.01x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 409,033 | 1x |  |
| empty-relationships | devour | 648,050 | 1.58x faster |  |
| empty-relationships | yayson | 601,757 | 1.47x faster |  |
| **empty-relationships** | **jsona** | **853,674** | **2.09x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 452 | 1x |  |
| few-includes | devour | 527 | 1.17x faster |  |
| **few-includes** | **yayson** | **661** | **1.46x faster** |  |
| few-includes | jsona | 602 | 1.33x faster |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| many-includes | kitsu-core | 187 | 1x |  |
| many-includes | devour | 8.17 | 22.87x slower |  |
| many-includes | yayson | 39.26 | 4.76x slower |  |
| **many-includes** | **jsona** | **192** | **1.03x faster** |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **29.78** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.95 | 31.37x slower |  |
| complex-relationships | jsona | 28.34 | 1.05x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **183** | **1x** |  |
| wide-relationship | devour | 5.2 | 35.26x slower |  |
| wide-relationship | yayson | 23.12 | 7.93x slower |  |
| wide-relationship | jsona | 158 | 1.16x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 204,831 | 1x |  |
| self-cycle | devour | 280,424 | 1.37x faster |  |
| self-cycle | yayson | 235,666 | 1.15x faster |  |
| **self-cycle** | **jsona** | **297,482** | **1.45x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| mutual-cycle | kitsu-core | 175,173 | 1x |  |
| mutual-cycle | devour | 216,099 | 1.23x faster |  |
| mutual-cycle | yayson | 205,496 | 1.17x faster |  |
| **mutual-cycle** | **jsona** | **242,703** | **1.39x faster** |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 161,666 | 1x |  |
| **small-no-relationships** | **devour** | **3,163,970** | **19.57x faster** |  |
| small-no-relationships | yayson | 1,701,349 | 10.52x faster |  |
| small-no-relationships | jsona | 2,073,389 | 12.83x faster |  |
| small-no-relationships | ts-japi | 704,812 | 4.36x faster |  |
| small-links-only | kitsu-core | 166,115 | 1x |  |
| small-links-only | devour | 1,869,089 | 11.25x faster |  |
| small-links-only | yayson | 1,306,594 | 7.87x faster |  |
| **small-links-only** | **jsona** | **2,264,065** | **13.63x faster** |  |
| small-links-only | ts-japi | 681,664 | 4.1x faster |  |
| small-relationships | kitsu-core | 47,732 | 1x |  |
| **small-relationships** | **devour** | **1,346,024** | **28.2x faster** |  |
| small-relationships | yayson | 873,358 | 18.3x faster |  |
| small-relationships | jsona | 890,596 | 18.66x faster |  |
| small-relationships | ts-japi | 393,301 | 8.24x faster |  |
| nested-relationships | kitsu-core | 65,817 | 1x |  |
| **nested-relationships** | **devour** | **1,299,878** | **19.75x faster** |  |
| nested-relationships | yayson | 937,144 | 14.24x faster |  |
| nested-relationships | jsona | 999,859 | 15.19x faster |  |
| nested-relationships | ts-japi | 390,260 | 5.93x faster |  |
| collection | kitsu-core | 28,440 | 1x |  |
| collection | devour | 148,177 | 5.21x faster |  |
| collection | yayson | 242,702 | 8.53x faster |  |
| **collection** | **jsona** | **538,282** | **18.93x faster** |  |
| collection | ts-japi | 273,339 | 9.61x faster |  |
| collection-includes | kitsu-core | 12,087 | 1x |  |
| collection-includes | devour | 259,002 | 21.43x faster |  |
| collection-includes | yayson | 288,249 | 23.85x faster |  |
| **collection-includes** | **jsona** | **296,305** | **24.51x faster** |  |
| collection-includes | ts-japi | 152,530 | 12.62x faster |  |
| patch-single | kitsu-core | 202,585 | 1x |  |
| **patch-single** | **devour** | **4,695,704** | **23.18x faster** |  |
| patch-single | yayson | 1,927,303 | 9.51x faster |  |
| patch-single | jsona | 2,627,484 | 12.97x faster |  |
| patch-single | ts-japi | 737,259 | 3.64x faster |  |
| empty-relationships | kitsu-core | 124,032 | 1x |  |
| **empty-relationships** | **devour** | **1,286,133** | **10.37x faster** |  |
| empty-relationships | yayson | 927,355 | 7.48x faster |  |
| empty-relationships | jsona | 1,148,255 | 9.26x faster |  |
| empty-relationships | ts-japi | 418,596 | 3.37x faster |  |
| few-includes | kitsu-core | 54.13 | 1x |  |
| **few-includes** | **devour** | **1,845** | **34.08x faster** |  |
| few-includes | yayson | 1,177 | 21.74x faster |  |
| few-includes | jsona | 1,226 | 22.64x faster |  |
| few-includes | ts-japi | 538 | 9.94x faster |  |
| many-includes | kitsu-core | 49.1 | 1x |  |
| **many-includes** | **devour** | **2,013** | **41.01x faster** |  |
| many-includes | yayson | 1,497 | 30.5x faster |  |
| many-includes | jsona | 1,300 | 26.49x faster |  |
| many-includes | ts-japi | 678 | 13.82x faster |  |
| complex-relationships | kitsu-core | 10.23 | 1x |  |
| **complex-relationships** | **devour** | **1,055** | **103x faster** |  |
| complex-relationships | yayson | 844 | 82.54x faster |  |
| complex-relationships | jsona | 682 | 66.62x faster |  |
| complex-relationships | ts-japi | 455 | 44.49x faster |  |
| wide-relationship | kitsu-core | 62.57 | 1x |  |
| **wide-relationship** | **devour** | **19,210** | **307x faster** |  |
| wide-relationship | yayson | 18,419 | 294x faster |  |
| wide-relationship | jsona | 5,612 | 89.68x faster |  |
| wide-relationship | ts-japi | 7,336 | 117x faster |  |
| self-cycle | kitsu-core | 64,141 | 1x |  |
| **self-cycle** | **devour** | **1,470,226** | **22.92x faster** |  |
| self-cycle | yayson | 892,316 | 13.91x faster |  |
| self-cycle | jsona | 983,150 | 15.33x faster |  |
| self-cycle | ts-japi | 412,491 | 6.43x faster |  |
| mutual-cycle | kitsu-core | 64,584 | 1x |  |
| **mutual-cycle** | **devour** | **1,456,840** | **22.56x faster** |  |
| mutual-cycle | yayson | 894,223 | 13.85x faster |  |
| mutual-cycle | jsona | 832,476 | 12.89x faster |  |
| mutual-cycle | ts-japi | 387,172 | 5.99x faster |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 128,340 | 1x |  |
| **small-no-relationships** | **devour** | **758,757** | **5.91x faster** |  |
| small-no-relationships | yayson | 528,028 | 4.11x faster |  |
| small-no-relationships | jsona | 653,951 | 5.1x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 110,723 | 1x |  |
| small-links-only | devour | 500,947 | 4.52x faster |  |
| small-links-only | yayson | 350,319 | 3.16x faster |  |
| **small-links-only** | **jsona** | **541,807** | **4.89x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 33,147 | 1x |  |
| small-relationships | devour | 190,695 | 5.75x faster |  |
| small-relationships | yayson | 149,872 | 4.52x faster |  |
| **small-relationships** | **jsona** | **192,391** | **5.8x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 44,548 | 1x |  |
| **nested-relationships** | **devour** | **222,667** | **5x faster** |  |
| nested-relationships | yayson | 196,697 | 4.42x faster |  |
| nested-relationships | jsona | 219,287 | 4.92x faster |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 17,370 | 1x |  |
| collection | devour | 48,718 | 2.8x faster |  |
| collection | yayson | 50,455 | 2.9x faster |  |
| **collection** | **jsona** | **114,412** | **6.59x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 8,828 | 1x |  |
| collection-includes | devour | 70,841 | 8.02x faster |  |
| collection-includes | yayson | 65,288 | 7.4x faster |  |
| **collection-includes** | **jsona** | **78,937** | **8.94x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 165,375 | 1x |  |
| **patch-single** | **devour** | **879,207** | **5.32x faster** |  |
| patch-single | yayson | 529,888 | 3.2x faster |  |
| patch-single | jsona | 677,454 | 4.1x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 88,758 | 1x |  |
| empty-relationships | devour | 342,435 | 3.86x faster |  |
| empty-relationships | yayson | 321,848 | 3.63x faster |  |
| **empty-relationships** | **jsona** | **375,171** | **4.23x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 45.28 | 1x |  |
| **few-includes** | **devour** | **336** | **7.41x faster** |  |
| few-includes | yayson | 277 | 6.11x faster |  |
| few-includes | jsona | 308 | 6.81x faster |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| many-includes | kitsu-core | 36.24 | 1x |  |
| many-includes | devour | 7.86 | 4.61x slower |  |
| many-includes | yayson | 35.4 | 1.02x slower |  |
| **many-includes** | **jsona** | **139** | **3.82x faster** |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| complex-relationships | kitsu-core | 7.25 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.94 | 7.68x slower |  |
| **complex-relationships** | **jsona** | **23.57** | **3.25x faster** |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| wide-relationship | kitsu-core | 45.41 | 1x |  |
| wide-relationship | devour | 5.38 | 8.44x slower |  |
| wide-relationship | yayson | 20.69 | 2.19x slower |  |
| **wide-relationship** | **jsona** | **148** | **3.26x faster** |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 43,448 | 1x |  |
| **self-cycle** | **devour** | **208,034** | **4.79x faster** |  |
| self-cycle | yayson | 178,211 | 4.1x faster |  |
| self-cycle | jsona | 198,831 | 4.58x faster |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| mutual-cycle | kitsu-core | 41,128 | 1x |  |
| mutual-cycle | devour | 166,241 | 4.04x faster |  |
| mutual-cycle | yayson | 153,245 | 3.73x faster |  |
| **mutual-cycle** | **jsona** | **167,588** | **4.07x faster** |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 59,983 | 1x |  |
| **small-no-relationships** | **fetchja** | **229,871** | **3.83x faster** |  |
| small-no-relationships | devour | 57,247 | 1.05x slower |  |
| small-links-only | kitsu | 53,703 | 1x |  |
| **small-links-only** | **fetchja** | **206,132** | **3.84x faster** |  |
| small-links-only | devour | 52,276 | 1.03x slower |  |
| small-relationships | kitsu | 38,708 | 1x |  |
| **small-relationships** | **fetchja** | **110,974** | **2.87x faster** |  |
| small-relationships | devour | 39,645 | 1.02x faster |  |
| nested-relationships | kitsu | 43,735 | 1x |  |
| **nested-relationships** | **fetchja** | **126,156** | **2.88x faster** |  |
| nested-relationships | devour | 41,847 | 1.05x slower |  |
| collection | kitsu | 17,237 | 1x |  |
| **collection** | **fetchja** | **30,826** | **1.79x faster** |  |
| collection | devour | 18,291 | 1.06x faster |  |
| collection-includes | kitsu | 16,231 | 1x |  |
| **collection-includes** | **fetchja** | **32,143** | **1.98x faster** |  |
| collection-includes | devour | 20,583 | 1.27x faster |  |
| patch-single | kitsu | 66,450 | 1x |  |
| **patch-single** | **fetchja** | **234,952** | **3.54x faster** |  |
| patch-single | devour | 60,297 | 1.1x slower |  |
| empty-relationships | kitsu | 54,089 | 1x |  |
| **empty-relationships** | **fetchja** | **189,005** | **3.49x faster** |  |
| empty-relationships | devour | 51,226 | 1.06x slower |  |
| few-includes | kitsu | 359 | 1x |  |
| **few-includes** | **fetchja** | **515** | **1.43x faster** |  |
| few-includes | devour | 389 | 1.08x faster |  |
| many-includes | kitsu | 132 | 1x |  |
| **many-includes** | **fetchja** | **208** | **1.58x faster** |  |
| many-includes | devour | 10.54 | 12.52x slower |  |
| complex-relationships | kitsu | 22.8 | 1x |  |
| **complex-relationships** | **fetchja** | **32.56** | **1.43x faster** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| wide-relationship | kitsu | 140 | 1x |  |
| **wide-relationship** | **fetchja** | **194** | **1.38x faster** |  |
| wide-relationship | devour | 6.57 | 21.31x slower |  |
| self-cycle | kitsu | 42,469 | 1x |  |
| **self-cycle** | **fetchja** | **120,345** | **2.83x faster** |  |
| self-cycle | devour | 39,074 | 1.09x slower |  |
| mutual-cycle | kitsu | 40,603 | 1x |  |
| **mutual-cycle** | **fetchja** | **108,528** | **2.67x faster** |  |
| mutual-cycle | devour | 38,633 | 1.05x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 40,046 | 1x |  |
| **small-no-relationships** | **fetchja** | **262,650** | **6.56x faster** |  |
| small-no-relationships | devour | 50,672 | 1.27x faster |  |
| small-links-only | kitsu | 38,920 | 1x |  |
| **small-links-only** | **fetchja** | **244,488** | **6.28x faster** |  |
| small-links-only | devour | 47,512 | 1.22x faster |  |
| small-relationships | kitsu | 21,196 | 1x |  |
| **small-relationships** | **fetchja** | **188,115** | **8.88x faster** |  |
| small-relationships | devour | 42,107 | 1.99x faster |  |
| nested-relationships | kitsu | 25,141 | 1x |  |
| **nested-relationships** | **fetchja** | **218,551** | **8.69x faster** |  |
| nested-relationships | devour | 46,097 | 1.83x faster |  |
| **collection** | **kitsu** | **12,562** | **1x** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| **collection-includes** | **kitsu** | **6,705** | **1x** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 43,377 | 1x |  |
| **patch-single** | **fetchja** | **296,293** | **6.83x faster** |  |
| patch-single | devour | 56,050 | 1.29x faster |  |
| empty-relationships | kitsu | 34,524 | 1x |  |
| **empty-relationships** | **fetchja** | **218,326** | **6.32x faster** |  |
| empty-relationships | devour | 43,444 | 1.26x faster |  |
| **few-includes** | **kitsu** | **53.07** | **1x** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **46.82** | **1x** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **9.95** | **1x** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **60.81** | **1x** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 25,524 | 1x |  |
| **self-cycle** | **fetchja** | **224,334** | **8.79x faster** |  |
| self-cycle | devour | 46,293 | 1.81x faster |  |
| mutual-cycle | kitsu | 24,808 | 1x |  |
| **mutual-cycle** | **fetchja** | **218,433** | **8.81x faster** |  |
| mutual-cycle | devour | 43,118 | 1.74x faster |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 44,419 | 1x | 22,209 cycles/s |
| **small-no-relationships** | **fetchja** | **217,293** | **4.89x faster** | **108,646 cycles/s** |
| small-no-relationships | devour | 51,566 | 1.16x faster | 25,783 cycles/s |
| small-links-only | kitsu | 41,569 | 1x | 20,785 cycles/s |
| **small-links-only** | **fetchja** | **205,927** | **4.95x faster** | **102,963 cycles/s** |
| small-links-only | devour | 47,483 | 1.14x faster | 23,742 cycles/s |
| small-relationships | kitsu | 24,032 | 1x | 12,016 cycles/s |
| **small-relationships** | **fetchja** | **121,356** | **5.05x faster** | **60,678 cycles/s** |
| small-relationships | devour | 36,809 | 1.53x faster | 18,405 cycles/s |
| nested-relationships | kitsu | 28,406 | 1x | 14,203 cycles/s |
| **nested-relationships** | **fetchja** | **139,291** | **4.9x faster** | **69,645 cycles/s** |
| nested-relationships | devour | 40,644 | 1.43x faster | 20,322 cycles/s |
| **collection** | **kitsu** | **13,729** | **1x** | **6,864 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| **collection-includes** | **kitsu** | **9,006** | **1x** | **4,503 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 49,915 | 1x | 24,957 cycles/s |
| **patch-single** | **fetchja** | **242,911** | **4.87x faster** | **121,456 cycles/s** |
| patch-single | devour | 55,234 | 1.11x faster | 27,617 cycles/s |
| empty-relationships | kitsu | 36,228 | 1x | 18,114 cycles/s |
| **empty-relationships** | **fetchja** | **179,956** | **4.97x faster** | **89,978 cycles/s** |
| empty-relationships | devour | 45,834 | 1.27x faster | 22,917 cycles/s |
| **few-includes** | **kitsu** | **84.72** | **1x** | **42\.36 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **68.22** | **1x** | **34\.11 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **13.45** | **1x** | **6\.72 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **83.88** | **1x** | **41\.94 cycles/s** |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 26,587 | 1x | 13,294 cycles/s |
| **self-cycle** | **fetchja** | **141,046** | **5.31x faster** | **70,523 cycles/s** |
| self-cycle | devour | 40,838 | 1.54x faster | 20,419 cycles/s |
| mutual-cycle | kitsu | 27,241 | 1x | 13,620 cycles/s |
| **mutual-cycle** | **fetchja** | **127,488** | **4.68x faster** | **63,744 cycles/s** |
| mutual-cycle | devour | 38,558 | 1.42x faster | 19,279 cycles/s |

</details>

### node v26\.5\.0

Measured commit: `5bcfa6e54ea2267c250307d59d68f9c6a2018091`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 763,696 | 1x |  |
| small-no-relationships | devour | 1,602,019 | 2.1x faster |  |
| small-no-relationships | yayson | 756,355 | 1.01x slower |  |
| **small-no-relationships** | **jsona** | **1,604,596** | **2.1x faster** |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 436,506 | 1x |  |
| small-links-only | devour | 819,442 | 1.88x faster |  |
| small-links-only | yayson | 619,091 | 1.42x faster |  |
| **small-links-only** | **jsona** | **1,489,711** | **3.41x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 133,844 | 1x |  |
| small-relationships | devour | 232,051 | 1.73x faster |  |
| small-relationships | yayson | 188,171 | 1.41x faster |  |
| **small-relationships** | **jsona** | **364,899** | **2.73x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 180,087 | 1x |  |
| nested-relationships | devour | 265,902 | 1.48x faster |  |
| nested-relationships | yayson | 233,191 | 1.29x faster |  |
| **nested-relationships** | **jsona** | **398,033** | **2.21x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 68,917 | 1x |  |
| collection | devour | 62,721 | 1.1x slower |  |
| collection | yayson | 110,878 | 1.61x faster |  |
| **collection** | **jsona** | **296,144** | **4.3x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 44,095 | 1x |  |
| collection-includes | devour | 83,916 | 1.9x faster |  |
| collection-includes | yayson | 94,625 | 2.15x faster |  |
| **collection-includes** | **jsona** | **122,533** | **2.78x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,291,099 | 1x |  |
| **patch-single** | **devour** | **2,157,472** | **1.67x faster** |  |
| patch-single | yayson | 783,702 | 1.65x slower |  |
| patch-single | jsona | 2,058,812 | 1.59x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 450,897 | 1x |  |
| empty-relationships | devour | 544,076 | 1.21x faster |  |
| empty-relationships | yayson | 622,888 | 1.38x faster |  |
| **empty-relationships** | **jsona** | **1,230,731** | **2.73x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 298 | 1x |  |
| few-includes | devour | 355 | 1.19x faster |  |
| few-includes | yayson | 445 | 1.49x faster |  |
| **few-includes** | **jsona** | **490** | **1.64x faster** |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| many-includes | kitsu-core | 106 | 1x |  |
| many-includes | devour | 3.81 | 27.88x slower |  |
| many-includes | yayson | 18.28 | 5.82x slower |  |
| **many-includes** | **jsona** | **187** | **1.76x faster** |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| complex-relationships | kitsu-core | 14.24 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.52 | 27.34x slower |  |
| **complex-relationships** | **jsona** | **20.94** | **1.47x faster** |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| wide-relationship | kitsu-core | 101 | 1x |  |
| wide-relationship | devour | 2.77 | 36.51x slower |  |
| wide-relationship | yayson | 11.43 | 8.85x slower |  |
| **wide-relationship** | **jsona** | **140** | **1.39x faster** |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 163,984 | 1x |  |
| self-cycle | devour | 217,915 | 1.33x faster |  |
| self-cycle | yayson | 210,466 | 1.28x faster |  |
| **self-cycle** | **jsona** | **338,417** | **2.06x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| mutual-cycle | kitsu-core | 129,735 | 1x |  |
| mutual-cycle | devour | 165,891 | 1.28x faster |  |
| mutual-cycle | yayson | 174,766 | 1.35x faster |  |
| **mutual-cycle** | **jsona** | **260,168** | **2.01x faster** |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 147,312 | 1x |  |
| small-no-relationships | devour | 2,672,620 | 18.14x faster |  |
| small-no-relationships | yayson | 1,576,948 | 10.7x faster |  |
| **small-no-relationships** | **jsona** | **2,951,935** | **20.04x faster** |  |
| small-no-relationships | ts-japi | 646,042 | 4.39x faster |  |
| small-links-only | kitsu-core | 148,355 | 1x |  |
| small-links-only | devour | 1,230,330 | 8.29x faster |  |
| small-links-only | yayson | 1,307,655 | 8.81x faster |  |
| **small-links-only** | **jsona** | **3,065,714** | **20.66x faster** |  |
| small-links-only | ts-japi | 643,894 | 4.34x faster |  |
| small-relationships | kitsu-core | 42,993 | 1x |  |
| small-relationships | devour | 736,587 | 17.13x faster |  |
| small-relationships | yayson | 745,777 | 17.35x faster |  |
| **small-relationships** | **jsona** | **1,421,059** | **33.05x faster** |  |
| small-relationships | ts-japi | 415,931 | 9.67x faster |  |
| nested-relationships | kitsu-core | 61,478 | 1x |  |
| nested-relationships | devour | 856,289 | 13.93x faster |  |
| nested-relationships | yayson | 797,069 | 12.97x faster |  |
| **nested-relationships** | **jsona** | **1,706,610** | **27.76x faster** |  |
| nested-relationships | ts-japi | 476,509 | 7.75x faster |  |
| collection | kitsu-core | 40,085 | 1x |  |
| collection | devour | 71,649 | 1.79x faster |  |
| collection | yayson | 221,946 | 5.54x faster |  |
| **collection** | **jsona** | **786,019** | **19.61x faster** |  |
| collection | ts-japi | 235,224 | 5.87x faster |  |
| collection-includes | kitsu-core | 14,801 | 1x |  |
| collection-includes | devour | 157,834 | 10.66x faster |  |
| collection-includes | yayson | 232,533 | 15.71x faster |  |
| **collection-includes** | **jsona** | **396,850** | **26.81x faster** |  |
| collection-includes | ts-japi | 142,253 | 9.61x faster |  |
| patch-single | kitsu-core | 219,697 | 1x |  |
| **patch-single** | **devour** | **5,727,962** | **26.07x faster** |  |
| patch-single | yayson | 2,025,024 | 9.22x faster |  |
| patch-single | jsona | 4,450,497 | 20.26x faster |  |
| patch-single | ts-japi | 716,997 | 3.26x faster |  |
| empty-relationships | kitsu-core | 116,833 | 1x |  |
| empty-relationships | devour | 747,958 | 6.4x faster |  |
| empty-relationships | yayson | 781,906 | 6.69x faster |  |
| **empty-relationships** | **jsona** | **1,804,604** | **15.45x faster** |  |
| empty-relationships | ts-japi | 471,086 | 4.03x faster |  |
| few-includes | kitsu-core | 44.33 | 1x |  |
| few-includes | devour | 787 | 17.75x faster |  |
| few-includes | yayson | 746 | 16.82x faster |  |
| **few-includes** | **jsona** | **1,345** | **30.34x faster** |  |
| few-includes | ts-japi | 359 | 8.1x faster |  |
| many-includes | kitsu-core | 38.09 | 1x |  |
| many-includes | devour | 676 | 17.74x faster |  |
| many-includes | yayson | 712 | 18.69x faster |  |
| **many-includes** | **jsona** | **1,758** | **46.15x faster** |  |
| many-includes | ts-japi | 293 | 7.69x faster |  |
| complex-relationships | kitsu-core | 7.77 | 1x |  |
| **complex-relationships** | **devour** | **436** | **56.13x faster** |  |
| complex-relationships | yayson | 304 | 39.14x faster |  |
| complex-relationships | jsona | 345 | 44.36x faster |  |
| complex-relationships | ts-japi | 199 | 25.56x faster |  |
| wide-relationship | kitsu-core | 48.64 | 1x |  |
| wide-relationship | devour | 8,684 | 179x faster |  |
| wide-relationship | yayson | 6,886 | 142x faster |  |
| wide-relationship | jsona | 5,310 | 109x faster |  |
| **wide-relationship** | **ts-japi** | **9,282** | **191x faster** |  |
| self-cycle | kitsu-core | 64,460 | 1x |  |
| self-cycle | devour | 891,633 | 13.83x faster |  |
| self-cycle | yayson | 836,255 | 12.97x faster |  |
| **self-cycle** | **jsona** | **1,922,462** | **29.82x faster** |  |
| self-cycle | ts-japi | 471,919 | 7.32x faster |  |
| mutual-cycle | kitsu-core | 63,773 | 1x |  |
| mutual-cycle | devour | 885,945 | 13.89x faster |  |
| mutual-cycle | yayson | 841,678 | 13.2x faster |  |
| **mutual-cycle** | **jsona** | **1,988,896** | **31.19x faster** |  |
| mutual-cycle | ts-japi | 447,239 | 7.01x faster |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 115,328 | 1x |  |
| small-no-relationships | devour | 907,124 | 7.87x faster |  |
| small-no-relationships | yayson | 427,369 | 3.71x faster |  |
| **small-no-relationships** | **jsona** | **937,616** | **8.13x faster** |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 102,514 | 1x |  |
| small-links-only | devour | 451,901 | 4.41x faster |  |
| small-links-only | yayson | 393,433 | 3.84x faster |  |
| **small-links-only** | **jsona** | **875,301** | **8.54x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 30,208 | 1x |  |
| small-relationships | devour | 156,142 | 5.17x faster |  |
| small-relationships | yayson | 131,345 | 4.35x faster |  |
| **small-relationships** | **jsona** | **254,604** | **8.43x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 42,160 | 1x |  |
| nested-relationships | devour | 193,346 | 4.59x faster |  |
| nested-relationships | yayson | 156,424 | 3.71x faster |  |
| **nested-relationships** | **jsona** | **298,176** | **7.07x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 22,883 | 1x |  |
| collection | devour | 32,049 | 1.4x faster |  |
| collection | yayson | 72,206 | 3.16x faster |  |
| **collection** | **jsona** | **156,515** | **6.84x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 9,985 | 1x |  |
| collection-includes | devour | 50,007 | 5.01x faster |  |
| collection-includes | yayson | 58,135 | 5.82x faster |  |
| **collection-includes** | **jsona** | **74,498** | **7.46x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 182,437 | 1x |  |
| **patch-single** | **devour** | **1,387,607** | **7.61x faster** |  |
| patch-single | yayson | 558,916 | 3.06x faster |  |
| patch-single | jsona | 1,224,788 | 6.71x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 84,760 | 1x |  |
| empty-relationships | devour | 247,619 | 2.92x faster |  |
| empty-relationships | yayson | 313,024 | 3.69x faster |  |
| **empty-relationships** | **jsona** | **605,176** | **7.14x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 38.42 | 1x |  |
| few-includes | devour | 219 | 5.7x faster |  |
| few-includes | yayson | 219 | 5.71x faster |  |
| **few-includes** | **jsona** | **297** | **7.73x faster** |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| many-includes | kitsu-core | 27.06 | 1x |  |
| many-includes | devour | 3.77 | 7.17x slower |  |
| many-includes | yayson | 17.25 | 1.57x slower |  |
| **many-includes** | **jsona** | **134** | **4.97x faster** |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| complex-relationships | kitsu-core | 4.83 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.52 | 9.23x slower |  |
| **complex-relationships** | **jsona** | **17.3** | **3.58x faster** |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| wide-relationship | kitsu-core | 33.16 | 1x |  |
| wide-relationship | devour | 2.85 | 11.62x slower |  |
| wide-relationship | yayson | 10.98 | 3.02x slower |  |
| **wide-relationship** | **jsona** | **150** | **4.51x faster** |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 42,918 | 1x |  |
| self-cycle | devour | 159,763 | 3.72x faster |  |
| self-cycle | yayson | 150,600 | 3.51x faster |  |
| **self-cycle** | **jsona** | **275,028** | **6.41x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| mutual-cycle | kitsu-core | 39,222 | 1x |  |
| mutual-cycle | devour | 134,130 | 3.42x faster |  |
| mutual-cycle | yayson | 131,574 | 3.35x faster |  |
| **mutual-cycle** | **jsona** | **212,791** | **5.43x faster** |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| **small-no-relationships** | **kitsu** | **48,164** | **1x** |  |
| small-no-relationships | fetchja | 28,909 | 1.67x slower |  |
| small-no-relationships | devour | 46,477 | 1.04x slower |  |
| small-links-only | kitsu | 45,118 | 1x |  |
| **small-links-only** | **fetchja** | **73,934** | **1.64x faster** |  |
| small-links-only | devour | 43,322 | 1.04x slower |  |
| small-relationships | kitsu | 30,715 | 1x |  |
| **small-relationships** | **fetchja** | **42,470** | **1.38x faster** |  |
| small-relationships | devour | 31,222 | 1.02x faster |  |
| nested-relationships | kitsu | 34,100 | 1x |  |
| **nested-relationships** | **fetchja** | **50,566** | **1.48x faster** |  |
| nested-relationships | devour | 34,506 | 1.01x faster |  |
| **collection** | **kitsu** | **14,339** | **1x** |  |
| collection | fetchja | 13,526 | 1.06x slower |  |
| collection | devour | 14,208 | 1.01x slower |  |
| collection-includes | kitsu | 13,498 | 1x |  |
| collection-includes | fetchja | 12,893 | 1.05x slower |  |
| **collection-includes** | **devour** | **15,672** | **1.16x faster** |  |
| patch-single | kitsu | 57,282 | 1x |  |
| **patch-single** | **fetchja** | **88,044** | **1.54x faster** |  |
| patch-single | devour | 50,913 | 1.13x slower |  |
| empty-relationships | kitsu | 44,460 | 1x |  |
| **empty-relationships** | **fetchja** | **69,648** | **1.57x faster** |  |
| empty-relationships | devour | 37,196 | 1.2x slower |  |
| few-includes | kitsu | 209 | 1x |  |
| **few-includes** | **fetchja** | **270** | **1.29x faster** |  |
| few-includes | devour | 236 | 1.13x faster |  |
| many-includes | kitsu | 76.33 | 1x |  |
| **many-includes** | **fetchja** | **117** | **1.53x faster** |  |
| many-includes | devour | 6.5 | 11.74x slower |  |
| complex-relationships | kitsu | 10.84 | 1x |  |
| **complex-relationships** | **fetchja** | **16.97** | **1.57x faster** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| wide-relationship | kitsu | 78.81 | 1x |  |
| **wide-relationship** | **fetchja** | **112** | **1.42x faster** |  |
| wide-relationship | devour | 3.32 | 23.74x slower |  |
| self-cycle | kitsu | 31,745 | 1x |  |
| **self-cycle** | **fetchja** | **48,836** | **1.54x faster** |  |
| self-cycle | devour | 31,318 | 1.01x slower |  |
| mutual-cycle | kitsu | 30,554 | 1x |  |
| **mutual-cycle** | **fetchja** | **45,975** | **1.5x faster** |  |
| mutual-cycle | devour | 29,086 | 1.05x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 32,857 | 1x |  |
| **small-no-relationships** | **fetchja** | **164,171** | **5x faster** |  |
| small-no-relationships | devour | 43,794 | 1.33x faster |  |
| small-links-only | kitsu | 33,476 | 1x |  |
| **small-links-only** | **fetchja** | **183,153** | **5.47x faster** |  |
| small-links-only | devour | 42,774 | 1.28x faster |  |
| small-relationships | kitsu | 17,819 | 1x |  |
| **small-relationships** | **fetchja** | **130,036** | **7.3x faster** |  |
| small-relationships | devour | 33,397 | 1.87x faster |  |
| nested-relationships | kitsu | 22,988 | 1x |  |
| **nested-relationships** | **fetchja** | **156,169** | **6.79x faster** |  |
| nested-relationships | devour | 39,841 | 1.73x faster |  |
| **collection** | **kitsu** | **13,894** | **1x** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| **collection-includes** | **kitsu** | **7,242** | **1x** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 39,661 | 1x |  |
| **patch-single** | **fetchja** | **223,523** | **5.64x faster** |  |
| patch-single | devour | 50,156 | 1.26x faster |  |
| empty-relationships | kitsu | 28,283 | 1x |  |
| **empty-relationships** | **fetchja** | **154,704** | **5.47x faster** |  |
| empty-relationships | devour | 39,501 | 1.4x faster |  |
| **few-includes** | **kitsu** | **38.43** | **1x** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **36.39** | **1x** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **6.8** | **1x** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **45.9** | **1x** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 22,827 | 1x |  |
| **self-cycle** | **fetchja** | **158,447** | **6.94x faster** |  |
| self-cycle | devour | 39,300 | 1.72x faster |  |
| mutual-cycle | kitsu | 23,042 | 1x |  |
| **mutual-cycle** | **fetchja** | **150,138** | **6.52x faster** |  |
| mutual-cycle | devour | 37,151 | 1.61x faster |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 35,999 | 1x | 17,999 cycles/s |
| **small-no-relationships** | **fetchja** | **98,923** | **2.75x faster** | **49,462 cycles/s** |
| small-no-relationships | devour | 44,467 | 1.24x faster | 22,234 cycles/s |
| small-links-only | kitsu | 34,033 | 1x | 17,017 cycles/s |
| **small-links-only** | **fetchja** | **94,134** | **2.77x faster** | **47,067 cycles/s** |
| small-links-only | devour | 40,618 | 1.19x faster | 20,309 cycles/s |
| small-relationships | kitsu | 18,998 | 1x | 9,499 cycles/s |
| **small-relationships** | **fetchja** | **57,427** | **3.02x faster** | **28,713 cycles/s** |
| small-relationships | devour | 32,094 | 1.69x faster | 16,047 cycles/s |
| nested-relationships | kitsu | 24,344 | 1x | 12,172 cycles/s |
| **nested-relationships** | **fetchja** | **67,321** | **2.77x faster** | **33,660 cycles/s** |
| nested-relationships | devour | 35,433 | 1.46x faster | 17,717 cycles/s |
| **collection** | **kitsu** | **13,104** | **1x** | **6,552 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| **collection-includes** | **kitsu** | **8,486** | **1x** | **4,243 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 44,960 | 1x | 22,480 cycles/s |
| **patch-single** | **fetchja** | **118,002** | **2.62x faster** | **59,001 cycles/s** |
| patch-single | devour | 47,863 | 1.06x faster | 23,931 cycles/s |
| empty-relationships | kitsu | 31,429 | 1x | 15,714 cycles/s |
| **empty-relationships** | **fetchja** | **81,289** | **2.59x faster** | **40,645 cycles/s** |
| empty-relationships | devour | 38,340 | 1.22x faster | 19,170 cycles/s |
| **few-includes** | **kitsu** | **65.85** | **1x** | **32\.92 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **43.34** | **1x** | **21\.67 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **8.15** | **1x** | **4\.08 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **58.41** | **1x** | **29\.21 cycles/s** |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 23,894 | 1x | 11,947 cycles/s |
| **self-cycle** | **fetchja** | **64,316** | **2.69x faster** | **32,158 cycles/s** |
| self-cycle | devour | 33,797 | 1.41x faster | 16,899 cycles/s |
| mutual-cycle | kitsu | 23,493 | 1x | 11,746 cycles/s |
| **mutual-cycle** | **fetchja** | **59,603** | **2.54x faster** | **29,802 cycles/s** |
| mutual-cycle | devour | 32,680 | 1.39x faster | 16,340 cycles/s |

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
[github releases]: https://github.com/wopian/kitsu/releases
[contributing]: https://github.com/wopian/kitsu/blob/master/CONTRIBUTING.md
[mit]: https://github.com/wopian/kitsu/blob/master/LICENSE.md
