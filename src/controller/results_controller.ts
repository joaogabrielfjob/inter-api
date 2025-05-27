import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../utils/prisma_client.js'
import { IResultRepository } from '../infra/repository/result_repository.js'
import { Results } from '../use_cases/results/results.js'
import { ResultsParams } from '../use_cases/results/types.js'

export class ResultsController {

  handle = async (request: FastifyRequest<{ Querystring: ResultsParams }>, reply: FastifyReply) => {
    const repository = new IResultRepository(prisma)
    const results = new Results(repository)

    try {
      const output = await results.do(request.query)

      reply.code(200).send(output)
    } catch(exception) {
      console.error('ResultsController - handle - Exception', exception)

      reply.code(500).send({ message: 'Internal server error' })
    }
  }
}