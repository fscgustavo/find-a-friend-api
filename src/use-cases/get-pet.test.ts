import { describe, it, expect, beforeEach } from 'vitest'
import { GetPetUseCase } from './get-pet'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'

describe('Get Pet Use Case', async () => {
  let petRepository: InMemoryPetRepository
  let getPetUseCase: GetPetUseCase

  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    getPetUseCase = new GetPetUseCase(petRepository)
  })

  it('should be able to register a pet', async () => {
    await petRepository.create({
      id: 'pet-1',
      name: 'Spike',
      description: 'A cute dog',
      age: 'puppy',
      city: 'Recife',
      energy: 0,
      independence: 'Low',
      size: 'small',
      organizationId: 'org-1',
    })

    const { pet } = await getPetUseCase.execute({ id: 'pet-1' })

    expect(pet.id).toEqual('pet-1')
    expect(pet.name).toEqual('Spike')
  })
})
