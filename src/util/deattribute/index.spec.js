import { deattribute } from './'

const attributesKey = {
  jsonapi: { attributes: { key: 'value' } },
  kitsu: { key: 'value' }
}

describe('deattribute', () => {
  it('Should deattribute an object', async () => {
    expect.assertions(1)
    expect(await deattribute(attributesKey.jsonapi))
      .toEqual(attributesKey.kitsu)
  })

  it('Should deattribute an array of objects', async () => {
    expect.assertions(1)
    expect(await deattribute([attributesKey.jsonapi, attributesKey.jsonapi]))
      .toEqual([attributesKey.kitsu, attributesKey.kitsu])
  })

  it('Should do nothing if no attributes supplied', async () => {
    expect.assertions(1)
    expect(await deattribute({ id: '1' }))
      .toEqual({ id: '1' })
  })

  it('Should strip attributes object if empty', async () => {
    expect.assertions(1)
    expect(await deattribute({ id: '1', attributes: {} }))
      .toEqual({ id: '1' })
  })
})
