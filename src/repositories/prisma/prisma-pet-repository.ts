import { Pet } from '@prisma/client'
import {
  CreatePetParams,
  PetRepository,
  SearchManyPetsParams,
} from '../pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: CreatePetParams) {
    const pet = prisma.pet.create({ data })

    return pet
  }

  async findById(id: string) {
    const pet = prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchMany({ page, ...data }: SearchManyPetsParams) {
    const pet = prisma.pet.findMany({
      where: {
        city: {
          contains: data.city,
        },
        age: {
          contains: data.age,
        },
        energy: {
          equals: data.energy,
        },
        size: {
          contains: data.size,
        },
        independence: {
          contains: data.independence,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pet
  }
}
