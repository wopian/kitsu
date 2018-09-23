const tap = require('tap')
// import pluralize from 'pluralize'
const Kitsu = require('../node')

tap.test('> kitsu', t => {
  t.test('> method aliases', t => {
    const api = new Kitsu()

    t.test('> aliases fetch to get', t => {
      const expection = api.fetch === api.get
      t.ok(expection)
      t.matchSnapshot(expection, '> matches snapshot')
      t.end()
    })

    t.test('> aliases update to patch', t => {
      const expection = api.update === api.patch
      t.ok(expection)
      t.matchSnapshot(expection, '> matches snapshot')
      t.end()
    })

    t.test('> aliases create to post', t => {
      const expection = api.create === api.post
      t.ok(expection)
      t.matchSnapshot(expection, '> matches snapshot')
      t.end()
    })

    t.end()
  })

  t.test('> class constructor', t => {
    t.test('> sets the required JSON:API headers', t => {
      const api = new Kitsu()
      const header = 'application/vnd.api+json'
      t.ok(api.headers['Accept'] === header)
      t.matchSnapshot(api.headers['Accept'] === header, '> matches snapshot')

      t.ok(api.headers['Content-Type'] === header)
      t.matchSnapshot(api.headers['Content-Type'] === header, '> matches snapshot')
      t.end()
    })

    t.test('> sets provided headers in constructor', t => {
      const api = new Kitsu({ headers: { 'Key': 'value' } })
      t.ok(api.headers['Key'] === 'value')
      t.matchSnapshot(api.headers['Key'] === 'value', '> matches snapshot')
      t.end()
    })

    t.test('> sets additional headers', t => {
      const api = new Kitsu()
      api.headers['Key'] = 'value'
      t.ok(api.headers['Key'] === 'value')
      t.matchSnapshot(api.headers['Key'] === 'value', '> matches snapshot')
      t.end()
    })

    t.end()
  })

  t.end()
})

/*
describe('kitsu', () => {
  describe('class constructor', () => {
    it('returns all headers', () => {
      expect.assertions(1)
      const api = new Kitsu()
      const header = 'application/vnd.api+json'
      expect(api.headers).toEqual({
        'Accept': header,
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

    it('uses Kitsu.io\'s API by default', () => {
      expect.assertions(1)
      const api = new Kitsu()
      expect(api.axios.defaults.baseURL).toBe('https://kitsu.io/api/edge')
    })

    it('uses the API provided in constructor', () => {
      expect.assertions(1)
      const api = new Kitsu({ baseURL: 'https://example.api' })
      expect(api.axios.defaults.baseURL).toBe('https://example.api')
    })
  })
})
*/
