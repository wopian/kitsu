/**
 * Compare two objects equality
 *
 * @param {Object} left Object to compare against the right object
 * @param {Object} right Object to compare against the left object
 * @returns {boolean} Whether the objects are equal
 * @example <caption>Deep equality check</caption>
 * isDeepEqual({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   age: 35
 * },{
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   age: 35
 * }) // true
 */
export const isDeepEqual = (left, right) => {
  if (!left || !right) {
    return left === right
  }

  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)

  if (leftKeys.length !== rightKeys.length) return false

  for (const key of leftKeys) {
    const leftValue = left[key]
    const rightValue = right[key]

    const isObjects = isObject(leftValue) && isObject(rightValue)

    if ((isObjects && !isDeepEqual(leftValue, rightValue)) ||
      (!isObjects && leftValue !== rightValue)
    ) {
      return false
    }
  }

  return true
}

/**
 * Check for Object
 *
 * @param {Object} object Value to check if it is an object
 * @returns {boolean} Whether the value is an object
 * @private
 * @example <caption>Check for object</caption>
 * isObject({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   age: 35
 * }) // true
 */
const isObject = (object) => {
  return object != null && typeof object === 'object'
}
