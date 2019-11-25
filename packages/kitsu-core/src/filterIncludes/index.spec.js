import { filterIncludes } from './'

describe('kitsu-core', () => {
  describe('filterIncludes', () => {
    it('throws an error if included is not an array', async () => {
      expect.assertions(1)
      await expect(filterIncludes({}, { id: '1', type: 'anime' }))
        .rejects
        .toThrowError('included.filter is not a function')
    })

    it('returns id and type if included is empty', async () => {
      expect.assertions(1)
      const response = await filterIncludes([], { id: '1', type: 'comments' })
      expect(response).toEqual({ id: '1', type: 'comments' })
    })
  })
})
