import { CreatePetParams, PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

type CreatePetUseCaseRequest = CreatePetParams

type CreatePetUseCaseResponse = {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petRepository.create(data)

    return {
      pet,
    }
  }
}
