import { PostgresUserRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { AuthenticateUserController } from './AuthenticateUserController'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const postgresUserRepository = new PostgresUserRepository()
const authenticateUserUseCase = new AuthenticateUserUseCase(
  postgresUserRepository
)

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
)

export { authenticateUserController }
