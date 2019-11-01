export default Kitsu;

interface Options {
  /**
   * Set the API endpoint (default `https://kitsu.io/api/edge`)
   */
  baseURL: string;

  /**
   * Additional headers to send with requests
   */
  headers?: Object;

  /**
   * If true, the `type` value will be camelCased,
   * e.g `library-entries` and `library_entries` become
   * `libraryEntries`  (default `true`)
   */
  camelCaseTypes?: boolean;

  /**
   * `kebab`, `snake` or `none`. If `kebab`, `/libraryEntries` will become
   * `/library-entries`. If `snake`, `/libraryEntries` will become
   * `/library_entries`, If `none`, `/libraryEntries` will be unchanged
   * (default `kebab`)
   */
  resourceCase?: string;

  /**
   * If `true`, `/user` will become `/users` in the URL request and `type`
   * will be pluralized in post, patch and delete requests -
   * `user` ->  `users` (default `true`)
   */
  pluralize?: boolean;

  /**
   * Set the request timeout in milliseconds (default `30000`)
   */
  timeout?: number;

  /**
   * Additional options for the axios instance
   */
  axiosOptions?: Object;
}

interface GetOptions {
  /**
   * [JSON:API Pagination](http://jsonapi.org/format/#fetching-pagination)
   */
  page?: {
    /**
     * Number of resources to return in request
     */
    size?: number;

    /**
     * Number of resources to offset the dataset by
     */
    number?: number;
  };

  /**
   * Return a sparse fieldset with only the included
   * attributes/relationships -
   * [JSON:API Sparse Fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets)
   */
  fields?: Object;

  /**
   * Filter dataset by attribute values -
   * [JSON:API Filtering](http://jsonapi.org/format/#fetching-filtering)
   */
  filter?: Object;

  /**
   * Sort dataset by one or more comma separated attributes (prepend `-`
   * for descending order) -
   * [JSON:API Sorting](http://jsonapi.org/format/#fetching-sorting)
   */
  sort?: string;

  /**
   * Include relationship data -
   * [JSON:API Includes](http://jsonapi.org/format/#fetching-includes)
   */
  include?: string;
}

declare class Kitsu {
  constructor(options: Options);

  delete(...args: any[]): void;

  /**
   * Fetch resources (alias `fetch`)
   */
  get(model: string, options?: GetOptions, headers?: Object): Promise<any>;

  patch(...args: any[]): void;

  post(...args: any[]): void;

  self(...args: any[]): void;
}
