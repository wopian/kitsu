import { kebab } from './'

describe('kitsu-core', () => {
  describe('kebab', () => {
    it('kebab-cases a camelCase string', () => {
      expect.assertions(1)
      expect(kebab('helloWorld')).toBe('hello-world')
    })

    it('kebab-cases a CamelCase string', () => {
      expect.assertions(1)
      expect(kebab('HelloWorld')).toBe('hello-world')
    })

    it('kebab-cases a kebab-case string', () => {
      expect.assertions(1)
      expect(kebab('hello-world')).toBe('hello-world')
    })
  })
})
