import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../utils/prisma_client.js'
import { ILeagueRepository } from '../infra/repository/league_repository.js'
import { ResultsFilter } from '../use-cases/results_filter/results_filter.js'
import { IOpponentRepository } from '../infra/repository/opponent_repository.js'

export class ResultsFilterController {

  handle = async (_: FastifyRequest, reply: FastifyReply) => {
    const leagueRepo = new ILeagueRepository(prisma)
    const opponentRepo = new IOpponentRepository(prisma)

    const results = new ResultsFilter(leagueRepo, opponentRepo)

    try {
      const output = await results.do()

      reply.code(200).send(output)
    } catch(exception) {
      console.error('ResultsFilterController - handle - Exception', exception)

      reply.code(500).send({ message: 'Internal server error' })
    }
  }
}