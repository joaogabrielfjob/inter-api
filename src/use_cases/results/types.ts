export type ResultsOutput = {
  id?: number
  opponent: string
  location: string
  league: string
  date: Date
  emblem: string
  interGoals: number
  opponentGoals: number
}

export type ResultsParams = {
  year: string
  month: string
  league: string
  opponent: string
}