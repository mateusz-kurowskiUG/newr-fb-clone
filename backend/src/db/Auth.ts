import { userAuthSanitized } from '../../prisma/types/auth'
import prisma from '../connect'
import type IAuthBody from '../models/auth/IAuthBody'

const registerUser = async ({
  countryId,
  dateOfBirth,
  email,
  password
}: IAuthBody): Promise<boolean> =>
  // TODO: CREATE USER AND PROFILE THERE
  await prisma.auth
    .create({ data: { email, password } })
    .then(() => true)
    .catch((e) => e)

// const loginUser = async (email, password) => {}

export const emailExists = async (
  email: string
): Promise<IAuthBody | boolean> =>
  await prisma.auth
    .findUniqueOrThrow({ where: { email }, select: userAuthSanitized })
    // truthy -> email exists
    .then(() => true)
    // error -> email does not exist or other error, sorry, that's prisma approach :(
    .catch((e) => {
      if (e.code === 'P2025') return false
      throw new Error("Couldn't check if email exists")
    })

const Auth = {
  registerUser,
  //   loginUser,
  emailExists
}
export default Auth
