import type IAuthBody from './IAuthBody'

interface IUserAuth {
  id: string
  updatedAt: Date
  createdAt: Date
}
type TUserAuth = IUserAuth & IAuthBody
export default TUserAuth
