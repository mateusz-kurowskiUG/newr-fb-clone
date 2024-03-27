import prisma from '../connect'
import DBMessage from '../enums/DBMessage'
import type ICountry from '../models/ICountry'

const getAllCountries = async (): Promise<ICountry[] | Error> =>
  await prisma.country
    .findMany()
    .then((res) => res ?? [])
    .catch((e) => new Error(DBMessage.NOT_AVAILABLE))

const deleteCountry = async (id: string): Promise<ICountry | Error> =>
  await prisma.country
    .delete({ where: { id } })
    .then((country) => country)
    .catch((e) => {
      if (e instanceof Error) {
        if ('code' in e && e.code === 'P2025') {
          return new Error(DBMessage.DOES_NOT_EXIST)
        }
        return e
      }
      return new Error(DBMessage.UNKNOWN_ERROR)
    })

export const Countries = {
  getAllCountries,
  deleteCountry
}
export default Countries
