import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
const main = async () => {
  const users = await prisma.user.findMany()
  console.log(users)
}
await main()

export default prisma
