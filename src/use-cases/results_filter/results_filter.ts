import { LeagueRepository } from '../../domain/league/league_repository.js'
import { Combo } from '../../utils/types.js'
import { ResultsFilterOutput } from './types.js'

export class ResultsFilter {

  constructor(private readonly repo: LeagueRepository) { }

  async do(): Promise<ResultsFilterOutput> {
    const leagues = await this.repo.all()

    const leaguesOutput: Combo[] = leagues.map((league) => {
      return {
        value: league.name,
        label: league.name
      }
    })

    return { leagues: leaguesOutput }
  }
}