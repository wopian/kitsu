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

- JSON-API 1.0 compliant
- Automatically links relationships to data
- Works in Node & browsers

<!-- benchmark:start -->
## Benchmarks

JSON:API codec operations/s and mocked client requests/s. Higher is faster. No network traffic.

Median of five samples after warmup. Codec timings exclude JSON text parsing/stringification. Client timings include native client conversion and mocked transport overhead.

Bold rows mark the fastest library per runtime, suite, mode, and scenario, including ties. Multipliers compare codecs with kitsu-core and clients with kitsu (1x). A 3x slower library runs at one third the reference rate. Missing reference scores show —.

Reproduce: `bun run build && bun run benchmark`. Quick check: `bun run benchmark:smoke`.

[CI run and raw results](https://github.com/wopian/kitsu/actions/runs/38491991652)

### bun 1\.4\.3

Measured commit: `70d3f7029f76c2922b96b661ae4831beb12db1b1`. Runner: linux x64, AMD EPYC 7763 64-Core Processor.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, deserialize-json-api 2\.0\.0.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| **small-no-relationships** | **kitsu-core** | **1,760,140** | **1x** |  |
| small-no-relationships | devour | 1,708,593 | 1.03x slower |  |
| small-no-relationships | yayson | 870,930 | 2.02x slower |  |
| small-no-relationships | jsona | 1,305,609 | 1.35x slower |  |
| small-no-relationships | deserialize-json-api | 481,741 | 3.65x slower |  |
| **small-links-only** | **kitsu-core** | **1,520,059** | **1x** |  |
| small-links-only | devour | 980,015 | 1.55x slower |  |
| small-links-only | yayson | 550,828 | 2.76x slower |  |
| small-links-only | jsona | 1,164,918 | 1.3x slower |  |
| small-links-only | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| **small-relationships** | **kitsu-core** | **404,984** | **1x** |  |
| small-relationships | devour | 288,150 | 1.41x slower |  |
| small-relationships | yayson | 200,622 | 2.02x slower |  |
| small-relationships | jsona | 334,510 | 1.21x slower |  |
| small-relationships | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| **nested-relationships** | **kitsu-core** | **478,876** | **1x** |  |
| nested-relationships | devour | 343,742 | 1.39x slower |  |
| nested-relationships | yayson | 281,493 | 1.7x slower |  |
| nested-relationships | jsona | 354,198 | 1.35x slower |  |
| nested-relationships | deserialize-json-api | 212,618 | 2.25x slower |  |
| collection | kitsu-core | 152,124 | 1x |  |
| collection | devour | 93,997 | 1.62x slower |  |
| collection | yayson | 71,594 | 2.12x slower |  |
| **collection** | **jsona** | **225,998** | **1.49x faster** |  |
| collection | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| **collection-includes** | **kitsu-core** | **147,792** | **1x** |  |
| collection-includes | devour | 122,649 | 1.2x slower |  |
| collection-includes | yayson | 96,753 | 1.53x slower |  |
| collection-includes | jsona | 123,728 | 1.19x slower |  |
| collection-includes | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| **patch-single** | **kitsu-core** | **1,701,077** | **1x** |  |
| patch-single | devour | 1,519,194 | 1.12x slower |  |
| patch-single | yayson | 828,929 | 2.05x slower |  |
| patch-single | jsona | 1,268,693 | 1.34x slower |  |
| patch-single | deserialize-json-api | 675,157 | 2.52x slower |  |
| empty-relationships | kitsu-core | incorrect | 1x | decoded null relationship differs: author |
| empty-relationships | devour | 586,039 | — |  |
| empty-relationships | yayson | 610,401 | — |  |
| **empty-relationships** | **jsona** | **846,654** | **—** |  |
| empty-relationships | deserialize-json-api | error | — | null is not an object \(evaluating 'relationship\.type'\) |
| **few-includes** | **kitsu-core** | **609** | **1x** |  |
| few-includes | devour | 451 | 1.35x slower |  |
| few-includes | yayson | 547 | 1.11x slower |  |
| few-includes | jsona | 545 | 1.12x slower |  |
| few-includes | deserialize-json-api | 125 | 4.87x slower |  |
| many-includes | kitsu-core | 12.44 | 1x |  |
| many-includes | devour | 5.61 | 2.22x slower |  |
| many-includes | yayson | 30.87 | 2.48x faster |  |
| **many-includes** | **jsona** | **172** | **13.82x faster** |  |
| many-includes | deserialize-json-api | 22.63 | 1.82x faster |  |
| complex-relationships | kitsu-core | 0.36 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.66 | 1.81x faster |  |
| **complex-relationships** | **jsona** | **22.34** | **61.39x faster** |  |
| complex-relationships | deserialize-json-api | 0.43 | 1.19x faster |  |
| **self-cycle** | **kitsu-core** | **382,234** | **1x** |  |
| self-cycle | devour | 287,119 | 1.33x slower |  |
| self-cycle | yayson | 249,952 | 1.53x slower |  |
| self-cycle | jsona | 311,274 | 1.23x slower |  |
| self-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded\. |
| **mutual-cycle** | **kitsu-core** | **314,295** | **1x** |  |
| mutual-cycle | devour | 235,547 | 1.33x slower |  |
| mutual-cycle | yayson | 199,759 | 1.57x slower |  |
| mutual-cycle | jsona | 252,410 | 1.25x slower |  |
| mutual-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded\. |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,532,997 | 1x |  |
| **small-no-relationships** | **devour** | **3,533,135** | **2.3x faster** |  |
| small-no-relationships | yayson | 1,940,880 | 1.27x faster |  |
| small-no-relationships | jsona | 2,239,065 | 1.46x faster |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 1,518,627 | 1x |  |
| small-links-only | devour | 2,056,252 | 1.35x faster |  |
| small-links-only | yayson | 1,642,714 | 1.08x faster |  |
| **small-links-only** | **jsona** | **2,273,973** | **1.5x faster** |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 950,078 | 1x |  |
| **small-relationships** | **devour** | **1,281,490** | **1.35x faster** |  |
| small-relationships | yayson | 825,243 | 1.15x slower |  |
| small-relationships | jsona | 942,654 | 1.01x slower |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 1,138,698 | 1x |  |
| **nested-relationships** | **devour** | **1,343,262** | **1.18x faster** |  |
| nested-relationships | yayson | 1,003,833 | 1.13x slower |  |
| nested-relationships | jsona | 1,221,434 | 1.07x faster |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | 334,081 | 1x |  |
| collection | devour | 154,183 | 2.17x slower |  |
| collection | yayson | 220,373 | 1.52x slower |  |
| **collection** | **jsona** | **498,126** | **1.49x faster** |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | incorrect | 1x | encoded relationship contains resource object |
| collection-includes | devour | 212,095 | — |  |
| **collection-includes** | **yayson** | **278,546** | **—** |  |
| collection-includes | jsona | 240,424 | — |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 1,459,767 | 1x |  |
| **patch-single** | **devour** | **4,728,147** | **3.24x faster** |  |
| patch-single | yayson | 1,925,078 | 1.32x faster |  |
| patch-single | jsona | 2,446,873 | 1.68x faster |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | 1,126,561 | 1x |  |
| **empty-relationships** | **devour** | **1,174,467** | **1.04x faster** |  |
| empty-relationships | yayson | 879,724 | 1.28x slower |  |
| empty-relationships | jsona | 1,066,316 | 1.06x slower |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 1,146 | 1x |  |
| **few-includes** | **devour** | **1,450** | **1.27x faster** |  |
| few-includes | yayson | 1,090 | 1.05x slower |  |
| few-includes | jsona | 855 | 1.34x slower |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 1,070 | 1x |  |
| **many-includes** | **devour** | **1,246** | **1.16x faster** |  |
| many-includes | yayson | 1,073 | <1.01x faster |  |
| many-includes | jsona | 992 | 1.08x slower |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 476 | 1x |  |
| complex-relationships | devour | 643 | 1.35x faster |  |
| **complex-relationships** | **yayson** | **659** | **1.39x faster** |  |
| complex-relationships | jsona | 437 | 1.09x slower |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 1,193,632 | 1x |  |
| **self-cycle** | **devour** | **1,481,504** | **1.24x faster** |  |
| self-cycle | yayson | 1,013,380 | 1.18x slower |  |
| self-cycle | jsona | 1,044,925 | 1.14x slower |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 1,137,399 | 1x |  |
| **mutual-cycle** | **devour** | **1,536,447** | **1.35x faster** |  |
| mutual-cycle | yayson | 948,002 | 1.2x slower |  |
| mutual-cycle | jsona | 1,108,093 | 1.03x slower |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 662,350 | 1x |  |
| **small-no-relationships** | **devour** | **772,938** | **1.17x faster** |  |
| small-no-relationships | yayson | 525,389 | 1.26x slower |  |
| small-no-relationships | jsona | 682,092 | 1.03x faster |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 584,947 | 1x |  |
| small-links-only | devour | 528,410 | 1.11x slower |  |
| small-links-only | yayson | 364,124 | 1.61x slower |  |
| **small-links-only** | **jsona** | **593,923** | **1.02x faster** |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| **small-relationships** | **kitsu-core** | **232,103** | **1x** |  |
| small-relationships | devour | 201,440 | 1.15x slower |  |
| small-relationships | yayson | 155,286 | 1.49x slower |  |
| small-relationships | jsona | 195,493 | 1.19x slower |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| **nested-relationships** | **kitsu-core** | **261,306** | **1x** |  |
| nested-relationships | devour | 240,140 | 1.09x slower |  |
| nested-relationships | yayson | 192,280 | 1.36x slower |  |
| nested-relationships | jsona | 212,982 | 1.23x slower |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | incorrect | 1x | encoded request differs from expected attributes or linkage |
| collection | devour | 46,561 | — |  |
| collection | yayson | 44,524 | — |  |
| **collection** | **jsona** | **115,621** | **—** |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | 70,502 | 1x |  |
| collection-includes | devour | 59,860 | 1.18x slower |  |
| collection-includes | yayson | 60,629 | 1.16x slower |  |
| **collection-includes** | **jsona** | **70,865** | **1.01x faster** |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 632,681 | 1x |  |
| **patch-single** | **devour** | **929,862** | **1.47x faster** |  |
| patch-single | yayson | 543,904 | 1.16x slower |  |
| patch-single | jsona | 670,477 | 1.06x faster |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | incorrect | 1x | decoded null relationship differs: author |
| empty-relationships | devour | 332,578 | — |  |
| empty-relationships | yayson | 310,943 | — |  |
| **empty-relationships** | **jsona** | **379,790** | **—** |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 254 | 1x |  |
| **few-includes** | **devour** | **279** | **1.1x faster** |  |
| few-includes | yayson | 245 | 1.04x slower |  |
| few-includes | jsona | 257 | 1.01x faster |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 11.57 | 1x |  |
| many-includes | devour | 5.33 | 2.17x slower |  |
| many-includes | yayson | 28.37 | 2.45x faster |  |
| **many-includes** | **jsona** | **119** | **10.25x faster** |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 0.34 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.72 | 2.11x faster |  |
| **complex-relationships** | **jsona** | **20.72** | **60.81x faster** |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| **self-cycle** | **kitsu-core** | **229,563** | **1x** |  |
| self-cycle | devour | 208,515 | 1.1x slower |  |
| self-cycle | yayson | 178,250 | 1.29x slower |  |
| self-cycle | jsona | 201,274 | 1.14x slower |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| **mutual-cycle** | **kitsu-core** | **182,414** | **1x** |  |
| mutual-cycle | devour | 179,202 | 1.02x slower |  |
| mutual-cycle | yayson | 149,451 | 1.22x slower |  |
| mutual-cycle | jsona | 169,027 | 1.08x slower |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 59,522 | 1x |  |
| **small-no-relationships** | **fetchja** | **216,707** | **3.64x faster** |  |
| small-no-relationships | devour | 50,200 | 1.19x slower |  |
| small-links-only | kitsu | 55,657 | 1x |  |
| **small-links-only** | **fetchja** | **195,270** | **3.51x faster** |  |
| small-links-only | devour | 47,519 | 1.17x slower |  |
| small-relationships | kitsu | 42,452 | 1x |  |
| **small-relationships** | **fetchja** | **110,019** | **2.59x faster** |  |
| small-relationships | devour | 34,223 | 1.24x slower |  |
| nested-relationships | kitsu | 46,600 | 1x |  |
| **nested-relationships** | **fetchja** | **121,824** | **2.61x faster** |  |
| nested-relationships | devour | 33,672 | 1.38x slower |  |
| collection | kitsu | 19,491 | 1x |  |
| **collection** | **fetchja** | **30,790** | **1.58x faster** |  |
| collection | devour | 16,111 | 1.21x slower |  |
| collection-includes | kitsu | 19,306 | 1x |  |
| **collection-includes** | **fetchja** | **29,191** | **1.51x faster** |  |
| collection-includes | devour | 15,880 | 1.22x slower |  |
| patch-single | kitsu | 59,658 | 1x |  |
| **patch-single** | **fetchja** | **204,548** | **3.43x faster** |  |
| patch-single | devour | 50,323 | 1.19x slower |  |
| empty-relationships | kitsu | incorrect | 1x | decoded null relationship differs: author |
| **empty-relationships** | **fetchja** | **169,571** | **—** |  |
| empty-relationships | devour | 42,412 | — |  |
| few-includes | kitsu | 411 | 1x |  |
| **few-includes** | **fetchja** | **416** | **1.01x faster** |  |
| few-includes | devour | 352 | 1.17x slower |  |
| many-includes | kitsu | 15.53 | 1x |  |
| **many-includes** | **fetchja** | **172** | **11.1x faster** |  |
| many-includes | devour | 8.08 | 1.92x slower |  |
| complex-relationships | kitsu | 0.44 | 1x |  |
| **complex-relationships** | **fetchja** | **25.99** | **58.43x faster** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| self-cycle | kitsu | 45,013 | 1x |  |
| **self-cycle** | **fetchja** | **115,970** | **2.58x faster** |  |
| self-cycle | devour | 34,202 | 1.32x slower |  |
| mutual-cycle | kitsu | 41,088 | 1x |  |
| **mutual-cycle** | **fetchja** | **103,781** | **2.53x faster** |  |
| mutual-cycle | devour | 33,323 | 1.23x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 48,809 | 1x |  |
| **small-no-relationships** | **fetchja** | **258,907** | **5.3x faster** |  |
| small-no-relationships | devour | 44,454 | 1.1x slower |  |
| small-links-only | kitsu | 47,139 | 1x |  |
| **small-links-only** | **fetchja** | **244,962** | **5.2x faster** |  |
| small-links-only | devour | 43,120 | 1.09x slower |  |
| small-relationships | kitsu | 39,298 | 1x |  |
| **small-relationships** | **fetchja** | **176,698** | **4.5x faster** |  |
| small-relationships | devour | 35,112 | 1.12x slower |  |
| nested-relationships | kitsu | 44,681 | 1x |  |
| **nested-relationships** | **fetchja** | **204,524** | **4.58x faster** |  |
| nested-relationships | devour | 36,253 | 1.23x slower |  |
| **collection** | **kitsu** | **21,295** | **1x** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | incorrect | 1x | encoded relationship contains resource object |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 46,804 | 1x |  |
| **patch-single** | **fetchja** | **261,843** | **5.59x faster** |  |
| patch-single | devour | 48,426 | 1.03x faster |  |
| empty-relationships | kitsu | 41,142 | 1x |  |
| **empty-relationships** | **fetchja** | **194,561** | **4.73x faster** |  |
| empty-relationships | devour | 36,511 | 1.13x slower |  |
| **few-includes** | **kitsu** | **454** | **1x** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **380** | **1x** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **119** | **1x** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 42,986 | 1x |  |
| **self-cycle** | **fetchja** | **206,344** | **4.8x faster** |  |
| self-cycle | devour | 39,238 | 1.1x slower |  |
| mutual-cycle | kitsu | 44,391 | 1x |  |
| **mutual-cycle** | **fetchja** | **213,069** | **4.8x faster** |  |
| mutual-cycle | devour | 38,979 | 1.14x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 51,134 | 1x | 25,567 cycles/s |
| **small-no-relationships** | **fetchja** | **198,283** | **3.88x faster** | **99,142 cycles/s** |
| small-no-relationships | devour | 44,964 | 1.14x slower | 22,482 cycles/s |
| small-links-only | kitsu | 48,786 | 1x | 24,393 cycles/s |
| **small-links-only** | **fetchja** | **198,693** | **4.07x faster** | **99,347 cycles/s** |
| small-links-only | devour | 40,103 | 1.22x slower | 20,052 cycles/s |
| small-relationships | kitsu | 38,903 | 1x | 19,451 cycles/s |
| **small-relationships** | **fetchja** | **117,857** | **3.03x faster** | **58,929 cycles/s** |
| small-relationships | devour | 30,809 | 1.26x slower | 15,404 cycles/s |
| nested-relationships | kitsu | 39,592 | 1x | 19,796 cycles/s |
| **nested-relationships** | **fetchja** | **127,767** | **3.23x faster** | **63,883 cycles/s** |
| nested-relationships | devour | 32,163 | 1.23x slower | 16,082 cycles/s |
| collection | kitsu | incorrect | 1x | encoded request differs from expected attributes or linkage |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| **collection-includes** | **kitsu** | **15,597** | **1x** | **7,798 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 47,844 | 1x | 23,922 cycles/s |
| **patch-single** | **fetchja** | **220,978** | **4.62x faster** | **110,489 cycles/s** |
| patch-single | devour | 46,039 | 1.04x slower | 23,020 cycles/s |
| empty-relationships | kitsu | incorrect | 1x | decoded null relationship differs: author |
| **empty-relationships** | **fetchja** | **170,873** | **—** | **85,436 cycles/s** |
| empty-relationships | devour | 35,545 | — | 17,773 cycles/s |
| **few-includes** | **kitsu** | **375** | **1x** | **188 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **29.5** | **1x** | **14\.75 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **0.91** | **1x** | **0\.45 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 38,384 | 1x | 19,192 cycles/s |
| **self-cycle** | **fetchja** | **130,765** | **3.41x faster** | **65,383 cycles/s** |
| self-cycle | devour | 32,863 | 1.17x slower | 16,431 cycles/s |
| mutual-cycle | kitsu | 37,789 | 1x | 18,895 cycles/s |
| **mutual-cycle** | **fetchja** | **120,665** | **3.19x faster** | **60,333 cycles/s** |
| mutual-cycle | devour | 31,848 | 1.19x slower | 15,924 cycles/s |

</details>

### node v26\.11\.1

Measured commit: `70d3f7029f76c2922b96b661ae4831beb12db1b1`. Runner: linux x64, AMD EPYC 7763 64-Core Processor.

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, deserialize-json-api 2\.0\.0.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 883,034 | 1x |  |
| **small-no-relationships** | **devour** | **1,185,735** | **1.34x faster** |  |
| small-no-relationships | yayson | 580,148 | 1.52x slower |  |
| small-no-relationships | jsona | 1,141,604 | 1.29x faster |  |
| small-no-relationships | deserialize-json-api | 358,739 | 2.46x slower |  |
| small-links-only | kitsu-core | 658,107 | 1x |  |
| small-links-only | devour | 625,870 | 1.05x slower |  |
| small-links-only | yayson | 438,980 | 1.5x slower |  |
| **small-links-only** | **jsona** | **1,086,537** | **1.65x faster** |  |
| small-links-only | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| small-relationships | kitsu-core | 148,295 | 1x |  |
| small-relationships | devour | 183,940 | 1.24x faster |  |
| small-relationships | yayson | 136,978 | 1.08x slower |  |
| **small-relationships** | **jsona** | **265,062** | **1.79x faster** |  |
| small-relationships | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| nested-relationships | kitsu-core | 175,259 | 1x |  |
| nested-relationships | devour | 202,463 | 1.16x faster |  |
| nested-relationships | yayson | 165,630 | 1.06x slower |  |
| **nested-relationships** | **jsona** | **300,806** | **1.72x faster** |  |
| nested-relationships | deserialize-json-api | 138,708 | 1.26x slower |  |
| collection | kitsu-core | 91,878 | 1x |  |
| collection | devour | 53,789 | 1.71x slower |  |
| collection | yayson | 82,546 | 1.11x slower |  |
| **collection** | **jsona** | **214,486** | **2.33x faster** |  |
| collection | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| collection-includes | kitsu-core | 59,788 | 1x |  |
| collection-includes | devour | 62,505 | 1.05x faster |  |
| collection-includes | yayson | 71,374 | 1.19x faster |  |
| **collection-includes** | **jsona** | **89,077** | **1.49x faster** |  |
| collection-includes | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| patch-single | kitsu-core | 1,145,053 | 1x |  |
| **patch-single** | **devour** | **1,530,783** | **1.34x faster** |  |
| patch-single | yayson | 581,419 | 1.97x slower |  |
| patch-single | jsona | 1,443,402 | 1.26x faster |  |
| patch-single | deserialize-json-api | 522,571 | 2.19x slower |  |
| empty-relationships | kitsu-core | incorrect | 1x | decoded null relationship differs: author |
| empty-relationships | devour | 460,458 | — |  |
| empty-relationships | yayson | 450,083 | — |  |
| **empty-relationships** | **jsona** | **845,234** | **—** |  |
| empty-relationships | deserialize-json-api | error | — | Cannot read properties of null \(reading 'type'\) |
| few-includes | kitsu-core | 259 | 1x |  |
| few-includes | devour | 283 | 1.09x faster |  |
| few-includes | yayson | 342 | 1.32x faster |  |
| **few-includes** | **jsona** | **374** | **1.44x faster** |  |
| few-includes | deserialize-json-api | 98.12 | 2.64x slower |  |
| many-includes | kitsu-core | 4.81 | 1x |  |
| many-includes | devour | 2.65 | 1.81x slower |  |
| many-includes | yayson | 13.47 | 2.8x faster |  |
| **many-includes** | **jsona** | **136** | **28.34x faster** |  |
| many-includes | deserialize-json-api | 11.51 | 2.39x faster |  |
| complex-relationships | kitsu-core | 0.3 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.36 | 1.21x faster |  |
| **complex-relationships** | **jsona** | **13.86** | **46.52x faster** |  |
| complex-relationships | deserialize-json-api | 0.32 | 1.06x faster |  |
| self-cycle | kitsu-core | 128,204 | 1x |  |
| self-cycle | devour | 169,634 | 1.32x faster |  |
| self-cycle | yayson | 151,188 | 1.18x faster |  |
| **self-cycle** | **jsona** | **243,529** | **1.9x faster** |  |
| self-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded |
| mutual-cycle | kitsu-core | 102,388 | 1x |  |
| mutual-cycle | devour | 134,613 | 1.31x faster |  |
| mutual-cycle | yayson | 120,817 | 1.18x faster |  |
| **mutual-cycle** | **jsona** | **188,617** | **1.84x faster** |  |
| mutual-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 306,353 | 1x |  |
| small-no-relationships | devour | 2,190,164 | 7.15x faster |  |
| small-no-relationships | yayson | 1,117,080 | 3.65x faster |  |
| **small-no-relationships** | **jsona** | **2,321,844** | **7.58x faster** |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 295,281 | 1x |  |
| small-links-only | devour | 1,045,332 | 3.54x faster |  |
| small-links-only | yayson | 880,056 | 2.98x faster |  |
| **small-links-only** | **jsona** | **2,448,090** | **8.29x faster** |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 248,243 | 1x |  |
| small-relationships | devour | 638,935 | 2.57x faster |  |
| small-relationships | yayson | 495,551 | 2x faster |  |
| **small-relationships** | **jsona** | **1,111,215** | **4.48x faster** |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 264,615 | 1x |  |
| nested-relationships | devour | 801,066 | 3.03x faster |  |
| nested-relationships | yayson | 605,451 | 2.29x faster |  |
| **nested-relationships** | **jsona** | **1,329,246** | **5.02x faster** |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | 81,301 | 1x |  |
| collection | devour | 61,579 | 1.32x slower |  |
| collection | yayson | 150,524 | 1.85x faster |  |
| **collection** | **jsona** | **556,770** | **6.85x faster** |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | incorrect | 1x | encoded relationship contains resource object |
| collection-includes | devour | 127,399 | — |  |
| collection-includes | yayson | 164,303 | — |  |
| **collection-includes** | **jsona** | **269,259** | **—** |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 329,001 | 1x |  |
| **patch-single** | **devour** | **4,013,071** | **12.2x faster** |  |
| patch-single | yayson | 1,604,286 | 4.88x faster |  |
| patch-single | jsona | 3,336,473 | 10.14x faster |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | 280,801 | 1x |  |
| empty-relationships | devour | 678,175 | 2.42x faster |  |
| empty-relationships | yayson | 559,652 | 1.99x faster |  |
| **empty-relationships** | **jsona** | **1,300,271** | **4.63x faster** |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 287 | 1x |  |
| few-includes | devour | 669 | 2.33x faster |  |
| few-includes | yayson | 455 | 1.59x faster |  |
| **few-includes** | **jsona** | **1,280** | **4.46x faster** |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 271 | 1x |  |
| many-includes | devour | 498 | 1.84x faster |  |
| many-includes | yayson | 478 | 1.76x faster |  |
| **many-includes** | **jsona** | **1,074** | **3.96x faster** |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 202 | 1x |  |
| complex-relationships | devour | 304 | 1.51x faster |  |
| complex-relationships | yayson | 256 | 1.27x faster |  |
| **complex-relationships** | **jsona** | **391** | **1.94x faster** |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 261,914 | 1x |  |
| self-cycle | devour | 759,746 | 2.9x faster |  |
| self-cycle | yayson | 584,976 | 2.23x faster |  |
| **self-cycle** | **jsona** | **1,421,152** | **5.43x faster** |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 257,474 | 1x |  |
| mutual-cycle | devour | 745,920 | 2.9x faster |  |
| mutual-cycle | yayson | 596,896 | 2.32x faster |  |
| **mutual-cycle** | **jsona** | **1,469,297** | **5.71x faster** |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 196,508 | 1x |  |
| small-no-relationships | devour | 665,625 | 3.39x faster |  |
| small-no-relationships | yayson | 335,633 | 1.71x faster |  |
| **small-no-relationships** | **jsona** | **689,779** | **3.51x faster** |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 179,514 | 1x |  |
| small-links-only | devour | 366,154 | 2.04x faster |  |
| small-links-only | yayson | 283,659 | 1.58x faster |  |
| **small-links-only** | **jsona** | **612,144** | **3.41x faster** |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 73,445 | 1x |  |
| small-relationships | devour | 126,259 | 1.72x faster |  |
| small-relationships | yayson | 89,848 | 1.22x faster |  |
| **small-relationships** | **jsona** | **184,782** | **2.52x faster** |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 86,902 | 1x |  |
| nested-relationships | devour | 150,512 | 1.73x faster |  |
| nested-relationships | yayson | 115,667 | 1.33x faster |  |
| **nested-relationships** | **jsona** | **218,556** | **2.51x faster** |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | incorrect | 1x | encoded request differs from expected attributes or linkage |
| collection | devour | 27,328 | — |  |
| collection | yayson | 51,717 | — |  |
| **collection** | **jsona** | **110,761** | **—** |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | 27,450 | 1x |  |
| collection-includes | devour | 35,664 | 1.3x faster |  |
| collection-includes | yayson | 40,818 | 1.49x faster |  |
| **collection-includes** | **jsona** | **53,665** | **1.96x faster** |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 231,580 | 1x |  |
| **patch-single** | **devour** | **1,024,340** | **4.42x faster** |  |
| patch-single | yayson | 404,808 | 1.75x faster |  |
| patch-single | jsona | 880,490 | 3.8x faster |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | incorrect | 1x | decoded null relationship differs: author |
| empty-relationships | devour | 242,255 | — |  |
| empty-relationships | yayson | 219,733 | — |  |
| **empty-relationships** | **jsona** | **422,032** | **—** |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 106 | 1x |  |
| few-includes | devour | 193 | 1.82x faster |  |
| few-includes | yayson | 170 | 1.61x faster |  |
| **few-includes** | **jsona** | **215** | **2.03x faster** |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 4.48 | 1x |  |
| many-includes | devour | 2.61 | 1.72x slower |  |
| many-includes | yayson | 11.68 | 2.61x faster |  |
| **many-includes** | **jsona** | **93.32** | **20.85x faster** |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 0.32 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.36 | 1.13x faster |  |
| **complex-relationships** | **jsona** | **13.58** | **43.06x faster** |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 74,398 | 1x |  |
| self-cycle | devour | 128,659 | 1.73x faster |  |
| self-cycle | yayson | 105,899 | 1.42x faster |  |
| **self-cycle** | **jsona** | **189,851** | **2.55x faster** |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 60,033 | 1x |  |
| mutual-cycle | devour | 107,795 | 1.8x faster |  |
| mutual-cycle | yayson | 85,874 | 1.43x faster |  |
| **mutual-cycle** | **jsona** | **157,220** | **2.62x faster** |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 38,726 | 1x |  |
| **small-no-relationships** | **fetchja** | **64,469** | **1.66x faster** |  |
| small-no-relationships | devour | 31,124 | 1.24x slower |  |
| small-links-only | kitsu | 35,329 | 1x |  |
| **small-links-only** | **fetchja** | **60,658** | **1.72x faster** |  |
| small-links-only | devour | 28,614 | 1.23x slower |  |
| small-relationships | kitsu | 21,605 | 1x |  |
| **small-relationships** | **fetchja** | **29,254** | **1.35x faster** |  |
| small-relationships | devour | 21,286 | 1.01x slower |  |
| nested-relationships | kitsu | 24,272 | 1x |  |
| **nested-relationships** | **fetchja** | **35,289** | **1.45x faster** |  |
| nested-relationships | devour | 22,457 | 1.08x slower |  |
| **collection** | **kitsu** | **12,480** | **1x** |  |
| collection | fetchja | 11,912 | 1.05x slower |  |
| collection | devour | 10,348 | 1.21x slower |  |
| **collection-includes** | **kitsu** | **12,143** | **1x** |  |
| collection-includes | fetchja | 10,710 | 1.13x slower |  |
| collection-includes | devour | 10,918 | 1.11x slower |  |
| patch-single | kitsu | 39,625 | 1x |  |
| **patch-single** | **fetchja** | **79,639** | **2.01x faster** |  |
| patch-single | devour | 35,843 | 1.11x slower |  |
| empty-relationships | kitsu | incorrect | 1x | decoded null relationship differs: author |
| **empty-relationships** | **fetchja** | **55,575** | **—** |  |
| empty-relationships | devour | 27,213 | — |  |
| few-includes | kitsu | 162 | 1x |  |
| **few-includes** | **fetchja** | **251** | **1.55x faster** |  |
| few-includes | devour | 181 | 1.12x faster |  |
| many-includes | kitsu | 6.35 | 1x |  |
| **many-includes** | **fetchja** | **99.11** | **15.6x faster** |  |
| many-includes | devour | 4.21 | 1.51x slower |  |
| complex-relationships | kitsu | 0.36 | 1x |  |
| **complex-relationships** | **fetchja** | **13.3** | **36.54x faster** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| self-cycle | kitsu | 22,281 | 1x |  |
| **self-cycle** | **fetchja** | **31,061** | **1.39x faster** |  |
| self-cycle | devour | 20,823 | 1.07x slower |  |
| mutual-cycle | kitsu | 20,590 | 1x |  |
| **mutual-cycle** | **fetchja** | **28,987** | **1.41x faster** |  |
| mutual-cycle | devour | 19,645 | 1.05x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 26,408 | 1x |  |
| **small-no-relationships** | **fetchja** | **144,758** | **5.48x faster** |  |
| small-no-relationships | devour | 29,567 | 1.12x faster |  |
| small-links-only | kitsu | 26,382 | 1x |  |
| **small-links-only** | **fetchja** | **144,758** | **5.49x faster** |  |
| small-links-only | devour | 28,129 | 1.07x faster |  |
| small-relationships | kitsu | 22,097 | 1x |  |
| **small-relationships** | **fetchja** | **95,812** | **4.34x faster** |  |
| small-relationships | devour | 23,124 | 1.05x faster |  |
| nested-relationships | kitsu | 24,275 | 1x |  |
| **nested-relationships** | **fetchja** | **121,806** | **5.02x faster** |  |
| nested-relationships | devour | 24,786 | 1.02x faster |  |
| **collection** | **kitsu** | **13,379** | **1x** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | incorrect | 1x | encoded relationship contains resource object |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 30,756 | 1x |  |
| **patch-single** | **fetchja** | **173,548** | **5.64x faster** |  |
| patch-single | devour | 35,135 | 1.14x faster |  |
| empty-relationships | kitsu | 23,796 | 1x |  |
| **empty-relationships** | **fetchja** | **123,653** | **5.2x faster** |  |
| empty-relationships | devour | 25,051 | 1.05x faster |  |
| **few-includes** | **kitsu** | **157** | **1x** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **161** | **1x** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **70.95** | **1x** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 24,389 | 1x |  |
| **self-cycle** | **fetchja** | **122,328** | **5.02x faster** |  |
| self-cycle | devour | 24,985 | 1.02x faster |  |
| mutual-cycle | kitsu | 24,554 | 1x |  |
| **mutual-cycle** | **fetchja** | **115,224** | **4.69x faster** |  |
| mutual-cycle | devour | 24,600 | <1.01x faster |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 31,372 | 1x | 15,686 cycles/s |
| **small-no-relationships** | **fetchja** | **74,155** | **2.36x faster** | **37,077 cycles/s** |
| small-no-relationships | devour | 31,125 | 1.01x slower | 15,562 cycles/s |
| small-links-only | kitsu | 30,653 | 1x | 15,327 cycles/s |
| **small-links-only** | **fetchja** | **71,738** | **2.34x faster** | **35,869 cycles/s** |
| small-links-only | devour | 27,014 | 1.13x slower | 13,507 cycles/s |
| small-relationships | kitsu | 20,552 | 1x | 10,276 cycles/s |
| **small-relationships** | **fetchja** | **41,557** | **2.02x faster** | **20,779 cycles/s** |
| small-relationships | devour | 20,686 | 1.01x faster | 10,343 cycles/s |
| nested-relationships | kitsu | 22,763 | 1x | 11,381 cycles/s |
| **nested-relationships** | **fetchja** | **49,440** | **2.17x faster** | **24,720 cycles/s** |
| nested-relationships | devour | 22,608 | 1.01x slower | 11,304 cycles/s |
| collection | kitsu | incorrect | 1x | encoded request differs from expected attributes or linkage |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| **collection-includes** | **kitsu** | **10,229** | **1x** | **5,115 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 34,337 | 1x | 17,168 cycles/s |
| **patch-single** | **fetchja** | **94,785** | **2.76x faster** | **47,392 cycles/s** |
| patch-single | devour | 33,076 | 1.04x slower | 16,538 cycles/s |
| empty-relationships | kitsu | incorrect | 1x | decoded null relationship differs: author |
| **empty-relationships** | **fetchja** | **62,274** | **—** | **31,137 cycles/s** |
| empty-relationships | devour | 25,376 | — | 12,688 cycles/s |
| **few-includes** | **kitsu** | **146** | **1x** | **72\.98 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **12.44** | **1x** | **6\.22 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **0.75** | **1x** | **0\.37 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 21,992 | 1x | 10,996 cycles/s |
| **self-cycle** | **fetchja** | **45,715** | **2.08x faster** | **22,858 cycles/s** |
| self-cycle | devour | 21,445 | 1.03x slower | 10,723 cycles/s |
| mutual-cycle | kitsu | 20,220 | 1x | 10,110 cycles/s |
| **mutual-cycle** | **fetchja** | **44,330** | **2.19x faster** | **22,165 cycles/s** |
| mutual-cycle | devour | 21,024 | 1.04x faster | 10,512 cycles/s |

</details>


- Codec APIs: kitsu-core, devour, yayson, jsona, deserialize-json-api (decode only).
- Client APIs: kitsu, fetchja, devour. Public single-resource clients report collection writes as unsupported.

Full fixtures use 1,000 primary resources, 3 shared or 3,000 distinct includes, and a complex graph with 21,016 includes.
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
