import test from 'ava'

import { deattribute } from '../index.js'

test('deattribute', t => {
  t.deepEqual(
    deattribute({
      id: '1',
      type: 'test',
      attributes: {
        name: 'Test',
        age: 20,
        alive: true,
        undefined: undefined,
        object: {},
        array: [],
        stringArray: ['a', 'b', 'c'],
        numberArray: [1, 2, 3],
        booleanArray: [true, false, true]
      }
    }),
    {
      id: '1',
      type: 'test',
      name: 'Test',
      age: 20,
      alive: true,
      undefined: undefined,
      object: {},
      array: [],
      stringArray: ['a', 'b', 'c'],
      numberArray: [1, 2, 3],
      booleanArray: [true, false, true]
    }
  )
})

test('deattribute with attributes.attributes', t => {
  t.deepEqual(
    deattribute({
      id: '2',
      type: 'test',
      attributes: {
        name: 'Test',
        age: 20,
        attributes: {
          alive: true
        }
      }
    }),
    {
      id: '2',
      type: 'test',
      name: 'Test',
      age: 20,
      attributes: {
        alive: true
      }
    }
  )
})

test('deattribute array', t => {
  t.deepEqual(
    deattribute([
      {
        id: '2',
        type: 'test',
        attributes: {
          name: 'Test',
          age: 20,
          attributes: {
            alive: true
          }
        }
      }
    ]),
    [
      {
        id: '2',
        type: 'test',
        name: 'Test',
        age: 20,
        attributes: {
          alive: true
        }
      }
    ]
  )
})
