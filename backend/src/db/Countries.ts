import prisma from '../connect'
import DBMessage from '../enums/DBMessage'
import { type ICountry } from '../models/ICountry'

const getAllCountries = async (): Promise<ICountry[]> =>
  await prisma.country
    .findMany()
    .then((res) => res)
    .catch((e) => {
      throw new Error(DBMessage.NOT_AVAILABLE)
    })

const getCountriesPaginated = async (
  pageNumber: number,
  pageSize: number
): Promise<ICountry[]> =>
  await prisma.country
    .findMany({ take: n })
    .then((res) => res)
    .catch((e) => {
      throw new Error(DBMessage.NOT_AVAILABLE)
    })

const getContryById = async (id: string): Promise<ICountry> =>
  await prisma.country
    .findUniqueOrThrow({ where: { id } })
    .then((res) => res)
    .catch((e) => {
      if (e.code === 'P2025') throw new Error(DBMessage.DOES_NOT_EXIST)
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
      if (e.code === 'P2025') throw new Error(DBMessage.DOES_NOT_EXIST)
      throw new Error(DBMessage.NOT_AVAILABLE)
    })

const updateContry = async (
  id: string,
  data: Omit<ICountry, 'id'>
): Promise<ICountry> =>
  await prisma.country
    .update({ where: { id }, data })
    .then((res) => res)
    .catch((e) => {
      if (e.code === 'P2025') throw new Error(DBMessage.DOES_NOT_EXIST)
      throw new Error(DBMessage.NOT_AVAILABLE)
    })
const addCountry = async (data: ICountry): Promise<ICountry> =>
  await prisma.country
    .create({ data })
    .then((res) => res)
    .catch((e) => {
      throw new Error(DBMessage.NOT_AVAILABLE)
    })
export const Countries = {
  getAllCountries,
  deleteCountry,
  getContryById,
  countryExists,
  updateContry,
  addCountry,
  getCountriesPaginated
}
export default Countries
