import { Match } from '../../domain/match/match_entity.js'
import { MatchRepository } from '../../domain/match/match_repository.js'

import { nanoid } from '../../utils/nanoid.js'
import { rapidAPI } from '../../utils/rapid_api.js'
import { leagueMapper } from '../../utils/league_mapper.js'

export class FetchMatches {

  constructor(private readonly repo: MatchRepository) { }

  async do(): Promise<number> {
    try {
      const INTERNACIONAL_ID = 119;
      const SEASON = new Date().getFullYear();
      const STATUS = 'NS'; // Not Started

      const response = await rapidAPI.get('/fixtures', {
        params: {
          team: INTERNACIONAL_ID,
          season: SEASON,
          status: STATUS
        }
      })

      const input = response.data.response
      const matches: Match[] = []

      for (const { fixture, teams, league } of input) {
        const identifier = nanoid()
        
        const opponent = teams.home.id === INTERNACIONAL_ID ? teams.away : teams.home
        const mappedLeague = leagueMapper[league.name]

        if (!mappedLeague) {
          console.error(`League mapping not found for: ${league.name}`)
          continue
        }
  
        const match: Match = {
          identifier,
          opponent: opponent.name,
          location: fixture.venue.name,
          league: mappedLeague,
          date: new Date(fixture.date),
          emblem: opponent.logo
        }
  
        matches.push(match)
      }

      await this.deletePreviousMatches()
      await this.repo.createMany(matches)

      return matches.length
    } catch (error) {
      console.error('Error fetching matches:', error)

      return 0
    }
  }

  /* 
    remove previously stored matches 
    to avoid duplication or inconsistencies 
    due to updates in match data
  */
  deletePreviousMatches = async () => await this.repo.deleteAll()
}