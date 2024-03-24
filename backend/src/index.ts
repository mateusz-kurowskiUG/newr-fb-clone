import { Elysia } from 'elysia'
import adminRouter from './routes/admin.routes'
import countriesRouter from './routes/countries.routes'

const app = new Elysia().use(adminRouter).use(countriesRouter).listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
