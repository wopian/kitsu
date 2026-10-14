/**
 * Compares JSON values recursively, distinguishing arrays from objects.
 * @private
 *
 * @param {Object} left First JSON value
 * @param {Object} right Second JSON value
 * @returns {boolean} Whether both values have equal types, keys and values
 */
export const isDeepEqual = (left: any, right: any): boolean => {
  if (left === right) return true
  if (
    !left ||
    !right ||
    typeof left !== 'object' ||
    typeof right !== 'object' ||
    Array.isArray(left) !== Array.isArray(right)
  )
    return false
  const keys = Object.keys(left)
  return (
    keys.length === Object.keys(right).length &&
    keys.every((key) => Object.hasOwn(right, key) && isDeepEqual(left[key], right[key]))
  )
}
