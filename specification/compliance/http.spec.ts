import { afterEach, describe, expect, it } from 'bun:test'
import { errorDocument } from './fixtures.js'
import { httpClient } from './http-client.js'

const adapters: { restore(): void }[] = []
afterEach(() => {
  for (const adapter of adapters.splice(0)) adapter.restore()
})

for (const transport of ['axios', 'native'] as const) {
  function client(options?: { hoistData?: boolean }, defaults = false) {
    const result = httpClient(transport, options, defaults)
    adapters.push(result.adapter)
    return result
  }
  describe(`JSON:API 1.1 HTTP ${transport}`, () => {
    it('H01 default media type and quoted extension/profile parameters', async () => {
      const { api, adapter } = client()
      const contentType =
        'application/vnd.api+json;ext="https://example.org/version https://example.org/extra";profile="https://example.org/profile"'
      const accept =
        'application/vnd.api+json;ext="https://example.org/version";q=0.9, application/vnd.api+json'
      adapter.onPost('/articles').reply((config: any) => {
        expect(config.headers?.['Content-Type']).toBe(contentType)
        expect(config.headers?.Accept).toBe(accept)
        expect(JSON.parse(config.data)).toEqual({
          data: { type: 'articles', 'version:id': '1', attributes: { title: 'Hello' } },
        })
        return [201, { data: { type: 'articles', id: '1' } }, { 'Content-Type': contentType }]
      })
      const headers = new Headers(api.headers as HeadersInit)
      expect(headers.get('accept')).toBe('application/vnd.api+json')
      expect(headers.get('content-type')).toBe('application/vnd.api+json')
      const output = await api.post(
        'articles',
        { title: 'Hello', $: { 'version:id': '1' } },
        { headers: { 'Content-Type': contentType, Accept: accept } },
      )
      expect(output.status).toBe(201)
      expect(output.headers?.get('content-type')).toBe(contentType)
    })
    it('H02 unrelated response parameters are ignored; document metadata does not negotiate', async () => {
      const { api, adapter } = client()
      adapter.onGet('/articles').reply((config: any) => {
        expect(config.headers?.Accept).toBe('application/vnd.api+json')
        return [
          200,
          {
            data: [],
            jsonapi: { version: '1.1', ext: ['https://example.org/unknown'], profile: [] },
          },
          { 'Content-Type': 'application/vnd.api+json;charset=utf-8;future=ok' },
        ]
      })
      expect(await api.get('articles')).toMatchObject({
        data: [],
        status: 200,
        jsonapi: { version: '1.1', ext: ['https://example.org/unknown'], profile: [] },
      })
    })
    it('H03 query strings and literal identifier case', async () => {
      const { api, adapter, uri } = client()
      adapter.onGet('/articles/Aa').reply((config: any) => {
        expect(uri(config)).toBe(
          'https://example.org/articles/Aa?include=comments.author&fields%5Barticles%5D=&page%5Boffset%5D=0',
        )
        return [200, { data: { type: 'articles', id: 'Aa' } }]
      })
      expect(
        (
          await api.get('articles/Aa', {
            params: { include: 'comments.author', fields: { articles: '' }, page: { offset: 0 } },
          })
        ).data?.id,
      ).toBe('Aa')
    })
    it('H04 resource POST and PATCH include document members and use exact URLs', async () => {
      const { api, adapter } = client()
      adapter.onPost('/articles').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: { type: 'articles', attributes: { title: 'Hello' } },
          meta: { source: 'cli' },
        })
        return [
          201,
          { data: { type: 'articles', id: '1', attributes: { title: 'Hello' } } },
          { Location: '/articles/1' },
        ]
      })
      expect(
        (
          await api.post('articles', { title: 'Hello' }, { document: { meta: { source: 'cli' } } })
        ).headers?.get('location'),
      ).toBe('/articles/1')
      adapter.onPatch('/articles/1').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: { type: 'articles', id: '1', attributes: { title: 'Changed' } },
        })
        return [200, { meta: { updated: true } }]
      })
      expect(await api.patch('articles/1', { id: '1', title: 'Changed' })).toEqual({
        status: 200,
        meta: { updated: true },
      })
      adapter.onPatch('/articles/0').reply(204)
      expect(await api.patch('articles', { id: 0 })).toEqual({ status: 204 })
    })
    it('H05 relationship PATCH sends identifier, null, and array bodies without target suffixes', async () => {
      const { api, adapter } = client()
      adapter.onPatch('/articles/1/relationships/author').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({ data: { type: 'people', id: '9' } })
        return [204]
      })
      expect(
        await api.patch('articles/1/relationships/author', { type: 'people', id: '9' }),
      ).toEqual({ status: 204 })
      adapter.onPatch('/articles/1/relationships/author').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({ data: null })
        return [204]
      })
      await api.patch('articles/1/relationships/author', null)
      adapter.onPatch('/articles/1/relationships/tags').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({ data: [{ type: 'tags', id: '2' }] })
        return [200, { data: [{ type: 'tags', id: '2' }] }]
      })
      expect(
        (await api.patch('articles/1/relationships/tags', [{ type: 'tags', id: '2' }])).data,
      ).toEqual([{ type: 'tags', id: '2' }])
    })
    it('H06 relationship POST and DELETE preserve linkage and endpoint', async () => {
      const { api, adapter } = client()
      adapter.onPost('/articles/1/relationships/tags').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({ data: [{ type: 'tags', id: '2' }] })
        return [204]
      })
      await api.post('articles/1/relationships/tags', [{ type: 'tags', id: '2' }])
      adapter.onDelete('/articles/1/relationships/tags').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: [
            { type: 'tags', id: '2' },
            { type: 'tags', id: '3' },
          ],
        })
        return [204]
      })
      await api.delete('articles/1/relationships/tags', ['2', '3'])
      adapter.onDelete('/articles/1/relationships/tags').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({ data: [{ type: 'tags', id: '0' }] })
        return [204]
      })
      await api.delete('articles/1/relationships/tags', 0)
    })
    it('H07 resource DELETE sends no document', async () => {
      const { api, adapter } = client()
      adapter.onDelete('/articles/0').reply((config: any) => {
        expect(config.data).toBeUndefined()
        return [204]
      })
      expect(await api.delete('articles', 0)).toEqual({ status: 204 })
    })
    it('H08 arbitrary requests retain relationship DELETE bodies and explicit hints', async () => {
      const { api, adapter } = client()
      adapter.onDelete('/custom/linkage').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({ data: [{ type: 'tags', id: '2' }] })
        return [204]
      })
      await api.request({
        url: '/custom/linkage',
        method: 'delete',
        type: 'tags',
        relationship: true,
        body: [{ id: '2' }],
      })
      adapter.onPost('/custom').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: { type: 'articles', attributes: { title: 'Hello' } },
          meta: { source: 'cli' },
        })
        return [202, { meta: { pending: true } }]
      })
      expect(
        await api.request({
          url: '/custom',
          method: 'POST',
          type: 'articles',
          body: { title: 'Hello' },
          document: { meta: { source: 'cli' } },
        }),
      ).toEqual({ status: 202, meta: { pending: true } })
    })
    it('H09 success statuses and empty responses preserve HTTP semantics', async () => {
      for (const status of [200, 201, 202, 204]) {
        const { api, adapter } = client()
        adapter
          .onGet('/result')
          .reply(status, status === 204 ? '' : { meta: { status } }, { 'X-Trace': '1' })
        const output = await api.request({ url: '/result' })
        expect(output.status).toBe(status)
        expect(output.meta).toEqual(status === 204 ? undefined : { status })
        expect(output.headers?.get('x-trace')).toBe('1')
      }
    })
    it('H10 HTTP errors expose complete JSON:API errors and document', async () => {
      for (const status of [400, 403, 404, 406, 409, 415, 500]) {
        const { api, adapter } = client()
        adapter.onGet('/articles').reply(status, errorDocument)
        try {
          await api.get('articles')
          throw new Error('Expected HTTP rejection')
        } catch (error: any) {
          expect(error.response.status).toBe(status)
          expect(error.errors).toEqual(errorDocument.errors)
          expect(error.document ?? error.response.data).toEqual(errorDocument)
        }
      }
    })
    it('H11 default options preserve explicit relationship paths and HTTP hoistData values', async () => {
      const { api, adapter } = client({ hoistData: true }, true)
      adapter.onPatch('/articles/1/relationships/author').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({ data: { type: 'people', id: '9' } })
        return [200, { data: { type: 'people', id: '9' } }]
      })
      expect(
        await api.patch('articles/1/relationships/author', { type: 'people', id: '9' }),
      ).toEqual({ type: 'people', id: '9', status: 200 })
      adapter.onGet('/articles').reply(200, { data: [] })
      expect(await api.get('articles')).toEqual({ data: [], status: 200 })
      adapter.onGet('/articles/1').reply(200, { data: null })
      expect(await api.get('articles/1')).toEqual({ data: null, status: 200 })
    })
  })
}
