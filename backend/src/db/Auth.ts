import prisma from '../connect'

// const registerUser = async (user) => {
//   prisma.auth.create({})
// }

// const loginUser = async (email, password) => {}

export const emailExists = async (email: string): Promise<boolean> =>
  await prisma.auth
    .findUniqueOrThrow({ where: { email } })
    .then(() => true)
    .catch((e) => {
      if (e.code === 'P2025') return false
      return false
    })

const Auth = {
  //   registerUser,
  //   loginUser,
  emailExists
}
export default Auth
