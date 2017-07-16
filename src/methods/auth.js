import OAuth2 from 'client-oauth2'

/**
 * Authenticate as a Kitsu.io user
 * @memberof Kitsu
 * @param {Object} options
 * @param {String} options.clientId Unique client ID
 * @param {String} options.clientSecret Unique client secret
 * @param {String} options.username User's username
 * @param {String} options.password User's password
 * @returns {Object} An object containing the `accessToken`
 *
 * @example
 * kitsu.auth({
 *   clientId: '1234567890',
 *   clientSecret: '0987654321',
 *   username: 'josh',
 *   password: 'hunter2'
 * })
 */
export default async function ({ clientId, clientSecret, username, password }) {
  try {
    if (clientId && clientSecret && username && password) {
      const { owner } = new OAuth2({
        clientId,
        clientSecret,
        accessTokenUri: `${this._apiUrl}/oauth/token`
      })

      let { accessToken } = await owner.getToken(username, password)

      this._options.headers = Object.assign(this._options.headers, {
        'authorization': `Bearer ${accessToken}`
      })

      return { accessToken }
    } else {
      throw new Error('Missing required properties for authentication')
    }
  } catch (e) {
    throw e
  }
}
