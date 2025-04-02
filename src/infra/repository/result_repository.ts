import { Prisma, PrismaClient } from '@prisma/client'
import { ResultRepository } from '../../domain/result/result_repository.js'
import { Result } from '../../domain/result/result_entity.js'

export class IResultRepository implements ResultRepository {
    
  constructor(private prisma: PrismaClient) { }

  async createMany(results: Result[]): Promise<number | nil> {
    try {
      const result = await this.prisma.result.createMany({
        data: results,
        skipDuplicates: true
      })

      return result.count
    } catch(exception) {
      console.error('IResultRepository - createMany - Exception', exception)

      return null
    }
  }

  async filtered(year: string, month: string, league: string): Promise<Result[]> {
    try {
      const where = this.buildFilteredWhere(year, month, league)
      const query = Prisma.sql`SELECT * FROM result ${where} ORDER BY date desc`

      const result = await this.prisma.$queryRaw<Result[]>(query)

      return result.map((result) => new Result(result))
    } catch(exception) {
      console.error('IResultRepository - all - Exception', exception)

      return []
    }
  }

  private buildFilteredWhere = (year: string, month: string, league: string) => {
    const conditions: Prisma.Sql[] = []

    const byYear = Prisma.sql`EXTRACT(YEAR FROM date) = ${year}::integer`
    const byMonth = Prisma.sql`EXTRACT(MONTH FROM date) = ${month}::integer`
    const byLeague = Prisma.sql`UPPER(UNACCENT(league)) = UPPER(UNACCENT(${league}))`

    if (year) conditions.push(byYear)

    if (month) conditions.push(byMonth)

    if (league) conditions.push(byLeague)

    return conditions.length ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty
  }
}