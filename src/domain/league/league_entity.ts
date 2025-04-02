export interface League {
  id?: number

  name: string
}

export class League {

  constructor({
    id,
    name
  }: League) {
    this.id = id
    this.name = name
  }
}