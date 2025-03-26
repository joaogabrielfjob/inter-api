import { fastify } from 'fastify'
import cors from '@fastify/cors'

import { matchRoutes } from './infra/http/match_routes.js'

const server = fastify()

server.register(cors, { origin: process.env.WEB_URL })
server.register(matchRoutes)

const port =  Number(process.env.PORT ?? 7777)

server
  .listen({
    host: '0.0.0.0',
    port
  })
  .then(() => {
    console.log('🚀 HTTP server running')
  })