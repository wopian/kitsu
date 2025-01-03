import pluralize from 'pluralize'
import Kitsu from 'kitsu'

describe('kitsu', () => {
  describe('method aliases', () => {
    const api = new Kitsu()

    it('aliases fetch to get', () => {
      expect.assertions(1)
      expect(api.fetch).toEqual(api.get)
    })

    it('aliases update to patch', () => {
      expect.assertions(1)
      expect(api.update).toEqual(api.patch)
    })

    it('aliases create to post', () => {
      expect.assertions(1)
      expect(api.create).toEqual(api.post)
    })

    it('aliases interceptors to axios.interceptors', () => {
      expect.assertions(1)
      expect(api.interceptors).toEqual(api.axios.interceptors)
    })
  })

  describe('class constructor', () => {
    it('sets the required JSON:API headers', () => {
      expect.assertions(2)
      const api = new Kitsu()
      const header = 'application/vnd.api+json'
      expect(api.headers.Accept).toBe(header)
      expect(api.headers['Content-Type']).toBe(header)
    })

    it('sets provided headers in constructor', () => {
      expect.assertions(1)
      const api = new Kitsu({
        headers: {
          Key: 'value'
        }
      })
      expect(api.headers.Key).toBe('value')
    })

    it('sets additional headers', () => {
      expect.assertions(1)
      const api = new Kitsu()
      api.headers.Key = 'value'
      expect(api.headers.Key).toBe('value')
    })

    it('returns all headers', () => {
      expect.assertions(1)
      const api = new Kitsu()
      const header = 'application/vnd.api+json'
      expect(api.headers).toEqual({
        Accept: header,
        'Content-Type': header
      })
    })

    it('converts types into camelCase by default', () => {
      expect.assertions(3)
      const api = new Kitsu()
      expect(api.camel('long-word')).toBe('longWord')
      expect(api.camel('long_word')).toBe('longWord')
      expect(api.camel('longWord')).toBe('longWord')
    })

    it('does not convert types into camelCase if camelCaseTypes option is false', () => {
      expect.assertions(3)
      const api = new Kitsu({
        camelCaseTypes: false
      })
      expect(api.camel('long-word')).toBe('long-word')
      expect(api.camel('long_word')).toBe('long_word')
      expect(api.camel('longWord')).toBe('longWord')
    })

    it('converts resource requests into kebab-case by default', () => {
      expect.assertions(2)
      const api = new Kitsu()
      expect(api.resCase('long-word')).toBe('long-word')
      expect(api.resCase('longWord')).toBe('long-word')
    })

    it('converts resource requests into snake_case if resourceCase option is \'snake\'', () => {
      expect.assertions(2)
      const api = new Kitsu({
        resourceCase: 'snake'
      })
      expect(api.resCase('long_word')).toBe('long_word')
      expect(api.resCase('longWord')).toBe('long_word')
    })

    it('does not convert resource requests if resourceCase option is \'none\'', () => {
      expect.assertions(3)
      const api = new Kitsu({
        resourceCase: 'none'
      })
      expect(api.resCase('long-word')).toBe('long-word')
      expect(api.resCase('long_word')).toBe('long_word')
      expect(api.resCase('longWord')).toBe('longWord')
    })

    it('uses pluralize by default', () => {
      expect.assertions(2)
      const api = new Kitsu()
      expect(api.plural).toEqual(pluralize)
      expect(api.plural('apple')).toBe('apples')
    })

    it('does not use pluralize if pluralize option is false', () => {
      expect.assertions(1)
      const api = new Kitsu({
        pluralize: false
      })
      expect(api.plural('apple')).toBe('apple')
    })

    it('uses kitsu.app\'s API by default', () => {
      expect.assertions(1)
      const api = new Kitsu()
      expect(api.axios.defaults.baseURL).toBe('https://kitsu.app/api/edge')
    })

    it('uses the API provided in constructor', () => {
      expect.assertions(1)
      const api = new Kitsu({ baseURL: 'https://example.api' })
      expect(api.axios.defaults.baseURL).toBe('https://example.api')
    })

    it('uses the query serializer provided in constructor', () => {
      expect.assertions(1)
      const stringsOnlyQuery = obj => Object.keys(obj).reduce((acc, key) =>
        typeof obj[key] === 'string' ? [ ...acc, `${key}=${obj[key]}` ] : acc, []
      ).join('&')

      const api = new Kitsu({ query: stringsOnlyQuery })
      expect(api.query({ a: 1, b: 'str', c: 3, d: 'ing' })).toBe('b=str&d=ing')
    })

    it('uses the traditional query serializer by default', () => {
      expect.assertions(1)
      const api = new Kitsu({})
      expect(api.query({ id_in: [ 1, 2, 3 ] })).toBe('id_in=1&id_in=2&id_in=3')
    })

    it('uses the modern query serializer if query option is "modern"', () => {
      expect.assertions(1)
      const api = new Kitsu({ query: 'modern' })
      expect(api.query({ id_in: [ 1, 2, 3 ] })).toBe('id_in%5B%5D=1&id_in%5B%5D=2&id_in%5B%5D=3')
    })

    it('uses provided axios options', () => {
      expect.assertions(1)
      const api = new Kitsu({ axiosOptions: { withCredentials: true } })
      expect(api.axios.defaults.withCredentials).toBe(true)
    })
  })
})
