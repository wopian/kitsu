export function error (E) {
  if (E.response) {
    const e = E.response.data
    if (e && e.errors) {
      E.errors = e.errors
      return E
    }
  } else if (E.errors) return E
  throw E
}
