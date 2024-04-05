import { t } from 'elysia'

const loginDTO = t.Object(
  {
    email: t.String({
      error: 'Email does not meet requirements',
      format: 'email'
    }),
    password: t.String({ error: 'Password does not meet requirements.' })
  },
  {
    default: { email: '', password: '' },
    description: 'The request body must contain an email and password.',
    error: 'Invalid request body',
    examples: [{ email: 'admin@admin.com', password: 'Admin123.' }]
  }
)
export default loginDTO
