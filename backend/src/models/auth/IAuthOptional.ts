import type TUserAuth from './IUserAuth'
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

type TUserAuthOptional = Optional<TUserAuth, any>

export default TUserAuthOptional
