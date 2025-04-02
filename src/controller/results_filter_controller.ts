import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../utils/prisma_client.js'
import { IResultRepository } from '../infra/repository/result_repository.js'
import { Results } from '../use-cases/results/results.js'
import { ILeagueRepository } from '../infra/repository/league_repository.js'
import { ResultsFilter } from '../use-cases/results_filter/results_filter.js'

export class ResultsFilterController {

  handle = async (_: FastifyRequest, reply: FastifyReply) => {
    const repository = new ILeagueRepository(prisma)
    const results = new ResultsFilter(repository)

    try {
      const output = await results.do()

      reply.code(200).send(output)
    } catch(exception) {
      console.error('ResultsFilterController - handle - Exception', exception)

      reply.code(500).send({ message: 'Internal server error' })
    }
  }
}