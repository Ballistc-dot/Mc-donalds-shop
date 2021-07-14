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
  InputType,
} from 'type-graphql'
import Product from '../schema/product.schema'
import prisma from '../utils/PrismaConnection'
import { UserInputError } from 'apollo-server'
import { isAuthenticated } from '../middlewares/IsAuthenticated'
import AuthContext from '../config/AuthContext'
import User from '../schema/user.schema'

@InputType()
class ProductList {
  @Field()
  id: number
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
  //adreess: string
}

@Resolver(Product)
class CheckoutController {
  @UseMiddleware(isAuthenticated)
  @Mutation((returns) => User)
  async Checkout(
    @Args() { products }: ProductArgs,
    @Ctx() { uid }: AuthContext
  ) {
    console.log('here')
    const user = await prisma.user.findUnique({
      where: {
        uid,
      },
      include: {
        address: { include: { user: { include: { address: true } } } },
      },
    })
    console.log(JSON.stringify(user))
    let userBalance = user.account_ballance

    let totalValue = 0
    for (let i = 0; i < products.length; i++) {
      totalValue += Number(products[i].value)
    }

    if (userBalance <= 0 || userBalance < totalValue)
      throw new Error(
        'burro do caralho vc esta sem dinheiro recarrega essa porra'
      )
    const newUserBallance = Number(userBalance) - Number(totalValue)

    console.log(Number(totalValue))
    /*const user2 = await prisma.user.update({
      where: {
        uid,
      },

      data: {
        account_ballance: userBalance - totalValue,
      },
      include: {
        address: { include: { user: true } },
      },
    })*/
    console.log(uid)
    /*const user2 = await prisma.user.update({
      where: {
        uid,
      },
      data: {
        account_ballance: 69 - totalValue,
      },
    })*/
    //console.log(user2)
    const user3 = {
      name: 'fdfsdf',
      id: user.id,
      uid: user.uid,
      email: user.email,
      account_ballance: user.account_ballance,
      isNewUser: user.isNewUser,
    }
    return user3
  }
}
export default CheckoutController
