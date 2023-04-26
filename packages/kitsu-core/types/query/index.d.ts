/**
 * Formats key names to correct array syntax
 *
 * @param {string} [param] Parameter name to parse
 *
 * @returns {string} Key name in nested query-param format with optional array style suffix
 * @private
 */
export function paramKeyName(param?: string): string;
/**
 * Constructs a URL query string for JSON:API parameters
 *
 * @param {Object} [params] Parameters to parse
 * @param {string} [prefix] Prefix for nested parameters - used internally
 * @param {boolean} [traditional=true] Use the traditional (default) or modern param serializer. Set to false if your server is running Ruby on Rails or other modern web frameworks
 * @returns {string} URL query string
 *
 * @example
 * query({
 *   filter: {
 *     slug: 'cowboy-bebop',
 *     title: {
 *       value: 'foo'
 *     }
 *   }
 *  sort: '-id'
 * })
 * // filter%5Bslug%5D=cowboy-bebop&filter%5Btitle%5D%5Bvalue%5D=foo&sort=-id
 */
export function query(params?: any, prefix?: string, traditional?: boolean): string;
