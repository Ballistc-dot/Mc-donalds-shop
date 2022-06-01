import { User } from '../../entities/user'
import { CreateUserUseCase } from './CreateUserUseCase'

interface CreateUserResponse {
  user: User
  AccessToken: string
}

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(data: any): Promise<CreateUserResponse> {
    return await this.createUserUseCase.execute(data)
  }
}
