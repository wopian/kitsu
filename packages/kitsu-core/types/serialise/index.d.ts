/**
 * Serialises an object into a JSON-API structure
 *
 * @param {string} type Resource type
 * @param {Object|Object[]} [data] The data
 * @param {string} [method] Request type (PATCH, POST, DELETE)
 * @param {Object} [options] Optional configuration for camelCase and pluralisation handling
 * @param {Function} [options.camelCaseTypes=s=>s] Convert library-entries and library_entries to libraryEntries (default no conversion). To use parameter, import camel from kitsu-core
 * @param {Function} [options.pluralTypes=s=>s] Pluralise types (default no pluralisation). To use parameter, import pluralize (or another pluralisation npm package)
 * @returns {Object} The serialised data
 *
 * @example <caption>Setting camelCaseTypes and pluralTypes options (example shows options used by the `kitsu` package by default)</caption>
 * import { serialise, camel } from 'kitsu-core'
 * import pluralize from 'pluralize'
 *
 * const model = 'anime'
 * const obj = { id: '1', slug: 'shirobako' }
 *
 * // { data: { id: '1', type: 'anime', attributes: { slug: 'shirobako' } } }
 * const output = serialise(model, obj, 'PATCH', { camelCaseTypes: camel, pluralTypes: pluralize })
 *
 * @example <caption>Basic usage (no case conversion or pluralisation)</caption>
 * import { serialise } from 'kitsu-core'
 *
 * const model = 'anime'
 * const obj = { id: '1', slug: 'shirobako' }
 *
 * // { data: { id: '1', type: 'anime', attributes: { slug: 'shirobako' } } }
 * const output = serialise(model, obj, 'PATCH')
 */
export function serialise(type: string, data?: any | any[], method?: string, options?: {
    camelCaseTypes?: Function;
    pluralTypes?: Function;
}): any;
