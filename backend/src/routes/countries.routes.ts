import type { ICountryOptional } from './../models/ICountry'
import { Elysia, error, t } from 'elysia'
import Countries from '../db/Countries'
import cuid2 from '@paralleldrive/cuid2'
import DBMessage from '../enums/DBMessage'
import updateCountryDTO from './dto/updateCountryDTO'

const countriesRouter = new Elysia({
  name: 'Countries',
  prefix: '/countries'
})
  .get(
    '/get', // shouldn't be written like that, but elysia Eden treaty is not yet implemented for not unique paths
    async ({ error }) =>
      await Countries.getAllCountries()
        .then((countries) => countries)
        .catch((e) =>
          error(500, { error: e.message ?? 'Internal server error' })
        ),
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

  .delete(
    '/delete/:id',
    async ({ params: { id } }) => {
      const isCuid = cuid2.isCuid(id)
      if (!isCuid) return error(400, { error: DBMessage.INVALID_ARGUMENT })

      const country = await Countries.deleteCountry(id)
      if (country instanceof Error) {
        return error(500, {
          error: country.message ?? 'Internal server error'
        })
      }

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

  .patch(
    '/patch/:id',
    async ({ params, body }) => {
      if (!cuid2.isCuid(params.id)) {
        return error(400, { error: DBMessage.INVALID_ARGUMENT })
      }

      const country: ICountryOptional = body
      await Countries.updateContry(params.id, country)
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

export type CountriesRouter = typeof countriesRouter

export default countriesRouter
