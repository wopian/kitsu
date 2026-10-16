import type { SplitModelOptions } from './types.js'

/**
 * Split model name from the model's resource URL
 *
 * @name splitModel
 * @param {string} url URL path for the model
 * @param {SplitModelOptions} [options={}] Optional transformations for the last path segment
 * @param {function(string): string} [options.resourceCase] Convert the last segment before pluralization. Default: unchanged. Use kebab or snake from kitsu-core.
 * @param {function(string): string} [options.pluralModel] Pluralize the converted last segment. Default: unchanged. Supply a callback or pluralize library function.
 * @returns {Array<string>} Two strings: original last segment and transformed URL
 *
 * @example
 * splitModel('posts/1/comments')
 * // [ 'comments', 'posts/1/comments' ]
 *
 * @example <caption>With pluralModel option</caption>
 * import plural from 'pluralize'
 * splitModel('posts/1/comment', { pluralModel: plural })
 * // [ 'comment', 'posts/1/comments' ]
 *
 * @example <caption>With resourceCase option</caption>
 * import { kebab, snake } from 'kitsu-core'
 * splitModel('libraryEntries', { resourceCase: kebab })
 * // [ 'libraryEntries', 'library-entries' ]
 *
 * splitModel('libraryEntries', { resourceCase: snake })
 * // [ 'libraryEntries', 'library_entries' ]
 */
export function splitModel(url: string, options: SplitModelOptions = {}): [string, string] {
  if (!options.pluralModel) options.pluralModel = (s) => s
  if (!options.resourceCase) options.resourceCase = (s) => s

  const urlSegments = url.split('/')
  const resourceModel = urlSegments.pop() || ''
  urlSegments.push(options.pluralModel(options.resourceCase(resourceModel)))
  const newUrl = urlSegments.join('/')

  return [resourceModel, newUrl]
}
