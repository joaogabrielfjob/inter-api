export interface Result {
  id?: number

  identifier: string
  opponent: string
  location: string
  league: string
  date: Date
  emblem: string
  interGoals: number
  opponentGoals: number
}

export class Result {

  constructor({
    id,
    identifier,
    opponent,
    location,
    league,
    date,
    emblem,
    interGoals,
    opponentGoals
  }: Result) {
    this.id = id
    this.identifier = identifier
    this.opponent = opponent
    this.location = location
    this.league = league
    this.date = date
    this.emblem = emblem
    this.interGoals = interGoals
    this.opponentGoals = opponentGoals
  }
}