import {
  Query,
  Resolver,
  Arg,
  Mutation,
  Args,
  ArgsType,
  Field,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import { decode, sign } from 'jsonwebtoken'
import User from '../schema/user.schema'
import prisma from '../utils/PrismaConnection'
import AuthConfig from '../config/auth'
import Auth from '../schema/auth.schema'
import Adreess from '../schema/adreess.schema'
import AuthContext from '../config/AuthContext'
import { isAuthenticated } from '../middlewares/IsAuthenticated'
import { GoogleAuthentication } from '../middlewares/GoogleAuthentication'
import { uuid } from 'uuidv4'
@ArgsType()
class UserArgs {
  @Field((type) => String)
  name: string

  @Field((type) => String)
  email: string

  @Field((type) => String)
  googleToken: string
}

@Resolver(User)
class UserController {
  @UseMiddleware(GoogleAuthentication)
  @Mutation((returns) => Auth)
  async createUserToken(@Ctx() { email }: AuthContext) {
    const storagedUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (storagedUser) {
      const { secret, expiresIn } = AuthConfig.jwt
      const userId = storagedUser.id

      const token = sign({}, secret, {
        subject: `${userId}`,
        expiresIn,
      })
      return {
        token,
        user: storagedUser,
      }
    }
    throw new Error('You may register')
  }

  @UseMiddleware(GoogleAuthentication)
  @Mutation((returns) => Auth)
  async createUser(@Ctx() { email }: AuthContext) {
    const storagedUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    const { secret, expiresIn } = AuthConfig.jwt
    let userId

    if (storagedUser) {
      userId = storagedUser.uid
      const token = sign({}, secret, {
        subject: `${userId}`,
        expiresIn,
      })
      return {
        user: storagedUser,
        token,
      }
    }
    const user = await prisma.user.create({
      data: {
        uid: uuid(),
        email,
      },
    })
    userId = user.uid
    const token = sign({}, secret, {
      subject: `${userId}`,
      expiresIn,
    })
    return {
      user,
      token,
    }
  }
  @UseMiddleware(isAuthenticated)
  @Query((returns) => User)
  async GetUser(@Ctx() { uid }: AuthContext) {
    const user = await prisma.user.findUnique({
      where: { uid },
      include: {
        address: { include: { user: { include: { address: true } } } },
      },
    })
    return user
  }
}

export default UserController
