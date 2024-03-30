import Elysia from 'elysia'
import registerDTO from './dto/registerDTO'
import loginDTO from './dto/loginDTO'
import Auth from '../db/Auth'
import Countries from '../db/Countries'
// TODO: ADD RESPONSES TO VALIDATION
const authRouter = new Elysia({ prefix: '/auth', name: 'Auth' }).onError(
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
    const ifEmailExists = await Auth.emailExists(body.email)
    if (ifEmailExists) {
      set.status = 400
      return new Error('Email already exists')
    }
    const ifCountryExists = await Countries.countryExists(body.countryId)
    if (!ifCountryExists) {
      set.status = 400
      return new Error('Country does not exist')
    }

    const ifPermittedToRegister =
      new Date().getFullYear() - body.dateOfBirth.getFullYear() >= 13

    if (!ifPermittedToRegister) {
      set.status = 400
      return new Error('User must be at least 13 years old')
    }

    const userCreated = await Auth.registerUser(body)
    return userCreated
  },
  {
    body: registerDTO,
    transform ({ body }) {
      const date = new Date(body.dateOfBirth)
      body.dateOfBirth = date
    }
  }
)
authRouter.post('/login', () => {}, { body: loginDTO })

export default authRouter
