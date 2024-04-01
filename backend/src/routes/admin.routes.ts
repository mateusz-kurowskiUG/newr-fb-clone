import Elysia from 'elysia'
import prisma from '../connect'

const adminRouter = new Elysia({ name: 'Admin', prefix: '/admin' })

adminRouter.get('/media', async ({ error }) => {
  await prisma.media
    .findMany()
    .then((media) => media)
    .catch((e) => error(500, { error: e.message }))
})

adminRouter.get(
  '/country',
  async ({ error }) =>
    await prisma.country
      .findMany()
      .then((countries) => countries)
      .catch((e) => error(500, { error: e.message ?? 'Internal server error' }))
)

export default adminRouter
