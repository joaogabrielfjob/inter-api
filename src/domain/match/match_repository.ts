import { Match } from './match_entity.js'

export interface MatchRepository {

  createMany(matches: Match[]): Promise<number | nil>

  all(): Promise<Match[]>
}