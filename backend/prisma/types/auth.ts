import { type Prisma } from '@prisma/client'

export const userAuthSanitized: Prisma.AuthSelect = {
  banned: true,
  created_at: true,
  email: true,
  id: true,
  password: false,
  updated_at: true
}
