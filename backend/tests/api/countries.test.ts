import { treaty } from '@elysiajs/eden'
import type { CountriesRouter } from '../../src/routes/countries.routes'
import { expect, test } from 'bun:test'
import { type ICountry } from '../../src/models/ICountry'

const app = treaty<CountriesRouter>('localhost:5000/api/')

test('Fetching countries', async () => {
  const { data: countries, status } = await app.countries.get.get()
  expect(status).toBe(200)
  expect(countries).toBeArray()
  expect(countries).not.toBeEmpty()
  if (!countries) throw new Error('Countries not found') // This is a safeguard
  countries.forEach((country: ICountry) => {
    expect(country).toHaveProperty('id')
  })
})
