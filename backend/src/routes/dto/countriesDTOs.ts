import { t } from 'elysia'

const getCountries = {
  detail: {
    tags: ['Countries', 'Admin'],
    responses: {
      200: { description: 'Countries list' },
      500: { description: 'Internal server error' }
    }
  },
  query: t.Optional(
    t.Object({
      page: t.Optional(t.Numeric({ minimum: 1, description: 'no. page' })),
      pageSize: t.Optional(
        t.Numeric({ minimum: 1, description: 'no. of items' })
      )
    })
  )
}
const CountriesDTOs = {
  getCountries
}

export default CountriesDTOs
