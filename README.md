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

Decode-encode writes primary attributes and relationship identifiers; it does not reconstruct included resources.
Client decode-encode performs GET then PATCH: two requests per cycle. Encode uses an empty successful response.
Median of five samples after warmup. Input cloning, transport response preparation, model registration, and store resets are excluded.
Codec timings exclude JSON text parsing/stringification. Client timings include native client conversion and mocked transport overhead.
Relationship traversal and required decode-encode request preparation are timed. Scores require correct attributes and resolved linkage.
Links and meta preservation are outside scoring. Unsupported APIs and incorrect output receive no speed score.

Reproduce: `bun run build && bun run benchmark`. Quick check: `bun run benchmark:smoke`.

Local measurements. Master CI refreshes this section automatically.

### bun 1\.4\.3

Measured commit: `641c1ee8d82ca7dc775b9a5f4f36c0bad7452632`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, fetchja 3\.2\.0, spraypaint 0\.11\.1, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, deserialize-json-api 2\.0\.0.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 1,034,681 | 17.5% |  |
| small-no-relationships | spraypaint | 86,025 | 7.3% |  |
| small-no-relationships | devour | 854,328 | 10.7% |  |
| small-no-relationships | yayson | 508,808 | 4.8% |  |
| small-no-relationships | jsona | 764,816 | 4.3% |  |
| small-no-relationships | deserialize-json-api | 369,936 | 8.5% |  |
| small-links-only | kitsu-core | 906,570 | 7.2% |  |
| small-links-only | spraypaint | 72,641 | 6.6% |  |
| small-links-only | devour | 575,743 | 12.6% |  |
| small-links-only | yayson | 338,936 | 5.3% |  |
| small-links-only | jsona | 644,041 | 10.9% |  |
| small-links-only | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| small-relationships | kitsu-core | 269,828 | 18.4% |  |
| small-relationships | spraypaint | 22,067 | 18.2% |  |
| small-relationships | devour | 181,524 | 15.9% |  |
| small-relationships | yayson | 130,343 | 11.8% |  |
| small-relationships | jsona | 217,631 | 11.1% |  |
| small-relationships | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| nested-relationships | kitsu-core | 252,317 | 22.1% |  |
| nested-relationships | spraypaint | 33,167 | 9.0% |  |
| nested-relationships | devour | 216,125 | 7.9% |  |
| nested-relationships | yayson | 179,129 | 17.2% |  |
| nested-relationships | jsona | 241,494 | 8.8% |  |
| nested-relationships | deserialize-json-api | 160,855 | 6.6% |  |
| collection | kitsu-core | 113,285 | 17.5% |  |
| collection | spraypaint | 4,862 | 17.3% |  |
| collection | devour | 65,072 | 17.6% |  |
| collection | yayson | 55,369 | 6.6% |  |
| collection | jsona | 172,448 | 26.0% |  |
| collection | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| collection-includes | kitsu-core | 111,818 | 9.2% |  |
| collection-includes | spraypaint | 2,629 | 12.1% |  |
| collection-includes | devour | 68,643 | 19.9% |  |
| collection-includes | yayson | 67,492 | 13.3% |  |
| collection-includes | jsona | 99,539 | 6.7% |  |
| collection-includes | deserialize-json-api | error | — | undefined is not an object \(evaluating 'relationship\.type'\) |
| patch-single | kitsu-core | 1,150,012 | 8.8% |  |
| patch-single | spraypaint | 151,468 | 10.3% |  |
| patch-single | devour | 995,409 | 5.2% |  |
| patch-single | yayson | 527,931 | 14.4% |  |
| patch-single | jsona | 942,962 | 13.0% |  |
| patch-single | deserialize-json-api | 557,283 | 6.0% |  |
| empty-relationships | kitsu-core | incorrect | — | decoded null relationship differs: author |
| empty-relationships | spraypaint | incorrect | — | decoded null relationship differs: author |
| empty-relationships | devour | 461,775 | 9.1% |  |
| empty-relationships | yayson | 416,297 | 12.8% |  |
| empty-relationships | jsona | 608,845 | 4.7% |  |
| empty-relationships | deserialize-json-api | error | — | null is not an object \(evaluating 'relationship\.type'\) |
| few-includes | kitsu-core | 504 | 12.5% |  |
| few-includes | spraypaint | 12.28 | 8.6% |  |
| few-includes | devour | 380 | 30.1% |  |
| few-includes | yayson | 474 | 14.9% |  |
| few-includes | jsona | 446 | 15.4% |  |
| few-includes | deserialize-json-api | 121 | 5.4% |  |
| many-includes | kitsu-core | 13.97 | 10.0% |  |
| many-includes | spraypaint | 6.22 | 11.3% |  |
| many-includes | devour | 6.13 | 16.4% |  |
| many-includes | yayson | 30.66 | 8.3% |  |
| many-includes | jsona | 129 | 11.9% |  |
| many-includes | deserialize-json-api | 23.62 | 10.1% |  |
| complex-relationships | kitsu-core | 0.4 | 18.5% |  |
| complex-relationships | spraypaint | timeout | — | worker exceeds 30-second limit |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.74 | 9.2% |  |
| complex-relationships | jsona | 16.09 | 24.4% |  |
| complex-relationships | deserialize-json-api | 0.5 | 10.3% |  |
| self-cycle | kitsu-core | 276,495 | 16.5% |  |
| self-cycle | spraypaint | 28,802 | 8.2% |  |
| self-cycle | devour | 185,177 | 14.4% |  |
| self-cycle | yayson | 172,137 | 4.3% |  |
| self-cycle | jsona | 226,095 | 4.0% |  |
| self-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded\. |
| mutual-cycle | kitsu-core | 215,373 | 10.3% |  |
| mutual-cycle | spraypaint | 24,289 | 9.7% |  |
| mutual-cycle | devour | 150,205 | 10.5% |  |
| mutual-cycle | yayson | 141,613 | 7.9% |  |
| mutual-cycle | jsona | 172,580 | 5.6% |  |
| mutual-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded\. |

#### encode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 843,017 | 9.7% |  |
| small-no-relationships | spraypaint | unsupported | — | no public encoder |
| small-no-relationships | devour | 2,505,899 | 37.6% |  |
| small-no-relationships | yayson | 1,122,040 | 14.8% |  |
| small-no-relationships | jsona | 1,427,835 | 8.1% |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 841,027 | 18.1% |  |
| small-links-only | spraypaint | unsupported | — | no public encoder |
| small-links-only | devour | 1,245,455 | 18.2% |  |
| small-links-only | yayson | 848,307 | 7.1% |  |
| small-links-only | jsona | 1,314,802 | 24.3% |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 552,985 | 17.7% |  |
| small-relationships | spraypaint | unsupported | — | no public encoder |
| small-relationships | devour | 814,001 | 21.1% |  |
| small-relationships | yayson | 617,515 | 32.9% |  |
| small-relationships | jsona | 628,490 | 22.2% |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 634,667 | 15.0% |  |
| nested-relationships | spraypaint | unsupported | — | no public encoder |
| nested-relationships | devour | 924,949 | 31.2% |  |
| nested-relationships | yayson | 603,063 | 17.6% |  |
| nested-relationships | jsona | 737,832 | 25.1% |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | 204,037 | 8.3% |  |
| collection | spraypaint | unsupported | — | no public encoder |
| collection | devour | 103,121 | 7.3% |  |
| collection | yayson | 145,721 | 36.1% |  |
| collection | jsona | 385,154 | 38.2% |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | incorrect | — | encoded relationship contains resource object |
| collection-includes | spraypaint | unsupported | — | no public encoder |
| collection-includes | devour | 168,286 | 9.6% |  |
| collection-includes | yayson | 216,359 | 31.5% |  |
| collection-includes | jsona | 231,786 | 20.3% |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 975,736 | 6.6% |  |
| patch-single | spraypaint | unsupported | — | no public encoder |
| patch-single | devour | 2,921,822 | 9.6% |  |
| patch-single | yayson | 1,472,784 | 24.4% |  |
| patch-single | jsona | 1,962,748 | 12.9% |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | 742,732 | 18.5% |  |
| empty-relationships | spraypaint | unsupported | — | no public encoder |
| empty-relationships | devour | 868,884 | 19.5% |  |
| empty-relationships | yayson | 640,687 | 24.4% |  |
| empty-relationships | jsona | 866,623 | 8.2% |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 887 | 19.9% |  |
| few-includes | spraypaint | unsupported | — | no public encoder |
| few-includes | devour | 1,334 | 40.6% |  |
| few-includes | yayson | 897 | 21.6% |  |
| few-includes | jsona | 866 | 33.4% |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 902 | 46.5% |  |
| many-includes | spraypaint | unsupported | — | no public encoder |
| many-includes | devour | 1,256 | 54.0% |  |
| many-includes | yayson | 744 | 31.8% |  |
| many-includes | jsona | 810 | 25.6% |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 445 | 42.9% |  |
| complex-relationships | spraypaint | unsupported | — | no public encoder |
| complex-relationships | devour | 716 | 45.0% |  |
| complex-relationships | yayson | 510 | 85.9% |  |
| complex-relationships | jsona | 522 | 46.0% |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 687,188 | 11.0% |  |
| self-cycle | spraypaint | unsupported | — | no public encoder |
| self-cycle | devour | 870,973 | 24.1% |  |
| self-cycle | yayson | 619,500 | 11.4% |  |
| self-cycle | jsona | 799,294 | 16.3% |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 716,642 | 17.1% |  |
| mutual-cycle | spraypaint | unsupported | — | no public encoder |
| mutual-cycle | devour | 843,000 | 23.1% |  |
| mutual-cycle | yayson | 671,848 | 23.7% |  |
| mutual-cycle | jsona | 664,848 | 20.1% |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

#### decode-encode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 393,313 | 5.9% |  |
| small-no-relationships | spraypaint | unsupported | — | no public encoder |
| small-no-relationships | devour | 509,391 | 13.5% |  |
| small-no-relationships | yayson | 335,730 | 4.4% |  |
| small-no-relationships | jsona | 469,481 | 9.9% |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 339,004 | 5.1% |  |
| small-links-only | spraypaint | unsupported | — | no public encoder |
| small-links-only | devour | 330,558 | 20.1% |  |
| small-links-only | yayson | 234,513 | 11.5% |  |
| small-links-only | jsona | 406,334 | 12.8% |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 125,217 | 24.5% |  |
| small-relationships | spraypaint | unsupported | — | no public encoder |
| small-relationships | devour | 135,157 | 1.7% |  |
| small-relationships | yayson | 96,964 | 7.1% |  |
| small-relationships | jsona | 122,921 | 10.9% |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 161,779 | 11.7% |  |
| nested-relationships | spraypaint | unsupported | — | no public encoder |
| nested-relationships | devour | 148,739 | 7.2% |  |
| nested-relationships | yayson | 126,120 | 7.1% |  |
| nested-relationships | jsona | 159,507 | 7.1% |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | incorrect | — | encoded request differs from expected attributes or linkage |
| collection | spraypaint | unsupported | — | no public encoder |
| collection | devour | 34,837 | 9.8% |  |
| collection | yayson | 35,383 | 8.1% |  |
| collection | jsona | 77,328 | 21.3% |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | 55,956 | 7.6% |  |
| collection-includes | spraypaint | unsupported | — | no public encoder |
| collection-includes | devour | 43,189 | 11.9% |  |
| collection-includes | yayson | 47,758 | 18.8% |  |
| collection-includes | jsona | 57,306 | 10.7% |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 397,035 | 5.4% |  |
| patch-single | spraypaint | unsupported | — | no public encoder |
| patch-single | devour | 562,532 | 5.1% |  |
| patch-single | yayson | 378,522 | 8.4% |  |
| patch-single | jsona | 504,687 | 9.3% |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | incorrect | — | decoded null relationship differs: author |
| empty-relationships | spraypaint | unsupported | — | no public encoder |
| empty-relationships | devour | 239,518 | 9.0% |  |
| empty-relationships | yayson | 217,125 | 16.7% |  |
| empty-relationships | jsona | 293,872 | 3.8% |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 254 | 20.3% |  |
| few-includes | spraypaint | unsupported | — | no public encoder |
| few-includes | devour | 241 | 18.6% |  |
| few-includes | yayson | 243 | 4.1% |  |
| few-includes | jsona | 237 | 17.0% |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 13.01 | 10.7% |  |
| many-includes | spraypaint | unsupported | — | no public encoder |
| many-includes | devour | 5.93 | 21.1% |  |
| many-includes | yayson | 29.78 | 10.7% |  |
| many-includes | jsona | 96.93 | 7.7% |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 0.38 | 8.1% |  |
| complex-relationships | spraypaint | unsupported | — | no public encoder |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.73 | 19.0% |  |
| complex-relationships | jsona | 14.03 | 31.8% |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 150,422 | 14.9% |  |
| self-cycle | spraypaint | unsupported | — | no public encoder |
| self-cycle | devour | 128,525 | 7.6% |  |
| self-cycle | yayson | 128,380 | 11.6% |  |
| self-cycle | jsona | 144,255 | 6.7% |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 132,499 | 12.7% |  |
| mutual-cycle | spraypaint | unsupported | — | no public encoder |
| mutual-cycle | devour | 107,160 | 14.4% |  |
| mutual-cycle | yayson | 102,646 | 11.7% |  |
| mutual-cycle | jsona | 116,705 | 25.4% |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 42,979 | 4.4% |  |
| small-no-relationships | fetchja | 162,100 | 8.5% |  |
| small-no-relationships | spraypaint | 28,265 | 12.9% |  |
| small-no-relationships | devour | 36,664 | 12.9% |  |
| small-links-only | kitsu | 43,645 | 11.8% |  |
| small-links-only | fetchja | 138,759 | 2.1% |  |
| small-links-only | spraypaint | 25,901 | 14.9% |  |
| small-links-only | devour | 36,580 | 13.7% |  |
| small-relationships | kitsu | 30,162 | 24.0% |  |
| small-relationships | fetchja | 71,669 | 7.7% |  |
| small-relationships | spraypaint | 12,787 | 9.4% |  |
| small-relationships | devour | 27,541 | 8.6% |  |
| nested-relationships | kitsu | 35,357 | 23.9% |  |
| nested-relationships | fetchja | 83,776 | 15.0% |  |
| nested-relationships | spraypaint | 16,876 | 8.0% |  |
| nested-relationships | devour | 27,346 | 6.6% |  |
| collection | kitsu | 15,809 | 5.7% |  |
| collection | fetchja | 20,931 | 13.7% |  |
| collection | spraypaint | 3,144 | 4.6% |  |
| collection | devour | 13,119 | 3.8% |  |
| collection-includes | kitsu | 15,581 | 14.6% |  |
| collection-includes | fetchja | 21,242 | 5.6% |  |
| collection-includes | spraypaint | 1,970 | 10.2% |  |
| collection-includes | devour | 14,252 | 7.5% |  |
| patch-single | kitsu | 47,061 | 6.1% |  |
| patch-single | fetchja | 165,149 | 6.6% |  |
| patch-single | spraypaint | 40,741 | 5.1% |  |
| patch-single | devour | 40,206 | 11.8% |  |
| empty-relationships | kitsu | incorrect | — | decoded null relationship differs: author |
| empty-relationships | fetchja | 148,977 | 1.6% |  |
| empty-relationships | spraypaint | incorrect | — | decoded null relationship differs: author |
| empty-relationships | devour | 34,760 | 9.5% |  |
| few-includes | kitsu | 352 | 18.3% |  |
| few-includes | fetchja | 382 | 14.3% |  |
| few-includes | spraypaint | 13.3 | 9.7% |  |
| few-includes | devour | 273 | 20.9% |  |
| many-includes | kitsu | 16.93 | 6.1% |  |
| many-includes | fetchja | 133 | 21.6% |  |
| many-includes | spraypaint | 6.99 | 11.3% |  |
| many-includes | devour | 8.02 | 5.2% |  |
| complex-relationships | kitsu | 0.51 | 12.1% |  |
| complex-relationships | fetchja | 21.05 | 16.6% |  |
| complex-relationships | spraypaint | timeout | — | worker exceeds 30-second limit |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| self-cycle | kitsu | 36,038 | 11.7% |  |
| self-cycle | fetchja | 83,133 | 6.3% |  |
| self-cycle | spraypaint | 16,229 | 10.3% |  |
| self-cycle | devour | 27,312 | 14.1% |  |
| mutual-cycle | kitsu | 33,794 | 5.9% |  |
| mutual-cycle | fetchja | 73,566 | 6.6% |  |
| mutual-cycle | spraypaint | 13,987 | 2.4% |  |
| mutual-cycle | devour | 26,485 | 9.2% |  |

#### encode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 39,720 | 8.9% |  |
| small-no-relationships | fetchja | 174,954 | 7.7% |  |
| small-no-relationships | spraypaint | 45,972 | 20.4% |  |
| small-no-relationships | devour | 36,131 | 13.0% |  |
| small-links-only | kitsu | 37,245 | 10.5% |  |
| small-links-only | fetchja | 172,814 | 5.1% |  |
| small-links-only | spraypaint | 47,002 | 12.8% |  |
| small-links-only | devour | 35,445 | 9.8% |  |
| small-relationships | kitsu | 32,309 | 10.0% |  |
| small-relationships | fetchja | 129,699 | 11.0% |  |
| small-relationships | spraypaint | incorrect | — | request unexpectedly contains included resources |
| small-relationships | devour | 27,642 | 5.8% |  |
| nested-relationships | kitsu | 35,530 | 16.1% |  |
| nested-relationships | fetchja | 138,637 | 9.5% |  |
| nested-relationships | spraypaint | incorrect | — | request unexpectedly contains included resources |
| nested-relationships | devour | 25,444 | 21.6% |  |
| collection | kitsu | 16,541 | 4.4% |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | spraypaint | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | incorrect | — | encoded relationship contains resource object |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | spraypaint | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 39,569 | 7.3% |  |
| patch-single | fetchja | 185,741 | 19.1% |  |
| patch-single | spraypaint | 57,015 | 9.9% |  |
| patch-single | devour | 38,429 | 17.1% |  |
| empty-relationships | kitsu | 37,261 | 10.4% |  |
| empty-relationships | fetchja | 154,247 | 4.6% |  |
| empty-relationships | spraypaint | incorrect | — | encoded request differs from expected attributes or linkage |
| empty-relationships | devour | 28,415 | 17.7% |  |
| few-includes | kitsu | 376 | 23.3% |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | spraypaint | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 308 | 19.6% |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | spraypaint | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 104 | 15.3% |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | spraypaint | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 37,288 | 6.1% |  |
| self-cycle | fetchja | 158,911 | 18.4% |  |
| self-cycle | spraypaint | incorrect | — | request unexpectedly contains included resources |
| self-cycle | devour | 29,088 | 14.2% |  |
| mutual-cycle | kitsu | 35,929 | 7.7% |  |
| mutual-cycle | fetchja | 148,579 | 14.5% |  |
| mutual-cycle | spraypaint | incorrect | — | request unexpectedly contains included resources |
| mutual-cycle | devour | 31,035 | 19.9% |  |

#### decode-encode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 40,642 | 8.7% | 20,321 cycles/s |
| small-no-relationships | fetchja | 151,933 | 9.1% | 75,966 cycles/s |
| small-no-relationships | spraypaint | 27,417 | 5.5% | 13,708 cycles/s |
| small-no-relationships | devour | 34,447 | 14.0% | 17,223 cycles/s |
| small-links-only | kitsu | 39,481 | 9.7% | 19,740 cycles/s |
| small-links-only | fetchja | 127,876 | 6.5% | 63,938 cycles/s |
| small-links-only | spraypaint | 26,304 | 16.1% | 13,152 cycles/s |
| small-links-only | devour | 33,323 | 9.3% | 16,661 cycles/s |
| small-relationships | kitsu | 31,974 | 12.4% | 15,987 cycles/s |
| small-relationships | fetchja | 87,566 | 15.2% | 43,783 cycles/s |
| small-relationships | spraypaint | incorrect | — | request unexpectedly contains included resources |
| small-relationships | devour | 26,000 | 8.3% | 13,000 cycles/s |
| nested-relationships | kitsu | 31,643 | 9.0% | 15,822 cycles/s |
| nested-relationships | fetchja | 96,430 | 11.8% | 48,215 cycles/s |
| nested-relationships | spraypaint | incorrect | — | request unexpectedly contains included resources |
| nested-relationships | devour | 29,186 | 26.9% | 14,593 cycles/s |
| collection | kitsu | incorrect | — | encoded request differs from expected attributes or linkage |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | spraypaint | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 13,846 | 6.6% | 6,923 cycles/s |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | spraypaint | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 41,785 | 7.9% | 20,892 cycles/s |
| patch-single | fetchja | 168,331 | 6.9% | 84,166 cycles/s |
| patch-single | spraypaint | 37,611 | 9.6% | 18,806 cycles/s |
| patch-single | devour | 37,082 | 17.6% | 18,541 cycles/s |
| empty-relationships | kitsu | incorrect | — | decoded null relationship differs: author |
| empty-relationships | fetchja | 133,202 | 10.6% | 66,601 cycles/s |
| empty-relationships | spraypaint | incorrect | — | decoded null relationship differs: author |
| empty-relationships | devour | 26,351 | 22.0% | 13,176 cycles/s |
| few-includes | kitsu | 315 | 15.8% | 157 cycles/s |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | spraypaint | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 30.41 | 6.8% | 15\.2 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | spraypaint | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 0.96 | 13.7% | 0\.48 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | spraypaint | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 33,270 | 7.5% | 16,635 cycles/s |
| self-cycle | fetchja | 91,398 | 16.2% | 45,699 cycles/s |
| self-cycle | spraypaint | incorrect | — | request unexpectedly contains included resources |
| self-cycle | devour | 27,780 | 17.1% | 13,890 cycles/s |
| mutual-cycle | kitsu | 31,448 | 13.1% | 15,724 cycles/s |
| mutual-cycle | fetchja | 88,883 | 12.2% | 44,442 cycles/s |
| mutual-cycle | spraypaint | incorrect | — | request unexpectedly contains included resources |
| mutual-cycle | devour | 25,826 | 17.5% | 12,913 cycles/s |

</details>

### node v26\.5\.0

Measured commit: `641c1ee8d82ca7dc775b9a5f4f36c0bad7452632`. Runner: win32 x64, AMD Ryzen 9 5900X 12-Core Processor            .

Library versions: kitsu-core 12\.0\.0, kitsu 12\.0\.0, fetchja 3\.2\.0, spraypaint 0\.11\.1, devour 3\.2\.0, yayson 4\.4\.0, jsona 1\.14\.0, deserialize-json-api 2\.0\.0.

<details><summary>Codec operations/s</summary>

#### decode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 794,533 | 18.5% |  |
| small-no-relationships | spraypaint | 53,196 | 28.2% |  |
| small-no-relationships | devour | 1,202,712 | 11.4% |  |
| small-no-relationships | yayson | 684,828 | 8.0% |  |
| small-no-relationships | jsona | 1,277,202 | 8.9% |  |
| small-no-relationships | deserialize-json-api | 420,591 | 6.1% |  |
| small-links-only | kitsu-core | 777,236 | 12.6% |  |
| small-links-only | spraypaint | 48,261 | 16.7% |  |
| small-links-only | devour | 571,180 | 8.0% |  |
| small-links-only | yayson | 467,510 | 8.9% |  |
| small-links-only | jsona | 1,242,147 | 6.4% |  |
| small-links-only | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| small-relationships | kitsu-core | 173,594 | 3.9% |  |
| small-relationships | spraypaint | 17,305 | 5.8% |  |
| small-relationships | devour | 168,434 | 7.6% |  |
| small-relationships | yayson | 155,880 | 5.8% |  |
| small-relationships | jsona | 299,710 | 3.0% |  |
| small-relationships | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| nested-relationships | kitsu-core | 205,200 | 7.3% |  |
| nested-relationships | spraypaint | 23,051 | 28.2% |  |
| nested-relationships | devour | 199,318 | 11.8% |  |
| nested-relationships | yayson | 186,528 | 7.2% |  |
| nested-relationships | jsona | 328,515 | 5.1% |  |
| nested-relationships | deserialize-json-api | 143,010 | 10.1% |  |
| collection | kitsu-core | 94,911 | 4.2% |  |
| collection | spraypaint | 4,903 | 13.0% |  |
| collection | devour | 44,050 | 6.9% |  |
| collection | yayson | 91,541 | 6.4% |  |
| collection | jsona | 229,716 | 6.1% |  |
| collection | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| collection-includes | kitsu-core | 67,177 | 14.7% |  |
| collection-includes | spraypaint | 2,571 | 11.1% |  |
| collection-includes | devour | 56,082 | 8.2% |  |
| collection-includes | yayson | 79,222 | 4.6% |  |
| collection-includes | jsona | 86,277 | 16.2% |  |
| collection-includes | deserialize-json-api | error | — | Cannot read properties of undefined \(reading 'type'\) |
| patch-single | kitsu-core | 1,306,200 | 5.0% |  |
| patch-single | spraypaint | 108,288 | 9.9% |  |
| patch-single | devour | 1,503,607 | 9.0% |  |
| patch-single | yayson | 635,278 | 6.6% |  |
| patch-single | jsona | 1,581,209 | 15.3% |  |
| patch-single | deserialize-json-api | 591,265 | 7.4% |  |
| empty-relationships | kitsu-core | incorrect | — | decoded null relationship differs: author |
| empty-relationships | spraypaint | incorrect | — | decoded null relationship differs: author |
| empty-relationships | devour | 400,855 | 2.9% |  |
| empty-relationships | yayson | 429,152 | 15.8% |  |
| empty-relationships | jsona | 995,604 | 5.3% |  |
| empty-relationships | deserialize-json-api | error | — | Cannot read properties of null \(reading 'type'\) |
| few-includes | kitsu-core | 263 | 10.5% |  |
| few-includes | spraypaint | 9.29 | 10.7% |  |
| few-includes | devour | 245 | 8.1% |  |
| few-includes | yayson | 318 | 8.8% |  |
| few-includes | jsona | 332 | 11.6% |  |
| few-includes | deserialize-json-api | 103 | 5.7% |  |
| many-includes | kitsu-core | 5.36 | 15.2% |  |
| many-includes | spraypaint | 4.84 | 32.5% |  |
| many-includes | devour | 2.73 | 44.7% |  |
| many-includes | yayson | 15.51 | 8.8% |  |
| many-includes | jsona | 117 | 29.1% |  |
| many-includes | deserialize-json-api | 12.82 | 21.6% |  |
| complex-relationships | kitsu-core | 0.33 | 53.5% |  |
| complex-relationships | spraypaint | timeout | — | worker exceeds 30-second limit |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.35 | 23.0% |  |
| complex-relationships | jsona | 14.48 | 31.9% |  |
| complex-relationships | deserialize-json-api | 0.31 | 33.6% |  |
| self-cycle | kitsu-core | 144,859 | 8.2% |  |
| self-cycle | spraypaint | 17,343 | 8.6% |  |
| self-cycle | devour | 135,224 | 17.1% |  |
| self-cycle | yayson | 153,213 | 6.9% |  |
| self-cycle | jsona | 271,372 | 3.7% |  |
| self-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded |
| mutual-cycle | kitsu-core | 113,987 | 9.3% |  |
| mutual-cycle | spraypaint | 13,475 | 9.9% |  |
| mutual-cycle | devour | 124,820 | 7.8% |  |
| mutual-cycle | yayson | 133,718 | 11.8% |  |
| mutual-cycle | jsona | 204,490 | 5.8% |  |
| mutual-cycle | deserialize-json-api | error | — | Maximum call stack size exceeded |

#### encode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 75,387 | 9.7% |  |
| small-no-relationships | spraypaint | unsupported | — | no public encoder |
| small-no-relationships | devour | 2,230,402 | 4.5% |  |
| small-no-relationships | yayson | 1,247,863 | 9.7% |  |
| small-no-relationships | jsona | 2,657,720 | 10.3% |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 80,487 | 9.5% |  |
| small-links-only | spraypaint | unsupported | — | no public encoder |
| small-links-only | devour | 857,615 | 6.9% |  |
| small-links-only | yayson | 1,031,831 | 11.8% |  |
| small-links-only | jsona | 2,615,944 | 7.1% |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 75,903 | 6.9% |  |
| small-relationships | spraypaint | unsupported | — | no public encoder |
| small-relationships | devour | 512,290 | 4.8% |  |
| small-relationships | yayson | 567,634 | 3.9% |  |
| small-relationships | jsona | 1,185,648 | 10.9% |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 75,618 | 9.4% |  |
| nested-relationships | spraypaint | unsupported | — | no public encoder |
| nested-relationships | devour | 636,127 | 12.9% |  |
| nested-relationships | yayson | 685,102 | 9.1% |  |
| nested-relationships | jsona | 1,402,266 | 27.8% |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | 25,741 | 8.8% |  |
| collection | spraypaint | unsupported | — | no public encoder |
| collection | devour | 50,939 | 10.2% |  |
| collection | yayson | 175,929 | 4.7% |  |
| collection | jsona | 588,005 | 20.2% |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | incorrect | — | encoded relationship contains resource object |
| collection-includes | spraypaint | unsupported | — | no public encoder |
| collection-includes | devour | 113,540 | 17.9% |  |
| collection-includes | yayson | 179,786 | 17.0% |  |
| collection-includes | jsona | 267,852 | 10.8% |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 93,799 | 6.2% |  |
| patch-single | spraypaint | unsupported | — | no public encoder |
| patch-single | devour | 3,944,498 | 12.9% |  |
| patch-single | yayson | 1,622,782 | 17.6% |  |
| patch-single | jsona | 3,358,203 | 8.9% |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | 82,701 | 8.9% |  |
| empty-relationships | spraypaint | unsupported | — | no public encoder |
| empty-relationships | devour | 576,314 | 4.5% |  |
| empty-relationships | yayson | 617,703 | 11.9% |  |
| empty-relationships | jsona | 1,453,320 | 4.9% |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 114 | 8.9% |  |
| few-includes | spraypaint | unsupported | — | no public encoder |
| few-includes | devour | 511 | 30.1% |  |
| few-includes | yayson | 492 | 35.6% |  |
| few-includes | jsona | 1,251 | 14.2% |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 103 | 14.6% |  |
| many-includes | spraypaint | unsupported | — | no public encoder |
| many-includes | devour | 567 | 19.9% |  |
| many-includes | yayson | 546 | 23.5% |  |
| many-includes | jsona | 1,170 | 30.9% |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 86.67 | 30.3% |  |
| complex-relationships | spraypaint | unsupported | — | no public encoder |
| complex-relationships | devour | 264 | 68.5% |  |
| complex-relationships | yayson | 186 | 23.2% |  |
| complex-relationships | jsona | 196 | 159.4% |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 72,765 | 3.9% |  |
| self-cycle | spraypaint | unsupported | — | no public encoder |
| self-cycle | devour | 545,876 | 18.1% |  |
| self-cycle | yayson | 568,406 | 12.4% |  |
| self-cycle | jsona | 1,156,549 | 6.5% |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 71,806 | 27.9% |  |
| mutual-cycle | spraypaint | unsupported | — | no public encoder |
| mutual-cycle | devour | 593,112 | 6.3% |  |
| mutual-cycle | yayson | 573,691 | 12.0% |  |
| mutual-cycle | jsona | 1,218,221 | 17.1% |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

#### decode-encode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu-core | 55,859 | 15.2% |  |
| small-no-relationships | spraypaint | unsupported | — | no public encoder |
| small-no-relationships | devour | 700,774 | 8.1% |  |
| small-no-relationships | yayson | 395,952 | 6.4% |  |
| small-no-relationships | jsona | 814,882 | 9.7% |  |
| small-no-relationships | deserialize-json-api | unsupported | — | no public encoder |
| small-links-only | kitsu-core | 63,597 | 10.0% |  |
| small-links-only | spraypaint | unsupported | — | no public encoder |
| small-links-only | devour | 319,516 | 12.8% |  |
| small-links-only | yayson | 323,212 | 7.3% |  |
| small-links-only | jsona | 706,662 | 7.6% |  |
| small-links-only | deserialize-json-api | unsupported | — | no public encoder |
| small-relationships | kitsu-core | 45,560 | 16.7% |  |
| small-relationships | spraypaint | unsupported | — | no public encoder |
| small-relationships | devour | 115,435 | 18.5% |  |
| small-relationships | yayson | 105,387 | 8.5% |  |
| small-relationships | jsona | 206,791 | 4.8% |  |
| small-relationships | deserialize-json-api | unsupported | — | no public encoder |
| nested-relationships | kitsu-core | 49,020 | 13.4% |  |
| nested-relationships | spraypaint | unsupported | — | no public encoder |
| nested-relationships | devour | 133,952 | 13.9% |  |
| nested-relationships | yayson | 131,621 | 15.7% |  |
| nested-relationships | jsona | 225,112 | 7.9% |  |
| nested-relationships | deserialize-json-api | unsupported | — | no public encoder |
| collection | kitsu-core | incorrect | — | encoded request differs from expected attributes or linkage |
| collection | spraypaint | unsupported | — | no public encoder |
| collection | devour | 21,208 | 26.7% |  |
| collection | yayson | 53,100 | 9.2% |  |
| collection | jsona | 117,810 | 8.7% |  |
| collection | deserialize-json-api | unsupported | — | no public encoder |
| collection-includes | kitsu-core | 14,221 | 6.7% |  |
| collection-includes | spraypaint | unsupported | — | no public encoder |
| collection-includes | devour | 34,859 | 7.4% |  |
| collection-includes | yayson | 48,170 | 11.7% |  |
| collection-includes | jsona | 58,654 | 3.7% |  |
| collection-includes | deserialize-json-api | unsupported | — | no public encoder |
| patch-single | kitsu-core | 73,852 | 22.5% |  |
| patch-single | spraypaint | unsupported | — | no public encoder |
| patch-single | devour | 1,028,145 | 11.8% |  |
| patch-single | yayson | 468,658 | 2.7% |  |
| patch-single | jsona | 1,005,755 | 10.8% |  |
| patch-single | deserialize-json-api | unsupported | — | no public encoder |
| empty-relationships | kitsu-core | incorrect | — | decoded null relationship differs: author |
| empty-relationships | spraypaint | unsupported | — | no public encoder |
| empty-relationships | devour | 212,344 | 6.4% |  |
| empty-relationships | yayson | 229,343 | 6.4% |  |
| empty-relationships | jsona | 476,152 | 6.2% |  |
| empty-relationships | deserialize-json-api | unsupported | — | no public encoder |
| few-includes | kitsu-core | 67.8 | 14.8% |  |
| few-includes | spraypaint | unsupported | — | no public encoder |
| few-includes | devour | 153 | 13.5% |  |
| few-includes | yayson | 174 | 8.5% |  |
| few-includes | jsona | 213 | 5.8% |  |
| few-includes | deserialize-json-api | unsupported | — | no public encoder |
| many-includes | kitsu-core | 5.11 | 4.4% |  |
| many-includes | spraypaint | unsupported | — | no public encoder |
| many-includes | devour | 3.28 | 26.5% |  |
| many-includes | yayson | 14.1 | 18.9% |  |
| many-includes | jsona | 89.79 | 20.0% |  |
| many-includes | deserialize-json-api | unsupported | — | no public encoder |
| complex-relationships | kitsu-core | 0.35 | 25.0% |  |
| complex-relationships | spraypaint | unsupported | — | no public encoder |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| complex-relationships | yayson | 0.39 | 5.3% |  |
| complex-relationships | jsona | 12.45 | 24.8% |  |
| complex-relationships | deserialize-json-api | unsupported | — | no public encoder |
| self-cycle | kitsu-core | 40,346 | 16.9% |  |
| self-cycle | spraypaint | unsupported | — | no public encoder |
| self-cycle | devour | 116,782 | 9.3% |  |
| self-cycle | yayson | 109,455 | 9.7% |  |
| self-cycle | jsona | 198,797 | 7.8% |  |
| self-cycle | deserialize-json-api | unsupported | — | no public encoder |
| mutual-cycle | kitsu-core | 38,013 | 7.1% |  |
| mutual-cycle | spraypaint | unsupported | — | no public encoder |
| mutual-cycle | devour | 94,764 | 10.8% |  |
| mutual-cycle | yayson | 91,812 | 7.2% |  |
| mutual-cycle | jsona | 148,485 | 11.1% |  |
| mutual-cycle | deserialize-json-api | unsupported | — | no public encoder |

</details>

<details><summary>Mocked client requests/s</summary>

#### decode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 35,078 | 6.6% |  |
| small-no-relationships | fetchja | 49,649 | 39.1% |  |
| small-no-relationships | spraypaint | 14,283 | 7.7% |  |
| small-no-relationships | devour | 31,819 | 14.6% |  |
| small-links-only | kitsu | 42,831 | 31.5% |  |
| small-links-only | fetchja | 63,387 | 29.7% |  |
| small-links-only | spraypaint | 11,230 | 30.0% |  |
| small-links-only | devour | 28,926 | 15.6% |  |
| small-relationships | kitsu | 26,727 | 12.4% |  |
| small-relationships | fetchja | 30,135 | 38.9% |  |
| small-relationships | spraypaint | 7,109 | 18.4% |  |
| small-relationships | devour | 22,292 | 14.7% |  |
| nested-relationships | kitsu | 29,184 | 8.7% |  |
| nested-relationships | fetchja | 42,250 | 23.8% |  |
| nested-relationships | spraypaint | 8,107 | 21.1% |  |
| nested-relationships | devour | 23,842 | 20.0% |  |
| collection | kitsu | 14,115 | 5.7% |  |
| collection | fetchja | 10,972 | 2.8% |  |
| collection | spraypaint | 2,481 | 13.5% |  |
| collection | devour | 10,017 | 5.4% |  |
| collection-includes | kitsu | 13,195 | 12.3% |  |
| collection-includes | fetchja | 9,822 | 14.1% |  |
| collection-includes | spraypaint | 1,712 | 6.0% |  |
| collection-includes | devour | 11,520 | 5.8% |  |
| patch-single | kitsu | 48,990 | 11.4% |  |
| patch-single | fetchja | 67,184 | 24.3% |  |
| patch-single | spraypaint | 17,440 | 17.6% |  |
| patch-single | devour | 37,506 | 11.0% |  |
| empty-relationships | kitsu | incorrect | — | decoded null relationship differs: author |
| empty-relationships | fetchja | 58,090 | 25.3% |  |
| empty-relationships | spraypaint | incorrect | — | decoded null relationship differs: author |
| empty-relationships | devour | 28,927 | 15.7% |  |
| few-includes | kitsu | 177 | 11.0% |  |
| few-includes | fetchja | 215 | 4.4% |  |
| few-includes | spraypaint | 10.34 | 11.4% |  |
| few-includes | devour | 172 | 9.5% |  |
| many-includes | kitsu | 7.25 | 11.0% |  |
| many-includes | fetchja | 93.19 | 12.7% |  |
| many-includes | spraypaint | 5.38 | 34.0% |  |
| many-includes | devour | 5.09 | 17.5% |  |
| complex-relationships | kitsu | 0.43 | 5.7% |  |
| complex-relationships | fetchja | 13.1 | 10.0% |  |
| complex-relationships | spraypaint | 0.32 | 14.8% |  |
| complex-relationships | devour | timeout | — | worker exceeds 30-second limit |
| self-cycle | kitsu | 24,707 | 6.8% |  |
| self-cycle | fetchja | 30,867 | 24.9% |  |
| self-cycle | spraypaint | 6,866 | 18.0% |  |
| self-cycle | devour | 22,312 | 12.8% |  |
| mutual-cycle | kitsu | 22,198 | 14.2% |  |
| mutual-cycle | fetchja | 26,808 | 14.8% |  |
| mutual-cycle | spraypaint | 6,302 | 16.0% |  |
| mutual-cycle | devour | 20,206 | 12.7% |  |

#### encode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 20,375 | 11.7% |  |
| small-no-relationships | fetchja | 125,542 | 17.3% |  |
| small-no-relationships | spraypaint | 39,151 | 19.2% |  |
| small-no-relationships | devour | 31,823 | 12.5% |  |
| small-links-only | kitsu | 23,249 | 5.5% |  |
| small-links-only | fetchja | 144,318 | 28.4% |  |
| small-links-only | spraypaint | 27,406 | 38.1% |  |
| small-links-only | devour | 31,077 | 15.5% |  |
| small-relationships | kitsu | 18,503 | 10.8% |  |
| small-relationships | fetchja | 102,049 | 17.3% |  |
| small-relationships | spraypaint | incorrect | — | request unexpectedly contains included resources |
| small-relationships | devour | 25,350 | 10.0% |  |
| nested-relationships | kitsu | 22,114 | 2.8% |  |
| nested-relationships | fetchja | 115,737 | 23.8% |  |
| nested-relationships | spraypaint | incorrect | — | request unexpectedly contains included resources |
| nested-relationships | devour | 27,609 | 12.9% |  |
| collection | kitsu | 9,428 | 10.5% |  |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | spraypaint | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | incorrect | — | encoded relationship contains resource object |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | spraypaint | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 23,081 | 13.0% |  |
| patch-single | fetchja | 175,592 | 2.4% |  |
| patch-single | spraypaint | 72,444 | 17.5% |  |
| patch-single | devour | 35,842 | 6.5% |  |
| empty-relationships | kitsu | 21,818 | 2.7% |  |
| empty-relationships | fetchja | 129,771 | 11.3% |  |
| empty-relationships | spraypaint | incorrect | — | encoded request differs from expected attributes or linkage |
| empty-relationships | devour | 28,735 | 11.9% |  |
| few-includes | kitsu | 80.04 | 8.8% |  |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | spraypaint | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 78.14 | 11.2% |  |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | spraypaint | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 52.13 | 13.8% |  |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | spraypaint | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 19,502 | 7.4% |  |
| self-cycle | fetchja | 105,908 | 18.7% |  |
| self-cycle | spraypaint | incorrect | — | request unexpectedly contains included resources |
| self-cycle | devour | 27,792 | 19.3% |  |
| mutual-cycle | kitsu | 19,070 | 5.0% |  |
| mutual-cycle | fetchja | 92,239 | 54.4% |  |
| mutual-cycle | spraypaint | incorrect | — | request unexpectedly contains included resources |
| mutual-cycle | devour | 27,654 | 11.5% |  |

#### decode-encode

| Scenario | Library | Rate | Spread | Detail |
| --- | --- | ---: | ---: | --- |
| small-no-relationships | kitsu | 25,835 | 11.8% | 12,918 cycles/s |
| small-no-relationships | fetchja | 65,245 | 26.3% | 32,622 cycles/s |
| small-no-relationships | spraypaint | 16,406 | 25.0% | 8,203 cycles/s |
| small-no-relationships | devour | 33,152 | 8.8% | 16,576 cycles/s |
| small-links-only | kitsu | 28,549 | 17.7% | 14,274 cycles/s |
| small-links-only | fetchja | 59,328 | 30.5% | 29,664 cycles/s |
| small-links-only | spraypaint | 11,970 | 33.2% | 5,985 cycles/s |
| small-links-only | devour | 29,239 | 11.2% | 14,620 cycles/s |
| small-relationships | kitsu | 20,239 | 7.0% | 10,120 cycles/s |
| small-relationships | fetchja | 44,154 | 26.8% | 22,077 cycles/s |
| small-relationships | spraypaint | incorrect | — | request unexpectedly contains included resources |
| small-relationships | devour | 22,320 | 13.2% | 11,160 cycles/s |
| nested-relationships | kitsu | 24,372 | 15.1% | 12,186 cycles/s |
| nested-relationships | fetchja | 52,782 | 25.2% | 26,391 cycles/s |
| nested-relationships | spraypaint | incorrect | — | request unexpectedly contains included resources |
| nested-relationships | devour | 25,067 | 11.9% | 12,533 cycles/s |
| collection | kitsu | incorrect | — | encoded request differs from expected attributes or linkage |
| collection | fetchja | unsupported | — | public client writes single resources only |
| collection | spraypaint | unsupported | — | public client writes single resources only |
| collection | devour | unsupported | — | public client writes single resources only |
| collection-includes | kitsu | 9,677 | 8.3% | 4,838 cycles/s |
| collection-includes | fetchja | unsupported | — | public client writes single resources only |
| collection-includes | spraypaint | unsupported | — | public client writes single resources only |
| collection-includes | devour | unsupported | — | public client writes single resources only |
| patch-single | kitsu | 32,815 | 14.4% | 16,408 cycles/s |
| patch-single | fetchja | 88,350 | 22.1% | 44,175 cycles/s |
| patch-single | spraypaint | 21,509 | 7.7% | 10,754 cycles/s |
| patch-single | devour | 33,814 | 9.4% | 16,907 cycles/s |
| empty-relationships | kitsu | incorrect | — | decoded null relationship differs: author |
| empty-relationships | fetchja | 69,024 | 22.8% | 34,512 cycles/s |
| empty-relationships | spraypaint | incorrect | — | decoded null relationship differs: author |
| empty-relationships | devour | 28,434 | 13.6% | 14,217 cycles/s |
| few-includes | kitsu | 107 | 9.1% | 53\.46 cycles/s |
| few-includes | fetchja | unsupported | — | public client writes single resources only |
| few-includes | spraypaint | unsupported | — | public client writes single resources only |
| few-includes | devour | unsupported | — | public client writes single resources only |
| many-includes | kitsu | 13.63 | 5.8% | 6\.82 cycles/s |
| many-includes | fetchja | unsupported | — | public client writes single resources only |
| many-includes | spraypaint | unsupported | — | public client writes single resources only |
| many-includes | devour | unsupported | — | public client writes single resources only |
| complex-relationships | kitsu | 0.83 | 16.4% | 0\.41 cycles/s |
| complex-relationships | fetchja | unsupported | — | public client writes single resources only |
| complex-relationships | spraypaint | unsupported | — | public client writes single resources only |
| complex-relationships | devour | unsupported | — | public client writes single resources only |
| self-cycle | kitsu | 20,395 | 8.8% | 10,198 cycles/s |
| self-cycle | fetchja | 44,139 | 24.3% | 22,070 cycles/s |
| self-cycle | spraypaint | incorrect | — | request unexpectedly contains included resources |
| self-cycle | devour | 22,843 | 23.9% | 11,422 cycles/s |
| mutual-cycle | kitsu | 18,899 | 5.0% | 9,450 cycles/s |
| mutual-cycle | fetchja | 44,268 | 24.8% | 22,134 cycles/s |
| mutual-cycle | spraypaint | incorrect | — | request unexpectedly contains included resources |
| mutual-cycle | devour | 21,958 | 10.9% | 10,979 cycles/s |

</details>

Codec APIs: kitsu-core, devour, spraypaint (decode only), yayson, jsona, deserialize-json-api (decode only).
Client APIs: kitsu, fetchja, devour, spraypaint. Public single-resource clients report collection writes as unsupported.
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
