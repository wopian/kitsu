import { describe, expect, it } from 'bun:test'
import { readdir, readFile } from 'node:fs/promises'
import requirements from './requirements.json'

describe('JSON:API 1.1 requirement traceability', () => {
  it('R01 every pinned normative block has an executable test or explicit boundary', async () => {
    expect(requirements.version).toBe('1.1')
    expect(requirements.source).toBe('https://jsonapi.org/format/1.1/')
    expect(requirements.clauses).toHaveLength(205)
    const identifiers = new Set<string>()
    for (const filename of await readdir(import.meta.dir)) {
      if (!filename.endsWith('.spec.ts')) continue
      const source = await readFile(new URL(filename, import.meta.url), 'utf8')
      for (const match of source.matchAll(/it\('([DLSQH]\d{2}) /g)) identifiers.add(match[1])
      expect(source).not.toMatch(/\b(?:it|test|describe)\.(?:skip|todo|only|failing)\s*\(/)
    }
    expect(new Set(requirements.clauses.map((clause) => clause.id)).size).toBe(205)
    for (const clause of requirements.clauses) {
      expect(clause.source).toStartWith(requirements.source + '#')
      expect(clause.sourceHash).toMatch(/^[a-f0-9]{64}$/)
      expect(clause.rationale.length).toBeGreaterThan(10)
      expect(clause.strength.length).toBeGreaterThan(0)
      if (clause.disposition === 'tested') {
        expect(clause.tests.length).toBeGreaterThan(0)
        for (const identifier of clause.tests) expect(identifiers.has(identifier)).toBe(true)
      } else {
        expect(['server', 'extension-author', 'caller', 'informational']).toContain(
          clause.disposition,
        )
        expect(clause.tests).toEqual([])
      }
    }
  })
})
