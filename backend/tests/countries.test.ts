/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { expect, test, describe, beforeEach, afterEach } from 'bun:test'
import Countries from '../src/db/Countries'
import { isCountry } from '../src/models/guards/guards'
import { type ICountry } from '../src/models/ICountry'
import cuid2 from '@paralleldrive/cuid2'

const mockCountry: ICountry = {
  id: cuid2.createId(),
  flagAlt: 'mock alt',
  flagEmoji: 'mock emoji',
  flagSvg: 'mock svg',
  nameEng: 'mock name',
  namePol: 'mock name',
  phoneCodeRoot: 'mock code'
}

const mockCountry2: ICountry = {
  id: cuid2.createId(),
  flagAlt: 'mock alt2',
  flagEmoji: 'mock emoji2',
  flagSvg: 'mock svg2',
  nameEng: 'mock name2',
  namePol: 'mock name2',
  phoneCodeRoot: 'mock code2'
}

beforeEach(async () => {
  await Countries.addCountry(mockCountry)
})
afterEach(async () => {
  await Countries.deleteCountry(mockCountry.id)
})

describe('Countries namespace', () => {
  test('should return a list of countries', async () => {
    const countries = await Countries.getAllCountries()
    expect(countries).toBeInstanceOf(Array)
    expect(countries.length).toBeGreaterThan(0)
    countries.forEach((country) => {
      expect(isCountry(country)).toBeTrue()
    })
  })
  test('should return a single country', async () => {
    const mockCountryFound = await Countries.getContryById(mockCountry.id)
    expect(mockCountryFound).toEqual(mockCountry)
    const isCountryFound = isCountry(mockCountryFound)
    expect(isCountryFound).toBeTrue()
  })
  test('should return true if country exists', async () => {
    const exists = await Countries.countryExists(mockCountry.id)
    expect(exists).toBeTrue()
  })
  test('should return false if country does not exist', async () => {
    const exists = await Countries.countryExists('fake id')
    expect(exists).toBeFalse()
  })
  test('should delete a country', async () => {
    // add new country
    await Countries.addCountry(mockCountry2)
    // delete this country
    const deletedCountry = await Countries.deleteCountry(mockCountry2.id)
    expect(deletedCountry).toEqual(mockCountry2)
    // check if has been deleted
    const exists = await Countries.countryExists(mockCountry2.id)
    expect(exists).toBeFalse()
  })

  test('should update a country', async () => {
    const { id: _, ...newData } = mockCountry2
    const updated = await Countries.updateContry(mockCountry.id, newData)
    expect(isCountry(updated)).toBeTrue()
    expect(updated).toEqual({ id: mockCountry.id, ...newData })
  })
})