import ts from 'typescript'

/** Keep erased public TypeScript interfaces visible to Documentation.js. */
export function documentTypes(source: string, fileName: string): string {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true)
  const declarations = file.statements.filter(
    (node): node is ts.InterfaceDeclaration | ts.TypeAliasDeclaration =>
      (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
      node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) === true,
  )
  const interfaces = new Map(
    declarations.filter(ts.isInterfaceDeclaration).map((node) => [node.name.text, node]),
  )
  const printer = ts.createPrinter({ removeComments: true })
  const text = (node: ts.Node) =>
    printer.printNode(ts.EmitHint.Unspecified, node, file).replace(/\s+/g, ' ').trim()

  function docs(node: ts.Node, name: string) {
    const blocks = (node as ts.Node & { jsDoc?: ts.NodeArray<ts.JSDoc> }).jsDoc
    const description = blocks?.map((block) => ts.getTextOfJSDocComment(block.comment)).join('\n')
    const examples = ts
      .getJSDocTags(node)
      .filter((tag) => tag.tagName.text === 'example')
      .map((tag) => ts.getTextOfJSDocComment(tag.comment) ?? '')
    if (!description?.trim() || !examples.length || examples.some((example) => !example.trim()))
      throw new Error(`${fileName}: ${name} needs a JSDoc description and @example`)
    return { description, examples }
  }

  function type(node: ts.TypeNode): string {
    if (ts.isParenthesizedTypeNode(node)) return type(node.type)
    if (ts.isUnionTypeNode(node)) return `(${node.types.map(type).join('|')})`
    if (ts.isArrayTypeNode(node)) return `Array<${type(node.elementType)}>`
    if (ts.isFunctionTypeNode(node))
      return `function(${node.parameters.map((parameter) => `${parameter.type ? type(parameter.type) : '*'}${parameter.questionToken ? '=' : ''}`).join(', ')}): ${type(node.type)}`
    if (ts.isLiteralTypeNode(node)) return node.getText(file)
    if (ts.isTypeReferenceNode(node) && !node.typeArguments) return node.getText(file)
    switch (node.kind) {
      case ts.SyntaxKind.StringKeyword:
        return 'string'
      case ts.SyntaxKind.NumberKeyword:
        return 'number'
      case ts.SyntaxKind.BooleanKeyword:
        return 'boolean'
      case ts.SyntaxKind.AnyKeyword:
      case ts.SyntaxKind.UnknownKeyword:
        return '*'
      case ts.SyntaxKind.UndefinedKeyword:
        return 'undefined'
      default:
        return 'Object'
    }
  }

  function properties(node: ts.InterfaceDeclaration | ts.TypeLiteralNode, prefix = ''): string[] {
    const lines: string[] = []
    if (ts.isInterfaceDeclaration(node)) {
      for (const clause of node.heritageClauses ?? []) {
        for (const parent of clause.types) {
          const inherited = interfaces.get(parent.expression.getText(file))
          if (!inherited) throw new Error(`${fileName}: unknown interface ${parent.getText(file)}`)
          lines.push(...properties(inherited, prefix))
        }
      }
    }
    for (const member of node.members) {
      if (!ts.isPropertySignature(member) && !ts.isIndexSignatureDeclaration(member)) continue
      const index = ts.isIndexSignatureDeclaration(member)
      const name = index ? member.parameters[0].name.getText(file) : member.name.getText(file)
      const { description, examples } = docs(member, `${prefix}${name}`)
      const memberType = member.type
      if (!memberType) throw new Error(`${fileName}: ${name} needs an explicit type`)
      const path = `${prefix}${name}`
      // Index signatures describe arbitrary members, not one literal option name.
      const detail = `${description} TypeScript: \`${text(memberType)}\`. ${examples.map((example) => `Example: \`${example.replace(/\s+/g, ' ')}\`.`).join(' ')}`
      if (index) lines.push(`Additional members (\`${text(member)}\`): ${detail}`)
      else {
        lines.push(
          `@property {${type(memberType)}} ${member.questionToken ? `[${path}]` : path} ${detail}`,
        )
        if (ts.isTypeLiteralNode(memberType)) lines.push(...properties(memberType, `${path}.`))
      }
    }
    return lines
  }

  return declarations
    .map((node) => {
      const { description, examples } = docs(node, node.name.text)
      const lines = [description]
      if (ts.isTypeAliasDeclaration(node))
        lines.push(
          `TypeScript: \`${text(node.type)}\`.`,
          `@typedef {${type(node.type)}} ${node.name.text}`,
        )
      else {
        const fields = properties(node)
        lines.push(
          ...fields.filter((line) => !line.startsWith('@')),
          `@typedef {Object} ${node.name.text}`,
          ...fields.filter((line) => line.startsWith('@')),
        )
      }
      for (const example of examples) lines.push(`@example\n${example}`)
      return `/**\n${lines
        .join('\n')
        .split('\n')
        .map((line) => ` * ${line}`)
        .join('\n')}\n */\n`
    })
    .join('\n')
}

/** Documentation.js emits JavaScript fences even when examples contain TypeScript. */
export function typescriptExamples(markdown: string): string {
  return markdown.replace(/^(`{3,})(?:javascript|js)[\t ]*\r?$/gm, '$1typescript')
}
