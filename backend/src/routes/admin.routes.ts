import Elysia from 'elysia'
import prisma from '../connect'

const adminRouter = new Elysia({ name: 'admin', prefix: '/admin' })
  .get('/media', async ({ set }) => {
    try {
      const media = await prisma.media.findMany()
      return media
    } catch (e) {
      set.status = 500
      return { error: e }
    }
  })
  .get('/country', async () => {
    try {
      const country = await prisma.country.findMany()
      return country
    } catch (e) {
      return { error: e }
    }
  })
export default adminRouter
