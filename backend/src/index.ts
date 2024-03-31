import { Elysia } from 'elysia'
import adminRouter from './routes/admin.routes'
import countriesRouter from './routes/countries.routes'
import apiErrorHandler from './handlers/api-error-handler'
import swagger from '@elysiajs/swagger'
import cors from '@elysiajs/cors'
import authRouter from './routes/auth.routes'

const app = new Elysia({ prefix: '/api' })
  .use(
    swagger({
      documentation: {
        tags: [
          { name: 'Admin', description: 'Admin operations' },
          { name: 'Auth', description: 'Auth operations' },
          { name: 'Countries', description: 'Countries operations' }
        ]
      }
    })
  )
  .use(cors())
  .onError(apiErrorHandler)
  .use(adminRouter)
  .use(authRouter)
  .use(countriesRouter)
  .all('*', ({ error }) => error(404, 'Route not found'))
  .listen(5000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
