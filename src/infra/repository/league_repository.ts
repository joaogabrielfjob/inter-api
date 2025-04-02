import { PrismaClient } from '@prisma/client'
import { League } from '../../domain/league/league_entity.js'
import { LeagueRepository } from '../../domain/league/league_repository.js'

export class ILeagueRepository implements LeagueRepository {

  constructor(private prisma: PrismaClient) { }
  
  async all(): Promise<League[]> {
    try {
      const result = await this.prisma.league.findMany({ orderBy: { name: 'asc' } })

      return result.map((result) => new League(result))
    } catch(exception) {
      console.error('ILeagueRepository - all - Exception', exception)

      return []
    }
  }
}