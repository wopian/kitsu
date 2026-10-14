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

Local measurements. Master CI refreshes this section automatically.

### node v26\.5\.0

Measured commit: `641c1ee8d82ca7dc775b9a5f4f36c0bad7452632`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, deserialize-json-api 2\.0\.0.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 794,533 | 1x |  |
| small-no-relationships | devour | 1,202,712 | 1.51x faster |  |
| small-no-relationships | yayson | 684,828 | 1.16x slower |  |
| **small-no-relationships** | **jsona** | **1,277,202** | **1.61x faster** |  |
| small-no-relationships | deserialize-json-api | 420,591 | 1.89x slower |  |
| small-links-only | kitsu-core | 777,236 | 1x |  |
| small-links-only | devour | 571,180 | 1.36x slower |  |
| small-links-only | yayson | 467,510 | 1.66x slower |  |
| **small-links-only** | **jsona** | **1,242,147** | **1.6x faster** |  |
| small-links-only | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| small-relationships | kitsu-core | 173,594 | 1x |  |
| small-relationships | devour | 168,434 | 1.03x slower |  |
| small-relationships | yayson | 155,880 | 1.11x slower |  |
| **small-relationships** | **jsona** | **299,710** | **1.73x faster** |  |
| small-relationships | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| nested-relationships | kitsu-core | 205,200 | 1x |  |
| nested-relationships | devour | 199,318 | 1.03x slower |  |
| nested-relationships | yayson | 186,528 | 1.1x slower |  |
| **nested-relationships** | **jsona** | **328,515** | **1.6x faster** |  |
| nested-relationships | deserialize-json-api | 143,010 | 1.43x slower |  |
| collection | kitsu-core | 94,911 | 1x |  |
| collection | devour | 44,050 | 2.15x slower |  |
| collection | yayson | 91,541 | 1.04x slower |  |
| **collection** | **jsona** | **229,716** | **2.42x faster** |  |
| collection | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| collection-includes | kitsu-core | 67,177 | 1x |  |
| collection-includes | devour | 56,082 | 1.2x slower |  |
| collection-includes | yayson | 79,222 | 1.18x faster |  |
| **collection-includes** | **jsona** | **86,277** | **1.28x faster** |  |
| collection-includes | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| patch-single | kitsu-core | 1,306,200 | 1x |  |
| patch-single | devour | 1,503,607 | 1.15x faster |  |
| patch-single | yayson | 635,278 | 2.06x slower |  |
| **patch-single** | **jsona** | **1,581,209** | **1.21x faster** |  |
| patch-single | deserialize-json-api | 591,265 | 2.21x slower |  |
| empty-relationships | kitsu-core | incorrect | 1x | decoded null relationship differs: author |
| empty-relationships | devour | 400,855 | — |  |
| empty-relationships | yayson | 429,152 | — |  |
| **empty-relationships** | **jsona** | **995,604** | **—** |  |
| empty-relationships | deserialize-json-api | error | — | Cannot read properties of null \(reading 'type'\) |
| few-includes | kitsu-core | 263 | 1x |  |
| few-includes | devour | 245 | 1.07x slower |  |
| few-includes | yayson | 318 | 1.21x faster |  |
| **few-includes** | **jsona** | **332** | **1.26x faster** |  |
| few-includes | deserialize-json-api | 103 | 2.56x slower |  |
| many-includes | kitsu-core | 5.36 | 1x |  |
| many-includes | devour | 2.73 | 1.96x slower |  |
| many-includes | yayson | 15.51 | 2.89x faster |  |
| **many-includes** | **jsona** | **117** | **21.74x faster** |  |
| many-includes | deserialize-json-api | 12.82 | 2.39x faster |  |
| complex-relationships | kitsu-core | 0.33 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.35 | 1.06x faster |  |
| **complex-relationships** | **jsona** | **14.48** | **43.66x faster** |  |
| complex-relationships | deserialize-json-api | 0.31 | 1.08x slower |  |
| self-cycle | kitsu-core | 144,859 | 1x |  |
| self-cycle | devour | 135,224 | 1.07x slower |  |
| self-cycle | yayson | 153,213 | 1.06x faster |  |
| **self-cycle** | **jsona** | **271,372** | **1.87x faster** |  |
| self-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded |
| mutual-cycle | kitsu-core | 113,987 | 1x |  |
| mutual-cycle | devour | 124,820 | 1.1x faster |  |
| mutual-cycle | yayson | 133,718 | 1.17x faster |  |
| **mutual-cycle** | **jsona** | **204,490** | **1.79x faster** |  |
| mutual-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 75,387 | 1x |  |
| small-no-relationships | devour | 2,230,402 | 29.59x faster |  |
| small-no-relationships | yayson | 1,247,863 | 16.55x faster |  |
| **small-no-relationships** | **jsona** | **2,657,720** | **35.25x faster** |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 80,487 | 1x |  |
| small-links-only | devour | 857,615 | 10.66x faster |  |
| small-links-only | yayson | 1,031,831 | 12.82x faster |  |
| **small-links-only** | **jsona** | **2,615,944** | **32.5x faster** |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 75,903 | 1x |  |
| small-relationships | devour | 512,290 | 6.75x faster |  |
| small-relationships | yayson | 567,634 | 7.48x faster |  |
| **small-relationships** | **jsona** | **1,185,648** | **15.62x faster** |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 75,618 | 1x |  |
| nested-relationships | devour | 636,127 | 8.41x faster |  |
| nested-relationships | yayson | 685,102 | 9.06x faster |  |
| **nested-relationships** | **jsona** | **1,402,266** | **18.54x faster** |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | 25,741 | 1x |  |
| collection | devour | 50,939 | 1.98x faster |  |
| collection | yayson | 175,929 | 6.83x faster |  |
| **collection** | **jsona** | **588,005** | **22.84x faster** |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | incorrect | 1x | encoded relationship contains resource object |
| collection-includes | devour | 113,540 | — |  |
| collection-includes | yayson | 179,786 | — |  |
| **collection-includes** | **jsona** | **267,852** | **—** |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 93,799 | 1x |  |
| **patch-single** | **devour** | **3,944,498** | **42.05x faster** |  |
| patch-single | yayson | 1,622,782 | 17.3x faster |  |
| patch-single | jsona | 3,358,203 | 35.8x faster |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | 82,701 | 1x |  |
| empty-relationships | devour | 576,314 | 6.97x faster |  |
| empty-relationships | yayson | 617,703 | 7.47x faster |  |
| **empty-relationships** | **jsona** | **1,453,320** | **17.57x faster** |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 114 | 1x |  |
| few-includes | devour | 511 | 4.49x faster |  |
| few-includes | yayson | 492 | 4.32x faster |  |
| **few-includes** | **jsona** | **1,251** | **10.99x faster** |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 103 | 1x |  |
| many-includes | devour | 567 | 5.52x faster |  |
| many-includes | yayson | 546 | 5.32x faster |  |
| **many-includes** | **jsona** | **1,170** | **11.38x faster** |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 86.67 | 1x |  |
| **complex-relationships** | **devour** | **264** | **3.04x faster** |  |
| complex-relationships | yayson | 186 | 2.15x faster |  |
| complex-relationships | jsona | 196 | 2.27x faster |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 72,765 | 1x |  |
| self-cycle | devour | 545,876 | 7.5x faster |  |
| self-cycle | yayson | 568,406 | 7.81x faster |  |
| **self-cycle** | **jsona** | **1,156,549** | **15.89x faster** |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 71,806 | 1x |  |
| mutual-cycle | devour | 593,112 | 8.26x faster |  |
| mutual-cycle | yayson | 573,691 | 7.99x faster |  |
| **mutual-cycle** | **jsona** | **1,218,221** | **16.97x faster** |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 55,859 | 1x |  |
| small-no-relationships | devour | 700,774 | 12.55x faster |  |
| small-no-relationships | yayson | 395,952 | 7.09x faster |  |
| **small-no-relationships** | **jsona** | **814,882** | **14.59x faster** |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 63,597 | 1x |  |
| small-links-only | devour | 319,516 | 5.02x faster |  |
| small-links-only | yayson | 323,212 | 5.08x faster |  |
| **small-links-only** | **jsona** | **706,662** | **11.11x faster** |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 45,560 | 1x |  |
| small-relationships | devour | 115,435 | 2.53x faster |  |
| small-relationships | yayson | 105,387 | 2.31x faster |  |
| **small-relationships** | **jsona** | **206,791** | **4.54x faster** |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 49,020 | 1x |  |
| nested-relationships | devour | 133,952 | 2.73x faster |  |
| nested-relationships | yayson | 131,621 | 2.69x faster |  |
| **nested-relationships** | **jsona** | **225,112** | **4.59x faster** |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | incorrect | 1x | encoded request differs from expected attributes or linkage |
| collection | devour | 21,208 | — |  |
| collection | yayson | 53,100 | — |  |
| **collection** | **jsona** | **117,810** | **—** |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | 14,221 | 1x |  |
| collection-includes | devour | 34,859 | 2.45x faster |  |
| collection-includes | yayson | 48,170 | 3.39x faster |  |
| **collection-includes** | **jsona** | **58,654** | **4.12x faster** |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 73,852 | 1x |  |
| **patch-single** | **devour** | **1,028,145** | **13.92x faster** |  |
| patch-single | yayson | 468,658 | 6.35x faster |  |
| patch-single | jsona | 1,005,755 | 13.62x faster |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | incorrect | 1x | decoded null relationship differs: author |
| empty-relationships | devour | 212,344 | — |  |
| empty-relationships | yayson | 229,343 | — |  |
| **empty-relationships** | **jsona** | **476,152** | **—** |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 67.8 | 1x |  |
| few-includes | devour | 153 | 2.26x faster |  |
| few-includes | yayson | 174 | 2.57x faster |  |
| **few-includes** | **jsona** | **213** | **3.14x faster** |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 5.11 | 1x |  |
| many-includes | devour | 3.28 | 1.56x slower |  |
| many-includes | yayson | 14.1 | 2.76x faster |  |
| **many-includes** | **jsona** | **89.79** | **17.56x faster** |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 0.35 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.39 | 1.1x faster |  |
| **complex-relationships** | **jsona** | **12.45** | **35.35x faster** |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 40,346 | 1x |  |
| self-cycle | devour | 116,782 | 2.89x faster |  |
| self-cycle | yayson | 109,455 | 2.71x faster |  |
| **self-cycle** | **jsona** | **198,797** | **4.93x faster** |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 38,013 | 1x |  |
| mutual-cycle | devour | 94,764 | 2.49x faster |  |
| mutual-cycle | yayson | 91,812 | 2.42x faster |  |
| **mutual-cycle** | **jsona** | **148,485** | **3.91x faster** |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 35,078 | 1x |  |
| **small-no-relationships** | **fetchja** | **49,649** | **1.42x faster** |  |
| small-no-relationships | devour | 31,819 | 1.1x slower |  |
| small-links-only | kitsu | 42,831 | 1x |  |
| **small-links-only** | **fetchja** | **63,387** | **1.48x faster** |  |
| small-links-only | devour | 28,926 | 1.48x slower |  |
| small-relationships | kitsu | 26,727 | 1x |  |
| **small-relationships** | **fetchja** | **30,135** | **1.13x faster** |  |
| small-relationships | devour | 22,292 | 1.2x slower |  |
| nested-relationships | kitsu | 29,184 | 1x |  |
| **nested-relationships** | **fetchja** | **42,250** | **1.45x faster** |  |
| nested-relationships | devour | 23,842 | 1.22x slower |  |
| **collection** | **kitsu** | **14,115** | **1x** |  |
| collection | fetchja | 10,972 | 1.29x slower |  |
| collection | devour | 10,017 | 1.41x slower |  |
| **collection-includes** | **kitsu** | **13,195** | **1x** |  |
| collection-includes | fetchja | 9,822 | 1.34x slower |  |
| collection-includes | devour | 11,520 | 1.15x slower |  |
| patch-single | kitsu | 48,990 | 1x |  |
| **patch-single** | **fetchja** | **67,184** | **1.37x faster** |  |
| patch-single | devour | 37,506 | 1.31x slower |  |
| empty-relationships | kitsu | incorrect | 1x | decoded null relationship differs: author |
| **empty-relationships** | **fetchja** | **58,090** | **—** |  |
| empty-relationships | devour | 28,927 | — |  |
| few-includes | kitsu | 177 | 1x |  |
| **few-includes** | **fetchja** | **215** | **1.21x faster** |  |
| few-includes | devour | 172 | 1.03x slower |  |
| many-includes | kitsu | 7.25 | 1x |  |
| **many-includes** | **fetchja** | **93.19** | **12.85x faster** |  |
| many-includes | devour | 5.09 | 1.42x slower |  |
| complex-relationships | kitsu | 0.43 | 1x |  |
| **complex-relationships** | **fetchja** | **13.1** | **30.62x faster** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| self-cycle | kitsu | 24,707 | 1x |  |
| **self-cycle** | **fetchja** | **30,867** | **1.25x faster** |  |
| self-cycle | devour | 22,312 | 1.11x slower |  |
| mutual-cycle | kitsu | 22,198 | 1x |  |
| **mutual-cycle** | **fetchja** | **26,808** | **1.21x faster** |  |
| mutual-cycle | devour | 20,206 | 1.1x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 20,375 | 1x |  |
| **small-no-relationships** | **fetchja** | **125,542** | **6.16x faster** |  |
| small-no-relationships | devour | 31,823 | 1.56x faster |  |
| small-links-only | kitsu | 23,249 | 1x |  |
| **small-links-only** | **fetchja** | **144,318** | **6.21x faster** |  |
| small-links-only | devour | 31,077 | 1.34x faster |  |
| small-relationships | kitsu | 18,503 | 1x |  |
| **small-relationships** | **fetchja** | **102,049** | **5.52x faster** |  |
| small-relationships | devour | 25,350 | 1.37x faster |  |
| nested-relationships | kitsu | 22,114 | 1x |  |
| **nested-relationships** | **fetchja** | **115,737** | **5.23x faster** |  |
| nested-relationships | devour | 27,609 | 1.25x faster |  |
| **collection** | **kitsu** | **9,428** | **1x** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | incorrect | 1x | encoded relationship contains resource object |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 23,081 | 1x |  |
| **patch-single** | **fetchja** | **175,592** | **7.61x faster** |  |
| patch-single | devour | 35,842 | 1.55x faster |  |
| empty-relationships | kitsu | 21,818 | 1x |  |
| **empty-relationships** | **fetchja** | **129,771** | **5.95x faster** |  |
| empty-relationships | devour | 28,735 | 1.32x faster |  |
| **few-includes** | **kitsu** | **80.04** | **1x** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **78.14** | **1x** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **52.13** | **1x** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 19,502 | 1x |  |
| **self-cycle** | **fetchja** | **105,908** | **5.43x faster** |  |
| self-cycle | devour | 27,792 | 1.43x faster |  |
| mutual-cycle | kitsu | 19,070 | 1x |  |
| **mutual-cycle** | **fetchja** | **92,239** | **4.84x faster** |  |
| mutual-cycle | devour | 27,654 | 1.45x faster |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 25,835 | 1x | 12,918 cycles/s |
| **small-no-relationships** | **fetchja** | **65,245** | **2.53x faster** | **32,622 cycles/s** |
| small-no-relationships | devour | 33,152 | 1.28x faster | 16,576 cycles/s |
| small-links-only | kitsu | 28,549 | 1x | 14,274 cycles/s |
| **small-links-only** | **fetchja** | **59,328** | **2.08x faster** | **29,664 cycles/s** |
| small-links-only | devour | 29,239 | 1.02x faster | 14,620 cycles/s |
| small-relationships | kitsu | 20,239 | 1x | 10,120 cycles/s |
| **small-relationships** | **fetchja** | **44,154** | **2.18x faster** | **22,077 cycles/s** |
| small-relationships | devour | 22,320 | 1.1x faster | 11,160 cycles/s |
| nested-relationships | kitsu | 24,372 | 1x | 12,186 cycles/s |
| **nested-relationships** | **fetchja** | **52,782** | **2.17x faster** | **26,391 cycles/s** |
| nested-relationships | devour | 25,067 | 1.03x faster | 12,533 cycles/s |
| collection | kitsu | incorrect | 1x | encoded request differs from expected attributes or linkage |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| **collection-includes** | **kitsu** | **9,677** | **1x** | **4,838 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 32,815 | 1x | 16,408 cycles/s |
| **patch-single** | **fetchja** | **88,350** | **2.69x faster** | **44,175 cycles/s** |
| patch-single | devour | 33,814 | 1.03x faster | 16,907 cycles/s |
| empty-relationships | kitsu | incorrect | 1x | decoded null relationship differs: author |
| **empty-relationships** | **fetchja** | **69,024** | **—** | **34,512 cycles/s** |
| empty-relationships | devour | 28,434 | — | 14,217 cycles/s |
| **few-includes** | **kitsu** | **107** | **1x** | **53\.46 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **13.63** | **1x** | **6\.82 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **0.83** | **1x** | **0\.41 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 20,395 | 1x | 10,198 cycles/s |
| **self-cycle** | **fetchja** | **44,139** | **2.16x faster** | **22,070 cycles/s** |
| self-cycle | devour | 22,843 | 1.12x faster | 11,422 cycles/s |
| mutual-cycle | kitsu | 18,899 | 1x | 9,450 cycles/s |
| **mutual-cycle** | **fetchja** | **44,268** | **2.34x faster** | **22,134 cycles/s** |
| mutual-cycle | devour | 21,958 | 1.16x faster | 10,979 cycles/s |

</details>

### bun 1\.4\.3

Measured commit: `641c1ee8d82ca7dc775b9a5f4f36c0bad7452632`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, fetchja 3\.2\.0, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, deserialize-json-api 2\.0\.0.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| **small-no-relationships** | **kitsu-core** | **1,034,681** | **1x** |  |
| small-no-relationships | devour | 854,328 | 1.21x slower |  |
| small-no-relationships | yayson | 508,808 | 2.03x slower |  |
| small-no-relationships | jsona | 764,816 | 1.35x slower |  |
| small-no-relationships | deserialize-json-api | 369,936 | 2.8x slower |  |
| **small-links-only** | **kitsu-core** | **906,570** | **1x** |  |
| small-links-only | devour | 575,743 | 1.57x slower |  |
| small-links-only | yayson | 338,936 | 2.67x slower |  |
| small-links-only | jsona | 644,041 | 1.41x slower |  |
| small-links-only | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| **small-relationships** | **kitsu-core** | **269,828** | **1x** |  |
| small-relationships | devour | 181,524 | 1.49x slower |  |
| small-relationships | yayson | 130,343 | 2.07x slower |  |
| small-relationships | jsona | 217,631 | 1.24x slower |  |
| small-relationships | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| **nested-relationships** | **kitsu-core** | **252,317** | **1x** |  |
| nested-relationships | devour | 216,125 | 1.17x slower |  |
| nested-relationships | yayson | 179,129 | 1.41x slower |  |
| nested-relationships | jsona | 241,494 | 1.04x slower |  |
| nested-relationships | deserialize-json-api | 160,855 | 1.57x slower |  |
| collection | kitsu-core | 113,285 | 1x |  |
| collection | devour | 65,072 | 1.74x slower |  |
| collection | yayson | 55,369 | 2.05x slower |  |
| **collection** | **jsona** | **172,448** | **1.52x faster** |  |
| collection | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| **collection-includes** | **kitsu-core** | **111,818** | **1x** |  |
| collection-includes | devour | 68,643 | 1.63x slower |  |
| collection-includes | yayson | 67,492 | 1.66x slower |  |
| collection-includes | jsona | 99,539 | 1.12x slower |  |
| collection-includes | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| **patch-single** | **kitsu-core** | **1,150,012** | **1x** |  |
| patch-single | devour | 995,409 | 1.16x slower |  |
| patch-single | yayson | 527,931 | 2.18x slower |  |
| patch-single | jsona | 942,962 | 1.22x slower |  |
| patch-single | deserialize-json-api | 557,283 | 2.06x slower |  |
| empty-relationships | kitsu-core | incorrect | 1x | decoded null relationship differs: author |
| empty-relationships | devour | 461,775 | — |  |
| empty-relationships | yayson | 416,297 | — |  |
| **empty-relationships** | **jsona** | **608,845** | **—** |  |
| empty-relationships | deserialize-json-api | error | — | null is not an object \(evaluating 'relationship\.type'\) |
| **few-includes** | **kitsu-core** | **504** | **1x** |  |
| few-includes | devour | 380 | 1.33x slower |  |
| few-includes | yayson | 474 | 1.06x slower |  |
| few-includes | jsona | 446 | 1.13x slower |  |
| few-includes | deserialize-json-api | 121 | 4.17x slower |  |
| many-includes | kitsu-core | 13.97 | 1x |  |
| many-includes | devour | 6.13 | 2.28x slower |  |
| many-includes | yayson | 30.66 | 2.19x faster |  |
| **many-includes** | **jsona** | **129** | **9.21x faster** |  |
| many-includes | deserialize-json-api | 23.62 | 1.69x faster |  |
| complex-relationships | kitsu-core | 0.4 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.74 | 1.86x faster |  |
| **complex-relationships** | **jsona** | **16.09** | **40.26x faster** |  |
| complex-relationships | deserialize-json-api | 0.5 | 1.25x faster |  |
| **self-cycle** | **kitsu-core** | **276,495** | **1x** |  |
| self-cycle | devour | 185,177 | 1.49x slower |  |
| self-cycle | yayson | 172,137 | 1.61x slower |  |
| self-cycle | jsona | 226,095 | 1.22x slower |  |
| self-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded\. |
| **mutual-cycle** | **kitsu-core** | **215,373** | **1x** |  |
| mutual-cycle | devour | 150,205 | 1.43x slower |  |
| mutual-cycle | yayson | 141,613 | 1.52x slower |  |
| mutual-cycle | jsona | 172,580 | 1.25x slower |  |
| mutual-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded\. |

#### encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 843,017 | 1x |  |
| **small-no-relationships** | **devour** | **2,505,899** | **2.97x faster** |  |
| small-no-relationships | yayson | 1,122,040 | 1.33x faster |  |
| small-no-relationships | jsona | 1,427,835 | 1.69x faster |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 841,027 | 1x |  |
| small-links-only | devour | 1,245,455 | 1.48x faster |  |
| small-links-only | yayson | 848,307 | 1.01x faster |  |
| **small-links-only** | **jsona** | **1,314,802** | **1.56x faster** |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 552,985 | 1x |  |
| **small-relationships** | **devour** | **814,001** | **1.47x faster** |  |
| small-relationships | yayson | 617,515 | 1.12x faster |  |
| small-relationships | jsona | 628,490 | 1.14x faster |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 634,667 | 1x |  |
| **nested-relationships** | **devour** | **924,949** | **1.46x faster** |  |
| nested-relationships | yayson | 603,063 | 1.05x slower |  |
| nested-relationships | jsona | 737,832 | 1.16x faster |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | 204,037 | 1x |  |
| collection | devour | 103,121 | 1.98x slower |  |
| collection | yayson | 145,721 | 1.4x slower |  |
| **collection** | **jsona** | **385,154** | **1.89x faster** |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | incorrect | 1x | encoded relationship contains resource object |
| collection-includes | devour | 168,286 | — |  |
| collection-includes | yayson | 216,359 | — |  |
| **collection-includes** | **jsona** | **231,786** | **—** |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 975,736 | 1x |  |
| **patch-single** | **devour** | **2,921,822** | **2.99x faster** |  |
| patch-single | yayson | 1,472,784 | 1.51x faster |  |
| patch-single | jsona | 1,962,748 | 2.01x faster |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | 742,732 | 1x |  |
| **empty-relationships** | **devour** | **868,884** | **1.17x faster** |  |
| empty-relationships | yayson | 640,687 | 1.16x slower |  |
| empty-relationships | jsona | 866,623 | 1.17x faster |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 887 | 1x |  |
| **few-includes** | **devour** | **1,334** | **1.5x faster** |  |
| few-includes | yayson | 897 | 1.01x faster |  |
| few-includes | jsona | 866 | 1.02x slower |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 902 | 1x |  |
| **many-includes** | **devour** | **1,256** | **1.39x faster** |  |
| many-includes | yayson | 744 | 1.21x slower |  |
| many-includes | jsona | 810 | 1.11x slower |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 445 | 1x |  |
| **complex-relationships** | **devour** | **716** | **1.61x faster** |  |
| complex-relationships | yayson | 510 | 1.15x faster |  |
| complex-relationships | jsona | 522 | 1.18x faster |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 687,188 | 1x |  |
| **self-cycle** | **devour** | **870,973** | **1.27x faster** |  |
| self-cycle | yayson | 619,500 | 1.11x slower |  |
| self-cycle | jsona | 799,294 | 1.16x faster |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 716,642 | 1x |  |
| **mutual-cycle** | **devour** | **843,000** | **1.18x faster** |  |
| mutual-cycle | yayson | 671,848 | 1.07x slower |  |
| mutual-cycle | jsona | 664,848 | 1.08x slower |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

#### decode-encode

| Scenario | Library | Rate | vs kitsu-core | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 393,313 | 1x |  |
| **small-no-relationships** | **devour** | **509,391** | **1.3x faster** |  |
| small-no-relationships | yayson | 335,730 | 1.17x slower |  |
| small-no-relationships | jsona | 469,481 | 1.19x faster |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 339,004 | 1x |  |
| small-links-only | devour | 330,558 | 1.03x slower |  |
| small-links-only | yayson | 234,513 | 1.45x slower |  |
| **small-links-only** | **jsona** | **406,334** | **1.2x faster** |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 125,217 | 1x |  |
| **small-relationships** | **devour** | **135,157** | **1.08x faster** |  |
| small-relationships | yayson | 96,964 | 1.29x slower |  |
| small-relationships | jsona | 122,921 | 1.02x slower |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| **nested-relationships** | **kitsu-core** | **161,779** | **1x** |  |
| nested-relationships | devour | 148,739 | 1.09x slower |  |
| nested-relationships | yayson | 126,120 | 1.28x slower |  |
| nested-relationships | jsona | 159,507 | 1.01x slower |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | incorrect | 1x | encoded request differs from expected attributes or linkage |
| collection | devour | 34,837 | — |  |
| collection | yayson | 35,383 | — |  |
| **collection** | **jsona** | **77,328** | **—** |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | 55,956 | 1x |  |
| collection-includes | devour | 43,189 | 1.3x slower |  |
| collection-includes | yayson | 47,758 | 1.17x slower |  |
| **collection-includes** | **jsona** | **57,306** | **1.02x faster** |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 397,035 | 1x |  |
| **patch-single** | **devour** | **562,532** | **1.42x faster** |  |
| patch-single | yayson | 378,522 | 1.05x slower |  |
| patch-single | jsona | 504,687 | 1.27x faster |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | incorrect | 1x | decoded null relationship differs: author |
| empty-relationships | devour | 239,518 | — |  |
| empty-relationships | yayson | 217,125 | — |  |
| **empty-relationships** | **jsona** | **293,872** | **—** |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| **few-includes** | **kitsu-core** | **254** | **1x** |  |
| few-includes | devour | 241 | 1.05x slower |  |
| few-includes | yayson | 243 | 1.05x slower |  |
| few-includes | jsona | 237 | 1.07x slower |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 13.01 | 1x |  |
| many-includes | devour | 5.93 | 2.19x slower |  |
| many-includes | yayson | 29.78 | 2.29x faster |  |
| **many-includes** | **jsona** | **96.93** | **7.45x faster** |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 0.38 | 1x |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.73 | 1.91x faster |  |
| **complex-relationships** | **jsona** | **14.03** | **36.64x faster** |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| **self-cycle** | **kitsu-core** | **150,422** | **1x** |  |
| self-cycle | devour | 128,525 | 1.17x slower |  |
| self-cycle | yayson | 128,380 | 1.17x slower |  |
| self-cycle | jsona | 144,255 | 1.04x slower |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| **mutual-cycle** | **kitsu-core** | **132,499** | **1x** |  |
| mutual-cycle | devour | 107,160 | 1.24x slower |  |
| mutual-cycle | yayson | 102,646 | 1.29x slower |  |
| mutual-cycle | jsona | 116,705 | 1.14x slower |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 42,979 | 1x |  |
| **small-no-relationships** | **fetchja** | **162,100** | **3.77x faster** |  |
| small-no-relationships | devour | 36,664 | 1.17x slower |  |
| small-links-only | kitsu | 43,645 | 1x |  |
| **small-links-only** | **fetchja** | **138,759** | **3.18x faster** |  |
| small-links-only | devour | 36,580 | 1.19x slower |  |
| small-relationships | kitsu | 30,162 | 1x |  |
| **small-relationships** | **fetchja** | **71,669** | **2.38x faster** |  |
| small-relationships | devour | 27,541 | 1.1x slower |  |
| nested-relationships | kitsu | 35,357 | 1x |  |
| **nested-relationships** | **fetchja** | **83,776** | **2.37x faster** |  |
| nested-relationships | devour | 27,346 | 1.29x slower |  |
| collection | kitsu | 15,809 | 1x |  |
| **collection** | **fetchja** | **20,931** | **1.32x faster** |  |
| collection | devour | 13,119 | 1.21x slower |  |
| collection-includes | kitsu | 15,581 | 1x |  |
| **collection-includes** | **fetchja** | **21,242** | **1.36x faster** |  |
| collection-includes | devour | 14,252 | 1.09x slower |  |
| patch-single | kitsu | 47,061 | 1x |  |
| **patch-single** | **fetchja** | **165,149** | **3.51x faster** |  |
| patch-single | devour | 40,206 | 1.17x slower |  |
| empty-relationships | kitsu | incorrect | 1x | decoded null relationship differs: author |
| **empty-relationships** | **fetchja** | **148,977** | **—** |  |
| empty-relationships | devour | 34,760 | — |  |
| few-includes | kitsu | 352 | 1x |  |
| **few-includes** | **fetchja** | **382** | **1.08x faster** |  |
| few-includes | devour | 273 | 1.29x slower |  |
| many-includes | kitsu | 16.93 | 1x |  |
| **many-includes** | **fetchja** | **133** | **7.87x faster** |  |
| many-includes | devour | 8.02 | 2.11x slower |  |
| complex-relationships | kitsu | 0.51 | 1x |  |
| **complex-relationships** | **fetchja** | **21.05** | **41.37x faster** |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| self-cycle | kitsu | 36,038 | 1x |  |
| **self-cycle** | **fetchja** | **83,133** | **2.31x faster** |  |
| self-cycle | devour | 27,312 | 1.32x slower |  |
| mutual-cycle | kitsu | 33,794 | 1x |  |
| **mutual-cycle** | **fetchja** | **73,566** | **2.18x faster** |  |
| mutual-cycle | devour | 26,485 | 1.28x slower |  |

#### encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 39,720 | 1x |  |
| **small-no-relationships** | **fetchja** | **174,954** | **4.4x faster** |  |
| small-no-relationships | devour | 36,131 | 1.1x slower |  |
| small-links-only | kitsu | 37,245 | 1x |  |
| **small-links-only** | **fetchja** | **172,814** | **4.64x faster** |  |
| small-links-only | devour | 35,445 | 1.05x slower |  |
| small-relationships | kitsu | 32,309 | 1x |  |
| **small-relationships** | **fetchja** | **129,699** | **4.01x faster** |  |
| small-relationships | devour | 27,642 | 1.17x slower |  |
| nested-relationships | kitsu | 35,530 | 1x |  |
| **nested-relationships** | **fetchja** | **138,637** | **3.9x faster** |  |
| nested-relationships | devour | 25,444 | 1.4x slower |  |
| **collection** | **kitsu** | **16,541** | **1x** |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | incorrect | 1x | encoded relationship contains resource object |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 39,569 | 1x |  |
| **patch-single** | **fetchja** | **185,741** | **4.69x faster** |  |
| patch-single | devour | 38,429 | 1.03x slower |  |
| empty-relationships | kitsu | 37,261 | 1x |  |
| **empty-relationships** | **fetchja** | **154,247** | **4.14x faster** |  |
| empty-relationships | devour | 28,415 | 1.31x slower |  |
| **few-includes** | **kitsu** | **376** | **1x** |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **308** | **1x** |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **104** | **1x** |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 37,288 | 1x |  |
| **self-cycle** | **fetchja** | **158,911** | **4.26x faster** |  |
| self-cycle | devour | 29,088 | 1.28x slower |  |
| mutual-cycle | kitsu | 35,929 | 1x |  |
| **mutual-cycle** | **fetchja** | **148,579** | **4.14x faster** |  |
| mutual-cycle | devour | 31,035 | 1.16x slower |  |

#### decode-encode

| Scenario | Library | Rate | vs kitsu | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 40,642 | 1x | 20,321 cycles/s |
| **small-no-relationships** | **fetchja** | **151,933** | **3.74x faster** | **75,966 cycles/s** |
| small-no-relationships | devour | 34,447 | 1.18x slower | 17,223 cycles/s |
| small-links-only | kitsu | 39,481 | 1x | 19,740 cycles/s |
| **small-links-only** | **fetchja** | **127,876** | **3.24x faster** | **63,938 cycles/s** |
| small-links-only | devour | 33,323 | 1.18x slower | 16,661 cycles/s |
| small-relationships | kitsu | 31,974 | 1x | 15,987 cycles/s |
| **small-relationships** | **fetchja** | **87,566** | **2.74x faster** | **43,783 cycles/s** |
| small-relationships | devour | 26,000 | 1.23x slower | 13,000 cycles/s |
| nested-relationships | kitsu | 31,643 | 1x | 15,822 cycles/s |
| **nested-relationships** | **fetchja** | **96,430** | **3.05x faster** | **48,215 cycles/s** |
| nested-relationships | devour | 29,186 | 1.08x slower | 14,593 cycles/s |
| collection | kitsu | incorrect | 1x | encoded request differs from expected attributes or linkage |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| **collection-includes** | **kitsu** | **13,846** | **1x** | **6,923 cycles/s** |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 41,785 | 1x | 20,892 cycles/s |
| **patch-single** | **fetchja** | **168,331** | **4.03x faster** | **84,166 cycles/s** |
| patch-single | devour | 37,082 | 1.13x slower | 18,541 cycles/s |
| empty-relationships | kitsu | incorrect | 1x | decoded null relationship differs: author |
| **empty-relationships** | **fetchja** | **133,202** | **—** | **66,601 cycles/s** |
| empty-relationships | devour | 26,351 | — | 13,176 cycles/s |
| **few-includes** | **kitsu** | **315** | **1x** | **157 cycles/s** |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| **many-includes** | **kitsu** | **30.41** | **1x** | **15\.2 cycles/s** |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| **complex-relationships** | **kitsu** | **0.96** | **1x** | **0\.48 cycles/s** |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 33,270 | 1x | 16,635 cycles/s |
| **self-cycle** | **fetchja** | **91,398** | **2.75x faster** | **45,699 cycles/s** |
| self-cycle | devour | 27,780 | 1.2x slower | 13,890 cycles/s |
| mutual-cycle | kitsu | 31,448 | 1x | 15,724 cycles/s |
| **mutual-cycle** | **fetchja** | **88,883** | **2.83x faster** | **44,442 cycles/s** |
| mutual-cycle | devour | 25,826 | 1.22x slower | 12,913 cycles/s |

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
