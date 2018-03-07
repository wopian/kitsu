import kebab from './'

describe('kitsu-core', () => {
  describe('kebab', () => {
    it('snake_cases a camelCase string', () => {
      expect.assertions(1)
      expect(kebab('helloWorld')).toBe('hello_world')
    })

    it('snake_cases a CamelCase string', () => {
      expect.assertions(1)
      expect(kebab('HelloWorld')).toBe('hello_world')
    })

    it('snake_cases a snake_case string', () => {
      expect.assertions(1)
      expect(kebab('hello-world')).toBe('hello-world')
    })
  })
})
