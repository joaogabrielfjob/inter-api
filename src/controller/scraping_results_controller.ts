import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../utils/prisma_client.js'
import { ScrapingResults } from '../use-cases/scraping-results/scraping_results.js'
import { IResultRepository } from '../infra/repository/result_repository.js'
import { IOpponentRepository } from '../infra/repository/opponent_repository.js'

export class ScrapingResultsController {

  handle = async (_: FastifyRequest, reply: FastifyReply) => {
    const resultRepo = new IResultRepository(prisma)
    const opponentRepo = new IOpponentRepository(prisma)
    
    const scrapingResults = new ScrapingResults(resultRepo, opponentRepo)

    try {
      const output = await scrapingResults.do()

      reply.code(200).send({ message: `${output} results successfully scraped` })
    } catch(exception) {
      console.error('ScrapingResultsController - handle - Exception', exception)

      reply.code(500).send({ message: 'Internal server error' })
    }
  }
}