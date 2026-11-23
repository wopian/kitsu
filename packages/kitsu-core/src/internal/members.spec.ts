import { describe, expect, it } from 'bun:test'
import { resourceIndex } from './members.js'

describe('resource index validation', () => {
  it('rejects different ids for the same local id', () => {
    expect(() =>
      resourceIndex(
        [
          { type: 'people', id: '1', lid: 'author' },
          { type: 'people', id: '2', lid: 'author' },
        ],
        true,
      ),
    ).toThrow('Conflicting resources')
  })

  it('rejects conflicting full representations of one resource', () => {
    expect(() =>
      resourceIndex(
        [
          { type: 'people', id: '1', attributes: { name: 'Ada' } },
          { type: 'people', id: '1', attributes: { name: 'Grace' } },
        ],
        true,
      ),
    ).toThrow('Conflicting resources')
  })
})
