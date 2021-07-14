import {
  Query,
  Resolver,
  Arg,
  Mutation,
  Args,
  ArgsType,
  Field,
  Int,
  UseMiddleware,
  ObjectType,
  Ctx,
} from 'type-graphql'
import Product from '../schema/product.schema'
import prisma from '../utils/PrismaConnection'
import { UserInputError } from 'apollo-server'
import { isAuthenticated } from '../middlewares/IsAuthenticated'
import AuthContext from '../config/AuthContext'
import User from '../schema/user.schema'
import Adreess from '../schema/adreess.schema'

@ObjectType()
class ProductList {
  @Field()
  name: string
  @Field()
  image: string
  @Field()
  value: number
}
@ArgsType()
class ProductArgs {
  @Field((type) => [ProductList])
  products: ProductList[]
}

@Resolver(Adreess)
class AddressController {
  @UseMiddleware(isAuthenticated)
  @Mutation((returns) => User)
  async setAddress(@Ctx() { uid }: AuthContext) {
    const user = await prisma.user.update({
      where: {
        uid,
      },
      data: {
        address: {
          create: {
            neighborhood: 'Los Santos',
            number: 777,
            province: 'Los Angeles',
            street: 'Rua das amora',
          },
        },
      },
      include: {
        address: { include: { user: { include: { address: true } } } },
      },
    })

    return user
  }
}
export default AddressController
