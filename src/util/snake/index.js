/**
 * Converts camelCase into snake_case
 *
 * @param {string} s camelCase string
 * @returns {string} snake_case formatted string
 * @private
 */
export default s => s.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, match => '_' + match.toLowerCase())
