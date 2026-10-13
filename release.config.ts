import { fileURLToPath } from 'node:url'

export default {
  branches: ['master'],
  // biome-ignore lint/suspicious/noTemplateCurlyInString: semantic-release tag syntax.
  tagFormat: 'v${version}',
  repositoryUrl: 'https://github.com/wopian/kitsu.git',
  plugins: [fileURLToPath(new URL('./scripts/release/impact.ts', import.meta.url))],
}
