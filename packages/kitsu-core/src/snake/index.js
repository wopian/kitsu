/**
 * Converts camelCase into snake_case
 *
 * @name snake
 * @param {string} input camelCase string
 * @returns {string} snake_case formatted string
 *
 * @example
 * snake('helloWorld') // 'hello_world'
 */
export default input => input.charAt(0).toLowerCase() + input.slice(1).replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, match => '_' + match.toLowerCase())
