import { deattribute } from './'

const attributesKey = {
  jsonapi: { attributes: { key: 'value' } },
  kitsu: { key: 'value' }
}

describe('kitsu-core', () => {
  describe('deattribute', () => {
    it('deattributes an object', () => {
      expect.assertions(1)
      expect(deattribute(attributesKey.jsonapi))
        .toEqual(attributesKey.kitsu)
    })

    it('deattributes an array of objects', () => {
      expect.assertions(1)
      expect(deattribute([ attributesKey.jsonapi, attributesKey.jsonapi ]))
        .toEqual([ attributesKey.kitsu, attributesKey.kitsu ])
    })

    it('does nothing if no attributes supplied', () => {
      expect.assertions(1)
      expect(deattribute({ id: '1' }))
        .toEqual({ id: '1' })
    })

    it('strips attributes object if empty', () => {
      expect.assertions(1)
      expect(deattribute({ id: '1', attributes: {} }))
        .toEqual({ id: '1' })
    })

    it('does nothing if data is missing', () => {
      expect.assertions(1)
      expect(deattribute(undefined)).toBeUndefined()
    })

    it('does nothing for invalid JSON:API data types', () => {
      expect.assertions(9)
      const symbol = Symbol('foo')
      const set = new Set()
      const weakSet = new WeakSet()
      const map = new Map()
      const weakMap = new WeakMap()
      expect(deattribute(null)).toBeNull()
      expect(deattribute(true)).toEqual(true)
      expect(deattribute(0)).toEqual(0)
      expect(deattribute('string')).toEqual('string')
      expect(deattribute(symbol)).toEqual(symbol)
      expect(deattribute(set)).toEqual(set)
      expect(deattribute(weakSet)).toEqual(weakSet)
      expect(deattribute(map)).toEqual(map)
      expect(deattribute(weakMap)).toEqual(weakMap)
    })
  })
})
