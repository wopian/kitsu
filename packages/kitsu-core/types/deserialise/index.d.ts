/**
 * Deserialises a JSON-API response
 *
 * @param {Object} response The raw JSON:API response object
 * @param {Object} [options={}] Deserialisation options
 * @param {boolean} [options.hoistData=false] If enabled, the contents of the `data` property will be hoisted to the parent. This provides a flatter response object, but removes access to `links` and `meta` properties. It will transform:
 * ```js
 * { data: { id: '1', type: 'people', coworkers: data: [ { id: '2', type: 'people' } ] } }
 * ```
 * into the following:
 * ```js
 * { id: '1', type: 'people', coworkers: [ { id: '2', type: 'people' } ] }
 * ```
 * @returns {Object} The deserialised response
 *
 * @example <caption>Deserialise with a basic data object</caption>
 * deserialise({
 *   data: {
 *     id: '1',
 *     attributes: { liked: true }
 *   },
 *   meta: { hello: 'world' }
 * }) // { data: { id: '1', liked: true }, meta: { hello: 'world' } }
 *
 * @example <caption>Deserialise with relationships</caption>
 * deserialise({
 *   data: {
 *     id: '1',
 *     relationships: {
 *       user: {
 *         data: {
 *           type: 'users',
 *           id: '2' }
 *       }
 *     }
 *   },
 *   included: [
 *     {
 *       type: 'users',
 *       id: '2',
 *       attributes: { slug: 'wopian' }
 *     }
 *   ]
 * }) // { data: { id: '1', user: { data: { type: 'users', id: '2', slug: 'wopian' } } } }
 */
export function deserialise(response: any, options?: {
    hoistData?: boolean;
}): any;
