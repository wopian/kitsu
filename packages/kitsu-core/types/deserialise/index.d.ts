/**
 * Deserialises a JSON-API response
 *
 * @param {Object} response The raw JSON:API response object
 * @param {Object} [options={}] Deserialisation options
 * @param {boolean} [options.hoistData=false] If enabled, the contents of the `data` property will be hoisted to the parent. This provides a flatter response object, see examples below for transformation examples. Links and Meta properties will be merged into the parent object if they exist. If attributes named `links` or `meta` exist, they will overwrite the JSON:API `links` and `meta` properties.
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
 *
 * @example <caption>Deserialise with hoisted data</caption>
 * deserialise({
 *   data: {
 *     id: '1',
 *     type: 'people',
 *     relationships: {
 *       coworkers: {
 *         data: [
 *           { id: '2', type: 'people' }
 *         ]
 *       }
 *     }
 *   },
 *   included: []
 * }, { hoistData: true }) // { id: '1', type: 'people', coworkers: [ { id: '2', type: 'people' } ] }
 */
export function deserialise(response: any, options?: {
    hoistData?: boolean;
}): any;
