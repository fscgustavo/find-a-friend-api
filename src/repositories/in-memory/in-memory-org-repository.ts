import { Organization, Prisma } from '@prisma/client'
import { OrgRepository } from '../org-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgRepository implements OrgRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const org = {
      ...data,
      id: data.id ?? randomUUID(),
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => email === org.email)

    if (!org) {
      return null
    }

    return org
  }
}
