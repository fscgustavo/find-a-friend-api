import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
