import { filterIncludes } from './'

describe('filterIncludes', () => {
  it('Should throw an error if included is not an array', async () => {
    expect.assertions(1)
    expect(filterIncludes({}, { id: '1', type: 'anime' }))
      .rejects
      .toThrowError('included.filter is not a function')
  })

  it('Should return id and type if included is empty', async () => {
    expect.assertions(1)
    const response = await filterIncludes([], { id: '1', type: 'comments' })
    expect(response).toEqual({ id: '1', type: 'comments' })
  })
})
