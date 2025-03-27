import { PrismaClient } from '@prisma/client'
import { ResultRepository } from '../../domain/result/result_repository.js'
import { Result } from '../../domain/result/result_entity.js'

export class IResultRepository implements ResultRepository {
    
  constructor(private prisma: PrismaClient) { }

  async createMany(results: Result[]): Promise<number | nil> {
    try {
      const result = await this.prisma.result.createMany({
        data: results
      })

      return result.count
    } catch(exception) {
      console.error('IResultRepository - createMany - Exception', exception)

      return null
    }
  }

  async all(): Promise<Result[]> {
    try {
      const result = await this.prisma.result.findMany({ orderBy: { date: 'desc' } })

      return result.map((result) => new Result(result))
    } catch(exception) {
      console.error('IResultRepository - all - Exception', exception)

      return []
    }
  }
}