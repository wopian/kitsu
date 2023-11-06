import test from 'ava'
import { kebabCase, snakeCase } from 'case-anything'

import { splitModel } from './splitModel'

function plural(s: string) {
  if (['anime'].includes(s)) return s

  return `${s}s`
}

test('anime -> anime', t => {
  t.deepEqual(splitModel('anime'), ['anime', 'anime'])
})

test('anime -> anime (plural, mass noun)', t => {
  t.deepEqual(
    splitModel('anime', {
      pluralModel: plural
    }),
    ['anime', 'anime']
  )
})

test('post -> post', t => {
  t.deepEqual(splitModel('post'), ['post', 'post'])
})

test('post -> posts (plural)', t => {
  t.deepEqual(
    splitModel('post', {
      pluralModel: plural
    }),
    ['post', 'posts']
  )
})

test('post/1/relationships/comment -> comment', t => {
  t.deepEqual(splitModel('post/1/relationships/comment'), [
    'comment',
    'post/1/relationships/comment'
  ])
})

test('post/1/relationships/comment -> comment (plural)', t => {
  t.deepEqual(
    splitModel('post/1/relationships/comment', {
      pluralModel: plural
    }),
    ['comment', 'post/1/relationships/comments']
  )
})

test('libraryEntry -> library-entry', t => {
  t.deepEqual(
    splitModel('libraryEntry', {
      resourceCase: kebabCase
    }),
    ['libraryEntry', 'library-entry']
  )
})

test('libraryEntry -> library_entry', t => {
  t.deepEqual(
    splitModel('libraryEntry', {
      resourceCase: snakeCase
    }),
    ['libraryEntry', 'library_entry']
  )
})

test('applies transformations to output according to tramsforms array', t => {
  t.deepEqual(
    splitModel('libraryEntry', {
      transforms: [
        s => s.toUpperCase(),
        s => s.slice(0, -2),
        s => [...s].reverse().join('')
      ]
    }),
    ['libraryEntry', 'TNEYRARBIL']
  )
})
