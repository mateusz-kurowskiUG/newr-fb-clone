import Elysia, { error } from 'elysia'
import prisma from '../connect'
import cuid2 from '@paralleldrive/cuid2'
import DBMessage from '../enums/DBMessage'
import { type ICountryOptional } from '../models/ICountry'
import Countries from '../db/Countries'
import Admin from '../db/Admin'
import jwt from '@elysiajs/jwt'
import adminJWTSchema from '../schema/adminJWT.schema'
import AdminDTOs from './dto/adminDTOs'

const adminRouter = new Elysia({ name: 'Admin', prefix: '/admin' })
  .use(
    jwt({
      name: 'JWT',
      secret: process.env.JWT_SECRET ?? 'secret',
      exp: '24h',
      schema: adminJWTSchema
    })
  )
  .post(
    '/cookieok',
    async ({ JWT, cookie: { token } }) => {
      const verifiedToken = await JWT.verify(token.value)
      console.log(token.value, verifiedToken)

      if (verifiedToken) return { message: 'Cookie is valid' }

      return error(400, { error: 'Invalid argument' })
    },
    AdminDTOs.cookieOk
  )
  .post(
    '/login',
    async ({ body: { email, password }, JWT, cookie: { token } }) =>
      await Admin.login(email, password)
        .then(async () => {
          const signedToken = await JWT.sign({
            email,
            admin: 'true'
          })
          token.set({
            value: signedToken,
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
          })

          return { message: 'Logged in' }
        })
        .catch((e) => error(401, { error: e.message })),
    AdminDTOs.login
  )
  .onBeforeHandle(async ({ JWT, cookie: { token }, error }) => {
    const resolved = await JWT.verify(token.value)
    console.log(resolved)

    if (!resolved) {
      token.remove()
      return error(401, { error: 'Unauthorized' })
    }
  })
  .group('/media', (app) =>
    app.get(
      '/',
      async ({ error }) =>
        await prisma.media
          .findMany()
          .then((media) => media)
          .catch((e) => error(500, { error: e.message }))
    )
  )

  .group('/country', (app) =>
    app
      .get(
        '/',
        async ({ error }) =>
          await prisma.country
            .findMany()
            .then((countries) => countries)
            .catch((e) =>
              error(500, { error: e.message ?? 'Internal server error' })
            )
      )
      .delete(
        '/delete/:id',
        async ({ params: { id } }) => {
          const isCuid = cuid2.isCuid(id)
          if (!isCuid) {
            return error(400, { error: DBMessage.INVALID_ARGUMENT })
          }

          const country = await Countries.deleteCountry(id)
          if (country instanceof Error) {
            return error(500, {
              error: country.message ?? 'Internal server error'
            })
          }

          return country
        },

        AdminDTOs.deleteCountry
      )

      .patch(
        '/patch/:id',
        async ({ params, body }) => {
          if (!cuid2.isCuid(params.id)) {
            return error(400, { error: DBMessage.INVALID_ARGUMENT })
          }

          const country: ICountryOptional = body
          await Countries.updateContry(params.id, country)
            .then((country) => country)
            .catch((e) => error(500, { error: e.message }))
        },
        AdminDTOs.patchCountry
      )
  )

export default adminRouter
