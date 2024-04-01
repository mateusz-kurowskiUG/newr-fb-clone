import prisma from '../connect'

export const truncateAll = async (): Promise<boolean> => {
  const {
    auth,
    country,
    // language,
    media,
    profile,
    user
  } = prisma
  const promisesTable = [
    auth.deleteMany(),
    country.deleteMany(),
    // language.deleteMany(),
    media.deleteMany(),
    profile.deleteMany(),
    user.deleteMany()
  ]
  const res = await Promise.all(promisesTable)
  if (res.every((r) => r.count === 0)) { throw new Error('Error truncating tables') }
  return true
}
