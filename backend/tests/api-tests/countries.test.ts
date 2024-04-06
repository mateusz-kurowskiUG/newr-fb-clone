import { treaty } from '@elysiajs/eden'
import { type TCountriesRouter } from '../../src/routes/countries.routes'
import { describe, expect, test } from 'bun:test'
import { isCountry } from '../../src/models/guards/guards'

const app = treaty<TCountriesRouter>('localhost:5000/api/')

describe('Countries API', () => {
  test('GET /countries', async () => {
    const { data, error } = await app.countries.index.get({ query: {} })
    expect(error).toBeNull()
    expect(data).toBeDefined()
    expect(data).toBeArray()
    expect(data).not.toBeEmpty()
    expect(data).not.toBeNull()
    if (data) expect(isCountry(data[0])).toBeTrue()
  })
})
