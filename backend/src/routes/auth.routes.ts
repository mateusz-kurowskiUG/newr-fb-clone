import Elysia from 'elysia'
import registerDTO from './dto/registerDTO'
import loginDTO from './dto/loginDTO'
import Auth from '../db/Auth'

const authRouter = new Elysia({ prefix: '/auth' }).onError(
  ({ code, error, set }) => {
    if (code === 'VALIDATION') {
      set.status = 400
      return error.message
    }
    return error.message
  }
)

authRouter.post(
  '/register',
  async ({ body, set }) => {
    const { email } = body
    const findIfEmailExists = await Auth.emailExists(email)
    if (findIfEmailExists) {
      set.status = 400
      return new Error('Email already exists')
    }
    // TODO: check if banned

    return findIfEmailExists
  },
  {
    body: registerDTO
  }
)
authRouter.post('/login', () => {}, { body: loginDTO })

export default authRouter
