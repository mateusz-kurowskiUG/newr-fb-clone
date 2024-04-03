import { t } from 'elysia'
import loginDTO from './loginDTO'
import updateCountryDTO from './updateCountryDTO'

const tags = ['Admin']

const cookie = t.Cookie({ token: t.String() })

const cookieOk = {
  detail: {
    tags: ['Admin'],
    description: 'Check if cookie with JWT is valid',
    responses: {
      200: { description: 'Cookie is valid' },
      400: { description: 'Invalid argument' },
      500: { description: 'Internal server error' }
    }
  },
  cookie
}

const login = {
  body: loginDTO,
  detail: {
    tags,
    responses: {
      200: { description: 'Logged in' },
      401: { description: 'Incorrect email or password' }
    }
  },
  cookie
}
const deleteCountry = {
  params: t.Object({ id: t.String() }),
  detail: {
    tags,
    responses: {
      200: { description: 'Country deleted' },
      400: { description: 'Invalid argument' },
      500: { description: 'Internal server error' }
    }
  },
  cookie
}

const patchCountry = {
  params: t.Object({
    id: t.String({ minLength: 24, maxLength: 24 })
  }),
  body: updateCountryDTO,
  type: 'json',
  detail: {
    tags,
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
  },
  cookie
}
const AdminDTOs = {
  cookieOk,
  login,
  deleteCountry,
  patchCountry
}
export default AdminDTOs
