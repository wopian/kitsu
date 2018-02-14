import kebab from './'

describe('kebab', () => {
  it('should snake_case a camelCase string', () => {
    expect.assertions(1)
    expect(kebab('helloWorld')).toBe('hello_world')
  })

  it('should snake_case a CamelCase string', () => {
    expect.assertions(1)
    expect(kebab('HelloWorld')).toBe('hello_world')
  })

  it('should snake_case a snake_case string', () => {
    expect.assertions(1)
    expect(kebab('hello-world')).toBe('hello-world')
  })
})
