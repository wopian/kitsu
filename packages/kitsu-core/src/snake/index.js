/**
 * Converts camelCase into snake_case
 *
 * @name snake
 * @param {string} s camelCase string
 * @returns {string} snake_case formatted string
 */
export default s => s.charAt(0).toLowerCase() + s.slice(1).replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, match => '_' + match.toLowerCase())
