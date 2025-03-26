import { FastifyInstance } from 'fastify'
import { ScrapingMatchesController } from '../../controller/scraping_matches_controller.js'

const matchRoutes = async (server: FastifyInstance) => {
  server.post('/match/scrap', new ScrapingMatchesController().handle)
}

export { matchRoutes }