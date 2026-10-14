/** Copy JSON values without a structured-clone round trip for each attribute object.
 * @private
 */
export function copy(
  value: any,
  seen?: { get(source: object): any; set(source: object, output: any): unknown },
): any {
  if (value === null || typeof value !== 'object') {
    if (typeof value === 'function' || typeof value === 'symbol') return structuredClone(value)
    return value
  }
  const cached = seen?.get(value)
  if (cached) return cached
  const array = Array.isArray(value)
  const prototype = array ? null : Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) {
    const output = structuredClone(value)
    seen?.set(value, output)
    return output
  }
  const output: any = array ? new Array(value.length) : {}
  seen?.set(value, output)
  for (const key of Object.keys(value)) {
    const source = value[key]
    if (!seen && source !== null && typeof source === 'object') {
      seen = new WeakMap()
      seen.set(value, output)
    }
    const item =
      source !== null && typeof source === 'object'
        ? copy(source, seen)
        : typeof source === 'function' || typeof source === 'symbol'
          ? structuredClone(source)
          : source
    if (key === '__proto__')
      Object.defineProperty(output, key, {
        value: item,
        enumerable: true,
        writable: true,
        configurable: true,
      })
    else output[key] = item
  }
  return output
}
