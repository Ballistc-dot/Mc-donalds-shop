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
} from 'type-graphql'
import Product from '../schema/product.schema'
import prisma from '../utils/PrismaConnection'
import { UserInputError } from 'apollo-server'
import { isAuthenticated } from '../middlewares/IsAuthenticated'

@ArgsType()
class ProductArgs {
  @Field()
  name: string
  @Field()
  value: number
  @Field()
  image: string
}

@Resolver(Product)
class ProductController {
  @Mutation((returns) => [Product])
  async addProduct(@Args() { name, value, image }: ProductArgs) {
   
  }
}
export default ProductController
