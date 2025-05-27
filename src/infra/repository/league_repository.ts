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

  async createMany(leagues: League[]): Promise<number | nil> {
    try {
      const result = await this.prisma.league.createMany({
        data: leagues,
        skipDuplicates: true
      })

      return result.count
    } catch(exception) {
      console.error('ILeagueRepository - createMany - Exception', exception)

      return null
    }
  }
}