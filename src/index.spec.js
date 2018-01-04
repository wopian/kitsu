import pluralize from 'pluralize'
import Kitsu from 'kitsu'

describe('Method Aliases', () => {
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

describe('Constructor', () => {
  it('Should set the required JSON:API headers', () => {
    expect.assertions(2)
    const api = new Kitsu()
    const header = 'application/vnd.api+json'
    expect(api.headers['Accept']).toBe(header)
    expect(api.headers['Content-Type']).toBe(header)
  })

  it('Should set provided headers in constructor', () => {
    expect.assertions(1)
    const api = new Kitsu({
      headers: {
        'Key': 'value'
      }
    })
    expect(api.headers['Key']).toBe('value')
  })

  it('Should set additional headers', () => {
    expect.assertions(1)
    const api = new Kitsu()
    api.headers['Key'] = 'value'
    expect(api.headers['Key']).toBe('value')
  })

  it('Should return all headers', () => {
    expect.assertions(1)
    const api = new Kitsu()
    const header = 'application/vnd.api+json'
    expect(api.headers).toEqual({
      'Accept': header,
      'Content-Type': header
    })
  })

  it('Should convert types into camelCase by default', () => {
    expect.assertions(3)
    const api = new Kitsu()
    expect(api.camel('long-word')).toBe('longWord')
    expect(api.camel('long_word')).toBe('longWord')
    expect(api.camel('longWord')).toBe('longWord')
  })

  it('Should not convert types into camelCase if camelCaseTypes option is false', () => {
    expect.assertions(3)
    const api = new Kitsu({
      camelCaseTypes: false
    })
    expect(api.camel('long-word')).toBe('long-word')
    expect(api.camel('long_word')).toBe('long_word')
    expect(api.camel('longWord')).toBe('longWord')
  })

  it('Should convert resource requests into kebab-case by default', () => {
    expect.assertions(2)
    const api = new Kitsu()
    expect(api.resCase('long-word')).toBe('long-word')
    expect(api.resCase('longWord')).toBe('long-word')
  })

  it('Should convert resource requests into snake_case if resourceCase option is \'snake\'', () => {
    expect.assertions(2)
    const api = new Kitsu({
      resourceCase: 'snake'
    })
    expect(api.resCase('long_word')).toBe('long_word')
    expect(api.resCase('longWord')).toBe('long_word')
  })

  it('Should not convert resource requests if resourceCase option is \'none\'', () => {
    expect.assertions(3)
    const api = new Kitsu({
      resourceCase: 'none'
    })
    expect(api.resCase('long-word')).toBe('long-word')
    expect(api.resCase('long_word')).toBe('long_word')
    expect(api.resCase('longWord')).toBe('longWord')
  })

  it('Should use pluralize by default', () => {
    expect.assertions(2)
    const api = new Kitsu()
    expect(api.plural).toEqual(pluralize)
    expect(api.plural('apple')).toBe('apples')
  })

  it('Should not use pluralize if pluralize option is false', () => {
    expect.assertions(1)
    const api = new Kitsu({
      pluralize: false
    })
    expect(api.plural('apple')).toBe('apple')
  })
})
