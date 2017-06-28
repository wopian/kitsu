import Kitsu from '../src/main'

const kitsu = new Kitsu({
  /*
  headers: {
    accept: 'no'
  }
  */
});

(async () => {
  try {
    const { data, errors } = await kitsu.get('mappings')

    if (errors) console.log(errors)
    else console.log(data[0])
  } catch (err) {
    console.log(err)
  }
})()
