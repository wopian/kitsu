import { filterIncludes } from './'

describe('kitsu-core', () => {
  describe('filterIncludes', () => {
    it('throws an error if included is not an array', () => {
      expect.assertions(1)
      expect(() => filterIncludes({}, { id: '1', type: 'anime' }))
        .toThrowError('included.filter is not a function')
    })

    it('returns id and type if included is empty', () => {
      expect.assertions(1)
      const response = filterIncludes([], { id: '1', type: 'comments' })
      expect(response).toEqual({ id: '1', type: 'comments' })
    })

    it('returns an empty object if id is undefined', () => {
      expect.assertions(1)
      const response = filterIncludes([], { })
      expect(response).toEqual({ })
    })
  })
})
