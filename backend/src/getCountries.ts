import axios from 'axios'
import type ICountry from './models/ICountry'
import cuid2 from '@paralleldrive/cuid2'
import prisma from './connect'
interface ICountryExternal {
  name: {
    common: string
  }
  idd: { root: string }
  languages: Record<string, string>
  translations: {
    pol: {
      common: string
    }
  }
  flag: string
  flags: {
    svg: string
    alt: string
  }
}
const url = 'https://restcountries.com/v3.1/all'

const getCountries = async (): Promise<ICountry[]> => {
  try {
    const countriesJson = (await axios.get(url)).data
    const countries = countriesJson.map(
      (country: ICountryExternal): ICountry => {
        const preparedCountry = prepareCountry(country)
        return preparedCountry
      }
    )
    return countries
  } catch (e) {
    console.log(e)
    return []
  }
}

const prepareCountry = (country: ICountryExternal): ICountry => {
  const { flag, flags, idd, name, translations } = country
  return {
    id: cuid2.createId(),
    flag_alt: flags.alt || null,
    flag_svg: flags.svg || null,
    flag_emoji: flag || null,
    // language_id: '1',
    name_eng: name.common,
    name_pol: translations.pol.common,
    phone_code_root: idd.root || null
  }
}

const insertCountries = async (): Promise<boolean> => {
  const res = await prisma.country.createMany({ data: await getCountries() })
  if (res.count !== 0) {
    console.log(`Inserted ${res.count} countries`)
    return true
  }
  console.log('No countries inserted')
  return false
}

export default insertCountries