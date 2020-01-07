declare module 'kitsu' {
    /**
        * Creates a new `kitsu` instance
        *
        * @param {Object} options Options
        * @param {string} options.baseURL Set the API endpoint (default `https://kitsu.io/api/edge`)
        * @param {Object} options.headers Additional headers to send with requests
        * @param {boolean} options.camelCaseTypes If true, the `type` value will be camelCased, e.g `library-entries` and `library_entries` become `libraryEntries`  (default `true`)
        * @param {string} options.resourceCase `kebab`, `snake` or `none`. If `kebab`, `/libraryEntries` will become `/library-entries`. If `snake`, `/libraryEntries` will become `/library_entries`, If `none`, `/libraryEntries` will be unchanged (default `kebab`)
        * @param {boolean} options.pluralize If `true`, `/user` will become `/users` in the URL request and `type` will be pluralized in post, patch and delete requests - `user` -> `users` (default `true`)
        * @param {number} options.timeout Set the request timeout in milliseconds (default `30000`)
        * @param {Object} options.axiosOptions Additional options for the axios instance
        * @example <caption>Using with Kitsu.io's API</caption>
        * const api = new Kitsu()
        * @example <caption>Using another API server</caption>
        * const api = new Kitsu({
        *   baseURL: 'https://api.example.org/2'
        * })
        * @example <caption>Setting headers</caption>
        * const api = new Kitsu({
        *   headers: {
        *     'User-Agent': 'MyApp/1.0.0 (github.com/username/repo)',
        *     Authorization: 'Bearer 1234567890'
        *   }
        * })
        */
    export default class Kitsu {
            constructor(options?: {});
            /**
                * Fetch resources (alias `fetch`)
                *
                * @memberof Kitsu
                * @param {string} model Model to fetch data from
                * @param {Object} params JSON-API request queries
                * @param {Object} params.page [JSON:API Pagination](http://jsonapi.org/format/#fetching-pagination)
                * @param {number} params.page.limit Number of resources to return in request (Max `20` for Kitsu.io except on `libraryEntries` which has a max of `500`)
                * @param {number} params.page.offset Number of resources to offset the dataset by
                * @param {Object} params.fields Return a sparse fieldset with only the included attributes/relationships - [JSON:API Sparse Fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets)
                * @param {Object} params.filter Filter dataset by attribute values - [JSON:API Filtering](http://jsonapi.org/format/#fetching-filtering)
                * @param {string} params.sort Sort dataset by one or more comma separated attributes (prepend `-` for descending order) - [JSON:API Sorting](http://jsonapi.org/format/#fetching-sorting)
                * @param {string} params.include Include relationship data - [JSON:API Includes](http://jsonapi.org/format/#fetching-includes)
                * @param {Object} headers Additional headers to send with request
                * @returns {Object} JSON-parsed response
                * @example <caption>Getting a resource with JSON:API parameters</caption>
                * api.get('users', {
                *   fields: {
                *     users: 'name,birthday'
                *   },
                *   filter: {
                *     name: 'wopian'
                *   }
                * })
                * @example <caption>Getting a collection of resources with their relationships</caption>
                * api.get('anime', {
                *   include: 'categories'
                * })
                * @example <caption>Getting a single resource by ID (method one)</caption>
                * api.get('anime/2', {
                *   include: 'categories'
                * })
                * @example <caption>Getting a single resource by ID (method two)</caption>
                * api.get('anime', {
                *   include: 'categories',
                *   filter: { id: '2' }
                * })
                * @example <caption>Getting a resource's relationship data only</caption>
                * api.get('anime/2/categories')
                * @example <caption>Handling errors (async/await)</caption>
                * try {
                *   const { data } = await api.get('anime')
                * } catch (err) {
                *   // Array of JSON:API errors: http://jsonapi.org/format/#error-objects
                *   if (err.errors) err.errors.forEach(error => { ... })
                *   // Error type (Error, TypeError etc.)
                *   err.name
                *   // Error message
                *   err.message
                *   // Axios request parameters
                *   err.config
                *   // Axios response parameters
                *   err.response
                * }
                * @example <caption>Handling errors (Promises)</caption>
                * api.get('anime')
                *   .then(({ data }) => { ... })
                *   .catch(err => {
                *     // Array of JSON:API errors: http://jsonapi.org/format/#error-objects
                *     if (err.errors) err.errors.forEach(error => { ... })
                *     // Error type (Error, TypeError etc.)
                *     err.name
                *     // Error message
                *     err.message
                *     // Axios request parameters
                *     err.config
                *     // Axios response parameters
                *     err.response
                *   })
                */
            get(model: any, params?: {}, headers?: {}): Promise<any>;
            /**
                * Update a resource (alias `update`)
                *
                * @memberof Kitsu
                * @param {string} model Model to update data in
                * @param {Object} body Data to send in the request
                * @param {Object} headers Additional headers to send with request
                * @returns {Object} JSON-parsed response
                * @example <caption>Update a post</caption>
                * api.update('posts', {
                *   id: '12345678',
                *   content: 'Goodbye World'
                * })
                */
            patch(model: any, body: any, headers?: {}): Promise<any>;
            /**
                * Create a new resource (alias `create`)
                *
                * @memberof Kitsu
                * @param {string} model Model to create a resource under
                * @param {Object} body Data to send in the request
                * @param {Object} headers Additional headers to send with request
                * @returns {Object} JSON-parsed response
                * @example <caption>Create a post on a user's profile feed</caption>
                * api.create('posts', {
                *   content: 'Hello World',
                *   targetUser: {
                *     id: '42603',
                *     type: 'users'
                *   },
                *   user: {
                *     id: '42603',
                *     type: 'users'
                *   }
                * })
                */
            post(model: any, body: any, headers?: {}): Promise<any>;
            /**
                * Remove a resource (alias `remove`)
                *
                * @memberof Kitsu
                * @param {string} model Model to remove data from
                * @param {string|number} id Resource ID to remove
                * @param {Object} headers Additional headers to send with request
                * @returns {Object} JSON-parsed response
                * @example <caption>Remove a user's post</caption>
                * api.delete('posts', 123)
                */
            delete(model: any, id: any, headers?: {}): Promise<any>;
            /**
                * Get the authenticated user's data
                *
                * **Note** Requires the JSON:API server to support `filter[self]=true`
                *
                * @memberof Kitsu
                * @param {Object} params JSON-API request queries
                * @param {Object} params.fields Return a sparse fieldset with only the included attributes/relationships - [JSON:API Sparse Fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets)
                * @param {string} params.include Include relationship data - [JSON:API Includes](http://jsonapi.org/format/#fetching-includes)
                * @param {Object} headers Additional headers to send with request
                * @returns {Object} JSON-parsed response
                * @example <caption>Get the authenticated user's resource</caption>
                * api.self()
                * @example <caption>Using JSON:API parameters</caption>
                * api.self({
                *   fields: {
                *     users: 'name,birthday'
                *   }
                * })
                */
            self(params?: {}, headers?: {}): Promise<any>;
    }
}

