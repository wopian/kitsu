import { describe, expect, it } from 'bun:test'
import { isDeepEqual } from '../deepEqual.js'

describe('kitsu-core', () => {
  describe('isDeepEqual', () => {
    it('compares absent values without treating null as undefined', () => {
      expect(isDeepEqual(undefined, undefined)).toBe(true)
      expect(isDeepEqual(null, undefined)).toBe(false)
    })
    it('distinguishes primitive values, arrays, and object keys', () => {
      expect(isDeepEqual(1, 2)).toBe(false)
      expect(isDeepEqual([1], { 0: 1 })).toBe(false)
      expect(isDeepEqual({ a: undefined }, { b: undefined })).toBe(false)
      expect(isDeepEqual({ a: null }, { a: undefined })).toBe(false)
    })
    const people = {
      one: {
        firstName: 'John',
        lastName: 'Doe',
        age: 35,
      },
      two: {
        firstName: 'John',
        lastName: 'Doe',
        age: 35,
      },
      three: {
        firstName: 'Akash',
        lastName: 'Thakur',
        age: 35,
      },
      four: {
        firstName: 'Jane',
        lastName: 'Doe',
      },
      five: {
        address: {
          street: '123 Main St',
        },
      },
      six: {
        address: {
          street: '123 Main St',
        },
      },
      seven: {
        address: {
          street: '456 Main St',
        },
      },
    }

    it('checks indentical objects are equal', () => {
      expect.assertions(1)
      expect(isDeepEqual(people.one, people.two)).toBe(true)
    })

    it('checks different objects are not equal', () => {
      expect.assertions(1)
      expect(isDeepEqual(people.one, people.three)).toBe(false)
    })

    it('checks objects have the same number of keys', () => {
      expect.assertions(1)
      expect(isDeepEqual(people.one, people.four)).toBe(false)
    })

    it('checks nested objects are equal', () => {
      expect.assertions(2)
      expect(isDeepEqual(people.five, people.six)).toBe(true)
      expect(isDeepEqual(people.five, people.seven)).toBe(false)
    })
  })
})
