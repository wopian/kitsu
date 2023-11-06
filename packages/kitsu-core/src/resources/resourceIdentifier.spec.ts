import test from 'ava'

import { isLocalResource, isRemoteResource } from './resourceIdentifier'

test('isLocalResource determines if a resourceIdentifier originates from the client', t => {
  t.is(isLocalResource({ lid: '12' }), true)
  t.is(isLocalResource({ type: 'users' }), true)
  t.is(isLocalResource({ id: '12', type: 'users' }), false)
})

test('isRemoteResource determines if a resourceIdentifier originates from the server', t => {
  t.is(isRemoteResource({ lid: '12' }), false)
  t.is(isRemoteResource({ type: 'users' }), false)
  t.is(isRemoteResource({ id: '12', type: 'users' }), true)
  t.is(isRemoteResource({ id: '12', lid: '14' }), false)
})
