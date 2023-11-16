import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetPetUseCaseRequest = {
  id: string
}

type GetPetUseCaseResponse = {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
