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
        data: {
          id: '1',
          type: 'people'
        },
        links: {
          related: 'https://api.example/articles/1/author',
          self: 'https://api.example/articles/1/relationships/author'
        }
      },
      comments: {
        data: [
          {
            id: '1',
            type: 'comments'
          },
          {
            id: '2',
            type: 'comments'
          }
        ],
        links: {
          related: 'https://api.example/articles/1/comments',
          self: 'https://api.example/articles/1/relationships/comments'
        }
      }
    },
    type: 'articles'
  },
  included: [
    {
      attributes: {
        number: 0
      },
      id: '1',
      type: 'people'
    },
    {
      attributes: {
        nullable: null
      },
      id: '1',
      type: 'comments'
    },
    {
      attributes: {
        boolean: true
      },
      id: '2',
      relationships: {
        author: {
          links: {
            related: 'https://api.example/articles/1/author',
            self: 'https://api.example/articles/1/relationships/author'
          }
        }
      },
      type: 'comments'
    }
  ]
}
