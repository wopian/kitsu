export default {
  data: {
    array: ['string'],
    object: {
      string: 'string',
    },
    string: 'string',
    type: 'articles',
    id: '1',
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
}
