export const packageNames = ['kitsu-core', 'kitsu', 'kitsu-native'] as const
export type PackageName = (typeof packageNames)[number]
export interface PlannedPackage {
  name: PackageName
  filename: string
  integrity: string
}
export interface ReleasePlan {
  schemaVersion: 1 | 2
  sha: string
  version: string
  tag: string
  notes: string
  packages: PlannedPackage[]
}
export interface Commit {
  hash: string
  message: string
}
export interface ImpactContext {
  cwd?: string
  commits: Commit[]
  logger: { log: (...args: any[]) => void }
  [key: string]: any
}
