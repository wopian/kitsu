import JsonApi from 'devour-client'
import { version } from '../package'

const baseUrl = 'https://kitsu.io/api'
const kitsu = new JsonApi({
  apiUrl: `${baseUrl}/edge`,
  logger: false
})

kitsu.headers['User-Agent'] = `Kitsu/${version} (https://github.com/wopian/kitsu)`

export default kitsu
