import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pet (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  const commonPet = {
    name: 'Spike',
    description: 'A cute dog',
    age: 'puppy',
    city: 'Recife',
    energy: 0,
    independence: 'Low',
    size: 'small',
    adoptionRequirements: [],
  }

  it('should be able to filter the pet list', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await Promise.all([
      request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send(commonPet),
      request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...commonPet, name: 'Happy', city: 'São Paulo' }),
      request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...commonPet, name: 'Akamaru', size: 'big' }),
      request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...commonPet, name: 'Pakkun' }),
    ])

    const response = await request(app.server)
      .get('/pets/search?size=small&city=Recife')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pakkun',
        }),
        expect.objectContaining({
          name: 'Spike',
        }),
      ]),
    )
  })
})
