import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchPetsUseCase } from '../fetch-pets'

export function makeFetchPetsUseCase() {
  const petRepository = new PrismaPetRepository()
  const fetchPetUseCase = new FetchPetsUseCase(petRepository)

  return fetchPetUseCase
}
