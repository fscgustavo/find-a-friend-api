import { Pet } from '@prisma/client'
import { randomUUID } from 'crypto'
import {
  CreatePetParams,
  PetRepository,
  SearchManyPetsParams,
} from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async create({ id, ...data }: CreatePetParams) {
    const pet: Pet = {
      ...data,
      id: id ?? randomUUID(),
      adoptionRequirements: data.adoptionRequirements ?? [],
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => id === pet.id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany({ page, ...data }: SearchManyPetsParams) {
    const beginning = (page - 1) * 20
    const end = page * 20

    const pets = this.items
      .filter((pet) => {
        const sameCity = data.city.includes(pet.city)
        const similarAge = !data.age || data.age?.includes(pet.age)
        const sameEnergy = !data.energy || data.energy === pet.energy
        const similarIndependence =
          !data.independence || data.independence?.includes(pet.independence)
        const similarSize = !data.size || data.size?.includes(pet.size)

        return (
          sameCity &&
          similarAge &&
          sameEnergy &&
          similarIndependence &&
          similarSize
        )
      })
      .slice(beginning, end)

    return pets
  }
}
