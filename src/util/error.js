export function error (E) {
  if (E.response) {
    const e = E.response.data
    return e.errors ? e.errors : e
  } else throw E
}
