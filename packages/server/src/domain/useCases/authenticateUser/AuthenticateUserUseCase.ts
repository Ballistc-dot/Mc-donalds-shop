import { signAndVerifyTokens } from '../../../core/helpers/signAndVerifyTokens'
import { IUserRepository } from '../../repositories/IUsersRepository'
import { IAuthenticationUserDTO } from './AuthenticateUserDTO'

export class AuthenticateUserUseCase {
  constructor(private UserRepository: IUserRepository) {}
  async execute(data: IAuthenticationUserDTO) {
    const user = await this.UserRepository.comparePasswords(
      data.email,
      data.password
    )
    return await signAndVerifyTokens.sign(user)
  }
}
