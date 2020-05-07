/* eslint-disable quote-props */

export default {
  data: {
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
          boolean: true,
          id: '2',
          type: 'comments'
        }
      ]
    },
    id: '1',
    type: 'articles'
  }
}
