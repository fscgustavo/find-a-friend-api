import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const getPetUseCase = new GetPetUseCase(petRepository)

  return getPetUseCase
}
