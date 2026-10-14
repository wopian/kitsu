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

Base commit (local changes measured): `3324ed54e50f0262c6f2da322ae1de81cf9c71d9`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `5033a2ae742fcb23f3d2899f04ddc2455a7e93e61454f13d0e6bc1b74b99d25e`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,043,259 | 1x |  |
| **small-no-relationships** | **devour** | **1,236,394** | **1.19x faster** |  |
| small-no-relationships | yayson | 751,724 | 1.39x slower |  |
| small-no-relationships | jsona | 1,181,518 | 1.13x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 723,062 | 1x |  |
| small-links-only | devour | 818,197 | 1.13x faster |  |
| small-links-only | yayson | 464,074 | 1.56x slower |  |
| **small-links-only** | **jsona** | **992,392** | **1.37x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 291,206 | 1x |  |
| small-relationships | devour | 248,934 | 1.17x slower |  |
| small-relationships | yayson | 188,375 | 1.55x slower |  |
| **small-relationships** | **jsona** | **302,802** | **1.04x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **412,495** | **1x** |  |
| nested-relationships | devour | 312,507 | 1.32x slower |  |
| nested-relationships | yayson | 243,201 | 1.7x slower |  |
| nested-relationships | jsona | 322,770 | 1.28x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 78,508 | 1x |  |
| collection | devour | 88,330 | 1.13x faster |  |
| collection | yayson | 77,928 | 1.01x slower |  |
| **collection** | **jsona** | **227,227** | **2.89x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 58,228 | 1x |  |
| collection-includes | devour | 111,100 | 1.91x faster |  |
| collection-includes | yayson | 99,918 | 1.72x faster |  |
| **collection-includes** | **jsona** | **119,491** | **2.05x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **1,633,467** | **1x** |  |
| patch-single | devour | 1,411,960 | 1.16x slower |  |
| patch-single | yayson | 671,363 | 2.43x slower |  |
| patch-single | jsona | 1,262,091 | 1.29x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 696,895 | 1x |  |
| empty-relationships | devour | 634,400 | 1.1x slower |  |
| empty-relationships | yayson | 527,175 | 1.32x slower |  |
| **empty-relationships** | **jsona** | **879,203** | **1.26x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **921** | **1x** |  |
| few-includes | devour | 513 | 1.8x slower |  |
| few-includes | yayson | 646 | 1.43x slower |  |
| few-includes | jsona | 566 | 1.63x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **455** | **1x** |  |
| many-includes | devour | 8.05 | 56.49x slower |  |
| many-includes | yayson | 38.91 | 11.69x slower |  |
| many-includes | jsona | 182 | 2.5x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **63.79** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.84 | 76.31x slower |  |
| complex-relationships | jsona | 26.24 | 2.43x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **460** | **1x** |  |
| wide-relationship | devour | 5.17 | 88.96x slower |  |
| wide-relationship | yayson | 22.51 | 20.44x slower |  |
| wide-relationship | jsona | 159 | 2.89x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **371,414** | **1x** |  |
| self-cycle | devour | 261,139 | 1.42x slower |  |
| self-cycle | yayson | 226,857 | 1.64x slower |  |
| self-cycle | jsona | 269,766 | 1.38x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **309,311** | **1x** |  |
| mutual-cycle | devour | 212,352 | 1.46x slower |  |
| mutual-cycle | yayson | 199,306 | 1.55x slower |  |
| mutual-cycle | jsona | 240,330 | 1.29x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,299,019 | 1x |  |
| **small-no-relationships** | **devour** | **2,873,849** | **2.21x faster** |  |
| small-no-relationships | yayson | 1,602,714 | 1.23x faster |  |
| small-no-relationships | jsona | 2,075,557 | 1.6x faster |  |
| small-no-relationships | ts-japi | 662,429 | 1.96x slower |  |
| small-links-only | kitsu-core | 1,531,304 | 1x |  |
| small-links-only | devour | 1,904,116 | 1.24x faster |  |
| small-links-only | yayson | 1,258,827 | 1.22x slower |  |
| **small-links-only** | **jsona** | **2,125,420** | **1.39x faster** |  |
| small-links-only | ts-japi | 557,788 | 2.75x slower |  |
| small-relationships | kitsu-core | 991,371 | 1x |  |
| **small-relationships** | **devour** | **1,189,174** | **1.2x faster** |  |
| small-relationships | yayson | 874,418 | 1.13x slower |  |
| small-relationships | jsona | 950,999 | 1.04x slower |  |
| small-relationships | ts-japi | 386,546 | 2.56x slower |  |
| **nested-relationships** | **kitsu-core** | **1,748,662** | **1x** |  |
| nested-relationships | devour | 1,428,722 | 1.22x slower |  |
| nested-relationships | yayson | 901,796 | 1.94x slower |  |
| nested-relationships | jsona | 934,301 | 1.87x slower |  |
| nested-relationships | ts-japi | 368,779 | 4.74x slower |  |
| collection | kitsu-core | 143,307 | 1x |  |
| collection | devour | 140,058 | 1.02x slower |  |
| collection | yayson | 238,169 | 1.66x faster |  |
| **collection** | **jsona** | **452,883** | **3.16x faster** |  |
| collection | ts-japi | 268,039 | 1.87x faster |  |
| collection-includes | kitsu-core | 50,828 | 1x |  |
| collection-includes | devour | 241,295 | 4.75x faster |  |
| collection-includes | yayson | 241,983 | 4.76x faster |  |
| **collection-includes** | **jsona** | **281,123** | **5.53x faster** |  |
| collection-includes | ts-japi | 153,610 | 3.02x faster |  |
| patch-single | kitsu-core | 3,869,356 | 1x |  |
| **patch-single** | **devour** | **4,593,197** | **1.19x faster** |  |
| patch-single | yayson | 1,629,839 | 2.37x slower |  |
| patch-single | jsona | 2,469,258 | 1.57x slower |  |
| patch-single | ts-japi | 704,247 | 5.49x slower |  |
| empty-relationships | kitsu-core | 1,149,445 | 1x |  |
| **empty-relationships** | **devour** | **1,155,048** | **<1.01x faster** |  |
| empty-relationships | yayson | 950,217 | 1.21x slower |  |
| empty-relationships | jsona | 1,095,582 | 1.05x slower |  |
| empty-relationships | ts-japi | 432,753 | 2.66x slower |  |
| few-includes | kitsu-core | 1,013 | 1x |  |
| **few-includes** | **devour** | **1,568** | **1.55x faster** |  |
| few-includes | yayson | 1,084 | 1.07x faster |  |
| few-includes | jsona | 1,123 | 1.11x faster |  |
| few-includes | ts-japi | 594 | 1.7x slower |  |
| many-includes | kitsu-core | 1,138 | 1x |  |
| **many-includes** | **devour** | **1,687** | **1.48x faster** |  |
| many-includes | yayson | 1,121 | 1.02x slower |  |
| many-includes | jsona | 1,268 | 1.11x faster |  |
| many-includes | ts-japi | 608 | 1.87x slower |  |
| complex-relationships | kitsu-core | 608 | 1x |  |
| **complex-relationships** | **devour** | **1,068** | **1.76x faster** |  |
| complex-relationships | yayson | 1,022 | 1.68x faster |  |
| complex-relationships | jsona | 599 | 1.01x slower |  |
| complex-relationships | ts-japi | 472 | 1.29x slower |  |
| wide-relationship | kitsu-core | 6,201 | 1x |  |
| **wide-relationship** | **devour** | **20,507** | **3.31x faster** |  |
| wide-relationship | yayson | 14,428 | 2.33x faster |  |
| wide-relationship | jsona | 5,470 | 1.13x slower |  |
| wide-relationship | ts-japi | 8,242 | 1.33x faster |  |
| **self-cycle** | **kitsu-core** | **1,824,096** | **1x** |  |
| self-cycle | devour | 1,269,101 | 1.44x slower |  |
| self-cycle | yayson | 841,229 | 2.17x slower |  |
| self-cycle | jsona | 902,898 | 2.02x slower |  |
| self-cycle | ts-japi | 381,594 | 4.78x slower |  |
| **mutual-cycle** | **kitsu-core** | **1,682,050** | **1x** |  |
| mutual-cycle | devour | 1,272,296 | 1.32x slower |  |
| mutual-cycle | yayson | 833,824 | 2.02x slower |  |
| mutual-cycle | jsona | 835,757 | 2.01x slower |  |
| mutual-cycle | ts-japi | 402,521 | 4.18x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 518,649 | 1x |  |
| **small-no-relationships** | **devour** | **690,192** | **1.33x faster** |  |
| small-no-relationships | yayson | 463,100 | 1.12x slower |  |
| small-no-relationships | jsona | 596,032 | 1.15x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 421,073 | 1x |  |
| small-links-only | devour | 462,685 | 1.1x faster |  |
| small-links-only | yayson | 338,347 | 1.24x slower |  |
| **small-links-only** | **jsona** | **528,016** | **1.25x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 181,166 | 1x |  |
| small-relationships | devour | 169,206 | 1.07x slower |  |
| small-relationships | yayson | 143,091 | 1.27x slower |  |
| **small-relationships** | **jsona** | **193,367** | **1.07x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| **nested-relationships** | **kitsu-core** | **258,452** | **1x** |  |
| nested-relationships | devour | 222,509 | 1.16x slower |  |
| nested-relationships | yayson | 184,593 | 1.4x slower |  |
| nested-relationships | jsona | 211,017 | 1.22x slower |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 43,854 | 1x |  |
| collection | devour | 49,494 | 1.13x faster |  |
| collection | yayson | 47,964 | 1.09x faster |  |
| **collection** | **jsona** | **112,040** | **2.55x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 30,463 | 1x |  |
| collection-includes | devour | 65,355 | 2.15x faster |  |
| collection-includes | yayson | 57,440 | 1.89x faster |  |
| **collection-includes** | **jsona** | **78,588** | **2.58x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| **patch-single** | **kitsu-core** | **961,670** | **1x** |  |
| patch-single | devour | 803,449 | 1.2x slower |  |
| patch-single | yayson | 495,552 | 1.94x slower |  |
| patch-single | jsona | 596,767 | 1.61x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 333,176 | 1x |  |
| empty-relationships | devour | 345,792 | 1.04x faster |  |
| empty-relationships | yayson | 323,982 | 1.03x slower |  |
| **empty-relationships** | **jsona** | **392,152** | **1.18x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **379** | **1x** |  |
| few-includes | devour | 328 | 1.16x slower |  |
| few-includes | yayson | 264 | 1.44x slower |  |
| few-includes | jsona | 277 | 1.37x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **253** | **1x** |  |
| many-includes | devour | 7.51 | 33.72x slower |  |
| many-includes | yayson | 36.07 | 7.02x slower |  |
| many-includes | jsona | 135 | 1.88x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **52.68** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.84 | 62.47x slower |  |
| complex-relationships | jsona | 22.17 | 2.38x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **383** | **1x** |  |
| wide-relationship | devour | 5.11 | 74.94x slower |  |
| wide-relationship | yayson | 22.14 | 17.29x slower |  |
| wide-relationship | jsona | 149 | 2.57x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| **self-cycle** | **kitsu-core** | **237,001** | **1x** |  |
| self-cycle | devour | 175,208 | 1.35x slower |  |
| self-cycle | yayson | 166,572 | 1.42x slower |  |
| self-cycle | jsona | 179,194 | 1.32x slower |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **201,114** | **1x** |  |
| mutual-cycle | devour | 158,274 | 1.27x slower |  |
| mutual-cycle | yayson | 147,224 | 1.37x slower |  |
| mutual-cycle | jsona | 163,040 | 1.23x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 53,747 | 1x |  |
| small-no-relationships | kitsu-native | 178,557 | 3.32x faster |  |
| **small-no-relationships** | **fetchja** | **207,108** | **3.85x faster** |  |
| small-no-relationships | devour | 53,053 | 1.01x slower |  |
| small-links-only | kitsu | 54,191 | 1x |  |
| small-links-only | kitsu-native | 170,836 | 3.15x faster |  |
| **small-links-only** | **fetchja** | **188,341** | **3.48x faster** |  |
| small-links-only | devour | 49,874 | 1.09x slower |  |
| small-relationships | kitsu | 39,139 | 1x |  |
| **small-relationships** | **kitsu-native** | **107,114** | **2.74x faster** |  |
| small-relationships | fetchja | 105,513 | 2.7x faster |  |
| small-relationships | devour | 37,609 | 1.04x slower |  |
| nested-relationships | kitsu | 50,863 | 1x |  |
| **nested-relationships** | **kitsu-native** | **133,853** | **2.63x faster** |  |
| nested-relationships | fetchja | 116,845 | 2.3x faster |  |
| nested-relationships | devour | 41,447 | 1.23x slower |  |
| collection | kitsu | 18,630 | 1x |  |
| collection | kitsu-native | 17,881 | 1.04x slower |  |
| **collection** | **fetchja** | **29,728** | **1.6x faster** |  |
| collection | devour | 18,012 | 1.03x slower |  |
| collection-includes | kitsu | 16,172 | 1x |  |
| collection-includes | kitsu-native | 18,823 | 1.16x faster |  |
| **collection-includes** | **fetchja** | **30,744** | **1.9x faster** |  |
| collection-includes | devour | 18,804 | 1.16x faster |  |
| patch-single | kitsu | 60,275 | 1x |  |
| **patch-single** | **kitsu-native** | **248,492** | **4.12x faster** |  |
| patch-single | fetchja | 226,951 | 3.77x faster |  |
| patch-single | devour | 53,559 | 1.13x slower |  |
| empty-relationships | kitsu | 51,897 | 1x |  |
| empty-relationships | kitsu-native | 170,217 | 3.28x faster |  |
| **empty-relationships** | **fetchja** | **188,116** | **3.62x faster** |  |
| empty-relationships | devour | 49,254 | 1.05x slower |  |
| **few-includes** | **kitsu** | **587** | **1x** |  |
| few-includes | kitsu-native | 576 | 1.02x slower |  |
| few-includes | fetchja | 507 | 1.16x slower |  |
| few-includes | devour | 384 | 1.53x slower |  |
| **many-includes** | **kitsu** | **251** | **1x** |  |
| many-includes | kitsu-native | 240 | 1.04x slower |  |
| many-includes | fetchja | 194 | 1.29x slower |  |
| many-includes | devour | 9.85 | 25.46x slower |  |
| complex-relationships | kitsu | 37.02 | 1x |  |
| **complex-relationships** | **kitsu-native** | **39.11** | **1.06x faster** |  |
| complex-relationships | fetchja | 31.38 | 1.18x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| wide-relationship | kitsu | 237 | 1x |  |
| **wide-relationship** | **kitsu-native** | **244** | **1.03x faster** |  |
| wide-relationship | fetchja | 197 | 1.2x slower |  |
| wide-relationship | devour | 6.47 | 36.69x slower |  |
| self-cycle | kitsu | 49,690 | 1x |  |
| **self-cycle** | **kitsu-native** | **135,279** | **2.72x faster** |  |
| self-cycle | fetchja | 117,166 | 2.36x faster |  |
| self-cycle | devour | 42,818 | 1.16x slower |  |
| mutual-cycle | kitsu | 45,862 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **98,158** | **2.14x faster** |  |
| mutual-cycle | fetchja | 88,776 | 1.94x faster |  |
| mutual-cycle | devour | 36,170 | 1.27x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 50,486 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **258,663** | **5.12x faster** |  |
| small-no-relationships | fetchja | 228,097 | 4.52x faster |  |
| small-no-relationships | devour | 47,895 | 1.05x slower |  |
| small-links-only | kitsu | 44,069 | 1x |  |
| **small-links-only** | **kitsu-native** | **262,705** | **5.96x faster** |  |
| small-links-only | fetchja | 234,181 | 5.31x faster |  |
| small-links-only | devour | 44,580 | 1.01x faster |  |
| small-relationships | kitsu | 38,095 | 1x |  |
| **small-relationships** | **kitsu-native** | **199,816** | **5.25x faster** |  |
| small-relationships | fetchja | 160,559 | 4.21x faster |  |
| small-relationships | devour | 39,083 | 1.03x faster |  |
| nested-relationships | kitsu | 48,644 | 1x |  |
| **nested-relationships** | **kitsu-native** | **250,037** | **5.14x faster** |  |
| nested-relationships | fetchja | 171,265 | 3.52x faster |  |
| nested-relationships | devour | 44,927 | 1.08x slower |  |
| collection | kitsu | 21,976 | 1x |  |
| **collection** | **kitsu-native** | **35,151** | **1.6x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 11,835 | 1x |  |
| **collection-includes** | **kitsu-native** | **16,222** | **1.37x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 59,588 | 1x |  |
| **patch-single** | **kitsu-native** | **327,320** | **5.49x faster** |  |
| patch-single | fetchja | 277,141 | 4.65x faster |  |
| patch-single | devour | 52,109 | 1.14x slower |  |
| empty-relationships | kitsu | 46,763 | 1x |  |
| **empty-relationships** | **kitsu-native** | **233,881** | **5x faster** |  |
| empty-relationships | fetchja | 211,763 | 4.53x faster |  |
| empty-relationships | devour | 44,849 | 1.04x slower |  |
| few-includes | kitsu | 534 | 1x |  |
| **few-includes** | **kitsu-native** | **562** | **1.05x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 438 | 1x |  |
| **many-includes** | **kitsu-native** | **449** | **1.02x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 136 | 1x |  |
| **complex-relationships** | **kitsu-native** | **137** | **1.01x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 957 | 1x |  |
| **wide-relationship** | **kitsu-native** | **1,124** | **1.17x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 54,222 | 1x |  |
| **self-cycle** | **kitsu-native** | **286,433** | **5.28x faster** |  |
| self-cycle | fetchja | 209,310 | 3.86x faster |  |
| self-cycle | devour | 42,329 | 1.28x slower |  |
| mutual-cycle | kitsu | 49,424 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **239,948** | **4.85x faster** |  |
| mutual-cycle | fetchja | 205,029 | 4.15x faster |  |
| mutual-cycle | devour | 33,744 | 1.46x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 37,500 | 1x | 18,750 cycles/s |
| small-no-relationships | kitsu-native | 209,122 | 5.58x faster | 104,561 cycles/s |
| **small-no-relationships** | **fetchja** | **212,358** | **5.66x faster** | **106,179 cycles/s** |
| small-no-relationships | devour | 47,616 | 1.27x faster | 23,808 cycles/s |
| small-links-only | kitsu | 52,131 | 1x | 26,066 cycles/s |
| small-links-only | kitsu-native | 203,084 | 3.9x faster | 101,542 cycles/s |
| **small-links-only** | **fetchja** | **208,762** | **4x faster** | **104,381 cycles/s** |
| small-links-only | devour | 39,651 | 1.31x slower | 19,825 cycles/s |
| small-relationships | kitsu | 32,142 | 1x | 16,071 cycles/s |
| small-relationships | kitsu-native | 91,641 | 2.85x faster | 45,820 cycles/s |
| **small-relationships** | **fetchja** | **96,792** | **3.01x faster** | **48,396 cycles/s** |
| small-relationships | devour | 37,043 | 1.15x faster | 18,522 cycles/s |
| nested-relationships | kitsu | 44,098 | 1x | 22,049 cycles/s |
| **nested-relationships** | **kitsu-native** | **145,301** | **3.29x faster** | **72,650 cycles/s** |
| nested-relationships | fetchja | 141,191 | 3.2x faster | 70,596 cycles/s |
| nested-relationships | devour | 37,249 | 1.18x slower | 18,625 cycles/s |
| collection | kitsu | 19,312 | 1x | 9,656 cycles/s |
| **collection** | **kitsu-native** | **21,947** | **1.14x faster** | **10,973 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 15,566 | 1x | 7,783 cycles/s |
| **collection-includes** | **kitsu-native** | **18,229** | **1.17x faster** | **9,115 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 64,041 | 1x | 32,020 cycles/s |
| **patch-single** | **kitsu-native** | **265,019** | **4.14x faster** | **132,509 cycles/s** |
| patch-single | fetchja | 232,762 | 3.63x faster | 116,381 cycles/s |
| patch-single | devour | 52,781 | 1.21x slower | 26,391 cycles/s |
| empty-relationships | kitsu | 50,143 | 1x | 25,072 cycles/s |
| **empty-relationships** | **kitsu-native** | **171,247** | **3.42x faster** | **85,624 cycles/s** |
| empty-relationships | fetchja | 163,194 | 3.25x faster | 81,597 cycles/s |
| empty-relationships | devour | 44,267 | 1.13x slower | 22,134 cycles/s |
| few-includes | kitsu | 476 | 1x | 238 cycles/s |
| **few-includes** | **kitsu-native** | **497** | **1.05x faster** | **249 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 267 | 1x | 134 cycles/s |
| **many-includes** | **kitsu-native** | **300** | **1.12x faster** | **150 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **53.89** | **1x** | **26\.95 cycles/s** |
| complex-relationships | kitsu-native | 53.47 | 1.01x slower | 26\.74 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| **wide-relationship** | **kitsu** | **397** | **1x** | **198 cycles/s** |
| wide-relationship | kitsu-native | 393 | 1.01x slower | 197 cycles/s |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 48,498 | 1x | 24,249 cycles/s |
| **self-cycle** | **kitsu-native** | **151,799** | **3.13x faster** | **75,900 cycles/s** |
| self-cycle | fetchja | 132,360 | 2.73x faster | 66,180 cycles/s |
| self-cycle | devour | 37,613 | 1.29x slower | 18,807 cycles/s |
| mutual-cycle | kitsu | 44,669 | 1x | 22,334 cycles/s |
| **mutual-cycle** | **kitsu-native** | **124,013** | **2.78x faster** | **62,007 cycles/s** |
| mutual-cycle | fetchja | 105,556 | 2.36x faster | 52,778 cycles/s |
| mutual-cycle | devour | 37,131 | 1.2x slower | 18,565 cycles/s |

</details>

### node v26\.5\.0

Base commit (local changes measured): `499840183b8b1cb8aa51904e9ff1311226fbc125`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Built package fingerprint: `5033a2ae742fcb23f3d2899f04ddc2455a7e93e61454f13d0e6bc1b74b99d25e`.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, kitsu-native 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, ts-japi 1\.12\.6.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,188,641 | 1x |  |
| **small-no-relationships** | **devour** | **1,666,976** | **1.4x faster** |  |
| small-no-relationships | yayson | 769,841 | 1.54x slower |  |
| small-no-relationships | jsona | 1,592,401 | 1.34x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 882,323 | 1x |  |
| small-links-only | devour | 783,192 | 1.13x slower |  |
| small-links-only | yayson | 593,908 | 1.49x slower |  |
| **small-links-only** | **jsona** | **1,456,000** | **1.65x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 286,212 | 1x |  |
| small-relationships | devour | 228,050 | 1.26x slower |  |
| small-relationships | yayson | 174,850 | 1.64x slower |  |
| **small-relationships** | **jsona** | **353,959** | **1.24x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 362,223 | 1x |  |
| nested-relationships | devour | 265,350 | 1.37x slower |  |
| nested-relationships | yayson | 228,089 | 1.59x slower |  |
| **nested-relationships** | **jsona** | **406,657** | **1.12x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 79,705 | 1x |  |
| collection | devour | 60,670 | 1.31x slower |  |
| collection | yayson | 116,028 | 1.46x faster |  |
| **collection** | **jsona** | **293,240** | **3.68x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 55,910 | 1x |  |
| collection-includes | devour | 80,783 | 1.44x faster |  |
| collection-includes | yayson | 98,716 | 1.77x faster |  |
| **collection-includes** | **jsona** | **122,697** | **2.19x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,897,968 | 1x |  |
| **patch-single** | **devour** | **2,074,435** | **1.09x faster** |  |
| patch-single | yayson | 796,449 | 2.38x slower |  |
| patch-single | jsona | 1,960,449 | 1.03x faster |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 896,944 | 1x |  |
| empty-relationships | devour | 528,708 | 1.7x slower |  |
| empty-relationships | yayson | 622,668 | 1.44x slower |  |
| **empty-relationships** | **jsona** | **1,193,100** | **1.33x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| **few-includes** | **kitsu-core** | **548** | **1x** |  |
| few-includes | devour | 362 | 1.52x slower |  |
| few-includes | yayson | 410 | 1.34x slower |  |
| few-includes | jsona | 449 | 1.22x slower |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **230** | **1x** |  |
| many-includes | devour | 3.84 | 59.87x slower |  |
| many-includes | yayson | 17.41 | 13.22x slower |  |
| many-includes | jsona | 134 | 1.72x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **30.64** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.42 | 72.29x slower |  |
| complex-relationships | jsona | 21.65 | 1.42x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **222** | **1x** |  |
| wide-relationship | devour | 2.69 | 82.67x slower |  |
| wide-relationship | yayson | 10.72 | 20.71x slower |  |
| wide-relationship | jsona | 122 | 1.83x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 299,350 | 1x |  |
| self-cycle | devour | 120,589 | 2.48x slower |  |
| self-cycle | yayson | 193,646 | 1.55x slower |  |
| **self-cycle** | **jsona** | **323,995** | **1.08x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| **mutual-cycle** | **kitsu-core** | **257,571** | **1x** |  |
| mutual-cycle | devour | 161,513 | 1.59x slower |  |
| mutual-cycle | yayson | 164,897 | 1.56x slower |  |
| mutual-cycle | jsona | 255,934 | 1.01x slower |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,648,549 | 1x |  |
| small-no-relationships | devour | 2,532,676 | 1.54x faster |  |
| small-no-relationships | yayson | 1,590,552 | 1.04x slower |  |
| **small-no-relationships** | **jsona** | **3,010,433** | **1.83x faster** |  |
| small-no-relationships | ts-japi | 670,282 | 2.46x slower |  |
| small-links-only | kitsu-core | 1,681,772 | 1x |  |
| small-links-only | devour | 1,254,355 | 1.34x slower |  |
| small-links-only | yayson | 1,274,750 | 1.32x slower |  |
| **small-links-only** | **jsona** | **2,970,423** | **1.77x faster** |  |
| small-links-only | ts-japi | 643,060 | 2.62x slower |  |
| small-relationships | kitsu-core | 819,938 | 1x |  |
| small-relationships | devour | 752,090 | 1.09x slower |  |
| small-relationships | yayson | 697,082 | 1.18x slower |  |
| **small-relationships** | **jsona** | **1,399,936** | **1.71x faster** |  |
| small-relationships | ts-japi | 409,484 | 2x slower |  |
| nested-relationships | kitsu-core | 1,395,035 | 1x |  |
| nested-relationships | devour | 868,690 | 1.61x slower |  |
| nested-relationships | yayson | 806,459 | 1.73x slower |  |
| **nested-relationships** | **jsona** | **1,782,846** | **1.28x faster** |  |
| nested-relationships | ts-japi | 463,919 | 3.01x slower |  |
| collection | kitsu-core | 175,283 | 1x |  |
| collection | devour | 72,036 | 2.43x slower |  |
| collection | yayson | 204,670 | 1.17x faster |  |
| **collection** | **jsona** | **749,257** | **4.27x faster** |  |
| collection | ts-japi | 226,402 | 1.29x faster |  |
| collection-includes | kitsu-core | 54,928 | 1x |  |
| collection-includes | devour | 157,810 | 2.87x faster |  |
| collection-includes | yayson | 235,901 | 4.29x faster |  |
| **collection-includes** | **jsona** | **373,887** | **6.81x faster** |  |
| collection-includes | ts-japi | 145,924 | 2.66x faster |  |
| patch-single | kitsu-core | 4,141,814 | 1x |  |
| **patch-single** | **devour** | **5,657,438** | **1.37x faster** |  |
| patch-single | yayson | 2,115,632 | 1.96x slower |  |
| patch-single | jsona | 4,705,770 | 1.14x faster |  |
| patch-single | ts-japi | 730,877 | 5.67x slower |  |
| empty-relationships | kitsu-core | 1,262,858 | 1x |  |
| empty-relationships | devour | 773,460 | 1.63x slower |  |
| empty-relationships | yayson | 836,847 | 1.51x slower |  |
| **empty-relationships** | **jsona** | **1,732,104** | **1.37x faster** |  |
| empty-relationships | ts-japi | 468,389 | 2.7x slower |  |
| few-includes | kitsu-core | 629 | 1x |  |
| few-includes | devour | 833 | 1.32x faster |  |
| few-includes | yayson | 652 | 1.04x faster |  |
| **few-includes** | **jsona** | **1,637** | **2.6x faster** |  |
| few-includes | ts-japi | 356 | 1.77x slower |  |
| many-includes | kitsu-core | 719 | 1x |  |
| many-includes | devour | 605 | 1.19x slower |  |
| many-includes | yayson | 571 | 1.26x slower |  |
| **many-includes** | **jsona** | **1,515** | **2.11x faster** |  |
| many-includes | ts-japi | 257 | 2.79x slower |  |
| complex-relationships | kitsu-core | 264 | 1x |  |
| complex-relationships | devour | 424 | 1.6x faster |  |
| complex-relationships | yayson | 312 | 1.18x faster |  |
| **complex-relationships** | **jsona** | **490** | **1.85x faster** |  |
| complex-relationships | ts-japi | 191 | 1.39x slower |  |
| wide-relationship | kitsu-core | 2,690 | 1x |  |
| **wide-relationship** | **devour** | **8,499** | **3.16x faster** |  |
| wide-relationship | yayson | 6,538 | 2.43x faster |  |
| wide-relationship | jsona | 4,160 | 1.55x faster |  |
| wide-relationship | ts-japi | 8,323 | 3.09x faster |  |
| self-cycle | kitsu-core | 1,358,823 | 1x |  |
| self-cycle | devour | 713,199 | 1.91x slower |  |
| self-cycle | yayson | 789,258 | 1.72x slower |  |
| **self-cycle** | **jsona** | **1,460,795** | **1.08x faster** |  |
| self-cycle | ts-japi | 391,727 | 3.47x slower |  |
| mutual-cycle | kitsu-core | 1,438,919 | 1x |  |
| mutual-cycle | devour | 851,638 | 1.69x slower |  |
| mutual-cycle | yayson | 818,244 | 1.76x slower |  |
| **mutual-cycle** | **jsona** | **1,732,789** | **1.2x faster** |  |
| mutual-cycle | ts-japi | 437,794 | 3.29x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 665,721 | 1x |  |
| **small-no-relationships** | **devour** | **915,372** | **1.38x faster** |  |
| small-no-relationships | yayson | 454,665 | 1.46x slower |  |
| small-no-relationships | jsona | 886,179 | 1.33x faster |  |
| small-no-relationships | ts-japi | unsupported | — | no public decoder |
| small-links-only | kitsu-core | 558,209 | 1x |  |
| small-links-only | devour | 451,277 | 1.24x slower |  |
| small-links-only | yayson | 376,271 | 1.48x slower |  |
| **small-links-only** | **jsona** | **876,160** | **1.57x faster** |  |
| small-links-only | ts-japi | unsupported | — | no public decoder |
| small-relationships | kitsu-core | 191,943 | 1x |  |
| small-relationships | devour | 159,182 | 1.21x slower |  |
| small-relationships | yayson | 129,267 | 1.48x slower |  |
| **small-relationships** | **jsona** | **253,432** | **1.32x faster** |  |
| small-relationships | ts-japi | unsupported | — | no public decoder |
| nested-relationships | kitsu-core | 261,760 | 1x |  |
| nested-relationships | devour | 193,123 | 1.36x slower |  |
| nested-relationships | yayson | 163,952 | 1.6x slower |  |
| **nested-relationships** | **jsona** | **292,546** | **1.12x faster** |  |
| nested-relationships | ts-japi | unsupported | — | no public decoder |
| collection | kitsu-core | 49,531 | 1x |  |
| collection | devour | 31,311 | 1.58x slower |  |
| collection | yayson | 69,917 | 1.41x faster |  |
| **collection** | **jsona** | **156,493** | **3.16x faster** |  |
| collection | ts-japi | unsupported | — | no public decoder |
| collection-includes | kitsu-core | 28,779 | 1x |  |
| collection-includes | devour | 48,137 | 1.67x faster |  |
| collection-includes | yayson | 58,017 | 2.02x faster |  |
| **collection-includes** | **jsona** | **75,499** | **2.62x faster** |  |
| collection-includes | ts-japi | unsupported | — | no public decoder |
| patch-single | kitsu-core | 1,249,979 | 1x |  |
| **patch-single** | **devour** | **1,383,095** | **1.11x faster** |  |
| patch-single | yayson | 545,715 | 2.29x slower |  |
| patch-single | jsona | 1,234,775 | 1.01x slower |  |
| patch-single | ts-japi | unsupported | — | no public decoder |
| empty-relationships | kitsu-core | 466,337 | 1x |  |
| empty-relationships | devour | 284,519 | 1.64x slower |  |
| empty-relationships | yayson | 285,827 | 1.63x slower |  |
| **empty-relationships** | **jsona** | **607,339** | **1.3x faster** |  |
| empty-relationships | ts-japi | unsupported | — | no public decoder |
| few-includes | kitsu-core | 292 | 1x |  |
| few-includes | devour | 216 | 1.35x slower |  |
| few-includes | yayson | 193 | 1.51x slower |  |
| **few-includes** | **jsona** | **311** | **1.07x faster** |  |
| few-includes | ts-japi | unsupported | — | no public decoder |
| **many-includes** | **kitsu-core** | **160** | **1x** |  |
| many-includes | devour | 3.84 | 41.75x slower |  |
| many-includes | yayson | 15.09 | 10.61x slower |  |
| many-includes | jsona | 116 | 1.39x slower |  |
| many-includes | ts-japi | unsupported | — | no public decoder |
| **complex-relationships** | **kitsu-core** | **24.93** | **1x** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.43 | 57.74x slower |  |
| complex-relationships | jsona | 19.52 | 1.28x slower |  |
| complex-relationships | ts-japi | unsupported | — | no public decoder |
| **wide-relationship** | **kitsu-core** | **189** | **1x** |  |
| wide-relationship | devour | 2.77 | 68.2x slower |  |
| wide-relationship | yayson | 10.42 | 18.13x slower |  |
| wide-relationship | jsona | 115 | 1.65x slower |  |
| wide-relationship | ts-japi | unsupported | — | no public decoder |
| self-cycle | kitsu-core | 226,695 | 1x |  |
| self-cycle | devour | 147,979 | 1.53x slower |  |
| self-cycle | yayson | 141,214 | 1.61x slower |  |
| **self-cycle** | **jsona** | **239,384** | **1.06x faster** |  |
| self-cycle | ts-japi | unsupported | — | no public decoder |
| mutual-cycle | kitsu-core | 205,123 | 1x |  |
| mutual-cycle | devour | 130,774 | 1.57x slower |  |
| mutual-cycle | yayson | 126,796 | 1.62x slower |  |
| **mutual-cycle** | **jsona** | **208,529** | **1.02x faster** |  |
| mutual-cycle | ts-japi | unsupported | — | no public decoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 53,778 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **90,172** | **1.68x faster** |  |
| small-no-relationships | fetchja | 76,789 | 1.43x faster |  |
| small-no-relationships | devour | 46,486 | 1.16x slower |  |
| small-links-only | kitsu | 51,841 | 1x |  |
| **small-links-only** | **kitsu-native** | **84,316** | **1.63x faster** |  |
| small-links-only | fetchja | 73,461 | 1.42x faster |  |
| small-links-only | devour | 41,791 | 1.24x slower |  |
| small-relationships | kitsu | 38,300 | 1x |  |
| **small-relationships** | **kitsu-native** | **51,724** | **1.35x faster** |  |
| small-relationships | fetchja | 48,794 | 1.27x faster |  |
| small-relationships | devour | 31,445 | 1.22x slower |  |
| nested-relationships | kitsu | 40,971 | 1x |  |
| **nested-relationships** | **kitsu-native** | **58,557** | **1.43x faster** |  |
| nested-relationships | fetchja | 51,386 | 1.25x faster |  |
| nested-relationships | devour | 33,700 | 1.22x slower |  |
| **collection** | **kitsu** | **15,194** | **1x** |  |
| collection | kitsu-native | 12,218 | 1.24x slower |  |
| collection | fetchja | 13,469 | 1.13x slower |  |
| collection | devour | 13,681 | 1.11x slower |  |
| collection-includes | kitsu | 14,709 | 1x |  |
| collection-includes | kitsu-native | 11,618 | 1.27x slower |  |
| collection-includes | fetchja | 12,901 | 1.14x slower |  |
| **collection-includes** | **devour** | **15,365** | **1.04x faster** |  |
| patch-single | kitsu | 59,178 | 1x |  |
| **patch-single** | **kitsu-native** | **109,993** | **1.86x faster** |  |
| patch-single | fetchja | 85,959 | 1.45x faster |  |
| patch-single | devour | 49,780 | 1.19x slower |  |
| empty-relationships | kitsu | 50,033 | 1x |  |
| **empty-relationships** | **kitsu-native** | **86,747** | **1.73x faster** |  |
| empty-relationships | fetchja | 69,138 | 1.38x faster |  |
| empty-relationships | devour | 41,277 | 1.21x slower |  |
| **few-includes** | **kitsu** | **347** | **1x** |  |
| few-includes | kitsu-native | 310 | 1.12x slower |  |
| few-includes | fetchja | 279 | 1.24x slower |  |
| few-includes | devour | 239 | 1.45x slower |  |
| **many-includes** | **kitsu** | **141** | **1x** |  |
| many-includes | kitsu-native | 119 | 1.18x slower |  |
| many-includes | fetchja | 117 | 1.21x slower |  |
| many-includes | devour | 6.21 | 22.69x slower |  |
| complex-relationships | kitsu | 20.45 | 1x |  |
| **complex-relationships** | **kitsu-native** | **21.38** | **1.05x faster** |  |
| complex-relationships | fetchja | 15.88 | 1.29x slower |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| **wide-relationship** | **kitsu** | **147** | **1x** |  |
| wide-relationship | kitsu-native | 127 | 1.16x slower |  |
| wide-relationship | fetchja | 107 | 1.37x slower |  |
| wide-relationship | devour | 3.16 | 46.6x slower |  |
| self-cycle | kitsu | 36,448 | 1x |  |
| **self-cycle** | **kitsu-native** | **37,616** | **1.03x faster** |  |
| self-cycle | fetchja | 32,322 | 1.13x slower |  |
| self-cycle | devour | 28,773 | 1.27x slower |  |
| mutual-cycle | kitsu | 35,501 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **51,063** | **1.44x faster** |  |
| mutual-cycle | fetchja | 41,329 | 1.16x faster |  |
| mutual-cycle | devour | 27,627 | 1.28x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 46,084 | 1x |  |
| **small-no-relationships** | **kitsu-native** | **249,526** | **5.41x faster** |  |
| small-no-relationships | fetchja | 181,209 | 3.93x faster |  |
| small-no-relationships | devour | 45,911 | <1.01x slower |  |
| small-links-only | kitsu | 47,625 | 1x |  |
| **small-links-only** | **kitsu-native** | **247,629** | **5.2x faster** |  |
| small-links-only | fetchja | 177,253 | 3.72x faster |  |
| small-links-only | devour | 43,021 | 1.11x slower |  |
| small-relationships | kitsu | 38,464 | 1x |  |
| **small-relationships** | **kitsu-native** | **161,562** | **4.2x faster** |  |
| small-relationships | fetchja | 132,046 | 3.43x faster |  |
| small-relationships | devour | 35,006 | 1.1x slower |  |
| nested-relationships | kitsu | 44,469 | 1x |  |
| **nested-relationships** | **kitsu-native** | **215,351** | **4.84x faster** |  |
| nested-relationships | fetchja | 155,377 | 3.49x faster |  |
| nested-relationships | devour | 37,418 | 1.19x slower |  |
| collection | kitsu | 20,236 | 1x |  |
| **collection** | **kitsu-native** | **33,936** | **1.68x faster** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 11,196 | 1x |  |
| **collection-includes** | **kitsu-native** | **15,174** | **1.36x faster** |  |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 53,948 | 1x |  |
| **patch-single** | **kitsu-native** | **359,558** | **6.66x faster** |  |
| patch-single | fetchja | 227,129 | 4.21x faster |  |
| patch-single | devour | 51,421 | 1.05x slower |  |
| empty-relationships | kitsu | 43,670 | 1x |  |
| **empty-relationships** | **kitsu-native** | **215,127** | **4.93x faster** |  |
| empty-relationships | fetchja | 160,838 | 3.68x faster |  |
| empty-relationships | devour | 38,883 | 1.12x slower |  |
| few-includes | kitsu | 259 | 1x |  |
| **few-includes** | **kitsu-native** | **279** | **1.08x faster** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 269 | 1x |  |
| **many-includes** | **kitsu-native** | **283** | **1.05x faster** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 93.84 | 1x |  |
| **complex-relationships** | **kitsu-native** | **109** | **1.16x faster** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 777 | 1x |  |
| **wide-relationship** | **kitsu-native** | **889** | **1.15x faster** |  |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 37,214 | 1x |  |
| **self-cycle** | **kitsu-native** | **207,791** | **5.58x faster** |  |
| self-cycle | fetchja | 144,028 | 3.87x faster |  |
| self-cycle | devour | 35,552 | 1.05x slower |  |
| mutual-cycle | kitsu | 42,888 | 1x |  |
| **mutual-cycle** | **kitsu-native** | **201,835** | **4.71x faster** |  |
| mutual-cycle | fetchja | 145,122 | 3.38x faster |  |
| mutual-cycle | devour | 37,561 | 1.14x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 49,796 | 1x | 24,898 cycles/s |
| **small-no-relationships** | **kitsu-native** | **115,857** | **2.33x faster** | **57,929 cycles/s** |
| small-no-relationships | fetchja | 100,261 | 2.01x faster | 50,130 cycles/s |
| small-no-relationships | devour | 44,755 | 1.11x slower | 22,378 cycles/s |
| small-links-only | kitsu | 48,651 | 1x | 24,325 cycles/s |
| **small-links-only** | **kitsu-native** | **114,870** | **2.36x faster** | **57,435 cycles/s** |
| small-links-only | fetchja | 93,093 | 1.91x faster | 46,546 cycles/s |
| small-links-only | devour | 41,985 | 1.16x slower | 20,992 cycles/s |
| small-relationships | kitsu | 36,836 | 1x | 18,418 cycles/s |
| **small-relationships** | **kitsu-native** | **66,145** | **1.8x faster** | **33,073 cycles/s** |
| small-relationships | fetchja | 58,320 | 1.58x faster | 29,160 cycles/s |
| small-relationships | devour | 31,743 | 1.16x slower | 15,872 cycles/s |
| nested-relationships | kitsu | 41,232 | 1x | 20,616 cycles/s |
| **nested-relationships** | **kitsu-native** | **83,816** | **2.03x faster** | **41,908 cycles/s** |
| nested-relationships | fetchja | 68,010 | 1.65x faster | 34,005 cycles/s |
| nested-relationships | devour | 35,527 | 1.16x slower | 17,764 cycles/s |
| collection | kitsu | 16,980 | 1x | 8,490 cycles/s |
| **collection** | **kitsu-native** | **17,244** | **1.02x faster** | **8,622 cycles/s** |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 12,580 | 1x | 6,290 cycles/s |
| **collection-includes** | **kitsu-native** | **13,237** | **1.05x faster** | **6,619 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 54,309 | 1x | 27,154 cycles/s |
| **patch-single** | **kitsu-native** | **158,565** | **2.92x faster** | **79,283 cycles/s** |
| patch-single | fetchja | 114,563 | 2.11x faster | 57,282 cycles/s |
| patch-single | devour | 49,087 | 1.11x slower | 24,543 cycles/s |
| empty-relationships | kitsu | 44,486 | 1x | 22,243 cycles/s |
| **empty-relationships** | **kitsu-native** | **98,440** | **2.21x faster** | **49,220 cycles/s** |
| empty-relationships | fetchja | 89,123 | 2x faster | 44,562 cycles/s |
| empty-relationships | devour | 39,008 | 1.14x slower | 19,504 cycles/s |
| **few-includes** | **kitsu** | **284** | **1x** | **142 cycles/s** |
| few-includes | kitsu-native | 281 | 1.01x slower | 140 cycles/s |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 163 | 1x | 81\.37 cycles/s |
| **many-includes** | **kitsu-native** | **174** | **1.07x faster** | **87\.11 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **34.59** | **1x** | **17\.29 cycles/s** |
| complex-relationships | kitsu-native | 32.31 | 1.07x slower | 16\.16 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| wide-relationship | kitsu | 226 | 1x | 113 cycles/s |
| **wide-relationship** | **kitsu-native** | **230** | **1.02x faster** | **115 cycles/s** |
| wide-relationship | fetchja | unsupported | — | public client writes single resources only |
| wide-relationship | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 32,350 | 1x | 16,175 cycles/s |
| **self-cycle** | **kitsu-native** | **68,863** | **2.13x faster** | **34,431 cycles/s** |
| self-cycle | fetchja | 57,624 | 1.78x faster | 28,812 cycles/s |
| self-cycle | devour | 32,089 | 1.01x slower | 16,045 cycles/s |
| mutual-cycle | kitsu | 37,541 | 1x | 18,771 cycles/s |
| **mutual-cycle** | **kitsu-native** | **66,500** | **1.77x faster** | **33,250 cycles/s** |
| mutual-cycle | fetchja | 57,496 | 1.53x faster | 28,748 cycles/s |
| mutual-cycle | devour | 29,981 | 1.25x slower | 14,991 cycles/s |

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
