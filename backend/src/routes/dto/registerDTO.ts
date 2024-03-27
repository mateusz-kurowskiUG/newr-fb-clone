import { t } from 'elysia'
import { passwordRegex } from '../../data/regex'

const registerDTO = t.Object(
  {
    email: t.String({
      format: 'email',
      error: 'Email does not meet requirements'
    }),
    password: t.String({
      pattern: passwordRegex.source,
      error: 'Password does not meet requirements.'
    })
  },
  {
    error: 'Invalid request body',
    description: 'The request body must contain an email and password.',
    examples: [{ email: 'admin@admin.com', password: 'Admin123.' }],
    default: { email: '', password: '' }
  }
)

export default registerDTO
