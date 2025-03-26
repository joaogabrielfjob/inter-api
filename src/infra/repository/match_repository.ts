import { MatchRepository } from '../../domain/match/match_repository.js'
import { Match } from '../../domain/match/match_entity.js'
import { PrismaClient } from '@prisma/client'

export class IMatchRepository implements MatchRepository {
    
  constructor(private prisma: PrismaClient) { }

  async create(match: Match): Promise<Match | nil> {
    try {
      const result = await this.prisma.match.create({
        data: match
      })

      return new Match({ ...result })
    } catch(exception) {
      console.error('IMatchRepository - create - Exception', exception)

      return null
    }
  }

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
}