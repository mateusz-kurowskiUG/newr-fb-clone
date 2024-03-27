import prisma from '../connect'
import DBMessage from '../enums/DBMessage'
import type ICountry from '../models/ICountry'

const getAllCountries = async (): Promise<ICountry[] | Error> =>
  await prisma.country
    .findMany()
    .then((res) => res)
    .catch((e) => new Error(DBMessage.NOT_AVAILABLE))

const getContryById = async (id: string): Promise<ICountry | Error> =>
  await prisma.country
    .findUniqueOrThrow({ where: { id } })
    .then((res) => res)
    .catch((e) => {
      if (e.code === 'P2025') return Error(DBMessage.DOES_NOT_EXIST)
      throw new Error(DBMessage.NOT_AVAILABLE)
    })

const countryExists = async (id: string): Promise<boolean> =>
  await getContryById(id)
    .then(() => true)
    .catch(() => false)

const deleteCountry = async (id: string): Promise<ICountry | Error> =>
  await prisma.country
    .delete({ where: { id } })
    .then((country) => country)
    .catch((e) => {
      if (e.code === 'P2025') return Error(DBMessage.DOES_NOT_EXIST)
      throw new Error(DBMessage.NOT_AVAILABLE)
    })

export const Countries = {
  getAllCountries,
  deleteCountry,
  getContryById,
  countryExists
}
export default Countries
