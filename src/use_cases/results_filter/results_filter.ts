import { LeagueRepository } from '../../domain/league/league_repository.js'
import { OpponentRepository } from '../../domain/opponent/opponent_repository.js'
import { Combo } from '../../utils/types.js'
import { ResultsFilterOutput } from './types.js'

export class ResultsFilter {

  constructor(
    private readonly leagueRepo: LeagueRepository,
    private readonly opponentRepo: OpponentRepository
  ) { }

  async do(): Promise<ResultsFilterOutput> {
    const leagues = await this.leagueRepo.all()
    const opponents = await this.opponentRepo.all()

    const leaguesOutput: Combo[] = leagues.map((league) => {
      return {
        value: league.name,
        label: league.name
      }
    })

    const opponentsOutput: Combo[] = opponents.map((opponent) => {
      return {
        value: opponent.name,
        label: opponent.name
      }
    })

    return { leagues: leaguesOutput, opponents: opponentsOutput }
  }
}