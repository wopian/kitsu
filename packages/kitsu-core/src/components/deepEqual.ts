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

    const goDeeper = isDeep(leftValue) && isDeep(rightValue)

    if (
      (goDeeper && !isDeepEqual(leftValue, rightValue)) ||
      (!goDeeper && leftValue !== rightValue)
    ) {
      return false
    }
  }

  return true
}

function isDeep(object: unknown): boolean {
  return typeof object === 'object' && object !== null
}
