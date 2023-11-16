import { OrgRepository } from '@/repositories/org-repository'
import { Organization, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

type CreateOrgUseCaseRequest = Prisma.OrganizationCreateInput

type CreateOrgUseCaseResponse = {
  org: Organization
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    password,
    ...data
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const doesEmailAlreadyExists = await this.orgRepository.findByEmail(
      data.email,
    )

    if (doesEmailAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgRepository.create({
      ...data,
      password: passwordHash,
    })

    return {
      org,
    }
  }
}
