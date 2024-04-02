import Elysia, { error, t } from 'elysia'
import prisma from '../connect'
import cuid2 from '@paralleldrive/cuid2'
import DBMessage from '../enums/DBMessage'
import { type ICountryOptional } from '../models/ICountry'
import Countries from '../db/Countries'
import updateCountryDTO from './dto/updateCountryDTO'
import Admin from '../db/Admin'
import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'

const adminRouter = new Elysia({ name: 'Admin', prefix: '/admin' })
  .use(cookie())
  .use(jwt({ name: 'JWT', secret: process.env.JWT_SECRET ?? 'secret' }))
  .post(
    '/login',
    async ({ body: { email, password }, JWT, cookie: { name } }) =>
      await Admin.login(email, password)
        .then(async (res) => {
          const token = await JWT.sign({ email, admin: 'true' })
          name.value = token
          name.httpOnly = true
          return { message: 'Logged in' }
        })
        .catch((e) => error(401, { error: e.message })),
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
        password: t.String()
      })
    }
  )
  .onBeforeHandle(async ({ JWT, cookie: { name }, error }) => {
    const resolved = await JWT.verify(name.value)
    if (!resolved) return error(401, { error: 'Unauthorized' })
    if (!resolved.admin) return error(403, { error: 'Forbidden' })
    console.log(resolved)
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
        {
          params: t.Object({ id: t.String() }),
          detail: {
            tags: ['Countries'],
            responses: {
              200: { description: 'Country deleted' },
              400: { description: 'Invalid argument' },
              500: { description: 'Internal server error' }
            }
          }
        }
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
        {
          params: t.Object({
            id: t.String({ minLength: 24, maxLength: 24 })
          }),
          body: updateCountryDTO,
          type: 'json',
          detail: {
            tags: ['Countries'],
            responses: {
              200: {
                description: 'Country updated',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' }
                      }
                    }
                  }
                }
              },
              400: { description: 'Invalid argument' },
              500: { description: 'Internal server error' }
            }
          }
        }
      )
  )

export default adminRouter
