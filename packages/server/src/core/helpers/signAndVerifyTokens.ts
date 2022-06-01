import { User } from '../entities/User'
import { AutheticationJWTRepository } from './repositories/implementations/AuthenticationHelperRepository'

class SignAndVerifyTokens {
  constructor(
    private authenticationJWTRepository: AutheticationJWTRepository
  ) {}

  sign(user: User) {
    return this.authenticationJWTRepository.signToken(user.email, user.id)
  }
  verify(token: string) {
    return this.authenticationJWTRepository.verifyToken(token)
  }
}

const autheticationJWTRepository = new AutheticationJWTRepository()
const signAndVerifyTokens = new SignAndVerifyTokens(autheticationJWTRepository)

export { signAndVerifyTokens }
