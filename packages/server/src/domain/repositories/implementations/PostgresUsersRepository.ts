import { compare, hash } from 'bcrypt'
import { User } from '../../entities/user'
import { IUserRepository } from '../IUsersRepository'

export class PostgresUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: 'wiudyhqe98rfu84e2w=34easdfd',
      email: 'pedrobala22@ballistc.com',
      name: 'pedro bala',
      password: '$2b$10$IraCycmWsmvuTdZpA2Bj3uVjaFvMQD5oeO2bfh.Q.tarXXHnl6J7m',
      oAuth: false
    }
  ]

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)

    return user
  }
  async save(user: User): Promise<void> {
    this.users.push(user)
  }
  async hashPassword(user: User) {
    const saltRounds = 10
    if (!user.oAuth && user.password) {
      user.password = await hash(user.password, saltRounds)
    }
  }
  async comparePasswords(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email)

    if (!user) throw new Error('This user does not exists!.')

    const storedHashedPassword = user.password

    const compareResult = await compare(password, storedHashedPassword)

    if (!compareResult) {
      throw new Error('Incorrect Password, please try again!.')
    }
    return user
  }
}
