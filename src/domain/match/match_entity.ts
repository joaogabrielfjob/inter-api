export interface Match {
  id?: number

  identifier: string
  opponent: string
  location: string
  league: string
  date: Date
  emblem: string
}

export class Match {

  constructor({
    id,
    identifier,
    opponent,
    location,
    league,
    date,
    emblem
  }: Match) {
    this.id = id
    this.identifier = identifier
    this.opponent = opponent
    this.location = location
    this.league = league
    this.date = date
    this.emblem = emblem
  }
}