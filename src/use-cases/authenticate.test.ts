import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { CreateOrgUseCase } from './create-org'

describe('Authenticate Use Case', async () => {
  let orgRepository: InMemoryOrgRepository
  let authenticateUseCase: AuthenticateUseCase
  let createOrgUseCase: CreateOrgUseCase

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    authenticateUseCase = new AuthenticateUseCase(orgRepository)
    createOrgUseCase = new CreateOrgUseCase(orgRepository)
  })

  it('should be able to authenticate', async () => {
    await createOrgUseCase.execute({
      name: 'Antonio Bandeira',
      email: 'name@example.com',
      password: '123456',
      address: 'Main Street',
      phone: '81912345678',
    })

    const { org } = await authenticateUseCase.execute({
      email: 'name@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with a wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    await createOrgUseCase.execute({
      name: 'Antonio Bandeira',
      email: 'name@example.com',
      password: '123456',
      address: 'Main Street',
      phone: '81912345678',
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'name@example.com',
        password: '1234567',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })
})
