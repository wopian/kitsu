// isDeepEqual is able to compare every possible input, so we allow explicit any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Comparable = any

export function isDeepEqual(left: Comparable, right: Comparable): boolean {
  if (!left || !right) return left === right

  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)

  if (leftKeys.length !== rightKeys.length) return false

  for (const key of leftKeys) {
    const leftValue = left[key]
    const rightValue = right[key]

    const isObjects = isObject(leftValue) && isObject(rightValue)

    if (
      (isObjects && !isDeepEqual(leftValue, rightValue)) ||
      (!isObjects && leftValue !== rightValue)
    ) {
      return false
    }
  }

  return true
}

function isObject(object: unknown): object is object {
  return object != undefined && typeof object === 'object'
}
