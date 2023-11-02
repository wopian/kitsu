export function isObject(object: unknown): object is object {
  return typeof object === 'object' && object !== null && !Array.isArray(object)
}
