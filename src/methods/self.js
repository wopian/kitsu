import fetch from './fetch'

export default async function (params) {
  try {
    const { data } = await fetch.bind(this)('users', Object.assign({ filter: { self: true } }, params))
    return data[0]
  } catch (error) {
    return error
  }
}
