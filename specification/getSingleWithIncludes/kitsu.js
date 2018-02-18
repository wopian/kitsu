export default {
  data: {
    array: [
      'string'
    ],
    author: {
      id: '1',
      number: 0,
      type: 'people'
    },
    comments: [
      {
        id: '1',
        nullable: null,
        type: 'comments'
      },
      {
        'boolean': true,
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
    ],
    id: '1',
    object: {
      string: 'string'
    },
    string: 'string',
    type: 'articles'
  }
}
