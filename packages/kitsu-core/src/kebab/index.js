/**
 * Converts camelCase into kebab-case
 *
 * @name kebab
 * @param {string} s camelCase string
 * @returns {string} kekab-case formatted string
 *
 * @example
 * kebab('helloWorld') // 'hello-world'
 */
export default s => s.charAt(0).toLowerCase() + s.slice(1).replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, match => '-' + match.toLowerCase())
