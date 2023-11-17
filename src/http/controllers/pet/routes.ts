import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { get } from './get'
import { search } from './search'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { preHandler: [verifyJWT] }, create)

  app.get('/pets/:id', get)
  app.get('/pets/search', search)
}
