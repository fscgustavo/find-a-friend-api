import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const cretePetSchema = z.object({
    name: z.string(),
    description: z.string(),
    city: z.string(),
    age: z.string(),
    energy: z.number(),
    size: z.string(),
    independence: z.string(),
    adoptionRequirements: z.string().array().default([]),
  })

  const data = cretePetSchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    ...data,
    organizationId: request.user.sub,
  })

  return reply.status(201).send()
}
