export function error (E) {
  if (E.response) {
    const e = E.response.data
    if (e) return e
  }
  throw E
}
