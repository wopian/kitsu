/**
 * Compares JSON values iteratively, distinguishing arrays from objects and handling cycles.
 * @private
 *
 * @param {Object} left First JSON value
 * @param {Object} right Second JSON value
 * @returns {boolean} Whether both values have equal types, keys and values
 */
export const isDeepEqual = (left: any, right: any): boolean => {
  const pending = [left, right]
  let seen: WeakMap<object, WeakSet<object>> | undefined
  while (pending.length) {
    const right = pending.pop()
    const left = pending.pop()
    if (left === right) continue
    if (
      !left ||
      !right ||
      typeof left !== 'object' ||
      typeof right !== 'object' ||
      Array.isArray(left) !== Array.isArray(right)
    )
      return false
    if (seen?.get(left)?.has(right)) continue
    seen ??= new WeakMap()
    let matches = seen.get(left)
    if (!matches) {
      matches = new WeakSet()
      seen.set(left, matches)
    }
    matches.add(right)
    const keys = Object.keys(left)
    if (keys.length !== Object.keys(right).length) return false
    for (const key of keys) {
      if (!Object.hasOwn(right, key)) return false
      pending.push(left[key], right[key])
    }
  }
  return true
}
