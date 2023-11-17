import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    address: z.string(),
    phone: z.string(),
  })

  const data = createOrgSchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute(data)
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
