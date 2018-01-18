import kebab from './'

describe('kebab', () => {
  it('Should kebab-case a camelCase string', () => {
    expect.assertions(1)
    expect(kebab('helloWorld')).toBe('hello-world')
  })

  it('Should kebab-case a CamelCase string', () => {
    expect.assertions(1)
    expect(kebab('HelloWorld')).toBe('hello-world')
  })

  it('Should kebab-case a kebab-case string', () => {
    expect.assertions(1)
    expect(kebab('hello-world')).toBe('hello-world')
  })
})
