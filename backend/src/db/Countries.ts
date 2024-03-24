import prisma from '../connect'
import DBMessage from '../enums/DBMessage'
import type ICountry from '../models/ICountry'

class Countries {
  public static async getAllCountries (): Promise<ICountry[] | Error> {
    try {
      const coutries = await prisma.country.findMany()
      if (coutries === null) return []
      return coutries
    } catch (e) {
      return new Error(DBMessage.NOT_AVAILABLE)
    }
  }

  public static async deleteCountry (id: string): Promise<ICountry | Error> {
    try {
      const country = await prisma.country.delete({ where: { id } })
      return country
    } catch (e) {
      if (e instanceof Error) {
        if ('code' in e && e.code === 'P2025') { return new Error(DBMessage.DOES_NOT_EXIST) }
        return e
      }
      return new Error(DBMessage.UNKNOWN_ERROR)
    }
  }
}

export default Countries
