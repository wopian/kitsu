import { isDeepEqual } from './'

describe('kitsu-core', () => {
  describe('IsDeepEqual', () => {
    const person1 = {
      firstName: 'John',
      lastName: 'Doe',
      age: 35
    }

    const person2 = {
      firstName: 'John',
      lastName: 'Doe',
      age: 35
    }

    const person3 = {
      firstName: 'Akash',
      lastName: 'Thakur',
      age: 35
    }

    it('Equality check for two same collections', () => {
      expect.assertions(1)
      expect(isDeepEqual(person1, person2)).toBe(true)
    })

    it('Equality check for two different collections', () => {
      expect.assertions(1)
      expect(isDeepEqual(person1, person3)).toBe(false)
    })
  })
})
