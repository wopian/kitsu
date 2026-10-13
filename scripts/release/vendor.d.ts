declare module '@semantic-release/commit-analyzer' {
  export function analyzeCommits(
    config: any,
    context: any,
  ): Promise<'major' | 'minor' | 'patch' | null>
}
declare module '@semantic-release/release-notes-generator' {
  export function generateNotes(config: any, context: any): Promise<string>
}
