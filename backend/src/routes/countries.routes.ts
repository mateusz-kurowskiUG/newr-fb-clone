import { Elysia } from 'elysia'
import Countries from '../db/Countries'
import CountriesDTOs from './dto/countriesDTOs'

const countriesRouter = new Elysia({
  name: 'Countries',
  prefix: '/countries'
})
  .get(
    '/',
    async ({ error }) =>
      await Countries.getAllCountries()
        .then((countries) => countries)
        .catch((e) =>
          error(500, { error: e.message ?? 'Internal server error' })
        ),
    CountriesDTOs.getCountries
  )
  .post('/', async ({ body, error }) => {})

export type TCountriesRouter = typeof countriesRouter

export default countriesRouter
