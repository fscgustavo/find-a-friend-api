import {
  PetRepository,
  SearchManyPetsParams,
} from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

type FetchPetsUseCaseRequest = SearchManyPetsParams

type FetchPetsUseCaseResponse = {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: FetchPetsUseCaseRequest,
  ): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petRepository.searchMany(data)

    return {
      pets,
    }
  }
}
