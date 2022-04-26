<h1 align=center>Kitsu</h1>

<p align=center>
  <a href=https://github.com/wopian/kitsu/actions><img alt=checks src=https://flat.badgen.net/github/checks/wopian/kitsu></a>
  <a href="https://david-dm.org/wopian/kitsu?type=dev"><img alt=devDeps src=https://flat.badgen.net/david/dev/wopian/kitsu></a>
  <a href=https://codeclimate.com/github/wopian/kitsu/code?sort=test_coverage><img alt=coverage src=https://flat.badgen.net/codeclimate/coverage/wopian/kitsu></a>
  <a href=https://codeclimate.com/github/wopian/kitsu/code?sort=maintainability><img alt=maintainability src=https://flat.badgen.net/codeclimate/maintainability/wopian/kitsu></a>
</p>

<p align=center>
  <a href=https://github.com/wopian/kitsu/network/dependents><img alt=repoDependants src=https://flat.badgen.net/github/dependents-repo/wopian/kitsu></a>
  <a href=https://github.com/wopian/kitsu/graphs/contributors><img alt=contributors src=https://flat.badgen.net/github/contributors/wopian/kitsu></a>
  <a href=https://github.com/sponsors/wopian><img alt=sponsor src='https://flat.badgen.net/badge/sponsor/%E2%9D%A4/pink?icon=github'></a>
</p>

<p align=center>A simple, lightweight & framework agnostic <a href=http://jsonapi.org>JSON:API</a> client for <a href=https://kitsu.io>Kitsu.io</a> & other APIs</p>

#

This is a monorepo containing the following packages:

- [kitsu]—Framework agnostic client using Axios
- [kitsu-core]—Framework agnostic (de)serialisation components

## Features

- JSON-API 1.0 compliant
- Automatically links relationships to data
- Works in Node & browsers

## Node / Browser Support

|      Package | Package<br> Size\* | Node | Chrome | Firefox | Safari | Edge |
| -----------: | :----------------: | :--: | :----: | :-----: | :----: | :--: |
|      `kitsu` |      ≤ 8.2 kb      | 14+  |  83+   |   78+   | 13.1+  | 95+  |
| `kitsu-core` |      ≤ 1.6 kb      | 14+  |  83+   |   78+   | 13.1+  | 95+  |

\* Including all dependencies & minified with brotli

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
