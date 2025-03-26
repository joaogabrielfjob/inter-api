import { Match } from './match_entity.js'

export interface MatchRepository {

  create(match: Match): Promise<Match | nil>

  createMany(matches: Match[]): Promise<number | nil>
}