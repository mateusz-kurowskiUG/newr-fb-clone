import prisma from '../connect'

const login = async (email: string, password: string): Promise<boolean> => {
  const check = await prisma.admin.findFirst({
    include: {
      Auth: true
    },
    where: { Auth: { email } }
  })
  if (!check) throw new Error('User not found')
  if (check.Auth.password !== password) { throw new Error('Incorrect email or password') }

  return true
}

const Admin = {
  login
}
export default Admin
