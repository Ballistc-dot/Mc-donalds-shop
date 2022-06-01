import {
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import { authenticateUserController } from '../../domain/useCases/authenticateUser'
import { createUserController } from '../../domain/useCases/createUser'
import { CreateUserResponse } from '../entities/User'
import { AutheticationJWT } from '../middlewares/AuthenticationJWT'
import {
  AuthInput,
  GoogleDataInput,
  UserInput
} from './inputs/UserResolverInput'

const autheticationJWT = new AutheticationJWT()

@Resolver()
export class UserResolver {
  @Mutation(() => CreateUserResponse)
  async createUser(@Args() { name, email, password }: UserInput) {
    const data = { email, name, password }

    const response = await createUserController.handle(data)

    return response
  }

  @UseMiddleware(autheticationJWT.handle)
  @Mutation(() => CreateUserResponse)
  async createUserWithGoogleCredentials(
    @Ctx() { name, email, oAuth = true }: GoogleDataInput
  ) {
    const data = { email, name, oAuth }
    const response = await createUserController.handle(data)

    return response
  }
  @Mutation(() => String)
  async authenticateUser(@Args() { email, password }: AuthInput) {
    return await authenticateUserController.handle(email, password)
  }
  @Query(() => String)
  async teOdeioGraphql() {
    return 'é por isso q te amo graphql'
  }
}
