import { Elysia, error, t } from 'elysia'
import Countries from '../db/Countries'
import cuid2 from '@paralleldrive/cuid2'
import DBMessage from '../enums/DBMessage'
import updateCountryDTO from './dto/updateCountryDTO'

const countriesRouter = new Elysia({ name: 'Countries', prefix: '/countries' })

countriesRouter.get(
  '/',
  async ({ set, error }) =>
    await Countries.getAllCountries()
      .then((countries) => countries)
      .catch((e) => error(500, { error: e.message })),
  {
    detail: {
      tags: ['Countries'],
      responses: {
        200: { description: 'Countries list' },
        500: { description: 'Internal server error' }
      }
    }
  }
)

countriesRouter.delete(
  '/:id',
  async ({ params, set }) => {
    const isCuid = cuid2.isCuid(params.id)
    if (!isCuid) return error(400, { error: DBMessage.INVALID_ARGUMENT })

    const country = await Countries.deleteCountry(params.id)
    if (country instanceof Error) return error(500, { error: country.message })

    return country
  },
  {
    params: t.Object({ id: t.String() }),
    detail: {
      tags: ['Countries'],
      responses: {
        200: { description: 'Country deleted' },
        400: { description: 'Invalid argument' },
        500: { description: 'Internal server error' }
      }
    }
  }
)
countriesRouter.put(
  '/:id',
  async ({ params, body, set }) => {
    if (!cuid2.isCuid(params.id)) { return error(400, { error: DBMessage.INVALID_ARGUMENT }) }

    await Countries.updateContry(params.id, {
      id: params.id,
      ...body
    })
      .then((country) => country)
      .catch((e) => error(500, { error: e.message }))
  },
  {
    params: t.Object({ id: t.String({ minLength: 24, maxLength: 24 }) }),
    body: updateCountryDTO,
    type: 'json',
    detail: {
      tags: ['Countries'],
      responses: {
        200: {
          description: 'Country updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' }
                }
              }
            }
          }
        },
        400: { description: 'Invalid argument' },
        500: { description: 'Internal server error' }
      }
    }
  }
)

export default countriesRouter
