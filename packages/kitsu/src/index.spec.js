import pluralize from 'pluralize'
import Kitsu from 'kitsu'

describe('method aliases', () => {
  const api = new Kitsu()

  it('should alias fetch to get', () => {
    expect.assertions(1)
    expect(api.fetch).toEqual(api.get)
  })

  it('should alias update to patch', () => {
    expect.assertions(1)
    expect(api.update).toEqual(api.patch)
  })

  it('should alias create to post', () => {
    expect.assertions(1)
    expect(api.create).toEqual(api.post)
  })
})

describe('class constructor', () => {
  it('should set the required JSON:API headers', () => {
    expect.assertions(2)
    const api = new Kitsu()
    const header = 'application/vnd.api+json'
    expect(api.headers['Accept']).toBe(header)
    expect(api.headers['Content-Type']).toBe(header)
  })

  it('should set provided headers in constructor', () => {
    expect.assertions(1)
    const api = new Kitsu({
      headers: {
        'Key': 'value'
      }
    })
    expect(api.headers['Key']).toBe('value')
  })

  it('should set additional headers', () => {
    expect.assertions(1)
    const api = new Kitsu()
    api.headers['Key'] = 'value'
    expect(api.headers['Key']).toBe('value')
  })

  it('should return all headers', () => {
    expect.assertions(1)
    const api = new Kitsu()
    const header = 'application/vnd.api+json'
    expect(api.headers).toEqual({
      'Accept': header,
      'Content-Type': header
    })
  })

  it('should convert types into camelCase by default', () => {
    expect.assertions(3)
    const api = new Kitsu()
    expect(api.camel('long-word')).toBe('longWord')
    expect(api.camel('long_word')).toBe('longWord')
    expect(api.camel('longWord')).toBe('longWord')
  })

  it('should not convert types into camelCase if camelCaseTypes option is false', () => {
    expect.assertions(3)
    const api = new Kitsu({
      camelCaseTypes: false
    })
    expect(api.camel('long-word')).toBe('long-word')
    expect(api.camel('long_word')).toBe('long_word')
    expect(api.camel('longWord')).toBe('longWord')
  })

  it('should convert resource requests into kebab-case by default', () => {
    expect.assertions(2)
    const api = new Kitsu()
    expect(api.resCase('long-word')).toBe('long-word')
    expect(api.resCase('longWord')).toBe('long-word')
  })

  it('should convert resource requests into snake_case if resourceCase option is \'snake\'', () => {
    expect.assertions(2)
    const api = new Kitsu({
      resourceCase: 'snake'
    })
    expect(api.resCase('long_word')).toBe('long_word')
    expect(api.resCase('longWord')).toBe('long_word')
  })

  it('should not convert resource requests if resourceCase option is \'none\'', () => {
    expect.assertions(3)
    const api = new Kitsu({
      resourceCase: 'none'
    })
    expect(api.resCase('long-word')).toBe('long-word')
    expect(api.resCase('long_word')).toBe('long_word')
    expect(api.resCase('longWord')).toBe('longWord')
  })

  it('should use pluralize by default', () => {
    expect.assertions(2)
    const api = new Kitsu()
    expect(api.plural).toEqual(pluralize)
    expect(api.plural('apple')).toBe('apples')
  })

  it('should not use pluralize if pluralize option is false', () => {
    expect.assertions(1)
    const api = new Kitsu({
      pluralize: false
    })
    expect(api.plural('apple')).toBe('apple')
  })

  it('should use Kitsu.io\'s API by default', () => {
    expect.assertions(1)
    const api = new Kitsu()
    expect(api.axios.defaults.baseURL).toBe('https://kitsu.io/api/edge')
  })

  it('should use API provided in constructor', () => {
    expect.assertions(1)
    const api = new Kitsu({ baseURL: 'https://example.api' })
    expect(api.axios.defaults.baseURL).toBe('https://example.api')
  })
})
