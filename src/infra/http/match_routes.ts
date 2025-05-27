import { FastifyInstance } from 'fastify'
import { FetchMatchesController } from '../../controller/fetch_matches_controller.js'
import { MatchesController } from '../../controller/matches_controller.js'

const matchRoutes = async (server: FastifyInstance) => {
  server.post('/match/scrap', new FetchMatchesController().handle)
  server.get('/match', new MatchesController().handle)
}

export { matchRoutes }