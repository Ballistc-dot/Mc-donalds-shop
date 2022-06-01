import { User } from '../entities/user'
export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>
  save(user: User): Promise<void>
  hashPassword(user: User): void
  comparePasswords(email: string, password: string): Promise<User>
}
