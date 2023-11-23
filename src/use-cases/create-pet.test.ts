import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'

describe('Create Pet Use Case', async () => {
  let petRepository: InMemoryPetRepository
  let createPetUseCase: CreatePetUseCase

  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    createPetUseCase = new CreatePetUseCase(petRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await createPetUseCase.execute({
      id: 'pet-1',
      name: 'Spike',
      description: 'A cute dog',
      age: 'puppy',
      city: 'Recife',
      energy: 0,
      independence: 'Low',
      size: 'small',
      organizationId: 'org-1',
      adoptionRequirements: [],
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(petRepository.items[0].id).toEqual(expect.any(String))
  })
})
