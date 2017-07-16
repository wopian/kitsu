/**
 * Set new or updated headers
 * @param {String} field Header field name
 * @param {String} value Header field value
 *
 * @example
 * kitsu.header('user-agent', 'MyApp/1.0.0 (contact or link to repo)')
 */
export default async function (field, value) {
  // Prevent overriding the JSON API headers
  if (field.toLowerCase() !== 'accepts' &&
      field.toLowerCase() !== 'content-type'
  ) this._opts.headers[field.toLowerCase()] = value
}
