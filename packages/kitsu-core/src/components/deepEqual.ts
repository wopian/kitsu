export const isDeepEqual = (left: any, right: any) => {
  if (!left || !right) return left === right

  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)

  if (leftKeys.length !== rightKeys.length) return false

  for (const key of leftKeys) {
    const leftValue = left[key]
    const rightValue = right[key]

    const isObjects = isObject(leftValue) && isObject(rightValue)

    if ((isObjects && !isDeepEqual(leftValue, rightValue)) || (!isObjects && leftValue !== rightValue)) {
      return false
    }
  }

  return true
}

function isObject(obj: any): obj is object {
  return obj != undefined && typeof obj === 'object'
}
