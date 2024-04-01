import { type Prisma } from '@prisma/client'

export const userAuthSanitized: Prisma.AuthSelect = {
  banned: true,
  createdAt: true,
  email: true,
  id: true,
  password: false,
  updatedAt: true
}
