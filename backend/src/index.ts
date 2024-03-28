import { Elysia } from 'elysia'
import adminRouter from './routes/admin.routes'
import countriesRouter from './routes/countries.routes'
import apiErrorHandler from './handlers/api-error-handler'
import swagger from '@elysiajs/swagger'
import cors from '@elysiajs/cors'
import authRouter from './routes/auth.routes'

const app = new Elysia({ prefix: '/api' })
  .use(swagger())
  .use(cors())
  .onError(apiErrorHandler)
  .use(adminRouter)
  .use(authRouter)
  .use(countriesRouter)
  .listen(5000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
