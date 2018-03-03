import kebab from './'

describe('kitsu-core', () => {
  describe('kebab', () => {
    it('should kebab-case a camelCase string', () => {
      expect.assertions(1)
      expect(kebab('helloWorld')).toBe('hello-world')
    })

    it('should kebab-case a CamelCase string', () => {
      expect.assertions(1)
      expect(kebab('HelloWorld')).toBe('hello-world')
    })

    it('should kebab-case a kebab-case string', () => {
      expect.assertions(1)
      expect(kebab('hello-world')).toBe('hello-world')
    })
  })
})
