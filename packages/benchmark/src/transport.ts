import type { JsonApiDocument } from './types.ts'

/** Only transport is mocked. Clients retain their request/response conversion pipelines. */
export function transport() {
  let document: JsonApiDocument = {}
  let captured: any
  let body = ''
  const responseHeaders = { 'content-type': 'application/vnd.api+json' }
  return {
    response(value: JsonApiDocument) {
      document = value
      body = JSON.stringify(value)
      captured = undefined
    },
    captured: () => captured,
    axios: async (config: any) => {
      const read = (config.method ?? 'get').toUpperCase() === 'GET'
      if (!read) captured = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      return {
        status: read ? 200 : 204,
        statusText: read ? 'OK' : 'No Content',
        config,
        headers: read ? responseHeaders : {},
        // Text preserves Axios's normal JSON parsing step.
        data: read ? body : '',
      }
    },
    fetch: (async (_url: any, options: any = {}) => {
      const read = (options.method ?? 'GET').toUpperCase() === 'GET'
      if (!read) captured = options.body ? JSON.parse(String(options.body)) : undefined
      return new Response(read ? body : null, {
        status: read ? 200 : 204,
        headers: read ? responseHeaders : {},
      })
    }) as typeof fetch,
    object: () => document,
  }
}
