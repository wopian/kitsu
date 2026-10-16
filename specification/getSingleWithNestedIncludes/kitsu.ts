export default {
  data: {
    type: 'articles',
    id: '1',
    author: {
      number: 0,
      type: 'people',
      id: '1',
    },
    comments: [
      {
        boolean: true,
        type: 'comments',
        id: '2',
        author: {
          number: 0,
          type: 'people',
          id: '1',
        },
        $: {
          relationships: {
            author: {
              links: {
                related: 'https://api.example/articles/1/author',
                self: 'https://api.example/articles/1/relationships/author',
              },
            },
          },
        },
      },
    ],
    $: {
      relationships: {
        author: {
          links: {
            related: 'https://api.example/articles/1/author',
            self: 'https://api.example/articles/1/relationships/author',
          },
        },
        comments: {
          links: {
            related: 'https://api.example/articles/1/comments',
            self: 'https://api.example/articles/1/relationships/comments',
          },
        },
      },
    },
  },
  included: [
    {
      number: 0,
      type: 'people',
      id: '1',
    },
    {
      boolean: true,
      type: 'comments',
      id: '2',
      author: {
        number: 0,
        type: 'people',
        id: '1',
      },
      $: {
        relationships: {
          author: {
            links: {
              related: 'https://api.example/articles/1/author',
              self: 'https://api.example/articles/1/relationships/author',
            },
          },
        },
      },
    },
  ],
}
