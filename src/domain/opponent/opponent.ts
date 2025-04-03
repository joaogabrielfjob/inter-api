export interface Opponent {
  id?: number

  name: string
}

export class Opponent {

  constructor({
    id,
    name
  }: Opponent) {
    this.id = id
    this.name = name
  }
}