import { League } from './league_entity.js'

export interface LeagueRepository {

  all(): Promise<League[]>
}