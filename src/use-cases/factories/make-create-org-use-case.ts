import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const createOrgUseCase = new CreateOrgUseCase(orgRepository)

  return createOrgUseCase
}
