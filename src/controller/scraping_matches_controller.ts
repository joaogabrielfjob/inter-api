import { FastifyReply, FastifyRequest } from 'fastify'
import { ScrapingMatches } from '../use-cases/scraping-matches/scraping_matches.js'
import { prisma } from '../utils/prisma_client.js'
import { IMatchRepository } from '../infra/repository/match_repository.js'

export class ScrapingMatchesController {

  handle = async (_: FastifyRequest, reply: FastifyReply) => {
    const repository = new IMatchRepository(prisma)
    const scrapingMatches = new ScrapingMatches(repository)

    try {
      const output = await scrapingMatches.do()

      reply.code(200).send({ message: `${output} matches successfully scraped` })
    } catch(exception) {
      console.error('ScrapingMatchesController - handle - Exception', exception)

      reply.code(500).send({ message: 'Internal server error' })
    }
  }
}