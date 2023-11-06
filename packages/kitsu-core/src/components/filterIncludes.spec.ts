import test from 'ava'

import { filterIncludes } from './filterIncludes'

test('throws an error if included is not an array', t => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t.throws(() => filterIncludes({} as any, { id: '1', type: 'anime' }), {
    message: 'included.find is not a function'
  })
})

test('returns id and type if included is empty', t => {
  const response = filterIncludes([], { id: '1', type: 'comments' })
  t.deepEqual(response, { id: '1', type: 'comments' })
})

test('returns an empty object if id is undefined', t => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = filterIncludes([], {} as any)
  t.deepEqual(response, {})
})

test('filters included relationships', t => {
  const includes = [
    {
      id: '1',
      type: 'users',
      attributes: {
        name: 'Emma'
      }
    },
    {
      id: '2',
      type: 'users',
      attributes: {
        name: 'Josh'
      }
    }
  ]
  const relationship = {
    id: '1',
    type: 'users'
  }
  const response = filterIncludes(includes, relationship)
  t.deepEqual(response, {
    id: '1',
    type: 'users',
    attributes: {
      name: 'Emma'
    }
  })
})
