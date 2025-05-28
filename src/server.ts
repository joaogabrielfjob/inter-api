import { fastify } from 'fastify'
import cors from '@fastify/cors'

import { matchRoutes } from './infra/http/match_routes.js'
import { resultRoutes } from './infra/http/result_routes.js'

const server = fastify()

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map(origin => origin.trim())

server.register(cors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})

server.addHook('onRequest', (request, reply, done) => {
  const host = request.headers.origin

  if (!host || !allowedOrigins.includes(host)) {
    reply.code(403).send({ error: 'Forbidden: Host not allowed' })
    return
  }

  done()
})

server.register(matchRoutes)
server.register(resultRoutes)

const port = Number(process.env.PORT ?? 7777)

server
  .listen({
    host: '0.0.0.0',
    port
  })
  .then(() => {
    console.log('🚀 HTTP server running')
  })