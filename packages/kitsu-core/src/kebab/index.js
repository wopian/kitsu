/**
 * Converts camelCase into kebab-case
 *
 * @name kebab
 * @param {string} input camelCase string
 * @returns {string} kebab-case formatted string
 *
 * @example
 * kebab('helloWorld') // 'hello-world'
 */
export default input => input.charAt(0).toLowerCase() + input.slice(1).replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, match => '-' + match.toLowerCase())
