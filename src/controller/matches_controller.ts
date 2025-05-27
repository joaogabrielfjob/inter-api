import { FastifyReply, FastifyRequest } from 'fastify'
import { IMatchRepository } from '../infra/repository/match_repository.js'
import { prisma } from '../utils/prisma_client.js'
import { Matches } from '../use_cases/matches/matches.js'

export class MatchesController {

  handle = async (_: FastifyRequest, reply: FastifyReply) => {
    const repository = new IMatchRepository(prisma)
    const matches = new Matches(repository)

    try {
      const output = await matches.do()

      reply.code(200).send(output)
    } catch(exception) {
      console.error('MatchesController - handle - Exception', exception)

      reply.code(500).send({ message: 'Internal server error' })
    }
  }
}