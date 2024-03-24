import prisma from '../connect'
import DBMessage from '../enums/DBMessage'
import type ICountry from '../models/ICountry'

class Countries {
  public static async getAllCountries (): Promise<ICountry[] | unknown> {
    try {
      const coutries = await prisma.country.findMany()
      if (coutries === null) return []
      return coutries
    } catch (e) {
      return new Error(DBMessage.NOT_AVAILABLE)
    }
  }
}

export default Countries
