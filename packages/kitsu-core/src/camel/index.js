/**
 * Converts kebab-case and snake_case into camelCase
 *
 * @name camel
 * @param {string} input String to convert
 * @returns {string} camelCase formatted string
 *
 * @example <caption>Convert kebab-case</caption>
 * camel('hello-world') // 'helloWorld'
 *
 * @example <caption>Convert snake_case</caption>
 * camel('hello_world') // 'helloWorld'
 */
export default input => input.replace(/[-_][a-z\u00E0-\u00F6\u00F8-\u00FE]/g, match => match.slice(1).toUpperCase())
