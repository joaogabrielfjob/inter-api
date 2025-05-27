import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../utils/prisma_client.js'
import { IMatchRepository } from '../infra/repository/match_repository.js'
import { FetchMatches } from '../use_cases/fetch_matches/fetch_matches.js'

export class FetchMatchesController {

  handle = async (_: FastifyRequest, reply: FastifyReply) => {
    const repository = new IMatchRepository(prisma)
    const fetchMatches = new FetchMatches(repository);

    try {
      const output = await fetchMatches.do()

      reply.code(200).send({ message: `${output} matches successfully scraped` })
    } catch(exception) {
      console.error('FetchMatchesController - handle - Exception', exception)

      reply.code(500).send({ message: 'Internal server error' })
    }
  }
}