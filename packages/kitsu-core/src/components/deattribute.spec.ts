import test from 'ava'

import { deattribute } from '../index.js'
import { ResourceObject } from '../resources/resourceObject.js'

test('deattributes a valid ResourceObject', t => {
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

test('deattributes a ResourceObject when attributes has the key "attributes"', t => {
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

test('deattributes arrays of ResourceObject', t => {
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

// subject to change
const fun = () => 'im a function'
test('performs no operation on a ResourceObject with invalid attributes', t => {
  t.deepEqual(
    deattribute({
      id: '1',
      type: 'test',
      attributes: fun
    } as ResourceObject),
    {
      id: '1',
      type: 'test',
      attributes: fun
    }
  )
})
