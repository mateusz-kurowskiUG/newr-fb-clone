import Elysia from 'elysia'
import Countries from '../db/Countries'

const countriesRouter = new Elysia({ name: 'countries', prefix: '/countries' })

countriesRouter.get('/', async ({ set }) => {
  const countries = await Countries.getAllCountries()
  if (countries instanceof Error) {
    set.status = 500
    return { error: countries.message }
  }
  return countries
})

export default countriesRouter
