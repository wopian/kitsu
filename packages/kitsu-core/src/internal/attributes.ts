import type { JsonObject } from '../types.js'
import { extensionMember, fail } from './members.js'

const member = /^[a-z\d\u0080-\u{10ffff}](?:[\w\u0080-\u{10ffff} -]*[a-z\d\u0080-\u{10ffff}])?$/iu

/** Convert only attribute names, rejecting lossy or structurally ambiguous output.
 * @private
 */
export function attributeName(
  name: string,
  convert: (name: string) => string,
  attributes: JsonObject,
  relationships?: JsonObject,
): string {
  const output = extensionMember(name) ? name : convert(name)
  if (
    typeof output !== 'string' ||
    output === 'id' ||
    output === 'type' ||
    output === '$' ||
    (!extensionMember(name) && !member.test(output))
  )
    fail(`Invalid attribute name: ${String(output)}`)
  if (Object.hasOwn(attributes, output) || (relationships && Object.hasOwn(relationships, output)))
    fail(`Attribute name conflict: ${output}`)
  return output
}

/** Check relationship names after traversal, including relationships encountered later.
 * @private
 */
export function attributeConflicts(resource: JsonObject): void {
  for (const name in resource.attributes)
    if (resource.relationships && Object.hasOwn(resource.relationships, name))
      fail(`Attribute name conflict: ${name}`)
}
