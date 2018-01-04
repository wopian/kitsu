import { filterIncludes } from './'

describe('filterIncludes', () => {
  it('Should throw an error if included is not an array', async () => {
    expect.assertions(1)
    expect(filterIncludes({}, { id: '1', type: 'anime' }))
      .rejects
      .toThrowError('included.filter is not a function')
  })
})
