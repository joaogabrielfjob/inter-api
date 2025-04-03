import { PrismaClient } from '@prisma/client'
import { OpponentRepository } from '../../domain/opponent/opponent_repository.js'
import { Opponent } from '../../domain/opponent/opponent.js'

export class IOpponentRepository implements OpponentRepository {

  constructor(private prisma: PrismaClient) { }

  async createMany(opponents: Opponent[]): Promise<number | nil> {
      try {
        const result = await this.prisma.opponent.createMany({
          data: opponents,
          skipDuplicates: true
        })
  
        return result.count
      } catch(exception) {
        console.error('IOpponentRepository - createMany - Exception', exception)
  
        return null
      }
    }
  
  async all(): Promise<Opponent[]> {
    try {
      const result = await this.prisma.opponent.findMany({ orderBy: { name: 'asc' } })

      return result.map((result) => new Opponent(result))
    } catch(exception) {
      console.error('IOpponentRepository - all - Exception', exception)

      return []
    }
  }
}