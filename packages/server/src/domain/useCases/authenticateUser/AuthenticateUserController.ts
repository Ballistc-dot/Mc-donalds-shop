import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(email: string, password: string): Promise<string> {
    return await this.authenticateUserUseCase.execute({ email, password })
  }
}
