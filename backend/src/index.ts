import { Elysia } from 'elysia'
import adminRouter from './routes/admin.routes'
import countriesRouter from './routes/countries.routes'
import apiErrorHandler from './handlers/api-error-handler'
import swagger from '@elysiajs/swagger'

const app = new Elysia()
  .use(swagger())
  .onError(apiErrorHandler)
  .use(adminRouter)
  .use(countriesRouter)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
