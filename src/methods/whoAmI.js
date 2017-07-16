/**
 * Get user data of the authenticated user
 * @memberof Kitsu
 * @param {Object} opts
 * @param {Boolean} opts.compact Return only the user ID & name
 * @returns {Object} user data
 *
 * @example
 * kitsu.whoAmI()
 */
export default async function ({ compact } = false) {
  try {
    if (!this.isAuth) throw new Error('Not authenticated')
    return (await this.get('users', compact ? {
      filter: { self: true },
      fields: { users: 'name' }
    } : {
      filter: { self: true }
    })).data[0]
  } catch (e) {
    throw e
  }
}
