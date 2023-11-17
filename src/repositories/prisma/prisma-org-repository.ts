import { Prisma } from '@prisma/client'
import { OrgRepository } from '../org-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const org = prisma.organization.create({ data })

    return org
  }

  async findByEmail(email: string) {
    const org = prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return org
  }
}
