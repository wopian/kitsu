import { snake } from './'

describe('kitsu-core', () => {
  describe('snake', () => {
    it('snake_cases a camelCase string', () => {
      expect.assertions(1)
      expect(snake('helloWorld')).toBe('hello_world')
    })

    it('snake_cases a CamelCase string', () => {
      expect.assertions(1)
      expect(snake('HelloWorld')).toBe('hello_world')
    })

    it('snake_cases a snake_case string', () => {
      expect.assertions(1)
      expect(snake('hello-world')).toBe('hello-world')
    })
  })
})
