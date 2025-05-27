import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../utils/prisma_client.js'
import { FetchResults } from '../use_cases/fetch_results/fetch_results.js'
import { IResultRepository } from '../infra/repository/result_repository.js'
import { IOpponentRepository } from '../infra/repository/opponent_repository.js'
import { ILeagueRepository } from '../infra/repository/league_repository.js'

export class ScrapingResultsController {

  handle = async (_: FastifyRequest, reply: FastifyReply) => {
    const resultRepo = new IResultRepository(prisma)
    const opponentRepo = new IOpponentRepository(prisma)
    const leagueRepo = new ILeagueRepository(prisma)
    
    const fetchResults = new FetchResults(resultRepo, opponentRepo, leagueRepo)

    try {
      const output = await fetchResults.do()

      reply.code(200).send({ message: `${output} results successfully scraped` })
    } catch(exception) {
      console.error('ScrapingResultsController - handle - Exception', exception)

      reply.code(500).send({ message: 'Internal server error' })
    }
  }
}