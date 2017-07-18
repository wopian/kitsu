import { filterIncludes } from './filterIncludes'

describe('filterIncludes', () => {
  it('Should throw an error if included is not an array', () => {
    expect(filterIncludes({}, { id: '1', type: 'anime' })).rejects.toEqual(new TypeError('included.filter is not a function'))
  })
})
