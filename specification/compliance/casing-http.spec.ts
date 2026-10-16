import { describe, expect, it } from 'bun:test'
import { hoistingIssueDocument } from './fixtures.js'
import { httpClient } from './http-client.js'

for (const transport of ['axios', 'native'] as const) {
  describe(`optional attribute casing HTTP ${transport}`, () => {
    for (const attributeCase of ['none', 'kebab', 'snake'] as const) {
      it(`uses ${attributeCase} across reads, writes, aliases, and arbitrary requests`, async () => {
        const { api, adapter } = httpClient(transport, { attributeCase })
        const wireName =
          attributeCase === 'kebab'
            ? 'first-name'
            : attributeCase === 'snake'
              ? 'first_name'
              : 'firstName'
        const wire = {
          data: {
            type: 'people',
            id: '1',
            attributes: { [wireName]: 'Ada', payload: { 'keep-key': 1 } },
          },
        }
        const expected = {
          type: 'people',
          id: '1',
          attributes: { [wireName]: 'Ada', payload: { 'keep-key': 1 } },
          relationships: { 'best-friend': { data: { type: 'people', id: '2' } } },
        }
        const input = {
          id: '1',
          firstName: 'Ada',
          payload: { 'keep-key': 1 },
          'best-friend': { type: 'people', id: '2' },
        }
        const receive = (config: any) => {
          expect(JSON.parse(config.data)).toEqual({ data: expected })
          return [200, wire]
        }
        try {
          adapter.onGet('/people').reply(200, wire)
          adapter.onPost('/people').reply(receive)
          adapter.onPatch('/people/1').reply(receive)
          adapter.onPatch('/custom').reply(receive)
          expect((await api.get('people')).data.firstName).toBe('Ada')
          expect((await api.fetch('people')).data.payload).toEqual({ 'keep-key': 1 })
          expect((await api.post('people', input)).data.firstName).toBe('Ada')
          expect((await api.create('people', input)).data.firstName).toBe('Ada')
          expect((await api.patch('people', input)).data.firstName).toBe('Ada')
          expect((await api.update('people', input)).data.firstName).toBe('Ada')
          expect(
            (await api.request({ url: 'custom', type: 'people', method: 'PATCH', body: input }))
              .data.firstName,
          ).toBe('Ada')
          expect(input.firstName).toBe('Ada')
        } finally {
          adapter.restore()
        }
      })
    }

    it('keeps query names and default casing independent from URL casing', async () => {
      const { api, adapter, uri } = httpClient(transport, { attributeCase: 'kebab' })
      try {
        adapter.onGet('/people').reply((config: any) => {
          expect(uri(config)).toBe(
            'https://example.org/people?fields%5Bpeople%5D=first-name&sort=firstName&filter%5BfirstName%5D=Ada',
          )
          return [200, { data: { type: 'people', id: '1', attributes: { 'first-name': 'Ada' } } }]
        })
        expect(
          (
            await api.get('people', {
              params: {
                fields: { people: 'first-name' },
                sort: 'firstName',
                filter: { firstName: 'Ada' },
              },
            })
          ).data.firstName,
        ).toBe('Ada')
      } finally {
        adapter.restore()
      }
      const defaults = httpClient(transport)
      try {
        defaults.adapter
          .onGet('/people')
          .reply(200, { data: { type: 'people', id: '1', attributes: { 'first-name': 'Ada' } } })
        expect((await defaults.api.get('people')).data['first-name']).toBe('Ada')
      } finally {
        defaults.adapter.restore()
      }
    })

    it('rejects encode/decode collisions through existing client error paths', async () => {
      const { api, adapter } = httpClient(transport, { attributeCase: 'kebab' })
      try {
        adapter
          .onGet('/people')
          .reply(200, { data: { type: 'people', attributes: { 'first-name': 1, first_name: 2 } } })
        await expect(api.get('people')).rejects.toThrow('Attribute name conflict: firstName')
        await expect(api.post('people', { firstName: 1, 'first-name': 2 })).rejects.toThrow(
          'Attribute name conflict: first-name',
        )
      } finally {
        adapter.restore()
      }
    })

    it('#1131 keeps HTTP envelope and flattens relationships despite document metadata', async () => {
      const { api, adapter } = httpClient(transport, { hoistData: true })
      try {
        for (const extras of [false, true]) {
          adapter
            .onGet('/users')
            .reply(200, hoistingIssueDocument(extras), { 'X-Example': 'preserved' })
          const output = await api.get('users')
          expect(output.status).toBe(200)
          expect(output.headers?.get('x-example')).toBe('preserved')
          expect(output.data[0].waifu).toEqual({ type: 'characters', id: '1', name: 'Genkai' })
          expect(output.data[0].waifu).toBe(output.included[0])
          if (extras) {
            expect(output.jsonapi).toEqual({ version: '1.0' })
            expect(output.data[0].$.relationships.waifu).toEqual({ meta: {}, links: {} })
          }
        }
      } finally {
        adapter.restore()
      }
    })
  })
}
