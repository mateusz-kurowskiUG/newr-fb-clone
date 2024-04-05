import { t } from 'elysia'

const trueFalseRegex = /^(true|false)$/

const adminJWTSchema = t.Object({
  admin: t.String({
    pattern: trueFalseRegex.source, // This is not working, causes error!
    default: 'false',
    description: 'Admin status of the user'
  }),
  // expires: t.Number({
  //   description: 'Expiration time of the token',
  //   minimum: Date.now()
  // }),
  email: t.String({ format: 'email', description: 'Email of the user' })
})

export default adminJWTSchema
