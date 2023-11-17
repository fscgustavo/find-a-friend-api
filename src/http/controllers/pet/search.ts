import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    energy: z.coerce.number().min(0).default(0),
    size: z.string().optional(),
    independence: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const data = searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeFetchPetsUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute(data)

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
