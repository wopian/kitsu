/* eslint-disable quote-props */

export default {
  data: {
    array: [
      'string'
    ],
    id: '1',
    object: {
      string: 'string'
    },
    author: {
      links: {
        related: 'https://api.example/articles/1/author',
        self: 'https://api.example/articles/1/relationships/author'
      }
    },
    string: 'string',
    type: 'articles'
  }
}
