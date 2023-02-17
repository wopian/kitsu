import plural from 'pluralize'

import { kebab, snake } from '../'
import { splitModel } from './'

describe('kitsu-core', () => {
  describe('splitModel', () => {
    it('anime -> anime', () => {
      expect.assertions(1)
      expect(splitModel('anime')).toStrictEqual(['anime', 'anime'])
    })

    it('anime -> anime (plural, mass noun)', () => {
      expect.assertions(1)
      expect(
        splitModel('anime', {
          pluralModel: plural
        })
      ).toStrictEqual(['anime', 'anime'])
    })

    it('post -> post', () => {
      expect.assertions(1)
      expect(splitModel('post')).toStrictEqual(['post', 'post'])
    })

    it('post -> posts (plural)', () => {
      expect.assertions(1)
      expect(
        splitModel('post', {
          pluralModel: plural
        })
      ).toStrictEqual(['post', 'posts'])
    })

    it('post/1/relationships/comment -> comment', () => {
      expect.assertions(1)
      expect(splitModel('post/1/relationships/comment')).toStrictEqual([
        'comment',
        'post/1/relationships/comment'
      ])
    })

    it('post/1/relationships/comment -> comment (plural)', () => {
      expect.assertions(1)
      expect(
        splitModel('post/1/relationships/comment', {
          pluralModel: plural
        })
      ).toStrictEqual(['comment', 'post/1/relationships/comments'])
    })

    it('libraryEntry -> library-entry', () => {
      expect.assertions(1)
      expect(
        splitModel('libraryEntry', {
          resourceCase: kebab
        })
      ).toStrictEqual(['libraryEntry', 'library-entry'])
    })

    it('libraryEntry -> library_entry', () => {
      expect.assertions(1)
      expect(
        splitModel('libraryEntry', {
          resourceCase: snake
        })
      ).toStrictEqual(['libraryEntry', 'library_entry'])
    })
  })
})
