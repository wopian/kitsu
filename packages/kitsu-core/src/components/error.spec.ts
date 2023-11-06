import test from 'ava'

import { error } from '../index.js'

test('handles axios response errors', t => {
  t.plan(1)

  const object = { response: {} }
  try {
    error(object)
  } catch (error_: unknown) {
    t.deepEqual(error_, { response: {} })
  }
})

test('throws all other errors', t => {
  t.plan(2)

  try {
    error('Hello')
  } catch (error_: unknown) {
    t.is(error_, 'Hello')
  }

  t.throws(
    () => {
      error(new Error('Hello'))
    },
    { message: 'Hello' }
  )
})

test('handles axios response errors with JSON:API errors', t => {
  t.plan(1)
  const object = {
    response: {
      data: {
        errors: [
          {
            title: 'Filter is not allowed',
            detail: 'x is not allowed',
            code: '102',
            status: '400'
          }
        ]
      }
    }
  }
  try {
    error(object)
  } catch ({ errors }) {
    t.deepEqual(errors, [
      {
        title: 'Filter is not allowed',
        detail: 'x is not allowed',
        code: '102',
        status: '400'
      }
    ])
  }
})

test('handles top-level JSON:API errors', t => {
  t.plan(1)
  const object = {
    errors: [{ code: 400 }]
  }
  try {
    error(object)
  } catch (error_) {
    t.deepEqual(error_, {
      errors: [{ code: 400 }]
    })
  }
})
