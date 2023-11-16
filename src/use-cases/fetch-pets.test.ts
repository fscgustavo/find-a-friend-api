import { describe, it, expect, beforeEach } from 'vitest'
import { FetchPetsUseCase } from './fetch-pets'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'

describe('Fetch Pets Use Case', async () => {
  let petRepository: InMemoryPetRepository
  let fetchPetsUseCase: FetchPetsUseCase

  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    fetchPetsUseCase = new FetchPetsUseCase(petRepository)
  })

  it('should filter the pets correctly', async () => {
    await Promise.all([
      petRepository.create({
        id: 'pet-1',
        name: 'Akamaru',
        description: 'A cute dog',
        age: 'puppy',
        city: 'Campinas',
        energy: 1,
        independence: 'Low',
        size: 'small',
        organizationId: 'org-1',
      }),
      petRepository.create({
        id: 'pet-2',
        name: 'Spike',
        description: 'A cute dog',
        age: 'puppy',
        city: 'Recife',
        energy: 1,
        independence: 'Low',
        size: 'small',
        organizationId: 'org-2',
      }),
    ])

    const { pets } = await fetchPetsUseCase.execute({ city: 'Recife', page: 1 })

    expect(pets).toHaveLength(1)
    expect(pets[0].id).toEqual('pet-2')
  })
})
