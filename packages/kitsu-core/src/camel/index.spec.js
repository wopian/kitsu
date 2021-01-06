import { camel } from './'

describe('kitsu-core', () => {
  describe('camel', () => {
    it('camelCases a kebab-case string', () => {
      expect.assertions(1)
      expect(camel('long-word')).toBe('longWord')
    })

    it('camelCases a camelCase string', () => {
      expect.assertions(1)
      expect(camel('longWord')).toBe('longWord')
    })

    it('camelCases a snake_case string', () => {
      expect.assertions(1)
      expect(camel('long_word')).toBe('longWord')
    })
  })
})
