# Contributing

## Code Style

ESLint will report any style violations and automatically fix any fixable errors with `yarn lint`

## Commit Messages

Semantic commit messages are used:

```
feat(category): added feature x
```

|   Category | Usage                                      |
| ---------: | ------------------------------------------ |
|    `empty` | Changes to monorepo, no change to packages |
|      kitsu | Changes to the `kitsu` package             |
| kitsu-core | Changes to the `kitsu-core` package        |

|     Type | Usage                                          |
| -------: | ---------------------------------------------- |
|       ci | Continuous Integration changes                 |
|    chore | Build scripts, no production code change       |
|     feat | New feature/enhancement                        |
|      fix | Fix a bug for users - not build related issues |
| refactor | Refactoring production code, optimisations     |
|    style | Formatting changes, no code change             |
|     test | Adding, refactoring or fixing tests            |

## Requirements

- [git](https://git-scm.com/) ^2 or newer
- [node.js](https://nodejs.org) ^18 or newer
- [yarn](https://https://yarnpkg.com) ^3 or newer

## Setup

1. Fork this repo

1. Clone your fork:

   ```bash
   git clone https://github.com/your-username/kitsu.git
   cd kitsu
   ```

1. Create a feature branch:

   ```bash
   git checkout -b your-feature-name
   ```

1. Install dependencies:

   ```bash
   yarn
   yarn plugin import workspace-tools
   ```

1. Test changes

   ```
   yarn test
   ```

1. Lint changes

   ```
   yarn lint
   ```

1. Commit changes:

   ```bash
   git commit -am 'feat: add feature name'
   ```

1. Push changes:

   ```bash
   git push origin your-feature-name
   ```

1. Open a pull request
