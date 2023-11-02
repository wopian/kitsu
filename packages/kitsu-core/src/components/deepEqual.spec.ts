import test from 'ava'

import { isDeepEqual } from '../index.js'

const people = {
  one: {
    firstName: 'John',
    lastName: 'Doe',
    age: 35
  },
  two: {
    firstName: 'John',
    lastName: 'Doe',
    age: 35
  },
  three: {
    firstName: 'Akash',
    lastName: 'Thakur',
    age: 35
  },
  four: {
    firstName: 'Jane',
    lastName: 'Doe'
  },
  five: {
    address: {
      street: '123 Main St',
      inhabitants: ['Chuck', 'Howard', { name: 'Jimmy', age: 35 }]
    }
  },
  six: {
    address: {
      street: '123 Main St',
      inhabitants: ['Chuck', 'Howard', { name: 'Jimmy', age: 35 }]
    }
  },
  seven: {
    address: {
      street: '456 Main St',
      inhabitants: ['Chuck', 'Howard', { name: 'Jimmy', age: 35 }]
    }
  },
  eight: {
    address: {
      street: '123 Main St',
      inhabitants: ['Howard', { name: 'Jimmy', age: 35 }, 'Chuck']
    }
  }
}

test('checks identical objects are equal', t => {
  t.true(isDeepEqual(people.one, people.two))
  t.deepEqual(people.one, people.two)
})

test('checks different objects are not equal', t => {
  t.false(isDeepEqual(people.one, people.three))
  t.notDeepEqual(people.one, people.three)
})

test('checks objects have the same number of keys', t => {
  t.false(isDeepEqual(people.one, people.four))
  t.notDeepEqual(people.one, people.four)
})

test('checks nested objects are equal', t => {
  t.true(isDeepEqual(people.five, people.six))
  t.deepEqual(people.five, people.six)

  t.false(isDeepEqual(people.five, people.seven))
  t.notDeepEqual(people.five, people.seven)

  t.false(isDeepEqual(people.five, people.eight))
  t.notDeepEqual(people.five, people.eight)
})
