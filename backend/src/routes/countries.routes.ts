import { Elysia } from 'elysia'
import Countries from '../db/Countries'
import CountriesDTOs from './dto/countriesDTOs'

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
  CountriesDTOs.getCountries
)

export type CountriesRouter = typeof countriesRouter

export default countriesRouter
