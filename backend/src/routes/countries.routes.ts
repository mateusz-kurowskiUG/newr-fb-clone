import { Elysia } from 'elysia'
import Countries from '../db/Countries'

const countriesRouter = new Elysia({
  name: 'Countries',
  prefix: '/countries'
}).get(
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

export type CountriesRouter = typeof countriesRouter

export default countriesRouter
