import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    name: 'Antonio Bandeira',
    email: 'name@example.com',
    password: '12345678',
    address: 'Main Street',
    phone: '81912345678',
  })

  const {
    body: { token },
  } = await request(app.server).post('/sessions').send({
    email: 'name@example.com',
    password: '12345678',
  })

  return {
    token,
  }
}
