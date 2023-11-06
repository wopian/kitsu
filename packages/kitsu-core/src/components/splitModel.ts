import { transform, Transformer } from '../utilities/transform.js'

type URL = string
export interface SplitModelOptions {
  transforms?: Transformer<URL>[]
}

export function splitModel(url: URL, options?: SplitModelOptions): [URL, URL]
/** @deprecated
 * pluralModel and resourceCase are deprecated. Use transforms instead.
 **/
export function splitModel(
  url: URL,
  options?: {
    pluralModel?: (s: string) => string
    resourceCase?: (s: string) => string
  }
): [URL, URL]
export function splitModel(
  url: URL,
  options: SplitModelOptions & {
    pluralModel?: (s: string) => string
    resourceCase?: (s: string) => string
  } = {}
): [URL, URL] {
  const transforms: Transformer<URL>[] = options.transforms || []

  if (options.pluralModel) transforms.push(options.pluralModel)
  if (options.resourceCase) transforms.push(options.resourceCase)

  const urlSegments = url.split('/')
  const resourceModel = urlSegments.pop() as string // url.split().pop() always returns a string, even when url is empty

  // urlSegments.push(options.pluralModel(options.resourceCase(resourceModel)))
  urlSegments.push(transform(transforms, resourceModel))
  const newUrl = urlSegments.join('/')

  return [resourceModel, newUrl]
}
