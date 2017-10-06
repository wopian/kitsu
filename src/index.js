import axios from 'axios'
import create from './methods/create'
import fetch from './methods/fetch'
import remove from './methods/remove'
import self from './methods/self'
import update from './methods/update'
import { version } from '../package.json'

export default class Kitsu {
  constructor (options = {}) {
    this.axios = axios.create({
      baseURL: (options.baseURL || 'https://kitsu.io/api') + '/' + (options.version || 'edge'),
      timeout: options.timeout || 3000,
      headers: Object.assign(options.headers, {
        'accept': 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json'
      })
    })
  }

  fetch = fetch.bind(this)
  update = update.bind(this)
  create = create.bind(this)
  remove = remove.bind(this)
  self = self.bind(this)

  // Aliases (kitsu <= 2.0.4)
  get = this.fetch
  find = this.fetch
  findAll = this.fetch
  patch = this.update
  post = this.create
  destroy = this.remove
  whoAmI = this.self

  // TODO: Fix headers for 3.0.0 release
  get headers () {
    return this.axios.defaults.headers
  }
}
