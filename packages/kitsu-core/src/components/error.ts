import { isObject } from '../isObject.js'
import { hasOwnProperty } from '../utilities/hasOwnProperty.js'

interface AxiosError<T> {
  errors?: T

  response?: {
    data: T
  }
}

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#unknown-on-catch-clause-bindings
// catch must be typed as any or unknown.
export function error(sourceError: unknown): void {
  if (isAxiosError<{ errors?: unknown }>(sourceError)) {
    const responseData = sourceError.response?.data
    if (responseData?.errors) sourceError.errors = responseData.errors
  }

  throw sourceError
}

// TODO: should this be replaced with the 'correct' axios implementation?
// https://github.com/axios/axios/blob/main/lib/helpers/isAxiosError.js
function isAxiosError<T>(object: unknown): object is AxiosError<T> {
  return isObject(object) && hasOwnProperty(object, 'response')
}
