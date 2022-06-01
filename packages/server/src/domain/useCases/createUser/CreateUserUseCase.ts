import { signAndVerifyTokens } from '../../../core/helpers/signAndVerifyTokens'
import { User } from '../../entities/user'
import { IUserRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadExists) {
      if (data.oAuth) {
        const AccessToken = await signAndVerifyTokens.sign(userAlreadExists)

        return { user: userAlreadExists, AccessToken }
      }
      throw new Error('This email is already registered!.')
    }
    const user = new User(data)
    await this.usersRepository.hashPassword(user)
    await this.usersRepository.save(user)
    const AccessToken = await signAndVerifyTokens.sign(user)

    return { user, AccessToken }
  }
}
