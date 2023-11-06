import { AxiosError as BaseAxiosError } from 'axios';

// Extend AxiosError to facilitate 'error' function legacy behaviour
class AxiosError<T> extends BaseAxiosError<T> {
  public errors?: unknown;
}

import { isObject } from "../isObject.js"
import { hasOwnProperty } from "../utilities/hasOwnProperty.js"

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#unknown-on-catch-clause-bindings
// catch must be typed as any or unknown.
export function error(sourceError: unknown): void {
  if (isAxiosError<{errors?: unknown}>(sourceError)) {
    const e = sourceError.response?.data
    if (e?.errors) sourceError.errors = e.errors
  }

  throw sourceError
}

// TODO: should this be replaced with the 'correct' axios implementation?
// https://github.com/axios/axios/blob/main/lib/helpers/isAxiosError.js
function isAxiosError<T>(obj: unknown): obj is AxiosError<T> {
  return isObject(obj) && (hasOwnProperty(obj, 'response'))
}
