import Elysia from 'elysia'
import prisma from '../connect'

const adminRouter = new Elysia({ name: 'Admin', prefix: '/admin' })

adminRouter.get('/media', async ({ set }) => {
  try {
    const media = await prisma.media.findMany()
    return media
  } catch (e) {
    set.status = 500
    return { error: e }
  }
})

adminRouter.get('/country', async () => {
  try {
    const country = await prisma.country.findMany()
    return country
  } catch (e) {
    return { error: e }
  }
})

export default adminRouter
