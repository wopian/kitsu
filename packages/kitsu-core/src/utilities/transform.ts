export type Transformer<T> = (transformSubject: T) => T

export function transform<T>(
  transforms: Transformer<T>[],
  transformSubject: T
): T {
  return transforms.reduce(
    (subject, transform) => transform(subject),
    transformSubject
  )
}
