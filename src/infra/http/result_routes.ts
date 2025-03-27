import { FastifyInstance } from 'fastify'
import { ScrapingResultsController } from '../../controller/scraping_results_controller.js'
import { ResultsController } from '../../controller/results_controller.js'

const resultRoutes = async (server: FastifyInstance) => {
  server.post('/result/scrap', new ScrapingResultsController().handle)
  server.get('/result', new ResultsController().handle)
}

export { resultRoutes }