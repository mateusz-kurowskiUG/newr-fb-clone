import { Elysia } from 'elysia'
import adminRouter from './routes/admin.routes'
import countriesRouter from './routes/countries.routes'
import apiErrorHandler from './handlers/api-error-handler'
import swagger from '@elysiajs/swagger'
import cors from '@elysiajs/cors'

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .onError(apiErrorHandler)
  .use(adminRouter)
  .use(countriesRouter)
  .listen(5000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
