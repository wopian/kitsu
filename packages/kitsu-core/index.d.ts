declare module 'kitsu-core' {
    export * from 'kitsu-core/deattribute';
    export * from 'kitsu-core/deserialise';
    export * from 'kitsu-core/error';
    export * from 'kitsu-core/filterIncludes';
    export * from 'kitsu-core/linkRelationships';
    export * from 'kitsu-core/query';
    export * from 'kitsu-core/serialise';
    export { default as camel } from 'kitsu-core/camel';
    export { default as kebab } from 'kitsu-core/kebab';
    export { default as snake } from 'kitsu-core/snake';
}

declare module 'kitsu-core/deattribute' {
    /**
      * Hoists attributes to be top-level
      *
      * @param {Object|Array} data Resource data
      * @returns {Object|Array} Deattributed resource data
      *
      * @example <caption>Deattribute an array of resources</caption>
      * // JSON:API 'data' field
      * const data = [
      *   {
      *     id: '1',
      *     type: 'users',
      *     attributes: { slug: 'wopian' }
      *   }
      * ]
      *
      * const output = deattribute(data) // [ { id: '1', type: 'users', slug: 'wopian' } ]
      *
      * @example <caption>Deattribute a resource</caption>
      * // JSON:API 'data' field
      * const data = {
      *   id: '1',
      *   type: 'users',
      *   attributes: { slug: 'wopian' }
      * }
      *
      * const output = deattribute(data) // { id: '1', type: 'users', slug: 'wopian' }
      */
    export function deattribute(data: any): any;
}

declare module 'kitsu-core/deserialise' {
    /**
      * Deserialises a JSON-API response
      *
      * @param {Object} obj The response
      * @returns {Object} The deserialised response
      *
      * @example <caption>Deserialise with a basic data object</caption>
      * deserialise({
      *   data: {
      *     id: '1',
      *     attributes: { liked: true }
      *   },
      *   meta: { hello: 'world' }
      * }) // { data: { id: '1', liked: true }, meta: { hello: 'world' } }
      *
      * @example <caption>Deserialise with relationships</caption>
      * deserialise({
      *   data: {
      *     id: '1',
      *     relationships: {
      *       user: {
      *         data: {
      *           type: 'users',
      *           id: '2' }
      *       }
      *     }
      *   },
      *   included: [
      *     {
      *       type: 'users',
      *       id: '2',
      *       attributes: { slug: 'wopian' }
      *     }
      *   ]
      * }) // { data: { id: '1', user: { type: 'users', id: '2', slug: 'wopian' } } }
      */
    export function deserialise(obj: any): any;
}

declare module 'kitsu-core/error' {
    /**
      * Uniform error handling for Axios, JSON:API and internal package errors. Mutated Error object is rethrown to the caller.
      *
      * @param {Object} E The Error
      * @throws {Object} The mutated Error
      */
    export function error(E: any): void;
}

declare module 'kitsu-core/filterIncludes' {
    /**
      * Filters includes for the specific relationship
      *
      * @param {Object} included The response included object
      * @param {Object} opts
      * @param {string} opts.id The relationship ID
      * @param {string} opts.type The relationship type
      * @returns {Array} The matched includes
      */
    export function filterIncludes(included: any, { id, type }: {
        id: any;
        type: any;
    }): any;
}

declare module 'kitsu-core/linkRelationships' {
    /**
      * Links relationships to included data
      *
      * @param {Object} data The response data object
      * @param {Object} included The response included object
      */
    export function linkRelationships(data: any, included: any): any;
}

declare module 'kitsu-core/query' {
    /**
      * Constructs a URL query string for JSON:API parameters
      *
      * @param {Object} params Parameters to parse
      * @param {string} prefix Prefix for nested parameters - used internally (default `null`)
      * @returns {string} URL query string
      */
    export function query(params: any, prefix?: any): string;
}

declare module 'kitsu-core/serialise' {
    /**
      * Serialises an object into a JSON-API structure
      *
      * @param {string} model Request model
      * @param {Object} obj The data
      * @param {string} method Request type
      * @returns {Object} The serialised data
      *
      * @example <caption>Due to its usage in kitsu, it **MUST** be called with **this** set in 6.0.x</caption>
      * import { serialise, camel, kebab } from 'kitsu-core'
      * import plural from 'pluralize'
      *
      * const output = serialise.apply({ camel, resCase: kebab, plural }, [ model, obj, 'PATCH' ])
      */
    export function serialise(model: any, obj?: {}, method?: string): {
        data: {
            type: any;
        };
    };
}

declare module 'kitsu-core/camel' {
    const _default: (s: any) => any;
    /**
      * Converts kebab-case and snake_case into camelCase
      *
      * @name camel
      * @param {string} s String to convert
      * @returns {string} camelCase formatted string
      *
      * @example <caption>Convert kebab-case</caption>
      * camel('hello-world') // 'helloWorld'
      *
      * @example <caption>Convert snake_case</caption>
      * camel('hello_world') // 'helloWorld'
      */
    export default _default;
}

declare module 'kitsu-core/kebab' {
    const _default: (s: any) => any;
    /**
      * Converts camelCase into kebab-case
      *
      * @name kebab
      * @param {string} s camelCase string
      * @returns {string} kebab-case formatted string
      *
      * @example
      * kebab('helloWorld') // 'hello-world'
      */
    export default _default;
}

declare module 'kitsu-core/snake' {
    const _default: (s: any) => any;
    /**
      * Converts camelCase into snake_case
      *
      * @name snake
      * @param {string} s camelCase string
      * @returns {string} snake_case formatted string
      *
      * @example
      * snake('helloWorld') // 'hello_world'
      */
    export default _default;
}

