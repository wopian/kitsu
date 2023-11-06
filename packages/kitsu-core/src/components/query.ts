import { isObject } from '../isObject.js'

// https://github.com/microsoft/TypeScript/blob/73bc0eba5fd35c3a31cc9a4e6d28d3e89564ce6f/src/lib/es5.d.ts#L66
type EncodableValue = string | number | boolean

type QueryValue = EncodableValue | EncodableValue[] | Query
export interface Query {
  [key: string]: QueryValue
}

function queryFormat(key: string, value: QueryValue): string {
  if (Array.isArray(value)) return value.map(v => queryFormat(key, v)).join('&')
  if (isObject(value)) return query(value, key)

  return encodeURIComponent(key) + '=' + encodeURIComponent(value)
}

export function query(parameters: Query, prefix?: string) {
  return Object.keys(parameters)
    .map(key =>
      queryFormat(prefix ? `${prefix}[${key}]` : key, parameters[key])
    )
    .join('&')
}
