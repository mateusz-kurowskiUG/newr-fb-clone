import { t } from 'elysia'
import { passwordRegex } from '../../data/regex'

const registerDTO = t.Object(
  {
    email: t.String({
      format: 'email',
      error: 'Email does not meet requirements',
      examples: ['admin@admin.com'],
      description: 'The email of the user.'
    }),
    password: t.String({
      pattern: passwordRegex.source,
      error: 'Password does not meet requirements.',
      examples: ['Admin123.', 'Admin123!'],
      description:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
    }),
    country_id: t.String({
      examples: ['irphik0odshgnfwlrudwnxjm'],
      description: 'The country ID of the user. CUID2 format.',
      error: 'Country ID does not meet requirements.',
      minLength: 24,
      maxLength: 24
    }),
    date_of_birth: t.Date({
      error: 'Date of birth must be in YYYY-MM-DD format.',
      examples: ['2000-01-01'],
      description:
        'The date of birth of the user. Needs to be at least 13 years old.'
    })
  },
  {
    error: 'Invalid request body',
    description:
      "The request body must contain an email, password date of birth and ID of the user's country.",
    examples: [
      {
        email: 'admin@admin.com',
        password: 'Admin123.',
        country_id: 'irphik0odshgnfwlrudwnxjm',
        date_of_birth: '2000-01-01'
      }
    ],
    default: { email: '', password: '' }
  }
)

export default registerDTO
