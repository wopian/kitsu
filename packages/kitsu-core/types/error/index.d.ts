/**
 * Uniform error handling for Axios, JSON:API and internal package errors. Mutated Error object is rethrown to the caller.
 *
 * @param {Object} Error The Error
 * @throws {Object} The mutated Error
 *
 * @example
 * error('Hello')
 *
 * @example
 * error({errors: [ { code: 400 } ]})
 *
 * @example
 * error({
 *   response: {
 *     data: {
 *       errors: [ {
 *         title: 'Filter is not allowed',
 *         detail: 'x is not allowed',
 *         code: '102',
 *         status: '400'
 *       } ]
 *     }
 *   }
 * })
 */
export function error(Error: any): void;
