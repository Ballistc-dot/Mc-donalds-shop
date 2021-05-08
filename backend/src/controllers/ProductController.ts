import { Query, Resolver, Arg, Mutation, Args, ArgsType, Field, Int } from 'type-graphql'
import Product from '../schema/product.schema'
import prisma from '../utils/PrismaConnection'
import { UserInputError } from 'apollo-server'

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
  @Query(returns => [Product])
  products() {
    return prisma.product.findMany()

  }
  @Query(returns => Product)
  async getProduct(@Arg("id") id: number) {

    const product = await prisma.product.findUnique({
      where: {
        id
      }
    })

    if (!product) throw new UserInputError('This product does not exists!')

    return product
  }
  @Mutation(returns => [Product])
  async addProduct(@Args() { name, value, image }: ProductArgs) {
    await prisma.product.create({
      data: {
        name,
        value,
        image
      }
    })
    return prisma.product.findMany()
  }

  @Mutation(returns => Product)
  async deleteProduct(@Arg("id") id: number) {
    try {
      const product = await prisma.product.delete({
        where: {
          id
        }
      })
      return product
    } catch {
      throw new UserInputError("This product does not exists!")
    }
  }

}
export default ProductController