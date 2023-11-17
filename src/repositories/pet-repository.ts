import { Pet, Prisma } from '@prisma/client'

export type SearchManyPetsParams = {
  city: string
  age?: string
  energy?: number
  size?: string
  independence?: string
  page: number
}

export type CreatePetParams = Prisma.PetUncheckedCreateInput & {
  adoptionRequirements: string[]
}

export interface PetRepository {
  create(data: CreatePetParams): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchMany(data: SearchManyPetsParams): Promise<Pet[]>
}
