/* eslint-disable quote-props */

export default {
  data: {
    array: ['string'],
    author: {
      links: {
        related: 'https://api.example/articles/1/author',
        self: 'https://api.example/articles/1/relationships/author'
      },
      data: {
        id: '1',
        number: 0,
        type: 'people'
      }
    },
    comments: {
      links: {
        related: 'https://api.example/articles/1/comments',
        self: 'https://api.example/articles/1/relationships/comments'
      },
      data: [
        {
          id: '1',
          nullable: null,
          type: 'comments'
        },
        {
          boolean: true,
          id: '2',
          author: {
            links: {
              related: 'https://api.example/articles/1/author',
              self: 'https://api.example/articles/1/relationships/author'
            }
          },
          type: 'comments'
        }
      ]
    },
    id: '1',
    object: {
      string: 'string'
    },
    string: 'string',
    type: 'articles'
  }
}
