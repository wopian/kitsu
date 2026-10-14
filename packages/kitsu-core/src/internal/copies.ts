/** Small attribute graphs avoid a hash table; larger graphs promote once to linear-time indexing.
 * @private
 */
export class Copies {
  private pairs: any[] = []
  private index?: WeakMap<object, any>
  constructor(source?: object, output?: any) {
    if (source) this.pairs.push(source, output)
  }
  get(source: object): any {
    if (this.index) return this.index.get(source)
    for (let position = 0; position < this.pairs.length; position += 2)
      if (this.pairs[position] === source) return this.pairs[position + 1]
  }
  set(source: object, output: any): void {
    if (this.index) {
      this.index.set(source, output)
      return
    }
    this.pairs.push(source, output)
    if (this.pairs.length === 32) {
      this.index = new WeakMap()
      for (let position = 0; position < this.pairs.length; position += 2)
        this.index.set(this.pairs[position], this.pairs[position + 1])
      this.pairs = []
    }
  }
}
