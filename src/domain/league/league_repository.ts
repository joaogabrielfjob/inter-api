import { League } from './league_entity.js'

export interface LeagueRepository {

  all(): Promise<League[]>

  createMany(leagues: League[]): Promise<number | nil>
}