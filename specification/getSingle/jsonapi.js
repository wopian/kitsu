/* eslint-disable quote-props */

export default {
  data: {
    attributes: {
      array: ['string'],
      object: {
        string: 'string'
      },
      string: 'string'
    },
    id: '1',
    relationships: {
      author: {
        links: {
          related: 'https://api.example/articles/1/author',
          self: 'https://api.example/articles/1/relationships/author'
        }
      }
    },
    type: 'articles'
  }
}
