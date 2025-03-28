import { MatchRepository } from '../../domain/match/match_repository.js'
import { Match } from '../../domain/match/match_entity.js'
import { PrismaClient } from '@prisma/client'

export class IMatchRepository implements MatchRepository {
    
  constructor(private prisma: PrismaClient) { }

  async createMany(matches: Match[]): Promise<number | nil> {
    try {
      const result = await this.prisma.match.createMany({
        data: matches
      })

      return result.count
    } catch(exception) {
      console.error('IMatchRepository - createMany - Exception', exception)

      return null
    }
  }

  async all(): Promise<Match[]> {
    try {
      const result = await this.prisma.match.findMany({ orderBy: { date: 'asc' } })

      return result.map((match) => new Match(match))
    } catch(exception) {
      console.error('IMatchRepository - all - Exception', exception)

      return []
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await this.prisma.match.deleteMany({})
    } catch(exception) {
      console.error('IMatchRepository - deleteAll - Exception', exception)
    }
  }
}