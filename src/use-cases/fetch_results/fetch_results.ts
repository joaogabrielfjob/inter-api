import { Opponent } from '../../domain/opponent/opponent.js'
import { Result } from '../../domain/result/result_entity.js'
import { League } from '../../domain/league/league_entity.js'
import { ResultRepository } from '../../domain/result/result_repository.js'
import { LeagueRepository } from '../../domain/league/league_repository.js'
import { OpponentRepository } from '../../domain/opponent/opponent_repository.js'

import { nanoid } from '../../utils/nanoid.js'
import { rapidAPI } from '../../utils/rapid_api.js'
import { leagueMapper } from '../../utils/league_mapper.js'

export class FetchResults {

  constructor(
    private readonly resultRepo: ResultRepository,
    private readonly opponentRepo: OpponentRepository,
    private readonly leagueRepo: LeagueRepository
  ) { }

  async do(): Promise<number> {
    try {
      const INTERNACIONAL_ID = 119;
      const SEASON = new Date().getFullYear();
      const STATUS = 'FT'; // Full Time

      const response = await rapidAPI.get('/fixtures', {
        params: {
          team: INTERNACIONAL_ID,
          season: SEASON,
          status: STATUS
        }
      })

      const input = response.data.response

      const results: Result[] = []
      const leagues: League[] = []
      const opponents: Opponent[] = []

      for (const i of input) {
        const identifier = nanoid()

        let opponentInfo, interGoals, opponentGoals
        const isHome = i.teams.home.id === INTERNACIONAL_ID

        if (isHome) {
          opponentInfo = i.teams.away
          interGoals = i.goals.home
          opponentGoals = i.goals.away
        } else {
          opponentInfo = i.teams.home
          interGoals = i.goals.away
          opponentGoals = i.goals.home
        }
        
        const mappedLeague = leagueMapper[i.league.name]

        if (!mappedLeague) {
          console.error(`League mapping not found for: ${i.league.name}`)
          continue
        }

        const result: Result = {
          identifier,
          opponent: opponentInfo.name,
          location: i.fixture.venue.name,
          league: mappedLeague,
          date: new Date(i.fixture.date),
          emblem: opponentInfo.logo,
          interGoals,
          opponentGoals
        }

        const opponent: Opponent = {
          name: opponentInfo.name
        }

        const league: League = {
          name: mappedLeague
        }
  
        results.push(result)
        leagues.push(league)
        opponents.push(opponent)
      }

      await this.resultRepo.createMany(results)
      await this.leagueRepo.createMany(leagues)
      await this.opponentRepo.createMany(opponents)

      return results.length
    } catch (error) {
      console.error('Error fetching results:', error)

      return 0
    }
  }
}