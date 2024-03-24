import { Elysia, t } from 'elysia'
import Countries from '../db/Countries'
import cuid2 from '@paralleldrive/cuid2'
import DBMessage from '../enums/DBMessage'

const countriesRouter = new Elysia({ name: 'countries', prefix: '/countries' })

countriesRouter.get('/', async ({ set }) => {
  const countries = await Countries.getAllCountries()
  if (countries instanceof Error) {
    set.status = 500
    throw countries
  }
  return countries
})

countriesRouter.delete(
  '/:id',
  async ({ params, set }) => {
    const isCuid = cuid2.isCuid(params.id)
    if (!isCuid) {
      set.status = 400
      throw new Error(DBMessage.INVALID_ARGUMENT)
    }

    const country = await Countries.deleteCountry(params.id)
    if (country instanceof Error) {
      set.status = 500
      throw country
    }

    return country
  },
  { params: t.Object({ id: t.String() }) }
)

export default countriesRouter
