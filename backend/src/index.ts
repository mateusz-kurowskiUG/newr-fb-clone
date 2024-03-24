import { Elysia } from 'elysia'
import adminRouter from './routes/admin.routes'

const app = new Elysia().use(adminRouter).listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
