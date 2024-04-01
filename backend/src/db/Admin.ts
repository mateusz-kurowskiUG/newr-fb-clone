import prisma from '../connect'

const login = async (email: string, password: string): Promise<boolean> => {
  const check = await prisma.admin.findFirst({
    include: {
      Auth: true
    },
    where: { Auth: { email, password } }
  })
  if (!check) throw new Error('Invalid email or password')
  //   jwt here
  return true
}

const Admin = {
  login
}
export default Admin
