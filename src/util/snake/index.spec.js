import kebab from './'

describe('kebab', () => {
  it('Should snake_case a camelCase string', () => {
    expect.assertions(1)
    expect(kebab('helloWorld')).toBe('hello_world')
  })

  it('Should snake_case a snake_case string', () => {
    expect.assertions(1)
    expect(kebab('hello-world')).toBe('hello-world')
  })
})
