import type IAuthBody from './IAuthBody'

interface IUserAuth {
  id: string
  updated_at: Date
  created_at: Date
}
type TUserAuth = IUserAuth & IAuthBody
export default TUserAuth
