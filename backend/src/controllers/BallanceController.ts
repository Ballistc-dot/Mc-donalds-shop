import {
  Query,
  Resolver,
  Mutation,
  Args,
  ArgsType,
  Field,
  UseMiddleware,
  Ctx,
  ObjectType,
} from 'type-graphql'
import Product from '../schema/product.schema'
import prisma from '../utils/PrismaConnection'
import { isAuthenticated } from '../middlewares/IsAuthenticated'
import User from '../schema/user.schema'
import AuthContext from '../config/AuthContext'

const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET)
@ArgsType()
class BalanceArgs {
  @Field()
  paymentId: string
  @Field()
  value: number
}

@ObjectType()
class Ballance {
  @Field()
  account_ballance: number
}

@Resolver(Product)
class BallanceController {
  @UseMiddleware(isAuthenticated)
  @Query((returns) => Ballance)
  async getBallance(@Ctx() { uid }: AuthContext) {
    const user = await prisma.user.findUnique({
      where: {
        uid,
      },
    })
    return {
      account_ballance: user.account_ballance,
    }
  }

  @UseMiddleware(isAuthenticated)
  @Mutation((returns) => User)
  async addBalance(
    @Args() { value, paymentId }: BalanceArgs,
    @Ctx() { uid }: AuthContext
  ) {
    let intent = await stripe.paymentIntents.create({
      amount: value,
      currency: 'usd',
      payment_method: paymentId,

      // A PaymentIntent can be confirmed some time after creation,
      // but here we want to confirm (collect payment) immediately.
      confirm: true,

      // If the payment requires any follow-up actions from the
      // customer, like two-factor authentication, Stripe will error
      // and you will need to prompt them for a new payment method.>
      error_on_requires_action: true,
    })
    const lastValue = await prisma.user.findUnique({
      where: {
        uid,
      },
    })
    if (intent.status === 'succeeded') {
      // Handle post-payment fulfillment
      const user = await prisma.user.update({
        where: {
          uid,
        },
        data: {
          account_ballance: lastValue.account_ballance + value,
        },
      })
      return {
        user,
      }
    } else {
      // Any other status would be unexpected, so error
      throw new Error('Unexpected status' + intent.status)
      //return response.status(500).send({error: 'Unexpected status ' + intent.status});
    }
    //return generateResponse(response, intent);
  }
  catch(e) {
    if (e.type === 'StripeCardError') {
      // Display error on client
      throw new Error(`An error ocurrred: ${e.message}`)
    } else {
      // Something else happened
      throw new Error(`An error ocurrred: ${e.type}`)
    }
  }
}
export default BallanceController
