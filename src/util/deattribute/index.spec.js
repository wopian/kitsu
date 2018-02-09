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
    expect(await deattribute([ attributesKey.jsonapi, attributesKey.jsonapi ]))
      .toEqual([ attributesKey.kitsu, attributesKey.kitsu ])
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

  it('Should do nothing if data is missing', async () => {
    expect.assertions(1)
    expect(await deattribute(undefined))
      .toEqual(undefined)
  })

  it('Should do nothing for invalid JSON:API data types', async () => {
    expect.assertions(9)
    const symbol = Symbol('foo')
    const set = new Set()
    const weakSet = new WeakSet()
    const map = new Map()
    const weakMap = new WeakMap()
    expect(await deattribute(null)).toEqual(null)
    expect(await deattribute(true)).toEqual(true)
    expect(await deattribute(0)).toEqual(0)
    expect(await deattribute('string')).toEqual('string')
    expect(await deattribute(symbol)).toEqual(symbol)
    expect(await deattribute(set)).toEqual(set)
    expect(await deattribute(weakSet)).toEqual(weakSet)
    expect(await deattribute(map)).toEqual(map)
    expect(await deattribute(weakMap)).toEqual(weakMap)
  })
})
