import r from 'got'
import { version } from '../package'

const apiVersion = 'edge'
const apiUrl = `https://kitsu.io/api/${apiVersion}`

export default class Kitsu {
  constructor (opts) {
    this._auth = false
    this._headers = Object.assign({
      'user-agent': `Kitsu/${version} (https://github.com/wopian/kitsu)`
    }, opts.headers, {
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    })
  }

  get = async (model, opts = {}) => {
    // Setup headers
    opts.headers = Object.assign(
      opts.headers,
      this._headers
    )

    console.log(opts)

    try {
      const { body, statusCode, statusMessage } = await r(`${apiUrl}/${model}`, opts)
      console.log(statusCode, statusMessage)
      return body
    } catch (e) {
      console.log(e.statusCode)
      console.log(e.statusMessage)
      console.log(e.path)
    }
  }
}

