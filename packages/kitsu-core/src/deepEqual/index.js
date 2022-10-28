/**
 * Compare two objects equality 
 *
 * @name isDeepEqual
 * @param {object} firstObject First Object
 * @param {object} secondObject Second Object to compare with the first one
 * @returns {boolean} A boolean that indicates if objects are equal
 *
 * @example <caption>Deep equality check</caption>
 * isDeepEqual({
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "age": 35 
}, {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "age": 35,
 * }) // true
 */
export const isDeepEqual = (object1, object2) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if ((isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }

  return true;
};

/**
 * Check for Object
 *
 * @name isObject
 * @param {object} object Check if passed param is an object
 * @returns {boolean} A boolean that indicates if passed param is an object
 *
 * @example <caption>Check for object</caption>
 * isObject({
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "age": 35 
 * }) // true
 */
const isObject = (object) => {
  return object != null && typeof object === "object";
};
