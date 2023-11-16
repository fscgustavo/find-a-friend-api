import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { CreateOrgUseCase } from './create-org'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

describe('Create Org Use Case', async () => {
  let orgRepository: InMemoryOrgRepository
  let createOrgUseCase: CreateOrgUseCase

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    createOrgUseCase = new CreateOrgUseCase(orgRepository)
  })

  it('should hash the password upon registration', async () => {
    const { org } = await createOrgUseCase.execute({
      name: 'Antonio Bandeira',
      email: 'name@example.com',
      password: '123456',
      address: 'Main Street',
      phone: '81912345678',
    })

    const isPasswordHashed = await compare('123456', org.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    await createOrgUseCase.execute({
      name: 'Antonio Bandeira',
      email: 'name@example.com',
      password: '123456',
      address: 'Main Street',
      phone: '81912345678',
    })

    await expect(() =>
      createOrgUseCase.execute({
        name: 'Antonio Bandeira',
        email: 'name@example.com',
        password: '123456',
        address: 'Main Street',
        phone: '81912345678',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
